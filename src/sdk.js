var Level = require('./level')
var outputers = require('./outputers')
var safeConsole = require('./safeconsole')
var util = require('./util')
var _ = require('min-util')
var is = _.is

module.exports = Sdk

// global set: name level output

function Sdk() {
  var sdk = this
  sdk.history = []
  sdk.pendingItems = [] // logs wait for output
  sdk.Level = Level
  sdk.loggers = {} // logger cache
  sdk.level = null
  sdk.prefix = ''
  sdk.pattern = {} // match namespace pattern
  sdk.lastItem = null // last log item
  sdk.outputers = outputers
  sdk.colorMap = {} // color map cache
  sdk.colors = 'lightseagreen forestgreen goldenrod dodgerblue darkorchid crimson'.split(' ')
  sdk.colorIndex = 0
  sdk.historySize = 3000
  sdk.setOutputer(_.noop) // default is noop
  sdk.autoInit()
}

// TODO formatters https://en.wikipedia.org/wiki/Printf_format_string

var proto = Sdk.prototype

proto.autoInit = function() {
  // auto init: outputer name level
  var sdk = this
  var defaultOpt = sdk.getDefaultOptions()
  var userOpt = sdk.getUserOptions()
  var opt = _.extend({}, defaultOpt, userOpt)
  sdk.setOptions(opt)
}

proto.setOptions = function(opt) {
  var sdk = this
  sdk.setName(opt.name)
  sdk.setLevel(opt.level)
  sdk.setOutputer(opt.outputer)
}

proto.getDefaultOptions = function() {
  var sdk = this
  var ret = {
    level: Level.INFO, // default use info level, so debug and verbose log is hidden
    outputer: sdk.autoChooseOutputer(),
    name: '*' // enable all namespace
  }
  return ret
}

proto.getUserOptions = function() {
  var opt = util.getUserOptions('log_name log_level log_outputer'.split(' '))
  return {
    name: opt.log_name,
    level: opt.log_level,
    outputer: opt.log_outputer
  }
}

proto.autoChooseOutputer = function() {
  var outputer = _.noop
  if (safeConsole.hasConsole()) {
    if (util.supportBrowserColor()) {
      outputer = 'browser_console'
    } else {
      outputer = 'node_console'
    }
  }
  return outputer
}

proto.setOutputer = function(outputName) {
  var sdk = this
  var outputer = null
  if (is.string(outputName)) {
    outputer = sdk.outputers[outputName]
  } else if (is.fn(outputName)) {
    outputer = {handler: outputName}
  }
  if (outputer) {
    sdk.outputer = outputer
    if (is.fn(outputer.init)) {
      outputer.init(sdk)
    }
    if (is.fn(outputer.ready)) {
      outputer.ready(function() {
        _.each(sdk.pendingItems, function(item) {
          if (item.done === false) {
            outputer.handler(item)
            item.done = true
          }
        })
        sdk.pendingItems.length = 0
      })
    }
  }
}

proto.output = function(item) {
  var sdk = this
  if (item.enabled) {
    if (sdk.isLevelEnabled(item.level)) {
      // output enabled log
      var outputer = sdk.outputer
      if (outputer.isReady === false) {
        sdk.pendingItems.push(item)
      } else {
        outputer.handler(item, sdk)
        item.done = true
      }
      sdk.lastItem = item // save last enabled log
    }
  }
  sdk.appendHistory(item) // save all log
}

proto.setPrefix = function(prefix) {
  var sdk = this
  sdk.prefix = prefix
}

proto.isLevelEnabled = function(level) {
  var sdk = this
  if (level >= sdk.level) {
    return true
  }
  return false
}

proto.getRandomColor = function(name) {
  var sdk = this
  var color = sdk.colorMap[name]
  if (!color) {
    var colors = sdk.colors
    color = sdk.colorMap[name] = colors[sdk.colorIndex++ % colors.length]
  }
  return color
}

proto.setName = function(name) {
  // alias for setNamePattern
  return this.setNamePattern(name)
}

proto.setColors = function(colors) {
  this.colors = colors
}

proto.setNamePattern = function(patternStr) {
  // refresh all loggers's enabled state
  var sdk = this
  sdk.pattern = normalizePattern(patternStr)
  _.forIn(sdk.loggers, function(logger) {
    logger.enabled = sdk.isNameEnabled(logger.name)
  })
}

proto.isNameEnabled = function(name) {
  var sdk = this
  var pattern = sdk.pattern
  function regMatch(reg) {
    return reg.test(name)
  }
  if (_.some(pattern.skips, regMatch)) {
    return false
  }
  if (_.some(pattern.names, regMatch)) {
    return true
  }
  return false
}

proto.setLevel = function(level) {
  this.level = Level.toCode(level)
}

proto.appendHistory = function(item) {
  var sdk = this
  sdk.history.push(item)
  if (sdk.history.length > sdk.historySize) {
    sdk.history.shift()
  }
}

proto.setHistorySize = function(historySize) {
  this.historySize = historySize
}

proto.getHistory = function() {
  return this.history
}

proto.disableHistory = function() {
  this.setHistorySize(0)
}

proto.clear = function() {
  this.history.length = 0
}

proto.save = function() {
  var sdk = this
  return _.map(sdk.history, function(item) {
    return _.map(item.data, function(val) {
      var ret = util.safeStringify(val)
      return ret
    }).join(' ')
  }).join('\r\n')
}

function normalizePattern(pattern) {
  var skips = []
  var names = []

  if (pattern && is.string(pattern)) {
    _.each(pattern.split(/[\s,]+/), function(name) {
      name = name.replace(/\*/g, '.*?')
      var first = name.charAt(0)
      if ('-' === first) {
        skips.push(new RegExp('^' + _.slice(name, 1) + '$'))
      } else {
        names.push(new RegExp('^' + name + '$'))
      }
    })
  }

  return {
    skips: skips,
    names: names
  }
}

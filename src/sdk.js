var level = require('./level')
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
  sdk.levels = level
  sdk.loggers = {} // logger cache
  sdk.level = level.DEBUG // default use debug level
  sdk.debugKey = 'debug'
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
  var sdk = this
  sdk.autoSetOutputer()
  sdk.autoSetName()
}

proto.autoSetOutputer = function() {
  // 自动选择输出方式
  if (safeConsole.hasConsole()) {
    if (util.supportBrowserColor()) {
      this.setOutputer('browser_color')
    } else {
      this.setOutputer('simple')
    }
  }
}

proto.autoSetName = function() {
  // 自动从环境中获取 namespace
  var sdk = this
  var key = sdk.debugKey
  var name

  // try get name
  // get by url first
  if (global.location) {
    var reg = new RegExp(key + '=(\\S+)')
    var res = reg.exec(global.location.href)
    if (res) {
      name = res[1]
    }
  }

  // then localStorage
  if (null == name) {
    try {
      // never test global.localStorage, will also crash in no cookie mode
      name = localStorage[key]
    } catch (ignore) {}
  }

  // then env
  if (null == name && global.process) {
    name = _.get(global, ['process', 'env', key])
  }

  // 没有 name 也要 set, 要清除日志
  sdk.setName(name)
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
  }
}

proto.output = function(item) {
  var sdk = this
  if (item.enabled) {
    if (item.level >= sdk.level) {
      // output enabled log
      sdk.outputer.handler.call(sdk, item)
      sdk.lastItem = item // save last enabled log
    }
  }
  sdk.appendHistory(item) // save all log
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
  this.level = level
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
      var ret = val
      if (global.JSON) {
        try {
          ret = JSON.stringify(val)
        } catch (err) {
          ret = '[Nested]'
        }
      }
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

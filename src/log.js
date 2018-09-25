var _ = require('min-util')
var is = _.is
var Level = require('./level')
var Sdk = require('./sdk')
var util = require('./util')
var qs = require('min-qs')
var sdk = new Sdk()

module.exports = exports = Log

function Log(opt) {
  var log = this
  if (is.string(opt)) {
    opt = {name: opt}
  }
  opt = opt || {}
  var name = opt.name || 'default' // namespace
  log.name = name
  log.Level = Level
  log.sdk = sdk
  log.enabled = sdk.isNameEnabled(name)
  log.color = opt.color || log.sdk.getRandomColor(name)

  // just for handy usage
  log.util = util
  log._ = _
  log.qs = qs
}

var levelNames = _.map(_.keys(Level), function(level) {
  return _.lower(level)
})

function getLogger(name) {
  // inspired by log4j getLogger
  // 需要 new Log 所以不能写在 sdk 中
  var loggers = sdk.loggers
  var logger = loggers[name]
  if (!logger) {
    logger = loggers[name] = new Log(name)
  }
  return logger
}

var proto = Log.prototype

proto.getLogger = Log.getLogger = getLogger

proto.output = function(levelCode, data) {
  var log = this
  var item = {
    level: levelCode,
    name: log.name,
    enabled: log.enabled,
    timestamp: _.now(),
    data: data,
    color: log.color,
    done: false // if been output
  }
  sdk.output(item)
}

_.each(levelNames, function(levelName) {
  var levelCode = Level.toCode(levelName)
  proto[levelName] = function() {
    this.output(levelCode, arguments)
  }
  // is enabled function
  var isLevelEnabled = 'is' + _.capitalize(levelName) + 'Enabled'
  proto[isLevelEnabled] = function() {
    return this.sdk.isLevelEnabled(levelCode)
  }
})

var sdkFuncNames = 'setOptions setOutputer setName setLevel setHistorySize getHistory disableHistory clear save setColors'.split(' ')

_.each(sdkFuncNames, function(name) {
  proto[name] = function() {
    return this.sdk[name].apply(this.sdk, arguments)
  }
})

proto.getLevelFunction = function(level) {
  var log = this
  var levelCode = Level.toCode(level) || Level.DEBUG
  return function() {
    log.output(levelCode, arguments)
  }
}

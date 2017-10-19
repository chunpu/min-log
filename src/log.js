var _ = require('min-util')
var is = _.is
var level = require('./level')
var Sdk = require('./sdk')
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
  log.levels = level
  log.sdk = sdk
  log.enabled = sdk.isNameEnabled(name)
  log.color = opt.color || log.sdk.getRandomColor(name)
}

var levelNames = _.map(_.keys(level), function(level) {
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
    color: log.color
  }
  sdk.output(item)
}

_.each(levelNames, function(levelName) {
  var levelCode = level[_.upper(levelName)]
  proto[levelName] = function() {
    this.output(levelCode, arguments)
  }
})

proto.getLevelFunction = function(levelCode) {
  var log = this
  levelCode = levelCode || level.DEBUG // default is debug
  return function() {
    log.output(levelCode, arguments)
  }
}

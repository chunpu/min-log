var _ = require('min-util')
var is = _.is
var safeConsole = require('./safeconsole')

module.exports = exports = Log

function Log(opt) {
	var me = this
	if (is.string(opt)) {
		opt = {name: opt}
	}
	opt = opt || {}
	me.name = opt.name || Log.defaultName
	me.enabled = me.isNameMatch(me.name)
	me.Log = Log
}

// static

var defaultConfig = {
	level: 0, // print all level
	MAX_LOG_LEN: 3000,
	debugKey: 'debug',
	defaultLevelName: 'log',
	defaultName: 'default',
	_name: '', // can not use name, default should be empty for online mode
	prefix: '',
	// TODO format layout?
	outputers: [], // 叫 log4j 叫 appender, seelog 叫 writer
	logFilters: [logFilter1],
	custom: {
		outputers: {
			color: require('./outputers/color')
		}
	}
}

_.extend(Log, defaultConfig)

var loggers = {} // cache all logger
var logs = Log.logs = []

if (safeConsole.hasConsole()) {
	Log.outputers.push(defaultOutput)
}

var LEVEL = {
	name2code: {
		// error always > info
		verbose: 0,
		log: 1,
		debug: 2,
		info: 3,
		warn: 4,
		error: 5
	},
	toname: function(name) {
		if (is.number(name)) {
			name = LEVEL.code2name[name]
		}
		if (!is.string(name)) {
			name = Log.defaultLevelName
		}
		return name
	},
	tocode: function(code) {
		if (is.string(code)) {
			code = LEVEL.name2code[_.lower(code)]
		}
		if (!is.number(code)) {
			code = LEVEL.name2code[Log.defaultLevelName]
		}
		return code
	}
}

LEVEL.code2name = _.invert(LEVEL.name2code)

Log.LEVEL = LEVEL // TODO make level a class?

Log.setLevel = function(level) {
	Log.level = LEVEL.tocode(level)
}

Log.setName = function(name) {
	Log._name = name
	Log.pattern = normalizePattern(name)
	_.forIn(loggers, function(logger) {
		logger.enabled = logger.isNameMatch(name)
	})
}

Log.getPlainLog = function() {
	return _.map(Log.logs, function(item) {
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

Log.getLogger = getLogger

Log.setName(Log._name)
Log.setLevel(Log.level)

Log.init = function(key) {
	key = key || Log.debugKey
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
	Log.setName(name)
}

Log.init() // always self init, so can use directly

function defaultOutput(item) {
	var levelName = LEVEL.toname(item.level)
	safeConsole.console(levelName, item.data)
}

function logFilter1(item) {
	// data name level time
	item.time = _.now()
	saveLog(item)
}

function saveLog(item) {
	// TODO lru cache
	logs.push(item)
	if (logs.length > Log.MAX_LOG_LEN) {
		logs.shift()
	}
}

function getLogger(name) {
	// inspired by log4j getLogger
	name = name || Log.defaultName
	var logger = loggers[name]
	if (!logger) {
		logger = loggers[name] = new Log(name)
	}
	return logger
}

function normalizePattern(pattern) {
	var skips = []
	var names = []

	if (pattern && is.string(pattern)) {
		_.each(pattern.split(/[\s,]+/), function(name) {
			name = name.replace(/\*/g, '.*?')
			var first = name.charAt(0)
			if ('-' == first) {
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

// private

var proto = Log.prototype

proto.getLogger = getLogger

proto.getLevelFunction = function(level) {
	var code = LEVEL.tocode(level)
	var me = this
	return function() {
		me.print(code, arguments)
	}
}

_.each(_.keys(LEVEL.name2code), function(level) {
	var code = LEVEL.tocode(level)
	Log[_.upper(level)] = code
	proto[level] = function() {
		var me = this
		me.print(code, arguments)
	}
})

proto.print = function(levelCode, data) {
	var me = this
	if (me.enabled && levelCode >= Log.level) {
		var item = {
			level: levelCode,
			name: me.name,
			data: data
		}
		_.each(Log.logFilters, function(logFilter) {
			logFilter(item, Log.lastLog)
		})
		Log.lastLog = item
		_.each(Log.outputers, function(outputer) {
			outputer(item, Log)
		})
	}
}

proto.isNameMatch = function(name) {
	var me = this
	var pattern = Log.pattern
	if (!name) {
		// clear all
		return false
	}
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


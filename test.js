var assert = require('assert')
var log = require('./')
var Log = log.Log
var is = require('min-is')

assert = function(bool) {
	if (!bool) {
		// alert(11111111)
	}
}

if (is.wechatApp()) {
	Log.setName('*')
} else {
	Log.init('mydebug')
}

// Log.setLevel('error')
Log.outputers = [Log.custom.outputers.color]
// Log.setName('log*,-noshow*')

// console.log(Log)

var noshow = log.getLogger('noshow')
var log1 = log.getLogger('log1')
var log2 = log.getLogger('log2')
var log1again = log.getLogger('log1')

assert(log1 === log1again)

noshow.log('no show')
log1.log('log1 first')
log1.error(new Error('log1 error'))

log2.log('log2 first')
log2.error(new Error('log2 error'))

noshow.error('no show')
log1.log('log1', 'second')

// console.log(Log.logs)

// 此处只运行在可打印日志的地方 enable 地方
if (log1.enabled && log2.enabled) {
	assert(2 == Log.logs.length)

	assert('log1' == Log.logs[0].name)
	assert(Log.ERROR == Log.logs[0].level)
	assert('log2' == Log.logs[1].name)
	assert(Log.ERROR == Log.logs[1].level)
}

Log.outputers.length = 0

/*
for (var i = 0; i < 4000; i++) {
	log1.error(1111)
}
*/

assert(Log.MAX_LOG_LEN == Log.logs.length)

var txt = Log.getPlainLog()

// alert(txt)

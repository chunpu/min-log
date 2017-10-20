var assert = require('assert')
var log = require('./')
var sdk = log.sdk
var debug = require('./debug')('debug')
var is = require('min-util').is

// sdk.setOutputer('')

if (is.browser()) {
  window.log = log
}

// assert = function(bool) {
// 	if (!bool) {
// 		alert(11111111)
// 	}
// }

log.sdk.setLevel('debug')
log.sdk.setName('log*,-noshow*')
// debug('this is debug style!')
// console.log(Log)

var noshow = log.getLogger('noshow')
var log1 = log.getLogger('log1')
var log2 = log.getLogger('log2')
var log1again = log.getLogger('log1')

assert.equal(log1, log1again, 'cache log')

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
  var history = sdk.history
	assert.equal(history.length, 7) // save all log

	assert.equal('log1', history[2].name)
	assert.equal(log.Level.ERROR, history[2].level)
	assert.equal('log2', history[4].name)
	assert.equal(log.Level.ERROR, history[4].level)
}

// log.sdk.disableHistory()

// for (var i = 0; i < 4000; i++) {
// 	log1.error(1111)
// }
// assert.equal(sdk.historySize, sdk.history.length)

var txt = sdk.save()

// alert(txt)

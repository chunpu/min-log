var _ = require('min-util')
var is = _.is
var safeConsole = require('../safeconsole')

var colors = 'lightseagreen forestgreen goldenrod dodgerblue darkorchid crimson'.split(' ')
var colorIndex = 0
var inherit = 'color:inherit'
var lastTime

var cacheColorMap = {}

module.exports = _.noop

if (safeConsole.hasConsole()) {
	if (supportColor()) {
		module.exports = colorLog
	} else {
		module.exports = function(item, Log) {
			safeConsole.console('log', item.data)
		}
	}
}

function supportColor() {
	if (is.wechatApp()) {
		return true
	}
	if (isIE()) { // 可能可以改成 is.h5
		return false
	}
	if (!is.browser()) {
		return false
	}
	return true
}

function isIE() {
	if (is.browser()) {
		if (/Trident/i.test(navigator.userAgent)) {
			return true
		}
	}
	return false
}

function colorLog(item, Log) {
	var now = _.now()
	var ms = now - (lastTime || now)
	var color = 'color:' + getColor(item.name)
	lastTime = now

	var label = Log.prefix + item.name
	var main = '%c' + label + '%c'
	var arr = [null, color, inherit]

	_.each(item.data, function(val) {
		arr.push(val)
		main += ' %o'
	})

	arr.push(color)
	main += '%c +' + ms + 'ms'
	arr[0] = main
	safeConsole.console('log', arr)
}

function getColor(name) {
	if (!cacheColorMap[name]) {
		cacheColorMap[name] = colors[colorIndex++ % colors.length]
	}
	return cacheColorMap[name]
}

var _ = require('min-util')
var safeConsole = require('../safeconsole')

var colors = 'lightseagreen forestgreen goldenrod dodgerblue darkorchid crimson'.split(' ')
var colorIndex = 0
var inherit = 'color:inherit'
var lastTime

var cacheColorMap = {}

module.exports = _.noop
if (safeConsole.hasConsole()) {
	if (isIE()) {
		// ie no color
		module.exports = function(item, Log) {
			safeConsole.console('log', item.data)
		}
	} else {
		module.exports = colorLog
	}
}

function isIE() {
	return /Trident/i.test(navigator.userAgent)
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

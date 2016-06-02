var _ = require('min-util')

var colors = 'lightseagreen forestgreen goldenrod dodgerblue darkorchid crimson'.split(' ')
var colorIndex = 0
var inherit = 'color:inherit'
var lastTime

var console = global.console

module.exports = _.noop
if (console) {
	module.exports = colorLog
}

function colorLog(item, Log) {
	var now = _.now()
	var ms = now - (lastTime || now)
	var color = 'color:' + getColor()
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
	console.log.apply(console, arr)
}

function getColor() {
	return colors[colorIndex++ % colors.length]
}

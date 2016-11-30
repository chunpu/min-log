exports.hasConsole = function() {
	if (global.console) {
		return true
	}
	return false
}

exports.console = function(level, arr) {
	// support ie8+
	// http://stackoverflow.com/questions/5538972/console-log-apply-not-working-in-ie9
	Function.prototype.apply.call(console[level], console, arr)
}

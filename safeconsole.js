exports.hasConsole = function() {
	if (global.console) {
		return true
	}
	return false
}

exports.console = function(level, arr) {
	// support ie8+
	// http://stackoverflow.com/questions/5538972/console-log-apply-not-working-in-ie9
	var apply = Function.prototype.apply || console[level].apply // wechat has no Function.prototype.apply
	apply.call(console[level], console, arr)
}

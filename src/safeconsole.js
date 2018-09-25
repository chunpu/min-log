exports.getConsole = function() {
  if (typeof global !== 'undefined') {
    return global.console
  }
}

var globalConsole = exports.globalConsole = exports.getConsole()

exports.hasConsole = function() {
  return !!exports.globalConsole
}

exports.console = function(level, arr) {
  // support ie8+
  // http://stackoverflow.com/questions/5538972/console-log-apply-not-working-in-ie9
  var apply = Function.prototype.apply || globalConsole[level].apply // wechat has no Function.prototype.apply
  apply.call(globalConsole[level], globalConsole, arr)
}

var safeConsole = require('../safeconsole')

exports.handler = function(item) {
  safeConsole.console('log', item.data)
}

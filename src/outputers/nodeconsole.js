var safeConsole = require('../safeconsole')

// TODO
exports.handler = function(item) {
  safeConsole.console('log', item.data)
}

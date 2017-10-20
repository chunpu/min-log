var Level = require('../level')
var safeConsole = require('../safeconsole')

exports.handler = function(item) {
  safeConsole.console(Level.toName(item.level), item.data)
}

var Level = require('../level')
var safeConsole = require('../safeconsole')

exports.handler = function(item) {
  var level = item.level
  if (level < Level.DEBUG) {
    level = Level.DEBUG
  } else if (level > Level.ERROR) {
    level = Level.ERROR
  }
  safeConsole.console(Level.toName(level), item.data)
}

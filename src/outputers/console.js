var Level = require('../level')
var safeConsole = require('../safeconsole')

exports.handler = function(item) {
  var level = item.level
  if (level < Level.DEBUG) {
    level = Level.DEBUG
  } else if (level > Level.ERROR) {
    level = Level.ERROR
  }
  var levelName = Level.toName(level)
  safeConsole.console(levelName, item.data)
}

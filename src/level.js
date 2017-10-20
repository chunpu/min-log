// https://logging.apache.org/log4j/2.x/manual/customloglevels.html
var _ = require('min-util')

_.each('verbose debug log info warn error fatal off'.split(' '), function(level, i) {
  exports[_.upper(level)] = i + 1
})

exports.toCode = function(levelName) {
  return exports[_.upper(levelName)] || levelName
}

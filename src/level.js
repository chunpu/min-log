// https://logging.apache.org/log4j/2.x/manual/customloglevels.html
var _ = require('min-util')

var keys = 'verbose debug log info warn error fatal off'.split(' ')

_.each(keys, function(level, i) {
  exports[_.upper(level)] = i + 1
})

exports.toCode = function(levelName) {
  return exports[_.upper(levelName)] || levelName
}

exports.toName = function(levelCode) {
  return _.find(keys, function(key) {
    return exports[_.upper(key)] === levelCode
  })
}

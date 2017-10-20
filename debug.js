var log = require('./')

var Debug = function(name) {
  return log.getLevelFunction('debug')
}

module.exports = exports = Debug

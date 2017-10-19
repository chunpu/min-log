var _ = require('min-util')
var safeConsole = require('../safeconsole')

var inherit = 'color:inherit'

exports.handler = function(item, sdk) {
  var lastItem = sdk.lastItem || {}
  var lastTime = lastItem.timestamp || item.timestamp

  var delta = item.timestamp - lastTime
  var colorStyle = 'color:' + item.color
  var label = sdk.prefix + item.name
  var main = '%c' + label + '%c'
  var arr = [null, colorStyle, inherit]

  _.each(item.data, function(val) {
    arr.push(val)
    main += ' %o'
  })

  arr.push(colorStyle)
  main += '%c +' + delta + 'ms'
  arr[0] = main
  safeConsole.console('log', arr)
}

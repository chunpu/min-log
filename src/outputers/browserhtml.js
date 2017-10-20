var _ = require('min-util')
var util = require('../util')

var box = null // 唯一的

function Output() {
}

var proto = Output.prototype

proto.init = function(sdk) {
  var doc = global.document
  if (doc) {
    if (!box) {
      box = doc.createElement('div')
      box.style.cssText = 'z-index:999;padding:16px;height:300px;overflow:auto;line-height:1.4;background:#333;color:#fff;font:16px Consolas;border:none;'
      var parent = doc.body || doc.documentElement
      parent.insertBefore(box, parent.firstChild)
    }
  }
}

proto.handler = function(item, sdk) {
  if (!global.document) {
    return
  }
  var lastItem = sdk.lastItem || {}
  var lastTime = lastItem.timestamp || item.timestamp

  var delta = item.timestamp - lastTime
  var label = sdk.prefix + item.name
  var arr = [label]

  _.each(item.data, function(val) {
    arr.push(util.safeStringify(val))
  })
  arr.push('+' + delta + 'ms')
  var line = document.createElement('div')
  util.text(line, arr.join(' '))
  line.style.color = item.color
  box.appendChild(line)
}

module.exports = new Output()

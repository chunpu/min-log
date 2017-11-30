var _ = require('min-util')
var util = require('../util')

function Output() {
  this.inited = false
  this.box = null
}

var proto = Output.prototype

proto.init = function(sdk) {
  if (!this.inited) {
    this.inited = true
    var doc = global.document
    if (doc) {
      this.box = doc.createElement('div')
      this.box.style.cssText = 'z-index:999;padding:16px;height:300px;overflow:auto;line-height:1.4;background:#242424;color:#fff;font-size:16px; font-family: monospace,consolas,"Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;border:none;text-align:left'
      var parent = doc.body || doc.documentElement
      parent.insertBefore(this.box, parent.firstChild)
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
  this.box.appendChild(line)
}

module.exports = new Output()

// inspired by https://github.com/AlloyTeam/AlloyLever/blob/master/alloy-lever.js

var console = require('./console')
var util = require('../util')
var ready = require('min-ready')()

function Output() {
  this.inited = false
  this.isReady = false
}

var proto = Output.prototype

proto.init = function() {
  var me = this
  if (!me.inited) {
    me.inited = true
    var vConsoleUrl = '//s.url.cn/qqun/qun/qqweb/m/qun/confession/js/vconsole.min.js'
    util.loadScript(vConsoleUrl, function() {
      // default show
      me.run()
      window.addEventListener('load', function() {
        me.run()
      })
    })
  }
}

proto.ready = function(func) {
  ready.queue(func)
}

proto.run = function() {
  try {
    vConsole.show()
    this.isReady = true
    ready.open()
  } catch (ignore) {}
}

proto.handler = console.handler

module.exports = new Output()

// inspired by https://github.com/AlloyTeam/AlloyLever/blob/master/alloy-lever.js

var console = require('./console')
var util = require('../util')

function Output() {
  this.inited = false
}

var proto = Output.prototype

proto.init = function() {
  if (!this.inited) {
    this.inited = true
    var vConsoleUrl = '//s.url.cn/qqun/qun/qqweb/m/qun/confession/js/vconsole.min.js'
    util.loadScript(vConsoleUrl, function() {
      // default show
      try {
        vConsole.show()
      } catch (e) {}
      window.addEventListener('load', function() {
        vConsole.show()
      })
    })
  }
}

proto.handler = console.handler

module.exports = new Output()

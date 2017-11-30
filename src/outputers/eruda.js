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
    var erudaUrl = '//cdn.jsdelivr.net/npm/eruda' // 支持 https
    util.loadScript(erudaUrl, function() {
      // default show
      try {
        eruda.init()
      } catch (e) {}
    })
  }
}

proto.handler = console.handler

module.exports = new Output()

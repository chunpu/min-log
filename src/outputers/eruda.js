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
    var erudaUrl = '//cdn.jsdelivr.net/npm/eruda' // 支持 https
    util.loadScript(erudaUrl, function() {
      try {
        me.run()
      } catch (e) {}
    })
  }
}

proto.ready = function(func) {
  ready.queue(func)
}

proto.run = function() {
  try {
    eruda.init()
    this.isReady = true
    ready.open()
  } catch (ignore) {}
}

proto.handler = console.handler

module.exports = new Output()

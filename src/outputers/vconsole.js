// inspired by https://github.com/AlloyTeam/AlloyLever/blob/master/alloy-lever.js

var console = require('./console')

function Output() {
  this.inited = false
}

var proto = Output.prototype

proto.init = function() {
  if (!this.inited) {
    this.inited = true
    var vConsoleUrl = '//s.url.cn/qqun/qun/qqweb/m/qun/confession/js/vconsole.min.js'
    loadScript(vConsoleUrl, function() {
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

function loadScript(src, callback){
  var s,
    r,
    t
  r = false
  s = document.createElement('script')
  s.type = 'text/javascript'
  s.src = src
  s.onload = s.onreadystatechange = function() {
    //console.log( this.readyState ); //uncomment this line to see which ready states are called.
    if ( !r && (!this.readyState || this.readyState == 'complete') ) {
      r = true
      callback()
    }
  }
  t = document.getElementsByTagName('script')[0]
  t.parentNode.insertBefore(s, t)
}

module.exports = new Output()

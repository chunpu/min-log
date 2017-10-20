var _ = require('min-util')
var is = _.is
var qs = require('min-qs')

function isIE() {
  if (is.browser()) {
    if (/Trident/i.test(navigator.userAgent)) {
      return true
    }
  }
  return false
}

function supportBrowserColor() {
  if (is.wechatApp()) {
    return true
  }
  if (isIE()) { // 可能可以改成 is.h5
    return false
  }
  if (!is.browser()) {
    return false
  }
  return true
}

function text(el, val) {
  var key = 'textContent'
  if (!is.owns(el, key)) {
    key = 'innerText'
  }
  el[key] = val
}

function safeStringify(val) {
  try {
    val = JSON.stringify(val, 0, 4)
  } catch (e) {
    val += ''
  }
  return val
}

function getUserOptions(keys) {
  // url.query, localStorage, process.env
  var pool = []
  if (global.location) {
    var query = qs.parse(_.slice(location.search, 1))
    pool.push(query)
  }
  if (global.localStorage) {
    pool.push(localStorage)
  }
  var env = _.get(global, ['process', 'env'])
  if (env) {
    pool.push(env)
  }
  var opt = _.find(pool, function(obj) {
    var opt
    try {
      opt = pick(obj, keys)
    } catch (e) {
      opt = null
    }
    if (opt) {
      return opt
    }
  })
  return opt || {}
}

function pick(obj, keys) {
  var ret = {}
  var picked = false
  _.each(keys, function(key) {
    if (is.owns(obj, key)) {
      picked = true
      ret[key] = obj[key]
    }
  })
  if (picked) {
    return ret
  }
}

exports.isIE = isIE
exports.supportBrowserColor = supportBrowserColor
exports.safeStringify = safeStringify
exports.text = text
exports.getUserOptions = getUserOptions

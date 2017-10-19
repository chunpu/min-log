var _ = require('min-util')
var is = _.is

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

function safeStringify(val) {
  try {
    val = JSON.stringify(val, 0, 4)
  } catch (e) {
    val += ''
  }
  return val
}

exports.isIE = isIE
exports.supportBrowserColor = supportBrowserColor
exports.safeStringify = safeStringify

var log = require('./')

log.log(1111)

log.error(1111, {a: 1, b: [1, 2, 3]}, "xxxx")

log.error(new Error(1123))


console.log(log.Log.getPlainLog())

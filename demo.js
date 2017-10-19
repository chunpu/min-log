var errlog = log.getLogger({name: 'error', color: 'red'})
var log1 = log.getLogger('worker:a')
var log2 = log.getLogger('worker:b')

$(function() {
  $('input').on('click', function() {
    init()
  })
  init()
})

function init() {
  var arr = $('form').serializeArray()
  for (var i = 0; i < arr.length; i++) {
    var name = arr[i].name
    var val = arr[i].value
    if (name === 'outputer') {
      log.sdk.setOutputer(val)
    } else if (name === 'name') {
      log.sdk.setName(val)
    } else if (name === 'level') {
      log.sdk.setLevel(log.levels[val.toUpperCase()])
    }
  }
  run()
}

function run() {
  var delta = 300
  var current = 0
  function delay(fn) {
    setTimeout(fn, current)
    current += delta
  }

  delay(function() {
    log.error('-------------------------')
  })

  delay(function() {
    log1.debug('this is', log1.name)
  })

  delay(function() {
    log2.debug('this is', log2.name)
  })

  delay(function() {
    errlog.error('this is', errlog.name, 'my color is red')
  })

  delay(function() {
    log2.warn('this is warn level')
  })

  delay(function() {
    log2.info('this is error level')
  })

  delay(function() {
    log1.info('this is info level')
  })

  delay(function() {
    log1.debug('this is debug level')
  })

  delay(function() {
    log1.verbose('this is verbose level')
  })

  delay(function() {
    if (log1.enabled) {
      log1.debug('put mock code block in `if (log.enabled)`')
    }
  })
}

var errlog = log.getLogger({name: 'error', color: 'red'})
var log1 = log.getLogger('com.worker:a')
var log2 = log.getLogger('worker:b')

$(function() {
  $('input').on('click', function() {
    init()
  })
  init()
})

function init() {
  var val = $('form').serialize()
  var qs = log.qs.parse(val)
  log.setOptions(qs)
  log.clear()
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
    log1.debug('this name is', log1.name)
  })

  delay(function() {
    log2.debug('this name is', log2.name)
  })

  delay(function() {
    errlog.error('this name is', errlog.name, 'my color is red')
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
    log1.debug('this color is', log1.color)
  })

  delay(function() {
    log2.debug('this color is', log2.color)
  })

  delay(function() {
    errlog.debug('this color is', errlog.color)
  })

  delay(function() {
    if (log1.isDebugEnabled()) {
      log1.debug('put mock code block in `if (log.isDebugEnabled()) {}`')
    }
  })

  delay(function() {
    errlog.debug('current log history is', log.getHistory().length)
  })
}

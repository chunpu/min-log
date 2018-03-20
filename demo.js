// log.setColors(['#f8f8f2', 'goldenrod', '#66d9ef', '#a6e22e', '#e6db74', '#f92672'])
var errlog = log.getLogger({name: 'error', color: 'red'})
var log1 = log.getLogger('main:a')
var log2 = log.getLogger('main:b')

function onChangeOption() {
  var val = $('form').serialize()
  location.search = '?' + val
}

$(function() {
  $('input').on('click', function() {
    onChangeOption()
  })
  $form = $('form')
  var _ = log._
  var query = log.qs.parse(_.slice(location.search, 1))
  _.forIn(query, function(val, key) {
    var $input = $form.find('[name=' + key + ']').filter(function() {
      return $(this).val() === val
    })
    $input.prop('checked', true)
  })
  setTimeout(run, 500)
})

function run() {
  var delta = 300
  var current = 0
  function delay(fn) {
    setTimeout(fn, current)
    current += delta
  }

  delay(function() {
    log.error('start-------------------------')
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

  delay(function() {
    log.error('finish-------------------------')
  })
}

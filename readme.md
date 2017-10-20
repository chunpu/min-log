min-log
---

Debug module for browsers which can Display on page or in Console, for Phone and old IE debugging

## Installation

```sh
yarn add min-log
```


## Usage

```js
var log = require('min-log')

log.debug('hello')
```

### Advanced Usage

debug with namespace like package name

```js
var log = require('min-log').getLogger('com:foo')

log.debug('this file log')
```


#### Run Debug Code Block

```js
var log = require('min-log')
if (log.isDebugEnabled()) {
  doSomeMockThing()
}
```

### Log History

`min-log` default enable history, default history size is `3000`

Api | Description
--- | ---
`log.setHistorySize(1000)` | Set history size
`log.disableHistory()` | Disable history
`log.getHistory()` | Get history
`log.clear()` | Clear history
`log.save()` | Save history

### Debug Level

Set Level

```js
log.setLevel('debug') // set debug level
```

Level | Description
--- | ---
`verbose` | Detail and verbose debug log only developper cares
`debug` | Debug log only developper cares
`info` | Normal info user should care like login or logout
`warn` | Some waring user should care like cookie expired
`error` | Some serious error user should care like server return error

### Outputer

Set Outputer

```js
log.setOutputer('browser_color') // set browser color outputer
```

Outputer | Usage
--- | ---
`console` | Simple console output like `console.log`
`node_console` | Print log with color in node
`browser_console` | Print log with color in browser
`browser_html` | Print log in document by html (for old IE or phone website)
`vconsole` | Remote call [vConsole](https://github.com/Tencent/vConsole) to print log

### Debug Style

If you like [tj@debug](https://github.com/visionmedia/debug) and just use `debug` level, you can do this

```js
var debug = require('min-log/debug')('http')

debug('booting')
```

### Set Config

You can set log config for `min-log`

Name | Purpose
--- | ---
`log_name` | Enables/disables specific debugging namespaces
`log_level` | Set log level like `debug`
`log_outputer` | Set outputer like `browser_console`

### Formatter

TODO

Formatter | Representation
--- | ---
`%O` | Pretty-print an Object on multiple lines
`%o` | Pretty-print an Object all on a single line
`%s` | String
`%d` | Number
`%j` | JSON
`%%` | Single percent sign ('%'). This does not consume an argument

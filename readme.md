min-log
---

![browser_console](https://user-images.githubusercontent.com/4565306/31819867-43e78e34-b564-11e7-9ad4-1877c97a3660.png)

Better Logger with Custom Level and Outputer Taking over the original console

Support All Browsers which can Display on page or in Console, for Phone and old IE debugging, support wechat miniprogram

[Example page](https://chunpu.github.io/min-log)

## Installation

```sh
npm i min-log
```

## Usage

```js
var log = require('min-log')

log.debug('hello')
```

## Direct Replace console

If you already has a project with `console.log`, just add a plugin to webpack config

then `min-log` will take over all consoles and hide all logs by default

```js
plugins: [
  new webpack.ProvidePlugin({
    console: 'min-log'
  })
]
```

If want have logger with namespace

e.g. `animal.js`, use filename as log namespace to take over `console`

```js
const console = require('min-log').getLogger('animal')
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
`fatal` | Some fatal error which will crash the program

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
`eruda` | Remote call [Eruda](https://github.com/liriliri/eruda) to print log

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
`log_outputer` | Set outputer like `browser_html`

`min-log` will try to get user config from three ways in order

1. `Query` in page url e.g. `my.site.com/path?log_name=*&log_level=debug&log_output=browser_html`
1. `localStorage` e.g. `localStorage.log_level = debug`
1. `Environment` e.g. `log_level=debug log_name=main* node app.js`


### Other Config

set log colors

```js
log.setColors(['#f8f8f2', 'goldenrod', '#66d9ef', '#a6e22e', '#e6db74', '#f92672'])
```

set log namespace prefix

```js
log.setPrefix('com:company:')
```

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

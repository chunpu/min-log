min-log
---

Debug module for browsers which can Display on page or in Console, for Phone and old IE debugging

### Installation

```sh
yarn add min-log
```


### Usage

```js
var log = require('min-log')

log.debug('hello')
```

#### Advanced Usage

debug with namespace like package name

```js
var log = require('min-log').getLogger('com:my:file')

log.debug('this file log')
```


##### Run Debug Code Block

```js
var log = require('min-log')
if (log.enabled) {
  doSomeMockThing()
}
```

#### Log History

`min-log` default enable history, default history size is `3000`

Disable history by `log.disableHistory()`

Set history size by `log.setHistorySize(1000)`

Clear history by  `log.clear()`

Save history by `log.save()`


### Debug Level

1. debug 即 verbose 级别, 开发者才需要关注的调试信息
1. log 不建议使用, 过于笼统, 不够语义化
1. info 普通用户需要关注的信息, 比如登入登出
1. warning 一些警告, 但不严重, 比如 cookie 过期
1. error 严重的错误, 程序报错, 后端返回错误

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


### Reference

- [Chrome 使用控制台](https://developers.google.com/web/tools/chrome-devtools/console/)
- [Chrome 使用控制台参考](https://developers.google.com/web/tools/chrome-devtools/console/console-reference)

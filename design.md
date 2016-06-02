min-log 

### level

有数字，也有名字，数字对应名字

log (1) < debug (2) < info (3) < warn (4) < error (5)

`code2name()`

`name2code()`

都是函数因为都有默认值，默认 level 是 `debug`


### name

name 不匹配则 `this.enabled = false`

name 在 loggers 这个 map 中是唯一的，loggers 已 name 为 key

name 匹配使用通配符

为什么选择 debug 那个 pattern 模式，因为针对每个 name 配置 level 啥的太复杂了，太细节了

`Log.name` 默认是 `*`

`log.name` 默认值 `default`


### prefix

prefix 和 name 的关系

prefix 不同于 name，因为可能多个项目使用这个 `min-log`

给一个项目定义 prefix 是有意义的，但 prefix 不会放在 log item 占地方

`Log.prefix` 默认值是 `""`


### log item

item 有如下值

- name
- level
- data
- time


### 最小影响

level 不达标准和 name 不匹配都直接 return


### getLogger

`getLogger(name)`

如果 loggers 中有现成的 logger，则直接返回

否则新建一个 logger


### getLevelFunction

```js
var debug = log.getLogger('main').getLevelFunction('debug')
```

如果你想完全只用一个 level，就像 debug 那样使用

`debug(msg)` 而不是 `log.debug(msg)`


### delay output

`console.log` 在 tty 中是阻塞输出，在浏览器的 console 中输出也非常耗性能

对于复杂的程序会让浏览器直接卡死

输出到文件中也会对磁盘损耗严重

output 会被先缓存在 outputCache 中

然后被 debounce 包围

```js
Log.wait = 100
Log.maxWait = 500

var output = _.debounce(function() {
	// output cache
}, Log.wait, {
	leading: true,
	trailing: true,
	maxWait: Log.maxWait
})
```

### last log item

上一次输出被存在 Log 中

`Log.lastLog` 和 debounce 冲突

替换方案是 logs 变成链表，后果未知


### 插件方式为 filter

#### logFilters

```js
// demo
logFilter(currentLog, lastLog)
```

内置默认 logFilter

```js
customLogFilter1
customLogFilter2
function(currentLog) {
	logs.push(currentLog)
}
function(currentLog) {
	outputCache.push(currentLog)
}
```


### output

默认值

`Function.prototype.apply.call(console[levelName], console, log.data)`

IE8/9 没有 `console.log` 的 apply


### init

Log.init 默认不会执行

`Log.debugKey` 默认值为 `debug`

Log.init 按 url, env, localStorage 的顺序寻找 debugKey 的值作为 `Log.name` 来初始化

`Log.init` 会执行 updateName


### updateName

会重新把现存的 logger enabled 状态刷新一遍


### 为什么 exports 的是 default log 而不是 Log

因为 node 的 console 就是这样的，console.Console 才拿到构造函数


参考文档

- node console https://nodejs.org/api/console.html
- Specifications <https://github.com/DeveloperToolsWG/console-object/blob/master/api.md#consolelogobject--object->
- Nodejs `util.format` <https://nodejs.org/dist/latest-v6.x/docs/api/util.html#util_util_format_format>
- chrome doc <https://developer.chrome.com/devtools/docs/console-api#consolelogobject-object>


`util.inspect` <https://nodejs.org/dist/latest-v6.x/docs/api/util.html#util_util_inspect_object_options>

- `%s` string
- `%i %d` integer digital, 因为浏览器和C都是 integer
- `%f` number
- `%j` json with `[Circular]`
- `%o` object，这个地方使用 inspect，因为可以 custom object.inspect, 其他没意义, 数字和字符串没意义
- `%O` expanded object, 总是显示更多,比如 error

TODO

浏览器需要可选直接 console.log 还是变成 string

需要可设置 level，name，level 有默认 ERROR 等别称, name 一样的话属于同一个 logger，所以叫 getLogger 也是很对的

实现 uniq name 的功能可以用缓存，也可以用事件


设置为 6 的时候也没了

需要 debug output

需要 debug callback

http://benalman.com/code/projects/javascript-debug/examples/debug/

util.inspect https://nodejs.org/dist/latest-v4.x/docs/api/util.html#util_util_inspect_object_options

https://developer.chrome.com/devtools/docs/commandline-api#inspectobject

inspect options

- showHidden
- depth
- colors
- customInspect(depth, opt)
- showCircular 我自己加的

util.print 被 deprecate 了

http://www.bennadel.com/blog/2829-string-interpolation-using-util-format-and-util-inspect-in-node-js.htm

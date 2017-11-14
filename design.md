# min-log

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



打造全功能 logger

打印日志大家都会 printf 嘛

在最初接手项目的时候，debug 是这样写的

```
if debug then
  printf(xxx)
end
```

但实际项目中往往会碰到这些问题


- 日志过多，茫茫的一片完全看不懂
- 重要日志和调试日志放在一块儿了，偏偏调试日志还是主要篇幅
- 项目很多，各个项目的日志难以放在一起
- 放在一起，项目间日志也难以区分
- 日志无法导出

### 为什么这么看重日志

我一直坚持日志是规范的，如果出问题的话，看日志就能排查出问题，或者定位问题

更主要的是，有很多语言是无法断点调试的，这时候日志调试就发挥了巨大的作用，关键点位的日志不能少

很多问题是千里之外的客户发现的，但我们又无法接触客户，这时候就需要日志导出来细细分析日志了


各种语言都有自己重量级的日志框架

比如 log4j

但这些框架过于庞大，还是用 xml 作为配置文件，对于小项目有点杀鸡用牛刀


那怎样搞一个轻量级但是又全功能的日志库呢？

Javascript 中有一个非常有名的库叫 [debug](https://github.com/visionmedia/debug)，是 TJ 大大的作品，它被最有名的 nodejs server 框架 KOA 引用

大大小小的 KOA 都使用了这个库

debug 解决了很多关键问题

最重要的就是彩色日志，debug 为各个文件的 debugger 加上一个独特的颜色，这样打出来的日志都会按照颜色区分了

第二个是有效解决了哪些 debugger 可以输出，相比复杂的 xml 配置，debug 用一个字符串 `DEBUG=*,-connect:*` 就能表达足够多的意思

debug 完美解决了时间的问题，其他日志库都是给出一长串完整的时间，而 debug 却给出了一个差值，几毫秒，非常人性化

那直接用 debug 不就好了吗，你可能会说了

确实这样，我之前就实现过一个 [min-debug](https://github.com/chunpu/min-debug/tree/v1.5)，一个极度轻量级的类 debug 框架

但项目越来越复杂，需求越来越多，debug 的问题也暴露出来

最重要的就是没有 debug level，也就是常见的 info debug info warn error 这样的错误

这会让我们在选择日志的时候束手束脚，没有 level 会导致 error 和 verbose 日志一起出来，但明显这两个日志重量级是不一样的

同样，日志导出在前端也愈发重要了，不然将浪费大量时间在盲目模拟上

基于这样的目的，[min-log](https://github.com/chunpu/min-log) 诞生了

实现逻辑非常清晰

```js
var log = require('min-log').getLogger('name')

log.info('some info')
log.error(new Error('panic'))
```

判断是否要输出的逻辑是这样的

1. 如果 log 的 name 匹配配置中的 namespace
1. 并且 log 的 level >= 配置中的最低 level
  1. 输出日志

匹配 level 不过是匹配一个数字，但 name 匹配可是要执行一堆正则啊

显然在线上环境我们每个 debug 都要走一遍正则是不能容忍的

因此和 debug 一样，我们选择在初始化的时候用环境变量就定义了是否允许输出日志

最终，我们只需要判断 log 是否 enabled 以及 level 是否足够高两个条件就够了，性能消耗可以忽略


### log 的 namespace 初始化

debug 提供了很完美的初始化方案，env 的 debug 和 localStorage 的 debug 值

我只是又添加了一种方案就是 url `debug=` 值，因为毕竟有些浏览器很难打开 console 输入 localStorage 的，比如手机浏览器和低端IE

完美解决了几乎所有后端前端场景

同时又设置了自定义 debug key，显然是为了前端保密用的，防止大家都用 debug，然后没事就加个 debug=* 到 localStorage 中看日志

### Reference

- [Chrome 使用控制台](https://developers.google.com/web/tools/chrome-devtools/console/)
- [Chrome 使用控制台参考](https://developers.google.com/web/tools/chrome-devtools/console/console-reference)
- [Node.js 之 log4js 完全讲解](https://zhuanlan.zhihu.com/p/22110802)
- <http://blog.csdn.net/iefreer/article/details/34442183>
- <https://www.zhihu.com/question/27607741>
- <http://blog.fens.me/nodejs-log4js/>
- <https://cnodejs.org/topic/53e3b578fdce29004e0d1387>
- logrus
- [uber-go/zap](https://github.com/uber-go/zap)
- glog
- seelog
- <http://www.mkideal.com/golang/log.html>


TODO

log.download

```js
      try{
        var $a = $('<a>')
          .attr('download', 'xxxxx' + (new Date().getTime()) + '.txt')
          .attr('href', URL.createObjectURL(new Blob([history.join('\r\n')])))
          .click();
        var evt = document.createEvent("HTMLEvents");
        evt.initEvent("click", false, false);
        $a[0].dispatchEvent(evt);
      } catch (e) {
        var win = window.open('about:blank', 'QHPass Log');
        win.document.write(history.join('\r\n'));
      }
    ```

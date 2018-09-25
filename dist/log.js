/*! min-log@2.4.0 by chunpu */
!function(n,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.log=t():n.log=t()}(this,function(){return function(n){function t(r){if(e[r])return e[r].exports;var i=e[r]={exports:{},id:r,loaded:!1};return n[r].call(i.exports,i,i.exports,t),i.loaded=!0,i.exports}var e={};return t.m=n,t.c=e,t.p="",t(0)}([function(n,t,e){var r=e(1);n.exports=t=r.getLogger()},function(n,t,e){function r(n){var t=this;u.string(n)&&(n={name:n}),n=n||{};var e=n.name||"default";t.name=e,t.Level=a,t.sdk=l,t.enabled=l.isNameEnabled(e),t.color=n.color||t.sdk.getRandomColor(e),t.util=f,t._=o,t.qs=s}function i(n){var t=l.loggers,e=t[n];return e||(e=t[n]=new r(n)),e}var o=e(2),u=o.is,a=e(14),c=e(15),f=e(23),s=e(24),l=new c;n.exports=t=r;var p=o.map(o.keys(a),function(n){return o.lower(n)}),h=r.prototype;h.getLogger=r.getLogger=i,h.output=function(n,t){var e=this,r={level:n,name:e.name,enabled:e.enabled,timestamp:o.now(),data:t,color:e.color,done:!1};l.output(r)},o.each(p,function(n){var t=a.toCode(n);h[n]=function(){this.output(t,arguments)};var e="is"+o.capitalize(n)+"Enabled";h[e]=function(){return this.sdk.isLevelEnabled(t)}});var v="setOptions setOutputer setName setLevel setHistorySize getHistory disableHistory clear save setColors".split(" ");o.each(v,function(n){h[n]=function(){return this.sdk[n].apply(this.sdk,arguments)}}),h.getLevelFunction=function(n){var t=this,e=a.toCode(n)||a.DEBUG;return function(){t.output(e,arguments)}}},function(n,t,e){n.exports=e(3)},function(n,t,e){function r(n){return this instanceof r?(this.__value=n,void(this.__chain=!1)):new r(n)}var i=e(4);n.exports=i.extend(r,i),e(6)(r),e(7)(r),e(8)(r),e(9)(r),e(10)(r),e(12)(r),e(13)(r),r.mixin(r,r)},function(n,t,e){function r(n){if(null!=n)return n.length}function i(n,t){var e=r(n);if(e&&h.fn(t))for(var i=0;i<e&&!1!==t(n[i],i,n);i++);return n}function o(n,t){var e=-1;return i(n,function(n,r,i){if(t(n,r,i))return e=r,!1}),e}function u(n){var t=[];return i(n,function(n){t.push(n)}),t}function a(n){if(n){var t=v.call(arguments,1);i(t,function(t){l(t,function(t,e){h.undef(t)||(n[e]=t)})})}return n}function c(n){return function(){return!n.apply(this,arguments)}}function f(n,t){return h.string(n)?n.indexOf(t):o(n,function(n){return t===n})}function s(n,t,e){return i(n,function(r,i){e=t(e,r,i,n)}),e}function l(n,t){if(n)for(var e in n)if(h.owns(n,e)&&!1===t(n[e],e,n))break;return n}function p(n){var t=[];return l(n,function(n,e){t.push(e)}),t}var h=e(5),v=[].slice,d=t;d.is=h,d.extend=d.assign=a,d.each=i,d.map=function(n,t){var e=[];return i(n,function(n,r,i){e[r]=t(n,r,i)}),e},d.filter=function(n,t){var e=[];return i(n,function(n,r,i){var o=t(n,r,i);o&&e.push(n)}),e},d.some=function(n,t){return-1!=o(n,t)},d.every=function(n,t){return-1==o(n,c(t))},d.reduce=s,d.findIndex=o,d.find=function(n,t){var e=d.findIndex(n,t);if(-1!=e)return n[e]},d.indexOf=f,d.includes=function(n,t){return-1!=f(n,t)},d.toArray=u,d.slice=function(n,t,e){var i=[],o=r(n);return o>=0&&(t=t||0,0!==e&&(e=e||o),h.fn(n.slice)||(n=u(n)),i=n.slice(t,e)),i},d.negate=c,d.forIn=l,d.keys=p;var g=/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;d.trim=function(n){return null==n?"":(""+n).replace(g,"")},d.noop=function(){},d.len=r},function(n,t){(function(n){function e(n){var t=u.toString.call(n);return t.substring(8,t.length-1).toLowerCase()}function r(n){return typeof n}function i(n,t){return u.hasOwnProperty.call(n,t)}var o=t,u=Object.prototype;n=n||{};var a=n.navigator;o.browser=function(){return!(o.wechatApp()||!a||n.window!=n)},o.h5=function(){return!(!o.browser()||!a.geolocation)},o.mobile=function(){return!(!o.browser()||!/mobile/i.test(a.userAgent))},o.wechatApp=function(){return!("object"!=typeof wx||!wx||!o.fn(wx.createVideoContext))},o._class=e,o._type=r,o.owns=i,o.nan=function(n){return n!==n},o.bool=function(n){return"boolean"==e(n)},o.infinite=function(n){return n==1/0||n==-(1/0)},o.number=function(n){return!isNaN(n)&&"number"==e(n)},o.iod=function(n){return!(!o.number(n)||o.infinite(n))},o.decimal=function(n){return!!o.iod(n)&&0!=n%1},o.integer=function(n){return!!o.iod(n)&&0==n%1},o.oof=function(n){if(n){var t=r(n);return"object"==t||"function"==t}return!1},o.object=function(n){return o.oof(n)&&"function"!=e(n)},o.hash=o.plainObject=function(n){return!(!n||"object"!=e(n))&&(!n.nodeType&&!n.setInterval)},o.undef=function(n){return"undefined"==r(n)},o.fn=function(n){return"function"==e(n)},o.string=function(n){return"string"==e(n)},o.nos=function(n){return o.iod(n)||o.string(n)},o.array=function(n){return"array"==e(n)},o.arraylike=function(n){if(!o.window(n)&&o.object(n)){var t=n.length;if(o.integer(t)&&t>=0)return!0}return!1},o.window=function(n){return!(!n||n.window!=n)},o.empty=function(n){if(o.string(n)||o.arraylike(n))return 0===n.length;if(o.hash(n))for(var t in n)if(i(n,t))return!1;return!0},o.element=function(n){return!(!n||1!==n.nodeType)},o.regexp=function(n){return"regexp"==e(n)}}).call(t,function(){return this}())},function(n,t){n.exports=function(n){var t=n.is;n.isString=t.string,n.isArray=t.array,n.isArrayLike=t.arraylike,n.isBoolean=t.bool,n.isElement=t.element,n.isEmpty=t.empty,n.isFunction=t.fn,n.isInteger=t.integer,n.isNaN=t.nan,n.isNumber=t.number,n.isObject=t.object,n.isPlainObject=t.plainObject,n.isRegExp=t.regexp,n.isString=t.string,n.isUndefined=t.undef}},function(n,t){n.exports=function(n){var t=n.is;n.now=function(){return+new Date},n.constant=function(n){return function(){return n}},n.identity=function(n){return n},n.random=function(n,t){return n+Math.floor(Math.random()*(t-n+1))},n.mixin=function(e,r,i){var o=n.functions(r);if(e)if(t.fn(e)){i=i||{};var u=e.prototype;n.each(o,function(n){var t=r[n];u[n]=function(){var n=this,e=[n.__value];e.push.apply(e,arguments);var r=t.apply(n,e);return n.__chain?(n.__value=r,n):r}})}else n.each(o,function(n){e[n]=r[n]});return e},n.chain=function(t){var e=n(t);return e.__chain=!0,e},n.value=function(){return this.__chain=!1,this.__value}}},function(n,t){n.exports=function(n){function t(t,e){var r=n.size(e);return t<0&&(t+=r),t<0&&(t=0),t>r&&(t=r),t||0}function e(t,e){var r=[],i=n.len(e);if(i)for(e=e.sort(function(n,t){return n-t});i--;){var o=e[i];r.push(u.splice.call(t,o,1)[0])}return r.reverse(),r}var r=n.forEach=n.each,i=n.includes,o=n.is,u=Array.prototype;n.reject=function(t,e){return n.filter(t,function(n,t,r){return!e(n,t,r)})},n.without=function(t){var e=n.slice(arguments,1);return n.difference(t,e)},n.difference=function(t,e){var r=[];return n.each(t,function(n){i(e,n)||r.push(n)}),r},n.pluck=function(t,e){return n.map(t,function(n){if(n)return n[e]})},n.nth=function(e,r){r=t(r,e),r=r||0;var i;return i=n.isString(e)?e.charAt(r):e[r]},n.first=function(t){if(t)return n.nth(t,0)},n.last=function(t){var e=n.len(t);if(e)return n.nth(t,e-1)},n.asyncMap=function(n,t,e){var i,o,u=[],a=0;r(n,function(r,c){o=!0,t(r,function(t,r){if(!i){if(a++,t)return i=!0,e(t);u[c]=r,a==n.length&&(i=!0,e(null,u))}})}),o||e(null)},n.uniq=function(t){return n.uniqBy(t)},n.uniqBy=function(n,t){var e=[],u=[];return o.fn(t)||(t=null),r(n,function(n){var r=n;t&&(r=t(n)),i(u,r)||(u.push(r),e.push(n))}),e},n.flatten=function(n){var t=[];return r(n,function(n){o.arraylike(n)?r(n,function(n){t.push(n)}):t.push(n)}),t},n.union=function(){return n.uniq(n.flatten(arguments))},n.sampleSize=function(t,e){for(var r=n.toArray(t),i=r.length,o=Math.min(e||1,i),u=0;u<i;u++){var a=n.random(u,i-1),c=r[a];r[a]=r[u],r[u]=c}return r.length=o,r},n.sample=function(t){return n.first(n.sampleSize(t,1))},n.shuffle=function(t){return n.sampleSize(t,1/0)},n.compact=function(t){return n.filter(t,n.identity)},n.rest=function(t){return n.slice(t,1)},n.invoke=function(){var t=arguments,e=t[0],r=t[1],i=o.fn(r);return t=n.slice(t,2),n.map(e,function(n){if(i)return r.apply(n,t);if(null!=n){var e=n[r];if(o.fn(e))return e.apply(n,t)}})},n.partition=function(t,e){var r=n.groupBy(t,function(n,t,r){var i=e(n,t,r);return i?1:2});return[r[1]||[],r[2]||[]]},n.groupBy=function(t,e){var r={};return n.each(t,function(n,t,i){var o=e(n,t,i);r[o]=r[o]||[],r[o].push(n)}),r},n.range=function(){var t=arguments;if(t.length<2)return n.range(t[1],t[0]);var e=t[0]||0,r=t[1]||0,i=t[2];o.number(i)||(i=1);var u=r-e;0!=i&&(u/=i);for(var a=[],c=e,f=0;f<u;f++)a.push(c),c+=i;return a},n.pullAt=function(t){var r=n.slice(arguments,1);return e(t,r)},n.remove=function(t,r){for(var i=n.len(t)||0,o=[];i--;)r(t[i],i,t)&&o.push(i);return e(t,o)},n.fill=function(e,r,i,o){var u=n.size(e);i=t(i,e)||0,o=t(o,e)||u;for(var a=i;a<o;a++)e[a]=r;return e},n.size=function(t){var e=0;if(t){var r=t.length;n.isInteger(r)&&r>=0?e=r:n.isObject(t)&&(e=n.keys(t).length)}return e}}},function(n,t){n.exports=function(n){function t(t){if(e.array(t))return t;var r=[];return n.toString(t).replace(i,function(n,t,e,i){var u=t||n;e&&(u=i.replace(o,"$1")),r.push(u)}),r}var e=n.is,r=n.forIn;n.only=function(t,r){return t=t||{},e.string(r)&&(r=r.split(/ +/)),n.reduce(r,function(n,e){return null!=t[e]&&(n[e]=t[e]),n},{})},n.values=function(t){return n.map(n.keys(t),function(n){return t[n]})},n.pick=function(t,i){if(!e.fn(i))return n.pick(t,function(n,t){return t==i});var o={};return r(t,function(n,t,e){i(n,t,e)&&(o[t]=n)}),o},n.functions=function(t){return n.keys(n.pick(t,function(n){return e.fn(n)}))},n.mapKeys=function(n,t){var e={};return r(n,function(n,r,i){var o=t(n,r,i);e[o]=n}),e},n.mapObject=n.mapValues=function(n,t){var e={};return r(n,function(n,r,i){e[r]=t(n,r,i)}),e},n.get=function(e,r){if(r=t(r),r.length){var i=n.every(r,function(n){if(null!=e)return e=e[n],!0});if(i)return e}},n.has=function(r,i){if(i=t(i),i.length){var o=n.every(i,function(n){if(null!=r&&e.owns(r,n))return r=r[n],!0});if(o)return!0}return!1},n.set=function(r,i,o){i=t(i);var u=r;return n.every(i,function(n,t){if(e.oof(u)){if(t+1!=i.length){var r=u[n];if(null==r){var r={};~~n==n&&(r=[])}return u=u[n]=r,!0}u[n]=o}}),r},n.create=function(){function t(){}return function(e,r){return"object"!=typeof e&&(e=null),t.prototype=e,n.extend(new t,r)}}(),n.defaults=function(){var t=arguments,r=t[0],i=n.slice(t,1);return r&&n.each(i,function(t){n.mapObject(t,function(n,t){e.undef(r[t])&&(r[t]=n)})}),r},n.isMatch=function(n,t){var e=!0;return n=n||{},r(t,function(t,r){if(t!==n[r])return e=!1,!1}),e},n.toPlainObject=function(n){var t={};return r(n,function(n,e){t[e]=n}),t},n.invert=function(n){var t={};return r(n,function(n,e){t[n]=e}),t};var i=/[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\n\\]|\\.)*?)\2)\]/g,o=/\\(\\)?/g}},function(n,t,e){n.exports=function(n){function t(n){function e(){var t=arguments,e=t[0];if(!r.has(e)){var i=n.apply(this,t);r.set(e,i)}return r.get(e)}var r=new t.Cache;return e.cache=r,e}var r=n.is,i=n.slice;n.bind=function(t,e){if(r.string(e)){var o=t;t=o[e],e=o}if(!r.fn(t))return t;var u=i(arguments,2);return e=e||this,function(){return t.apply(e,n.flatten([u,arguments]))}},n.inherits=function(t,e){t.super_=e,t.prototype=n.create(e.prototype,{constructor:t})},n.delay=function(t,e){var r=n.slice(arguments,2);return setTimeout(function(){t.apply(this,r)},e)},n.before=function(n,t){return function(){if(n>1)return n--,t.apply(this,arguments)}},n.once=function(t){return n.before(2,t)},n.after=function(n,t){return function(){return n>1?void n--:t.apply(this,arguments)}},n.throttle=function(t,e,r){return e=e||0,r=n.extend({leading:!0,trailing:!0,maxWait:e},r),n.debounce(t,e,r)},n.debounce=function(t,e,r){function i(){return!(p-s>e)&&!(f&&p-l>f)}function o(t,e,r){return s=n.now(),t.apply(e,r)}function u(){c&&(clearTimeout(c),c=null)}function a(){p=n.now();var a=i();l=p;var f=this,s=arguments;u(),a?r.trailing&&(c=n.delay(function(){o(t,f,s)},e)):o(t,f,s)}e=e||0,r=n.extend({leading:!1,trailing:!0},r);var c,f=r.maxWait,s=0,l=0,p=n.now();return r.leading||(s=p),a.cancel=u,a},t.Cache=e(11),n.memoize=t,n.wrap=function(n,t){return function(){var e=[n];return e.push.apply(e,arguments),t.apply(this,e)}},n.curry=function(t){function e(i){return function(){var o=i.concat(n.slice(arguments));return o.length>=r?(o.length=r,t.apply(this,o)):e(o)}}var r=t.length;return e([])}}},function(n,t,e){function r(){this.data={}}var i=e(4),o=i.is;n.exports=r;var u=r.prototype;u.has=function(n){return o.owns(this.data,n)},u.get=function(n){return this.data[n]},u.set=function(n,t){this.data[n]=t},u["delete"]=function(n){delete this.data[n]}},function(n,t){n.exports=function(n){function t(t,r){t=e(t)||" ";var i=Math.floor(r/t.length)+1;return n.repeat(t,i).slice(0,r)}function e(n){return n||0==n?n+"":""}n.tostr=n.toString=e;var r=n.indexOf;n.split=function(n,t,r){return n=e(n),n.split(t,r)},n.capitalize=function(n){return n=e(n),n.charAt(0).toUpperCase()+n.substr(1)},n.decapitalize=function(n){return n=e(n),n.charAt(0).toLowerCase()+n.substr(1)},n.camelCase=function(t){t=e(t);var r=t.split(/[^\w]|_+/);return r=n.map(r,function(t){return n.capitalize(t)}),n.decapitalize(r.join(""))},n.startsWith=function(n,t){return 0==r(n,t)},n.endsWith=function(t,e){return e+="",e==n.slice(t,n.len(t)-n.len(e))},n.toLower=n.lower=function(n){return e(n).toLowerCase()},n.toUpper=n.upper=function(n){return e(n).toUpperCase()},n.repeat=function(t,e){return n.map(n.range(e),function(){return t}).join("")},n.padStart=function(n,r,i){n=e(n),r=r||0;var o=r-n.length;return t(i,o)+n},n.padEnd=function(n,r,i){n=e(n),r=r||0;var o=r-n.length;return n+t(i,o)};var i={"&":"&amp","<":"&lt",">":"&gt",'"':"&quot","'":"&#39"};n.escape=function(n){return e(n).replace(/[&<>"']/g,function(n){return i[n]||n})},n.template=function(t){function e(t){var e=n.first(t);if("="===e||"-"===e){var r=n.slice(t,1);"-"===e&&(r="_.escape("+r+")"),i.push("ret += "+r)}else i.push(t)}function r(n){i.push('ret += "'+n.replace(/('|"|\\)/g,"\\$1").replace(/\r/g,"\\r").replace(/\n/g,"\\n")+'"')}var i=['with(data) {var ret = ""'];n.each(n.split(t,"<%"),function(t,i){var o=t.split("%>");return o[1]?(e(n.trim(o[0])),r(o[1])):void r(o[0])}),i.push("return ret}");var o=new Function("data",i.join("\n")),u={_:n},a=function(t){return o(n.extend({},u,t))};return a}}},function(n,t){n.exports=function(n){n.sum=function(t){return n.reduce(t,function(n,t){return n+t},0)},n.max=function(t,e){var r=-1,i=-(1/0);return e=e||n.identity,n.each(t,function(n,t){n=e(n),n>i&&(i=n,r=t)}),r>-1?t[r]:i},n.min=function(t,e){var r=-1,i=1/0;return e=e||n.identity,n.each(t,function(n,t){n=e(n),n<i&&(i=n,r=t)}),r>-1?t[r]:i}}},function(n,t,e){var r=e(2),i="verbose debug log info warn error fatal off".split(" ");r.each(i,function(n,e){t[r.upper(n)]=e+1}),t.toCode=function(n){return t[r.upper(n)]||n},t.toName=function(n){return r.find(i,function(e){return t[r.upper(e)]===n})}},function(n,t,e){function r(){var n=this;n.history=[],n.pendingItems=[],n.Level=o,n.loggers={},n.level=null,n.prefix="",n.pattern={},n.lastItem=null,n.outputers=u,n.colorMap={},n.colors="lightseagreen forestgreen goldenrod dodgerblue darkorchid crimson".split(" "),n.colorIndex=0,n.historySize=3e3,n.setOutputer(f.noop),n.autoInit()}function i(n){var t=[],e=[];return n&&s.string(n)&&f.each(n.split(/[\s,]+/),function(n){n=n.replace(/\*/g,".*?");var r=n.charAt(0);"-"===r?t.push(new RegExp("^"+f.slice(n,1)+"$")):e.push(new RegExp("^"+n+"$"))}),{skips:t,names:e}}var o=e(14),u=e(16),a=e(18),c=e(23),f=e(2),s=f.is;n.exports=r;var l=r.prototype;l.autoInit=function(){var n=this,t=n.getDefaultOptions(),e=n.getUserOptions(),r=f.extend({},t,e);n.setOptions(r)},l.setOptions=function(n){var t=this;t.setName(n.name),t.setLevel(n.level),t.setOutputer(n.outputer)},l.getDefaultOptions=function(){var n=this,t={level:o.INFO,outputer:n.autoChooseOutputer(),name:"*"};return t},l.getUserOptions=function(){var n=c.getUserOptions("log_name log_level log_outputer".split(" "));return{name:n.log_name,level:n.log_level,outputer:n.log_outputer}},l.autoChooseOutputer=function(){var n=f.noop;return a.hasConsole()&&(n=c.supportBrowserColor()?"browser_console":"node_console"),n},l.setOutputer=function(n){var t=this,e=null;s.string(n)?e=t.outputers[n]:s.fn(n)&&(e={handler:n}),e&&(t.outputer=e,s.fn(e.init)&&e.init(t),s.fn(e.ready)&&e.ready(function(){f.each(t.pendingItems,function(n){n.done===!1&&(e.handler(n),n.done=!0)}),t.pendingItems.length=0}))},l.output=function(n){var t=this;if(n.enabled&&t.isLevelEnabled(n.level)){var e=t.outputer;e.isReady===!1?t.pendingItems.push(n):(e.handler(n,t),n.done=!0),t.lastItem=n}t.appendHistory(n)},l.isLevelEnabled=function(n){var t=this;return n>=t.level},l.getRandomColor=function(n){var t=this,e=t.colorMap[n];if(!e){var r=t.colors;e=t.colorMap[n]=r[t.colorIndex++%r.length]}return e},l.setName=function(n){return this.setNamePattern(n)},l.setColors=function(n){this.colors=n},l.setNamePattern=function(n){var t=this;t.pattern=i(n),f.forIn(t.loggers,function(n){n.enabled=t.isNameEnabled(n.name)})},l.isNameEnabled=function(n){function t(t){return t.test(n)}var e=this,r=e.pattern;return!f.some(r.skips,t)&&!!f.some(r.names,t)},l.setLevel=function(n){this.level=o.toCode(n)},l.appendHistory=function(n){var t=this;t.history.push(n),t.history.length>t.historySize&&t.history.shift()},l.setHistorySize=function(n){this.historySize=n},l.getHistory=function(){return this.history},l.disableHistory=function(){this.setHistorySize(0)},l.clear=function(){this.history.length=0},l.save=function(){var n=this;return f.map(n.history,function(n){return f.map(n.data,function(n){var t=c.safeStringify(n);return t}).join(" ")}).join("\r\n")}},function(n,t,e){t.console=e(17),t.browser_console=e(19),t.node_console=e(20),t.file=e(21),t.browser_html=e(22),t.vconsole=e(25),t.eruda=e(27)},function(n,t,e){var r=e(14),i=e(18);t.handler=function(n){var t=n.level;t<r.DEBUG?t=r.DEBUG:t>r.ERROR&&(t=r.ERROR);var e=r.toName(t);i.console(e,n.data)}},function(n,t){(function(n){t.getConsole=function(){if("undefined"!=typeof n)return n.console};var e=t.globalConsole=t.getConsole();t.hasConsole=function(){return!!t.globalConsole},t.console=function(n,t){var r=Function.prototype.apply||e[n].apply;r.call(e[n],e,t)}}).call(t,function(){return this}())},function(n,t,e){var r=e(2),i=e(18),o="color:inherit";t.handler=function(n,t){var e=t.lastItem||{},u=e.timestamp||n.timestamp,a=n.timestamp-u,c="color:"+n.color,f=t.prefix+n.name,s="%c"+f+"%c",l=[null,c,o];r.each(n.data,function(n){l.push(n),s+=" %o"}),l.push(c),s+="%c +"+a+"ms",l[0]=s,i.console("log",l)}},function(n,t,e){var r=e(18);t.handler=function(n){r.console("log",n.data)}},function(n,t){},function(n,t,e){(function(t){function r(){this.inited=!1,this.box=null}var i=e(2),o=e(23),u=r.prototype;u.init=function(n){if(!this.inited){this.inited=!0;var e=t.document;if(e){this.box=e.createElement("div"),this.box.style.cssText='z-index:999;padding:16px;height:300px;overflow:auto;line-height:1.4;background:#242424;color:#fff;font-size:16px; font-family: monospace,consolas,"Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;border:none;text-align:left';var r=e.body||e.documentElement;r.insertBefore(this.box,r.firstChild)}}},u.handler=function(n,e){if(t.document){var r=e.lastItem||{},u=r.timestamp||n.timestamp,a=n.timestamp-u,c=e.prefix+n.name,f=[c];i.each(n.data,function(n){f.push(o.safeStringify(n))}),f.push("+"+a+"ms");var s=document.createElement("div");o.text(s,f.join(" ")),s.style.color=n.color,this.box.appendChild(s)}},n.exports=new r}).call(t,function(){return this}())},function(n,t,e){(function(n){function r(){return!(!l.browser()||!/Trident/i.test(navigator.userAgent))}function i(n,t){var e=!1,r=s.now();n=n.replace("__now__",r);var i=document.createElement("script");i.onload=i.onreadystatechange=function(){e||"complete"!==this.readyState&&this.readyState||(e=!0,t())},i.type="text/javascript",i.src=n,i.async=1;var o=document.getElementsByTagName("script")[0];o.parentNode.insertBefore(i,o)}function o(){return!!l.wechatApp()||!r()&&!!l.browser()}function u(n,t){var e="textContent";l.owns(n,e)||(e="innerText"),n[e]=t}function a(n){try{n=JSON.stringify(n,0,4)}catch(t){n+=""}return n}function c(t){var e=[];if(n.location){var r=p.parse(s.slice(location.search,1));e.push(r)}n.localStorage&&e.push(localStorage);var i=s.get(n,["process","env"]);i&&e.push(i);var o=s.find(e,function(n){var e;try{e=f(n,t)}catch(r){e=null}if(e)return e});return o||{}}function f(n,t){var e={},r=!1;if(s.each(t,function(t){l.owns(n,t)&&(r=!0,e[t]=n[t])}),r)return e}var s=e(2),l=s.is,p=e(24);t.isIE=r,t.supportBrowserColor=o,t.safeStringify=a,t.text=u,t.getUserOptions=c,t.loadScript=i}).call(t,function(){return this}())},function(n,t,e){function r(n,t,e){return e=i.find(arguments,function(n){return o.object(n)}),n=o.nos(n)?n:void 0,t=o.nos(t)?t:void 0,e=i.extend({},u,e,{sep:n,eq:t})}var i=e(2),o=i.is,u={sep:"&",eq:"=",encode:encodeURIComponent,decode:decodeURIComponent,keepRaw:!1,sort:null,ignoreValues:[void 0]};t.parse=function(n,t,e,o){n+="",o=r(t,e,o);var u=o.decode;return n=n.split(o.sep),i.reduce(n,function(n,t){if(t=t.split(o.eq),2==t.length){var e=t[0],r=t[1];if(!o.keepRaw)try{e=u(e),r=u(r)}catch(i){}n[e]=r}return n},{})},t.stringify=function(n,t,e,u){u=r(t,e,u);var a=i.keys(n),c=u.sort;c&&(o.fn(c)?a.sort(c):a.sort());var f=u.encode,s=[];return i.each(a,function(t){var e=n[t];i.includes(u.ignoreValues,e)||((o.nan(e)||null==e)&&(e=""),u.keepRaw||(t=f(t),e=f(e)),s.push(t+u.eq+e))}),s.join(u.sep)}},function(n,t,e){function r(){this.inited=!1,this.isReady=!1}var i=e(17),o=e(23),u=e(26)(),a=r.prototype;a.init=function(){var n=this;if(!n.inited){n.inited=!0;var t="//s.url.cn/qqun/qun/qqweb/m/qun/confession/js/vconsole.min.js";o.loadScript(t,function(){n.run(),window.addEventListener("load",function(){n.run()})})}},a.ready=function(n){u.queue(n)},a.run=function(){try{vConsole.show(),this.isReady=!0,u.open()}catch(n){}},a.handler=i.handler,n.exports=new r},function(n,t,e){(function(t){function r(n){var t=this;return t instanceof r?(t.queueList=n||[],void t.close()):new r(n)}var i=e(2),o=i.is;n.exports=r;var u=r.prototype;u.queue=function(){var n=this,t=arguments;n.isOpen?n.exec(t):n.queueList.push(t)},u.close=function(){this.isOpen=!1},u.open=function(){this.isOpen=!0,this.execAll()},u.execAll=function(){var n=this,t=n.queueList;i.each(t,function(t){n.exec(t)}),t.length=0},u.exec=function(n){var t,e=i.first(n),r=this.ctx;if(t=o.fn(e)?e:i.get(r,e),o.fn(t))try{t.apply(r,i.slice(n,1))}catch(u){}},u.overwriteQueue=function(n){var e=this;t[n]=function(){e.queue.apply(e,arguments)}}}).call(t,function(){return this}())},function(n,t,e){function r(){this.inited=!1,this.isReady=!1}var i=e(17),o=e(23),u=e(26)(),a=r.prototype;a.init=function(){var n=this;if(!n.inited){n.inited=!0;var t="//cdn.jsdelivr.net/npm/eruda";o.loadScript(t,function(){try{n.run()}catch(t){}})}},a.ready=function(n){u.queue(n)},a.run=function(){try{eruda.init(),this.isReady=!0,u.open()}catch(n){}},a.handler=i.handler,n.exports=new r}])});
//# sourceMappingURL=log.js.map
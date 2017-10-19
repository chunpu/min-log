/*! min-log@2.1.0 by chunpu */
!function(n,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.log=t():n.log=t()}(this,function(){return function(n){function t(e){if(r[e])return r[e].exports;var i=r[e]={exports:{},id:e,loaded:!1};return n[e].call(i.exports,i,i.exports,t),i.loaded=!0,i.exports}var r={};return t.m=n,t.c=r,t.p="",t(0)}(function(n){for(var t in n)if(Object.prototype.hasOwnProperty.call(n,t))switch(typeof n[t]){case"function":break;case"object":n[t]=function(t){var r=t.slice(1),e=n[t[0]];return function(n,t,i){e.apply(this,[n,t,i].concat(r))}}(n[t]);break;default:n[t]=n[n[t]]}return n}([function(n,t,r){var e=r(1);n.exports=t=e.getLogger()},function(n,t,r){function e(n){var t=this;u.string(n)&&(n={name:n}),n=n||{};var r=n.name||"default";t.name=r,t.levels=c,t.sdk=f,t.enabled=f.isNameEnabled(r),t.color=n.color||t.sdk.getRandomColor(r)}function i(n){var t=f.loggers,r=t[n];return r||(r=t[n]=new e(n)),r}var o=r(2),u=o.is,c=r(13),a=r(14),f=new a;n.exports=t=e;var s=o.map(o.keys(c),function(n){return o.lower(n)}),l=e.prototype;l.getLogger=e.getLogger=i,l.output=function(n,t){var r=this,e={level:n,name:r.name,enabled:r.enabled,timestamp:o.now(),data:t,color:r.color};f.output(e)},o.each(s,function(n){var t=c[o.upper(n)];l[n]=function(){this.output(t,arguments)}}),l.getLevelFunction=function(n){var t=this;return n=n||c.DEBUG,function(){t.output(n,arguments)}}},function(n,t,r){n.exports=r(3)},function(n,t,r){function e(n){return this instanceof e?(this.__value=n,void(this.__chain=!1)):new e(n)}var i=r(4);n.exports=i.extend(e,i),r(6),r(7),r(8),r(10),r(11),r(12),e.mixin(e,e)},function(n,t,r){function e(n){if(null!=n)return n.length}function i(n,t){var r=e(n);if(r&&h.fn(t))for(var i=0;i<r&&!1!==t(n[i],i,n);i++);return n}function o(n,t){var r=-1;return i(n,function(n,e,i){if(t(n,e,i))return r=e,!1}),r}function u(n){var t=[];return i(n,function(n){t.push(n)}),t}function c(n){if(n){var t=v.call(arguments,1);i(t,function(t){l(t,function(t,r){h.undef(t)||(n[r]=t)})})}return n}function a(n){return function(){return!n.apply(this,arguments)}}function f(n,t){return h.string(n)?n.indexOf(t):o(n,function(n){return t===n})}function s(n,t,r){return i(n,function(e,i){r=t(r,e,i,n)}),r}function l(n,t){if(n)for(var r in n)if(h.owns(n,r)&&!1===t(n[r],r,n))break;return n}function p(n){var t=[];return l(n,function(n,r){t.push(r)}),t}var h=r(5),v=[].slice,d=t;d.is=h,d.extend=d.assign=c,d.each=i,d.map=function(n,t){var r=[];return i(n,function(n,e,i){r[e]=t(n,e,i)}),r},d.filter=function(n,t){var r=[];return i(n,function(n,e,i){var o=t(n,e,i);o&&r.push(n)}),r},d.some=function(n,t){return-1!=o(n,t)},d.every=function(n,t){return-1==o(n,a(t))},d.reduce=s,d.findIndex=o,d.find=function(n,t){var r=d.findIndex(n,t);if(-1!=r)return n[r]},d.indexOf=f,d.includes=function(n,t){return-1!=f(n,t)},d.toArray=u,d.slice=function(n,t,r){var i=[],o=e(n);return o>=0&&(t=t||0,r=r||o,h.fn(n.slice)||(n=u(n)),i=n.slice(t,r)),i},d.negate=a,d.forIn=l,d.keys=p;var g=/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;d.trim=function(n){return null==n?"":(""+n).replace(g,"")},d.noop=function(){},d.len=e},function(n,t){(function(n){function r(n){var t=u.toString.call(n);return t.substring(8,t.length-1).toLowerCase()}function e(n){return typeof n}function i(n,t){return u.hasOwnProperty.call(n,t)}var o=t,u=Object.prototype,c=n.navigator;o.browser=function(){return!(o.wechatApp()||!c||n.window!=n)},o.h5=function(){return!(!o.browser()||!c.geolocation)},o.mobile=function(){return!(!o.browser()||!/mobile/i.test(c.userAgent))},o.wechatApp=function(){return!("object"!=typeof wx||!wx||!o.fn(wx.createVideoContext))},o._class=r,o._type=e,o.owns=i,o.nan=function(n){return n!==n},o.bool=function(n){return"boolean"==r(n)},o.infinite=function(n){return n==1/0||n==-(1/0)},o.number=function(n){return!isNaN(n)&&"number"==r(n)},o.iod=function(n){return!(!o.number(n)||o.infinite(n))},o.decimal=function(n){return!!o.iod(n)&&0!=n%1},o.integer=function(n){return!!o.iod(n)&&0==n%1},o.oof=function(n){if(n){var t=e(n);return"object"==t||"function"==t}return!1},o.object=function(n){return o.oof(n)&&"function"!=r(n)},o.hash=o.plainObject=function(n){return!(!n||"object"!=r(n))&&(!n.nodeType&&!n.setInterval)},o.undef=function(n){return"undefined"==e(n)},o.fn=function(n){return"function"==r(n)},o.string=function(n){return"string"==r(n)},o.nos=function(n){return o.iod(n)||o.string(n)},o.array=function(n){return"array"==r(n)},o.arraylike=function(n){if(!o.window(n)&&o.object(n)){var t=n.length;if(o.integer(t)&&t>=0)return!0}return!1},o.window=function(n){return!(!n||n.window!=n)},o.empty=function(n){if(o.string(n)||o.arraylike(n))return 0===n.length;if(o.hash(n))for(var t in n)if(i(n,t))return!1;return!0},o.element=function(n){return!(!n||1!==n.nodeType)},o.regexp=function(n){return"regexp"==r(n)}}).call(t,function(){return this}())},function(n,t,r){function e(n,t){var r=[],e=i.len(t);if(e)for(t=t.sort(function(n,t){return n-t});e--;){var o=t[e];r.push(a.splice.call(n,o,1)[0])}return r.reverse(),r}var i=n.exports=r(3),o=i.each,u=i.includes,c=i.is,a=Array.prototype;i.reject=function(n,t){return i.filter(n,function(n,r,e){return!t(n,r,e)})},i.without=function(n){var t=i.slice(arguments,1);return i.difference(n,t)},i.difference=function(n,t){var r=[];return i.each(n,function(n){u(t,n)||r.push(n)}),r},i.pluck=function(n,t){return i.map(n,function(n){if(n)return n[t]})},i.size=function(n){var t=i.len(n);return null==t&&(t=i.keys(n).length),t},i.first=function(n){if(n)return n[0]},i.last=function(n){var t=i.len(n);if(t)return n[t-1]},i.asyncMap=function(n,t,r){var e,i,u=[],c=0;o(n,function(o,a){i=!0,t(o,function(t,i){if(!e){if(c++,t)return e=!0,r(t);u[a]=i,c==n.length&&(e=!0,r(null,u))}})}),i||r(null)},i.uniq=function(n){return i.uniqBy(n)},i.uniqBy=function(n,t){var r=[],e=[];return c.fn(t)||(t=null),o(n,function(n){var i=n;t&&(i=t(n)),u(e,i)||(e.push(i),r.push(n))}),r},i.flatten=function(n){var t=[];return o(n,function(n){c.arraylike(n)?o(n,function(n){t.push(n)}):t.push(n)}),t},i.union=function(){return i.uniq(i.flatten(arguments))},i.sample=function(n,t){for(var r=i.toArray(n),e=r.length,o=Math.min(t||1,e),u=0;u<e;u++){var c=i.random(u,e-1),a=r[c];r[c]=r[u],r[u]=a}return r.length=o,null==t?r[0]:r},i.shuffle=function(n){return i.sample(n,1/0)},i.compact=function(n){return i.filter(n,i.identity)},i.rest=function(n){return i.slice(n,1)},i.invoke=function(){var n=arguments,t=n[0],r=n[1],e=c.fn(r);return n=i.slice(n,2),i.map(t,function(t){if(e)return r.apply(t,n);if(null!=t){var i=t[r];if(c.fn(i))return i.apply(t,n)}})},i.partition=function(n,t){var r=i.groupBy(n,function(n,r,e){var i=t(n,r,e);return i?1:2});return[r[1]||[],r[2]||[]]},i.groupBy=function(n,t){var r={};return i.each(n,function(n,e,i){var o=t(n,e,i);r[o]=r[o]||[],r[o].push(n)}),r},i.range=function(){var n=arguments;if(n.length<2)return i.range(n[1],n[0]);var t=n[0]||0,r=n[1]||0,e=n[2];c.number(e)||(e=1);var o=r-t;0!=e&&(o/=e);for(var u=[],a=t,f=0;f<o;f++)u.push(a),a+=e;return u},i.pullAt=function(n){var t=i.slice(arguments,1);return e(n,t)},i.remove=function(n,t){for(var r=i.len(n)||0,o=[];r--;)t(n[r],r,n)&&o.push(r);return e(n,o)},i.fill=function(n,t,r){}},function(n,t,r){function e(n){if(o.array(n))return n;var t=[];return i.tostr(n).replace(c,function(n,r,e,i){var o=r||n;e&&(o=i.replace(a,"$1")),t.push(o)}),t}var i=n.exports=r(3),o=i.is,u=(i.each,i.forIn);i.only=function(n,t){return n=n||{},o.string(t)&&(t=t.split(/ +/)),i.reduce(t,function(t,r){return null!=n[r]&&(t[r]=n[r]),t},{})},i.values=function(n){return i.map(i.keys(n),function(t){return n[t]})},i.pick=function(n,t){if(!o.fn(t))return i.pick(n,function(n,r){return r==t});var r={};return u(n,function(n,e,i){t(n,e,i)&&(r[e]=n)}),r},i.functions=function(n){return i.keys(i.pick(n,function(n){return o.fn(n)}))},i.mapKeys=function(n,t){var r={};return u(n,function(n,e,i){var o=t(n,e,i);r[o]=n}),r},i.mapObject=i.mapValues=function(n,t){var r={};return u(n,function(n,e,i){r[e]=t(n,e,i)}),r},i.get=function(n,t){if(t=e(t),t.length){var r=i.every(t,function(t){if(null!=n)return n=n[t],!0});if(r)return n}},i.has=function(n,t){if(t=e(t),t.length){var r=i.every(t,function(t){if(null!=n&&o.owns(n,t))return n=n[t],!0});if(r)return!0}return!1},i.set=function(n,t,r){t=e(t);var u=n;return i.every(t,function(n,e){if(o.oof(u)){if(e+1!=t.length){var i=u[n];if(null==i){var i={};~~n==n&&(i=[])}return u=u[n]=i,!0}u[n]=r}}),n},i.create=function(){function n(){}return function(t,r){return"object"!=typeof t&&(t=null),n.prototype=t,i.extend(new n,r)}}(),i.defaults=function(){var n=arguments,t=n[0],r=i.slice(n,1);return t&&i.each(r,function(n){i.mapObject(n,function(n,r){o.undef(t[r])&&(t[r]=n)})}),t},i.isMatch=function(n,t){var r=!0;return n=n||{},u(t,function(t,e){if(t!==n[e])return r=!1,!1}),r},i.toPlainObject=function(n){var t={};return u(n,function(n,r){t[r]=n}),t},i.invert=function(n){var t={};return u(n,function(n,r){t[n]=r}),t};var c=/[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\n\\]|\\.)*?)\2)\]/g,a=/\\(\\)?/g},function(n,t,r){function e(n){function t(){var t=arguments,e=t[0];if(!r.has(e)){var i=n.apply(this,t);r.set(e,i)}return r.get(e)}var r=new e.Cache;return t.cache=r,t}var i=n.exports=r(3),o=i.is,u=i.slice;i.bind=function(n,t){if(o.string(t)){var r=n;n=r[t],t=r}if(!o.fn(n))return n;var e=u(arguments,2);return t=t||this,function(){return n.apply(t,i.flatten([e,arguments]))}},i.inherits=function(n,t){n.super_=t,n.prototype=i.create(t.prototype,{constructor:n})},i.delay=function(n,t){var r=i.slice(arguments,2);return setTimeout(function(){n.apply(this,r)},t)},i.before=function(n,t){return function(){if(n>1)return n--,t.apply(this,arguments)}},i.once=function(n){return i.before(2,n)},i.after=function(n,t){return function(){return n>1?void n--:t.apply(this,arguments)}},i.throttle=function(n,t,r){return t=t||0,r=i.extend({leading:!0,trailing:!0,maxWait:t},r),i.debounce(n,t,r)},i.debounce=function(n,t,r){function e(){return!(p-s>t)&&!(f&&p-l>f)}function o(n,t,r){return s=i.now(),n.apply(t,r)}function u(){a&&(clearTimeout(a),a=null)}function c(){p=i.now();var c=e();l=p;var f=this,s=arguments;u(),c?r.trailing&&(a=i.delay(function(){o(n,f,s)},t)):o(n,f,s)}t=t||0,r=i.extend({leading:!1,trailing:!0},r);var a,f=r.maxWait,s=0,l=0,p=i.now();return r.leading||(s=p),c.cancel=u,c},e.Cache=r(9),i.memoize=e,i.wrap=function(n,t){return function(){var r=[n];return r.push.apply(r,arguments),t.apply(this,r)}},i.curry=function(n){function t(e){return function(){var o=e.concat(i.slice(arguments));return o.length>=r?(o.length=r,n.apply(this,o)):t(o)}}var r=n.length;return t([])}},function(n,t,r){function e(){this.data={}}var i=r(3),o=i.is;n.exports=e;var u=e.prototype;u.has=function(n){return o.owns(this.data,n)},u.get=function(n){return this.data[n]},u.set=function(n,t){this.data[n]=t},u["delete"]=function(n){delete this.data[n]}},function(n,t,r){var e=n.exports=r(3),i=e.is;e.now=function(){return+new Date},e.constant=function(n){return function(){return n}},e.identity=function(n){return n},e.random=function(n,t){return n+Math.floor(Math.random()*(t-n+1))},e.mixin=function(n,t,r){var o=e.functions(t);if(n)if(i.fn(n)){r=r||{};var u=(!!r.chain,n.prototype);e.each(o,function(n){var r=t[n];u[n]=function(){var n=this,t=[n.__value];t.push.apply(t,arguments);var e=r.apply(n,t);return n.__chain?(n.__value=e,n):e}})}else e.each(o,function(r){n[r]=t[r]});return n},e.chain=function(n){var t=e(n);return t.__chain=!0,t},e.value=function(){return this.__chain=!1,this.__value}},function(n,t,r){function e(n,t){n=o.tostr(n)||" ";var r=Math.floor(t/n.length)+1;return o.repeat(n,r).slice(0,t)}function i(n){return n||0==n?n+"":""}var o=n.exports=r(3);o.tostr=i;var u=o.indexOf;o.split=function(n,t,r){return n=i(n),n.split(t,r)},o.capitalize=function(n){return n=i(n),n.charAt(0).toUpperCase()+n.substr(1)},o.decapitalize=function(n){return n=i(n),n.charAt(0).toLowerCase()+n.substr(1)},o.camelCase=function(n){n=i(n);var t=n.split(/[^\w]|_+/);return t=o.map(t,function(n){return o.capitalize(n)}),o.decapitalize(t.join(""))},o.startsWith=function(n,t){return 0==u(n,t)},o.endsWith=function(n,t){return t+="",t==o.slice(n,o.len(n)-o.len(t))},o.lower=function(n){return i(n).toLowerCase()},o.upper=function(n){return i(n).toUpperCase()},o.repeat=function(n,t){return o.map(o.range(t),function(){return n}).join("")},o.padStart=function(n,t,r){n=o.tostr(n),t=t||0;var i=t-n.length;return e(r,i)+n},o.padEnd=function(n,t,r){n=o.tostr(n),t=t||0;var i=t-n.length;return n+e(r,i)}},function(n,t,r){var e=n.exports=r(3);e.sum=function(n){return e.reduce(n,function(n,t){return n+t},0)},e.max=function(n,t){var r=-1,i=-(1/0);return t=t||e.identity,e.each(n,function(n,e){n=t(n),n>i&&(i=n,r=e)}),r>-1?n[r]:i},e.min=function(n,t){var r=-1,i=1/0;return t=t||e.identity,e.each(n,function(n,e){n=t(n),n<i&&(i=n,r=e)}),r>-1?n[r]:i}},function(n,t){t.VERBOSE=0,t.DEBUG=1,t.LOG=2,t.INFO=3,t.WARN=4,t.ERROR=5},function(n,t,r){(function(t){function e(){var n=this;n.history=[],n.levels=o,n.loggers={},n.level=o.DEBUG,n.debugKey="debug",n.prefix="",n.pattern={},n.lastItem=null,n.outputers=u,n.colorMap={},n.colors="lightseagreen forestgreen goldenrod dodgerblue darkorchid crimson".split(" "),n.colorIndex=0,n.historySize=3e3,n.setOutputer(f.noop),n.autoInit()}function i(n){var t=[],r=[];return n&&s.string(n)&&f.each(n.split(/[\s,]+/),function(n){n=n.replace(/\*/g,".*?");var e=n.charAt(0);"-"===e?t.push(new RegExp("^"+f.slice(n,1)+"$")):r.push(new RegExp("^"+n+"$"))}),{skips:t,names:r}}var o=r(13),u=r(15),c=r(17),a=r(22),f=r(2),s=f.is;n.exports=e;var l=e.prototype;l.autoInit=function(){var n=this;n.autoSetOutputer(),n.autoSetName()},l.autoSetOutputer=function(){c.hasConsole()&&(a.supportBrowserColor()?this.setOutputer("browser_color"):this.setOutputer("simple"))},l.autoSetName=function(){var n,r=this,e=r.debugKey;if(t.location){var i=new RegExp(e+"=(\\S+)"),o=i.exec(t.location.href);o&&(n=o[1])}if(null==n)try{n=localStorage[e]}catch(u){}null==n&&t.process&&(n=f.get(t,["process","env",e])),r.setName(n)},l.setOutputer=function(n){var t=this,r=null;s.string(n)?r=t.outputers[n]:s.fn(n)&&(r={handler:n}),r&&(t.outputer=r,s.fn(r.init)&&r.init(t))},l.output=function(n){var t=this;n.enabled&&n.level>=t.level&&(t.outputer.handler(n,t),t.lastItem=n),t.appendHistory(n)},l.getRandomColor=function(n){var t=this,r=t.colorMap[n];if(!r){var e=t.colors;r=t.colorMap[n]=e[t.colorIndex++%e.length]}return r},l.setName=function(n){return this.setNamePattern(n)},l.setNamePattern=function(n){var t=this;t.pattern=i(n),f.forIn(t.loggers,function(n){n.enabled=t.isNameEnabled(n.name)})},l.isNameEnabled=function(n){function t(t){return t.test(n)}var r=this,e=r.pattern;return!f.some(e.skips,t)&&!!f.some(e.names,t)},l.setLevel=function(n){this.level=n},l.appendHistory=function(n){var t=this;t.history.push(n),t.history.length>t.historySize&&t.history.shift()},l.setHistorySize=function(n){this.historySize=n},l.disableHistory=function(){this.setHistorySize(0)},l.clear=function(){this.history.length=0},l.save=function(){var n=this;return f.map(n.history,function(n){return f.map(n.data,function(n){var t=a.safeStringify(n);return t}).join(" ")}).join("\r\n")}}).call(t,function(){return this}())},function(n,t,r){t.simple=r(16),t.browser_color=r(18),t.node_color=r(19),t.file=r(20),t.browser_html=r(21)},function(n,t,r){var e=r(17);t.handler=function(n){e.console("log",n.data)}},function(n,t){(function(n){t.hasConsole=function(){return!!n.console},t.console=function(n,t){var r=Function.prototype.apply||console[n].apply;r.call(console[n],console,t)}}).call(t,function(){return this}())},function(n,t,r){var e=r(2),i=r(17),o="color:inherit";t.handler=function(n,t){var r=t.lastItem||{},u=r.timestamp||n.timestamp,c=n.timestamp-u,a="color:"+n.color,f=t.prefix+n.name,s="%c"+f+"%c",l=[null,a,o];e.each(n.data,function(n){l.push(n),s+=" %o"}),l.push(a),s+="%c +"+c+"ms",l[0]=s,i.console("log",l)}},function(n,t){},19,function(n,t,r){function e(){}var i=r(2),o=r(22),u=null,c=e.prototype;c.init=function(n){var t=document;if(!u){u=t.createElement("div"),u.style.cssText="z-index:999;width:100%;height:300px;overflow:auto;line-height:1.4;background:#333;color:#fff;font:16px Consolas;border:none;";var r=t.body||t.documentElement;r.insertBefore(u,r.firstChild)}},c.handler=function(n,t){var r=t.lastItem||{},e=r.timestamp||n.timestamp,c=n.timestamp-e,a=t.prefix+n.name,f=[a];i.each(n.data,function(n){f.push(o.safeStringify(n))}),f.push("+"+c+"ms");var s=document.createElement("div");s.textContent=f.join(" "),s.style.color=n.color,u.appendChild(s)},n.exports=new e},function(n,t,r){function e(){return!(!c.browser()||!/Trident/i.test(navigator.userAgent))}function i(){return!!c.wechatApp()||!e()&&!!c.browser()}function o(n){try{n=JSON.stringify(n,0,4)}catch(t){n+=""}return n}var u=r(2),c=u.is;t.isIE=e,t.supportBrowserColor=i,t.safeStringify=o}]))});
//# sourceMappingURL=log.js.map
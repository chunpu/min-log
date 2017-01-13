/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var assert = __webpack_require__(1)
	var log = __webpack_require__(6)
	var Log = log.Log
	var is = __webpack_require__(11)

	assert = function(bool) {
		if (!bool) {
			// alert(11111111)
		}
	}

	if (is.wechatApp()) {
		Log.setName('*')
	} else {
		Log.init('mydebug')
	}

	// Log.setLevel('error')
	Log.outputers = [Log.custom.outputers.color]
	// Log.setName('log*,-noshow*')

	// console.log(Log)

	var noshow = log.getLogger('noshow')
	var log1 = log.getLogger('log1')
	var log2 = log.getLogger('log2')
	var log1again = log.getLogger('log1')

	assert(log1 === log1again)

	noshow.log('no show')
	log1.log('log1 first')
	log1.error(new Error('log1 error'))

	log2.log('log2 first')
	log2.error(new Error('log2 error'))

	noshow.error('no show')
	log1.log('log1', 'second')

	// console.log(Log.logs)

	// 此处只运行在可打印日志的地方 enable 地方
	if (log1.enabled && log2.enabled) {
		assert(2 == Log.logs.length)

		assert('log1' == Log.logs[0].name)
		assert(Log.ERROR == Log.logs[0].level)
		assert('log2' == Log.logs[1].name)
		assert(Log.ERROR == Log.logs[1].level)
	}

	Log.outputers.length = 0

	/*
	for (var i = 0; i < 4000; i++) {
		log1.error(1111)
	}
	*/

	assert(Log.MAX_LOG_LEN == Log.logs.length)

	var txt = Log.getPlainLog()

	// alert(txt)


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';

	// compare and isBuffer taken from https://github.com/feross/buffer/blob/680e9e5e488f22aac27599a57dc844a6315928dd/index.js
	// original notice:

	/*!
	 * The buffer module from node.js, for the browser.
	 *
	 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
	 * @license  MIT
	 */
	function compare(a, b) {
	  if (a === b) {
	    return 0;
	  }

	  var x = a.length;
	  var y = b.length;

	  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
	    if (a[i] !== b[i]) {
	      x = a[i];
	      y = b[i];
	      break;
	    }
	  }

	  if (x < y) {
	    return -1;
	  }
	  if (y < x) {
	    return 1;
	  }
	  return 0;
	}
	function isBuffer(b) {
	  if (global.Buffer && typeof global.Buffer.isBuffer === 'function') {
	    return global.Buffer.isBuffer(b);
	  }
	  return !!(b != null && b._isBuffer);
	}

	// based on node assert, original notice:

	// http://wiki.commonjs.org/wiki/Unit_Testing/1.0
	//
	// THIS IS NOT TESTED NOR LIKELY TO WORK OUTSIDE V8!
	//
	// Originally from narwhal.js (http://narwhaljs.org)
	// Copyright (c) 2009 Thomas Robinson <280north.com>
	//
	// Permission is hereby granted, free of charge, to any person obtaining a copy
	// of this software and associated documentation files (the 'Software'), to
	// deal in the Software without restriction, including without limitation the
	// rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
	// sell copies of the Software, and to permit persons to whom the Software is
	// furnished to do so, subject to the following conditions:
	//
	// The above copyright notice and this permission notice shall be included in
	// all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	// AUTHORS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
	// ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
	// WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

	var util = __webpack_require__(2);
	var hasOwn = Object.prototype.hasOwnProperty;
	var pSlice = Array.prototype.slice;
	var functionsHaveNames = (function () {
	  return function foo() {}.name === 'foo';
	}());
	function pToString (obj) {
	  return Object.prototype.toString.call(obj);
	}
	function isView(arrbuf) {
	  if (isBuffer(arrbuf)) {
	    return false;
	  }
	  if (typeof global.ArrayBuffer !== 'function') {
	    return false;
	  }
	  if (typeof ArrayBuffer.isView === 'function') {
	    return ArrayBuffer.isView(arrbuf);
	  }
	  if (!arrbuf) {
	    return false;
	  }
	  if (arrbuf instanceof DataView) {
	    return true;
	  }
	  if (arrbuf.buffer && arrbuf.buffer instanceof ArrayBuffer) {
	    return true;
	  }
	  return false;
	}
	// 1. The assert module provides functions that throw
	// AssertionError's when particular conditions are not met. The
	// assert module must conform to the following interface.

	var assert = module.exports = ok;

	// 2. The AssertionError is defined in assert.
	// new assert.AssertionError({ message: message,
	//                             actual: actual,
	//                             expected: expected })

	var regex = /\s*function\s+([^\(\s]*)\s*/;
	// based on https://github.com/ljharb/function.prototype.name/blob/adeeeec8bfcc6068b187d7d9fb3d5bb1d3a30899/implementation.js
	function getName(func) {
	  if (!util.isFunction(func)) {
	    return;
	  }
	  if (functionsHaveNames) {
	    return func.name;
	  }
	  var str = func.toString();
	  var match = str.match(regex);
	  return match && match[1];
	}
	assert.AssertionError = function AssertionError(options) {
	  this.name = 'AssertionError';
	  this.actual = options.actual;
	  this.expected = options.expected;
	  this.operator = options.operator;
	  if (options.message) {
	    this.message = options.message;
	    this.generatedMessage = false;
	  } else {
	    this.message = getMessage(this);
	    this.generatedMessage = true;
	  }
	  var stackStartFunction = options.stackStartFunction || fail;
	  if (Error.captureStackTrace) {
	    Error.captureStackTrace(this, stackStartFunction);
	  } else {
	    // non v8 browsers so we can have a stacktrace
	    var err = new Error();
	    if (err.stack) {
	      var out = err.stack;

	      // try to strip useless frames
	      var fn_name = getName(stackStartFunction);
	      var idx = out.indexOf('\n' + fn_name);
	      if (idx >= 0) {
	        // once we have located the function frame
	        // we need to strip out everything before it (and its line)
	        var next_line = out.indexOf('\n', idx + 1);
	        out = out.substring(next_line + 1);
	      }

	      this.stack = out;
	    }
	  }
	};

	// assert.AssertionError instanceof Error
	util.inherits(assert.AssertionError, Error);

	function truncate(s, n) {
	  if (typeof s === 'string') {
	    return s.length < n ? s : s.slice(0, n);
	  } else {
	    return s;
	  }
	}
	function inspect(something) {
	  if (functionsHaveNames || !util.isFunction(something)) {
	    return util.inspect(something);
	  }
	  var rawname = getName(something);
	  var name = rawname ? ': ' + rawname : '';
	  return '[Function' +  name + ']';
	}
	function getMessage(self) {
	  return truncate(inspect(self.actual), 128) + ' ' +
	         self.operator + ' ' +
	         truncate(inspect(self.expected), 128);
	}

	// At present only the three keys mentioned above are used and
	// understood by the spec. Implementations or sub modules can pass
	// other keys to the AssertionError's constructor - they will be
	// ignored.

	// 3. All of the following functions must throw an AssertionError
	// when a corresponding condition is not met, with a message that
	// may be undefined if not provided.  All assertion methods provide
	// both the actual and expected values to the assertion error for
	// display purposes.

	function fail(actual, expected, message, operator, stackStartFunction) {
	  throw new assert.AssertionError({
	    message: message,
	    actual: actual,
	    expected: expected,
	    operator: operator,
	    stackStartFunction: stackStartFunction
	  });
	}

	// EXTENSION! allows for well behaved errors defined elsewhere.
	assert.fail = fail;

	// 4. Pure assertion tests whether a value is truthy, as determined
	// by !!guard.
	// assert.ok(guard, message_opt);
	// This statement is equivalent to assert.equal(true, !!guard,
	// message_opt);. To test strictly for the value true, use
	// assert.strictEqual(true, guard, message_opt);.

	function ok(value, message) {
	  if (!value) fail(value, true, message, '==', assert.ok);
	}
	assert.ok = ok;

	// 5. The equality assertion tests shallow, coercive equality with
	// ==.
	// assert.equal(actual, expected, message_opt);

	assert.equal = function equal(actual, expected, message) {
	  if (actual != expected) fail(actual, expected, message, '==', assert.equal);
	};

	// 6. The non-equality assertion tests for whether two objects are not equal
	// with != assert.notEqual(actual, expected, message_opt);

	assert.notEqual = function notEqual(actual, expected, message) {
	  if (actual == expected) {
	    fail(actual, expected, message, '!=', assert.notEqual);
	  }
	};

	// 7. The equivalence assertion tests a deep equality relation.
	// assert.deepEqual(actual, expected, message_opt);

	assert.deepEqual = function deepEqual(actual, expected, message) {
	  if (!_deepEqual(actual, expected, false)) {
	    fail(actual, expected, message, 'deepEqual', assert.deepEqual);
	  }
	};

	assert.deepStrictEqual = function deepStrictEqual(actual, expected, message) {
	  if (!_deepEqual(actual, expected, true)) {
	    fail(actual, expected, message, 'deepStrictEqual', assert.deepStrictEqual);
	  }
	};

	function _deepEqual(actual, expected, strict, memos) {
	  // 7.1. All identical values are equivalent, as determined by ===.
	  if (actual === expected) {
	    return true;
	  } else if (isBuffer(actual) && isBuffer(expected)) {
	    return compare(actual, expected) === 0;

	  // 7.2. If the expected value is a Date object, the actual value is
	  // equivalent if it is also a Date object that refers to the same time.
	  } else if (util.isDate(actual) && util.isDate(expected)) {
	    return actual.getTime() === expected.getTime();

	  // 7.3 If the expected value is a RegExp object, the actual value is
	  // equivalent if it is also a RegExp object with the same source and
	  // properties (`global`, `multiline`, `lastIndex`, `ignoreCase`).
	  } else if (util.isRegExp(actual) && util.isRegExp(expected)) {
	    return actual.source === expected.source &&
	           actual.global === expected.global &&
	           actual.multiline === expected.multiline &&
	           actual.lastIndex === expected.lastIndex &&
	           actual.ignoreCase === expected.ignoreCase;

	  // 7.4. Other pairs that do not both pass typeof value == 'object',
	  // equivalence is determined by ==.
	  } else if ((actual === null || typeof actual !== 'object') &&
	             (expected === null || typeof expected !== 'object')) {
	    return strict ? actual === expected : actual == expected;

	  // If both values are instances of typed arrays, wrap their underlying
	  // ArrayBuffers in a Buffer each to increase performance
	  // This optimization requires the arrays to have the same type as checked by
	  // Object.prototype.toString (aka pToString). Never perform binary
	  // comparisons for Float*Arrays, though, since e.g. +0 === -0 but their
	  // bit patterns are not identical.
	  } else if (isView(actual) && isView(expected) &&
	             pToString(actual) === pToString(expected) &&
	             !(actual instanceof Float32Array ||
	               actual instanceof Float64Array)) {
	    return compare(new Uint8Array(actual.buffer),
	                   new Uint8Array(expected.buffer)) === 0;

	  // 7.5 For all other Object pairs, including Array objects, equivalence is
	  // determined by having the same number of owned properties (as verified
	  // with Object.prototype.hasOwnProperty.call), the same set of keys
	  // (although not necessarily the same order), equivalent values for every
	  // corresponding key, and an identical 'prototype' property. Note: this
	  // accounts for both named and indexed properties on Arrays.
	  } else if (isBuffer(actual) !== isBuffer(expected)) {
	    return false;
	  } else {
	    memos = memos || {actual: [], expected: []};

	    var actualIndex = memos.actual.indexOf(actual);
	    if (actualIndex !== -1) {
	      if (actualIndex === memos.expected.indexOf(expected)) {
	        return true;
	      }
	    }

	    memos.actual.push(actual);
	    memos.expected.push(expected);

	    return objEquiv(actual, expected, strict, memos);
	  }
	}

	function isArguments(object) {
	  return Object.prototype.toString.call(object) == '[object Arguments]';
	}

	function objEquiv(a, b, strict, actualVisitedObjects) {
	  if (a === null || a === undefined || b === null || b === undefined)
	    return false;
	  // if one is a primitive, the other must be same
	  if (util.isPrimitive(a) || util.isPrimitive(b))
	    return a === b;
	  if (strict && Object.getPrototypeOf(a) !== Object.getPrototypeOf(b))
	    return false;
	  var aIsArgs = isArguments(a);
	  var bIsArgs = isArguments(b);
	  if ((aIsArgs && !bIsArgs) || (!aIsArgs && bIsArgs))
	    return false;
	  if (aIsArgs) {
	    a = pSlice.call(a);
	    b = pSlice.call(b);
	    return _deepEqual(a, b, strict);
	  }
	  var ka = objectKeys(a);
	  var kb = objectKeys(b);
	  var key, i;
	  // having the same number of owned properties (keys incorporates
	  // hasOwnProperty)
	  if (ka.length !== kb.length)
	    return false;
	  //the same set of keys (although not necessarily the same order),
	  ka.sort();
	  kb.sort();
	  //~~~cheap key test
	  for (i = ka.length - 1; i >= 0; i--) {
	    if (ka[i] !== kb[i])
	      return false;
	  }
	  //equivalent values for every corresponding key, and
	  //~~~possibly expensive deep test
	  for (i = ka.length - 1; i >= 0; i--) {
	    key = ka[i];
	    if (!_deepEqual(a[key], b[key], strict, actualVisitedObjects))
	      return false;
	  }
	  return true;
	}

	// 8. The non-equivalence assertion tests for any deep inequality.
	// assert.notDeepEqual(actual, expected, message_opt);

	assert.notDeepEqual = function notDeepEqual(actual, expected, message) {
	  if (_deepEqual(actual, expected, false)) {
	    fail(actual, expected, message, 'notDeepEqual', assert.notDeepEqual);
	  }
	};

	assert.notDeepStrictEqual = notDeepStrictEqual;
	function notDeepStrictEqual(actual, expected, message) {
	  if (_deepEqual(actual, expected, true)) {
	    fail(actual, expected, message, 'notDeepStrictEqual', notDeepStrictEqual);
	  }
	}


	// 9. The strict equality assertion tests strict equality, as determined by ===.
	// assert.strictEqual(actual, expected, message_opt);

	assert.strictEqual = function strictEqual(actual, expected, message) {
	  if (actual !== expected) {
	    fail(actual, expected, message, '===', assert.strictEqual);
	  }
	};

	// 10. The strict non-equality assertion tests for strict inequality, as
	// determined by !==.  assert.notStrictEqual(actual, expected, message_opt);

	assert.notStrictEqual = function notStrictEqual(actual, expected, message) {
	  if (actual === expected) {
	    fail(actual, expected, message, '!==', assert.notStrictEqual);
	  }
	};

	function expectedException(actual, expected) {
	  if (!actual || !expected) {
	    return false;
	  }

	  if (Object.prototype.toString.call(expected) == '[object RegExp]') {
	    return expected.test(actual);
	  }

	  try {
	    if (actual instanceof expected) {
	      return true;
	    }
	  } catch (e) {
	    // Ignore.  The instanceof check doesn't work for arrow functions.
	  }

	  if (Error.isPrototypeOf(expected)) {
	    return false;
	  }

	  return expected.call({}, actual) === true;
	}

	function _tryBlock(block) {
	  var error;
	  try {
	    block();
	  } catch (e) {
	    error = e;
	  }
	  return error;
	}

	function _throws(shouldThrow, block, expected, message) {
	  var actual;

	  if (typeof block !== 'function') {
	    throw new TypeError('"block" argument must be a function');
	  }

	  if (typeof expected === 'string') {
	    message = expected;
	    expected = null;
	  }

	  actual = _tryBlock(block);

	  message = (expected && expected.name ? ' (' + expected.name + ').' : '.') +
	            (message ? ' ' + message : '.');

	  if (shouldThrow && !actual) {
	    fail(actual, expected, 'Missing expected exception' + message);
	  }

	  var userProvidedMessage = typeof message === 'string';
	  var isUnwantedException = !shouldThrow && util.isError(actual);
	  var isUnexpectedException = !shouldThrow && actual && !expected;

	  if ((isUnwantedException &&
	      userProvidedMessage &&
	      expectedException(actual, expected)) ||
	      isUnexpectedException) {
	    fail(actual, expected, 'Got unwanted exception' + message);
	  }

	  if ((shouldThrow && actual && expected &&
	      !expectedException(actual, expected)) || (!shouldThrow && actual)) {
	    throw actual;
	  }
	}

	// 11. Expected to throw an error:
	// assert.throws(block, Error_opt, message_opt);

	assert.throws = function(block, /*optional*/error, /*optional*/message) {
	  _throws(true, block, error, message);
	};

	// EXTENSION! This is annoying to write outside this module.
	assert.doesNotThrow = function(block, /*optional*/error, /*optional*/message) {
	  _throws(false, block, error, message);
	};

	assert.ifError = function(err) { if (err) throw err; };

	var objectKeys = Object.keys || function (obj) {
	  var keys = [];
	  for (var key in obj) {
	    if (hasOwn.call(obj, key)) keys.push(key);
	  }
	  return keys;
	};

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global, process) {// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.

	var formatRegExp = /%[sdj%]/g;
	exports.format = function(f) {
	  if (!isString(f)) {
	    var objects = [];
	    for (var i = 0; i < arguments.length; i++) {
	      objects.push(inspect(arguments[i]));
	    }
	    return objects.join(' ');
	  }

	  var i = 1;
	  var args = arguments;
	  var len = args.length;
	  var str = String(f).replace(formatRegExp, function(x) {
	    if (x === '%%') return '%';
	    if (i >= len) return x;
	    switch (x) {
	      case '%s': return String(args[i++]);
	      case '%d': return Number(args[i++]);
	      case '%j':
	        try {
	          return JSON.stringify(args[i++]);
	        } catch (_) {
	          return '[Circular]';
	        }
	      default:
	        return x;
	    }
	  });
	  for (var x = args[i]; i < len; x = args[++i]) {
	    if (isNull(x) || !isObject(x)) {
	      str += ' ' + x;
	    } else {
	      str += ' ' + inspect(x);
	    }
	  }
	  return str;
	};


	// Mark that a method should not be used.
	// Returns a modified function which warns once by default.
	// If --no-deprecation is set, then it is a no-op.
	exports.deprecate = function(fn, msg) {
	  // Allow for deprecating things in the process of starting up.
	  if (isUndefined(global.process)) {
	    return function() {
	      return exports.deprecate(fn, msg).apply(this, arguments);
	    };
	  }

	  if (process.noDeprecation === true) {
	    return fn;
	  }

	  var warned = false;
	  function deprecated() {
	    if (!warned) {
	      if (process.throwDeprecation) {
	        throw new Error(msg);
	      } else if (process.traceDeprecation) {
	        console.trace(msg);
	      } else {
	        console.error(msg);
	      }
	      warned = true;
	    }
	    return fn.apply(this, arguments);
	  }

	  return deprecated;
	};


	var debugs = {};
	var debugEnviron;
	exports.debuglog = function(set) {
	  if (isUndefined(debugEnviron))
	    debugEnviron = process.env.NODE_DEBUG || '';
	  set = set.toUpperCase();
	  if (!debugs[set]) {
	    if (new RegExp('\\b' + set + '\\b', 'i').test(debugEnviron)) {
	      var pid = process.pid;
	      debugs[set] = function() {
	        var msg = exports.format.apply(exports, arguments);
	        console.error('%s %d: %s', set, pid, msg);
	      };
	    } else {
	      debugs[set] = function() {};
	    }
	  }
	  return debugs[set];
	};


	/**
	 * Echos the value of a value. Trys to print the value out
	 * in the best way possible given the different types.
	 *
	 * @param {Object} obj The object to print out.
	 * @param {Object} opts Optional options object that alters the output.
	 */
	/* legacy: obj, showHidden, depth, colors*/
	function inspect(obj, opts) {
	  // default options
	  var ctx = {
	    seen: [],
	    stylize: stylizeNoColor
	  };
	  // legacy...
	  if (arguments.length >= 3) ctx.depth = arguments[2];
	  if (arguments.length >= 4) ctx.colors = arguments[3];
	  if (isBoolean(opts)) {
	    // legacy...
	    ctx.showHidden = opts;
	  } else if (opts) {
	    // got an "options" object
	    exports._extend(ctx, opts);
	  }
	  // set default options
	  if (isUndefined(ctx.showHidden)) ctx.showHidden = false;
	  if (isUndefined(ctx.depth)) ctx.depth = 2;
	  if (isUndefined(ctx.colors)) ctx.colors = false;
	  if (isUndefined(ctx.customInspect)) ctx.customInspect = true;
	  if (ctx.colors) ctx.stylize = stylizeWithColor;
	  return formatValue(ctx, obj, ctx.depth);
	}
	exports.inspect = inspect;


	// http://en.wikipedia.org/wiki/ANSI_escape_code#graphics
	inspect.colors = {
	  'bold' : [1, 22],
	  'italic' : [3, 23],
	  'underline' : [4, 24],
	  'inverse' : [7, 27],
	  'white' : [37, 39],
	  'grey' : [90, 39],
	  'black' : [30, 39],
	  'blue' : [34, 39],
	  'cyan' : [36, 39],
	  'green' : [32, 39],
	  'magenta' : [35, 39],
	  'red' : [31, 39],
	  'yellow' : [33, 39]
	};

	// Don't use 'blue' not visible on cmd.exe
	inspect.styles = {
	  'special': 'cyan',
	  'number': 'yellow',
	  'boolean': 'yellow',
	  'undefined': 'grey',
	  'null': 'bold',
	  'string': 'green',
	  'date': 'magenta',
	  // "name": intentionally not styling
	  'regexp': 'red'
	};


	function stylizeWithColor(str, styleType) {
	  var style = inspect.styles[styleType];

	  if (style) {
	    return '\u001b[' + inspect.colors[style][0] + 'm' + str +
	           '\u001b[' + inspect.colors[style][1] + 'm';
	  } else {
	    return str;
	  }
	}


	function stylizeNoColor(str, styleType) {
	  return str;
	}


	function arrayToHash(array) {
	  var hash = {};

	  array.forEach(function(val, idx) {
	    hash[val] = true;
	  });

	  return hash;
	}


	function formatValue(ctx, value, recurseTimes) {
	  // Provide a hook for user-specified inspect functions.
	  // Check that value is an object with an inspect function on it
	  if (ctx.customInspect &&
	      value &&
	      isFunction(value.inspect) &&
	      // Filter out the util module, it's inspect function is special
	      value.inspect !== exports.inspect &&
	      // Also filter out any prototype objects using the circular check.
	      !(value.constructor && value.constructor.prototype === value)) {
	    var ret = value.inspect(recurseTimes, ctx);
	    if (!isString(ret)) {
	      ret = formatValue(ctx, ret, recurseTimes);
	    }
	    return ret;
	  }

	  // Primitive types cannot have properties
	  var primitive = formatPrimitive(ctx, value);
	  if (primitive) {
	    return primitive;
	  }

	  // Look up the keys of the object.
	  var keys = Object.keys(value);
	  var visibleKeys = arrayToHash(keys);

	  if (ctx.showHidden) {
	    keys = Object.getOwnPropertyNames(value);
	  }

	  // IE doesn't make error fields non-enumerable
	  // http://msdn.microsoft.com/en-us/library/ie/dww52sbt(v=vs.94).aspx
	  if (isError(value)
	      && (keys.indexOf('message') >= 0 || keys.indexOf('description') >= 0)) {
	    return formatError(value);
	  }

	  // Some type of object without properties can be shortcutted.
	  if (keys.length === 0) {
	    if (isFunction(value)) {
	      var name = value.name ? ': ' + value.name : '';
	      return ctx.stylize('[Function' + name + ']', 'special');
	    }
	    if (isRegExp(value)) {
	      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
	    }
	    if (isDate(value)) {
	      return ctx.stylize(Date.prototype.toString.call(value), 'date');
	    }
	    if (isError(value)) {
	      return formatError(value);
	    }
	  }

	  var base = '', array = false, braces = ['{', '}'];

	  // Make Array say that they are Array
	  if (isArray(value)) {
	    array = true;
	    braces = ['[', ']'];
	  }

	  // Make functions say that they are functions
	  if (isFunction(value)) {
	    var n = value.name ? ': ' + value.name : '';
	    base = ' [Function' + n + ']';
	  }

	  // Make RegExps say that they are RegExps
	  if (isRegExp(value)) {
	    base = ' ' + RegExp.prototype.toString.call(value);
	  }

	  // Make dates with properties first say the date
	  if (isDate(value)) {
	    base = ' ' + Date.prototype.toUTCString.call(value);
	  }

	  // Make error with message first say the error
	  if (isError(value)) {
	    base = ' ' + formatError(value);
	  }

	  if (keys.length === 0 && (!array || value.length == 0)) {
	    return braces[0] + base + braces[1];
	  }

	  if (recurseTimes < 0) {
	    if (isRegExp(value)) {
	      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
	    } else {
	      return ctx.stylize('[Object]', 'special');
	    }
	  }

	  ctx.seen.push(value);

	  var output;
	  if (array) {
	    output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
	  } else {
	    output = keys.map(function(key) {
	      return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
	    });
	  }

	  ctx.seen.pop();

	  return reduceToSingleString(output, base, braces);
	}


	function formatPrimitive(ctx, value) {
	  if (isUndefined(value))
	    return ctx.stylize('undefined', 'undefined');
	  if (isString(value)) {
	    var simple = '\'' + JSON.stringify(value).replace(/^"|"$/g, '')
	                                             .replace(/'/g, "\\'")
	                                             .replace(/\\"/g, '"') + '\'';
	    return ctx.stylize(simple, 'string');
	  }
	  if (isNumber(value))
	    return ctx.stylize('' + value, 'number');
	  if (isBoolean(value))
	    return ctx.stylize('' + value, 'boolean');
	  // For some reason typeof null is "object", so special case here.
	  if (isNull(value))
	    return ctx.stylize('null', 'null');
	}


	function formatError(value) {
	  return '[' + Error.prototype.toString.call(value) + ']';
	}


	function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
	  var output = [];
	  for (var i = 0, l = value.length; i < l; ++i) {
	    if (hasOwnProperty(value, String(i))) {
	      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
	          String(i), true));
	    } else {
	      output.push('');
	    }
	  }
	  keys.forEach(function(key) {
	    if (!key.match(/^\d+$/)) {
	      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
	          key, true));
	    }
	  });
	  return output;
	}


	function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
	  var name, str, desc;
	  desc = Object.getOwnPropertyDescriptor(value, key) || { value: value[key] };
	  if (desc.get) {
	    if (desc.set) {
	      str = ctx.stylize('[Getter/Setter]', 'special');
	    } else {
	      str = ctx.stylize('[Getter]', 'special');
	    }
	  } else {
	    if (desc.set) {
	      str = ctx.stylize('[Setter]', 'special');
	    }
	  }
	  if (!hasOwnProperty(visibleKeys, key)) {
	    name = '[' + key + ']';
	  }
	  if (!str) {
	    if (ctx.seen.indexOf(desc.value) < 0) {
	      if (isNull(recurseTimes)) {
	        str = formatValue(ctx, desc.value, null);
	      } else {
	        str = formatValue(ctx, desc.value, recurseTimes - 1);
	      }
	      if (str.indexOf('\n') > -1) {
	        if (array) {
	          str = str.split('\n').map(function(line) {
	            return '  ' + line;
	          }).join('\n').substr(2);
	        } else {
	          str = '\n' + str.split('\n').map(function(line) {
	            return '   ' + line;
	          }).join('\n');
	        }
	      }
	    } else {
	      str = ctx.stylize('[Circular]', 'special');
	    }
	  }
	  if (isUndefined(name)) {
	    if (array && key.match(/^\d+$/)) {
	      return str;
	    }
	    name = JSON.stringify('' + key);
	    if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
	      name = name.substr(1, name.length - 2);
	      name = ctx.stylize(name, 'name');
	    } else {
	      name = name.replace(/'/g, "\\'")
	                 .replace(/\\"/g, '"')
	                 .replace(/(^"|"$)/g, "'");
	      name = ctx.stylize(name, 'string');
	    }
	  }

	  return name + ': ' + str;
	}


	function reduceToSingleString(output, base, braces) {
	  var numLinesEst = 0;
	  var length = output.reduce(function(prev, cur) {
	    numLinesEst++;
	    if (cur.indexOf('\n') >= 0) numLinesEst++;
	    return prev + cur.replace(/\u001b\[\d\d?m/g, '').length + 1;
	  }, 0);

	  if (length > 60) {
	    return braces[0] +
	           (base === '' ? '' : base + '\n ') +
	           ' ' +
	           output.join(',\n  ') +
	           ' ' +
	           braces[1];
	  }

	  return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
	}


	// NOTE: These type checking functions intentionally don't use `instanceof`
	// because it is fragile and can be easily faked with `Object.create()`.
	function isArray(ar) {
	  return Array.isArray(ar);
	}
	exports.isArray = isArray;

	function isBoolean(arg) {
	  return typeof arg === 'boolean';
	}
	exports.isBoolean = isBoolean;

	function isNull(arg) {
	  return arg === null;
	}
	exports.isNull = isNull;

	function isNullOrUndefined(arg) {
	  return arg == null;
	}
	exports.isNullOrUndefined = isNullOrUndefined;

	function isNumber(arg) {
	  return typeof arg === 'number';
	}
	exports.isNumber = isNumber;

	function isString(arg) {
	  return typeof arg === 'string';
	}
	exports.isString = isString;

	function isSymbol(arg) {
	  return typeof arg === 'symbol';
	}
	exports.isSymbol = isSymbol;

	function isUndefined(arg) {
	  return arg === void 0;
	}
	exports.isUndefined = isUndefined;

	function isRegExp(re) {
	  return isObject(re) && objectToString(re) === '[object RegExp]';
	}
	exports.isRegExp = isRegExp;

	function isObject(arg) {
	  return typeof arg === 'object' && arg !== null;
	}
	exports.isObject = isObject;

	function isDate(d) {
	  return isObject(d) && objectToString(d) === '[object Date]';
	}
	exports.isDate = isDate;

	function isError(e) {
	  return isObject(e) &&
	      (objectToString(e) === '[object Error]' || e instanceof Error);
	}
	exports.isError = isError;

	function isFunction(arg) {
	  return typeof arg === 'function';
	}
	exports.isFunction = isFunction;

	function isPrimitive(arg) {
	  return arg === null ||
	         typeof arg === 'boolean' ||
	         typeof arg === 'number' ||
	         typeof arg === 'string' ||
	         typeof arg === 'symbol' ||  // ES6 symbol
	         typeof arg === 'undefined';
	}
	exports.isPrimitive = isPrimitive;

	exports.isBuffer = __webpack_require__(4);

	function objectToString(o) {
	  return Object.prototype.toString.call(o);
	}


	function pad(n) {
	  return n < 10 ? '0' + n.toString(10) : n.toString(10);
	}


	var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
	              'Oct', 'Nov', 'Dec'];

	// 26 Feb 16:19:34
	function timestamp() {
	  var d = new Date();
	  var time = [pad(d.getHours()),
	              pad(d.getMinutes()),
	              pad(d.getSeconds())].join(':');
	  return [d.getDate(), months[d.getMonth()], time].join(' ');
	}


	// log is just a thin wrapper to console.log that prepends a timestamp
	exports.log = function() {
	  console.log('%s - %s', timestamp(), exports.format.apply(exports, arguments));
	};


	/**
	 * Inherit the prototype methods from one constructor into another.
	 *
	 * The Function.prototype.inherits from lang.js rewritten as a standalone
	 * function (not on Function.prototype). NOTE: If this file is to be loaded
	 * during bootstrapping this function needs to be rewritten using some native
	 * functions as prototype setup using normal JavaScript does not work as
	 * expected during bootstrapping (see mirror.js in r114903).
	 *
	 * @param {function} ctor Constructor function which needs to inherit the
	 *     prototype.
	 * @param {function} superCtor Constructor function to inherit prototype from.
	 */
	exports.inherits = __webpack_require__(5);

	exports._extend = function(origin, add) {
	  // Don't do anything if add isn't an object
	  if (!add || !isObject(add)) return origin;

	  var keys = Object.keys(add);
	  var i = keys.length;
	  while (i--) {
	    origin[keys[i]] = add[keys[i]];
	  }
	  return origin;
	};

	function hasOwnProperty(obj, prop) {
	  return Object.prototype.hasOwnProperty.call(obj, prop);
	}

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }()), __webpack_require__(3)))

/***/ },
/* 3 */
/***/ function(module, exports) {

	// shim for using process in browser
	var process = module.exports = {};

	// cached from whatever global is present so that test runners that stub it
	// don't break things.  But we need to wrap it in a try catch in case it is
	// wrapped in strict mode code which doesn't define any globals.  It's inside a
	// function because try/catches deoptimize in certain engines.

	var cachedSetTimeout;
	var cachedClearTimeout;

	function defaultSetTimout() {
	    throw new Error('setTimeout has not been defined');
	}
	function defaultClearTimeout () {
	    throw new Error('clearTimeout has not been defined');
	}
	(function () {
	    try {
	        if (typeof setTimeout === 'function') {
	            cachedSetTimeout = setTimeout;
	        } else {
	            cachedSetTimeout = defaultSetTimout;
	        }
	    } catch (e) {
	        cachedSetTimeout = defaultSetTimout;
	    }
	    try {
	        if (typeof clearTimeout === 'function') {
	            cachedClearTimeout = clearTimeout;
	        } else {
	            cachedClearTimeout = defaultClearTimeout;
	        }
	    } catch (e) {
	        cachedClearTimeout = defaultClearTimeout;
	    }
	} ())
	function runTimeout(fun) {
	    if (cachedSetTimeout === setTimeout) {
	        //normal enviroments in sane situations
	        return setTimeout(fun, 0);
	    }
	    // if setTimeout wasn't available but was latter defined
	    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
	        cachedSetTimeout = setTimeout;
	        return setTimeout(fun, 0);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedSetTimeout(fun, 0);
	    } catch(e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
	            return cachedSetTimeout.call(null, fun, 0);
	        } catch(e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
	            return cachedSetTimeout.call(this, fun, 0);
	        }
	    }


	}
	function runClearTimeout(marker) {
	    if (cachedClearTimeout === clearTimeout) {
	        //normal enviroments in sane situations
	        return clearTimeout(marker);
	    }
	    // if clearTimeout wasn't available but was latter defined
	    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
	        cachedClearTimeout = clearTimeout;
	        return clearTimeout(marker);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedClearTimeout(marker);
	    } catch (e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
	            return cachedClearTimeout.call(null, marker);
	        } catch (e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
	            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
	            return cachedClearTimeout.call(this, marker);
	        }
	    }



	}
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;

	function cleanUpNextTick() {
	    if (!draining || !currentQueue) {
	        return;
	    }
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}

	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = runTimeout(cleanUpNextTick);
	    draining = true;

	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    runClearTimeout(timeout);
	}

	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        runTimeout(drainQueue);
	    }
	};

	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};

	function noop() {}

	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;

	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};

	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = function isBuffer(arg) {
	  return arg && typeof arg === 'object'
	    && typeof arg.copy === 'function'
	    && typeof arg.fill === 'function'
	    && typeof arg.readUInt8 === 'function';
	}

/***/ },
/* 5 */
/***/ function(module, exports) {

	if (typeof Object.create === 'function') {
	  // implementation from standard node.js 'util' module
	  module.exports = function inherits(ctor, superCtor) {
	    ctor.super_ = superCtor
	    ctor.prototype = Object.create(superCtor.prototype, {
	      constructor: {
	        value: ctor,
	        enumerable: false,
	        writable: true,
	        configurable: true
	      }
	    });
	  };
	} else {
	  // old school shim for old browsers
	  module.exports = function inherits(ctor, superCtor) {
	    ctor.super_ = superCtor
	    var TempCtor = function () {}
	    TempCtor.prototype = superCtor.prototype
	    ctor.prototype = new TempCtor()
	    ctor.prototype.constructor = ctor
	  }
	}


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var Log = __webpack_require__(7)

	var defaultLog = Log.getLogger()

	module.exports = exports = defaultLog


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {var _ = __webpack_require__(8)
	var is = _.is
	var safeConsole = __webpack_require__(19)

	module.exports = exports = Log

	function Log(opt) {
		var me = this
		if (is.string(opt)) {
			opt = {name: opt}
		}
		opt = opt || {}
		me.name = opt.name || Log.defaultName
		me.enabled = me.isNameMatch(me.name)
		me.Log = Log
	}

	// static

	var defaultConfig = {
		level: 0, // print all level
		MAX_LOG_LEN: 3000,
		debugKey: 'debug',
		defaultLevelName: 'log',
		defaultName: 'default',
		_name: '', // can not use name, default should be empty for online mode
		prefix: '',
		// TODO format layout?
		outputers: [], // 叫 log4j 叫 appender, seelog 叫 writer
		logFilters: [logFilter1],
		custom: {
			outputers: {
				color: __webpack_require__(20)
			}
		}
	}

	_.extend(Log, defaultConfig)

	var loggers = {} // cache all logger
	var logs = Log.logs = []

	if (safeConsole.hasConsole()) {
		Log.outputers.push(defaultOutput)
	}

	var LEVEL = {
		name2code: {
			// error always > info
			verbose: 0,
			log: 1,
			debug: 2,
			info: 3,
			warn: 4,
			error: 5
		},
		toname: function(name) {
			if (is.number(name)) {
				name = LEVEL.code2name[name]
			}
			if (!is.string(name)) {
				name = Log.defaultLevelName
			}
			return name
		},
		tocode: function(code) {
			if (is.string(code)) {
				code = LEVEL.name2code[_.lower(code)]
			}
			if (!is.number(code)) {
				code = LEVEL.name2code[Log.defaultLevelName]
			}
			return code
		}
	}

	LEVEL.code2name = _.invert(LEVEL.name2code)

	Log.LEVEL = LEVEL // TODO make level a class?

	Log.setLevel = function(level) {
		Log.level = LEVEL.tocode(level)
	}

	Log.setName = function(name) {
		Log._name = name
		Log.pattern = normalizePattern(name)
		_.forIn(loggers, function(logger) {
			logger.enabled = logger.isNameMatch(name)
		})
	}

	Log.getPlainLog = function() {
		return _.map(Log.logs, function(item) {
			return _.map(item.data, function(val) {
				var ret = val
				if (global.JSON) {
					try {
						ret = JSON.stringify(val)
					} catch (err) {
						ret = '[Nested]'
					}
				}
				return ret
			}).join(' ')
		}).join('\r\n')
	}

	Log.getLogger = getLogger

	Log.setName(Log._name)
	Log.setLevel(Log.level)

	Log.init = function(key) {
		key = key || Log.debugKey
		var name

		// try get name
		// get by url first
		if (global.location) {
			var reg = new RegExp(key + '=(\\S+)')
			var res = reg.exec(global.location.href)
			if (res) {
				name = res[1]
			}
		}

		// then localStorage
		if (null == name) {
			try {
				// never test global.localStorage, will also crash in no cookie mode
				name = localStorage[key]
			} catch (ignore) {}
		}

		// then env
		if (null == name && global.process) {
			name = _.get(global, ['process', 'env', key])
		}

		// 没有 name 也要 set, 要清除日志
		Log.setName(name)
	}

	Log.init() // always self init, so can use directly

	function defaultOutput(item) {
		var levelName = LEVEL.toname(item.level)
		safeConsole.console(levelName, item.data)
	}

	function logFilter1(item) {
		// data name level time
		item.time = _.now()
		saveLog(item)
	}

	function saveLog(item) {
		// TODO lru cache
		logs.push(item)
		if (logs.length > Log.MAX_LOG_LEN) {
			logs.shift()
		}
	}

	function getLogger(name) {
		// inspired by log4j getLogger
		name = name || Log.defaultName
		var logger = loggers[name]
		if (!logger) {
			logger = loggers[name] = new Log(name)
		}
		return logger
	}

	function normalizePattern(pattern) {
		var skips = []
		var names = []

		if (pattern && is.string(pattern)) {
			_.each(pattern.split(/[\s,]+/), function(name) {
				name = name.replace(/\*/g, '.*?')
				var first = name.charAt(0)
				if ('-' == first) {
					skips.push(new RegExp('^' + _.slice(name, 1) + '$'))
				} else {
					names.push(new RegExp('^' + name + '$'))
				}
			})
		}

		return {
			skips: skips,
			names: names
		}
	}

	// private

	var proto = Log.prototype

	proto.getLogger = getLogger

	proto.getLevelFunction = function(level) {
		var code = LEVEL.tocode(level)
		var me = this
		return function() {
			me.print(code, arguments)
		}
	}

	_.each(_.keys(LEVEL.name2code), function(level) {
		var code = LEVEL.tocode(level)
		Log[_.upper(level)] = code
		proto[level] = function() {
			var me = this
			me.print(code, arguments)
		}
	})

	proto.print = function(levelCode, data) {
		var me = this
		if (me.enabled && levelCode >= Log.level) {
			var item = {
				level: levelCode,
				name: me.name,
				data: data
			}
			_.each(Log.logFilters, function(logFilter) {
				logFilter(item, Log.lastLog)
			})
			Log.lastLog = item
			_.each(Log.outputers, function(outputer) {
				outputer(item, Log)
			})
		}
	}

	proto.isNameMatch = function(name) {
		var me = this
		var pattern = Log.pattern
		if (!name) {
			// clear all
			return false
		}
		function regMatch(reg) {
			return reg.test(name)
		}
		if (_.some(pattern.skips, regMatch)) {
			return false
		}
		if (_.some(pattern.names, regMatch)) {
			return true
		}
		return false
	}


	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(9)

	/* webpack only
	if (DEBUG && global.console) {
		console.debug('debug mode')
	}
	*/


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	var cou = __webpack_require__(10)

	module.exports = cou.extend(_, cou)

	__webpack_require__(12)
	__webpack_require__(13)
	__webpack_require__(14)
	__webpack_require__(16)
	__webpack_require__(17)
	__webpack_require__(18)

	_.mixin(_, _)

	function _(val) {
		if (!(this instanceof _)) return new _(val)
		this.__value = val
		this.__chain = false
	}



/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	var is = __webpack_require__(11)

	var slice = [].slice

	var _ = exports

	_.is = is

	_.extend = _.assign = extend

	_.each = each

	_.map = function(arr, fn) {
		var ret = []
		each(arr, function(item, i, arr) {
			ret[i] = fn(item, i, arr)
		})
		return ret
	}

	_.filter = function(arr, fn) {
		var ret = []
		each(arr, function(item, i, arr) {
			var val = fn(item, i, arr)
			if (val) ret.push(item)
		})
		return ret
	}

	_.some = function(arr, fn) {
		return -1 != findIndex(arr, fn)
	}

	_.every = function(arr, fn) {
		return -1 == findIndex(arr, negate(fn))
	}

	_.reduce = reduce

	_.findIndex = findIndex

	_.find = function(arr, fn) {
		var index = _.findIndex(arr, fn)
		if (-1 != index) {
			return arr[index]
		}
	}

	_.indexOf = indexOf

	_.includes = function(val, sub) {
		return -1 != indexOf(val, sub)
	}

	_.toArray = toArray

	_.slice = function(arr, start, end) {
		// support array and string
		var ret = [] // default return array
		var len = getLength(arr)
		if (len >= 0) {
			start = start || 0
			end = end || len
			// raw array and string use self slice
			if (!is.fn(arr.slice)) {
				arr = toArray(arr)
			}
			ret = arr.slice(start, end)
		}
		return ret
	}

	_.negate = negate

	_.forIn = forIn

	_.keys = keys

	var rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g

	_.trim = function(str) {
		if (null == str) return ''
		return ('' + str).replace(rtrim, '')
	}

	_.noop = function() {}

	_.len = getLength

	function getLength(arr) {
		if (null != arr) return arr.length
	}

	function each(arr, fn) {
		var len = getLength(arr)
		if (len && is.fn(fn)) {
			for (var i = 0; i < len; i++) {
				if (false === fn(arr[i], i, arr)) break
			}
		}
		return arr
	}

	function findIndex(arr, fn) {
		var ret = -1
		each(arr, function(item, i, arr) {
			if (fn(item, i, arr)) {
				ret = i
				return false
			}
		})
		return ret
	}

	function toArray(arr) {
		var ret = []
		each(arr, function(item) {
			ret.push(item)
		})
		return ret
	}


	function extend(target) {
		if (target) {
			var sources = slice.call(arguments, 1)
			each(sources, function(src) {
				forIn(src, function(val, key) {
					if (!is.undef(val)) {
						target[key] = val
					}
				})
			})
		}
		return target
	}

	function negate(fn) {
		return function() {
			return !fn.apply(this, arguments)
		}
	}

	function indexOf(val, sub) {
		if (is.string(val)) return val.indexOf(sub)

		return findIndex(val, function(item) {
			// important!
			return sub === item
		})
	}

	function reduce(arr, fn, prev) {
		each(arr, function(item, i) {
			prev = fn(prev, item, i, arr)
		})
		return prev
	}

	function forIn(hash, fn) {
		if (hash) {
			for (var key in hash) {
				if (is.owns(hash, key)) {
					if (false === fn(hash[key], key, hash)) break
				}
			}
		}
		return hash
	}

	function keys(hash) {
		var ret = []
		forIn(hash, function(val, key) {
			ret.push(key)
		})
		return ret
	}



/***/ },
/* 11 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {var is = exports

	var obj = Object.prototype

	var navigator = global.navigator

	// reserved words in es3: instanceof null undefined arguments boolean false true function int
	// only have is.string and is.object, not is.str and is.obj
	// instanceof null undefined arguments boolean false true function int

	is.browser = function() {
		if (!is.wechatApp()) {
			if (navigator && global.window == global) {
				return true
			}
		}
		return false
	}

	// simple modern browser detect
	is.h5 = function() {
		if (is.browser() && navigator.geolocation) {
			return true
		}
		return false
	}

	is.mobile = function() {
		if (is.browser() && /mobile/i.test(navigator.userAgent)) {
			return true
		}
		return false
	}

	is.wechatApp = function() {
		if ('object' == typeof wx) {
			if (wx && is.fn(wx.createVideoContext)) {
				// wechat js sdk has no createVideoContext
				return true
			}
		}
		return false
	}

	function _class(val) {
		var name = obj.toString.call(val)
		// [object Class]
		return name.substring(8, name.length - 1).toLowerCase()
	}

	function _type(val) {
		// undefined object boolean number string symbol function
		return typeof val
	}

	function owns(owner, key) {
		return obj.hasOwnProperty.call(owner, key)
	}

	is._class = _class

	is._type = _type

	is.owns = owns

	// not a number
	is.nan = function(val) {
		return val !== val
	}

	is.bool = function(val) {
		return 'boolean' == _class(val)
	}

	is.infinite = function(val) {
		return val == Infinity || val == -Infinity
	}

	is.number = function(num) {
		return !isNaN(num) && 'number' == _class(num)
	}

	// integer or decimal
	is.iod = function(val) {
		if (is.number(val) && !is.infinite(val)) {
			return true
		}
		return false
	}

	is.decimal = function(val) {
		if (is.iod(val)) {
			return 0 != val % 1
		}
		return false
	}

	is.integer = function(val) {
		if (is.iod(val)) {
			return 0 == val % 1
		}
		return false
	}

	// object or function
	is.oof = function(val) {
		if (val) {
			var tp = _type(val)
			return 'object' == tp || 'function' == tp
		}
		return false
	}

	// regexp should return object
	is.object = function(obj) {
		return is.oof(obj) && 'function' != _class(obj)
	}

	is.hash = is.plainObject = function(hash) {
		if (hash) {
			if ('object' == _class(hash)) {
				// old window is object
				if (hash.nodeType || hash.setInterval) {
					return false
				}
				return true
			}
		}
		return false
	}

	is.undef = function(val) {
		return 'undefined' == _type(val)
	}

	// host function should return function, e.g. alert
	is.fn = function(fn) {
		return 'function' == _class(fn)
	}

	is.string = function(str) {
		return 'string' == _class(str)
	}

	// number or string
	is.nos = function(val) {
		return is.iod(val) || is.string(val)
	}

	is.array = function(arr) {
		return 'array' == _class(arr)
	}

	is.arraylike = function(arr) {
		// window has length for iframe too, but it is not arraylike
		if (!is.window(arr) && is.object(arr)) {
			var len = arr.length
			if (is.integer(len) && len >= 0) {
				return true
			}
		}
		return false
	}

	is.window = function(val) {
		if (val && val.window == val) {
			return true
		}
		return false
	}

	is.empty = function(val) {
		if (is.string(val) || is.arraylike(val)) {
			return 0 === val.length
		}
		if (is.hash(val)) {
			for (var key in val) {
				if (owns(val, key)) {
					return false
				}
			}
		}
		return true
	}

	is.element = function(elem) {
		if (elem && 1 === elem.nodeType) {
			return true
		}
		return false
	}

	is.regexp = function(val) {
		return 'regexp' == _class(val)
	}


	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	var _ = module.exports = __webpack_require__(9)

	var each = _.each
	var includes = _.includes
	var is = _.is
	var proto = Array.prototype

	_.reject = function(arr, fn) {
		return _.filter(arr, function(val, i, arr) {
			return !fn(val, i, arr)
		})
	}

	_.without = function(arr) {
		var other = _.slice(arguments, 1)
		return _.difference(arr, other)
	}

	_.difference = function(arr, other) {
		var ret = []
		_.each(arr, function(val) {
			if (!includes(other, val)) {
				ret.push(val)
			}
		})
		return ret
	}

	_.pluck = function(arr, key) {
		return _.map(arr, function(item) {
			if (item) return item[key]
		})
	}

	_.size = function(arr) {
		var len = _.len(arr)
		if (null == len) {
			len = _.keys(arr).length
		}
		return len
	}

	_.first = function(arr) {
		if (arr) return arr[0]
	}

	_.last = function(arr) {
		var len = _.len(arr)
		if (len) {
			return arr[len - 1]
		}
	}

	_.asyncMap = function(arr, fn, cb) {
		// desperate
		var ret = []
		var count = 0
		var hasDone, hasStart

		each(arr, function(arg, i) {
			hasStart = true
			fn(arg, function(err, val) {
				if (hasDone) return
				count++
				if (err) {
					hasDone = true
					return cb(err)
				}
				ret[i] = val
				if (count == arr.length) {
					hasDone = true
					cb(null, ret)
				}
			})
		})

		if (!hasStart) cb(null) // empty
	}

	_.uniq = function(arr) {
		return _.uniqBy(arr)
	}

	_.uniqBy = function(arr, fn) {
		var ret = []
		var pool = []
		if (!is.fn(fn)) {
			fn = null
		}
		each(arr, function(item) {
			var val = item
			if (fn) {
				val = fn(item)
			}
			if (!includes(pool, val)) {
				pool.push(val)
				ret.push(item)
			}
		})
		return ret
	}

	_.flatten = function(arrs) {
		var ret = []
		each(arrs, function(arr) {
			if (is.arraylike(arr)) {
				each(arr, function(item) {
					ret.push(item)
				})
			} else ret.push(arr)
		})
		return ret
	}

	_.union = function() {
		return _.uniq(_.flatten(arguments))
	}

	_.sample = function(arr, n) {
		var ret = _.toArray(arr)
		var len = ret.length
		var need = Math.min(n || 1, len)
		for (var i = 0; i < len; i++) {
			var rand = _.random(i, len - 1)
			var tmp = ret[rand]
			ret[rand] = ret[i]
			ret[i] = tmp
		}
		ret.length = need
		if (null == n) {
			return ret[0]
		}
		return ret
	}

	_.shuffle = function(arr) {
		return _.sample(arr, Infinity)
	}

	_.compact = function(arr) {
		return _.filter(arr, _.identity)
	}

	_.rest = function(arr) {
		return _.slice(arr, 1)
	}

	_.invoke = function() {
		var args = arguments
		var arr = args[0]
		var fn = args[1]
		var isFunc = is.fn(fn)
		args = _.slice(args, 2)

		return _.map(arr, function(item) {
			if (isFunc) {
				return fn.apply(item, args)
			}
			if (null != item) {
				var method = item[fn]
				if (is.fn(method)) {
					return method.apply(item, args)
				}
			}
		})
	}

	_.partition = function(arr, fn) {
		var hash = _.groupBy(arr, function(val, i, arr) {
			var ret = fn(val, i, arr)
			if (ret) return 1
			return 2
		})
		return [hash[1] || [], hash[2] || []]
	}

	_.groupBy = function(arr, fn) {
		var hash = {}
		_.each(arr, function(val, i, arr) {
			var ret = fn(val, i, arr)
			hash[ret] = hash[ret] || []
			hash[ret].push(val)
		})
		return hash
	}

	_.range = function() {
		var args = arguments
		if (args.length < 2) {
			return _.range(args[1], args[0])
		}
		var start = args[0] || 0
		var last = args[1] || 0
		var step = args[2]
		if (!is.num(step)) {
			step = 1
		}
		var count = last - start
		if (0 != step) {
			count = count / step
		}
		var ret = []
		var val = start
		for (var i = 0; i < count; i++) {
			ret.push(val)
			val += step
		}
		return ret
	}

	_.pullAt = function(arr) {
		// `_.at` but mutate
		var indexes = _.slice(arguments, 1)
		return mutateDifference(arr, indexes)
	}

	function mutateDifference(arr, indexes) {
		var ret = []
		var len = _.len(indexes)
		if (len) {
			indexes = indexes.sort(function(a, b) {
				return a - b
			})
			while (len--) {
				var index = indexes[len]
				ret.push(proto.splice.call(arr, index, 1)[0])
			}
		}
		ret.reverse()
		return ret
	}

	_.remove = function(arr, fn) {
		// `_.filter` but mutate
		var len = _.len(arr) || 0
		var indexes = []
		while (len--) {
			if (fn(arr[len], len, arr)) {
				indexes.push(len)
			}
		}
		return mutateDifference(arr, indexes)
	}

	_.fill = function(val, start, end) {
		// TODO
	}


/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	var _ = module.exports = __webpack_require__(9)

	var is = _.is
	var each = _.each
	var forIn = _.forIn

	_.only = function(obj, keys) {
		obj = obj || {}
		if (is.str(keys)) keys = keys.split(/ +/)
		return _.reduce(keys, function(ret, key) {
			if (null != obj[key]) ret[key] = obj[key]
			return ret
		}, {})
	}

	_.values = function(obj) {
		return _.map(_.keys(obj), function(key) {
			return obj[key]
		})
	}

	_.pick = function(obj, fn) {
		if (!is.fn(fn)) {
			return _.pick(obj, function(val, key) {
				return key == fn
			})
		}
		var ret = {}
		forIn(obj, function(val, key, obj) {
			if (fn(val, key, obj)) {
				ret[key] = val
			}
		})
		return ret
	}

	_.functions = function(obj) {
		return _.keys(_.pick(obj, function(val) {
			return is.fn(val)
		}))
	}

	_.mapKeys = function(obj, fn) {
		var ret = {}
		forIn(obj, function(val, key, obj) {
			var newKey = fn(val, key, obj)
			ret[newKey] = val
		})
		return ret
	}

	_.mapObject = _.mapValues = function(obj, fn) {
		var ret = {}
		forIn(obj, function(val, key, obj) {
			ret[key] = fn(val, key, obj)
		})
		return ret
	}

	// return value when walk through path, otherwise return empty
	_.get = function(obj, path) {
		path = toPath(path)
		if (path.length) {
			var flag = _.every(path, function(key) {
				if (null != obj) { // obj can be indexed
					obj = obj[key]
					return true
				}
			})
			if (flag) return obj
		}
	}

	_.has = function(obj, path) {
		path = toPath(path)
		if (path.length) {
			var flag = _.every(path, function(key) {
				if (null != obj && is.owns(obj, key)) {
					obj = obj[key]
					return true
				}
			})
			if (flag) return true
		}
		return false
	}

	_.set = function(obj, path, val) {
		path = toPath(path)
		var cur = obj
		_.every(path, function(key, i) {
			if (is.oof(cur)) {
				if (i + 1 == path.length) {
					cur[key] = val
				} else {
					var item = cur[key]
					if (null == item) {
						// fill value with {} or []
						var item = {}
						if (~~key == key) {
							item = []
						}
					}
					cur = cur[key] = item
					return true
				}
			}
		})
		return obj
	}

	_.create = (function() {
		function Object() {} // so it seems like Object.create
		return function(proto, property) {
			// not same as Object.create, Object.create(proto, propertyDescription)
			if ('object' != typeof proto) {
				// null is ok
				proto = null
			}
			Object.prototype = proto
			return _.extend(new Object, property)
		}
	})()

	_.defaults = function() {
		var args = arguments
		var target = args[0]
		var sources = _.slice(args, 1)
		if (target) {
			_.each(sources, function(src) {
				_.mapObject(src, function(val, key) {
					if (is.undef(target[key])) {
						target[key] = val
					}
				})
			})
		}
		return target
	}

	_.isMatch = function(obj, src) {
		var ret = true
		obj = obj || {}
		forIn(src, function(val, key) {
			if (val !== obj[key]) {
				ret = false
				return false
			}
		})
		return ret
	}

	_.toPlainObject = function(val) {
		var ret = {}
		forIn(val, function(val, key) {
			ret[key] = val
		})
		return ret
	}

	_.invert = function(obj) {
		var ret = {}
		forIn(obj, function(val, key) {
			ret[val] = key
		})
		return ret
	}

	// topath, copy from lodash

	var rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\n\\]|\\.)*?)\2)\]/g
	var reEscapeChar = /\\(\\)?/g;

	function toPath(val) {
		if (is.array(val)) return val
		var ret = []
		_.tostr(val).replace(rePropName, function(match, number, quote, string) {
			var item = number || match
			if (quote) {
				item = string.replace(reEscapeChar, '$1')
			}
			ret.push(item)
		})
		return ret
	}


/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	var _ = module.exports = __webpack_require__(9)

	var is = _.is
	var slice = _.slice

	_.bind = function(fn, ctx) {
		if (is.str(ctx)) {
			var obj = fn
			fn = obj[ctx]
			ctx = obj
		}
		if (!is.fn(fn)) return fn
		var args = slice(arguments, 2)
		ctx = ctx || this
		return function() {
			return fn.apply(ctx, _.flatten([args, arguments]))
		}
	}

	// from lang.js `Function.prototype.inherits`
	// so belong to function
	_.inherits = function(ctor, superCtor) {
		ctor.super_ = superCtor
		ctor.prototype = _.create(superCtor.prototype, {
			constructor: ctor
		})
	}

	_.delay = function(fn, wait) {
		var args = _.slice(arguments, 2)
		return setTimeout(function() {
			fn.apply(this, args)
		}, wait)
	}

	_.before = function(n, fn) {
		return function() {
			if (n > 1) {
				n--
				return fn.apply(this, arguments)
			}
		}
	}

	_.once = function(fn) {
		return _.before(2, fn)
	}

	_.after = function(n, fn) {
		return function() {
			if (n > 1) {
				n--
			} else {
				return fn.apply(this, arguments)
			}
		}
	}

	_.throttle = function(fn, wait, opt) {
		wait = wait || 0
		opt = _.extend({
			leading: true,
			trailing: true,
			maxWait: wait
		}, opt)
		return _.debounce(fn, wait, opt)
	}

	_.debounce = function(fn, wait, opt) {
		wait = wait || 0
		opt = _.extend({
			leading: false,
			trailing: true
		}, opt)
		var maxWait = opt.maxWait
		var lastExec = 0 // wait
		var lastCall = 0 // just for maxWait
		var now = _.now()
		var timer

		if (!opt.leading) {
			lastExec = now
		}

		function ifIsCD() {
			if (now - lastExec > wait) return false
			if (maxWait && now - lastCall > maxWait) return false
			return true
		}

		function exec(fn, ctx, args) {
			lastExec = _.now() // update last exec
			return fn.apply(ctx, args)
		}

		function cancel() {
			if (timer) {
				clearTimeout(timer)
				timer = null
			}
		}

		function debounced() {
			now = _.now() // update now
			var isCD = ifIsCD()
			lastCall = now // update last call
			var me = this
			var args = arguments

			cancel()

			if (!isCD) {
				exec(fn, me, args)
			} else {
				if (opt.trailing) {
					timer = _.delay(function() {
						exec(fn, me, args)
					}, wait)
				}
			}
		}

		debounced.cancel = cancel

		return debounced
	}

	function memoize(fn) {
		var cache = new memoize.Cache
		function memoized() {
			var args = arguments
			var key = args[0]
			if (!cache.has(key)) {
				var ret = fn.apply(this, args)
				cache.set(key, ret)
			}
			return cache.get(key)
		}
		memoized.cache = cache
		return memoized
	}

	memoize.Cache = __webpack_require__(15)

	_.memoize = memoize

	_.wrap = function(val, fn) {
		return function() {
			var args = [val]
			args.push.apply(args, arguments)
			return fn.apply(this, args)
		}
	}

	_.curry = function(fn) {
		var len = fn.length
		return setter([])

		function setter(args) {
			return function() {
				var arr = args.concat(_.slice(arguments))
				if (arr.length >= len) {
					arr.length = len
					return fn.apply(this, arr)
				}
				return setter(arr)
			}
		}
	}


/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(9)
	var is = _.is

	module.exports = Cache

	function Cache() {
		this.data = {}
	}

	var proto = Cache.prototype

	proto.has = function(key) {
		return is.owns(this.data, key)
	}

	proto.get = function(key) {
		return this.data[key]
	}

	proto.set = function(key, val) {
		this.data[key] = val
	}

	proto['delete'] = function(key) {
		delete this.data[key]
	}


/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	var _ = module.exports = __webpack_require__(9)
	var is = _.is

	_.now = function() {
		return +new Date
	}

	_.constant = function(val) {
		return function() {
			return val
		}
	}

	_.identity = function(val) {
		return val
	}

	_.random = function(min, max) {
		return min + Math.floor(Math.random() * (max - min + 1))
	}

	_.mixin = function(dst, src, opt) {
		var keys = _.functions(src)
		if (dst) {
			if (is.fn(dst)) {
				opt = opt || {}
				var isChain = !!opt.chain
				// add to prototype
				var proto = dst.prototype
				_.each(keys, function(key) {
					var fn = src[key]
					proto[key] = function() {
						var me = this
						var args = [me.__value]
						args.push.apply(args, arguments)
						var ret = fn.apply(me, args)
						if (me.__chain) {
							me.__value = ret
							return me
						}
						return ret
					}
				})
			} else {
				_.each(keys, function(key) {
					dst[key] = src[key]
				})
			}
		}
		return dst
	}

	_.chain = function(val) {
		var ret = _(val)
		ret.__chain = true
		return ret
	}

	_.value = function() {
		this.__chain = false
		return this.__value
	}


/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	var _ = module.exports = __webpack_require__(9)

	_.tostr = tostr // lodash toString

	var indexOf = _.indexOf

	_.split = function(str, separator, limit) {
		str = tostr(str)
		return str.split(separator, limit)
	}

	_.capitalize = function(str) {
		str = tostr(str)
		return str.charAt(0).toUpperCase() + str.substr(1)
	}

	_.decapitalize = function(str) {
		str = tostr(str)
		return str.charAt(0).toLowerCase() + str.substr(1)
	}

	_.camelCase = function(str) {
		str = tostr(str)
		var arr = str.split(/[^\w]|_+/)
		arr = _.map(arr, function(val) {
			return _.capitalize(val)
		})
		return _.decapitalize(arr.join(''))
	}

	_.startsWith = function(str, val) {
		return 0 == indexOf(str, val)
	}

	_.endsWith = function(str, val) {
		val += '' // null => 'null'
		return val == _.slice(str, _.len(str) - _.len(val))
	}

	_.lower = function(str) {
		// lodash toLower
		return tostr(str).toLowerCase()
	}

	_.upper = function(str) {
		// lodash toUpper
		return tostr(str).toUpperCase()
	}

	_.repeat = function(str, count) {
		return _.map(_.range(count), function() {
			return str
		}).join('')
	}

	_.padStart = function(str, len, chars) {
		str = _.tostr(str)
		len = len || 0
		var delta = len - str.length
		return getPadStr(chars, delta) + str
	}

	_.padEnd = function(str, len, chars) {
		str = _.tostr(str)
		len = len || 0
		var delta = len - str.length
		return str + getPadStr(chars, delta)
	}

	function getPadStr(chars, len) {
		chars = _.tostr(chars) || ' ' // '' will never end
		var count = Math.floor(len / chars.length) + 1
		return _.repeat(chars, count).slice(0, len)
	}

	function tostr(str) {
		if (str || 0 == str) return str + ''
		return ''
	}


/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	var _ = module.exports = __webpack_require__(9)

	_.sum = function(arr) {
		return _.reduce(arr, function(sum, val) {
			return sum + val
		}, 0)
	}

	_.max = function(arr, fn) {
		var index = -1
		var data = -Infinity
		fn = fn || _.identity
		_.each(arr, function(val, i) {
			val = fn(val)
			if (val > data) {
				data = val
				index = i
			}
		})
		if (index > -1) {
			return arr[index]
		}
		return data
	}

	_.min = function(arr, fn) {
		var index = -1
		var data = Infinity
		fn = fn || _.identity
		_.each(arr, function(val, i) {
			val = fn(val)
			if (val < data) {
				data = val
				index = i
			}
		})
		if (index > -1) {
			return arr[index]
		}
		return data
	}


/***/ },
/* 19 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {exports.hasConsole = function() {
		if (global.console) {
			return true
		}
		return false
	}

	exports.console = function(level, arr) {
		// support ie8+
		// http://stackoverflow.com/questions/5538972/console-log-apply-not-working-in-ie9
		var apply = Function.prototype.apply || console[level].apply // wechat has no Function.prototype.apply
		apply.call(console[level], console, arr)
	}

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(8)
	var is = _.is
	var safeConsole = __webpack_require__(19)

	var colors = 'lightseagreen forestgreen goldenrod dodgerblue darkorchid crimson'.split(' ')
	var colorIndex = 0
	var inherit = 'color:inherit'
	var lastTime

	var cacheColorMap = {}

	module.exports = _.noop

	if (safeConsole.hasConsole()) {
		if (supportColor()) {
			module.exports = colorLog
		} else {
			module.exports = function(item, Log) {
				safeConsole.console('log', item.data)
			}
		}
	}

	function supportColor() {
		if (is.wechatApp()) {
			return true
		}
		if (isIE()) { // 可能可以改成 is.h5
			return false
		}
		if (!is.browser()) {
			return false
		}
		return true
	}

	function isIE() {
		if (is.browser()) {
			if (/Trident/i.test(navigator.userAgent)) {
				return true
			}
		}
		return false
	}

	function colorLog(item, Log) {
		var now = _.now()
		var ms = now - (lastTime || now)
		var color = 'color:' + getColor(item.name)
		lastTime = now

		var label = Log.prefix + item.name
		var main = '%c' + label + '%c'
		var arr = [null, color, inherit]

		_.each(item.data, function(val) {
			arr.push(val)
			main += ' %o'
		})

		arr.push(color)
		main += '%c +' + ms + 'ms'
		arr[0] = main
		safeConsole.console('log', arr)
	}

	function getColor(name) {
		if (!cacheColorMap[name]) {
			cacheColorMap[name] = colors[colorIndex++ % colors.length]
		}
		return cacheColorMap[name]
	}


/***/ }
/******/ ]);
 
(function(window, document, undefined) {
	var classes = [];
	var tests = [];
	var ModernizrProto = {
		_version: '3.5.0',
		_config: {
			classPrefix: '',
			enableClasses: true,
			enableJSClass: true,
			usePrefixes: true
		},
		_q: [],
		on: function(test, cb) {
			var self = this;
			setTimeout(function() {
				cb(self[test]);
			}, 0);
		},
		addTest: function(name, fn, options) {
			tests.push({
				name: name,
				fn: fn,
				options: options
			});
		},
		addAsyncTest: function(fn) {
			tests.push({
				name: null,
				fn: fn
			});
		}
	};
	var Modernizr = function() {};
	Modernizr.prototype = ModernizrProto;
	Modernizr = new Modernizr();

	function is(obj, type) {
		return typeof obj === type;
	}

	function testRunner() {
		var featureNames;
		var feature;
		var aliasIdx;
		var result;
		var nameIdx;
		var featureName;
		var featureNameSplit;
		for (var featureIdx in tests) {
			if (tests.hasOwnProperty(featureIdx)) {
				featureNames = [];
				feature = tests[featureIdx];
				if (feature.name) {
					featureNames.push(feature.name.toLowerCase());
					if (feature.options && feature.options.aliases && feature.options.aliases.length) {
						for (aliasIdx = 0; aliasIdx < feature.options.aliases.length; aliasIdx++) {
							featureNames.push(feature.options.aliases[aliasIdx].toLowerCase());
						}
					}
				}
				result = is(feature.fn, 'function') ? feature.fn() : feature.fn;
				for (nameIdx = 0; nameIdx < featureNames.length; nameIdx++) {
					featureName = featureNames[nameIdx];
					featureNameSplit = featureName.split('.');
					if (featureNameSplit.length === 1) {
						Modernizr[featureNameSplit[0]] = result;
					} else {
						if (Modernizr[featureNameSplit[0]] && !(Modernizr[featureNameSplit[0]] instanceof Boolean)) {
							Modernizr[featureNameSplit[0]] = new Boolean(Modernizr[featureNameSplit[0]]);
						}
						Modernizr[featureNameSplit[0]][featureNameSplit[1]] = result;
					}
					classes.push((result ? '' : 'no-') + featureNameSplit.join('-'));
				}
			}
		}
	}
	var docElement = document.documentElement;
	var isSVG = docElement.nodeName.toLowerCase() === 'svg';

	function setClasses(classes) {
		var className = docElement.className;
		var classPrefix = Modernizr._config.classPrefix || '';
		if (isSVG) {
			className = className.baseVal;
		}
		if (Modernizr._config.enableJSClass) {
			var reJS = new RegExp('(^|\\s)' + classPrefix + 'no-js(\\s|$)');
			className = className.replace(reJS, '$1' + classPrefix + 'js$2');
		}
		if (Modernizr._config.enableClasses) {
			className += ' ' + classPrefix + classes.join(' ' + classPrefix);
			if (isSVG) {
				docElement.className.baseVal = className;
			} else {
				docElement.className = className;
			}
		}
	}
	var prefixes = ModernizrProto._config.usePrefixes ? ' -webkit- -moz- -o- -ms- '.split(' ') : ['', ''];
	ModernizrProto._prefixes = prefixes;

	function createElement() {
		if (typeof document.createElement !== 'function') {
			return document.createElement(arguments[0]);
		} else if (isSVG) {
			return document.createElementNS.call(document, 'http://www.w3.org/2000/svg', arguments[0]);
		} else {
			return document.createElement.apply(document, arguments);
		}
	}

	function getBody() {
		var body = document.body;
		if (!body) {
			body = createElement(isSVG ? 'svg' : 'body');
			body.fake = true;
		}
		return body;
	}

	function injectElementWithStyles(rule, callback, nodes, testnames) {
		var mod = 'modernizr';
		var style;
		var ret;
		var node;
		var docOverflow;
		var div = createElement('div');
		var body = getBody();
		if (parseInt(nodes, 10)) {
			while (nodes--) {
				node = createElement('div');
				node.id = testnames ? testnames[nodes] : mod + (nodes + 1);
				div.appendChild(node);
			}
		}
		style = createElement('style');
		style.type = 'text/css';
		style.id = 's' + mod;
		(!body.fake ? div : body).appendChild(style);
		body.appendChild(div);
		if (style.styleSheet) {
			style.styleSheet.cssText = rule;
		} else {
			style.appendChild(document.createTextNode(rule));
		}
		div.id = mod;
		if (body.fake) {
			body.style.background = '';
			body.style.overflow = 'hidden';
			docOverflow = docElement.style.overflow;
			docElement.style.overflow = 'hidden';
			docElement.appendChild(body);
		}
		ret = callback(div, rule);
		if (body.fake) {
			body.parentNode.removeChild(body);
			docElement.style.overflow = docOverflow;
			docElement.offsetHeight;
		} else {
			div.parentNode.removeChild(div);
		}
		return !!ret;
	}
	var testStyles = (ModernizrProto.testStyles = injectElementWithStyles);
	/*!
	  {
	    "name": "Touch Events",
	    "property": "touchevents",
	    "caniuse" : "touch",
	    "tags": ["media", "attribute"],
	    "notes": [{
	      "name": "Touch Events spec",
	      "href": "https://www.w3.org/TR/2013/WD-touch-events-20130124/"
	    }],
	    "warnings": [
	      "Indicates if the browser supports the Touch Events spec, and does not necessarily reflect a touchscreen device"
	    ],
	    "knownBugs": [
	      "False-positive on some configurations of Nokia N900",
	      "False-positive on some BlackBerry 6.0 builds â€“ https://github.com/Modernizr/Modernizr/issues/372#issuecomment-3112695"
	    ]
	  }
	  !*/
	Modernizr.addTest('touchevents', function() {
		var bool;
		if ('ontouchstart' in window || (window.DocumentTouch && document instanceof DocumentTouch)) {
			bool = true;
		} else {
			var query = ['@media (', prefixes.join('touch-enabled),('), 'heartz', ')', '{#modernizr{top:9px;position:absolute}}'].join('');
			testStyles(query, function(node) {
				bool = node.offsetTop === 9;
			});
		}
		return bool;
	});

	function cssToDOM(name) {
		return name.replace(/([a-z])-([a-z])/g, function(str, m1, m2) {
			return m1 + m2.toUpperCase();
		}).replace(/^-/, '');
	}

	function contains(str, substr) {
		return !!~('' + str).indexOf(substr);
	}
	var omPrefixes = 'Moz O ms Webkit';
	var domPrefixes = ModernizrProto._config.usePrefixes ? omPrefixes.toLowerCase().split(' ') : [];
	ModernizrProto._domPrefixes = domPrefixes;
	var cssomPrefixes = ModernizrProto._config.usePrefixes ? omPrefixes.split(' ') : [];
	ModernizrProto._cssomPrefixes = cssomPrefixes;
	var atRule = function(prop) {
		var length = prefixes.length;
		var cssrule = window.CSSRule;
		var rule;
		if (typeof cssrule === 'undefined') {
			return undefined;
		}
		if (!prop) {
			return false;
		}
		prop = prop.replace(/^@/, '');
		rule = prop.replace(/-/g, '_').toUpperCase() + '_RULE';
		if (rule in cssrule) {
			return '@' + prop;
		}
		for (var i = 0; i < length; i++) {
			var prefix = prefixes[i];
			var thisRule = prefix.toUpperCase() + '_' + rule;
			if (thisRule in cssrule) {
				return '@-' + prefix.toLowerCase() + '-' + prop;
			}
		}
		return false;
	};
	ModernizrProto.atRule = atRule;

	function fnBind(fn, that) {
		return function() {
			return fn.apply(that, arguments);
		};
	}

	function testDOMProps(props, obj, elem) {
		var item;
		for (var i in props) {
			if (props[i] in obj) {
				if (elem === false) {
					return props[i];
				}
				item = obj[props[i]];
				if (is(item, 'function')) {
					return fnBind(item, elem || obj);
				}
				return item;
			}
		}
		return false;
	}

	function computedStyle(elem, pseudo, prop) {
		var result;
		if ('getComputedStyle' in window) {
			result = getComputedStyle.call(window, elem, pseudo);
			var console = window.console;
			if (result !== null) {
				if (prop) {
					result = result.getPropertyValue(prop);
				}
			} else {
				if (console) {
					var method = console.error ? 'error' : 'log';
					console[method].call(console, 'getComputedStyle returning null, its possible modernizr test results are inaccurate');
				}
			}
		} else {
			result = !pseudo && elem.currentStyle && elem.currentStyle[prop];
		}
		return result;
	}

	function domToCSS(name) {
		return name.replace(/([A-Z])/g, function(str, m1) {
			return '-' + m1.toLowerCase();
		}).replace(/^ms-/, '-ms-');
	}

	function nativeTestProps(props, value) {
		var i = props.length;
		if ('CSS' in window && 'supports' in window.CSS) {
			while (i--) {
				if (window.CSS.supports(domToCSS(props[i]), value)) {
					return true;
				}
			}
			return false;
		} else if ('CSSSupportsRule' in window) {
			var conditionText = [];
			while (i--) {
				conditionText.push('(' + domToCSS(props[i]) + ':' + value + ')');
			}
			conditionText = conditionText.join(' or ');
			return injectElementWithStyles('@supports (' +
				conditionText + ') { #modernizr { position: absolute; } }',
				function(node) {
					return computedStyle(node, null, 'position') == 'absolute';
				});
		}
		return undefined;
	}
	var modElem = {
		elem: createElement('modernizr')
	};
	Modernizr._q.push(function() {
		delete modElem.elem;
	});
	var mStyle = {
		style: modElem.elem.style
	};
	Modernizr._q.unshift(function() {
		delete mStyle.style;
	});

	function testProps(props, prefixed, value, skipValueTest) {
		skipValueTest = is(skipValueTest, 'undefined') ? false : skipValueTest;
		if (!is(value, 'undefined')) {
			var result = nativeTestProps(props, value);
			if (!is(result, 'undefined')) {
				return result;
			}
		}
		var afterInit, i, propsLength, prop, before;
		var elems = ['modernizr', 'tspan', 'samp'];
		while (!mStyle.style && elems.length) {
			afterInit = true;
			mStyle.modElem = createElement(elems.shift());
			mStyle.style = mStyle.modElem.style;
		}

		function cleanElems() {
			if (afterInit) {
				delete mStyle.style;
				delete mStyle.modElem;
			}
		}
		propsLength = props.length;
		for (i = 0; i < propsLength; i++) {
			prop = props[i];
			before = mStyle.style[prop];
			if (contains(prop, '-')) {
				prop = cssToDOM(prop);
			}
			if (mStyle.style[prop] !== undefined) {
				if (!skipValueTest && !is(value, 'undefined')) {
					try {
						mStyle.style[prop] = value;
					} catch (e) {}
					if (mStyle.style[prop] != before) {
						cleanElems();
						return prefixed == 'pfx' ? prop : true;
					}
				} else {
					cleanElems();
					return prefixed == 'pfx' ? prop : true;
				}
			}
		}
		cleanElems();
		return false;
	}

	function testPropsAll(prop, prefixed, elem, value, skipValueTest) {
		var ucProp = prop.charAt(0).toUpperCase() + prop.slice(1),
			props = (prop + ' ' + cssomPrefixes.join(ucProp + ' ') + ucProp).split(' ');
		if (is(prefixed, 'string') || is(prefixed, 'undefined')) {
			return testProps(props, prefixed, value, skipValueTest);
		} else {
			props = (prop + ' ' + domPrefixes.join(ucProp + ' ') + ucProp).split(' ');
			return testDOMProps(props, prefixed, elem);
		}
	}
	ModernizrProto.testAllProps = testPropsAll;
	var prefixed = (ModernizrProto.prefixed = function(prop, obj, elem) {
		if (prop.indexOf('@') === 0) {
			return atRule(prop);
		}
		if (prop.indexOf('-') != -1) {
			prop = cssToDOM(prop);
		}
		if (!obj) {
			return testPropsAll(prop, 'pfx');
		} else {
			return testPropsAll(prop, obj, elem);
		}
	});
	/*!
	  {
	    "name": "CSS Object Fit",
	    "caniuse": "object-fit",
	    "property": "objectfit",
	    "tags": ["css"],
	    "builderAliases": ["css_objectfit"],
	    "notes": [{
	      "name": "Opera Article on Object Fit",
	      "href": "https://dev.opera.com/articles/css3-object-fit-object-position/"
	    }]
	  }
	  !*/
	Modernizr.addTest('objectfit', !!prefixed('objectFit'), {
		aliases: ['object-fit']
	});
	testRunner();
	setClasses(classes);
	delete ModernizrProto.addTest;
	delete ModernizrProto.addAsyncTest;
	for (var i = 0; i < Modernizr._q.length; i++) {
		Modernizr._q[i]();
	}
	window.Modernizr = Modernizr;
})(window, document);
/*! jQuery Migrate v3.3.2 | (c) OpenJS Foundation and other contributors | jquery.org/license */
"undefined" == typeof jQuery.migrateMute && (jQuery.migrateMute = !0),
	function(t) {
		"use strict";
		"function" == typeof define && define.amd ? define(["jquery"], function(e) {
			return t(e, window)
		}) : "object" == typeof module && module.exports ? module.exports = t(require("jquery"), window) : t(jQuery, window)
	}(function(s, n) {
		"use strict";

		function e(e) {
			return 0 <= function(e, t) {
				for (var r = /^(\d+)\.(\d+)\.(\d+)/, n = r.exec(e) || [], o = r.exec(t) || [], i = 1; i <= 3; i++) {
					if (+o[i] < +n[i]) return 1;
					if (+n[i] < +o[i]) return -1
				}
				return 0
			}(s.fn.jquery, e)
		}
		s.migrateVersion = "3.3.2", n.console && n.console.log && (s && e("3.0.0") || n.console.log("JQMIGRATE: jQuery 3.0.0+ REQUIRED"), s.migrateWarnings && n.console.log("JQMIGRATE: Migrate plugin loaded multiple times"), n.console.log("JQMIGRATE: Migrate is installed" + (s.migrateMute ? "" : " with logging active") + ", version " + s.migrateVersion));
		var r = {};

		function u(e) {
			var t = n.console;
			s.migrateDeduplicateWarnings && r[e] || (r[e] = !0, s.migrateWarnings.push(e), t && t.warn && !s.migrateMute && (t.warn("JQMIGRATE: " + e), s.migrateTrace && t.trace && t.trace()))
		}

		function t(e, t, r, n) {
			Object.defineProperty(e, t, {
				configurable: !0,
				enumerable: !0,
				get: function() {
					return u(n), r
				},
				set: function(e) {
					u(n), r = e
				}
			})
		}

		function o(e, t, r, n) {
			e[t] = function() {
				return u(n), r.apply(this, arguments)
			}
		}
		s.migrateDeduplicateWarnings = !0, s.migrateWarnings = [], void 0 === s.migrateTrace && (s.migrateTrace = !0), s.migrateReset = function() {
			r = {}, s.migrateWarnings.length = 0
		}, "BackCompat" === n.document.compatMode && u("jQuery is not compatible with Quirks Mode");
		var i, a, c, d = {},
			l = s.fn.init,
			p = s.find,
			f = /\[(\s*[-\w]+\s*)([~|^$*]?=)\s*([-\w#]*?#[-\w#]*)\s*\]/,
			y = /\[(\s*[-\w]+\s*)([~|^$*]?=)\s*([-\w#]*?#[-\w#]*)\s*\]/g,
			m = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
		for (i in s.fn.init = function(e) {
				var t = Array.prototype.slice.call(arguments);
				return "string" == typeof e && "#" === e && (u("jQuery( '#' ) is not a valid selector"), t[0] = []), l.apply(this, t)
			}, s.fn.init.prototype = s.fn, s.find = function(t) {
				var r = Array.prototype.slice.call(arguments);
				if ("string" == typeof t && f.test(t)) try {
					n.document.querySelector(t)
				} catch (e) {
					t = t.replace(y, function(e, t, r, n) {
						return "[" + t + r + '"' + n + '"]'
					});
					try {
						n.document.querySelector(t), u("Attribute selector with '#' must be quoted: " + r[0]), r[0] = t
					} catch (e) {
						u("Attribute selector with '#' was not fixed: " + r[0])
					}
				}
				return p.apply(this, r)
			}, p) Object.prototype.hasOwnProperty.call(p, i) && (s.find[i] = p[i]);
		o(s.fn, "size", function() {
			return this.length
		}, "jQuery.fn.size() is deprecated and removed; use the .length property"), o(s, "parseJSON", function() {
			return JSON.parse.apply(null, arguments)
		}, "jQuery.parseJSON is deprecated; use JSON.parse"), o(s, "holdReady", s.holdReady, "jQuery.holdReady is deprecated"), o(s, "unique", s.uniqueSort, "jQuery.unique is deprecated; use jQuery.uniqueSort"), t(s.expr, "filters", s.expr.pseudos, "jQuery.expr.filters is deprecated; use jQuery.expr.pseudos"), t(s.expr, ":", s.expr.pseudos, "jQuery.expr[':'] is deprecated; use jQuery.expr.pseudos"), e("3.1.1") && o(s, "trim", function(e) {
			return null == e ? "" : (e + "").replace(m, "")
		}, "jQuery.trim is deprecated; use String.prototype.trim"), e("3.2.0") && (o(s, "nodeName", function(e, t) {
			return e.nodeName && e.nodeName.toLowerCase() === t.toLowerCase()
		}, "jQuery.nodeName is deprecated"), o(s, "isArray", Array.isArray, "jQuery.isArray is deprecated; use Array.isArray")), e("3.3.0") && (o(s, "isNumeric", function(e) {
			var t = typeof e;
			return ("number" == t || "string" == t) && !isNaN(e - parseFloat(e))
		}, "jQuery.isNumeric() is deprecated"), s.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "), function(e, t) {
			d["[object " + t + "]"] = t.toLowerCase()
		}), o(s, "type", function(e) {
			return null == e ? e + "" : "object" == typeof e || "function" == typeof e ? d[Object.prototype.toString.call(e)] || "object" : typeof e
		}, "jQuery.type is deprecated"), o(s, "isFunction", function(e) {
			return "function" == typeof e
		}, "jQuery.isFunction() is deprecated"), o(s, "isWindow", function(e) {
			return null != e && e === e.window
		}, "jQuery.isWindow() is deprecated")), s.ajax && (a = s.ajax, c = /(=)\?(?=&|$)|\?\?/, s.ajax = function() {
			var e = a.apply(this, arguments);
			return e.promise && (o(e, "success", e.done, "jQXHR.success is deprecated and removed"), o(e, "error", e.fail, "jQXHR.error is deprecated and removed"), o(e, "complete", e.always, "jQXHR.complete is deprecated and removed")), e
		}, e("4.0.0") || s.ajaxPrefilter("+json", function(e) {
			!1 !== e.jsonp && (c.test(e.url) || "string" == typeof e.data && 0 === (e.contentType || "").indexOf("application/x-www-form-urlencoded") && c.test(e.data)) && u("JSON-to-JSONP auto-promotion is deprecated")
		}));
		var g = s.fn.removeAttr,
			h = s.fn.toggleClass,
			v = /\S+/g;

		function j(e) {
			return e.replace(/-([a-z])/g, function(e, t) {
				return t.toUpperCase()
			})
		}
		s.fn.removeAttr = function(e) {
			var r = this;
			return s.each(e.match(v), function(e, t) {
				s.expr.match.bool.test(t) && (u("jQuery.fn.removeAttr no longer sets boolean properties: " + t), r.prop(t, !1))
			}), g.apply(this, arguments)
		};
		var Q, b = !(s.fn.toggleClass = function(t) {
				return void 0 !== t && "boolean" != typeof t ? h.apply(this, arguments) : (u("jQuery.fn.toggleClass( boolean ) is deprecated"), this.each(function() {
					var e = this.getAttribute && this.getAttribute("class") || "";
					e && s.data(this, "__className__", e), this.setAttribute && this.setAttribute("class", !e && !1 !== t && s.data(this, "__className__") || "")
				}))
			}),
			w = /^[a-z]/,
			x = /^(?:Border(?:Top|Right|Bottom|Left)?(?:Width|)|(?:Margin|Padding)?(?:Top|Right|Bottom|Left)?|(?:Min|Max)?(?:Width|Height))$/;
		s.swap && s.each(["height", "width", "reliableMarginRight"], function(e, t) {
			var r = s.cssHooks[t] && s.cssHooks[t].get;
			r && (s.cssHooks[t].get = function() {
				var e;
				return b = !0, e = r.apply(this, arguments), b = !1, e
			})
		}), s.swap = function(e, t, r, n) {
			var o, i, a = {};
			for (i in b || u("jQuery.swap() is undocumented and deprecated"), t) a[i] = e.style[i], e.style[i] = t[i];
			for (i in o = r.apply(e, n || []), t) e.style[i] = a[i];
			return o
		}, e("3.4.0") && "undefined" != typeof Proxy && (s.cssProps = new Proxy(s.cssProps || {}, {
			set: function() {
				return u("JQMIGRATE: jQuery.cssProps is deprecated"), Reflect.set.apply(this, arguments)
			}
		})), s.cssNumber || (s.cssNumber = {}), Q = s.fn.css, s.fn.css = function(e, t) {
			var r, n, o = this;
			return e && "object" == typeof e && !Array.isArray(e) ? (s.each(e, function(e, t) {
				s.fn.css.call(o, e, t)
			}), this) : ("number" == typeof t && (r = j(e), n = r, w.test(n) && x.test(n[0].toUpperCase() + n.slice(1)) || s.cssNumber[r] || u('Number-typed values are deprecated for jQuery.fn.css( "' + e + '", value )')), Q.apply(this, arguments))
		};
		var A, k, S, M, N = s.data;
		s.data = function(e, t, r) {
			var n, o, i;
			if (t && "object" == typeof t && 2 === arguments.length) {
				for (i in n = s.hasData(e) && N.call(this, e), o = {}, t) i !== j(i) ? (u("jQuery.data() always sets/gets camelCased names: " + i), n[i] = t[i]) : o[i] = t[i];
				return N.call(this, e, o), t
			}
			return t && "string" == typeof t && t !== j(t) && (n = s.hasData(e) && N.call(this, e)) && t in n ? (u("jQuery.data() always sets/gets camelCased names: " + t), 2 < arguments.length && (n[t] = r), n[t]) : N.apply(this, arguments)
		}, s.fx && (S = s.Tween.prototype.run, M = function(e) {
			return e
		}, s.Tween.prototype.run = function() {
			1 < s.easing[this.easing].length && (u("'jQuery.easing." + this.easing.toString() + "' should use only one argument"), s.easing[this.easing] = M), S.apply(this, arguments)
		}, A = s.fx.interval || 13, k = "jQuery.fx.interval is deprecated", n.requestAnimationFrame && Object.defineProperty(s.fx, "interval", {
			configurable: !0,
			enumerable: !0,
			get: function() {
				return n.document.hidden || u(k), A
			},
			set: function(e) {
				u(k), A = e
			}
		}));
		var R = s.fn.load,
			H = s.event.add,
			C = s.event.fix;
		s.event.props = [], s.event.fixHooks = {}, t(s.event.props, "concat", s.event.props.concat, "jQuery.event.props.concat() is deprecated and removed"), s.event.fix = function(e) {
			var t, r = e.type,
				n = this.fixHooks[r],
				o = s.event.props;
			if (o.length) {
				u("jQuery.event.props are deprecated and removed: " + o.join());
				while (o.length) s.event.addProp(o.pop())
			}
			if (n && !n._migrated_ && (n._migrated_ = !0, u("jQuery.event.fixHooks are deprecated and removed: " + r), (o = n.props) && o.length))
				while (o.length) s.event.addProp(o.pop());
			return t = C.call(this, e), n && n.filter ? n.filter(t, e) : t
		}, s.event.add = function(e, t) {
			return e === n && "load" === t && "complete" === n.document.readyState && u("jQuery(window).on('load'...) called after load event occurred"), H.apply(this, arguments)
		}, s.each(["load", "unload", "error"], function(e, t) {
			s.fn[t] = function() {
				var e = Array.prototype.slice.call(arguments, 0);
				return "load" === t && "string" == typeof e[0] ? R.apply(this, e) : (u("jQuery.fn." + t + "() is deprecated"), e.splice(0, 0, t), arguments.length ? this.on.apply(this, e) : (this.triggerHandler.apply(this, e), this))
			}
		}), s.each("blur focus focusin focusout resize scroll click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup contextmenu".split(" "), function(e, r) {
			s.fn[r] = function(e, t) {
				return u("jQuery.fn." + r + "() event shorthand is deprecated"), 0 < arguments.length ? this.on(r, null, e, t) : this.trigger(r)
			}
		}), s(function() {
			s(n.document).triggerHandler("ready")
		}), s.event.special.ready = {
			setup: function() {
				this === n.document && u("'ready' event is deprecated")
			}
		}, s.fn.extend({
			bind: function(e, t, r) {
				return u("jQuery.fn.bind() is deprecated"), this.on(e, null, t, r)
			},
			unbind: function(e, t) {
				return u("jQuery.fn.unbind() is deprecated"), this.off(e, null, t)
			},
			delegate: function(e, t, r, n) {
				return u("jQuery.fn.delegate() is deprecated"), this.on(t, e, r, n)
			},
			undelegate: function(e, t, r) {
				return u("jQuery.fn.undelegate() is deprecated"), 1 === arguments.length ? this.off(e, "**") : this.off(t, e || "**", r)
			},
			hover: function(e, t) {
				return u("jQuery.fn.hover() is deprecated"), this.on("mouseenter", e).on("mouseleave", t || e)
			}
		});

		function T(e) {
			var t = n.document.implementation.createHTMLDocument("");
			return t.body.innerHTML = e, t.body && t.body.innerHTML
		}

		function P(e) {
			var t = e.replace(O, "<$1></$2>");
			t !== e && T(e) !== T(t) && u("HTML tags must be properly nested and closed: " + e)
		}
		var O = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([a-z][^\/\0>\x20\t\r\n\f]*)[^>]*)\/>/gi,
			q = s.htmlPrefilter;
		s.UNSAFE_restoreLegacyHtmlPrefilter = function() {
			s.htmlPrefilter = function(e) {
				return P(e), e.replace(O, "<$1></$2>")
			}
		}, s.htmlPrefilter = function(e) {
			return P(e), q(e)
		};
		var D, _ = s.fn.offset;
		s.fn.offset = function() {
			var e = this[0];
			return !e || e.nodeType && e.getBoundingClientRect ? _.apply(this, arguments) : (u("jQuery.fn.offset() requires a valid DOM element"), arguments.length ? this : void 0)
		}, s.ajax && (D = s.param, s.param = function(e, t) {
			var r = s.ajaxSettings && s.ajaxSettings.traditional;
			return void 0 === t && r && (u("jQuery.param() no longer uses jQuery.ajaxSettings.traditional"), t = r), D.call(this, e, t)
		});
		var E, F, J = s.fn.andSelf || s.fn.addBack;
		return s.fn.andSelf = function() {
			return u("jQuery.fn.andSelf() is deprecated and removed, use jQuery.fn.addBack()"), J.apply(this, arguments)
		}, s.Deferred && (E = s.Deferred, F = [
			["resolve", "done", s.Callbacks("once memory"), s.Callbacks("once memory"), "resolved"],
			["reject", "fail", s.Callbacks("once memory"), s.Callbacks("once memory"), "rejected"],
			["notify", "progress", s.Callbacks("memory"), s.Callbacks("memory")]
		], s.Deferred = function(e) {
			var i = E(),
				a = i.promise();
			return i.pipe = a.pipe = function() {
				var o = arguments;
				return u("deferred.pipe() is deprecated"), s.Deferred(function(n) {
					s.each(F, function(e, t) {
						var r = "function" == typeof o[e] && o[e];
						i[t[1]](function() {
							var e = r && r.apply(this, arguments);
							e && "function" == typeof e.promise ? e.promise().done(n.resolve).fail(n.reject).progress(n.notify) : n[t[0] + "With"](this === a ? n.promise() : this, r ? [e] : arguments)
						})
					}), o = null
				}).promise()
			}, e && e.call(i, i), i
		}, s.Deferred.exceptionHook = E.exceptionHook), s
	});
/*! lazysizes - v5.2.1 */
! function(e) {
	var t = function(u, D, f) {
		"use strict";
		var k, H;
		if (function() {
				var e;
				var t = {
					lazyClass: "lazyload",
					loadedClass: "lazyloaded",
					loadingClass: "lazyloading",
					preloadClass: "lazypreload",
					errorClass: "lazyerror",
					autosizesClass: "lazyautosizes",
					srcAttr: "data-src",
					srcsetAttr: "data-srcset",
					sizesAttr: "data-sizes",
					minSize: 40,
					customMedia: {},
					init: true,
					expFactor: 1.5,
					hFac: .8,
					loadMode: 2,
					loadHidden: true,
					ricTimeout: 0,
					throttleDelay: 125
				};
				H = u.lazySizesConfig || u.lazysizesConfig || {};
				for (e in t) {
					if (!(e in H)) {
						H[e] = t[e]
					}
				}
			}(), !D || !D.getElementsByClassName) {
			return {
				init: function() {},
				cfg: H,
				noSupport: true
			}
		}
		var O = D.documentElement,
			a = u.HTMLPictureElement,
			P = "addEventListener",
			$ = "getAttribute",
			q = u[P].bind(u),
			I = u.setTimeout,
			U = u.requestAnimationFrame || I,
			l = u.requestIdleCallback,
			j = /^picture$/i,
			r = ["load", "error", "lazyincluded", "_lazyloaded"],
			i = {},
			G = Array.prototype.forEach,
			J = function(e, t) {
				if (!i[t]) {
					i[t] = new RegExp("(\\s|^)" + t + "(\\s|$)")
				}
				return i[t].test(e[$]("class") || "") && i[t]
			},
			K = function(e, t) {
				if (!J(e, t)) {
					e.setAttribute("class", (e[$]("class") || "").trim() + " " + t)
				}
			},
			Q = function(e, t) {
				var i;
				if (i = J(e, t)) {
					e.setAttribute("class", (e[$]("class") || "").replace(i, " "))
				}
			},
			V = function(t, i, e) {
				var a = e ? P : "removeEventListener";
				if (e) {
					V(t, i)
				}
				r.forEach(function(e) {
					t[a](e, i)
				})
			},
			X = function(e, t, i, a, r) {
				var n = D.createEvent("Event");
				if (!i) {
					i = {}
				}
				i.instance = k;
				n.initEvent(t, !a, !r);
				n.detail = i;
				e.dispatchEvent(n);
				return n
			},
			Y = function(e, t) {
				var i;
				if (!a && (i = u.picturefill || H.pf)) {
					if (t && t.src && !e[$]("srcset")) {
						e.setAttribute("srcset", t.src)
					}
					i({
						reevaluate: true,
						elements: [e]
					})
				} else if (t && t.src) {
					e.src = t.src
				}
			},
			Z = function(e, t) {
				return (getComputedStyle(e, null) || {})[t]
			},
			s = function(e, t, i) {
				i = i || e.offsetWidth;
				while (i < H.minSize && t && !e._lazysizesWidth) {
					i = t.offsetWidth;
					t = t.parentNode
				}
				return i
			},
			ee = function() {
				var i, a;
				var t = [];
				var r = [];
				var n = t;
				var s = function() {
					var e = n;
					n = t.length ? r : t;
					i = true;
					a = false;
					while (e.length) {
						e.shift()()
					}
					i = false
				};
				var e = function(e, t) {
					if (i && !t) {
						e.apply(this, arguments)
					} else {
						n.push(e);
						if (!a) {
							a = true;
							(D.hidden ? I : U)(s)
						}
					}
				};
				e._lsFlush = s;
				return e
			}(),
			te = function(i, e) {
				return e ? function() {
					ee(i)
				} : function() {
					var e = this;
					var t = arguments;
					ee(function() {
						i.apply(e, t)
					})
				}
			},
			ie = function(e) {
				var i;
				var a = 0;
				var r = H.throttleDelay;
				var n = H.ricTimeout;
				var t = function() {
					i = false;
					a = f.now();
					e()
				};
				var s = l && n > 49 ? function() {
					l(t, {
						timeout: n
					});
					if (n !== H.ricTimeout) {
						n = H.ricTimeout
					}
				} : te(function() {
					I(t)
				}, true);
				return function(e) {
					var t;
					if (e = e === true) {
						n = 33
					}
					if (i) {
						return
					}
					i = true;
					t = r - (f.now() - a);
					if (t < 0) {
						t = 0
					}
					if (e || t < 9) {
						s()
					} else {
						I(s, t)
					}
				}
			},
			ae = function(e) {
				var t, i;
				var a = 99;
				var r = function() {
					t = null;
					e()
				};
				var n = function() {
					var e = f.now() - i;
					if (e < a) {
						I(n, a - e)
					} else {
						(l || r)(r)
					}
				};
				return function() {
					i = f.now();
					if (!t) {
						t = I(n, a)
					}
				}
			},
			e = function() {
				var v, m, c, h, e;
				var y, z, g, p, C, b, A;
				var n = /^img$/i;
				var d = /^iframe$/i;
				var E = "onscroll" in u && !/(gle|ing)bot/.test(navigator.userAgent);
				var _ = 0;
				var w = 0;
				var N = 0;
				var M = -1;
				var x = function(e) {
					N--;
					if (!e || N < 0 || !e.target) {
						N = 0
					}
				};
				var W = function(e) {
					if (A == null) {
						A = Z(D.body, "visibility") == "hidden"
					}
					return A || !(Z(e.parentNode, "visibility") == "hidden" && Z(e, "visibility") == "hidden")
				};
				var S = function(e, t) {
					var i;
					var a = e;
					var r = W(e);
					g -= t;
					b += t;
					p -= t;
					C += t;
					while (r && (a = a.offsetParent) && a != D.body && a != O) {
						r = (Z(a, "opacity") || 1) > 0;
						if (r && Z(a, "overflow") != "visible") {
							i = a.getBoundingClientRect();
							r = C > i.left && p < i.right && b > i.top - 1 && g < i.bottom + 1
						}
					}
					return r
				};
				var t = function() {
					var e, t, i, a, r, n, s, l, o, u, f, c;
					var d = k.elements;
					if ((h = H.loadMode) && N < 8 && (e = d.length)) {
						t = 0;
						M++;
						for (; t < e; t++) {
							if (!d[t] || d[t]._lazyRace) {
								continue
							}
							if (!E || k.prematureUnveil && k.prematureUnveil(d[t])) {
								R(d[t]);
								continue
							}
							if (!(l = d[t][$]("data-expand")) || !(n = l * 1)) {
								n = w
							}
							if (!u) {
								u = !H.expand || H.expand < 1 ? O.clientHeight > 500 && O.clientWidth > 500 ? 500 : 370 : H.expand;
								k._defEx = u;
								f = u * H.expFactor;
								c = H.hFac;
								A = null;
								if (w < f && N < 1 && M > 2 && h > 2 && !D.hidden) {
									w = f;
									M = 0
								} else if (h > 1 && M > 1 && N < 6) {
									w = u
								} else {
									w = _
								}
							}
							if (o !== n) {
								y = innerWidth + n * c;
								z = innerHeight + n;
								s = n * -1;
								o = n
							}
							i = d[t].getBoundingClientRect();
							if ((b = i.bottom) >= s && (g = i.top) <= z && (C = i.right) >= s * c && (p = i.left) <= y && (b || C || p || g) && (H.loadHidden || W(d[t])) && (m && N < 3 && !l && (h < 3 || M < 4) || S(d[t], n))) {
								R(d[t]);
								r = true;
								if (N > 9) {
									break
								}
							} else if (!r && m && !a && N < 4 && M < 4 && h > 2 && (v[0] || H.preloadAfterLoad) && (v[0] || !l && (b || C || p || g || d[t][$](H.sizesAttr) != "auto"))) {
								a = v[0] || d[t]
							}
						}
						if (a && !r) {
							R(a)
						}
					}
				};
				var i = ie(t);
				var B = function(e) {
					var t = e.target;
					if (t._lazyCache) {
						delete t._lazyCache;
						return
					}
					x(e);
					K(t, H.loadedClass);
					Q(t, H.loadingClass);
					V(t, L);
					X(t, "lazyloaded")
				};
				var a = te(B);
				var L = function(e) {
					a({
						target: e.target
					})
				};
				var T = function(t, i) {
					try {
						t.contentWindow.location.replace(i)
					} catch (e) {
						t.src = i
					}
				};
				var F = function(e) {
					var t;
					var i = e[$](H.srcsetAttr);
					if (t = H.customMedia[e[$]("data-media") || e[$]("media")]) {
						e.setAttribute("media", t)
					}
					if (i) {
						e.setAttribute("srcset", i)
					}
				};
				var s = te(function(t, e, i, a, r) {
					var n, s, l, o, u, f;
					if (!(u = X(t, "lazybeforeunveil", e)).defaultPrevented) {
						if (a) {
							if (i) {
								K(t, H.autosizesClass)
							} else {
								t.setAttribute("sizes", a)
							}
						}
						s = t[$](H.srcsetAttr);
						n = t[$](H.srcAttr);
						if (r) {
							l = t.parentNode;
							o = l && j.test(l.nodeName || "")
						}
						f = e.firesLoad || "src" in t && (s || n || o);
						u = {
							target: t
						};
						K(t, H.loadingClass);
						if (f) {
							clearTimeout(c);
							c = I(x, 2500);
							V(t, L, true)
						}
						if (o) {
							G.call(l.getElementsByTagName("source"), F)
						}
						if (s) {
							t.setAttribute("srcset", s)
						} else if (n && !o) {
							if (d.test(t.nodeName)) {
								T(t, n)
							} else {
								t.src = n
							}
						}
						if (r && (s || o)) {
							Y(t, {
								src: n
							})
						}
					}
					if (t._lazyRace) {
						delete t._lazyRace
					}
					Q(t, H.lazyClass);
					ee(function() {
						var e = t.complete && t.naturalWidth > 1;
						if (!f || e) {
							if (e) {
								K(t, "ls-is-cached")
							}
							B(u);
							t._lazyCache = true;
							I(function() {
								if ("_lazyCache" in t) {
									delete t._lazyCache
								}
							}, 9)
						}
						if (t.loading == "lazy") {
							N--
						}
					}, true)
				});
				var R = function(e) {
					if (e._lazyRace) {
						return
					}
					var t;
					var i = n.test(e.nodeName);
					var a = i && (e[$](H.sizesAttr) || e[$]("sizes"));
					var r = a == "auto";
					if ((r || !m) && i && (e[$]("src") || e.srcset) && !e.complete && !J(e, H.errorClass) && J(e, H.lazyClass)) {
						return
					}
					t = X(e, "lazyunveilread").detail;
					if (r) {
						re.updateElem(e, true, e.offsetWidth)
					}
					e._lazyRace = true;
					N++;
					s(e, t, r, a, i)
				};
				var r = ae(function() {
					H.loadMode = 3;
					i()
				});
				var l = function() {
					if (H.loadMode == 3) {
						H.loadMode = 2
					}
					r()
				};
				var o = function() {
					if (m) {
						return
					}
					if (f.now() - e < 999) {
						I(o, 999);
						return
					}
					m = true;
					H.loadMode = 3;
					i();
					q("scroll", l, true)
				};
				return {
					_: function() {
						e = f.now();
						k.elements = D.getElementsByClassName(H.lazyClass);
						v = D.getElementsByClassName(H.lazyClass + " " + H.preloadClass);
						q("scroll", i, true);
						q("resize", i, true);
						q("pageshow", function(e) {
							if (e.persisted) {
								var t = D.querySelectorAll("." + H.loadingClass);
								if (t.length && t.forEach) {
									U(function() {
										t.forEach(function(e) {
											if (e.complete) {
												R(e)
											}
										})
									})
								}
							}
						});
						if (u.MutationObserver) {
							new MutationObserver(i).observe(O, {
								childList: true,
								subtree: true,
								attributes: true
							})
						} else {
							O[P]("DOMNodeInserted", i, true);
							O[P]("DOMAttrModified", i, true);
							setInterval(i, 999)
						}
						q("hashchange", i, true);
						["focus", "mouseover", "click", "load", "transitionend", "animationend"].forEach(function(e) {
							D[P](e, i, true)
						});
						if (/d$|^c/.test(D.readyState)) {
							o()
						} else {
							q("load", o);
							D[P]("DOMContentLoaded", i);
							I(o, 2e4)
						}
						if (k.elements.length) {
							t();
							ee._lsFlush()
						} else {
							i()
						}
					},
					checkElems: i,
					unveil: R,
					_aLSL: l
				}
			}(),
			re = function() {
				var i;
				var n = te(function(e, t, i, a) {
					var r, n, s;
					e._lazysizesWidth = a;
					a += "px";
					e.setAttribute("sizes", a);
					if (j.test(t.nodeName || "")) {
						r = t.getElementsByTagName("source");
						for (n = 0, s = r.length; n < s; n++) {
							r[n].setAttribute("sizes", a)
						}
					}
					if (!i.detail.dataAttr) {
						Y(e, i.detail)
					}
				});
				var a = function(e, t, i) {
					var a;
					var r = e.parentNode;
					if (r) {
						i = s(e, r, i);
						a = X(e, "lazybeforesizes", {
							width: i,
							dataAttr: !!t
						});
						if (!a.defaultPrevented) {
							i = a.detail.width;
							if (i && i !== e._lazysizesWidth) {
								n(e, r, a, i)
							}
						}
					}
				};
				var e = function() {
					var e;
					var t = i.length;
					if (t) {
						e = 0;
						for (; e < t; e++) {
							a(i[e])
						}
					}
				};
				var t = ae(e);
				return {
					_: function() {
						i = D.getElementsByClassName(H.autosizesClass);
						q("resize", t)
					},
					checkElems: t,
					updateElem: a
				}
			}(),
			t = function() {
				if (!t.i && D.getElementsByClassName) {
					t.i = true;
					re._();
					e._()
				}
			};
		return I(function() {
			H.init && t()
		}), k = {
			cfg: H,
			autoSizer: re,
			loader: e,
			init: t,
			uP: Y,
			aC: K,
			rC: Q,
			hC: J,
			fire: X,
			gW: s,
			rAF: ee
		}
	}(e, e.document, Date);
	e.lazySizes = t, "object" == typeof module && module.exports && (module.exports = t)
}("undefined" != typeof window ? window : {});
/*! lazysizes - v5.2.1 */
! function(e, t) {
	var a = function() {
		t(e.lazySizes), e.removeEventListener("lazyunveilread", a, !0)
	};
	t = t.bind(null, e, e.document), "object" == typeof module && module.exports ? t(require("lazysizes")) : "function" == typeof define && define.amd ? define(["lazysizes"], t) : e.lazySizes ? a() : e.addEventListener("lazyunveilread", a, !0)
}(window, function(e, n, i) {
	"use strict";
	var l, o, d = {};

	function u(e, t) {
		var a, r;
		d[e] || (a = n.createElement(t ? "link" : "script"), r = n.getElementsByTagName("script")[0], t ? (a.rel = "stylesheet", a.href = e) : a.src = e, d[e] = !0, d[a.src || a.href] = !0, r.parentNode.insertBefore(a, r))
	}
	n.addEventListener && (l = function(e, t) {
		var a = n.createElement("img");
		a.onload = function() {
			a.onload = null, a.onerror = null, a = null, t()
		}, a.onerror = a.onload, a.src = e, a && a.complete && a.onload && a.onload()
	}, addEventListener("lazybeforeunveil", function(e) {
		var t, a, r;
		if (e.detail.instance == i && !e.defaultPrevented) {
			var n = e.target;
			if ("none" == n.preload && (n.preload = n.getAttribute("data-preload") || "auto"), null != n.getAttribute("data-autoplay"))
				if (n.getAttribute("data-expand") && !n.autoplay) try {
					n.play()
				} catch (e) {} else requestAnimationFrame(function() {
					n.setAttribute("data-expand", "-10"), i.aC(n, i.cfg.lazyClass)
				});
			(t = n.getAttribute("data-link")) && u(t, !0), (t = n.getAttribute("data-script")) && u(t), (t = n.getAttribute("data-require")) && (i.cfg.requireJs ? i.cfg.requireJs([t]) : u(t)), (a = n.getAttribute("data-bg")) && (e.detail.firesLoad = !0, l(a, function() {
				n.style.backgroundImage = "url(" + (o.test(a) ? JSON.stringify(a) : a) + ")", e.detail.firesLoad = !1, i.fire(n, "_lazyloaded", {}, !0, !0)
			})), (r = n.getAttribute("data-poster")) && (e.detail.firesLoad = !0, l(r, function() {
				n.poster = r, e.detail.firesLoad = !1, i.fire(n, "_lazyloaded", {}, !0, !0)
			}))
		}
	}, !(o = /\(|\)|\s|'/)))
});
/*! @preserve sweet-scroll v4.0.0 - tsuyoshiwada | MIT License */
! function(t, e) {
	"object" == typeof exports && "undefined" != typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define(e) : (t = t || self).SweetScroll = e()
}(this, function() {
	"use strict";
	var t = function() {
			return (t = Object.assign || function(t) {
				for (var e, n = 1, o = arguments.length; n < o; n++)
					for (var i in e = arguments[n]) Object.prototype.hasOwnProperty.call(e, i) && (t[i] = e[i]);
				return t
			}).apply(this, arguments)
		},
		e = !("undefined" == typeof window || !window.document || !window.document.createElement),
		n = !!e && (window.history && "pushState" in window.history && "file:" !== window.location.protocol),
		o = function() {
			var t = !1;
			if (!e) return t;
			try {
				var n = window,
					o = Object.defineProperty({}, "passive", {
						get: function() {
							t = !0
						}
					});
				n.addEventListener("test", null, o), n.removeEventListener("test", null, o)
			} catch (t) {}
			return t
		}(),
		i = function(t) {
			return "string" == typeof t
		},
		r = function(t) {
			return "function" == typeof t
		},
		u = function(t) {
			return Array.isArray(t)
		},
		a = function(t, e) {
			return t && t.hasOwnProperty(e)
		},
		l = e ? window.requestAnimationFrame.bind(window) : null,
		s = e ? window.cancelAnimationFrame.bind(window) : null,
		c = Math.cos,
		f = Math.sin,
		p = Math.pow,
		h = Math.sqrt,
		d = Math.PI,
		v = {
			linear: function(t) {
				return t
			},
			easeInQuad: function(t, e, n, o, i) {
				return o * (e /= i) * e + n
			},
			easeOutQuad: function(t, e, n, o, i) {
				return -o * (e /= i) * (e - 2) + n
			},
			easeInOutQuad: function(t, e, n, o, i) {
				return (e /= i / 2) < 1 ? o / 2 * e * e + n : -o / 2 * (--e * (e - 2) - 1) + n
			},
			easeInCubic: function(t, e, n, o, i) {
				return o * (e /= i) * e * e + n
			},
			easeOutCubic: function(t, e, n, o, i) {
				return o * ((e = e / i - 1) * e * e + 1) + n
			},
			easeInOutCubic: function(t, e, n, o, i) {
				return (e /= i / 2) < 1 ? o / 2 * e * e * e + n : o / 2 * ((e -= 2) * e * e + 2) + n
			},
			easeInQuart: function(t, e, n, o, i) {
				return o * (e /= i) * e * e * e + n
			},
			easeOutQuart: function(t, e, n, o, i) {
				return -o * ((e = e / i - 1) * e * e * e - 1) + n
			},
			easeInOutQuart: function(t, e, n, o, i) {
				return (e /= i / 2) < 1 ? o / 2 * e * e * e * e + n : -o / 2 * ((e -= 2) * e * e * e - 2) + n
			},
			easeInQuint: function(t, e, n, o, i) {
				return o * (e /= i) * e * e * e * e + n
			},
			easeOutQuint: function(t, e, n, o, i) {
				return o * ((e = e / i - 1) * e * e * e * e + 1) + n
			},
			easeInOutQuint: function(t, e, n, o, i) {
				return (e /= i / 2) < 1 ? o / 2 * e * e * e * e * e + n : o / 2 * ((e -= 2) * e * e * e * e + 2) + n
			},
			easeInSine: function(t, e, n, o, i) {
				return -o * c(e / i * (d / 2)) + o + n
			},
			easeOutSine: function(t, e, n, o, i) {
				return o * f(e / i * (d / 2)) + n
			},
			easeInOutSine: function(t, e, n, o, i) {
				return -o / 2 * (c(d * e / i) - 1) + n
			},
			easeInExpo: function(t, e, n, o, i) {
				return 0 === e ? n : o * p(2, 10 * (e / i - 1)) + n
			},
			easeOutExpo: function(t, e, n, o, i) {
				return e === i ? n + o : o * (1 - p(2, -10 * e / i)) + n
			},
			easeInOutExpo: function(t, e, n, o, i) {
				return 0 === e ? n : e === i ? n + o : (e /= i / 2) < 1 ? o / 2 * p(2, 10 * (e - 1)) + n : o / 2 * (2 - p(2, -10 * --e)) + n
			},
			easeInCirc: function(t, e, n, o, i) {
				return -o * (h(1 - (e /= i) * e) - 1) + n
			},
			easeOutCirc: function(t, e, n, o, i) {
				return o * h(1 - (e = e / i - 1) * e) + n
			},
			easeInOutCirc: function(t, e, n, o, i) {
				return (e /= i / 2) < 1 ? -o / 2 * (h(1 - e * e) - 1) + n : o / 2 * (h(1 - (e -= 2) * e) + 1) + n
			}
		},
		g = function(t) {
			return Array.prototype.slice.call(t ? document.querySelectorAll(t) : [])
		},
		w = function(t) {
			return g(t).shift() || null
		},
		m = function(t) {
			return t instanceof Element
		},
		y = function(t) {
			return t === window
		},
		x = function(t) {
			return t === document.documentElement || t === document.body
		},
		b = function(t, e) {
			if (m(e)) return t === e;
			for (var n = g(e), o = n.length; --o >= 0 && n[o] !== t;);
			return o > -1
		},
		O = function(t) {
			return Math.max(t.scrollHeight, t.clientHeight, t.offsetHeight)
		},
		$ = function(t) {
			return Math.max(t.scrollWidth, t.clientWidth, t.offsetWidth)
		},
		M = function(t) {
			return {
				width: $(t),
				height: O(t)
			}
		},
		E = {
			y: "scrollTop",
			x: "scrollLeft"
		},
		I = {
			y: "pageYOffset",
			x: "pageXOffset"
		},
		C = function(t, e) {
			return y(t) ? t[I[e]] : t[E[e]]
		},
		S = function(t, e, n) {
			if (y(t)) {
				var o = "y" === n;
				t.scrollTo(o ? t.pageXOffset : e, o ? e : t.pageYOffset)
			} else t[E[n]] = e
		},
		k = function(t, e) {
			var n = t.getBoundingClientRect();
			if (n.width || n.height) {
				var o = {
						top: 0,
						left: 0
					},
					i = void 0;
				if (y(e) || x(e)) i = document.documentElement, o.top = window[I.y], o.left = window[I.x];
				else {
					var r = (i = e).getBoundingClientRect();
					o.top = -1 * r.top + i[E.y], o.left = -1 * r.left + i[E.x]
				}
				return {
					top: n.top + o.top - i.clientTop,
					left: n.left + o.left - i.clientLeft
				}
			}
			return n
		},
		A = e ? "onwheel" in document ? "wheel" : "mousewheel" : "wheel",
		L = function(t, e, n, i, r) {
			n.split(" ").forEach(function(n) {
				t[e](function(t) {
					return "wheel" === t ? A : t
				}(n), i, !!o && {
					passive: r
				})
			})
		},
		P = function(t, e, n, o) {
			return L(t, "addEventListener", e, n, o)
		},
		Q = function(t, e, n, o) {
			return L(t, "removeEventListener", e, n, o)
		},
		z = /^(\+|-)=(\d+(?:\.\d+)?)$/,
		W = function(e, n) {
			var o, r = {
				top: 0,
				left: 0,
				relative: !1
			};
			if (a(e, "top") || a(e, "left")) r = t({}, r, e);
			else if (u(e))
				if (e.length > 1) r.top = e[0], r.left = e[1];
				else {
					if (1 !== e.length) return null;
					r.top = n ? e[0] : 0, r.left = n ? 0 : e[0]
				}
			else if (!u(o = e) && o - parseFloat(o) + 1 >= 0) n ? r.top = e : r.left = e;
			else {
				if (!i(e)) return null;
				var l = e.trim().match(z);
				if (!l) return null;
				var s = l[1],
					c = parseInt(l[2], 10);
				"+" === s ? (r.top = n ? c : 0, r.left = n ? 0 : c) : (r.top = n ? -c : 0, r.left = n ? 0 : -c), r.relative = !0
			}
			return r
		},
		j = {
			trigger: "[data-scroll]",
			header: "[data-scroll-header]",
			duration: 1e3,
			easing: "easeOutQuint",
			offset: 0,
			vertical: !0,
			horizontal: !1,
			cancellable: !0,
			updateURL: !1,
			preventDefault: !0,
			stopPropagation: !0,
			before: null,
			after: null,
			cancel: null,
			complete: null,
			step: null
		};
	return function() {
		function o(n, i) {
			var r = this;
			this.$el = null, this.ctx = {
				$trigger: null,
				opts: null,
				progress: !1,
				pos: null,
				startPos: null,
				easing: null,
				start: 0,
				id: 0,
				cancel: !1,
				hash: null
			}, this.loop = function(t) {
				var e = r,
					n = e.$el,
					i = e.ctx;
				if (i.start || (i.start = t), i.progress && n) {
					var u = i.opts,
						a = i.pos,
						l = i.start,
						s = i.startPos,
						c = i.easing,
						f = u.duration,
						p = {
							top: "y",
							left: "x"
						},
						h = t - l,
						d = Math.min(1, Math.max(h / f, 0));
					Object.keys(a).forEach(function(t) {
						var e = a[t],
							o = s[t],
							i = e - o;
						if (0 !== i) {
							var r = c(d, f * d, 0, 1, f);
							S(n, Math.round(o + i * r), p[t])
						}
					}), h <= f ? (r.hook(u, "step", d), i.id = o.raf(r.loop)) : r.stop(!0)
				} else r.stop()
			}, this.handleClick = function(e) {
				for (var n = r.opts, o = e.target; o && o !== document; o = o.parentNode)
					if (b(o, n.trigger)) {
						var i = JSON.parse(o.getAttribute("data-scroll-options") || "{}"),
							u = o.getAttribute("data-scroll") || o.getAttribute("href"),
							a = t({}, n, i),
							l = a.preventDefault,
							s = a.stopPropagation,
							c = a.vertical,
							f = a.horizontal;
						l && e.preventDefault(), s && e.stopPropagation(), r.ctx.$trigger = o, f && c ? r.to(u, a) : c ? r.toTop(u, a) : f && r.toLeft(u, a);
						break
					}
			}, this.handleStop = function(t) {
				var e = r.ctx,
					n = e.opts;
				n && n.cancellable ? (e.cancel = !0, r.stop()) : t.preventDefault()
			}, this.opts = t({}, j, n || {});
			var u = null;
			e && (u = "string" == typeof i ? w(i) : null != i ? i : window), this.$el = u, u && this.bind(!0, !1)
		}
		return o.create = function(t, e) {
			return new o(t, e)
		}, o.prototype.to = function(n, o) {
			if (e) {
				var r = this.$el,
					u = this.ctx,
					a = this.opts,
					l = u.$trigger,
					s = t({}, a, o || {}),
					c = s.offset,
					f = s.vertical,
					p = s.horizontal,
					h = m(s.header) ? s.header : w(s.header),
					d = i(n) && /^#/.test(n) ? n : null;
				if (u.opts = s, u.cancel = !1, u.hash = d, this.stop(), r) {
					var v = W(c, f),
						g = W(n, f),
						b = {
							top: 0,
							left: 0
						};
					if (g)
						if (g.relative) {
							var E = C(r, f ? "y" : "x");
							b.top = f ? E + g.top : g.top, b.left = f ? g.left : E + g.left
						} else b = g;
					else if (i(n) && "#" !== n) {
						var I = w(n);
						if (!I) return;
						b = k(I, r)
					}
					v && (b.top += v.top, b.left += v.left), h && (b.top = Math.max(0, b.top - M(h).height));
					var S = function(t) {
							var e = y(t) || x(t);
							return {
								viewport: {
									width: e ? Math.min(window.innerWidth, document.documentElement.clientWidth) : t.clientWidth,
									height: e ? window.innerHeight : t.clientHeight
								},
								size: e ? {
									width: Math.max($(document.body), $(document.documentElement)),
									height: Math.max(O(document.body), O(document.documentElement))
								} : M(t)
							}
						}(r),
						A = S.viewport,
						L = S.size;
					b.top = f ? Math.max(0, Math.min(L.height - A.height, b.top)) : C(r, "y"), b.left = p ? Math.max(0, Math.min(L.width - A.width, b.left)) : C(r, "x"), !1 !== this.hook(s, "before", b, l) ? (u.pos = b, this.start(s), this.bind(!1, !0)) : u.opts = null
				}
			}
		}, o.prototype.toTop = function(e, n) {
			this.to(e, t({}, n || {}, {
				vertical: !0,
				horizontal: !1
			}))
		}, o.prototype.toLeft = function(e, n) {
			this.to(e, t({}, n || {}, {
				vertical: !1,
				horizontal: !0
			}))
		}, o.prototype.toElement = function(t, n) {
			var o = this.$el;
			e && o && this.to(k(t, o), n || {})
		}, o.prototype.stop = function(t) {
			void 0 === t && (t = !1);
			var e = this.$el,
				n = this.ctx,
				i = n.pos;
			e && n.progress && (o.caf(n.id), n.progress = !1, n.start = 0, n.id = 0, t && i && (S(e, i.left, "x"), S(e, i.top, "y")), this.complete())
		}, o.prototype.update = function(e) {
			if (this.$el) {
				var n = t({}, this.opts, e);
				this.stop(), this.unbind(!0, !0), this.opts = n, this.bind(!0, !1)
			}
		}, o.prototype.destroy = function() {
			this.$el && (this.stop(), this.unbind(!0, !0), this.$el = null)
		}, o.prototype.onBefore = function(t, e) {
			return !0
		}, o.prototype.onStep = function(t) {}, o.prototype.onAfter = function(t, e) {}, o.prototype.onCancel = function() {}, o.prototype.onComplete = function(t) {}, o.prototype.start = function(t) {
			var e = this.ctx;
			e.opts = t, e.progress = !0, e.easing = r(t.easing) ? t.easing : v[t.easing];
			var n = this.$el,
				i = {
					top: C(n, "y"),
					left: C(n, "x")
				};
			e.startPos = i, e.id = o.raf(this.loop)
		}, o.prototype.complete = function() {
			var t = this.$el,
				o = this.ctx,
				i = o.hash,
				r = o.cancel,
				u = o.opts,
				a = o.pos,
				l = o.$trigger;
			if (t && u) {
				if (null != i && i !== window.location.hash) {
					var s = u.updateURL;
					e && n && !1 !== s && window.history["replace" === s ? "replaceState" : "pushState"](null, "", i)
				}
				this.unbind(!1, !0), o.opts = null, o.$trigger = null, r ? this.hook(u, "cancel") : this.hook(u, "after", a, l), this.hook(u, "complete", r)
			}
		}, o.prototype.hook = function(t, e) {
			for (var n, o = [], i = 2; i < arguments.length; i++) o[i - 2] = arguments[i];
			var u, a, l = t[e];
			return r(l) && (u = l.apply(this, o.concat([this]))), a = (n = this)["on" + (e[0].toUpperCase() + e.slice(1))].apply(n, o), void 0 !== u ? u : a
		}, o.prototype.bind = function(t, e) {
			var n = this.$el,
				o = this.ctx.opts;
			n && (t && P(n, "click", this.handleClick, !1), e && P(n, "wheel touchstart touchmove", this.handleStop, !o || o.cancellable))
		}, o.prototype.unbind = function(t, e) {
			var n = this.$el,
				o = this.ctx.opts;
			n && (t && Q(n, "click", this.handleClick, !1), e && Q(n, "wheel touchstart touchmove", this.handleStop, !o || o.cancellable))
		}, o.raf = l, o.caf = s, o
	}()
});

! function(e, t) {
	"object" == typeof exports && "undefined" != typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define(t) : (e = "undefined" != typeof globalThis ? globalThis : e || self).Swiper = t()
}(this, (function() {
	"use strict";

	function e(e, t) {
		for (var a = 0; a < t.length; a++) {
			var i = t[a];
			i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i)
		}
	}

	function t() {
		return (t = Object.assign || function(e) {
			for (var t = 1; t < arguments.length; t++) {
				var a = arguments[t];
				for (var i in a) Object.prototype.hasOwnProperty.call(a, i) && (e[i] = a[i])
			}
			return e
		}).apply(this, arguments)
	}

	function a(e) {
		return null !== e && "object" == typeof e && "constructor" in e && e.constructor === Object
	}

	function i(e, t) {
		void 0 === e && (e = {}), void 0 === t && (t = {}), Object.keys(t).forEach((function(s) {
			void 0 === e[s] ? e[s] = t[s] : a(t[s]) && a(e[s]) && Object.keys(t[s]).length > 0 && i(e[s], t[s])
		}))
	}
	var s = {
		body: {},
		addEventListener: function() {},
		removeEventListener: function() {},
		activeElement: {
			blur: function() {},
			nodeName: ""
		},
		querySelector: function() {
			return null
		},
		querySelectorAll: function() {
			return []
		},
		getElementById: function() {
			return null
		},
		createEvent: function() {
			return {
				initEvent: function() {}
			}
		},
		createElement: function() {
			return {
				children: [],
				childNodes: [],
				style: {},
				setAttribute: function() {},
				getElementsByTagName: function() {
					return []
				}
			}
		},
		createElementNS: function() {
			return {}
		},
		importNode: function() {
			return null
		},
		location: {
			hash: "",
			host: "",
			hostname: "",
			href: "",
			origin: "",
			pathname: "",
			protocol: "",
			search: ""
		}
	};

	function r() {
		var e = "undefined" != typeof document ? document : {};
		return i(e, s), e
	}
	var n = {
		document: s,
		navigator: {
			userAgent: ""
		},
		location: {
			hash: "",
			host: "",
			hostname: "",
			href: "",
			origin: "",
			pathname: "",
			protocol: "",
			search: ""
		},
		history: {
			replaceState: function() {},
			pushState: function() {},
			go: function() {},
			back: function() {}
		},
		CustomEvent: function() {
			return this
		},
		addEventListener: function() {},
		removeEventListener: function() {},
		getComputedStyle: function() {
			return {
				getPropertyValue: function() {
					return ""
				}
			}
		},
		Image: function() {},
		Date: function() {},
		screen: {},
		setTimeout: function() {},
		clearTimeout: function() {},
		matchMedia: function() {
			return {}
		},
		requestAnimationFrame: function(e) {
			return "undefined" == typeof setTimeout ? (e(), null) : setTimeout(e, 0)
		},
		cancelAnimationFrame: function(e) {
			"undefined" != typeof setTimeout && clearTimeout(e)
		}
	};

	function l() {
		var e = "undefined" != typeof window ? window : {};
		return i(e, n), e
	}

	function o(e) {
		return (o = Object.setPrototypeOf ? Object.getPrototypeOf : function(e) {
			return e.__proto__ || Object.getPrototypeOf(e)
		})(e)
	}

	function d(e, t) {
		return (d = Object.setPrototypeOf || function(e, t) {
			return e.__proto__ = t, e
		})(e, t)
	}

	function p() {
		if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
		if (Reflect.construct.sham) return !1;
		if ("function" == typeof Proxy) return !0;
		try {
			return Date.prototype.toString.call(Reflect.construct(Date, [], (function() {}))), !0
		} catch (e) {
			return !1
		}
	}

	function u(e, t, a) {
		return (u = p() ? Reflect.construct : function(e, t, a) {
			var i = [null];
			i.push.apply(i, t);
			var s = new(Function.bind.apply(e, i));
			return a && d(s, a.prototype), s
		}).apply(null, arguments)
	}

	function c(e) {
		var t = "function" == typeof Map ? new Map : void 0;
		return (c = function(e) {
			if (null === e || (a = e, -1 === Function.toString.call(a).indexOf("[native code]"))) return e;
			var a;
			if ("function" != typeof e) throw new TypeError("Super expression must either be null or a function");
			if (void 0 !== t) {
				if (t.has(e)) return t.get(e);
				t.set(e, i)
			}

			function i() {
				return u(e, arguments, o(this).constructor)
			}
			return i.prototype = Object.create(e.prototype, {
				constructor: {
					value: i,
					enumerable: !1,
					writable: !0,
					configurable: !0
				}
			}), d(i, e)
		})(e)
	}
	var h = function(e) {
		var t, a;

		function i(t) {
			var a, i, s;
			return a = e.call.apply(e, [this].concat(t)) || this, i = function(e) {
				if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
				return e
			}(a), s = i.__proto__, Object.defineProperty(i, "__proto__", {
				get: function() {
					return s
				},
				set: function(e) {
					s.__proto__ = e
				}
			}), a
		}
		return a = e, (t = i).prototype = Object.create(a.prototype), t.prototype.constructor = t, t.__proto__ = a, i
	}(c(Array));

	function v(e) {
		void 0 === e && (e = []);
		var t = [];
		return e.forEach((function(e) {
			Array.isArray(e) ? t.push.apply(t, v(e)) : t.push(e)
		})), t
	}

	function f(e, t) {
		return Array.prototype.filter.call(e, t)
	}

	function m(e, t) {
		var a = l(),
			i = r(),
			s = [];
		if (!t && e instanceof h) return e;
		if (!e) return new h(s);
		if ("string" == typeof e) {
			var n = e.trim();
			if (n.indexOf("<") >= 0 && n.indexOf(">") >= 0) {
				var o = "div";
				0 === n.indexOf("<li") && (o = "ul"), 0 === n.indexOf("<tr") && (o = "tbody"), 0 !== n.indexOf("<td") && 0 !== n.indexOf("<th") || (o = "tr"), 0 === n.indexOf("<tbody") && (o = "table"), 0 === n.indexOf("<option") && (o = "select");
				var d = i.createElement(o);
				d.innerHTML = n;
				for (var p = 0; p < d.childNodes.length; p += 1) s.push(d.childNodes[p])
			} else s = function(e, t) {
				if ("string" != typeof e) return [e];
				for (var a = [], i = t.querySelectorAll(e), s = 0; s < i.length; s += 1) a.push(i[s]);
				return a
			}(e.trim(), t || i)
		} else if (e.nodeType || e === a || e === i) s.push(e);
		else if (Array.isArray(e)) {
			if (e instanceof h) return e;
			s = e
		}
		return new h(function(e) {
			for (var t = [], a = 0; a < e.length; a += 1) - 1 === t.indexOf(e[a]) && t.push(e[a]);
			return t
		}(s))
	}
	m.fn = h.prototype;
	var g, y, w, b = {
		addClass: function() {
			for (var e = arguments.length, t = new Array(e), a = 0; a < e; a++) t[a] = arguments[a];
			var i = v(t.map((function(e) {
				return e.split(" ")
			})));
			return this.forEach((function(e) {
				var t;
				(t = e.classList).add.apply(t, i)
			})), this
		},
		removeClass: function() {
			for (var e = arguments.length, t = new Array(e), a = 0; a < e; a++) t[a] = arguments[a];
			var i = v(t.map((function(e) {
				return e.split(" ")
			})));
			return this.forEach((function(e) {
				var t;
				(t = e.classList).remove.apply(t, i)
			})), this
		},
		hasClass: function() {
			for (var e = arguments.length, t = new Array(e), a = 0; a < e; a++) t[a] = arguments[a];
			var i = v(t.map((function(e) {
				return e.split(" ")
			})));
			return f(this, (function(e) {
				return i.filter((function(t) {
					return e.classList.contains(t)
				})).length > 0
			})).length > 0
		},
		toggleClass: function() {
			for (var e = arguments.length, t = new Array(e), a = 0; a < e; a++) t[a] = arguments[a];
			var i = v(t.map((function(e) {
				return e.split(" ")
			})));
			this.forEach((function(e) {
				i.forEach((function(t) {
					e.classList.toggle(t)
				}))
			}))
		},
		attr: function(e, t) {
			if (1 === arguments.length && "string" == typeof e) return this[0] ? this[0].getAttribute(e) : void 0;
			for (var a = 0; a < this.length; a += 1)
				if (2 === arguments.length) this[a].setAttribute(e, t);
				else
					for (var i in e) this[a][i] = e[i], this[a].setAttribute(i, e[i]);
			return this
		},
		removeAttr: function(e) {
			for (var t = 0; t < this.length; t += 1) this[t].removeAttribute(e);
			return this
		},
		transform: function(e) {
			for (var t = 0; t < this.length; t += 1) this[t].style.transform = e;
			return this
		},
		transition: function(e) {
			for (var t = 0; t < this.length; t += 1) this[t].style.transitionDuration = "string" != typeof e ? e + "ms" : e;
			return this
		},
		on: function() {
			for (var e = arguments.length, t = new Array(e), a = 0; a < e; a++) t[a] = arguments[a];
			var i = t[0],
				s = t[1],
				r = t[2],
				n = t[3];

			function l(e) {
				var t = e.target;
				if (t) {
					var a = e.target.dom7EventData || [];
					if (a.indexOf(e) < 0 && a.unshift(e), m(t).is(s)) r.apply(t, a);
					else
						for (var i = m(t).parents(), n = 0; n < i.length; n += 1) m(i[n]).is(s) && r.apply(i[n], a)
				}
			}

			function o(e) {
				var t = e && e.target && e.target.dom7EventData || [];
				t.indexOf(e) < 0 && t.unshift(e), r.apply(this, t)
			}
			"function" == typeof t[1] && (i = t[0], r = t[1], n = t[2], s = void 0), n || (n = !1);
			for (var d, p = i.split(" "), u = 0; u < this.length; u += 1) {
				var c = this[u];
				if (s)
					for (d = 0; d < p.length; d += 1) {
						var h = p[d];
						c.dom7LiveListeners || (c.dom7LiveListeners = {}), c.dom7LiveListeners[h] || (c.dom7LiveListeners[h] = []), c.dom7LiveListeners[h].push({
							listener: r,
							proxyListener: l
						}), c.addEventListener(h, l, n)
					} else
						for (d = 0; d < p.length; d += 1) {
							var v = p[d];
							c.dom7Listeners || (c.dom7Listeners = {}), c.dom7Listeners[v] || (c.dom7Listeners[v] = []), c.dom7Listeners[v].push({
								listener: r,
								proxyListener: o
							}), c.addEventListener(v, o, n)
						}
			}
			return this
		},
		off: function() {
			for (var e = arguments.length, t = new Array(e), a = 0; a < e; a++) t[a] = arguments[a];
			var i = t[0],
				s = t[1],
				r = t[2],
				n = t[3];
			"function" == typeof t[1] && (i = t[0], r = t[1], n = t[2], s = void 0), n || (n = !1);
			for (var l = i.split(" "), o = 0; o < l.length; o += 1)
				for (var d = l[o], p = 0; p < this.length; p += 1) {
					var u = this[p],
						c = void 0;
					if (!s && u.dom7Listeners ? c = u.dom7Listeners[d] : s && u.dom7LiveListeners && (c = u.dom7LiveListeners[d]), c && c.length)
						for (var h = c.length - 1; h >= 0; h -= 1) {
							var v = c[h];
							r && v.listener === r || r && v.listener && v.listener.dom7proxy && v.listener.dom7proxy === r ? (u.removeEventListener(d, v.proxyListener, n), c.splice(h, 1)) : r || (u.removeEventListener(d, v.proxyListener, n), c.splice(h, 1))
						}
				}
			return this
		},
		trigger: function() {
			for (var e = l(), t = arguments.length, a = new Array(t), i = 0; i < t; i++) a[i] = arguments[i];
			for (var s = a[0].split(" "), r = a[1], n = 0; n < s.length; n += 1)
				for (var o = s[n], d = 0; d < this.length; d += 1) {
					var p = this[d];
					if (e.CustomEvent) {
						var u = new e.CustomEvent(o, {
							detail: r,
							bubbles: !0,
							cancelable: !0
						});
						p.dom7EventData = a.filter((function(e, t) {
							return t > 0
						})), p.dispatchEvent(u), p.dom7EventData = [], delete p.dom7EventData
					}
				}
			return this
		},
		transitionEnd: function(e) {
			var t = this;
			return e && t.on("transitionend", (function a(i) {
				i.target === this && (e.call(this, i), t.off("transitionend", a))
			})), this
		},
		outerWidth: function(e) {
			if (this.length > 0) {
				if (e) {
					var t = this.styles();
					return this[0].offsetWidth + parseFloat(t.getPropertyValue("margin-right")) + parseFloat(t.getPropertyValue("margin-left"))
				}
				return this[0].offsetWidth
			}
			return null
		},
		outerHeight: function(e) {
			if (this.length > 0) {
				if (e) {
					var t = this.styles();
					return this[0].offsetHeight + parseFloat(t.getPropertyValue("margin-top")) + parseFloat(t.getPropertyValue("margin-bottom"))
				}
				return this[0].offsetHeight
			}
			return null
		},
		styles: function() {
			var e = l();
			return this[0] ? e.getComputedStyle(this[0], null) : {}
		},
		offset: function() {
			if (this.length > 0) {
				var e = l(),
					t = r(),
					a = this[0],
					i = a.getBoundingClientRect(),
					s = t.body,
					n = a.clientTop || s.clientTop || 0,
					o = a.clientLeft || s.clientLeft || 0,
					d = a === e ? e.scrollY : a.scrollTop,
					p = a === e ? e.scrollX : a.scrollLeft;
				return {
					top: i.top + d - n,
					left: i.left + p - o
				}
			}
			return null
		},
		css: function(e, t) {
			var a, i = l();
			if (1 === arguments.length) {
				if ("string" != typeof e) {
					for (a = 0; a < this.length; a += 1)
						for (var s in e) this[a].style[s] = e[s];
					return this
				}
				if (this[0]) return i.getComputedStyle(this[0], null).getPropertyValue(e)
			}
			if (2 === arguments.length && "string" == typeof e) {
				for (a = 0; a < this.length; a += 1) this[a].style[e] = t;
				return this
			}
			return this
		},
		each: function(e) {
			return e ? (this.forEach((function(t, a) {
				e.apply(t, [t, a])
			})), this) : this
		},
		html: function(e) {
			if (void 0 === e) return this[0] ? this[0].innerHTML : null;
			for (var t = 0; t < this.length; t += 1) this[t].innerHTML = e;
			return this
		},
		text: function(e) {
			if (void 0 === e) return this[0] ? this[0].textContent.trim() : null;
			for (var t = 0; t < this.length; t += 1) this[t].textContent = e;
			return this
		},
		is: function(e) {
			var t, a, i = l(),
				s = r(),
				n = this[0];
			if (!n || void 0 === e) return !1;
			if ("string" == typeof e) {
				if (n.matches) return n.matches(e);
				if (n.webkitMatchesSelector) return n.webkitMatchesSelector(e);
				if (n.msMatchesSelector) return n.msMatchesSelector(e);
				for (t = m(e), a = 0; a < t.length; a += 1)
					if (t[a] === n) return !0;
				return !1
			}
			if (e === s) return n === s;
			if (e === i) return n === i;
			if (e.nodeType || e instanceof h) {
				for (t = e.nodeType ? [e] : e, a = 0; a < t.length; a += 1)
					if (t[a] === n) return !0;
				return !1
			}
			return !1
		},
		index: function() {
			var e, t = this[0];
			if (t) {
				for (e = 0; null !== (t = t.previousSibling);) 1 === t.nodeType && (e += 1);
				return e
			}
		},
		eq: function(e) {
			if (void 0 === e) return this;
			var t = this.length;
			if (e > t - 1) return m([]);
			if (e < 0) {
				var a = t + e;
				return m(a < 0 ? [] : [this[a]])
			}
			return m([this[e]])
		},
		append: function() {
			for (var e, t = r(), a = 0; a < arguments.length; a += 1) {
				e = a < 0 || arguments.length <= a ? void 0 : arguments[a];
				for (var i = 0; i < this.length; i += 1)
					if ("string" == typeof e) {
						var s = t.createElement("div");
						for (s.innerHTML = e; s.firstChild;) this[i].appendChild(s.firstChild)
					} else if (e instanceof h)
					for (var n = 0; n < e.length; n += 1) this[i].appendChild(e[n]);
				else this[i].appendChild(e)
			}
			return this
		},
		prepend: function(e) {
			var t, a, i = r();
			for (t = 0; t < this.length; t += 1)
				if ("string" == typeof e) {
					var s = i.createElement("div");
					for (s.innerHTML = e, a = s.childNodes.length - 1; a >= 0; a -= 1) this[t].insertBefore(s.childNodes[a], this[t].childNodes[0])
				} else if (e instanceof h)
				for (a = 0; a < e.length; a += 1) this[t].insertBefore(e[a], this[t].childNodes[0]);
			else this[t].insertBefore(e, this[t].childNodes[0]);
			return this
		},
		next: function(e) {
			return this.length > 0 ? e ? this[0].nextElementSibling && m(this[0].nextElementSibling).is(e) ? m([this[0].nextElementSibling]) : m([]) : this[0].nextElementSibling ? m([this[0].nextElementSibling]) : m([]) : m([])
		},
		nextAll: function(e) {
			var t = [],
				a = this[0];
			if (!a) return m([]);
			for (; a.nextElementSibling;) {
				var i = a.nextElementSibling;
				e ? m(i).is(e) && t.push(i) : t.push(i), a = i
			}
			return m(t)
		},
		prev: function(e) {
			if (this.length > 0) {
				var t = this[0];
				return e ? t.previousElementSibling && m(t.previousElementSibling).is(e) ? m([t.previousElementSibling]) : m([]) : t.previousElementSibling ? m([t.previousElementSibling]) : m([])
			}
			return m([])
		},
		prevAll: function(e) {
			var t = [],
				a = this[0];
			if (!a) return m([]);
			for (; a.previousElementSibling;) {
				var i = a.previousElementSibling;
				e ? m(i).is(e) && t.push(i) : t.push(i), a = i
			}
			return m(t)
		},
		parent: function(e) {
			for (var t = [], a = 0; a < this.length; a += 1) null !== this[a].parentNode && (e ? m(this[a].parentNode).is(e) && t.push(this[a].parentNode) : t.push(this[a].parentNode));
			return m(t)
		},
		parents: function(e) {
			for (var t = [], a = 0; a < this.length; a += 1)
				for (var i = this[a].parentNode; i;) e ? m(i).is(e) && t.push(i) : t.push(i), i = i.parentNode;
			return m(t)
		},
		closest: function(e) {
			var t = this;
			return void 0 === e ? m([]) : (t.is(e) || (t = t.parents(e).eq(0)), t)
		},
		find: function(e) {
			for (var t = [], a = 0; a < this.length; a += 1)
				for (var i = this[a].querySelectorAll(e), s = 0; s < i.length; s += 1) t.push(i[s]);
			return m(t)
		},
		children: function(e) {
			for (var t = [], a = 0; a < this.length; a += 1)
				for (var i = this[a].children, s = 0; s < i.length; s += 1) e && !m(i[s]).is(e) || t.push(i[s]);
			return m(t)
		},
		filter: function(e) {
			return m(f(this, e))
		},
		remove: function() {
			for (var e = 0; e < this.length; e += 1) this[e].parentNode && this[e].parentNode.removeChild(this[e]);
			return this
		}
	};

	function E(e, t) {
		return void 0 === t && (t = 0), setTimeout(e, t)
	}

	function x() {
		return Date.now()
	}

	function T(e, t) {
		void 0 === t && (t = "x");
		var a, i, s, r = l(),
			n = r.getComputedStyle(e, null);
		return r.WebKitCSSMatrix ? ((i = n.transform || n.webkitTransform).split(",").length > 6 && (i = i.split(", ").map((function(e) {
			return e.replace(",", ".")
		})).join(", ")), s = new r.WebKitCSSMatrix("none" === i ? "" : i)) : a = (s = n.MozTransform || n.OTransform || n.MsTransform || n.msTransform || n.transform || n.getPropertyValue("transform").replace("translate(", "matrix(1, 0, 0, 1,")).toString().split(","), "x" === t && (i = r.WebKitCSSMatrix ? s.m41 : 16 === a.length ? parseFloat(a[12]) : parseFloat(a[4])), "y" === t && (i = r.WebKitCSSMatrix ? s.m42 : 16 === a.length ? parseFloat(a[13]) : parseFloat(a[5])), i || 0
	}

	function C(e) {
		return "object" == typeof e && null !== e && e.constructor && e.constructor === Object
	}

	function S() {
		for (var e = Object(arguments.length <= 0 ? void 0 : arguments[0]), t = 1; t < arguments.length; t += 1) {
			var a = t < 0 || arguments.length <= t ? void 0 : arguments[t];
			if (null != a)
				for (var i = Object.keys(Object(a)), s = 0, r = i.length; s < r; s += 1) {
					var n = i[s],
						l = Object.getOwnPropertyDescriptor(a, n);
					void 0 !== l && l.enumerable && (C(e[n]) && C(a[n]) ? S(e[n], a[n]) : !C(e[n]) && C(a[n]) ? (e[n] = {}, S(e[n], a[n])) : e[n] = a[n])
				}
		}
		return e
	}

	function M(e, t) {
		Object.keys(t).forEach((function(a) {
			C(t[a]) && Object.keys(t[a]).forEach((function(i) {
				"function" == typeof t[a][i] && (t[a][i] = t[a][i].bind(e))
			})), e[a] = t[a]
		}))
	}

	function z() {
		return g || (g = function() {
			var e = l(),
				t = r();
			return {
				touch: !!("ontouchstart" in e || e.DocumentTouch && t instanceof e.DocumentTouch),
				pointerEvents: !!e.PointerEvent && "maxTouchPoints" in e.navigator && e.navigator.maxTouchPoints >= 0,
				observer: "MutationObserver" in e || "WebkitMutationObserver" in e,
				passiveListener: function() {
					var t = !1;
					try {
						var a = Object.defineProperty({}, "passive", {
							get: function() {
								t = !0
							}
						});
						e.addEventListener("testPassiveListener", null, a)
					} catch (e) {}
					return t
				}(),
				gestures: "ongesturestart" in e
			}
		}()), g
	}

	function P(e) {
		return void 0 === e && (e = {}), y || (y = function(e) {
			var t = (void 0 === e ? {} : e).userAgent,
				a = z(),
				i = l(),
				s = i.navigator.platform,
				r = t || i.navigator.userAgent,
				n = {
					ios: !1,
					android: !1
				},
				o = i.screen.width,
				d = i.screen.height,
				p = r.match(/(Android);?[\s\/]+([\d.]+)?/),
				u = r.match(/(iPad).*OS\s([\d_]+)/),
				c = r.match(/(iPod)(.*OS\s([\d_]+))?/),
				h = !u && r.match(/(iPhone\sOS|iOS)\s([\d_]+)/),
				v = "Win32" === s,
				f = "MacIntel" === s;
			return !u && f && a.touch && ["1024x1366", "1366x1024", "834x1194", "1194x834", "834x1112", "1112x834", "768x1024", "1024x768", "820x1180", "1180x820", "810x1080", "1080x810"].indexOf(o + "x" + d) >= 0 && ((u = r.match(/(Version)\/([\d.]+)/)) || (u = [0, 1, "13_0_0"]), f = !1), p && !v && (n.os = "android", n.android = !0), (u || h || c) && (n.os = "ios", n.ios = !0), n
		}(e)), y
	}

	function k() {
		return w || (w = function() {
			var e, t = l();
			return {
				isEdge: !!t.navigator.userAgent.match(/Edge/g),
				isSafari: (e = t.navigator.userAgent.toLowerCase(), e.indexOf("safari") >= 0 && e.indexOf("chrome") < 0 && e.indexOf("android") < 0),
				isWebView: /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(t.navigator.userAgent)
			}
		}()), w
	}
	Object.keys(b).forEach((function(e) {
		m.fn[e] = b[e]
	}));
	var L = {
			name: "resize",
			create: function() {
				var e = this;
				S(e, {
					resize: {
						resizeHandler: function() {
							e && !e.destroyed && e.initialized && (e.emit("beforeResize"), e.emit("resize"))
						},
						orientationChangeHandler: function() {
							e && !e.destroyed && e.initialized && e.emit("orientationchange")
						}
					}
				})
			},
			on: {
				init: function(e) {
					var t = l();
					t.addEventListener("resize", e.resize.resizeHandler), t.addEventListener("orientationchange", e.resize.orientationChangeHandler)
				},
				destroy: function(e) {
					var t = l();
					t.removeEventListener("resize", e.resize.resizeHandler), t.removeEventListener("orientationchange", e.resize.orientationChangeHandler)
				}
			}
		},
		$ = {
			attach: function(e, t) {
				void 0 === t && (t = {});
				var a = l(),
					i = this,
					s = new(a.MutationObserver || a.WebkitMutationObserver)((function(e) {
						if (1 !== e.length) {
							var t = function() {
								i.emit("observerUpdate", e[0])
							};
							a.requestAnimationFrame ? a.requestAnimationFrame(t) : a.setTimeout(t, 0)
						} else i.emit("observerUpdate", e[0])
					}));
				s.observe(e, {
					attributes: void 0 === t.attributes || t.attributes,
					childList: void 0 === t.childList || t.childList,
					characterData: void 0 === t.characterData || t.characterData
				}), i.observer.observers.push(s)
			},
			init: function() {
				var e = this;
				if (e.support.observer && e.params.observer) {
					if (e.params.observeParents)
						for (var t = e.$el.parents(), a = 0; a < t.length; a += 1) e.observer.attach(t[a]);
					e.observer.attach(e.$el[0], {
						childList: e.params.observeSlideChildren
					}), e.observer.attach(e.$wrapperEl[0], {
						attributes: !1
					})
				}
			},
			destroy: function() {
				this.observer.observers.forEach((function(e) {
					e.disconnect()
				})), this.observer.observers = []
			}
		},
		I = {
			name: "observer",
			params: {
				observer: !1,
				observeParents: !1,
				observeSlideChildren: !1
			},
			create: function() {
				M(this, {
					observer: t({}, $, {
						observers: []
					})
				})
			},
			on: {
				init: function(e) {
					e.observer.init()
				},
				destroy: function(e) {
					e.observer.destroy()
				}
			}
		};

	function O(e) {
		var t = this,
			a = r(),
			i = l(),
			s = t.touchEventsData,
			n = t.params,
			o = t.touches;
		if (!t.animating || !n.preventInteractionOnTransition) {
			var d = e;
			d.originalEvent && (d = d.originalEvent);
			var p = m(d.target);
			if ("wrapper" !== n.touchEventsTarget || p.closest(t.wrapperEl).length)
				if (s.isTouchEvent = "touchstart" === d.type, s.isTouchEvent || !("which" in d) || 3 !== d.which)
					if (!(!s.isTouchEvent && "button" in d && d.button > 0))
						if (!s.isTouched || !s.isMoved)
							if (!!n.noSwipingClass && "" !== n.noSwipingClass && d.target && d.target.shadowRoot && e.path && e.path[0] && (p = m(e.path[0])), n.noSwiping && p.closest(n.noSwipingSelector ? n.noSwipingSelector : "." + n.noSwipingClass)[0]) t.allowClick = !0;
							else if (!n.swipeHandler || p.closest(n.swipeHandler)[0]) {
				o.currentX = "touchstart" === d.type ? d.targetTouches[0].pageX : d.pageX, o.currentY = "touchstart" === d.type ? d.targetTouches[0].pageY : d.pageY;
				var u = o.currentX,
					c = o.currentY,
					h = n.edgeSwipeDetection || n.iOSEdgeSwipeDetection,
					v = n.edgeSwipeThreshold || n.iOSEdgeSwipeThreshold;
				if (!h || !(u <= v || u >= i.innerWidth - v)) {
					if (S(s, {
							isTouched: !0,
							isMoved: !1,
							allowTouchCallbacks: !0,
							isScrolling: void 0,
							startMoving: void 0
						}), o.startX = u, o.startY = c, s.touchStartTime = x(), t.allowClick = !0, t.updateSize(), t.swipeDirection = void 0, n.threshold > 0 && (s.allowThresholdMove = !1), "touchstart" !== d.type) {
						var f = !0;
						p.is(s.formElements) && (f = !1), a.activeElement && m(a.activeElement).is(s.formElements) && a.activeElement !== p[0] && a.activeElement.blur();
						var g = f && t.allowTouchMove && n.touchStartPreventDefault;
						!n.touchStartForcePreventDefault && !g || p[0].isContentEditable || d.preventDefault()
					}
					t.emit("touchStart", d)
				}
			}
		}
	}

	function A(e) {
		var t = r(),
			a = this,
			i = a.touchEventsData,
			s = a.params,
			n = a.touches,
			l = a.rtlTranslate,
			o = e;
		if (o.originalEvent && (o = o.originalEvent), i.isTouched) {
			if (!i.isTouchEvent || "touchmove" === o.type) {
				var d = "touchmove" === o.type && o.targetTouches && (o.targetTouches[0] || o.changedTouches[0]),
					p = "touchmove" === o.type ? d.pageX : o.pageX,
					u = "touchmove" === o.type ? d.pageY : o.pageY;
				if (o.preventedByNestedSwiper) return n.startX = p, void(n.startY = u);
				if (!a.allowTouchMove) return a.allowClick = !1, void(i.isTouched && (S(n, {
					startX: p,
					startY: u,
					currentX: p,
					currentY: u
				}), i.touchStartTime = x()));
				if (i.isTouchEvent && s.touchReleaseOnEdges && !s.loop)
					if (a.isVertical()) {
						if (u < n.startY && a.translate <= a.maxTranslate() || u > n.startY && a.translate >= a.minTranslate()) return i.isTouched = !1, void(i.isMoved = !1)
					} else if (p < n.startX && a.translate <= a.maxTranslate() || p > n.startX && a.translate >= a.minTranslate()) return;
				if (i.isTouchEvent && t.activeElement && o.target === t.activeElement && m(o.target).is(i.formElements)) return i.isMoved = !0, void(a.allowClick = !1);
				if (i.allowTouchCallbacks && a.emit("touchMove", o), !(o.targetTouches && o.targetTouches.length > 1)) {
					n.currentX = p, n.currentY = u;
					var c = n.currentX - n.startX,
						h = n.currentY - n.startY;
					if (!(a.params.threshold && Math.sqrt(Math.pow(c, 2) + Math.pow(h, 2)) < a.params.threshold)) {
						var v;
						if (void 0 === i.isScrolling) a.isHorizontal() && n.currentY === n.startY || a.isVertical() && n.currentX === n.startX ? i.isScrolling = !1 : c * c + h * h >= 25 && (v = 180 * Math.atan2(Math.abs(h), Math.abs(c)) / Math.PI, i.isScrolling = a.isHorizontal() ? v > s.touchAngle : 90 - v > s.touchAngle);
						if (i.isScrolling && a.emit("touchMoveOpposite", o), void 0 === i.startMoving && (n.currentX === n.startX && n.currentY === n.startY || (i.startMoving = !0)), i.isScrolling) i.isTouched = !1;
						else if (i.startMoving) {
							a.allowClick = !1, !s.cssMode && o.cancelable && o.preventDefault(), s.touchMoveStopPropagation && !s.nested && o.stopPropagation(), i.isMoved || (s.loop && a.loopFix(), i.startTranslate = a.getTranslate(), a.setTransition(0), a.animating && a.$wrapperEl.trigger("webkitTransitionEnd transitionend"), i.allowMomentumBounce = !1, !s.grabCursor || !0 !== a.allowSlideNext && !0 !== a.allowSlidePrev || a.setGrabCursor(!0), a.emit("sliderFirstMove", o)), a.emit("sliderMove", o), i.isMoved = !0;
							var f = a.isHorizontal() ? c : h;
							n.diff = f, f *= s.touchRatio, l && (f = -f), a.swipeDirection = f > 0 ? "prev" : "next", i.currentTranslate = f + i.startTranslate;
							var g = !0,
								y = s.resistanceRatio;
							if (s.touchReleaseOnEdges && (y = 0), f > 0 && i.currentTranslate > a.minTranslate() ? (g = !1, s.resistance && (i.currentTranslate = a.minTranslate() - 1 + Math.pow(-a.minTranslate() + i.startTranslate + f, y))) : f < 0 && i.currentTranslate < a.maxTranslate() && (g = !1, s.resistance && (i.currentTranslate = a.maxTranslate() + 1 - Math.pow(a.maxTranslate() - i.startTranslate - f, y))), g && (o.preventedByNestedSwiper = !0), !a.allowSlideNext && "next" === a.swipeDirection && i.currentTranslate < i.startTranslate && (i.currentTranslate = i.startTranslate), !a.allowSlidePrev && "prev" === a.swipeDirection && i.currentTranslate > i.startTranslate && (i.currentTranslate = i.startTranslate), s.threshold > 0) {
								if (!(Math.abs(f) > s.threshold || i.allowThresholdMove)) return void(i.currentTranslate = i.startTranslate);
								if (!i.allowThresholdMove) return i.allowThresholdMove = !0, n.startX = n.currentX, n.startY = n.currentY, i.currentTranslate = i.startTranslate, void(n.diff = a.isHorizontal() ? n.currentX - n.startX : n.currentY - n.startY)
							}
							s.followFinger && !s.cssMode && ((s.freeMode || s.watchSlidesProgress || s.watchSlidesVisibility) && (a.updateActiveIndex(), a.updateSlidesClasses()), s.freeMode && (0 === i.velocities.length && i.velocities.push({
								position: n[a.isHorizontal() ? "startX" : "startY"],
								time: i.touchStartTime
							}), i.velocities.push({
								position: n[a.isHorizontal() ? "currentX" : "currentY"],
								time: x()
							})), a.updateProgress(i.currentTranslate), a.setTranslate(i.currentTranslate))
						}
					}
				}
			}
		} else i.startMoving && i.isScrolling && a.emit("touchMoveOpposite", o)
	}

	function D(e) {
		var t = this,
			a = t.touchEventsData,
			i = t.params,
			s = t.touches,
			r = t.rtlTranslate,
			n = t.$wrapperEl,
			l = t.slidesGrid,
			o = t.snapGrid,
			d = e;
		if (d.originalEvent && (d = d.originalEvent), a.allowTouchCallbacks && t.emit("touchEnd", d), a.allowTouchCallbacks = !1, !a.isTouched) return a.isMoved && i.grabCursor && t.setGrabCursor(!1), a.isMoved = !1, void(a.startMoving = !1);
		i.grabCursor && a.isMoved && a.isTouched && (!0 === t.allowSlideNext || !0 === t.allowSlidePrev) && t.setGrabCursor(!1);
		var p, u = x(),
			c = u - a.touchStartTime;
		if (t.allowClick && (t.updateClickedSlide(d), t.emit("tap click", d), c < 300 && u - a.lastClickTime < 300 && t.emit("doubleTap doubleClick", d)), a.lastClickTime = x(), E((function() {
				t.destroyed || (t.allowClick = !0)
			})), !a.isTouched || !a.isMoved || !t.swipeDirection || 0 === s.diff || a.currentTranslate === a.startTranslate) return a.isTouched = !1, a.isMoved = !1, void(a.startMoving = !1);
		if (a.isTouched = !1, a.isMoved = !1, a.startMoving = !1, p = i.followFinger ? r ? t.translate : -t.translate : -a.currentTranslate, !i.cssMode)
			if (i.freeMode) {
				if (p < -t.minTranslate()) return void t.slideTo(t.activeIndex);
				if (p > -t.maxTranslate()) return void(t.slides.length < o.length ? t.slideTo(o.length - 1) : t.slideTo(t.slides.length - 1));
				if (i.freeModeMomentum) {
					if (a.velocities.length > 1) {
						var h = a.velocities.pop(),
							v = a.velocities.pop(),
							f = h.position - v.position,
							m = h.time - v.time;
						t.velocity = f / m, t.velocity /= 2, Math.abs(t.velocity) < i.freeModeMinimumVelocity && (t.velocity = 0), (m > 150 || x() - h.time > 300) && (t.velocity = 0)
					} else t.velocity = 0;
					t.velocity *= i.freeModeMomentumVelocityRatio, a.velocities.length = 0;
					var g = 1e3 * i.freeModeMomentumRatio,
						y = t.velocity * g,
						w = t.translate + y;
					r && (w = -w);
					var b, T, C = !1,
						S = 20 * Math.abs(t.velocity) * i.freeModeMomentumBounceRatio;
					if (w < t.maxTranslate()) i.freeModeMomentumBounce ? (w + t.maxTranslate() < -S && (w = t.maxTranslate() - S), b = t.maxTranslate(), C = !0, a.allowMomentumBounce = !0) : w = t.maxTranslate(), i.loop && i.centeredSlides && (T = !0);
					else if (w > t.minTranslate()) i.freeModeMomentumBounce ? (w - t.minTranslate() > S && (w = t.minTranslate() + S), b = t.minTranslate(), C = !0, a.allowMomentumBounce = !0) : w = t.minTranslate(), i.loop && i.centeredSlides && (T = !0);
					else if (i.freeModeSticky) {
						for (var M, z = 0; z < o.length; z += 1)
							if (o[z] > -w) {
								M = z;
								break
							} w = -(w = Math.abs(o[M] - w) < Math.abs(o[M - 1] - w) || "next" === t.swipeDirection ? o[M] : o[M - 1])
					}
					if (T && t.once("transitionEnd", (function() {
							t.loopFix()
						})), 0 !== t.velocity) {
						if (g = r ? Math.abs((-w - t.translate) / t.velocity) : Math.abs((w - t.translate) / t.velocity), i.freeModeSticky) {
							var P = Math.abs((r ? -w : w) - t.translate),
								k = t.slidesSizesGrid[t.activeIndex];
							g = P < k ? i.speed : P < 2 * k ? 1.5 * i.speed : 2.5 * i.speed
						}
					} else if (i.freeModeSticky) return void t.slideToClosest();
					i.freeModeMomentumBounce && C ? (t.updateProgress(b), t.setTransition(g), t.setTranslate(w), t.transitionStart(!0, t.swipeDirection), t.animating = !0, n.transitionEnd((function() {
						t && !t.destroyed && a.allowMomentumBounce && (t.emit("momentumBounce"), t.setTransition(i.speed), setTimeout((function() {
							t.setTranslate(b), n.transitionEnd((function() {
								t && !t.destroyed && t.transitionEnd()
							}))
						}), 0))
					}))) : t.velocity ? (t.updateProgress(w), t.setTransition(g), t.setTranslate(w), t.transitionStart(!0, t.swipeDirection), t.animating || (t.animating = !0, n.transitionEnd((function() {
						t && !t.destroyed && t.transitionEnd()
					})))) : t.updateProgress(w), t.updateActiveIndex(), t.updateSlidesClasses()
				} else if (i.freeModeSticky) return void t.slideToClosest();
				(!i.freeModeMomentum || c >= i.longSwipesMs) && (t.updateProgress(), t.updateActiveIndex(), t.updateSlidesClasses())
			} else {
				for (var L = 0, $ = t.slidesSizesGrid[0], I = 0; I < l.length; I += I < i.slidesPerGroupSkip ? 1 : i.slidesPerGroup) {
					var O = I < i.slidesPerGroupSkip - 1 ? 1 : i.slidesPerGroup;
					void 0 !== l[I + O] ? p >= l[I] && p < l[I + O] && (L = I, $ = l[I + O] - l[I]) : p >= l[I] && (L = I, $ = l[l.length - 1] - l[l.length - 2])
				}
				var A = (p - l[L]) / $,
					D = L < i.slidesPerGroupSkip - 1 ? 1 : i.slidesPerGroup;
				if (c > i.longSwipesMs) {
					if (!i.longSwipes) return void t.slideTo(t.activeIndex);
					"next" === t.swipeDirection && (A >= i.longSwipesRatio ? t.slideTo(L + D) : t.slideTo(L)), "prev" === t.swipeDirection && (A > 1 - i.longSwipesRatio ? t.slideTo(L + D) : t.slideTo(L))
				} else {
					if (!i.shortSwipes) return void t.slideTo(t.activeIndex);
					t.navigation && (d.target === t.navigation.nextEl || d.target === t.navigation.prevEl) ? d.target === t.navigation.nextEl ? t.slideTo(L + D) : t.slideTo(L) : ("next" === t.swipeDirection && t.slideTo(L + D), "prev" === t.swipeDirection && t.slideTo(L))
				}
			}
	}

	function G() {
		var e = this,
			t = e.params,
			a = e.el;
		if (!a || 0 !== a.offsetWidth) {
			t.breakpoints && e.setBreakpoint();
			var i = e.allowSlideNext,
				s = e.allowSlidePrev,
				r = e.snapGrid;
			e.allowSlideNext = !0, e.allowSlidePrev = !0, e.updateSize(), e.updateSlides(), e.updateSlidesClasses(), ("auto" === t.slidesPerView || t.slidesPerView > 1) && e.isEnd && !e.isBeginning && !e.params.centeredSlides ? e.slideTo(e.slides.length - 1, 0, !1, !0) : e.slideTo(e.activeIndex, 0, !1, !0), e.autoplay && e.autoplay.running && e.autoplay.paused && e.autoplay.run(), e.allowSlidePrev = s, e.allowSlideNext = i, e.params.watchOverflow && r !== e.snapGrid && e.checkOverflow()
		}
	}

	function N(e) {
		var t = this;
		t.allowClick || (t.params.preventClicks && e.preventDefault(), t.params.preventClicksPropagation && t.animating && (e.stopPropagation(), e.stopImmediatePropagation()))
	}

	function B() {
		var e = this,
			t = e.wrapperEl,
			a = e.rtlTranslate;
		e.previousTranslate = e.translate, e.isHorizontal() ? e.translate = a ? t.scrollWidth - t.offsetWidth - t.scrollLeft : -t.scrollLeft : e.translate = -t.scrollTop, -0 === e.translate && (e.translate = 0), e.updateActiveIndex(), e.updateSlidesClasses();
		var i = e.maxTranslate() - e.minTranslate();
		(0 === i ? 0 : (e.translate - e.minTranslate()) / i) !== e.progress && e.updateProgress(a ? -e.translate : e.translate), e.emit("setTranslate", e.translate, !1)
	}
	var H = !1;

	function X() {}
	var Y = {
			init: !0,
			direction: "horizontal",
			touchEventsTarget: "container",
			initialSlide: 0,
			speed: 300,
			cssMode: !1,
			updateOnWindowResize: !0,
			nested: !1,
			width: null,
			height: null,
			preventInteractionOnTransition: !1,
			userAgent: null,
			url: null,
			edgeSwipeDetection: !1,
			edgeSwipeThreshold: 20,
			freeMode: !1,
			freeModeMomentum: !0,
			freeModeMomentumRatio: 1,
			freeModeMomentumBounce: !0,
			freeModeMomentumBounceRatio: 1,
			freeModeMomentumVelocityRatio: 1,
			freeModeSticky: !1,
			freeModeMinimumVelocity: .02,
			autoHeight: !1,
			setWrapperSize: !1,
			virtualTranslate: !1,
			effect: "slide",
			breakpoints: void 0,
			spaceBetween: 0,
			slidesPerView: 1,
			slidesPerColumn: 1,
			slidesPerColumnFill: "column",
			slidesPerGroup: 1,
			slidesPerGroupSkip: 0,
			centeredSlides: !1,
			centeredSlidesBounds: !1,
			slidesOffsetBefore: 0,
			slidesOffsetAfter: 0,
			normalizeSlideIndex: !0,
			centerInsufficientSlides: !1,
			watchOverflow: !1,
			roundLengths: !1,
			touchRatio: 1,
			touchAngle: 45,
			simulateTouch: !0,
			shortSwipes: !0,
			longSwipes: !0,
			longSwipesRatio: .5,
			longSwipesMs: 300,
			followFinger: !0,
			allowTouchMove: !0,
			threshold: 0,
			touchMoveStopPropagation: !1,
			touchStartPreventDefault: !0,
			touchStartForcePreventDefault: !1,
			touchReleaseOnEdges: !1,
			uniqueNavElements: !0,
			resistance: !0,
			resistanceRatio: .85,
			watchSlidesProgress: !1,
			watchSlidesVisibility: !1,
			grabCursor: !1,
			preventClicks: !0,
			preventClicksPropagation: !0,
			slideToClickedSlide: !1,
			preloadImages: !0,
			updateOnImagesReady: !0,
			loop: !1,
			loopAdditionalSlides: 0,
			loopedSlides: null,
			loopFillGroupWithBlank: !1,
			loopPreventsSlide: !0,
			allowSlidePrev: !0,
			allowSlideNext: !0,
			swipeHandler: null,
			noSwiping: !0,
			noSwipingClass: "swiper-no-swiping",
			noSwipingSelector: null,
			passiveListeners: !0,
			containerModifierClass: "swiper-container-",
			slideClass: "swiper-slide",
			slideBlankClass: "swiper-slide-invisible-blank",
			slideActiveClass: "swiper-slide-active",
			slideDuplicateActiveClass: "swiper-slide-duplicate-active",
			slideVisibleClass: "swiper-slide-visible",
			slideDuplicateClass: "swiper-slide-duplicate",
			slideNextClass: "swiper-slide-next",
			slideDuplicateNextClass: "swiper-slide-duplicate-next",
			slidePrevClass: "swiper-slide-prev",
			slideDuplicatePrevClass: "swiper-slide-duplicate-prev",
			wrapperClass: "swiper-wrapper",
			runCallbacksOnInit: !0,
			_emitClasses: !1
		},
		V = {
			modular: {
				useParams: function(e) {
					var t = this;
					t.modules && Object.keys(t.modules).forEach((function(a) {
						var i = t.modules[a];
						i.params && S(e, i.params)
					}))
				},
				useModules: function(e) {
					void 0 === e && (e = {});
					var t = this;
					t.modules && Object.keys(t.modules).forEach((function(a) {
						var i = t.modules[a],
							s = e[a] || {};
						i.on && t.on && Object.keys(i.on).forEach((function(e) {
							t.on(e, i.on[e])
						})), i.create && i.create.bind(t)(s)
					}))
				}
			},
			eventsEmitter: {
				on: function(e, t, a) {
					var i = this;
					if ("function" != typeof t) return i;
					var s = a ? "unshift" : "push";
					return e.split(" ").forEach((function(e) {
						i.eventsListeners[e] || (i.eventsListeners[e] = []), i.eventsListeners[e][s](t)
					})), i
				},
				once: function(e, t, a) {
					var i = this;
					if ("function" != typeof t) return i;

					function s() {
						i.off(e, s), s.__emitterProxy && delete s.__emitterProxy;
						for (var a = arguments.length, r = new Array(a), n = 0; n < a; n++) r[n] = arguments[n];
						t.apply(i, r)
					}
					return s.__emitterProxy = t, i.on(e, s, a)
				},
				onAny: function(e, t) {
					var a = this;
					if ("function" != typeof e) return a;
					var i = t ? "unshift" : "push";
					return a.eventsAnyListeners.indexOf(e) < 0 && a.eventsAnyListeners[i](e), a
				},
				offAny: function(e) {
					var t = this;
					if (!t.eventsAnyListeners) return t;
					var a = t.eventsAnyListeners.indexOf(e);
					return a >= 0 && t.eventsAnyListeners.splice(a, 1), t
				},
				off: function(e, t) {
					var a = this;
					return a.eventsListeners ? (e.split(" ").forEach((function(e) {
						void 0 === t ? a.eventsListeners[e] = [] : a.eventsListeners[e] && a.eventsListeners[e].forEach((function(i, s) {
							(i === t || i.__emitterProxy && i.__emitterProxy === t) && a.eventsListeners[e].splice(s, 1)
						}))
					})), a) : a
				},
				emit: function() {
					var e, t, a, i = this;
					if (!i.eventsListeners) return i;
					for (var s = arguments.length, r = new Array(s), n = 0; n < s; n++) r[n] = arguments[n];
					"string" == typeof r[0] || Array.isArray(r[0]) ? (e = r[0], t = r.slice(1, r.length), a = i) : (e = r[0].events, t = r[0].data, a = r[0].context || i), t.unshift(a);
					var l = Array.isArray(e) ? e : e.split(" ");
					return l.forEach((function(e) {
						i.eventsAnyListeners && i.eventsAnyListeners.length && i.eventsAnyListeners.forEach((function(i) {
							i.apply(a, [e].concat(t))
						})), i.eventsListeners && i.eventsListeners[e] && i.eventsListeners[e].forEach((function(e) {
							e.apply(a, t)
						}))
					})), i
				}
			},
			update: {
				updateSize: function() {
					var e, t, a = this,
						i = a.$el;
					e = void 0 !== a.params.width && null !== a.params.width ? a.params.width : i[0].clientWidth, t = void 0 !== a.params.height && null !== a.params.height ? a.params.height : i[0].clientHeight, 0 === e && a.isHorizontal() || 0 === t && a.isVertical() || (e = e - parseInt(i.css("padding-left") || 0, 10) - parseInt(i.css("padding-right") || 0, 10), t = t - parseInt(i.css("padding-top") || 0, 10) - parseInt(i.css("padding-bottom") || 0, 10), Number.isNaN(e) && (e = 0), Number.isNaN(t) && (t = 0), S(a, {
						width: e,
						height: t,
						size: a.isHorizontal() ? e : t
					}))
				},
				updateSlides: function() {
					var e = this,
						t = l(),
						a = e.params,
						i = e.$wrapperEl,
						s = e.size,
						r = e.rtlTranslate,
						n = e.wrongRTL,
						o = e.virtual && a.virtual.enabled,
						d = o ? e.virtual.slides.length : e.slides.length,
						p = i.children("." + e.params.slideClass),
						u = o ? e.virtual.slides.length : p.length,
						c = [],
						h = [],
						v = [];

					function f(e, t) {
						return !a.cssMode || t !== p.length - 1
					}
					var m = a.slidesOffsetBefore;
					"function" == typeof m && (m = a.slidesOffsetBefore.call(e));
					var g = a.slidesOffsetAfter;
					"function" == typeof g && (g = a.slidesOffsetAfter.call(e));
					var y = e.snapGrid.length,
						w = e.slidesGrid.length,
						b = a.spaceBetween,
						E = -m,
						x = 0,
						T = 0;
					if (void 0 !== s) {
						var C, M;
						"string" == typeof b && b.indexOf("%") >= 0 && (b = parseFloat(b.replace("%", "")) / 100 * s), e.virtualSize = -b, r ? p.css({
							marginLeft: "",
							marginTop: ""
						}) : p.css({
							marginRight: "",
							marginBottom: ""
						}), a.slidesPerColumn > 1 && (C = Math.floor(u / a.slidesPerColumn) === u / e.params.slidesPerColumn ? u : Math.ceil(u / a.slidesPerColumn) * a.slidesPerColumn, "auto" !== a.slidesPerView && "row" === a.slidesPerColumnFill && (C = Math.max(C, a.slidesPerView * a.slidesPerColumn)));
						for (var z, P = a.slidesPerColumn, k = C / P, L = Math.floor(u / a.slidesPerColumn), $ = 0; $ < u; $ += 1) {
							M = 0;
							var I = p.eq($);
							if (a.slidesPerColumn > 1) {
								var O = void 0,
									A = void 0,
									D = void 0;
								if ("row" === a.slidesPerColumnFill && a.slidesPerGroup > 1) {
									var G = Math.floor($ / (a.slidesPerGroup * a.slidesPerColumn)),
										N = $ - a.slidesPerColumn * a.slidesPerGroup * G,
										B = 0 === G ? a.slidesPerGroup : Math.min(Math.ceil((u - G * P * a.slidesPerGroup) / P), a.slidesPerGroup);
									O = (A = N - (D = Math.floor(N / B)) * B + G * a.slidesPerGroup) + D * C / P, I.css({
										"-webkit-box-ordinal-group": O,
										"-moz-box-ordinal-group": O,
										"-ms-flex-order": O,
										"-webkit-order": O,
										order: O
									})
								} else "column" === a.slidesPerColumnFill ? (D = $ - (A = Math.floor($ / P)) * P, (A > L || A === L && D === P - 1) && (D += 1) >= P && (D = 0, A += 1)) : A = $ - (D = Math.floor($ / k)) * k;
								I.css("margin-" + (e.isHorizontal() ? "top" : "left"), 0 !== D && a.spaceBetween && a.spaceBetween + "px")
							}
							if ("none" !== I.css("display")) {
								if ("auto" === a.slidesPerView) {
									var H = t.getComputedStyle(I[0], null),
										X = I[0].style.transform,
										Y = I[0].style.webkitTransform;
									if (X && (I[0].style.transform = "none"), Y && (I[0].style.webkitTransform = "none"), a.roundLengths) M = e.isHorizontal() ? I.outerWidth(!0) : I.outerHeight(!0);
									else if (e.isHorizontal()) {
										var V = parseFloat(H.getPropertyValue("width") || 0),
											F = parseFloat(H.getPropertyValue("padding-left") || 0),
											R = parseFloat(H.getPropertyValue("padding-right") || 0),
											W = parseFloat(H.getPropertyValue("margin-left") || 0),
											q = parseFloat(H.getPropertyValue("margin-right") || 0),
											j = H.getPropertyValue("box-sizing");
										if (j && "border-box" === j) M = V + W + q;
										else {
											var _ = I[0],
												U = _.clientWidth;
											M = V + F + R + W + q + (_.offsetWidth - U)
										}
									} else {
										var K = parseFloat(H.getPropertyValue("height") || 0),
											Z = parseFloat(H.getPropertyValue("padding-top") || 0),
											J = parseFloat(H.getPropertyValue("padding-bottom") || 0),
											Q = parseFloat(H.getPropertyValue("margin-top") || 0),
											ee = parseFloat(H.getPropertyValue("margin-bottom") || 0),
											te = H.getPropertyValue("box-sizing");
										if (te && "border-box" === te) M = K + Q + ee;
										else {
											var ae = I[0],
												ie = ae.clientHeight;
											M = K + Z + J + Q + ee + (ae.offsetHeight - ie)
										}
									}
									X && (I[0].style.transform = X), Y && (I[0].style.webkitTransform = Y), a.roundLengths && (M = Math.floor(M))
								} else M = (s - (a.slidesPerView - 1) * b) / a.slidesPerView, a.roundLengths && (M = Math.floor(M)), p[$] && (e.isHorizontal() ? p[$].style.width = M + "px" : p[$].style.height = M + "px");
								p[$] && (p[$].swiperSlideSize = M), v.push(M), a.centeredSlides ? (E = E + M / 2 + x / 2 + b, 0 === x && 0 !== $ && (E = E - s / 2 - b), 0 === $ && (E = E - s / 2 - b), Math.abs(E) < .001 && (E = 0), a.roundLengths && (E = Math.floor(E)), T % a.slidesPerGroup == 0 && c.push(E), h.push(E)) : (a.roundLengths && (E = Math.floor(E)), (T - Math.min(e.params.slidesPerGroupSkip, T)) % e.params.slidesPerGroup == 0 && c.push(E), h.push(E), E = E + M + b), e.virtualSize += M + b, x = M, T += 1
							}
						}
						if (e.virtualSize = Math.max(e.virtualSize, s) + g, r && n && ("slide" === a.effect || "coverflow" === a.effect) && i.css({
								width: e.virtualSize + a.spaceBetween + "px"
							}), a.setWrapperSize && (e.isHorizontal() ? i.css({
								width: e.virtualSize + a.spaceBetween + "px"
							}) : i.css({
								height: e.virtualSize + a.spaceBetween + "px"
							})), a.slidesPerColumn > 1 && (e.virtualSize = (M + a.spaceBetween) * C, e.virtualSize = Math.ceil(e.virtualSize / a.slidesPerColumn) - a.spaceBetween, e.isHorizontal() ? i.css({
								width: e.virtualSize + a.spaceBetween + "px"
							}) : i.css({
								height: e.virtualSize + a.spaceBetween + "px"
							}), a.centeredSlides)) {
							z = [];
							for (var se = 0; se < c.length; se += 1) {
								var re = c[se];
								a.roundLengths && (re = Math.floor(re)), c[se] < e.virtualSize + c[0] && z.push(re)
							}
							c = z
						}
						if (!a.centeredSlides) {
							z = [];
							for (var ne = 0; ne < c.length; ne += 1) {
								var le = c[ne];
								a.roundLengths && (le = Math.floor(le)), c[ne] <= e.virtualSize - s && z.push(le)
							}
							c = z, Math.floor(e.virtualSize - s) - Math.floor(c[c.length - 1]) > 1 && c.push(e.virtualSize - s)
						}
						if (0 === c.length && (c = [0]), 0 !== a.spaceBetween && (e.isHorizontal() ? r ? p.filter(f).css({
								marginLeft: b + "px"
							}) : p.filter(f).css({
								marginRight: b + "px"
							}) : p.filter(f).css({
								marginBottom: b + "px"
							})), a.centeredSlides && a.centeredSlidesBounds) {
							var oe = 0;
							v.forEach((function(e) {
								oe += e + (a.spaceBetween ? a.spaceBetween : 0)
							}));
							var de = (oe -= a.spaceBetween) - s;
							c = c.map((function(e) {
								return e < 0 ? -m : e > de ? de + g : e
							}))
						}
						if (a.centerInsufficientSlides) {
							var pe = 0;
							if (v.forEach((function(e) {
									pe += e + (a.spaceBetween ? a.spaceBetween : 0)
								})), (pe -= a.spaceBetween) < s) {
								var ue = (s - pe) / 2;
								c.forEach((function(e, t) {
									c[t] = e - ue
								})), h.forEach((function(e, t) {
									h[t] = e + ue
								}))
							}
						}
						S(e, {
							slides: p,
							snapGrid: c,
							slidesGrid: h,
							slidesSizesGrid: v
						}), u !== d && e.emit("slidesLengthChange"), c.length !== y && (e.params.watchOverflow && e.checkOverflow(), e.emit("snapGridLengthChange")), h.length !== w && e.emit("slidesGridLengthChange"), (a.watchSlidesProgress || a.watchSlidesVisibility) && e.updateSlidesOffset()
					}
				},
				updateAutoHeight: function(e) {
					var t, a = this,
						i = [],
						s = 0;
					if ("number" == typeof e ? a.setTransition(e) : !0 === e && a.setTransition(a.params.speed), "auto" !== a.params.slidesPerView && a.params.slidesPerView > 1)
						if (a.params.centeredSlides) a.visibleSlides.each((function(e) {
							i.push(e)
						}));
						else
							for (t = 0; t < Math.ceil(a.params.slidesPerView); t += 1) {
								var r = a.activeIndex + t;
								if (r > a.slides.length) break;
								i.push(a.slides.eq(r)[0])
							} else i.push(a.slides.eq(a.activeIndex)[0]);
					for (t = 0; t < i.length; t += 1)
						if (void 0 !== i[t]) {
							var n = i[t].offsetHeight;
							s = n > s ? n : s
						} s && a.$wrapperEl.css("height", s + "px")
				},
				updateSlidesOffset: function() {
					for (var e = this.slides, t = 0; t < e.length; t += 1) e[t].swiperSlideOffset = this.isHorizontal() ? e[t].offsetLeft : e[t].offsetTop
				},
				updateSlidesProgress: function(e) {
					void 0 === e && (e = this && this.translate || 0);
					var t = this,
						a = t.params,
						i = t.slides,
						s = t.rtlTranslate;
					if (0 !== i.length) {
						void 0 === i[0].swiperSlideOffset && t.updateSlidesOffset();
						var r = -e;
						s && (r = e), i.removeClass(a.slideVisibleClass), t.visibleSlidesIndexes = [], t.visibleSlides = [];
						for (var n = 0; n < i.length; n += 1) {
							var l = i[n],
								o = (r + (a.centeredSlides ? t.minTranslate() : 0) - l.swiperSlideOffset) / (l.swiperSlideSize + a.spaceBetween);
							if (a.watchSlidesVisibility || a.centeredSlides && a.autoHeight) {
								var d = -(r - l.swiperSlideOffset),
									p = d + t.slidesSizesGrid[n];
								(d >= 0 && d < t.size - 1 || p > 1 && p <= t.size || d <= 0 && p >= t.size) && (t.visibleSlides.push(l), t.visibleSlidesIndexes.push(n), i.eq(n).addClass(a.slideVisibleClass))
							}
							l.progress = s ? -o : o
						}
						t.visibleSlides = m(t.visibleSlides)
					}
				},
				updateProgress: function(e) {
					var t = this;
					if (void 0 === e) {
						var a = t.rtlTranslate ? -1 : 1;
						e = t && t.translate && t.translate * a || 0
					}
					var i = t.params,
						s = t.maxTranslate() - t.minTranslate(),
						r = t.progress,
						n = t.isBeginning,
						l = t.isEnd,
						o = n,
						d = l;
					0 === s ? (r = 0, n = !0, l = !0) : (n = (r = (e - t.minTranslate()) / s) <= 0, l = r >= 1), S(t, {
						progress: r,
						isBeginning: n,
						isEnd: l
					}), (i.watchSlidesProgress || i.watchSlidesVisibility || i.centeredSlides && i.autoHeight) && t.updateSlidesProgress(e), n && !o && t.emit("reachBeginning toEdge"), l && !d && t.emit("reachEnd toEdge"), (o && !n || d && !l) && t.emit("fromEdge"), t.emit("progress", r)
				},
				updateSlidesClasses: function() {
					var e, t = this,
						a = t.slides,
						i = t.params,
						s = t.$wrapperEl,
						r = t.activeIndex,
						n = t.realIndex,
						l = t.virtual && i.virtual.enabled;
					a.removeClass(i.slideActiveClass + " " + i.slideNextClass + " " + i.slidePrevClass + " " + i.slideDuplicateActiveClass + " " + i.slideDuplicateNextClass + " " + i.slideDuplicatePrevClass), (e = l ? t.$wrapperEl.find("." + i.slideClass + '[data-swiper-slide-index="' + r + '"]') : a.eq(r)).addClass(i.slideActiveClass), i.loop && (e.hasClass(i.slideDuplicateClass) ? s.children("." + i.slideClass + ":not(." + i.slideDuplicateClass + ')[data-swiper-slide-index="' + n + '"]').addClass(i.slideDuplicateActiveClass) : s.children("." + i.slideClass + "." + i.slideDuplicateClass + '[data-swiper-slide-index="' + n + '"]').addClass(i.slideDuplicateActiveClass));
					var o = e.nextAll("." + i.slideClass).eq(0).addClass(i.slideNextClass);
					i.loop && 0 === o.length && (o = a.eq(0)).addClass(i.slideNextClass);
					var d = e.prevAll("." + i.slideClass).eq(0).addClass(i.slidePrevClass);
					i.loop && 0 === d.length && (d = a.eq(-1)).addClass(i.slidePrevClass), i.loop && (o.hasClass(i.slideDuplicateClass) ? s.children("." + i.slideClass + ":not(." + i.slideDuplicateClass + ')[data-swiper-slide-index="' + o.attr("data-swiper-slide-index") + '"]').addClass(i.slideDuplicateNextClass) : s.children("." + i.slideClass + "." + i.slideDuplicateClass + '[data-swiper-slide-index="' + o.attr("data-swiper-slide-index") + '"]').addClass(i.slideDuplicateNextClass), d.hasClass(i.slideDuplicateClass) ? s.children("." + i.slideClass + ":not(." + i.slideDuplicateClass + ')[data-swiper-slide-index="' + d.attr("data-swiper-slide-index") + '"]').addClass(i.slideDuplicatePrevClass) : s.children("." + i.slideClass + "." + i.slideDuplicateClass + '[data-swiper-slide-index="' + d.attr("data-swiper-slide-index") + '"]').addClass(i.slideDuplicatePrevClass)), t.emitSlidesClasses()
				},
				updateActiveIndex: function(e) {
					var t, a = this,
						i = a.rtlTranslate ? a.translate : -a.translate,
						s = a.slidesGrid,
						r = a.snapGrid,
						n = a.params,
						l = a.activeIndex,
						o = a.realIndex,
						d = a.snapIndex,
						p = e;
					if (void 0 === p) {
						for (var u = 0; u < s.length; u += 1) void 0 !== s[u + 1] ? i >= s[u] && i < s[u + 1] - (s[u + 1] - s[u]) / 2 ? p = u : i >= s[u] && i < s[u + 1] && (p = u + 1) : i >= s[u] && (p = u);
						n.normalizeSlideIndex && (p < 0 || void 0 === p) && (p = 0)
					}
					if (r.indexOf(i) >= 0) t = r.indexOf(i);
					else {
						var c = Math.min(n.slidesPerGroupSkip, p);
						t = c + Math.floor((p - c) / n.slidesPerGroup)
					}
					if (t >= r.length && (t = r.length - 1), p !== l) {
						var h = parseInt(a.slides.eq(p).attr("data-swiper-slide-index") || p, 10);
						S(a, {
							snapIndex: t,
							realIndex: h,
							previousIndex: l,
							activeIndex: p
						}), a.emit("activeIndexChange"), a.emit("snapIndexChange"), o !== h && a.emit("realIndexChange"), (a.initialized || a.params.runCallbacksOnInit) && a.emit("slideChange")
					} else t !== d && (a.snapIndex = t, a.emit("snapIndexChange"))
				},
				updateClickedSlide: function(e) {
					var t = this,
						a = t.params,
						i = m(e.target).closest("." + a.slideClass)[0],
						s = !1;
					if (i)
						for (var r = 0; r < t.slides.length; r += 1) t.slides[r] === i && (s = !0);
					if (!i || !s) return t.clickedSlide = void 0, void(t.clickedIndex = void 0);
					t.clickedSlide = i, t.virtual && t.params.virtual.enabled ? t.clickedIndex = parseInt(m(i).attr("data-swiper-slide-index"), 10) : t.clickedIndex = m(i).index(), a.slideToClickedSlide && void 0 !== t.clickedIndex && t.clickedIndex !== t.activeIndex && t.slideToClickedSlide()
				}
			},
			translate: {
				getTranslate: function(e) {
					void 0 === e && (e = this.isHorizontal() ? "x" : "y");
					var t = this,
						a = t.params,
						i = t.rtlTranslate,
						s = t.translate,
						r = t.$wrapperEl;
					if (a.virtualTranslate) return i ? -s : s;
					if (a.cssMode) return s;
					var n = T(r[0], e);
					return i && (n = -n), n || 0
				},
				setTranslate: function(e, t) {
					var a = this,
						i = a.rtlTranslate,
						s = a.params,
						r = a.$wrapperEl,
						n = a.wrapperEl,
						l = a.progress,
						o = 0,
						d = 0;
					a.isHorizontal() ? o = i ? -e : e : d = e, s.roundLengths && (o = Math.floor(o), d = Math.floor(d)), s.cssMode ? n[a.isHorizontal() ? "scrollLeft" : "scrollTop"] = a.isHorizontal() ? -o : -d : s.virtualTranslate || r.transform("translate3d(" + o + "px, " + d + "px, 0px)"), a.previousTranslate = a.translate, a.translate = a.isHorizontal() ? o : d;
					var p = a.maxTranslate() - a.minTranslate();
					(0 === p ? 0 : (e - a.minTranslate()) / p) !== l && a.updateProgress(e), a.emit("setTranslate", a.translate, t)
				},
				minTranslate: function() {
					return -this.snapGrid[0]
				},
				maxTranslate: function() {
					return -this.snapGrid[this.snapGrid.length - 1]
				},
				translateTo: function(e, t, a, i, s) {
					void 0 === e && (e = 0), void 0 === t && (t = this.params.speed), void 0 === a && (a = !0), void 0 === i && (i = !0);
					var r = this,
						n = r.params,
						l = r.wrapperEl;
					if (r.animating && n.preventInteractionOnTransition) return !1;
					var o, d = r.minTranslate(),
						p = r.maxTranslate();
					if (o = i && e > d ? d : i && e < p ? p : e, r.updateProgress(o), n.cssMode) {
						var u, c = r.isHorizontal();
						if (0 === t) l[c ? "scrollLeft" : "scrollTop"] = -o;
						else if (l.scrollTo) l.scrollTo(((u = {})[c ? "left" : "top"] = -o, u.behavior = "smooth", u));
						else l[c ? "scrollLeft" : "scrollTop"] = -o;
						return !0
					}
					return 0 === t ? (r.setTransition(0), r.setTranslate(o), a && (r.emit("beforeTransitionStart", t, s), r.emit("transitionEnd"))) : (r.setTransition(t), r.setTranslate(o), a && (r.emit("beforeTransitionStart", t, s), r.emit("transitionStart")), r.animating || (r.animating = !0, r.onTranslateToWrapperTransitionEnd || (r.onTranslateToWrapperTransitionEnd = function(e) {
						r && !r.destroyed && e.target === this && (r.$wrapperEl[0].removeEventListener("transitionend", r.onTranslateToWrapperTransitionEnd), r.$wrapperEl[0].removeEventListener("webkitTransitionEnd", r.onTranslateToWrapperTransitionEnd), r.onTranslateToWrapperTransitionEnd = null, delete r.onTranslateToWrapperTransitionEnd, a && r.emit("transitionEnd"))
					}), r.$wrapperEl[0].addEventListener("transitionend", r.onTranslateToWrapperTransitionEnd), r.$wrapperEl[0].addEventListener("webkitTransitionEnd", r.onTranslateToWrapperTransitionEnd))), !0
				}
			},
			transition: {
				setTransition: function(e, t) {
					var a = this;
					a.params.cssMode || a.$wrapperEl.transition(e), a.emit("setTransition", e, t)
				},
				transitionStart: function(e, t) {
					void 0 === e && (e = !0);
					var a = this,
						i = a.activeIndex,
						s = a.params,
						r = a.previousIndex;
					if (!s.cssMode) {
						s.autoHeight && a.updateAutoHeight();
						var n = t;
						if (n || (n = i > r ? "next" : i < r ? "prev" : "reset"), a.emit("transitionStart"), e && i !== r) {
							if ("reset" === n) return void a.emit("slideResetTransitionStart");
							a.emit("slideChangeTransitionStart"), "next" === n ? a.emit("slideNextTransitionStart") : a.emit("slidePrevTransitionStart")
						}
					}
				},
				transitionEnd: function(e, t) {
					void 0 === e && (e = !0);
					var a = this,
						i = a.activeIndex,
						s = a.previousIndex,
						r = a.params;
					if (a.animating = !1, !r.cssMode) {
						a.setTransition(0);
						var n = t;
						if (n || (n = i > s ? "next" : i < s ? "prev" : "reset"), a.emit("transitionEnd"), e && i !== s) {
							if ("reset" === n) return void a.emit("slideResetTransitionEnd");
							a.emit("slideChangeTransitionEnd"), "next" === n ? a.emit("slideNextTransitionEnd") : a.emit("slidePrevTransitionEnd")
						}
					}
				}
			},
			slide: {
				slideTo: function(e, t, a, i) {
					if (void 0 === e && (e = 0), void 0 === t && (t = this.params.speed), void 0 === a && (a = !0), "number" != typeof e && "string" != typeof e) throw new Error("The 'index' argument cannot have type other than 'number' or 'string'. [" + typeof e + "] given.");
					if ("string" == typeof e) {
						var s = parseInt(e, 10);
						if (!isFinite(s)) throw new Error("The passed-in 'index' (string) couldn't be converted to 'number'. [" + e + "] given.");
						e = s
					}
					var r = this,
						n = e;
					n < 0 && (n = 0);
					var l = r.params,
						o = r.snapGrid,
						d = r.slidesGrid,
						p = r.previousIndex,
						u = r.activeIndex,
						c = r.rtlTranslate,
						h = r.wrapperEl;
					if (r.animating && l.preventInteractionOnTransition) return !1;
					var v = Math.min(r.params.slidesPerGroupSkip, n),
						f = v + Math.floor((n - v) / r.params.slidesPerGroup);
					f >= o.length && (f = o.length - 1), (u || l.initialSlide || 0) === (p || 0) && a && r.emit("beforeSlideChangeStart");
					var m, g = -o[f];
					if (r.updateProgress(g), l.normalizeSlideIndex)
						for (var y = 0; y < d.length; y += 1) - Math.floor(100 * g) >= Math.floor(100 * d[y]) && (n = y);
					if (r.initialized && n !== u) {
						if (!r.allowSlideNext && g < r.translate && g < r.minTranslate()) return !1;
						if (!r.allowSlidePrev && g > r.translate && g > r.maxTranslate() && (u || 0) !== n) return !1
					}
					if (m = n > u ? "next" : n < u ? "prev" : "reset", c && -g === r.translate || !c && g === r.translate) return r.updateActiveIndex(n), l.autoHeight && r.updateAutoHeight(), r.updateSlidesClasses(), "slide" !== l.effect && r.setTranslate(g), "reset" !== m && (r.transitionStart(a, m), r.transitionEnd(a, m)), !1;
					if (l.cssMode) {
						var w, b = r.isHorizontal(),
							E = -g;
						if (c && (E = h.scrollWidth - h.offsetWidth - E), 0 === t) h[b ? "scrollLeft" : "scrollTop"] = E;
						else if (h.scrollTo) h.scrollTo(((w = {})[b ? "left" : "top"] = E, w.behavior = "smooth", w));
						else h[b ? "scrollLeft" : "scrollTop"] = E;
						return !0
					}
					return 0 === t ? (r.setTransition(0), r.setTranslate(g), r.updateActiveIndex(n), r.updateSlidesClasses(), r.emit("beforeTransitionStart", t, i), r.transitionStart(a, m), r.transitionEnd(a, m)) : (r.setTransition(t), r.setTranslate(g), r.updateActiveIndex(n), r.updateSlidesClasses(), r.emit("beforeTransitionStart", t, i), r.transitionStart(a, m), r.animating || (r.animating = !0, r.onSlideToWrapperTransitionEnd || (r.onSlideToWrapperTransitionEnd = function(e) {
						r && !r.destroyed && e.target === this && (r.$wrapperEl[0].removeEventListener("transitionend", r.onSlideToWrapperTransitionEnd), r.$wrapperEl[0].removeEventListener("webkitTransitionEnd", r.onSlideToWrapperTransitionEnd), r.onSlideToWrapperTransitionEnd = null, delete r.onSlideToWrapperTransitionEnd, r.transitionEnd(a, m))
					}), r.$wrapperEl[0].addEventListener("transitionend", r.onSlideToWrapperTransitionEnd), r.$wrapperEl[0].addEventListener("webkitTransitionEnd", r.onSlideToWrapperTransitionEnd))), !0
				},
				slideToLoop: function(e, t, a, i) {
					void 0 === e && (e = 0), void 0 === t && (t = this.params.speed), void 0 === a && (a = !0);
					var s = this,
						r = e;
					return s.params.loop && (r += s.loopedSlides), s.slideTo(r, t, a, i)
				},
				slideNext: function(e, t, a) {
					void 0 === e && (e = this.params.speed), void 0 === t && (t = !0);
					var i = this,
						s = i.params,
						r = i.animating,
						n = i.activeIndex < s.slidesPerGroupSkip ? 1 : s.slidesPerGroup;
					if (s.loop) {
						if (r && s.loopPreventsSlide) return !1;
						i.loopFix(), i._clientLeft = i.$wrapperEl[0].clientLeft
					}
					return i.slideTo(i.activeIndex + n, e, t, a)
				},
				slidePrev: function(e, t, a) {
					void 0 === e && (e = this.params.speed), void 0 === t && (t = !0);
					var i = this,
						s = i.params,
						r = i.animating,
						n = i.snapGrid,
						l = i.slidesGrid,
						o = i.rtlTranslate;
					if (s.loop) {
						if (r && s.loopPreventsSlide) return !1;
						i.loopFix(), i._clientLeft = i.$wrapperEl[0].clientLeft
					}

					function d(e) {
						return e < 0 ? -Math.floor(Math.abs(e)) : Math.floor(e)
					}
					var p, u = d(o ? i.translate : -i.translate),
						c = n.map((function(e) {
							return d(e)
						})),
						h = (n[c.indexOf(u)], n[c.indexOf(u) - 1]);
					return void 0 === h && s.cssMode && n.forEach((function(e) {
						!h && u >= e && (h = e)
					})), void 0 !== h && (p = l.indexOf(h)) < 0 && (p = i.activeIndex - 1), i.slideTo(p, e, t, a)
				},
				slideReset: function(e, t, a) {
					return void 0 === e && (e = this.params.speed), void 0 === t && (t = !0), this.slideTo(this.activeIndex, e, t, a)
				},
				slideToClosest: function(e, t, a, i) {
					void 0 === e && (e = this.params.speed), void 0 === t && (t = !0), void 0 === i && (i = .5);
					var s = this,
						r = s.activeIndex,
						n = Math.min(s.params.slidesPerGroupSkip, r),
						l = n + Math.floor((r - n) / s.params.slidesPerGroup),
						o = s.rtlTranslate ? s.translate : -s.translate;
					if (o >= s.snapGrid[l]) {
						var d = s.snapGrid[l];
						o - d > (s.snapGrid[l + 1] - d) * i && (r += s.params.slidesPerGroup)
					} else {
						var p = s.snapGrid[l - 1];
						o - p <= (s.snapGrid[l] - p) * i && (r -= s.params.slidesPerGroup)
					}
					return r = Math.max(r, 0), r = Math.min(r, s.slidesGrid.length - 1), s.slideTo(r, e, t, a)
				},
				slideToClickedSlide: function() {
					var e, t = this,
						a = t.params,
						i = t.$wrapperEl,
						s = "auto" === a.slidesPerView ? t.slidesPerViewDynamic() : a.slidesPerView,
						r = t.clickedIndex;
					if (a.loop) {
						if (t.animating) return;
						e = parseInt(m(t.clickedSlide).attr("data-swiper-slide-index"), 10), a.centeredSlides ? r < t.loopedSlides - s / 2 || r > t.slides.length - t.loopedSlides + s / 2 ? (t.loopFix(), r = i.children("." + a.slideClass + '[data-swiper-slide-index="' + e + '"]:not(.' + a.slideDuplicateClass + ")").eq(0).index(), E((function() {
							t.slideTo(r)
						}))) : t.slideTo(r) : r > t.slides.length - s ? (t.loopFix(), r = i.children("." + a.slideClass + '[data-swiper-slide-index="' + e + '"]:not(.' + a.slideDuplicateClass + ")").eq(0).index(), E((function() {
							t.slideTo(r)
						}))) : t.slideTo(r)
					} else t.slideTo(r)
				}
			},
			loop: {
				loopCreate: function() {
					var e = this,
						t = r(),
						a = e.params,
						i = e.$wrapperEl;
					i.children("." + a.slideClass + "." + a.slideDuplicateClass).remove();
					var s = i.children("." + a.slideClass);
					if (a.loopFillGroupWithBlank) {
						var n = a.slidesPerGroup - s.length % a.slidesPerGroup;
						if (n !== a.slidesPerGroup) {
							for (var l = 0; l < n; l += 1) {
								var o = m(t.createElement("div")).addClass(a.slideClass + " " + a.slideBlankClass);
								i.append(o)
							}
							s = i.children("." + a.slideClass)
						}
					}
					"auto" !== a.slidesPerView || a.loopedSlides || (a.loopedSlides = s.length), e.loopedSlides = Math.ceil(parseFloat(a.loopedSlides || a.slidesPerView, 10)), e.loopedSlides += a.loopAdditionalSlides, e.loopedSlides > s.length && (e.loopedSlides = s.length);
					var d = [],
						p = [];
					s.each((function(t, a) {
						var i = m(t);
						a < e.loopedSlides && p.push(t), a < s.length && a >= s.length - e.loopedSlides && d.push(t), i.attr("data-swiper-slide-index", a)
					}));
					for (var u = 0; u < p.length; u += 1) i.append(m(p[u].cloneNode(!0)).addClass(a.slideDuplicateClass));
					for (var c = d.length - 1; c >= 0; c -= 1) i.prepend(m(d[c].cloneNode(!0)).addClass(a.slideDuplicateClass))
				},
				loopFix: function() {
					var e = this;
					e.emit("beforeLoopFix");
					var t, a = e.activeIndex,
						i = e.slides,
						s = e.loopedSlides,
						r = e.allowSlidePrev,
						n = e.allowSlideNext,
						l = e.snapGrid,
						o = e.rtlTranslate;
					e.allowSlidePrev = !0, e.allowSlideNext = !0;
					var d = -l[a] - e.getTranslate();
					if (a < s) t = i.length - 3 * s + a, t += s, e.slideTo(t, 0, !1, !0) && 0 !== d && e.setTranslate((o ? -e.translate : e.translate) - d);
					else if (a >= i.length - s) {
						t = -i.length + a + s, t += s, e.slideTo(t, 0, !1, !0) && 0 !== d && e.setTranslate((o ? -e.translate : e.translate) - d)
					}
					e.allowSlidePrev = r, e.allowSlideNext = n, e.emit("loopFix")
				},
				loopDestroy: function() {
					var e = this,
						t = e.$wrapperEl,
						a = e.params,
						i = e.slides;
					t.children("." + a.slideClass + "." + a.slideDuplicateClass + ",." + a.slideClass + "." + a.slideBlankClass).remove(), i.removeAttr("data-swiper-slide-index")
				}
			},
			grabCursor: {
				setGrabCursor: function(e) {
					var t = this;
					if (!(t.support.touch || !t.params.simulateTouch || t.params.watchOverflow && t.isLocked || t.params.cssMode)) {
						var a = t.el;
						a.style.cursor = "move", a.style.cursor = e ? "-webkit-grabbing" : "-webkit-grab", a.style.cursor = e ? "-moz-grabbin" : "-moz-grab", a.style.cursor = e ? "grabbing" : "grab"
					}
				},
				unsetGrabCursor: function() {
					var e = this;
					e.support.touch || e.params.watchOverflow && e.isLocked || e.params.cssMode || (e.el.style.cursor = "")
				}
			},
			manipulation: {
				appendSlide: function(e) {
					var t = this,
						a = t.$wrapperEl,
						i = t.params;
					if (i.loop && t.loopDestroy(), "object" == typeof e && "length" in e)
						for (var s = 0; s < e.length; s += 1) e[s] && a.append(e[s]);
					else a.append(e);
					i.loop && t.loopCreate(), i.observer && t.support.observer || t.update()
				},
				prependSlide: function(e) {
					var t = this,
						a = t.params,
						i = t.$wrapperEl,
						s = t.activeIndex;
					a.loop && t.loopDestroy();
					var r = s + 1;
					if ("object" == typeof e && "length" in e) {
						for (var n = 0; n < e.length; n += 1) e[n] && i.prepend(e[n]);
						r = s + e.length
					} else i.prepend(e);
					a.loop && t.loopCreate(), a.observer && t.support.observer || t.update(), t.slideTo(r, 0, !1)
				},
				addSlide: function(e, t) {
					var a = this,
						i = a.$wrapperEl,
						s = a.params,
						r = a.activeIndex;
					s.loop && (r -= a.loopedSlides, a.loopDestroy(), a.slides = i.children("." + s.slideClass));
					var n = a.slides.length;
					if (e <= 0) a.prependSlide(t);
					else if (e >= n) a.appendSlide(t);
					else {
						for (var l = r > e ? r + 1 : r, o = [], d = n - 1; d >= e; d -= 1) {
							var p = a.slides.eq(d);
							p.remove(), o.unshift(p)
						}
						if ("object" == typeof t && "length" in t) {
							for (var u = 0; u < t.length; u += 1) t[u] && i.append(t[u]);
							l = r > e ? r + t.length : r
						} else i.append(t);
						for (var c = 0; c < o.length; c += 1) i.append(o[c]);
						s.loop && a.loopCreate(), s.observer && a.support.observer || a.update(), s.loop ? a.slideTo(l + a.loopedSlides, 0, !1) : a.slideTo(l, 0, !1)
					}
				},
				removeSlide: function(e) {
					var t = this,
						a = t.params,
						i = t.$wrapperEl,
						s = t.activeIndex;
					a.loop && (s -= t.loopedSlides, t.loopDestroy(), t.slides = i.children("." + a.slideClass));
					var r, n = s;
					if ("object" == typeof e && "length" in e) {
						for (var l = 0; l < e.length; l += 1) r = e[l], t.slides[r] && t.slides.eq(r).remove(), r < n && (n -= 1);
						n = Math.max(n, 0)
					} else r = e, t.slides[r] && t.slides.eq(r).remove(), r < n && (n -= 1), n = Math.max(n, 0);
					a.loop && t.loopCreate(), a.observer && t.support.observer || t.update(), a.loop ? t.slideTo(n + t.loopedSlides, 0, !1) : t.slideTo(n, 0, !1)
				},
				removeAllSlides: function() {
					for (var e = [], t = 0; t < this.slides.length; t += 1) e.push(t);
					this.removeSlide(e)
				}
			},
			events: {
				attachEvents: function() {
					var e = this,
						t = r(),
						a = e.params,
						i = e.touchEvents,
						s = e.el,
						n = e.wrapperEl,
						l = e.device,
						o = e.support;
					e.onTouchStart = O.bind(e), e.onTouchMove = A.bind(e), e.onTouchEnd = D.bind(e), a.cssMode && (e.onScroll = B.bind(e)), e.onClick = N.bind(e);
					var d = !!a.nested;
					if (!o.touch && o.pointerEvents) s.addEventListener(i.start, e.onTouchStart, !1), t.addEventListener(i.move, e.onTouchMove, d), t.addEventListener(i.end, e.onTouchEnd, !1);
					else {
						if (o.touch) {
							var p = !("touchstart" !== i.start || !o.passiveListener || !a.passiveListeners) && {
								passive: !0,
								capture: !1
							};
							s.addEventListener(i.start, e.onTouchStart, p), s.addEventListener(i.move, e.onTouchMove, o.passiveListener ? {
								passive: !1,
								capture: d
							} : d), s.addEventListener(i.end, e.onTouchEnd, p), i.cancel && s.addEventListener(i.cancel, e.onTouchEnd, p), H || (t.addEventListener("touchstart", X), H = !0)
						}(a.simulateTouch && !l.ios && !l.android || a.simulateTouch && !o.touch && l.ios) && (s.addEventListener("mousedown", e.onTouchStart, !1), t.addEventListener("mousemove", e.onTouchMove, d), t.addEventListener("mouseup", e.onTouchEnd, !1))
					}(a.preventClicks || a.preventClicksPropagation) && s.addEventListener("click", e.onClick, !0), a.cssMode && n.addEventListener("scroll", e.onScroll), a.updateOnWindowResize ? e.on(l.ios || l.android ? "resize orientationchange observerUpdate" : "resize observerUpdate", G, !0) : e.on("observerUpdate", G, !0)
				},
				detachEvents: function() {
					var e = this,
						t = r(),
						a = e.params,
						i = e.touchEvents,
						s = e.el,
						n = e.wrapperEl,
						l = e.device,
						o = e.support,
						d = !!a.nested;
					if (!o.touch && o.pointerEvents) s.removeEventListener(i.start, e.onTouchStart, !1), t.removeEventListener(i.move, e.onTouchMove, d), t.removeEventListener(i.end, e.onTouchEnd, !1);
					else {
						if (o.touch) {
							var p = !("onTouchStart" !== i.start || !o.passiveListener || !a.passiveListeners) && {
								passive: !0,
								capture: !1
							};
							s.removeEventListener(i.start, e.onTouchStart, p), s.removeEventListener(i.move, e.onTouchMove, d), s.removeEventListener(i.end, e.onTouchEnd, p), i.cancel && s.removeEventListener(i.cancel, e.onTouchEnd, p)
						}(a.simulateTouch && !l.ios && !l.android || a.simulateTouch && !o.touch && l.ios) && (s.removeEventListener("mousedown", e.onTouchStart, !1), t.removeEventListener("mousemove", e.onTouchMove, d), t.removeEventListener("mouseup", e.onTouchEnd, !1))
					}(a.preventClicks || a.preventClicksPropagation) && s.removeEventListener("click", e.onClick, !0), a.cssMode && n.removeEventListener("scroll", e.onScroll), e.off(l.ios || l.android ? "resize orientationchange observerUpdate" : "resize observerUpdate", G)
				}
			},
			breakpoints: {
				setBreakpoint: function() {
					var e = this,
						t = e.activeIndex,
						a = e.initialized,
						i = e.loopedSlides,
						s = void 0 === i ? 0 : i,
						r = e.params,
						n = e.$el,
						l = r.breakpoints;
					if (l && (!l || 0 !== Object.keys(l).length)) {
						var o = e.getBreakpoint(l);
						if (o && e.currentBreakpoint !== o) {
							var d = o in l ? l[o] : void 0;
							d && ["slidesPerView", "spaceBetween", "slidesPerGroup", "slidesPerGroupSkip", "slidesPerColumn"].forEach((function(e) {
								var t = d[e];
								void 0 !== t && (d[e] = "slidesPerView" !== e || "AUTO" !== t && "auto" !== t ? "slidesPerView" === e ? parseFloat(t) : parseInt(t, 10) : "auto")
							}));
							var p = d || e.originalParams,
								u = r.slidesPerColumn > 1,
								c = p.slidesPerColumn > 1;
							u && !c ? (n.removeClass(r.containerModifierClass + "multirow " + r.containerModifierClass + "multirow-column"), e.emitContainerClasses()) : !u && c && (n.addClass(r.containerModifierClass + "multirow"), "column" === p.slidesPerColumnFill && n.addClass(r.containerModifierClass + "multirow-column"), e.emitContainerClasses());
							var h = p.direction && p.direction !== r.direction,
								v = r.loop && (p.slidesPerView !== r.slidesPerView || h);
							h && a && e.changeDirection(), S(e.params, p), S(e, {
								allowTouchMove: e.params.allowTouchMove,
								allowSlideNext: e.params.allowSlideNext,
								allowSlidePrev: e.params.allowSlidePrev
							}), e.currentBreakpoint = o, e.emit("_beforeBreakpoint", p), v && a && (e.loopDestroy(), e.loopCreate(), e.updateSlides(), e.slideTo(t - s + e.loopedSlides, 0, !1)), e.emit("breakpoint", p)
						}
					}
				},
				getBreakpoint: function(e) {
					var t = l();
					if (e) {
						var a = !1,
							i = Object.keys(e).map((function(e) {
								if ("string" == typeof e && 0 === e.indexOf("@")) {
									var a = parseFloat(e.substr(1));
									return {
										value: t.innerHeight * a,
										point: e
									}
								}
								return {
									value: e,
									point: e
								}
							}));
						i.sort((function(e, t) {
							return parseInt(e.value, 10) - parseInt(t.value, 10)
						}));
						for (var s = 0; s < i.length; s += 1) {
							var r = i[s],
								n = r.point;
							r.value <= t.innerWidth && (a = n)
						}
						return a || "max"
					}
				}
			},
			checkOverflow: {
				checkOverflow: function() {
					var e = this,
						t = e.params,
						a = e.isLocked,
						i = e.slides.length > 0 && t.slidesOffsetBefore + t.spaceBetween * (e.slides.length - 1) + e.slides[0].offsetWidth * e.slides.length;
					t.slidesOffsetBefore && t.slidesOffsetAfter && i ? e.isLocked = i <= e.size : e.isLocked = 1 === e.snapGrid.length, e.allowSlideNext = !e.isLocked, e.allowSlidePrev = !e.isLocked, a !== e.isLocked && e.emit(e.isLocked ? "lock" : "unlock"), a && a !== e.isLocked && (e.isEnd = !1, e.navigation && e.navigation.update())
				}
			},
			classes: {
				addClasses: function() {
					var e = this,
						t = e.classNames,
						a = e.params,
						i = e.rtl,
						s = e.$el,
						r = e.device,
						n = [];
					n.push("initialized"), n.push(a.direction), a.freeMode && n.push("free-mode"), a.autoHeight && n.push("autoheight"), i && n.push("rtl"), a.slidesPerColumn > 1 && (n.push("multirow"), "column" === a.slidesPerColumnFill && n.push("multirow-column")), r.android && n.push("android"), r.ios && n.push("ios"), a.cssMode && n.push("css-mode"), n.forEach((function(e) {
						t.push(a.containerModifierClass + e)
					})), s.addClass(t.join(" ")), e.emitContainerClasses()
				},
				removeClasses: function() {
					var e = this,
						t = e.$el,
						a = e.classNames;
					t.removeClass(a.join(" ")), e.emitContainerClasses()
				}
			},
			images: {
				loadImage: function(e, t, a, i, s, r) {
					var n, o = l();

					function d() {
						r && r()
					}
					m(e).parent("picture")[0] || e.complete && s ? d() : t ? ((n = new o.Image).onload = d, n.onerror = d, i && (n.sizes = i), a && (n.srcset = a), t && (n.src = t)) : d()
				},
				preloadImages: function() {
					var e = this;

					function t() {
						null != e && e && !e.destroyed && (void 0 !== e.imagesLoaded && (e.imagesLoaded += 1), e.imagesLoaded === e.imagesToLoad.length && (e.params.updateOnImagesReady && e.update(), e.emit("imagesReady")))
					}
					e.imagesToLoad = e.$el.find("img");
					for (var a = 0; a < e.imagesToLoad.length; a += 1) {
						var i = e.imagesToLoad[a];
						e.loadImage(i, i.currentSrc || i.getAttribute("src"), i.srcset || i.getAttribute("srcset"), i.sizes || i.getAttribute("sizes"), !0, t)
					}
				}
			}
		},
		F = {},
		R = function() {
			function t() {
				for (var e, a, i = arguments.length, s = new Array(i), r = 0; r < i; r++) s[r] = arguments[r];
				1 === s.length && s[0].constructor && s[0].constructor === Object ? a = s[0] : (e = s[0], a = s[1]), a || (a = {}), a = S({}, a), e && !a.el && (a.el = e);
				var n = this;
				n.support = z(), n.device = P({
					userAgent: a.userAgent
				}), n.browser = k(), n.eventsListeners = {}, n.eventsAnyListeners = [], void 0 === n.modules && (n.modules = {}), Object.keys(n.modules).forEach((function(e) {
					var t = n.modules[e];
					if (t.params) {
						var i = Object.keys(t.params)[0],
							s = t.params[i];
						if ("object" != typeof s || null === s) return;
						if (!(i in a) || !("enabled" in s)) return;
						!0 === a[i] && (a[i] = {
							enabled: !0
						}), "object" != typeof a[i] || "enabled" in a[i] || (a[i].enabled = !0), a[i] || (a[i] = {
							enabled: !1
						})
					}
				}));
				var l = S({}, Y);
				n.useParams(l), n.params = S({}, l, F, a), n.originalParams = S({}, n.params), n.passedParams = S({}, a), n.params && n.params.on && Object.keys(n.params.on).forEach((function(e) {
					n.on(e, n.params.on[e])
				})), n.params && n.params.onAny && n.onAny(n.params.onAny), n.$ = m;
				var o = m(n.params.el);
				if (e = o[0]) {
					if (o.length > 1) {
						var d = [];
						return o.each((function(e) {
							var i = S({}, a, {
								el: e
							});
							d.push(new t(i))
						})), d
					}
					var p, u, c;
					return e.swiper = n, e && e.shadowRoot && e.shadowRoot.querySelector ? (p = m(e.shadowRoot.querySelector("." + n.params.wrapperClass))).children = function(e) {
						return o.children(e)
					} : p = o.children("." + n.params.wrapperClass), S(n, {
						$el: o,
						el: e,
						$wrapperEl: p,
						wrapperEl: p[0],
						classNames: [],
						slides: m(),
						slidesGrid: [],
						snapGrid: [],
						slidesSizesGrid: [],
						isHorizontal: function() {
							return "horizontal" === n.params.direction
						},
						isVertical: function() {
							return "vertical" === n.params.direction
						},
						rtl: "rtl" === e.dir.toLowerCase() || "rtl" === o.css("direction"),
						rtlTranslate: "horizontal" === n.params.direction && ("rtl" === e.dir.toLowerCase() || "rtl" === o.css("direction")),
						wrongRTL: "-webkit-box" === p.css("display"),
						activeIndex: 0,
						realIndex: 0,
						isBeginning: !0,
						isEnd: !1,
						translate: 0,
						previousTranslate: 0,
						progress: 0,
						velocity: 0,
						animating: !1,
						allowSlideNext: n.params.allowSlideNext,
						allowSlidePrev: n.params.allowSlidePrev,
						touchEvents: (u = ["touchstart", "touchmove", "touchend", "touchcancel"], c = ["mousedown", "mousemove", "mouseup"], n.support.pointerEvents && (c = ["pointerdown", "pointermove", "pointerup"]), n.touchEventsTouch = {
							start: u[0],
							move: u[1],
							end: u[2],
							cancel: u[3]
						}, n.touchEventsDesktop = {
							start: c[0],
							move: c[1],
							end: c[2]
						}, n.support.touch || !n.params.simulateTouch ? n.touchEventsTouch : n.touchEventsDesktop),
						touchEventsData: {
							isTouched: void 0,
							isMoved: void 0,
							allowTouchCallbacks: void 0,
							touchStartTime: void 0,
							isScrolling: void 0,
							currentTranslate: void 0,
							startTranslate: void 0,
							allowThresholdMove: void 0,
							formElements: "input, select, option, textarea, button, video, label",
							lastClickTime: x(),
							clickTimeout: void 0,
							velocities: [],
							allowMomentumBounce: void 0,
							isTouchEvent: void 0,
							startMoving: void 0
						},
						allowClick: !0,
						allowTouchMove: n.params.allowTouchMove,
						touches: {
							startX: 0,
							startY: 0,
							currentX: 0,
							currentY: 0,
							diff: 0
						},
						imagesToLoad: [],
						imagesLoaded: 0
					}), n.useModules(), n.emit("_swiper"), n.params.init && n.init(), n
				}
			}
			var a, i, s, r = t.prototype;
			return r.emitContainerClasses = function() {
				var e = this;
				if (e.params._emitClasses && e.el) {
					var t = e.el.className.split(" ").filter((function(t) {
						return 0 === t.indexOf("swiper-container") || 0 === t.indexOf(e.params.containerModifierClass)
					}));
					e.emit("_containerClasses", t.join(" "))
				}
			}, r.getSlideClasses = function(e) {
				var t = this;
				return e.className.split(" ").filter((function(e) {
					return 0 === e.indexOf("swiper-slide") || 0 === e.indexOf(t.params.slideClass)
				})).join(" ")
			}, r.emitSlidesClasses = function() {
				var e = this;
				e.params._emitClasses && e.el && e.slides.each((function(t) {
					var a = e.getSlideClasses(t);
					e.emit("_slideClass", t, a)
				}))
			}, r.slidesPerViewDynamic = function() {
				var e = this,
					t = e.params,
					a = e.slides,
					i = e.slidesGrid,
					s = e.size,
					r = e.activeIndex,
					n = 1;
				if (t.centeredSlides) {
					for (var l, o = a[r].swiperSlideSize, d = r + 1; d < a.length; d += 1) a[d] && !l && (n += 1, (o += a[d].swiperSlideSize) > s && (l = !0));
					for (var p = r - 1; p >= 0; p -= 1) a[p] && !l && (n += 1, (o += a[p].swiperSlideSize) > s && (l = !0))
				} else
					for (var u = r + 1; u < a.length; u += 1) i[u] - i[r] < s && (n += 1);
				return n
			}, r.update = function() {
				var e = this;
				if (e && !e.destroyed) {
					var t = e.snapGrid,
						a = e.params;
					a.breakpoints && e.setBreakpoint(), e.updateSize(), e.updateSlides(), e.updateProgress(), e.updateSlidesClasses(), e.params.freeMode ? (i(), e.params.autoHeight && e.updateAutoHeight()) : (("auto" === e.params.slidesPerView || e.params.slidesPerView > 1) && e.isEnd && !e.params.centeredSlides ? e.slideTo(e.slides.length - 1, 0, !1, !0) : e.slideTo(e.activeIndex, 0, !1, !0)) || i(), a.watchOverflow && t !== e.snapGrid && e.checkOverflow(), e.emit("update")
				}

				function i() {
					var t = e.rtlTranslate ? -1 * e.translate : e.translate,
						a = Math.min(Math.max(t, e.maxTranslate()), e.minTranslate());
					e.setTranslate(a), e.updateActiveIndex(), e.updateSlidesClasses()
				}
			}, r.changeDirection = function(e, t) {
				void 0 === t && (t = !0);
				var a = this,
					i = a.params.direction;
				return e || (e = "horizontal" === i ? "vertical" : "horizontal"), e === i || "horizontal" !== e && "vertical" !== e || (a.$el.removeClass("" + a.params.containerModifierClass + i).addClass("" + a.params.containerModifierClass + e), a.emitContainerClasses(), a.params.direction = e, a.slides.each((function(t) {
					"vertical" === e ? t.style.width = "" : t.style.height = ""
				})), a.emit("changeDirection"), t && a.update()), a
			}, r.init = function() {
				var e = this;
				e.initialized || (e.emit("beforeInit"), e.params.breakpoints && e.setBreakpoint(), e.addClasses(), e.params.loop && e.loopCreate(), e.updateSize(), e.updateSlides(), e.params.watchOverflow && e.checkOverflow(), e.params.grabCursor && e.setGrabCursor(), e.params.preloadImages && e.preloadImages(), e.params.loop ? e.slideTo(e.params.initialSlide + e.loopedSlides, 0, e.params.runCallbacksOnInit) : e.slideTo(e.params.initialSlide, 0, e.params.runCallbacksOnInit), e.attachEvents(), e.initialized = !0, e.emit("init"), e.emit("afterInit"))
			}, r.destroy = function(e, t) {
				void 0 === e && (e = !0), void 0 === t && (t = !0);
				var a, i = this,
					s = i.params,
					r = i.$el,
					n = i.$wrapperEl,
					l = i.slides;
				return void 0 === i.params || i.destroyed || (i.emit("beforeDestroy"), i.initialized = !1, i.detachEvents(), s.loop && i.loopDestroy(), t && (i.removeClasses(), r.removeAttr("style"), n.removeAttr("style"), l && l.length && l.removeClass([s.slideVisibleClass, s.slideActiveClass, s.slideNextClass, s.slidePrevClass].join(" ")).removeAttr("style").removeAttr("data-swiper-slide-index")), i.emit("destroy"), Object.keys(i.eventsListeners).forEach((function(e) {
					i.off(e)
				})), !1 !== e && (i.$el[0].swiper = null, a = i, Object.keys(a).forEach((function(e) {
					try {
						a[e] = null
					} catch (e) {}
					try {
						delete a[e]
					} catch (e) {}
				}))), i.destroyed = !0), null
			}, t.extendDefaults = function(e) {
				S(F, e)
			}, t.installModule = function(e) {
				t.prototype.modules || (t.prototype.modules = {});
				var a = e.name || Object.keys(t.prototype.modules).length + "_" + x();
				t.prototype.modules[a] = e
			}, t.use = function(e) {
				return Array.isArray(e) ? (e.forEach((function(e) {
					return t.installModule(e)
				})), t) : (t.installModule(e), t)
			}, a = t, s = [{
				key: "extendedDefaults",
				get: function() {
					return F
				}
			}, {
				key: "defaults",
				get: function() {
					return Y
				}
			}], (i = null) && e(a.prototype, i), s && e(a, s), t
		}();
	Object.keys(V).forEach((function(e) {
		Object.keys(V[e]).forEach((function(t) {
			R.prototype[t] = V[e][t]
		}))
	})), R.use([L, I]);
	var W = {
			update: function(e) {
				var t = this,
					a = t.params,
					i = a.slidesPerView,
					s = a.slidesPerGroup,
					r = a.centeredSlides,
					n = t.params.virtual,
					l = n.addSlidesBefore,
					o = n.addSlidesAfter,
					d = t.virtual,
					p = d.from,
					u = d.to,
					c = d.slides,
					h = d.slidesGrid,
					v = d.renderSlide,
					f = d.offset;
				t.updateActiveIndex();
				var m, g, y, w = t.activeIndex || 0;
				m = t.rtlTranslate ? "right" : t.isHorizontal() ? "left" : "top", r ? (g = Math.floor(i / 2) + s + o, y = Math.floor(i / 2) + s + l) : (g = i + (s - 1) + o, y = s + l);
				var b = Math.max((w || 0) - y, 0),
					E = Math.min((w || 0) + g, c.length - 1),
					x = (t.slidesGrid[b] || 0) - (t.slidesGrid[0] || 0);

				function T() {
					t.updateSlides(), t.updateProgress(), t.updateSlidesClasses(), t.lazy && t.params.lazy.enabled && t.lazy.load()
				}
				if (S(t.virtual, {
						from: b,
						to: E,
						offset: x,
						slidesGrid: t.slidesGrid
					}), p === b && u === E && !e) return t.slidesGrid !== h && x !== f && t.slides.css(m, x + "px"), void t.updateProgress();
				if (t.params.virtual.renderExternal) return t.params.virtual.renderExternal.call(t, {
					offset: x,
					from: b,
					to: E,
					slides: function() {
						for (var e = [], t = b; t <= E; t += 1) e.push(c[t]);
						return e
					}()
				}), void(t.params.virtual.renderExternalUpdate && T());
				var C = [],
					M = [];
				if (e) t.$wrapperEl.find("." + t.params.slideClass).remove();
				else
					for (var z = p; z <= u; z += 1)(z < b || z > E) && t.$wrapperEl.find("." + t.params.slideClass + '[data-swiper-slide-index="' + z + '"]').remove();
				for (var P = 0; P < c.length; P += 1) P >= b && P <= E && (void 0 === u || e ? M.push(P) : (P > u && M.push(P), P < p && C.push(P)));
				M.forEach((function(e) {
					t.$wrapperEl.append(v(c[e], e))
				})), C.sort((function(e, t) {
					return t - e
				})).forEach((function(e) {
					t.$wrapperEl.prepend(v(c[e], e))
				})), t.$wrapperEl.children(".swiper-slide").css(m, x + "px"), T()
			},
			renderSlide: function(e, t) {
				var a = this,
					i = a.params.virtual;
				if (i.cache && a.virtual.cache[t]) return a.virtual.cache[t];
				var s = i.renderSlide ? m(i.renderSlide.call(a, e, t)) : m('<div class="' + a.params.slideClass + '" data-swiper-slide-index="' + t + '">' + e + "</div>");
				return s.attr("data-swiper-slide-index") || s.attr("data-swiper-slide-index", t), i.cache && (a.virtual.cache[t] = s), s
			},
			appendSlide: function(e) {
				var t = this;
				if ("object" == typeof e && "length" in e)
					for (var a = 0; a < e.length; a += 1) e[a] && t.virtual.slides.push(e[a]);
				else t.virtual.slides.push(e);
				t.virtual.update(!0)
			},
			prependSlide: function(e) {
				var t = this,
					a = t.activeIndex,
					i = a + 1,
					s = 1;
				if (Array.isArray(e)) {
					for (var r = 0; r < e.length; r += 1) e[r] && t.virtual.slides.unshift(e[r]);
					i = a + e.length, s = e.length
				} else t.virtual.slides.unshift(e);
				if (t.params.virtual.cache) {
					var n = t.virtual.cache,
						l = {};
					Object.keys(n).forEach((function(e) {
						var t = n[e],
							a = t.attr("data-swiper-slide-index");
						a && t.attr("data-swiper-slide-index", parseInt(a, 10) + 1), l[parseInt(e, 10) + s] = t
					})), t.virtual.cache = l
				}
				t.virtual.update(!0), t.slideTo(i, 0)
			},
			removeSlide: function(e) {
				var t = this;
				if (null != e) {
					var a = t.activeIndex;
					if (Array.isArray(e))
						for (var i = e.length - 1; i >= 0; i -= 1) t.virtual.slides.splice(e[i], 1), t.params.virtual.cache && delete t.virtual.cache[e[i]], e[i] < a && (a -= 1), a = Math.max(a, 0);
					else t.virtual.slides.splice(e, 1), t.params.virtual.cache && delete t.virtual.cache[e], e < a && (a -= 1), a = Math.max(a, 0);
					t.virtual.update(!0), t.slideTo(a, 0)
				}
			},
			removeAllSlides: function() {
				var e = this;
				e.virtual.slides = [], e.params.virtual.cache && (e.virtual.cache = {}), e.virtual.update(!0), e.slideTo(0, 0)
			}
		},
		q = {
			name: "virtual",
			params: {
				virtual: {
					enabled: !1,
					slides: [],
					cache: !0,
					renderSlide: null,
					renderExternal: null,
					renderExternalUpdate: !0,
					addSlidesBefore: 0,
					addSlidesAfter: 0
				}
			},
			create: function() {
				M(this, {
					virtual: t({}, W, {
						slides: this.params.virtual.slides,
						cache: {}
					})
				})
			},
			on: {
				beforeInit: function(e) {
					if (e.params.virtual.enabled) {
						e.classNames.push(e.params.containerModifierClass + "virtual");
						var t = {
							watchSlidesProgress: !0
						};
						S(e.params, t), S(e.originalParams, t), e.params.initialSlide || e.virtual.update()
					}
				},
				setTranslate: function(e) {
					e.params.virtual.enabled && e.virtual.update()
				}
			}
		},
		j = {
			handle: function(e) {
				var t = this,
					a = l(),
					i = r(),
					s = t.rtlTranslate,
					n = e;
				n.originalEvent && (n = n.originalEvent);
				var o = n.keyCode || n.charCode,
					d = t.params.keyboard.pageUpDown,
					p = d && 33 === o,
					u = d && 34 === o,
					c = 37 === o,
					h = 39 === o,
					v = 38 === o,
					f = 40 === o;
				if (!t.allowSlideNext && (t.isHorizontal() && h || t.isVertical() && f || u)) return !1;
				if (!t.allowSlidePrev && (t.isHorizontal() && c || t.isVertical() && v || p)) return !1;
				if (!(n.shiftKey || n.altKey || n.ctrlKey || n.metaKey || i.activeElement && i.activeElement.nodeName && ("input" === i.activeElement.nodeName.toLowerCase() || "textarea" === i.activeElement.nodeName.toLowerCase()))) {
					if (t.params.keyboard.onlyInViewport && (p || u || c || h || v || f)) {
						var m = !1;
						if (t.$el.parents("." + t.params.slideClass).length > 0 && 0 === t.$el.parents("." + t.params.slideActiveClass).length) return;
						var g = a.innerWidth,
							y = a.innerHeight,
							w = t.$el.offset();
						s && (w.left -= t.$el[0].scrollLeft);
						for (var b = [
								[w.left, w.top],
								[w.left + t.width, w.top],
								[w.left, w.top + t.height],
								[w.left + t.width, w.top + t.height]
							], E = 0; E < b.length; E += 1) {
							var x = b[E];
							if (x[0] >= 0 && x[0] <= g && x[1] >= 0 && x[1] <= y) {
								if (0 === x[0] && 0 === x[1]) continue;
								m = !0
							}
						}
						if (!m) return
					}
					t.isHorizontal() ? ((p || u || c || h) && (n.preventDefault ? n.preventDefault() : n.returnValue = !1), ((u || h) && !s || (p || c) && s) && t.slideNext(), ((p || c) && !s || (u || h) && s) && t.slidePrev()) : ((p || u || v || f) && (n.preventDefault ? n.preventDefault() : n.returnValue = !1), (u || f) && t.slideNext(), (p || v) && t.slidePrev()), t.emit("keyPress", o)
				}
			},
			enable: function() {
				var e = this,
					t = r();
				e.keyboard.enabled || (m(t).on("keydown", e.keyboard.handle), e.keyboard.enabled = !0)
			},
			disable: function() {
				var e = this,
					t = r();
				e.keyboard.enabled && (m(t).off("keydown", e.keyboard.handle), e.keyboard.enabled = !1)
			}
		},
		_ = {
			name: "keyboard",
			params: {
				keyboard: {
					enabled: !1,
					onlyInViewport: !0,
					pageUpDown: !0
				}
			},
			create: function() {
				M(this, {
					keyboard: t({
						enabled: !1
					}, j)
				})
			},
			on: {
				init: function(e) {
					e.params.keyboard.enabled && e.keyboard.enable()
				},
				destroy: function(e) {
					e.keyboard.enabled && e.keyboard.disable()
				}
			}
		};
	var U = {
			lastScrollTime: x(),
			lastEventBeforeSnap: void 0,
			recentWheelEvents: [],
			event: function() {
				return l().navigator.userAgent.indexOf("firefox") > -1 ? "DOMMouseScroll" : function() {
					var e = r(),
						t = "onwheel",
						a = t in e;
					if (!a) {
						var i = e.createElement("div");
						i.setAttribute(t, "return;"), a = "function" == typeof i.onwheel
					}
					return !a && e.implementation && e.implementation.hasFeature && !0 !== e.implementation.hasFeature("", "") && (a = e.implementation.hasFeature("Events.wheel", "3.0")), a
				}() ? "wheel" : "mousewheel"
			},
			normalize: function(e) {
				var t = 0,
					a = 0,
					i = 0,
					s = 0;
				return "detail" in e && (a = e.detail), "wheelDelta" in e && (a = -e.wheelDelta / 120), "wheelDeltaY" in e && (a = -e.wheelDeltaY / 120), "wheelDeltaX" in e && (t = -e.wheelDeltaX / 120), "axis" in e && e.axis === e.HORIZONTAL_AXIS && (t = a, a = 0), i = 10 * t, s = 10 * a, "deltaY" in e && (s = e.deltaY), "deltaX" in e && (i = e.deltaX), e.shiftKey && !i && (i = s, s = 0), (i || s) && e.deltaMode && (1 === e.deltaMode ? (i *= 40, s *= 40) : (i *= 800, s *= 800)), i && !t && (t = i < 1 ? -1 : 1), s && !a && (a = s < 1 ? -1 : 1), {
					spinX: t,
					spinY: a,
					pixelX: i,
					pixelY: s
				}
			},
			handleMouseEnter: function() {
				this.mouseEntered = !0
			},
			handleMouseLeave: function() {
				this.mouseEntered = !1
			},
			handle: function(e) {
				var t = e,
					a = this,
					i = a.params.mousewheel;
				a.params.cssMode && t.preventDefault();
				var s = a.$el;
				if ("container" !== a.params.mousewheel.eventsTarget && (s = m(a.params.mousewheel.eventsTarget)), !a.mouseEntered && !s[0].contains(t.target) && !i.releaseOnEdges) return !0;
				t.originalEvent && (t = t.originalEvent);
				var r = 0,
					n = a.rtlTranslate ? -1 : 1,
					l = U.normalize(t);
				if (i.forceToAxis)
					if (a.isHorizontal()) {
						if (!(Math.abs(l.pixelX) > Math.abs(l.pixelY))) return !0;
						r = -l.pixelX * n
					} else {
						if (!(Math.abs(l.pixelY) > Math.abs(l.pixelX))) return !0;
						r = -l.pixelY
					}
				else r = Math.abs(l.pixelX) > Math.abs(l.pixelY) ? -l.pixelX * n : -l.pixelY;
				if (0 === r) return !0;
				i.invert && (r = -r);
				var o = a.getTranslate() + r * i.sensitivity;
				if (o >= a.minTranslate() && (o = a.minTranslate()), o <= a.maxTranslate() && (o = a.maxTranslate()), (!!a.params.loop || !(o === a.minTranslate() || o === a.maxTranslate())) && a.params.nested && t.stopPropagation(), a.params.freeMode) {
					var d = {
							time: x(),
							delta: Math.abs(r),
							direction: Math.sign(r)
						},
						p = a.mousewheel.lastEventBeforeSnap,
						u = p && d.time < p.time + 500 && d.delta <= p.delta && d.direction === p.direction;
					if (!u) {
						a.mousewheel.lastEventBeforeSnap = void 0, a.params.loop && a.loopFix();
						var c = a.getTranslate() + r * i.sensitivity,
							h = a.isBeginning,
							v = a.isEnd;
						if (c >= a.minTranslate() && (c = a.minTranslate()), c <= a.maxTranslate() && (c = a.maxTranslate()), a.setTransition(0), a.setTranslate(c), a.updateProgress(), a.updateActiveIndex(), a.updateSlidesClasses(), (!h && a.isBeginning || !v && a.isEnd) && a.updateSlidesClasses(), a.params.freeModeSticky) {
							clearTimeout(a.mousewheel.timeout), a.mousewheel.timeout = void 0;
							var f = a.mousewheel.recentWheelEvents;
							f.length >= 15 && f.shift();
							var g = f.length ? f[f.length - 1] : void 0,
								y = f[0];
							if (f.push(d), g && (d.delta > g.delta || d.direction !== g.direction)) f.splice(0);
							else if (f.length >= 15 && d.time - y.time < 500 && y.delta - d.delta >= 1 && d.delta <= 6) {
								var w = r > 0 ? .8 : .2;
								a.mousewheel.lastEventBeforeSnap = d, f.splice(0), a.mousewheel.timeout = E((function() {
									a.slideToClosest(a.params.speed, !0, void 0, w)
								}), 0)
							}
							a.mousewheel.timeout || (a.mousewheel.timeout = E((function() {
								a.mousewheel.lastEventBeforeSnap = d, f.splice(0), a.slideToClosest(a.params.speed, !0, void 0, .5)
							}), 500))
						}
						if (u || a.emit("scroll", t), a.params.autoplay && a.params.autoplayDisableOnInteraction && a.autoplay.stop(), c === a.minTranslate() || c === a.maxTranslate()) return !0
					}
				} else {
					var b = {
							time: x(),
							delta: Math.abs(r),
							direction: Math.sign(r),
							raw: e
						},
						T = a.mousewheel.recentWheelEvents;
					T.length >= 2 && T.shift();
					var C = T.length ? T[T.length - 1] : void 0;
					if (T.push(b), C ? (b.direction !== C.direction || b.delta > C.delta || b.time > C.time + 150) && a.mousewheel.animateSlider(b) : a.mousewheel.animateSlider(b), a.mousewheel.releaseScroll(b)) return !0
				}
				return t.preventDefault ? t.preventDefault() : t.returnValue = !1, !1
			},
			animateSlider: function(e) {
				var t = this,
					a = l();
				return !(this.params.mousewheel.thresholdDelta && e.delta < this.params.mousewheel.thresholdDelta) && (!(this.params.mousewheel.thresholdTime && x() - t.mousewheel.lastScrollTime < this.params.mousewheel.thresholdTime) && (e.delta >= 6 && x() - t.mousewheel.lastScrollTime < 60 || (e.direction < 0 ? t.isEnd && !t.params.loop || t.animating || (t.slideNext(), t.emit("scroll", e.raw)) : t.isBeginning && !t.params.loop || t.animating || (t.slidePrev(), t.emit("scroll", e.raw)), t.mousewheel.lastScrollTime = (new a.Date).getTime(), !1)))
			},
			releaseScroll: function(e) {
				var t = this,
					a = t.params.mousewheel;
				if (e.direction < 0) {
					if (t.isEnd && !t.params.loop && a.releaseOnEdges) return !0
				} else if (t.isBeginning && !t.params.loop && a.releaseOnEdges) return !0;
				return !1
			},
			enable: function() {
				var e = this,
					t = U.event();
				if (e.params.cssMode) return e.wrapperEl.removeEventListener(t, e.mousewheel.handle), !0;
				if (!t) return !1;
				if (e.mousewheel.enabled) return !1;
				var a = e.$el;
				return "container" !== e.params.mousewheel.eventsTarget && (a = m(e.params.mousewheel.eventsTarget)), a.on("mouseenter", e.mousewheel.handleMouseEnter), a.on("mouseleave", e.mousewheel.handleMouseLeave), a.on(t, e.mousewheel.handle), e.mousewheel.enabled = !0, !0
			},
			disable: function() {
				var e = this,
					t = U.event();
				if (e.params.cssMode) return e.wrapperEl.addEventListener(t, e.mousewheel.handle), !0;
				if (!t) return !1;
				if (!e.mousewheel.enabled) return !1;
				var a = e.$el;
				return "container" !== e.params.mousewheel.eventsTarget && (a = m(e.params.mousewheel.eventsTarget)), a.off(t, e.mousewheel.handle), e.mousewheel.enabled = !1, !0
			}
		},
		K = {
			update: function() {
				var e = this,
					t = e.params.navigation;
				if (!e.params.loop) {
					var a = e.navigation,
						i = a.$nextEl,
						s = a.$prevEl;
					s && s.length > 0 && (e.isBeginning ? s.addClass(t.disabledClass) : s.removeClass(t.disabledClass), s[e.params.watchOverflow && e.isLocked ? "addClass" : "removeClass"](t.lockClass)), i && i.length > 0 && (e.isEnd ? i.addClass(t.disabledClass) : i.removeClass(t.disabledClass), i[e.params.watchOverflow && e.isLocked ? "addClass" : "removeClass"](t.lockClass))
				}
			},
			onPrevClick: function(e) {
				var t = this;
				e.preventDefault(), t.isBeginning && !t.params.loop || t.slidePrev()
			},
			onNextClick: function(e) {
				var t = this;
				e.preventDefault(), t.isEnd && !t.params.loop || t.slideNext()
			},
			init: function() {
				var e, t, a = this,
					i = a.params.navigation;
				(i.nextEl || i.prevEl) && (i.nextEl && (e = m(i.nextEl), a.params.uniqueNavElements && "string" == typeof i.nextEl && e.length > 1 && 1 === a.$el.find(i.nextEl).length && (e = a.$el.find(i.nextEl))), i.prevEl && (t = m(i.prevEl), a.params.uniqueNavElements && "string" == typeof i.prevEl && t.length > 1 && 1 === a.$el.find(i.prevEl).length && (t = a.$el.find(i.prevEl))), e && e.length > 0 && e.on("click", a.navigation.onNextClick), t && t.length > 0 && t.on("click", a.navigation.onPrevClick), S(a.navigation, {
					$nextEl: e,
					nextEl: e && e[0],
					$prevEl: t,
					prevEl: t && t[0]
				}))
			},
			destroy: function() {
				var e = this,
					t = e.navigation,
					a = t.$nextEl,
					i = t.$prevEl;
				a && a.length && (a.off("click", e.navigation.onNextClick), a.removeClass(e.params.navigation.disabledClass)), i && i.length && (i.off("click", e.navigation.onPrevClick), i.removeClass(e.params.navigation.disabledClass))
			}
		},
		Z = {
			update: function() {
				var e = this,
					t = e.rtl,
					a = e.params.pagination;
				if (a.el && e.pagination.el && e.pagination.$el && 0 !== e.pagination.$el.length) {
					var i, s = e.virtual && e.params.virtual.enabled ? e.virtual.slides.length : e.slides.length,
						r = e.pagination.$el,
						n = e.params.loop ? Math.ceil((s - 2 * e.loopedSlides) / e.params.slidesPerGroup) : e.snapGrid.length;
					if (e.params.loop ? ((i = Math.ceil((e.activeIndex - e.loopedSlides) / e.params.slidesPerGroup)) > s - 1 - 2 * e.loopedSlides && (i -= s - 2 * e.loopedSlides), i > n - 1 && (i -= n), i < 0 && "bullets" !== e.params.paginationType && (i = n + i)) : i = void 0 !== e.snapIndex ? e.snapIndex : e.activeIndex || 0, "bullets" === a.type && e.pagination.bullets && e.pagination.bullets.length > 0) {
						var l, o, d, p = e.pagination.bullets;
						if (a.dynamicBullets && (e.pagination.bulletSize = p.eq(0)[e.isHorizontal() ? "outerWidth" : "outerHeight"](!0), r.css(e.isHorizontal() ? "width" : "height", e.pagination.bulletSize * (a.dynamicMainBullets + 4) + "px"), a.dynamicMainBullets > 1 && void 0 !== e.previousIndex && (e.pagination.dynamicBulletIndex += i - e.previousIndex, e.pagination.dynamicBulletIndex > a.dynamicMainBullets - 1 ? e.pagination.dynamicBulletIndex = a.dynamicMainBullets - 1 : e.pagination.dynamicBulletIndex < 0 && (e.pagination.dynamicBulletIndex = 0)), l = i - e.pagination.dynamicBulletIndex, d = ((o = l + (Math.min(p.length, a.dynamicMainBullets) - 1)) + l) / 2), p.removeClass(a.bulletActiveClass + " " + a.bulletActiveClass + "-next " + a.bulletActiveClass + "-next-next " + a.bulletActiveClass + "-prev " + a.bulletActiveClass + "-prev-prev " + a.bulletActiveClass + "-main"), r.length > 1) p.each((function(e) {
							var t = m(e),
								s = t.index();
							s === i && t.addClass(a.bulletActiveClass), a.dynamicBullets && (s >= l && s <= o && t.addClass(a.bulletActiveClass + "-main"), s === l && t.prev().addClass(a.bulletActiveClass + "-prev").prev().addClass(a.bulletActiveClass + "-prev-prev"), s === o && t.next().addClass(a.bulletActiveClass + "-next").next().addClass(a.bulletActiveClass + "-next-next"))
						}));
						else {
							var u = p.eq(i),
								c = u.index();
							if (u.addClass(a.bulletActiveClass), a.dynamicBullets) {
								for (var h = p.eq(l), v = p.eq(o), f = l; f <= o; f += 1) p.eq(f).addClass(a.bulletActiveClass + "-main");
								if (e.params.loop)
									if (c >= p.length - a.dynamicMainBullets) {
										for (var g = a.dynamicMainBullets; g >= 0; g -= 1) p.eq(p.length - g).addClass(a.bulletActiveClass + "-main");
										p.eq(p.length - a.dynamicMainBullets - 1).addClass(a.bulletActiveClass + "-prev")
									} else h.prev().addClass(a.bulletActiveClass + "-prev").prev().addClass(a.bulletActiveClass + "-prev-prev"), v.next().addClass(a.bulletActiveClass + "-next").next().addClass(a.bulletActiveClass + "-next-next");
								else h.prev().addClass(a.bulletActiveClass + "-prev").prev().addClass(a.bulletActiveClass + "-prev-prev"), v.next().addClass(a.bulletActiveClass + "-next").next().addClass(a.bulletActiveClass + "-next-next")
							}
						}
						if (a.dynamicBullets) {
							var y = Math.min(p.length, a.dynamicMainBullets + 4),
								w = (e.pagination.bulletSize * y - e.pagination.bulletSize) / 2 - d * e.pagination.bulletSize,
								b = t ? "right" : "left";
							p.css(e.isHorizontal() ? b : "top", w + "px")
						}
					}
					if ("fraction" === a.type && (r.find("." + a.currentClass).text(a.formatFractionCurrent(i + 1)), r.find("." + a.totalClass).text(a.formatFractionTotal(n))), "progressbar" === a.type) {
						var E;
						E = a.progressbarOpposite ? e.isHorizontal() ? "vertical" : "horizontal" : e.isHorizontal() ? "horizontal" : "vertical";
						var x = (i + 1) / n,
							T = 1,
							C = 1;
						"horizontal" === E ? T = x : C = x, r.find("." + a.progressbarFillClass).transform("translate3d(0,0,0) scaleX(" + T + ") scaleY(" + C + ")").transition(e.params.speed)
					}
					"custom" === a.type && a.renderCustom ? (r.html(a.renderCustom(e, i + 1, n)), e.emit("paginationRender", r[0])) : e.emit("paginationUpdate", r[0]), r[e.params.watchOverflow && e.isLocked ? "addClass" : "removeClass"](a.lockClass)
				}
			},
			render: function() {
				var e = this,
					t = e.params.pagination;
				if (t.el && e.pagination.el && e.pagination.$el && 0 !== e.pagination.$el.length) {
					var a = e.virtual && e.params.virtual.enabled ? e.virtual.slides.length : e.slides.length,
						i = e.pagination.$el,
						s = "";
					if ("bullets" === t.type) {
						for (var r = e.params.loop ? Math.ceil((a - 2 * e.loopedSlides) / e.params.slidesPerGroup) : e.snapGrid.length, n = 0; n < r; n += 1) t.renderBullet ? s += t.renderBullet.call(e, n, t.bulletClass) : s += "<" + t.bulletElement + ' class="' + t.bulletClass + '"></' + t.bulletElement + ">";
						i.html(s), e.pagination.bullets = i.find("." + t.bulletClass.replace(/ /g, "."))
					}
					"fraction" === t.type && (s = t.renderFraction ? t.renderFraction.call(e, t.currentClass, t.totalClass) : '<span class="' + t.currentClass + '"></span> / <span class="' + t.totalClass + '"></span>', i.html(s)), "progressbar" === t.type && (s = t.renderProgressbar ? t.renderProgressbar.call(e, t.progressbarFillClass) : '<span class="' + t.progressbarFillClass + '"></span>', i.html(s)), "custom" !== t.type && e.emit("paginationRender", e.pagination.$el[0])
				}
			},
			init: function() {
				var e = this,
					t = e.params.pagination;
				if (t.el) {
					var a = m(t.el);
					0 !== a.length && (e.params.uniqueNavElements && "string" == typeof t.el && a.length > 1 && (a = e.$el.find(t.el)), "bullets" === t.type && t.clickable && a.addClass(t.clickableClass), a.addClass(t.modifierClass + t.type), "bullets" === t.type && t.dynamicBullets && (a.addClass("" + t.modifierClass + t.type + "-dynamic"), e.pagination.dynamicBulletIndex = 0, t.dynamicMainBullets < 1 && (t.dynamicMainBullets = 1)), "progressbar" === t.type && t.progressbarOpposite && a.addClass(t.progressbarOppositeClass), t.clickable && a.on("click", "." + t.bulletClass.replace(/ /g, "."), (function(t) {
						t.preventDefault();
						var a = m(this).index() * e.params.slidesPerGroup;
						e.params.loop && (a += e.loopedSlides), e.slideTo(a)
					})), S(e.pagination, {
						$el: a,
						el: a[0]
					}))
				}
			},
			destroy: function() {
				var e = this,
					t = e.params.pagination;
				if (t.el && e.pagination.el && e.pagination.$el && 0 !== e.pagination.$el.length) {
					var a = e.pagination.$el;
					a.removeClass(t.hiddenClass), a.removeClass(t.modifierClass + t.type), e.pagination.bullets && e.pagination.bullets.removeClass(t.bulletActiveClass), t.clickable && a.off("click", "." + t.bulletClass.replace(/ /g, "."))
				}
			}
		},
		J = {
			setTranslate: function() {
				var e = this;
				if (e.params.scrollbar.el && e.scrollbar.el) {
					var t = e.scrollbar,
						a = e.rtlTranslate,
						i = e.progress,
						s = t.dragSize,
						r = t.trackSize,
						n = t.$dragEl,
						l = t.$el,
						o = e.params.scrollbar,
						d = s,
						p = (r - s) * i;
					a ? (p = -p) > 0 ? (d = s - p, p = 0) : -p + s > r && (d = r + p) : p < 0 ? (d = s + p, p = 0) : p + s > r && (d = r - p), e.isHorizontal() ? (n.transform("translate3d(" + p + "px, 0, 0)"), n[0].style.width = d + "px") : (n.transform("translate3d(0px, " + p + "px, 0)"), n[0].style.height = d + "px"), o.hide && (clearTimeout(e.scrollbar.timeout), l[0].style.opacity = 1, e.scrollbar.timeout = setTimeout((function() {
						l[0].style.opacity = 0, l.transition(400)
					}), 1e3))
				}
			},
			setTransition: function(e) {
				var t = this;
				t.params.scrollbar.el && t.scrollbar.el && t.scrollbar.$dragEl.transition(e)
			},
			updateSize: function() {
				var e = this;
				if (e.params.scrollbar.el && e.scrollbar.el) {
					var t = e.scrollbar,
						a = t.$dragEl,
						i = t.$el;
					a[0].style.width = "", a[0].style.height = "";
					var s, r = e.isHorizontal() ? i[0].offsetWidth : i[0].offsetHeight,
						n = e.size / e.virtualSize,
						l = n * (r / e.size);
					s = "auto" === e.params.scrollbar.dragSize ? r * n : parseInt(e.params.scrollbar.dragSize, 10), e.isHorizontal() ? a[0].style.width = s + "px" : a[0].style.height = s + "px", i[0].style.display = n >= 1 ? "none" : "", e.params.scrollbar.hide && (i[0].style.opacity = 0), S(t, {
						trackSize: r,
						divider: n,
						moveDivider: l,
						dragSize: s
					}), t.$el[e.params.watchOverflow && e.isLocked ? "addClass" : "removeClass"](e.params.scrollbar.lockClass)
				}
			},
			getPointerPosition: function(e) {
				return this.isHorizontal() ? "touchstart" === e.type || "touchmove" === e.type ? e.targetTouches[0].clientX : e.clientX : "touchstart" === e.type || "touchmove" === e.type ? e.targetTouches[0].clientY : e.clientY
			},
			setDragPosition: function(e) {
				var t, a = this,
					i = a.scrollbar,
					s = a.rtlTranslate,
					r = i.$el,
					n = i.dragSize,
					l = i.trackSize,
					o = i.dragStartPos;
				t = (i.getPointerPosition(e) - r.offset()[a.isHorizontal() ? "left" : "top"] - (null !== o ? o : n / 2)) / (l - n), t = Math.max(Math.min(t, 1), 0), s && (t = 1 - t);
				var d = a.minTranslate() + (a.maxTranslate() - a.minTranslate()) * t;
				a.updateProgress(d), a.setTranslate(d), a.updateActiveIndex(), a.updateSlidesClasses()
			},
			onDragStart: function(e) {
				var t = this,
					a = t.params.scrollbar,
					i = t.scrollbar,
					s = t.$wrapperEl,
					r = i.$el,
					n = i.$dragEl;
				t.scrollbar.isTouched = !0, t.scrollbar.dragStartPos = e.target === n[0] || e.target === n ? i.getPointerPosition(e) - e.target.getBoundingClientRect()[t.isHorizontal() ? "left" : "top"] : null, e.preventDefault(), e.stopPropagation(), s.transition(100), n.transition(100), i.setDragPosition(e), clearTimeout(t.scrollbar.dragTimeout), r.transition(0), a.hide && r.css("opacity", 1), t.params.cssMode && t.$wrapperEl.css("scroll-snap-type", "none"), t.emit("scrollbarDragStart", e)
			},
			onDragMove: function(e) {
				var t = this,
					a = t.scrollbar,
					i = t.$wrapperEl,
					s = a.$el,
					r = a.$dragEl;
				t.scrollbar.isTouched && (e.preventDefault ? e.preventDefault() : e.returnValue = !1, a.setDragPosition(e), i.transition(0), s.transition(0), r.transition(0), t.emit("scrollbarDragMove", e))
			},
			onDragEnd: function(e) {
				var t = this,
					a = t.params.scrollbar,
					i = t.scrollbar,
					s = t.$wrapperEl,
					r = i.$el;
				t.scrollbar.isTouched && (t.scrollbar.isTouched = !1, t.params.cssMode && (t.$wrapperEl.css("scroll-snap-type", ""), s.transition("")), a.hide && (clearTimeout(t.scrollbar.dragTimeout), t.scrollbar.dragTimeout = E((function() {
					r.css("opacity", 0), r.transition(400)
				}), 1e3)), t.emit("scrollbarDragEnd", e), a.snapOnRelease && t.slideToClosest())
			},
			enableDraggable: function() {
				var e = this;
				if (e.params.scrollbar.el) {
					var t = r(),
						a = e.scrollbar,
						i = e.touchEventsTouch,
						s = e.touchEventsDesktop,
						n = e.params,
						l = e.support,
						o = a.$el[0],
						d = !(!l.passiveListener || !n.passiveListeners) && {
							passive: !1,
							capture: !1
						},
						p = !(!l.passiveListener || !n.passiveListeners) && {
							passive: !0,
							capture: !1
						};
					l.touch ? (o.addEventListener(i.start, e.scrollbar.onDragStart, d), o.addEventListener(i.move, e.scrollbar.onDragMove, d), o.addEventListener(i.end, e.scrollbar.onDragEnd, p)) : (o.addEventListener(s.start, e.scrollbar.onDragStart, d), t.addEventListener(s.move, e.scrollbar.onDragMove, d), t.addEventListener(s.end, e.scrollbar.onDragEnd, p))
				}
			},
			disableDraggable: function() {
				var e = this;
				if (e.params.scrollbar.el) {
					var t = r(),
						a = e.scrollbar,
						i = e.touchEventsTouch,
						s = e.touchEventsDesktop,
						n = e.params,
						l = e.support,
						o = a.$el[0],
						d = !(!l.passiveListener || !n.passiveListeners) && {
							passive: !1,
							capture: !1
						},
						p = !(!l.passiveListener || !n.passiveListeners) && {
							passive: !0,
							capture: !1
						};
					l.touch ? (o.removeEventListener(i.start, e.scrollbar.onDragStart, d), o.removeEventListener(i.move, e.scrollbar.onDragMove, d), o.removeEventListener(i.end, e.scrollbar.onDragEnd, p)) : (o.removeEventListener(s.start, e.scrollbar.onDragStart, d), t.removeEventListener(s.move, e.scrollbar.onDragMove, d), t.removeEventListener(s.end, e.scrollbar.onDragEnd, p))
				}
			},
			init: function() {
				var e = this;
				if (e.params.scrollbar.el) {
					var t = e.scrollbar,
						a = e.$el,
						i = e.params.scrollbar,
						s = m(i.el);
					e.params.uniqueNavElements && "string" == typeof i.el && s.length > 1 && 1 === a.find(i.el).length && (s = a.find(i.el));
					var r = s.find("." + e.params.scrollbar.dragClass);
					0 === r.length && (r = m('<div class="' + e.params.scrollbar.dragClass + '"></div>'), s.append(r)), S(t, {
						$el: s,
						el: s[0],
						$dragEl: r,
						dragEl: r[0]
					}), i.draggable && t.enableDraggable()
				}
			},
			destroy: function() {
				this.scrollbar.disableDraggable()
			}
		},
		Q = {
			setTransform: function(e, t) {
				var a = this.rtl,
					i = m(e),
					s = a ? -1 : 1,
					r = i.attr("data-swiper-parallax") || "0",
					n = i.attr("data-swiper-parallax-x"),
					l = i.attr("data-swiper-parallax-y"),
					o = i.attr("data-swiper-parallax-scale"),
					d = i.attr("data-swiper-parallax-opacity");
				if (n || l ? (n = n || "0", l = l || "0") : this.isHorizontal() ? (n = r, l = "0") : (l = r, n = "0"), n = n.indexOf("%") >= 0 ? parseInt(n, 10) * t * s + "%" : n * t * s + "px", l = l.indexOf("%") >= 0 ? parseInt(l, 10) * t + "%" : l * t + "px", null != d) {
					var p = d - (d - 1) * (1 - Math.abs(t));
					i[0].style.opacity = p
				}
				if (null == o) i.transform("translate3d(" + n + ", " + l + ", 0px)");
				else {
					var u = o - (o - 1) * (1 - Math.abs(t));
					i.transform("translate3d(" + n + ", " + l + ", 0px) scale(" + u + ")")
				}
			},
			setTranslate: function() {
				var e = this,
					t = e.$el,
					a = e.slides,
					i = e.progress,
					s = e.snapGrid;
				t.children("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y], [data-swiper-parallax-opacity], [data-swiper-parallax-scale]").each((function(t) {
					e.parallax.setTransform(t, i)
				})), a.each((function(t, a) {
					var r = t.progress;
					e.params.slidesPerGroup > 1 && "auto" !== e.params.slidesPerView && (r += Math.ceil(a / 2) - i * (s.length - 1)), r = Math.min(Math.max(r, -1), 1), m(t).find("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y], [data-swiper-parallax-opacity], [data-swiper-parallax-scale]").each((function(t) {
						e.parallax.setTransform(t, r)
					}))
				}))
			},
			setTransition: function(e) {
				void 0 === e && (e = this.params.speed);
				this.$el.find("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y], [data-swiper-parallax-opacity], [data-swiper-parallax-scale]").each((function(t) {
					var a = m(t),
						i = parseInt(a.attr("data-swiper-parallax-duration"), 10) || e;
					0 === e && (i = 0), a.transition(i)
				}))
			}
		},
		ee = {
			getDistanceBetweenTouches: function(e) {
				if (e.targetTouches.length < 2) return 1;
				var t = e.targetTouches[0].pageX,
					a = e.targetTouches[0].pageY,
					i = e.targetTouches[1].pageX,
					s = e.targetTouches[1].pageY;
				return Math.sqrt(Math.pow(i - t, 2) + Math.pow(s - a, 2))
			},
			onGestureStart: function(e) {
				var t = this,
					a = t.support,
					i = t.params.zoom,
					s = t.zoom,
					r = s.gesture;
				if (s.fakeGestureTouched = !1, s.fakeGestureMoved = !1, !a.gestures) {
					if ("touchstart" !== e.type || "touchstart" === e.type && e.targetTouches.length < 2) return;
					s.fakeGestureTouched = !0, r.scaleStart = ee.getDistanceBetweenTouches(e)
				}
				r.$slideEl && r.$slideEl.length || (r.$slideEl = m(e.target).closest("." + t.params.slideClass), 0 === r.$slideEl.length && (r.$slideEl = t.slides.eq(t.activeIndex)), r.$imageEl = r.$slideEl.find("img, svg, canvas, picture, .swiper-zoom-target"), r.$imageWrapEl = r.$imageEl.parent("." + i.containerClass), r.maxRatio = r.$imageWrapEl.attr("data-swiper-zoom") || i.maxRatio, 0 !== r.$imageWrapEl.length) ? (r.$imageEl && r.$imageEl.transition(0), t.zoom.isScaling = !0) : r.$imageEl = void 0
			},
			onGestureChange: function(e) {
				var t = this,
					a = t.support,
					i = t.params.zoom,
					s = t.zoom,
					r = s.gesture;
				if (!a.gestures) {
					if ("touchmove" !== e.type || "touchmove" === e.type && e.targetTouches.length < 2) return;
					s.fakeGestureMoved = !0, r.scaleMove = ee.getDistanceBetweenTouches(e)
				}
				r.$imageEl && 0 !== r.$imageEl.length ? (a.gestures ? s.scale = e.scale * s.currentScale : s.scale = r.scaleMove / r.scaleStart * s.currentScale, s.scale > r.maxRatio && (s.scale = r.maxRatio - 1 + Math.pow(s.scale - r.maxRatio + 1, .5)), s.scale < i.minRatio && (s.scale = i.minRatio + 1 - Math.pow(i.minRatio - s.scale + 1, .5)), r.$imageEl.transform("translate3d(0,0,0) scale(" + s.scale + ")")) : "gesturechange" === e.type && s.onGestureStart(e)
			},
			onGestureEnd: function(e) {
				var t = this,
					a = t.device,
					i = t.support,
					s = t.params.zoom,
					r = t.zoom,
					n = r.gesture;
				if (!i.gestures) {
					if (!r.fakeGestureTouched || !r.fakeGestureMoved) return;
					if ("touchend" !== e.type || "touchend" === e.type && e.changedTouches.length < 2 && !a.android) return;
					r.fakeGestureTouched = !1, r.fakeGestureMoved = !1
				}
				n.$imageEl && 0 !== n.$imageEl.length && (r.scale = Math.max(Math.min(r.scale, n.maxRatio), s.minRatio), n.$imageEl.transition(t.params.speed).transform("translate3d(0,0,0) scale(" + r.scale + ")"), r.currentScale = r.scale, r.isScaling = !1, 1 === r.scale && (n.$slideEl = void 0))
			},
			onTouchStart: function(e) {
				var t = this.device,
					a = this.zoom,
					i = a.gesture,
					s = a.image;
				i.$imageEl && 0 !== i.$imageEl.length && (s.isTouched || (t.android && e.cancelable && e.preventDefault(), s.isTouched = !0, s.touchesStart.x = "touchstart" === e.type ? e.targetTouches[0].pageX : e.pageX, s.touchesStart.y = "touchstart" === e.type ? e.targetTouches[0].pageY : e.pageY))
			},
			onTouchMove: function(e) {
				var t = this,
					a = t.zoom,
					i = a.gesture,
					s = a.image,
					r = a.velocity;
				if (i.$imageEl && 0 !== i.$imageEl.length && (t.allowClick = !1, s.isTouched && i.$slideEl)) {
					s.isMoved || (s.width = i.$imageEl[0].offsetWidth, s.height = i.$imageEl[0].offsetHeight, s.startX = T(i.$imageWrapEl[0], "x") || 0, s.startY = T(i.$imageWrapEl[0], "y") || 0, i.slideWidth = i.$slideEl[0].offsetWidth, i.slideHeight = i.$slideEl[0].offsetHeight, i.$imageWrapEl.transition(0), t.rtl && (s.startX = -s.startX, s.startY = -s.startY));
					var n = s.width * a.scale,
						l = s.height * a.scale;
					if (!(n < i.slideWidth && l < i.slideHeight)) {
						if (s.minX = Math.min(i.slideWidth / 2 - n / 2, 0), s.maxX = -s.minX, s.minY = Math.min(i.slideHeight / 2 - l / 2, 0), s.maxY = -s.minY, s.touchesCurrent.x = "touchmove" === e.type ? e.targetTouches[0].pageX : e.pageX, s.touchesCurrent.y = "touchmove" === e.type ? e.targetTouches[0].pageY : e.pageY, !s.isMoved && !a.isScaling) {
							if (t.isHorizontal() && (Math.floor(s.minX) === Math.floor(s.startX) && s.touchesCurrent.x < s.touchesStart.x || Math.floor(s.maxX) === Math.floor(s.startX) && s.touchesCurrent.x > s.touchesStart.x)) return void(s.isTouched = !1);
							if (!t.isHorizontal() && (Math.floor(s.minY) === Math.floor(s.startY) && s.touchesCurrent.y < s.touchesStart.y || Math.floor(s.maxY) === Math.floor(s.startY) && s.touchesCurrent.y > s.touchesStart.y)) return void(s.isTouched = !1)
						}
						e.cancelable && e.preventDefault(), e.stopPropagation(), s.isMoved = !0, s.currentX = s.touchesCurrent.x - s.touchesStart.x + s.startX, s.currentY = s.touchesCurrent.y - s.touchesStart.y + s.startY, s.currentX < s.minX && (s.currentX = s.minX + 1 - Math.pow(s.minX - s.currentX + 1, .8)), s.currentX > s.maxX && (s.currentX = s.maxX - 1 + Math.pow(s.currentX - s.maxX + 1, .8)), s.currentY < s.minY && (s.currentY = s.minY + 1 - Math.pow(s.minY - s.currentY + 1, .8)), s.currentY > s.maxY && (s.currentY = s.maxY - 1 + Math.pow(s.currentY - s.maxY + 1, .8)), r.prevPositionX || (r.prevPositionX = s.touchesCurrent.x), r.prevPositionY || (r.prevPositionY = s.touchesCurrent.y), r.prevTime || (r.prevTime = Date.now()), r.x = (s.touchesCurrent.x - r.prevPositionX) / (Date.now() - r.prevTime) / 2, r.y = (s.touchesCurrent.y - r.prevPositionY) / (Date.now() - r.prevTime) / 2, Math.abs(s.touchesCurrent.x - r.prevPositionX) < 2 && (r.x = 0), Math.abs(s.touchesCurrent.y - r.prevPositionY) < 2 && (r.y = 0), r.prevPositionX = s.touchesCurrent.x, r.prevPositionY = s.touchesCurrent.y, r.prevTime = Date.now(), i.$imageWrapEl.transform("translate3d(" + s.currentX + "px, " + s.currentY + "px,0)")
					}
				}
			},
			onTouchEnd: function() {
				var e = this.zoom,
					t = e.gesture,
					a = e.image,
					i = e.velocity;
				if (t.$imageEl && 0 !== t.$imageEl.length) {
					if (!a.isTouched || !a.isMoved) return a.isTouched = !1, void(a.isMoved = !1);
					a.isTouched = !1, a.isMoved = !1;
					var s = 300,
						r = 300,
						n = i.x * s,
						l = a.currentX + n,
						o = i.y * r,
						d = a.currentY + o;
					0 !== i.x && (s = Math.abs((l - a.currentX) / i.x)), 0 !== i.y && (r = Math.abs((d - a.currentY) / i.y));
					var p = Math.max(s, r);
					a.currentX = l, a.currentY = d;
					var u = a.width * e.scale,
						c = a.height * e.scale;
					a.minX = Math.min(t.slideWidth / 2 - u / 2, 0), a.maxX = -a.minX, a.minY = Math.min(t.slideHeight / 2 - c / 2, 0), a.maxY = -a.minY, a.currentX = Math.max(Math.min(a.currentX, a.maxX), a.minX), a.currentY = Math.max(Math.min(a.currentY, a.maxY), a.minY), t.$imageWrapEl.transition(p).transform("translate3d(" + a.currentX + "px, " + a.currentY + "px,0)")
				}
			},
			onTransitionEnd: function() {
				var e = this,
					t = e.zoom,
					a = t.gesture;
				a.$slideEl && e.previousIndex !== e.activeIndex && (a.$imageEl && a.$imageEl.transform("translate3d(0,0,0) scale(1)"), a.$imageWrapEl && a.$imageWrapEl.transform("translate3d(0,0,0)"), t.scale = 1, t.currentScale = 1, a.$slideEl = void 0, a.$imageEl = void 0, a.$imageWrapEl = void 0)
			},
			toggle: function(e) {
				var t = this.zoom;
				t.scale && 1 !== t.scale ? t.out() : t.in(e)
			},
			in: function(e) {
				var t, a, i, s, r, n, l, o, d, p, u, c, h, v, f, m, g = this,
					y = g.zoom,
					w = g.params.zoom,
					b = y.gesture,
					E = y.image;
				(b.$slideEl || (g.params.virtual && g.params.virtual.enabled && g.virtual ? b.$slideEl = g.$wrapperEl.children("." + g.params.slideActiveClass) : b.$slideEl = g.slides.eq(g.activeIndex), b.$imageEl = b.$slideEl.find("img, svg, canvas, picture, .swiper-zoom-target"), b.$imageWrapEl = b.$imageEl.parent("." + w.containerClass)), b.$imageEl && 0 !== b.$imageEl.length) && (b.$slideEl.addClass("" + w.zoomedSlideClass), void 0 === E.touchesStart.x && e ? (t = "touchend" === e.type ? e.changedTouches[0].pageX : e.pageX, a = "touchend" === e.type ? e.changedTouches[0].pageY : e.pageY) : (t = E.touchesStart.x, a = E.touchesStart.y), y.scale = b.$imageWrapEl.attr("data-swiper-zoom") || w.maxRatio, y.currentScale = b.$imageWrapEl.attr("data-swiper-zoom") || w.maxRatio, e ? (f = b.$slideEl[0].offsetWidth, m = b.$slideEl[0].offsetHeight, i = b.$slideEl.offset().left + f / 2 - t, s = b.$slideEl.offset().top + m / 2 - a, l = b.$imageEl[0].offsetWidth, o = b.$imageEl[0].offsetHeight, d = l * y.scale, p = o * y.scale, h = -(u = Math.min(f / 2 - d / 2, 0)), v = -(c = Math.min(m / 2 - p / 2, 0)), (r = i * y.scale) < u && (r = u), r > h && (r = h), (n = s * y.scale) < c && (n = c), n > v && (n = v)) : (r = 0, n = 0), b.$imageWrapEl.transition(300).transform("translate3d(" + r + "px, " + n + "px,0)"), b.$imageEl.transition(300).transform("translate3d(0,0,0) scale(" + y.scale + ")"))
			},
			out: function() {
				var e = this,
					t = e.zoom,
					a = e.params.zoom,
					i = t.gesture;
				i.$slideEl || (e.params.virtual && e.params.virtual.enabled && e.virtual ? i.$slideEl = e.$wrapperEl.children("." + e.params.slideActiveClass) : i.$slideEl = e.slides.eq(e.activeIndex), i.$imageEl = i.$slideEl.find("img, svg, canvas, picture, .swiper-zoom-target"), i.$imageWrapEl = i.$imageEl.parent("." + a.containerClass)), i.$imageEl && 0 !== i.$imageEl.length && (t.scale = 1, t.currentScale = 1, i.$imageWrapEl.transition(300).transform("translate3d(0,0,0)"), i.$imageEl.transition(300).transform("translate3d(0,0,0) scale(1)"), i.$slideEl.removeClass("" + a.zoomedSlideClass), i.$slideEl = void 0)
			},
			toggleGestures: function(e) {
				var t = this,
					a = t.zoom,
					i = a.slideSelector,
					s = a.passiveListener;
				t.$wrapperEl[e]("gesturestart", i, a.onGestureStart, s), t.$wrapperEl[e]("gesturechange", i, a.onGestureChange, s), t.$wrapperEl[e]("gestureend", i, a.onGestureEnd, s)
			},
			enableGestures: function() {
				this.zoom.gesturesEnabled || (this.zoom.gesturesEnabled = !0, this.zoom.toggleGestures("on"))
			},
			disableGestures: function() {
				this.zoom.gesturesEnabled && (this.zoom.gesturesEnabled = !1, this.zoom.toggleGestures("off"))
			},
			enable: function() {
				var e = this,
					t = e.support,
					a = e.zoom;
				if (!a.enabled) {
					a.enabled = !0;
					var i = !("touchstart" !== e.touchEvents.start || !t.passiveListener || !e.params.passiveListeners) && {
							passive: !0,
							capture: !1
						},
						s = !t.passiveListener || {
							passive: !1,
							capture: !0
						},
						r = "." + e.params.slideClass;
					e.zoom.passiveListener = i, e.zoom.slideSelector = r, t.gestures ? (e.$wrapperEl.on(e.touchEvents.start, e.zoom.enableGestures, i), e.$wrapperEl.on(e.touchEvents.end, e.zoom.disableGestures, i)) : "touchstart" === e.touchEvents.start && (e.$wrapperEl.on(e.touchEvents.start, r, a.onGestureStart, i), e.$wrapperEl.on(e.touchEvents.move, r, a.onGestureChange, s), e.$wrapperEl.on(e.touchEvents.end, r, a.onGestureEnd, i), e.touchEvents.cancel && e.$wrapperEl.on(e.touchEvents.cancel, r, a.onGestureEnd, i)), e.$wrapperEl.on(e.touchEvents.move, "." + e.params.zoom.containerClass, a.onTouchMove, s)
				}
			},
			disable: function() {
				var e = this,
					t = e.zoom;
				if (t.enabled) {
					var a = e.support;
					e.zoom.enabled = !1;
					var i = !("touchstart" !== e.touchEvents.start || !a.passiveListener || !e.params.passiveListeners) && {
							passive: !0,
							capture: !1
						},
						s = !a.passiveListener || {
							passive: !1,
							capture: !0
						},
						r = "." + e.params.slideClass;
					a.gestures ? (e.$wrapperEl.off(e.touchEvents.start, e.zoom.enableGestures, i), e.$wrapperEl.off(e.touchEvents.end, e.zoom.disableGestures, i)) : "touchstart" === e.touchEvents.start && (e.$wrapperEl.off(e.touchEvents.start, r, t.onGestureStart, i), e.$wrapperEl.off(e.touchEvents.move, r, t.onGestureChange, s), e.$wrapperEl.off(e.touchEvents.end, r, t.onGestureEnd, i), e.touchEvents.cancel && e.$wrapperEl.off(e.touchEvents.cancel, r, t.onGestureEnd, i)), e.$wrapperEl.off(e.touchEvents.move, "." + e.params.zoom.containerClass, t.onTouchMove, s)
				}
			}
		},
		te = {
			loadInSlide: function(e, t) {
				void 0 === t && (t = !0);
				var a = this,
					i = a.params.lazy;
				if (void 0 !== e && 0 !== a.slides.length) {
					var s = a.virtual && a.params.virtual.enabled ? a.$wrapperEl.children("." + a.params.slideClass + '[data-swiper-slide-index="' + e + '"]') : a.slides.eq(e),
						r = s.find("." + i.elementClass + ":not(." + i.loadedClass + "):not(." + i.loadingClass + ")");
					!s.hasClass(i.elementClass) || s.hasClass(i.loadedClass) || s.hasClass(i.loadingClass) || r.push(s[0]), 0 !== r.length && r.each((function(e) {
						var r = m(e);
						r.addClass(i.loadingClass);
						var n = r.attr("data-background"),
							l = r.attr("data-src"),
							o = r.attr("data-srcset"),
							d = r.attr("data-sizes"),
							p = r.parent("picture");
						a.loadImage(r[0], l || n, o, d, !1, (function() {
							if (null != a && a && (!a || a.params) && !a.destroyed) {
								if (n ? (r.css("background-image", 'url("' + n + '")'), r.removeAttr("data-background")) : (o && (r.attr("srcset", o), r.removeAttr("data-srcset")), d && (r.attr("sizes", d), r.removeAttr("data-sizes")), p.length && p.children("source").each((function(e) {
										var t = m(e);
										t.attr("data-srcset") && (t.attr("srcset", t.attr("data-srcset")), t.removeAttr("data-srcset"))
									})), l && (r.attr("src", l), r.removeAttr("data-src"))), r.addClass(i.loadedClass).removeClass(i.loadingClass), s.find("." + i.preloaderClass).remove(), a.params.loop && t) {
									var e = s.attr("data-swiper-slide-index");
									if (s.hasClass(a.params.slideDuplicateClass)) {
										var u = a.$wrapperEl.children('[data-swiper-slide-index="' + e + '"]:not(.' + a.params.slideDuplicateClass + ")");
										a.lazy.loadInSlide(u.index(), !1)
									} else {
										var c = a.$wrapperEl.children("." + a.params.slideDuplicateClass + '[data-swiper-slide-index="' + e + '"]');
										a.lazy.loadInSlide(c.index(), !1)
									}
								}
								a.emit("lazyImageReady", s[0], r[0]), a.params.autoHeight && a.updateAutoHeight()
							}
						})), a.emit("lazyImageLoad", s[0], r[0])
					}))
				}
			},
			load: function() {
				var e = this,
					t = e.$wrapperEl,
					a = e.params,
					i = e.slides,
					s = e.activeIndex,
					r = e.virtual && a.virtual.enabled,
					n = a.lazy,
					l = a.slidesPerView;

				function o(e) {
					if (r) {
						if (t.children("." + a.slideClass + '[data-swiper-slide-index="' + e + '"]').length) return !0
					} else if (i[e]) return !0;
					return !1
				}

				function d(e) {
					return r ? m(e).attr("data-swiper-slide-index") : m(e).index()
				}
				if ("auto" === l && (l = 0), e.lazy.initialImageLoaded || (e.lazy.initialImageLoaded = !0), e.params.watchSlidesVisibility) t.children("." + a.slideVisibleClass).each((function(t) {
					var a = r ? m(t).attr("data-swiper-slide-index") : m(t).index();
					e.lazy.loadInSlide(a)
				}));
				else if (l > 1)
					for (var p = s; p < s + l; p += 1) o(p) && e.lazy.loadInSlide(p);
				else e.lazy.loadInSlide(s);
				if (n.loadPrevNext)
					if (l > 1 || n.loadPrevNextAmount && n.loadPrevNextAmount > 1) {
						for (var u = n.loadPrevNextAmount, c = l, h = Math.min(s + c + Math.max(u, c), i.length), v = Math.max(s - Math.max(c, u), 0), f = s + l; f < h; f += 1) o(f) && e.lazy.loadInSlide(f);
						for (var g = v; g < s; g += 1) o(g) && e.lazy.loadInSlide(g)
					} else {
						var y = t.children("." + a.slideNextClass);
						y.length > 0 && e.lazy.loadInSlide(d(y));
						var w = t.children("." + a.slidePrevClass);
						w.length > 0 && e.lazy.loadInSlide(d(w))
					}
			},
			checkInViewOnLoad: function() {
				var e = l(),
					t = this;
				if (t && !t.destroyed) {
					var a = t.params.lazy.scrollingElement ? m(t.params.lazy.scrollingElement) : m(e),
						i = a[0] === e,
						s = i ? e.innerWidth : a[0].offsetWidth,
						r = i ? e.innerHeight : a[0].offsetHeight,
						n = t.$el.offset(),
						o = !1;
					t.rtlTranslate && (n.left -= t.$el[0].scrollLeft);
					for (var d = [
							[n.left, n.top],
							[n.left + t.width, n.top],
							[n.left, n.top + t.height],
							[n.left + t.width, n.top + t.height]
						], p = 0; p < d.length; p += 1) {
						var u = d[p];
						if (u[0] >= 0 && u[0] <= s && u[1] >= 0 && u[1] <= r) {
							if (0 === u[0] && 0 === u[1]) continue;
							o = !0
						}
					}
					o ? (t.lazy.load(), a.off("scroll", t.lazy.checkInViewOnLoad)) : t.lazy.scrollHandlerAttached || (t.lazy.scrollHandlerAttached = !0, a.on("scroll", t.lazy.checkInViewOnLoad))
				}
			}
		},
		ae = {
			LinearSpline: function(e, t) {
				var a, i, s, r, n, l = function(e, t) {
					for (i = -1, a = e.length; a - i > 1;) e[s = a + i >> 1] <= t ? i = s : a = s;
					return a
				};
				return this.x = e, this.y = t, this.lastIndex = e.length - 1, this.interpolate = function(e) {
					return e ? (n = l(this.x, e), r = n - 1, (e - this.x[r]) * (this.y[n] - this.y[r]) / (this.x[n] - this.x[r]) + this.y[r]) : 0
				}, this
			},
			getInterpolateFunction: function(e) {
				var t = this;
				t.controller.spline || (t.controller.spline = t.params.loop ? new ae.LinearSpline(t.slidesGrid, e.slidesGrid) : new ae.LinearSpline(t.snapGrid, e.snapGrid))
			},
			setTranslate: function(e, t) {
				var a, i, s = this,
					r = s.controller.control,
					n = s.constructor;

				function l(e) {
					var t = s.rtlTranslate ? -s.translate : s.translate;
					"slide" === s.params.controller.by && (s.controller.getInterpolateFunction(e), i = -s.controller.spline.interpolate(-t)), i && "container" !== s.params.controller.by || (a = (e.maxTranslate() - e.minTranslate()) / (s.maxTranslate() - s.minTranslate()), i = (t - s.minTranslate()) * a + e.minTranslate()), s.params.controller.inverse && (i = e.maxTranslate() - i), e.updateProgress(i), e.setTranslate(i, s), e.updateActiveIndex(), e.updateSlidesClasses()
				}
				if (Array.isArray(r))
					for (var o = 0; o < r.length; o += 1) r[o] !== t && r[o] instanceof n && l(r[o]);
				else r instanceof n && t !== r && l(r)
			},
			setTransition: function(e, t) {
				var a, i = this,
					s = i.constructor,
					r = i.controller.control;

				function n(t) {
					t.setTransition(e, i), 0 !== e && (t.transitionStart(), t.params.autoHeight && E((function() {
						t.updateAutoHeight()
					})), t.$wrapperEl.transitionEnd((function() {
						r && (t.params.loop && "slide" === i.params.controller.by && t.loopFix(), t.transitionEnd())
					})))
				}
				if (Array.isArray(r))
					for (a = 0; a < r.length; a += 1) r[a] !== t && r[a] instanceof s && n(r[a]);
				else r instanceof s && t !== r && n(r)
			}
		},
		ie = {
			getRandomNumber: function(e) {
				void 0 === e && (e = 16);
				return "x".repeat(e).replace(/x/g, (function() {
					return Math.round(16 * Math.random()).toString(16)
				}))
			},
			makeElFocusable: function(e) {
				return e.attr("tabIndex", "0"), e
			},
			makeElNotFocusable: function(e) {
				return e.attr("tabIndex", "-1"), e
			},
			addElRole: function(e, t) {
				return e.attr("role", t), e
			},
			addElRoleDescription: function(e, t) {
				return e.attr("aria-role-description", t), e
			},
			addElControls: function(e, t) {
				return e.attr("aria-controls", t), e
			},
			addElLabel: function(e, t) {
				return e.attr("aria-label", t), e
			},
			addElId: function(e, t) {
				return e.attr("id", t), e
			},
			addElLive: function(e, t) {
				return e.attr("aria-live", t), e
			},
			disableEl: function(e) {
				return e.attr("aria-disabled", !0), e
			},
			enableEl: function(e) {
				return e.attr("aria-disabled", !1), e
			},
			onEnterKey: function(e) {
				var t = this,
					a = t.params.a11y;
				if (13 === e.keyCode) {
					var i = m(e.target);
					t.navigation && t.navigation.$nextEl && i.is(t.navigation.$nextEl) && (t.isEnd && !t.params.loop || t.slideNext(), t.isEnd ? t.a11y.notify(a.lastSlideMessage) : t.a11y.notify(a.nextSlideMessage)), t.navigation && t.navigation.$prevEl && i.is(t.navigation.$prevEl) && (t.isBeginning && !t.params.loop || t.slidePrev(), t.isBeginning ? t.a11y.notify(a.firstSlideMessage) : t.a11y.notify(a.prevSlideMessage)), t.pagination && i.is("." + t.params.pagination.bulletClass.replace(/ /g, ".")) && i[0].click()
				}
			},
			notify: function(e) {
				var t = this.a11y.liveRegion;
				0 !== t.length && (t.html(""), t.html(e))
			},
			updateNavigation: function() {
				var e = this;
				if (!e.params.loop && e.navigation) {
					var t = e.navigation,
						a = t.$nextEl,
						i = t.$prevEl;
					i && i.length > 0 && (e.isBeginning ? (e.a11y.disableEl(i), e.a11y.makeElNotFocusable(i)) : (e.a11y.enableEl(i), e.a11y.makeElFocusable(i))), a && a.length > 0 && (e.isEnd ? (e.a11y.disableEl(a), e.a11y.makeElNotFocusable(a)) : (e.a11y.enableEl(a), e.a11y.makeElFocusable(a)))
				}
			},
			updatePagination: function() {
				var e = this,
					t = e.params.a11y;
				e.pagination && e.params.pagination.clickable && e.pagination.bullets && e.pagination.bullets.length && e.pagination.bullets.each((function(a) {
					var i = m(a);
					e.a11y.makeElFocusable(i), e.params.pagination.renderBullet || (e.a11y.addElRole(i, "button"), e.a11y.addElLabel(i, t.paginationBulletMessage.replace(/\{\{index\}\}/, i.index() + 1)))
				}))
			},
			init: function() {
				var e = this,
					t = e.params.a11y;
				e.$el.append(e.a11y.liveRegion);
				var a = e.$el;
				t.containerRoleDescriptionMessage && e.a11y.addElRoleDescription(a, t.containerRoleDescriptionMessage), t.containerMessage && e.a11y.addElLabel(a, t.containerMessage);
				var i, s, r, n = e.$wrapperEl,
					l = n.attr("id") || "swiper-wrapper-" + e.a11y.getRandomNumber(16);
				e.a11y.addElId(n, l), i = e.params.autoplay && e.params.autoplay.enabled ? "off" : "polite", e.a11y.addElLive(n, i), t.itemRoleDescriptionMessage && e.a11y.addElRoleDescription(m(e.slides), t.itemRoleDescriptionMessage), e.a11y.addElRole(m(e.slides), "group"), e.slides.each((function(t) {
					var a = m(t);
					e.a11y.addElLabel(a, a.index() + 1 + " / " + e.slides.length)
				})), e.navigation && e.navigation.$nextEl && (s = e.navigation.$nextEl), e.navigation && e.navigation.$prevEl && (r = e.navigation.$prevEl), s && s.length && (e.a11y.makeElFocusable(s), "BUTTON" !== s[0].tagName && (e.a11y.addElRole(s, "button"), s.on("keydown", e.a11y.onEnterKey)), e.a11y.addElLabel(s, t.nextSlideMessage), e.a11y.addElControls(s, l)), r && r.length && (e.a11y.makeElFocusable(r), "BUTTON" !== r[0].tagName && (e.a11y.addElRole(r, "button"), r.on("keydown", e.a11y.onEnterKey)), e.a11y.addElLabel(r, t.prevSlideMessage), e.a11y.addElControls(r, l)), e.pagination && e.params.pagination.clickable && e.pagination.bullets && e.pagination.bullets.length && e.pagination.$el.on("keydown", "." + e.params.pagination.bulletClass.replace(/ /g, "."), e.a11y.onEnterKey)
			},
			destroy: function() {
				var e, t, a = this;
				a.a11y.liveRegion && a.a11y.liveRegion.length > 0 && a.a11y.liveRegion.remove(), a.navigation && a.navigation.$nextEl && (e = a.navigation.$nextEl), a.navigation && a.navigation.$prevEl && (t = a.navigation.$prevEl), e && e.off("keydown", a.a11y.onEnterKey), t && t.off("keydown", a.a11y.onEnterKey), a.pagination && a.params.pagination.clickable && a.pagination.bullets && a.pagination.bullets.length && a.pagination.$el.off("keydown", "." + a.params.pagination.bulletClass.replace(/ /g, "."), a.a11y.onEnterKey)
			}
		},
		se = {
			init: function() {
				var e = this,
					t = l();
				if (e.params.history) {
					if (!t.history || !t.history.pushState) return e.params.history.enabled = !1, void(e.params.hashNavigation.enabled = !0);
					var a = e.history;
					a.initialized = !0, a.paths = se.getPathValues(e.params.url), (a.paths.key || a.paths.value) && (a.scrollToSlide(0, a.paths.value, e.params.runCallbacksOnInit), e.params.history.replaceState || t.addEventListener("popstate", e.history.setHistoryPopState))
				}
			},
			destroy: function() {
				var e = l();
				this.params.history.replaceState || e.removeEventListener("popstate", this.history.setHistoryPopState)
			},
			setHistoryPopState: function() {
				var e = this;
				e.history.paths = se.getPathValues(e.params.url), e.history.scrollToSlide(e.params.speed, e.history.paths.value, !1)
			},
			getPathValues: function(e) {
				var t = l(),
					a = (e ? new URL(e) : t.location).pathname.slice(1).split("/").filter((function(e) {
						return "" !== e
					})),
					i = a.length;
				return {
					key: a[i - 2],
					value: a[i - 1]
				}
			},
			setHistory: function(e, t) {
				var a = this,
					i = l();
				if (a.history.initialized && a.params.history.enabled) {
					var s;
					s = a.params.url ? new URL(a.params.url) : i.location;
					var r = a.slides.eq(t),
						n = se.slugify(r.attr("data-history"));
					s.pathname.includes(e) || (n = e + "/" + n);
					var o = i.history.state;
					o && o.value === n || (a.params.history.replaceState ? i.history.replaceState({
						value: n
					}, null, n) : i.history.pushState({
						value: n
					}, null, n))
				}
			},
			slugify: function(e) {
				return e.toString().replace(/\s+/g, "-").replace(/[^\w-]+/g, "").replace(/--+/g, "-").replace(/^-+/, "").replace(/-+$/, "")
			},
			scrollToSlide: function(e, t, a) {
				var i = this;
				if (t)
					for (var s = 0, r = i.slides.length; s < r; s += 1) {
						var n = i.slides.eq(s);
						if (se.slugify(n.attr("data-history")) === t && !n.hasClass(i.params.slideDuplicateClass)) {
							var l = n.index();
							i.slideTo(l, e, a)
						}
					} else i.slideTo(0, e, a)
			}
		},
		re = {
			onHashCange: function() {
				var e = this,
					t = r();
				e.emit("hashChange");
				var a = t.location.hash.replace("#", "");
				if (a !== e.slides.eq(e.activeIndex).attr("data-hash")) {
					var i = e.$wrapperEl.children("." + e.params.slideClass + '[data-hash="' + a + '"]').index();
					if (void 0 === i) return;
					e.slideTo(i)
				}
			},
			setHash: function() {
				var e = this,
					t = l(),
					a = r();
				if (e.hashNavigation.initialized && e.params.hashNavigation.enabled)
					if (e.params.hashNavigation.replaceState && t.history && t.history.replaceState) t.history.replaceState(null, null, "#" + e.slides.eq(e.activeIndex).attr("data-hash") || ""), e.emit("hashSet");
					else {
						var i = e.slides.eq(e.activeIndex),
							s = i.attr("data-hash") || i.attr("data-history");
						a.location.hash = s || "", e.emit("hashSet")
					}
			},
			init: function() {
				var e = this,
					t = r(),
					a = l();
				if (!(!e.params.hashNavigation.enabled || e.params.history && e.params.history.enabled)) {
					e.hashNavigation.initialized = !0;
					var i = t.location.hash.replace("#", "");
					if (i)
						for (var s = 0, n = e.slides.length; s < n; s += 1) {
							var o = e.slides.eq(s);
							if ((o.attr("data-hash") || o.attr("data-history")) === i && !o.hasClass(e.params.slideDuplicateClass)) {
								var d = o.index();
								e.slideTo(d, 0, e.params.runCallbacksOnInit, !0)
							}
						}
					e.params.hashNavigation.watchState && m(a).on("hashchange", e.hashNavigation.onHashCange)
				}
			},
			destroy: function() {
				var e = l();
				this.params.hashNavigation.watchState && m(e).off("hashchange", this.hashNavigation.onHashCange)
			}
		},
		ne = {
			run: function() {
				var e = this,
					t = e.slides.eq(e.activeIndex),
					a = e.params.autoplay.delay;
				t.attr("data-swiper-autoplay") && (a = t.attr("data-swiper-autoplay") || e.params.autoplay.delay), clearTimeout(e.autoplay.timeout), e.autoplay.timeout = E((function() {
					var t;
					e.params.autoplay.reverseDirection ? e.params.loop ? (e.loopFix(), t = e.slidePrev(e.params.speed, !0, !0), e.emit("autoplay")) : e.isBeginning ? e.params.autoplay.stopOnLastSlide ? e.autoplay.stop() : (t = e.slideTo(e.slides.length - 1, e.params.speed, !0, !0), e.emit("autoplay")) : (t = e.slidePrev(e.params.speed, !0, !0), e.emit("autoplay")) : e.params.loop ? (e.loopFix(), t = e.slideNext(e.params.speed, !0, !0), e.emit("autoplay")) : e.isEnd ? e.params.autoplay.stopOnLastSlide ? e.autoplay.stop() : (t = e.slideTo(0, e.params.speed, !0, !0), e.emit("autoplay")) : (t = e.slideNext(e.params.speed, !0, !0), e.emit("autoplay")), (e.params.cssMode && e.autoplay.running || !1 === t) && e.autoplay.run()
				}), a)
			},
			start: function() {
				var e = this;
				return void 0 === e.autoplay.timeout && (!e.autoplay.running && (e.autoplay.running = !0, e.emit("autoplayStart"), e.autoplay.run(), !0))
			},
			stop: function() {
				var e = this;
				return !!e.autoplay.running && (void 0 !== e.autoplay.timeout && (e.autoplay.timeout && (clearTimeout(e.autoplay.timeout), e.autoplay.timeout = void 0), e.autoplay.running = !1, e.emit("autoplayStop"), !0))
			},
			pause: function(e) {
				var t = this;
				t.autoplay.running && (t.autoplay.paused || (t.autoplay.timeout && clearTimeout(t.autoplay.timeout), t.autoplay.paused = !0, 0 !== e && t.params.autoplay.waitForTransition ? (t.$wrapperEl[0].addEventListener("transitionend", t.autoplay.onTransitionEnd), t.$wrapperEl[0].addEventListener("webkitTransitionEnd", t.autoplay.onTransitionEnd)) : (t.autoplay.paused = !1, t.autoplay.run())))
			},
			onVisibilityChange: function() {
				var e = this,
					t = r();
				"hidden" === t.visibilityState && e.autoplay.running && e.autoplay.pause(), "visible" === t.visibilityState && e.autoplay.paused && (e.autoplay.run(), e.autoplay.paused = !1)
			},
			onTransitionEnd: function(e) {
				var t = this;
				t && !t.destroyed && t.$wrapperEl && e.target === t.$wrapperEl[0] && (t.$wrapperEl[0].removeEventListener("transitionend", t.autoplay.onTransitionEnd), t.$wrapperEl[0].removeEventListener("webkitTransitionEnd", t.autoplay.onTransitionEnd), t.autoplay.paused = !1, t.autoplay.running ? t.autoplay.run() : t.autoplay.stop())
			}
		},
		le = {
			setTranslate: function() {
				for (var e = this, t = e.slides, a = 0; a < t.length; a += 1) {
					var i = e.slides.eq(a),
						s = -i[0].swiperSlideOffset;
					e.params.virtualTranslate || (s -= e.translate);
					var r = 0;
					e.isHorizontal() || (r = s, s = 0);
					var n = e.params.fadeEffect.crossFade ? Math.max(1 - Math.abs(i[0].progress), 0) : 1 + Math.min(Math.max(i[0].progress, -1), 0);
					i.css({
						opacity: n
					}).transform("translate3d(" + s + "px, " + r + "px, 0px)")
				}
			},
			setTransition: function(e) {
				var t = this,
					a = t.slides,
					i = t.$wrapperEl;
				if (a.transition(e), t.params.virtualTranslate && 0 !== e) {
					var s = !1;
					a.transitionEnd((function() {
						if (!s && t && !t.destroyed) {
							s = !0, t.animating = !1;
							for (var e = ["webkitTransitionEnd", "transitionend"], a = 0; a < e.length; a += 1) i.trigger(e[a])
						}
					}))
				}
			}
		},
		oe = {
			setTranslate: function() {
				var e, t = this,
					a = t.$el,
					i = t.$wrapperEl,
					s = t.slides,
					r = t.width,
					n = t.height,
					l = t.rtlTranslate,
					o = t.size,
					d = t.browser,
					p = t.params.cubeEffect,
					u = t.isHorizontal(),
					c = t.virtual && t.params.virtual.enabled,
					h = 0;
				p.shadow && (u ? (0 === (e = i.find(".swiper-cube-shadow")).length && (e = m('<div class="swiper-cube-shadow"></div>'), i.append(e)), e.css({
					height: r + "px"
				})) : 0 === (e = a.find(".swiper-cube-shadow")).length && (e = m('<div class="swiper-cube-shadow"></div>'), a.append(e)));
				for (var v = 0; v < s.length; v += 1) {
					var f = s.eq(v),
						g = v;
					c && (g = parseInt(f.attr("data-swiper-slide-index"), 10));
					var y = 90 * g,
						w = Math.floor(y / 360);
					l && (y = -y, w = Math.floor(-y / 360));
					var b = Math.max(Math.min(f[0].progress, 1), -1),
						E = 0,
						x = 0,
						T = 0;
					g % 4 == 0 ? (E = 4 * -w * o, T = 0) : (g - 1) % 4 == 0 ? (E = 0, T = 4 * -w * o) : (g - 2) % 4 == 0 ? (E = o + 4 * w * o, T = o) : (g - 3) % 4 == 0 && (E = -o, T = 3 * o + 4 * o * w), l && (E = -E), u || (x = E, E = 0);
					var C = "rotateX(" + (u ? 0 : -y) + "deg) rotateY(" + (u ? y : 0) + "deg) translate3d(" + E + "px, " + x + "px, " + T + "px)";
					if (b <= 1 && b > -1 && (h = 90 * g + 90 * b, l && (h = 90 * -g - 90 * b)), f.transform(C), p.slideShadows) {
						var S = u ? f.find(".swiper-slide-shadow-left") : f.find(".swiper-slide-shadow-top"),
							M = u ? f.find(".swiper-slide-shadow-right") : f.find(".swiper-slide-shadow-bottom");
						0 === S.length && (S = m('<div class="swiper-slide-shadow-' + (u ? "left" : "top") + '"></div>'), f.append(S)), 0 === M.length && (M = m('<div class="swiper-slide-shadow-' + (u ? "right" : "bottom") + '"></div>'), f.append(M)), S.length && (S[0].style.opacity = Math.max(-b, 0)), M.length && (M[0].style.opacity = Math.max(b, 0))
					}
				}
				if (i.css({
						"-webkit-transform-origin": "50% 50% -" + o / 2 + "px",
						"-moz-transform-origin": "50% 50% -" + o / 2 + "px",
						"-ms-transform-origin": "50% 50% -" + o / 2 + "px",
						"transform-origin": "50% 50% -" + o / 2 + "px"
					}), p.shadow)
					if (u) e.transform("translate3d(0px, " + (r / 2 + p.shadowOffset) + "px, " + -r / 2 + "px) rotateX(90deg) rotateZ(0deg) scale(" + p.shadowScale + ")");
					else {
						var z = Math.abs(h) - 90 * Math.floor(Math.abs(h) / 90),
							P = 1.5 - (Math.sin(2 * z * Math.PI / 360) / 2 + Math.cos(2 * z * Math.PI / 360) / 2),
							k = p.shadowScale,
							L = p.shadowScale / P,
							$ = p.shadowOffset;
						e.transform("scale3d(" + k + ", 1, " + L + ") translate3d(0px, " + (n / 2 + $) + "px, " + -n / 2 / L + "px) rotateX(-90deg)")
					} var I = d.isSafari || d.isWebView ? -o / 2 : 0;
				i.transform("translate3d(0px,0," + I + "px) rotateX(" + (t.isHorizontal() ? 0 : h) + "deg) rotateY(" + (t.isHorizontal() ? -h : 0) + "deg)")
			},
			setTransition: function(e) {
				var t = this,
					a = t.$el;
				t.slides.transition(e).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(e), t.params.cubeEffect.shadow && !t.isHorizontal() && a.find(".swiper-cube-shadow").transition(e)
			}
		},
		de = {
			setTranslate: function() {
				for (var e = this, t = e.slides, a = e.rtlTranslate, i = 0; i < t.length; i += 1) {
					var s = t.eq(i),
						r = s[0].progress;
					e.params.flipEffect.limitRotation && (r = Math.max(Math.min(s[0].progress, 1), -1));
					var n = -180 * r,
						l = 0,
						o = -s[0].swiperSlideOffset,
						d = 0;
					if (e.isHorizontal() ? a && (n = -n) : (d = o, o = 0, l = -n, n = 0), s[0].style.zIndex = -Math.abs(Math.round(r)) + t.length, e.params.flipEffect.slideShadows) {
						var p = e.isHorizontal() ? s.find(".swiper-slide-shadow-left") : s.find(".swiper-slide-shadow-top"),
							u = e.isHorizontal() ? s.find(".swiper-slide-shadow-right") : s.find(".swiper-slide-shadow-bottom");
						0 === p.length && (p = m('<div class="swiper-slide-shadow-' + (e.isHorizontal() ? "left" : "top") + '"></div>'), s.append(p)), 0 === u.length && (u = m('<div class="swiper-slide-shadow-' + (e.isHorizontal() ? "right" : "bottom") + '"></div>'), s.append(u)), p.length && (p[0].style.opacity = Math.max(-r, 0)), u.length && (u[0].style.opacity = Math.max(r, 0))
					}
					s.transform("translate3d(" + o + "px, " + d + "px, 0px) rotateX(" + l + "deg) rotateY(" + n + "deg)")
				}
			},
			setTransition: function(e) {
				var t = this,
					a = t.slides,
					i = t.activeIndex,
					s = t.$wrapperEl;
				if (a.transition(e).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(e), t.params.virtualTranslate && 0 !== e) {
					var r = !1;
					a.eq(i).transitionEnd((function() {
						if (!r && t && !t.destroyed) {
							r = !0, t.animating = !1;
							for (var e = ["webkitTransitionEnd", "transitionend"], a = 0; a < e.length; a += 1) s.trigger(e[a])
						}
					}))
				}
			}
		},
		pe = {
			setTranslate: function() {
				for (var e = this, t = e.width, a = e.height, i = e.slides, s = e.slidesSizesGrid, r = e.params.coverflowEffect, n = e.isHorizontal(), l = e.translate, o = n ? t / 2 - l : a / 2 - l, d = n ? r.rotate : -r.rotate, p = r.depth, u = 0, c = i.length; u < c; u += 1) {
					var h = i.eq(u),
						v = s[u],
						f = (o - h[0].swiperSlideOffset - v / 2) / v * r.modifier,
						g = n ? d * f : 0,
						y = n ? 0 : d * f,
						w = -p * Math.abs(f),
						b = r.stretch;
					"string" == typeof b && -1 !== b.indexOf("%") && (b = parseFloat(r.stretch) / 100 * v);
					var E = n ? 0 : b * f,
						x = n ? b * f : 0,
						T = 1 - (1 - r.scale) * Math.abs(f);
					Math.abs(x) < .001 && (x = 0), Math.abs(E) < .001 && (E = 0), Math.abs(w) < .001 && (w = 0), Math.abs(g) < .001 && (g = 0), Math.abs(y) < .001 && (y = 0), Math.abs(T) < .001 && (T = 0);
					var C = "translate3d(" + x + "px," + E + "px," + w + "px)  rotateX(" + y + "deg) rotateY(" + g + "deg) scale(" + T + ")";
					if (h.transform(C), h[0].style.zIndex = 1 - Math.abs(Math.round(f)), r.slideShadows) {
						var S = n ? h.find(".swiper-slide-shadow-left") : h.find(".swiper-slide-shadow-top"),
							M = n ? h.find(".swiper-slide-shadow-right") : h.find(".swiper-slide-shadow-bottom");
						0 === S.length && (S = m('<div class="swiper-slide-shadow-' + (n ? "left" : "top") + '"></div>'), h.append(S)), 0 === M.length && (M = m('<div class="swiper-slide-shadow-' + (n ? "right" : "bottom") + '"></div>'), h.append(M)), S.length && (S[0].style.opacity = f > 0 ? f : 0), M.length && (M[0].style.opacity = -f > 0 ? -f : 0)
					}
				}
			},
			setTransition: function(e) {
				this.slides.transition(e).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(e)
			}
		},
		ue = {
			init: function() {
				var e = this,
					t = e.params.thumbs;
				if (e.thumbs.initialized) return !1;
				e.thumbs.initialized = !0;
				var a = e.constructor;
				return t.swiper instanceof a ? (e.thumbs.swiper = t.swiper, S(e.thumbs.swiper.originalParams, {
					watchSlidesProgress: !0,
					slideToClickedSlide: !1
				}), S(e.thumbs.swiper.params, {
					watchSlidesProgress: !0,
					slideToClickedSlide: !1
				})) : C(t.swiper) && (e.thumbs.swiper = new a(S({}, t.swiper, {
					watchSlidesVisibility: !0,
					watchSlidesProgress: !0,
					slideToClickedSlide: !1
				})), e.thumbs.swiperCreated = !0), e.thumbs.swiper.$el.addClass(e.params.thumbs.thumbsContainerClass), e.thumbs.swiper.on("tap", e.thumbs.onThumbClick), !0
			},
			onThumbClick: function() {
				var e = this,
					t = e.thumbs.swiper;
				if (t) {
					var a = t.clickedIndex,
						i = t.clickedSlide;
					if (!(i && m(i).hasClass(e.params.thumbs.slideThumbActiveClass) || null == a)) {
						var s;
						if (s = t.params.loop ? parseInt(m(t.clickedSlide).attr("data-swiper-slide-index"), 10) : a, e.params.loop) {
							var r = e.activeIndex;
							e.slides.eq(r).hasClass(e.params.slideDuplicateClass) && (e.loopFix(), e._clientLeft = e.$wrapperEl[0].clientLeft, r = e.activeIndex);
							var n = e.slides.eq(r).prevAll('[data-swiper-slide-index="' + s + '"]').eq(0).index(),
								l = e.slides.eq(r).nextAll('[data-swiper-slide-index="' + s + '"]').eq(0).index();
							s = void 0 === n ? l : void 0 === l ? n : l - r < r - n ? l : n
						}
						e.slideTo(s)
					}
				}
			},
			update: function(e) {
				var t = this,
					a = t.thumbs.swiper;
				if (a) {
					var i = "auto" === a.params.slidesPerView ? a.slidesPerViewDynamic() : a.params.slidesPerView,
						s = t.params.thumbs.autoScrollOffset,
						r = s && !a.params.loop;
					if (t.realIndex !== a.realIndex || r) {
						var n, l, o = a.activeIndex;
						if (a.params.loop) {
							a.slides.eq(o).hasClass(a.params.slideDuplicateClass) && (a.loopFix(), a._clientLeft = a.$wrapperEl[0].clientLeft, o = a.activeIndex);
							var d = a.slides.eq(o).prevAll('[data-swiper-slide-index="' + t.realIndex + '"]').eq(0).index(),
								p = a.slides.eq(o).nextAll('[data-swiper-slide-index="' + t.realIndex + '"]').eq(0).index();
							n = void 0 === d ? p : void 0 === p ? d : p - o == o - d ? o : p - o < o - d ? p : d, l = t.activeIndex > t.previousIndex ? "next" : "prev"
						} else l = (n = t.realIndex) > t.previousIndex ? "next" : "prev";
						r && (n += "next" === l ? s : -1 * s), a.visibleSlidesIndexes && a.visibleSlidesIndexes.indexOf(n) < 0 && (a.params.centeredSlides ? n = n > o ? n - Math.floor(i / 2) + 1 : n + Math.floor(i / 2) - 1 : n > o && (n = n - i + 1), a.slideTo(n, e ? 0 : void 0))
					}
					var u = 1,
						c = t.params.thumbs.slideThumbActiveClass;
					if (t.params.slidesPerView > 1 && !t.params.centeredSlides && (u = t.params.slidesPerView), t.params.thumbs.multipleActiveThumbs || (u = 1), u = Math.floor(u), a.slides.removeClass(c), a.params.loop || a.params.virtual && a.params.virtual.enabled)
						for (var h = 0; h < u; h += 1) a.$wrapperEl.children('[data-swiper-slide-index="' + (t.realIndex + h) + '"]').addClass(c);
					else
						for (var v = 0; v < u; v += 1) a.slides.eq(t.realIndex + v).addClass(c)
				}
			}
		},
		ce = [q, _, {
			name: "mousewheel",
			params: {
				mousewheel: {
					enabled: !1,
					releaseOnEdges: !1,
					invert: !1,
					forceToAxis: !1,
					sensitivity: 1,
					eventsTarget: "container",
					thresholdDelta: null,
					thresholdTime: null
				}
			},
			create: function() {
				M(this, {
					mousewheel: {
						enabled: !1,
						lastScrollTime: x(),
						lastEventBeforeSnap: void 0,
						recentWheelEvents: [],
						enable: U.enable,
						disable: U.disable,
						handle: U.handle,
						handleMouseEnter: U.handleMouseEnter,
						handleMouseLeave: U.handleMouseLeave,
						animateSlider: U.animateSlider,
						releaseScroll: U.releaseScroll
					}
				})
			},
			on: {
				init: function(e) {
					!e.params.mousewheel.enabled && e.params.cssMode && e.mousewheel.disable(), e.params.mousewheel.enabled && e.mousewheel.enable()
				},
				destroy: function(e) {
					e.params.cssMode && e.mousewheel.enable(), e.mousewheel.enabled && e.mousewheel.disable()
				}
			}
		}, {
			name: "navigation",
			params: {
				navigation: {
					nextEl: null,
					prevEl: null,
					hideOnClick: !1,
					disabledClass: "swiper-button-disabled",
					hiddenClass: "swiper-button-hidden",
					lockClass: "swiper-button-lock"
				}
			},
			create: function() {
				M(this, {
					navigation: t({}, K)
				})
			},
			on: {
				init: function(e) {
					e.navigation.init(), e.navigation.update()
				},
				toEdge: function(e) {
					e.navigation.update()
				},
				fromEdge: function(e) {
					e.navigation.update()
				},
				destroy: function(e) {
					e.navigation.destroy()
				},
				click: function(e, t) {
					var a, i = e.navigation,
						s = i.$nextEl,
						r = i.$prevEl;
					!e.params.navigation.hideOnClick || m(t.target).is(r) || m(t.target).is(s) || (s ? a = s.hasClass(e.params.navigation.hiddenClass) : r && (a = r.hasClass(e.params.navigation.hiddenClass)), !0 === a ? e.emit("navigationShow") : e.emit("navigationHide"), s && s.toggleClass(e.params.navigation.hiddenClass), r && r.toggleClass(e.params.navigation.hiddenClass))
				}
			}
		}, {
			name: "pagination",
			params: {
				pagination: {
					el: null,
					bulletElement: "span",
					clickable: !1,
					hideOnClick: !1,
					renderBullet: null,
					renderProgressbar: null,
					renderFraction: null,
					renderCustom: null,
					progressbarOpposite: !1,
					type: "bullets",
					dynamicBullets: !1,
					dynamicMainBullets: 1,
					formatFractionCurrent: function(e) {
						return e
					},
					formatFractionTotal: function(e) {
						return e
					},
					bulletClass: "swiper-pagination-bullet",
					bulletActiveClass: "swiper-pagination-bullet-active",
					modifierClass: "swiper-pagination-",
					currentClass: "swiper-pagination-current",
					totalClass: "swiper-pagination-total",
					hiddenClass: "swiper-pagination-hidden",
					progressbarFillClass: "swiper-pagination-progressbar-fill",
					progressbarOppositeClass: "swiper-pagination-progressbar-opposite",
					clickableClass: "swiper-pagination-clickable",
					lockClass: "swiper-pagination-lock"
				}
			},
			create: function() {
				M(this, {
					pagination: t({
						dynamicBulletIndex: 0
					}, Z)
				})
			},
			on: {
				init: function(e) {
					e.pagination.init(), e.pagination.render(), e.pagination.update()
				},
				activeIndexChange: function(e) {
					(e.params.loop || void 0 === e.snapIndex) && e.pagination.update()
				},
				snapIndexChange: function(e) {
					e.params.loop || e.pagination.update()
				},
				slidesLengthChange: function(e) {
					e.params.loop && (e.pagination.render(), e.pagination.update())
				},
				snapGridLengthChange: function(e) {
					e.params.loop || (e.pagination.render(), e.pagination.update())
				},
				destroy: function(e) {
					e.pagination.destroy()
				},
				click: function(e, t) {
					e.params.pagination.el && e.params.pagination.hideOnClick && e.pagination.$el.length > 0 && !m(t.target).hasClass(e.params.pagination.bulletClass) && (!0 === e.pagination.$el.hasClass(e.params.pagination.hiddenClass) ? e.emit("paginationShow") : e.emit("paginationHide"), e.pagination.$el.toggleClass(e.params.pagination.hiddenClass))
				}
			}
		}, {
			name: "scrollbar",
			params: {
				scrollbar: {
					el: null,
					dragSize: "auto",
					hide: !1,
					draggable: !1,
					snapOnRelease: !0,
					lockClass: "swiper-scrollbar-lock",
					dragClass: "swiper-scrollbar-drag"
				}
			},
			create: function() {
				M(this, {
					scrollbar: t({
						isTouched: !1,
						timeout: null,
						dragTimeout: null
					}, J)
				})
			},
			on: {
				init: function(e) {
					e.scrollbar.init(), e.scrollbar.updateSize(), e.scrollbar.setTranslate()
				},
				update: function(e) {
					e.scrollbar.updateSize()
				},
				resize: function(e) {
					e.scrollbar.updateSize()
				},
				observerUpdate: function(e) {
					e.scrollbar.updateSize()
				},
				setTranslate: function(e) {
					e.scrollbar.setTranslate()
				},
				setTransition: function(e, t) {
					e.scrollbar.setTransition(t)
				},
				destroy: function(e) {
					e.scrollbar.destroy()
				}
			}
		}, {
			name: "parallax",
			params: {
				parallax: {
					enabled: !1
				}
			},
			create: function() {
				M(this, {
					parallax: t({}, Q)
				})
			},
			on: {
				beforeInit: function(e) {
					e.params.parallax.enabled && (e.params.watchSlidesProgress = !0, e.originalParams.watchSlidesProgress = !0)
				},
				init: function(e) {
					e.params.parallax.enabled && e.parallax.setTranslate()
				},
				setTranslate: function(e) {
					e.params.parallax.enabled && e.parallax.setTranslate()
				},
				setTransition: function(e, t) {
					e.params.parallax.enabled && e.parallax.setTransition(t)
				}
			}
		}, {
			name: "zoom",
			params: {
				zoom: {
					enabled: !1,
					maxRatio: 3,
					minRatio: 1,
					toggle: !0,
					containerClass: "swiper-zoom-container",
					zoomedSlideClass: "swiper-slide-zoomed"
				}
			},
			create: function() {
				var e = this;
				M(e, {
					zoom: t({
						enabled: !1,
						scale: 1,
						currentScale: 2,
						isScaling: !1,
						gesture: {
							$slideEl: void 0,
							slideWidth: void 0,
							slideHeight: void 0,
							$imageEl: void 0,
							$imageWrapEl: void 0,
							maxRatio: 3
						},
						image: {
							isTouched: void 0,
							isMoved: void 0,
							currentX: void 0,
							currentY: void 0,
							minX: void 0,
							minY: void 0,
							maxX: void 0,
							maxY: void 0,
							width: void 0,
							height: void 0,
							startX: void 0,
							startY: void 0,
							touchesStart: {},
							touchesCurrent: {}
						},
						velocity: {
							x: void 0,
							y: void 0,
							prevPositionX: void 0,
							prevPositionY: void 0,
							prevTime: void 0
						}
					}, ee)
				});
				var a = 1;
				Object.defineProperty(e.zoom, "scale", {
					get: function() {
						return a
					},
					set: function(t) {
						if (a !== t) {
							var i = e.zoom.gesture.$imageEl ? e.zoom.gesture.$imageEl[0] : void 0,
								s = e.zoom.gesture.$slideEl ? e.zoom.gesture.$slideEl[0] : void 0;
							e.emit("zoomChange", t, i, s)
						}
						a = t
					}
				})
			},
			on: {
				init: function(e) {
					e.params.zoom.enabled && e.zoom.enable()
				},
				destroy: function(e) {
					e.zoom.disable()
				},
				touchStart: function(e, t) {
					e.zoom.enabled && e.zoom.onTouchStart(t)
				},
				touchEnd: function(e, t) {
					e.zoom.enabled && e.zoom.onTouchEnd(t)
				},
				doubleTap: function(e, t) {
					e.params.zoom.enabled && e.zoom.enabled && e.params.zoom.toggle && e.zoom.toggle(t)
				},
				transitionEnd: function(e) {
					e.zoom.enabled && e.params.zoom.enabled && e.zoom.onTransitionEnd()
				},
				slideChange: function(e) {
					e.zoom.enabled && e.params.zoom.enabled && e.params.cssMode && e.zoom.onTransitionEnd()
				}
			}
		}, {
			name: "lazy",
			params: {
				lazy: {
					checkInView: !1,
					enabled: !1,
					loadPrevNext: !1,
					loadPrevNextAmount: 1,
					loadOnTransitionStart: !1,
					scrollingElement: "",
					elementClass: "swiper-lazy",
					loadingClass: "swiper-lazy-loading",
					loadedClass: "swiper-lazy-loaded",
					preloaderClass: "swiper-lazy-preloader"
				}
			},
			create: function() {
				M(this, {
					lazy: t({
						initialImageLoaded: !1
					}, te)
				})
			},
			on: {
				beforeInit: function(e) {
					e.params.lazy.enabled && e.params.preloadImages && (e.params.preloadImages = !1)
				},
				init: function(e) {
					e.params.lazy.enabled && !e.params.loop && 0 === e.params.initialSlide && (e.params.lazy.checkInView ? e.lazy.checkInViewOnLoad() : e.lazy.load())
				},
				scroll: function(e) {
					e.params.freeMode && !e.params.freeModeSticky && e.lazy.load()
				},
				resize: function(e) {
					e.params.lazy.enabled && e.lazy.load()
				},
				scrollbarDragMove: function(e) {
					e.params.lazy.enabled && e.lazy.load()
				},
				transitionStart: function(e) {
					e.params.lazy.enabled && (e.params.lazy.loadOnTransitionStart || !e.params.lazy.loadOnTransitionStart && !e.lazy.initialImageLoaded) && e.lazy.load()
				},
				transitionEnd: function(e) {
					e.params.lazy.enabled && !e.params.lazy.loadOnTransitionStart && e.lazy.load()
				},
				slideChange: function(e) {
					e.params.lazy.enabled && e.params.cssMode && e.lazy.load()
				}
			}
		}, {
			name: "controller",
			params: {
				controller: {
					control: void 0,
					inverse: !1,
					by: "slide"
				}
			},
			create: function() {
				M(this, {
					controller: t({
						control: this.params.controller.control
					}, ae)
				})
			},
			on: {
				update: function(e) {
					e.controller.control && e.controller.spline && (e.controller.spline = void 0, delete e.controller.spline)
				},
				resize: function(e) {
					e.controller.control && e.controller.spline && (e.controller.spline = void 0, delete e.controller.spline)
				},
				observerUpdate: function(e) {
					e.controller.control && e.controller.spline && (e.controller.spline = void 0, delete e.controller.spline)
				},
				setTranslate: function(e, t, a) {
					e.controller.control && e.controller.setTranslate(t, a)
				},
				setTransition: function(e, t, a) {
					e.controller.control && e.controller.setTransition(t, a)
				}
			}
		}, {
			name: "a11y",
			params: {
				a11y: {
					enabled: !0,
					notificationClass: "swiper-notification",
					prevSlideMessage: "Previous slide",
					nextSlideMessage: "Next slide",
					firstSlideMessage: "This is the first slide",
					lastSlideMessage: "This is the last slide",
					paginationBulletMessage: "Go to slide {{index}}",
					containerMessage: null,
					containerRoleDescriptionMessage: null,
					itemRoleDescriptionMessage: null
				}
			},
			create: function() {
				M(this, {
					a11y: t({}, ie, {
						liveRegion: m('<span class="' + this.params.a11y.notificationClass + '" aria-live="assertive" aria-atomic="true"></span>')
					})
				})
			},
			on: {
				afterInit: function(e) {
					e.params.a11y.enabled && (e.a11y.init(), e.a11y.updateNavigation())
				},
				toEdge: function(e) {
					e.params.a11y.enabled && e.a11y.updateNavigation()
				},
				fromEdge: function(e) {
					e.params.a11y.enabled && e.a11y.updateNavigation()
				},
				paginationUpdate: function(e) {
					e.params.a11y.enabled && e.a11y.updatePagination()
				},
				destroy: function(e) {
					e.params.a11y.enabled && e.a11y.destroy()
				}
			}
		}, {
			name: "history",
			params: {
				history: {
					enabled: !1,
					replaceState: !1,
					key: "slides"
				}
			},
			create: function() {
				M(this, {
					history: t({}, se)
				})
			},
			on: {
				init: function(e) {
					e.params.history.enabled && e.history.init()
				},
				destroy: function(e) {
					e.params.history.enabled && e.history.destroy()
				},
				transitionEnd: function(e) {
					e.history.initialized && e.history.setHistory(e.params.history.key, e.activeIndex)
				},
				slideChange: function(e) {
					e.history.initialized && e.params.cssMode && e.history.setHistory(e.params.history.key, e.activeIndex)
				}
			}
		}, {
			name: "hash-navigation",
			params: {
				hashNavigation: {
					enabled: !1,
					replaceState: !1,
					watchState: !1
				}
			},
			create: function() {
				M(this, {
					hashNavigation: t({
						initialized: !1
					}, re)
				})
			},
			on: {
				init: function(e) {
					e.params.hashNavigation.enabled && e.hashNavigation.init()
				},
				destroy: function(e) {
					e.params.hashNavigation.enabled && e.hashNavigation.destroy()
				},
				transitionEnd: function(e) {
					e.hashNavigation.initialized && e.hashNavigation.setHash()
				},
				slideChange: function(e) {
					e.hashNavigation.initialized && e.params.cssMode && e.hashNavigation.setHash()
				}
			}
		}, {
			name: "autoplay",
			params: {
				autoplay: {
					enabled: !1,
					delay: 3e3,
					waitForTransition: !0,
					disableOnInteraction: !0,
					stopOnLastSlide: !1,
					reverseDirection: !1
				}
			},
			create: function() {
				M(this, {
					autoplay: t({}, ne, {
						running: !1,
						paused: !1
					})
				})
			},
			on: {
				init: function(e) {
					e.params.autoplay.enabled && (e.autoplay.start(), r().addEventListener("visibilitychange", e.autoplay.onVisibilityChange))
				},
				beforeTransitionStart: function(e, t, a) {
					e.autoplay.running && (a || !e.params.autoplay.disableOnInteraction ? e.autoplay.pause(t) : e.autoplay.stop())
				},
				sliderFirstMove: function(e) {
					e.autoplay.running && (e.params.autoplay.disableOnInteraction ? e.autoplay.stop() : e.autoplay.pause())
				},
				touchEnd: function(e) {
					e.params.cssMode && e.autoplay.paused && !e.params.autoplay.disableOnInteraction && e.autoplay.run()
				},
				destroy: function(e) {
					e.autoplay.running && e.autoplay.stop(), r().removeEventListener("visibilitychange", e.autoplay.onVisibilityChange)
				}
			}
		}, {
			name: "effect-fade",
			params: {
				fadeEffect: {
					crossFade: !1
				}
			},
			create: function() {
				M(this, {
					fadeEffect: t({}, le)
				})
			},
			on: {
				beforeInit: function(e) {
					if ("fade" === e.params.effect) {
						e.classNames.push(e.params.containerModifierClass + "fade");
						var t = {
							slidesPerView: 1,
							slidesPerColumn: 1,
							slidesPerGroup: 1,
							watchSlidesProgress: !0,
							spaceBetween: 0,
							virtualTranslate: !0
						};
						S(e.params, t), S(e.originalParams, t)
					}
				},
				setTranslate: function(e) {
					"fade" === e.params.effect && e.fadeEffect.setTranslate()
				},
				setTransition: function(e, t) {
					"fade" === e.params.effect && e.fadeEffect.setTransition(t)
				}
			}
		}, {
			name: "effect-cube",
			params: {
				cubeEffect: {
					slideShadows: !0,
					shadow: !0,
					shadowOffset: 20,
					shadowScale: .94
				}
			},
			create: function() {
				M(this, {
					cubeEffect: t({}, oe)
				})
			},
			on: {
				beforeInit: function(e) {
					if ("cube" === e.params.effect) {
						e.classNames.push(e.params.containerModifierClass + "cube"), e.classNames.push(e.params.containerModifierClass + "3d");
						var t = {
							slidesPerView: 1,
							slidesPerColumn: 1,
							slidesPerGroup: 1,
							watchSlidesProgress: !0,
							resistanceRatio: 0,
							spaceBetween: 0,
							centeredSlides: !1,
							virtualTranslate: !0
						};
						S(e.params, t), S(e.originalParams, t)
					}
				},
				setTranslate: function(e) {
					"cube" === e.params.effect && e.cubeEffect.setTranslate()
				},
				setTransition: function(e, t) {
					"cube" === e.params.effect && e.cubeEffect.setTransition(t)
				}
			}
		}, {
			name: "effect-flip",
			params: {
				flipEffect: {
					slideShadows: !0,
					limitRotation: !0
				}
			},
			create: function() {
				M(this, {
					flipEffect: t({}, de)
				})
			},
			on: {
				beforeInit: function(e) {
					if ("flip" === e.params.effect) {
						e.classNames.push(e.params.containerModifierClass + "flip"), e.classNames.push(e.params.containerModifierClass + "3d");
						var t = {
							slidesPerView: 1,
							slidesPerColumn: 1,
							slidesPerGroup: 1,
							watchSlidesProgress: !0,
							spaceBetween: 0,
							virtualTranslate: !0
						};
						S(e.params, t), S(e.originalParams, t)
					}
				},
				setTranslate: function(e) {
					"flip" === e.params.effect && e.flipEffect.setTranslate()
				},
				setTransition: function(e, t) {
					"flip" === e.params.effect && e.flipEffect.setTransition(t)
				}
			}
		}, {
			name: "effect-coverflow",
			params: {
				coverflowEffect: {
					rotate: 50,
					stretch: 0,
					depth: 100,
					scale: 1,
					modifier: 1,
					slideShadows: !0
				}
			},
			create: function() {
				M(this, {
					coverflowEffect: t({}, pe)
				})
			},
			on: {
				beforeInit: function(e) {
					"coverflow" === e.params.effect && (e.classNames.push(e.params.containerModifierClass + "coverflow"), e.classNames.push(e.params.containerModifierClass + "3d"), e.params.watchSlidesProgress = !0, e.originalParams.watchSlidesProgress = !0)
				},
				setTranslate: function(e) {
					"coverflow" === e.params.effect && e.coverflowEffect.setTranslate()
				},
				setTransition: function(e, t) {
					"coverflow" === e.params.effect && e.coverflowEffect.setTransition(t)
				}
			}
		}, {
			name: "thumbs",
			params: {
				thumbs: {
					swiper: null,
					multipleActiveThumbs: !0,
					autoScrollOffset: 0,
					slideThumbActiveClass: "swiper-slide-thumb-active",
					thumbsContainerClass: "swiper-container-thumbs"
				}
			},
			create: function() {
				M(this, {
					thumbs: t({
						swiper: null,
						initialized: !1
					}, ue)
				})
			},
			on: {
				beforeInit: function(e) {
					var t = e.params.thumbs;
					t && t.swiper && (e.thumbs.init(), e.thumbs.update(!0))
				},
				slideChange: function(e) {
					e.thumbs.swiper && e.thumbs.update()
				},
				update: function(e) {
					e.thumbs.swiper && e.thumbs.update()
				},
				resize: function(e) {
					e.thumbs.swiper && e.thumbs.update()
				},
				observerUpdate: function(e) {
					e.thumbs.swiper && e.thumbs.update()
				},
				setTransition: function(e, t) {
					var a = e.thumbs.swiper;
					a && a.setTransition(t)
				},
				beforeDestroy: function(e) {
					var t = e.thumbs.swiper;
					t && e.thumbs.swiperCreated && t && t.destroy()
				}
			}
		}];
	return R.use(ce), R
}));;
"object" == typeof navigator && function(e, t) {
	"object" == typeof exports && "undefined" != typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define("Plyr", t) : (e = "undefined" != typeof globalThis ? globalThis : e || self).Plyr = t()
}(this, (function() {
	"use strict";

	function e(e, t, i) {
		return t in e ? Object.defineProperty(e, t, {
			value: i,
			enumerable: !0,
			configurable: !0,
			writable: !0
		}) : e[t] = i, e
	}

	function t(e, t) {
		for (var i = 0; i < t.length; i++) {
			var s = t[i];
			s.enumerable = s.enumerable || !1, s.configurable = !0, "value" in s && (s.writable = !0), Object.defineProperty(e, s.key, s)
		}
	}

	function i(e, t, i) {
		return t in e ? Object.defineProperty(e, t, {
			value: i,
			enumerable: !0,
			configurable: !0,
			writable: !0
		}) : e[t] = i, e
	}

	function s(e, t) {
		var i = Object.keys(e);
		if (Object.getOwnPropertySymbols) {
			var s = Object.getOwnPropertySymbols(e);
			t && (s = s.filter((function(t) {
				return Object.getOwnPropertyDescriptor(e, t).enumerable
			}))), i.push.apply(i, s)
		}
		return i
	}

	function n(e) {
		for (var t = 1; t < arguments.length; t++) {
			var n = null != arguments[t] ? arguments[t] : {};
			t % 2 ? s(Object(n), !0).forEach((function(t) {
				i(e, t, n[t])
			})) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : s(Object(n)).forEach((function(t) {
				Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t))
			}))
		}
		return e
	}
	var a = {
		addCSS: !0,
		thumbWidth: 15,
		watch: !0
	};

	function l(e, t) {
		return function() {
			return Array.from(document.querySelectorAll(t)).includes(this)
		}.call(e, t)
	}
	var o = function(e) {
			return null != e ? e.constructor : null
		},
		r = function(e, t) {
			return !!(e && t && e instanceof t)
		},
		c = function(e) {
			return null == e
		},
		h = function(e) {
			return o(e) === Object
		},
		u = function(e) {
			return o(e) === String
		},
		d = function(e) {
			return Array.isArray(e)
		},
		m = function(e) {
			return r(e, NodeList)
		},
		p = u,
		g = d,
		f = m,
		b = function(e) {
			return r(e, Element)
		},
		y = function(e) {
			return r(e, Event)
		},
		v = function(e) {
			return c(e) || (u(e) || d(e) || m(e)) && !e.length || h(e) && !Object.keys(e).length
		};

	function w(e, t) {
		if (1 > t) {
			var i = function(e) {
				var t = "".concat(e).match(/(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/);
				return t ? Math.max(0, (t[1] ? t[1].length : 0) - (t[2] ? +t[2] : 0)) : 0
			}(t);
			return parseFloat(e.toFixed(i))
		}
		return Math.round(e / t) * t
	}
	var T = function() {
		function e(t, i) {
			(function(e, t) {
				if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
			})(this, e), b(t) ? this.element = t : p(t) && (this.element = document.querySelector(t)), b(this.element) && v(this.element.rangeTouch) && (this.config = n({}, a, {}, i), this.init())
		}
		return function(e, i, s) {
			i && t(e.prototype, i), s && t(e, s)
		}(e, [{
			key: "init",
			value: function() {
				e.enabled && (this.config.addCSS && (this.element.style.userSelect = "none", this.element.style.webKitUserSelect = "none", this.element.style.touchAction = "manipulation"), this.listeners(!0), this.element.rangeTouch = this)
			}
		}, {
			key: "destroy",
			value: function() {
				e.enabled && (this.config.addCSS && (this.element.style.userSelect = "", this.element.style.webKitUserSelect = "", this.element.style.touchAction = ""), this.listeners(!1), this.element.rangeTouch = null)
			}
		}, {
			key: "listeners",
			value: function(e) {
				var t = this,
					i = e ? "addEventListener" : "removeEventListener";
				["touchstart", "touchmove", "touchend"].forEach((function(e) {
					t.element[i](e, (function(e) {
						return t.set(e)
					}), !1)
				}))
			}
		}, {
			key: "get",
			value: function(t) {
				if (!e.enabled || !y(t)) return null;
				var i, s = t.target,
					n = t.changedTouches[0],
					a = parseFloat(s.getAttribute("min")) || 0,
					l = parseFloat(s.getAttribute("max")) || 100,
					o = parseFloat(s.getAttribute("step")) || 1,
					r = s.getBoundingClientRect(),
					c = 100 / r.width * (this.config.thumbWidth / 2) / 100;
				return 0 > (i = 100 / r.width * (n.clientX - r.left)) ? i = 0 : 100 < i && (i = 100), 50 > i ? i -= (100 - 2 * i) * c : 50 < i && (i += 2 * (i - 50) * c), a + w(i / 100 * (l - a), o)
			}
		}, {
			key: "set",
			value: function(t) {
				e.enabled && y(t) && !t.target.disabled && (t.preventDefault(), t.target.value = this.get(t), function(e, t) {
					if (e && t) {
						var i = new Event(t, {
							bubbles: !0
						});
						e.dispatchEvent(i)
					}
				}(t.target, "touchend" === t.type ? "change" : "input"))
			}
		}], [{
			key: "setup",
			value: function(t) {
				var i = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : {},
					s = null;
				if (v(t) || p(t) ? s = Array.from(document.querySelectorAll(p(t) ? t : 'input[type="range"]')) : b(t) ? s = [t] : f(t) ? s = Array.from(t) : g(t) && (s = t.filter(b)), v(s)) return null;
				var o = n({}, a, {}, i);
				if (p(t) && o.watch) {
					var r = new MutationObserver((function(i) {
						Array.from(i).forEach((function(i) {
							Array.from(i.addedNodes).forEach((function(i) {
								b(i) && l(i, t) && new e(i, o)
							}))
						}))
					}));
					r.observe(document.body, {
						childList: !0,
						subtree: !0
					})
				}
				return s.map((function(t) {
					return new e(t, i)
				}))
			}
		}, {
			key: "enabled",
			get: function() {
				return "ontouchstart" in document.documentElement
			}
		}]), e
	}();
	const k = e => null != e ? e.constructor : null,
		C = (e, t) => Boolean(e && t && e instanceof t),
		A = e => null == e,
		S = e => k(e) === Object,
		E = e => k(e) === String,
		P = e => k(e) === Function,
		N = e => Array.isArray(e),
		x = e => C(e, NodeList),
		M = e => A(e) || (E(e) || N(e) || x(e)) && !e.length || S(e) && !Object.keys(e).length;
	var I = A,
		L = S,
		$ = e => k(e) === Number && !Number.isNaN(e),
		_ = E,
		O = e => k(e) === Boolean,
		j = P,
		q = N,
		D = x,
		H = e => null !== e && "object" == typeof e && 1 === e.nodeType && "object" == typeof e.style && "object" == typeof e.ownerDocument,
		F = e => C(e, Event),
		R = e => C(e, KeyboardEvent),
		V = e => C(e, TextTrack) || !A(e) && E(e.kind),
		B = e => C(e, Promise) && P(e.then),
		U = e => {
			if (C(e, window.URL)) return !0;
			if (!E(e)) return !1;
			let t = e;
			e.startsWith("http://") && e.startsWith("https://") || (t = `http://${e}`);
			try {
				return !M(new URL(t).hostname)
			} catch (e) {
				return !1
			}
		},
		W = M;
	const z = (() => {
		const e = document.createElement("span"),
			t = {
				WebkitTransition: "webkitTransitionEnd",
				MozTransition: "transitionend",
				OTransition: "oTransitionEnd otransitionend",
				transition: "transitionend"
			},
			i = Object.keys(t).find((t => void 0 !== e.style[t]));
		return !!_(i) && t[i]
	})();

	function K(e, t) {
		setTimeout((() => {
			try {
				e.hidden = !0, e.offsetHeight, e.hidden = !1
			} catch (e) {}
		}), t)
	}
	const Y = {
		isIE: Boolean(window.document.documentMode),
		isEdge: window.navigator.userAgent.includes("Edge"),
		isWebkit: "WebkitAppearance" in document.documentElement.style && !/Edge/.test(navigator.userAgent),
		isIPhone: /(iPhone|iPod)/gi.test(navigator.platform),
		isIos: "MacIntel" === navigator.platform && navigator.maxTouchPoints > 1 || /(iPad|iPhone|iPod)/gi.test(navigator.platform)
	};

	function Q(e, t) {
		return t.split(".").reduce(((e, t) => e && e[t]), e)
	}

	function X(e = {}, ...t) {
		if (!t.length) return e;
		const i = t.shift();
		return L(i) ? (Object.keys(i).forEach((t => {
			L(i[t]) ? (Object.keys(e).includes(t) || Object.assign(e, {
				[t]: {}
			}), X(e[t], i[t])) : Object.assign(e, {
				[t]: i[t]
			})
		})), X(e, ...t)) : e
	}

	function J(e, t) {
		const i = e.length ? e : [e];
		Array.from(i).reverse().forEach(((e, i) => {
			const s = i > 0 ? t.cloneNode(!0) : t,
				n = e.parentNode,
				a = e.nextSibling;
			s.appendChild(e), a ? n.insertBefore(s, a) : n.appendChild(s)
		}))
	}

	function G(e, t) {
		H(e) && !W(t) && Object.entries(t).filter((([, e]) => !I(e))).forEach((([t, i]) => e.setAttribute(t, i)))
	}

	function Z(e, t, i) {
		const s = document.createElement(e);
		return L(t) && G(s, t), _(i) && (s.innerText = i), s
	}

	function ee(e, t, i, s) {
		H(t) && t.appendChild(Z(e, i, s))
	}

	function te(e) {
		D(e) || q(e) ? Array.from(e).forEach(te) : H(e) && H(e.parentNode) && e.parentNode.removeChild(e)
	}

	function ie(e) {
		if (!H(e)) return;
		let {
			length: t
		} = e.childNodes;
		for (; t > 0;) e.removeChild(e.lastChild), t -= 1
	}

	function se(e, t) {
		return H(t) && H(t.parentNode) && H(e) ? (t.parentNode.replaceChild(e, t), e) : null
	}

	function ne(e, t) {
		if (!_(e) || W(e)) return {};
		const i = {},
			s = X({}, t);
		return e.split(",").forEach((e => {
			const t = e.trim(),
				n = t.replace(".", ""),
				a = t.replace(/[[\]]/g, "").split("="),
				[l] = a,
				o = a.length > 1 ? a[1].replace(/["']/g, "") : "";
			switch (t.charAt(0)) {
				case ".":
					_(s.class) ? i.class = `${s.class} ${n}` : i.class = n;
					break;
				case "#":
					i.id = t.replace("#", "");
					break;
				case "[":
					i[l] = o
			}
		})), X(s, i)
	}

	function ae(e, t) {
		if (!H(e)) return;
		let i = t;
		O(i) || (i = !e.hidden), e.hidden = i
	}

	function le(e, t, i) {
		if (D(e)) return Array.from(e).map((e => le(e, t, i)));
		if (H(e)) {
			let s = "toggle";
			return void 0 !== i && (s = i ? "add" : "remove"), e.classList[s](t), e.classList.contains(t)
		}
		return !1
	}

	function oe(e, t) {
		return H(e) && e.classList.contains(t)
	}

	function re(e, t) {
		const {
			prototype: i
		} = Element;
		return (i.matches || i.webkitMatchesSelector || i.mozMatchesSelector || i.msMatchesSelector || function() {
			return Array.from(document.querySelectorAll(t)).includes(this)
		}).call(e, t)
	}

	function ce(e) {
		return this.elements.container.querySelectorAll(e)
	}

	function he(e) {
		return this.elements.container.querySelector(e)
	}

	function ue(e = null, t = !1) {
		H(e) && (e.focus({
			preventScroll: !0
		}), t && le(e, this.config.classNames.tabFocus))
	}
	const de = {
			"audio/ogg": "vorbis",
			"audio/wav": "1",
			"video/webm": "vp8, vorbis",
			"video/mp4": "avc1.42E01E, mp4a.40.2",
			"video/ogg": "theora"
		},
		me = {
			audio: "canPlayType" in document.createElement("audio"),
			video: "canPlayType" in document.createElement("video"),
			check(e, t, i) {
				const s = Y.isIPhone && i && me.playsinline,
					n = me[e] || "html5" !== t;
				return {
					api: n,
					ui: n && me.rangeInput && ("video" !== e || !Y.isIPhone || s)
				}
			},
			pip: !(Y.isIPhone || !j(Z("video").webkitSetPresentationMode) && (!document.pictureInPictureEnabled || Z("video").disablePictureInPicture)),
			airplay: j(window.WebKitPlaybackTargetAvailabilityEvent),
			playsinline: "playsInline" in document.createElement("video"),
			mime(e) {
				if (W(e)) return !1;
				const [t] = e.split("/");
				let i = e;
				if (!this.isHTML5 || t !== this.type) return !1;
				Object.keys(de).includes(i) && (i += `; codecs="${de[e]}"`);
				try {
					return Boolean(i && this.media.canPlayType(i).replace(/no/, ""))
				} catch (e) {
					return !1
				}
			},
			textTracks: "textTracks" in document.createElement("video"),
			rangeInput: (() => {
				const e = document.createElement("input");
				return e.type = "range", "range" === e.type
			})(),
			touch: "ontouchstart" in document.documentElement,
			transitions: !1 !== z,
			reducedMotion: "matchMedia" in window && window.matchMedia("(prefers-reduced-motion)").matches
		},
		pe = (() => {
			let e = !1;
			try {
				const t = Object.defineProperty({}, "passive", {
					get: () => (e = !0, null)
				});
				window.addEventListener("test", null, t), window.removeEventListener("test", null, t)
			} catch (e) {}
			return e
		})();

	function ge(e, t, i, s = !1, n = !0, a = !1) {
		if (!e || !("addEventListener" in e) || W(t) || !j(i)) return;
		const l = t.split(" ");
		let o = a;
		pe && (o = {
			passive: n,
			capture: a
		}), l.forEach((t => {
			this && this.eventListeners && s && this.eventListeners.push({
				element: e,
				type: t,
				callback: i,
				options: o
			}), e[s ? "addEventListener" : "removeEventListener"](t, i, o)
		}))
	}

	function fe(e, t = "", i, s = !0, n = !1) {
		ge.call(this, e, t, i, !0, s, n)
	}

	function be(e, t = "", i, s = !0, n = !1) {
		ge.call(this, e, t, i, !1, s, n)
	}

	function ye(e, t = "", i, s = !0, n = !1) {
		const a = (...l) => {
			be(e, t, a, s, n), i.apply(this, l)
		};
		ge.call(this, e, t, a, !0, s, n)
	}

	function ve(e, t = "", i = !1, s = {}) {
		if (!H(e) || W(t)) return;
		const n = new CustomEvent(t, {
			bubbles: i,
			detail: {
				...s,
				plyr: this
			}
		});
		e.dispatchEvent(n)
	}

	function we() {
		this && this.eventListeners && (this.eventListeners.forEach((e => {
			const {
				element: t,
				type: i,
				callback: s,
				options: n
			} = e;
			t.removeEventListener(i, s, n)
		})), this.eventListeners = [])
	}

	function Te() {
		return new Promise((e => this.ready ? setTimeout(e, 0) : fe.call(this, this.elements.container, "ready", e))).then((() => {}))
	}

	function ke(e) {
		B(e) && e.then(null, (() => {}))
	}

	function Ce(e) {
		return q(e) ? e.filter(((t, i) => e.indexOf(t) === i)) : e
	}

	function Ae(e, t) {
		return q(e) && e.length ? e.reduce(((e, i) => Math.abs(i - t) < Math.abs(e - t) ? i : e)) : null
	}

	function Se(e) {
		return !(!window || !window.CSS) && window.CSS.supports(e)
	}
	const Ee = [
		[1, 1],
		[4, 3],
		[3, 4],
		[5, 4],
		[4, 5],
		[3, 2],
		[2, 3],
		[16, 10],
		[10, 16],
		[16, 9],
		[9, 16],
		[21, 9],
		[9, 21],
		[32, 9],
		[9, 32]
	].reduce(((e, [t, i]) => ({
		...e,
		[t / i]: [t, i]
	})), {});

	function Pe(e) {
		if (!(q(e) || _(e) && e.includes(":"))) return !1;
		return (q(e) ? e : e.split(":")).map(Number).every($)
	}

	function Ne(e) {
		if (!q(e) || !e.every($)) return null;
		const [t, i] = e, s = (e, t) => 0 === t ? e : s(t, e % t), n = s(t, i);
		return [t / n, i / n]
	}

	function xe(e) {
		const t = e => Pe(e) ? e.split(":").map(Number) : null;
		let i = t(e);
		if (null === i && (i = t(this.config.ratio)), null === i && !W(this.embed) && q(this.embed.ratio) && ({
				ratio: i
			} = this.embed), null === i && this.isHTML5) {
			const {
				videoWidth: e,
				videoHeight: t
			} = this.media;
			i = [e, t]
		}
		return Ne(i)
	}

	function Me(e) {
		if (!this.isVideo) return {};
		const {
			wrapper: t
		} = this.elements, i = xe.call(this, e);
		if (!q(i)) return {};
		const [s, n] = Ne(i), a = 100 / s * n;
		if (Se(`aspect-ratio: ${s}/${n}`) ? t.style.aspectRatio = `${s}/${n}` : t.style.paddingBottom = `${a}%`, this.isVimeo && !this.config.vimeo.premium && this.supported.ui) {
			const e = 100 / this.media.offsetWidth * parseInt(window.getComputedStyle(this.media).paddingBottom, 10),
				i = (e - a) / (e / 50);
			this.fullscreen.active ? t.style.paddingBottom = null : this.media.style.transform = `translateY(-${i}%)`
		} else this.isHTML5 && t.classList.add(this.config.classNames.videoFixedRatio);
		return {
			padding: a,
			ratio: i
		}
	}

	function Ie(e, t, i = .05) {
		const s = e / t,
			n = Ae(Object.keys(Ee), s);
		return Math.abs(n - s) <= i ? Ee[n] : [e, t]
	}
	const Le = {
		getSources() {
			if (!this.isHTML5) return [];
			return Array.from(this.media.querySelectorAll("source")).filter((e => {
				const t = e.getAttribute("type");
				return !!W(t) || me.mime.call(this, t)
			}))
		},
		getQualityOptions() {
			return this.config.quality.forced ? this.config.quality.options : Le.getSources.call(this).map((e => Number(e.getAttribute("size")))).filter(Boolean)
		},
		setup() {
			if (!this.isHTML5) return;
			const e = this;
			e.options.speed = e.config.speed.options, W(this.config.ratio) || Me.call(e), Object.defineProperty(e.media, "quality", {
				get() {
					const t = Le.getSources.call(e).find((t => t.getAttribute("src") === e.source));
					return t && Number(t.getAttribute("size"))
				},
				set(t) {
					if (e.quality !== t) {
						if (e.config.quality.forced && j(e.config.quality.onChange)) e.config.quality.onChange(t);
						else {
							const i = Le.getSources.call(e).find((e => Number(e.getAttribute("size")) === t));
							if (!i) return;
							const {
								currentTime: s,
								paused: n,
								preload: a,
								readyState: l,
								playbackRate: o
							} = e.media;
							e.media.src = i.getAttribute("src"), ("none" !== a || l) && (e.once("loadedmetadata", (() => {
								e.speed = o, e.currentTime = s, n || ke(e.play())
							})), e.media.load())
						}
						ve.call(e, e.media, "qualitychange", !1, {
							quality: t
						})
					}
				}
			})
		},
		cancelRequests() {
			this.isHTML5 && (te(Le.getSources.call(this)), this.media.setAttribute("src", this.config.blankVideo), this.media.load(), this.debug.log("Cancelled network requests"))
		}
	};

	function $e(e, ...t) {
		return W(e) ? e : e.toString().replace(/{(\d+)}/g, ((e, i) => t[i].toString()))
	}
	const _e = (e = "", t = "", i = "") => e.replace(new RegExp(t.toString().replace(/([.*+?^=!:${}()|[\]/\\])/g, "\\$1"), "g"), i.toString()),
		Oe = (e = "") => e.toString().replace(/\w\S*/g, (e => e.charAt(0).toUpperCase() + e.substr(1).toLowerCase()));

	function je(e = "") {
		let t = e.toString();
		return t = function(e = "") {
			let t = e.toString();
			return t = _e(t, "-", " "), t = _e(t, "_", " "), t = Oe(t), _e(t, " ", "")
		}(t), t.charAt(0).toLowerCase() + t.slice(1)
	}

	function qe(e) {
		const t = document.createElement("div");
		return t.appendChild(e), t.innerHTML
	}
	const De = {
			pip: "PIP",
			airplay: "AirPlay",
			html5: "HTML5",
			vimeo: "Vimeo",
			youtube: "YouTube"
		},
		He = {
			get(e = "", t = {}) {
				if (W(e) || W(t)) return "";
				let i = Q(t.i18n, e);
				if (W(i)) return Object.keys(De).includes(e) ? De[e] : "";
				const s = {
					"{seektime}": t.seekTime,
					"{title}": t.title
				};
				return Object.entries(s).forEach((([e, t]) => {
					i = _e(i, e, t)
				})), i
			}
		};
	class Fe {
		constructor(t) {
			e(this, "get", (e => {
				if (!Fe.supported || !this.enabled) return null;
				const t = window.localStorage.getItem(this.key);
				if (W(t)) return null;
				const i = JSON.parse(t);
				return _(e) && e.length ? i[e] : i
			})), e(this, "set", (e => {
				if (!Fe.supported || !this.enabled) return;
				if (!L(e)) return;
				let t = this.get();
				W(t) && (t = {}), X(t, e);
				try {
					window.localStorage.setItem(this.key, JSON.stringify(t))
				} catch (e) {}
			})), this.enabled = t.config.storage.enabled, this.key = t.config.storage.key
		}
		static get supported() {
			try {
				if (!("localStorage" in window)) return !1;
				const e = "___test";
				return window.localStorage.setItem(e, e), window.localStorage.removeItem(e), !0
			} catch (e) {
				return !1
			}
		}
	}

	function Re(e, t = "text") {
		return new Promise(((i, s) => {
			try {
				const s = new XMLHttpRequest;
				if (!("withCredentials" in s)) return;
				s.addEventListener("load", (() => {
					if ("text" === t) try {
						i(JSON.parse(s.responseText))
					} catch (e) {
						i(s.responseText)
					} else i(s.response)
				})), s.addEventListener("error", (() => {
					throw new Error(s.status)
				})), s.open("GET", e, !0), s.responseType = t, s.send()
			} catch (e) {
				s(e)
			}
		}))
	}

	function Ve(e, t) {
		if (!_(e)) return;
		const i = _(t);
		let s = !1;
		const n = () => null !== document.getElementById(t),
			a = (e, t) => {
				e.innerHTML = t, i && n() || document.body.insertAdjacentElement("afterbegin", e)
			};
		if (!i || !n()) {
			const n = Fe.supported,
				l = document.createElement("div");
			if (l.setAttribute("hidden", ""), i && l.setAttribute("id", t), n) {
				const e = window.localStorage.getItem(`cache-${t}`);
				if (s = null !== e, s) {
					const t = JSON.parse(e);
					a(l, t.content)
				}
			}
			Re(e).then((e => {
				if (!W(e)) {
					if (n) try {
						window.localStorage.setItem(`cache-${t}`, JSON.stringify({
							content: e
						}))
					} catch (e) {}
					a(l, e)
				}
			})).catch((() => {}))
		}
	}
	const Be = e => Math.trunc(e / 60 / 60 % 60, 10);

	function Ue(e = 0, t = !1, i = !1) {
		if (!$(e)) return Ue(void 0, t, i);
		const s = e => `0${e}`.slice(-2);
		let n = Be(e);
		const a = (l = e, Math.trunc(l / 60 % 60, 10));
		var l;
		const o = (e => Math.trunc(e % 60, 10))(e);
		return n = t || n > 0 ? `${n}:` : "", `${i&&e>0?"-":""}${n}${s(a)}:${s(o)}`
	}
	const We = {
		getIconUrl() {
			const e = new URL(this.config.iconUrl, window.location),
				t = window.location.host ? window.location.host : window.top.location.host,
				i = e.host !== t || Y.isIE && !window.svg4everybody;
			return {
				url: this.config.iconUrl,
				cors: i
			}
		},
		findElements() {
			try {
				return this.elements.controls = he.call(this, this.config.selectors.controls.wrapper), this.elements.buttons = {
					play: ce.call(this, this.config.selectors.buttons.play),
					pause: he.call(this, this.config.selectors.buttons.pause),
					restart: he.call(this, this.config.selectors.buttons.restart),
					rewind: he.call(this, this.config.selectors.buttons.rewind),
					fastForward: he.call(this, this.config.selectors.buttons.fastForward),
					mute: he.call(this, this.config.selectors.buttons.mute),
					pip: he.call(this, this.config.selectors.buttons.pip),
					airplay: he.call(this, this.config.selectors.buttons.airplay),
					settings: he.call(this, this.config.selectors.buttons.settings),
					captions: he.call(this, this.config.selectors.buttons.captions),
					fullscreen: he.call(this, this.config.selectors.buttons.fullscreen)
				}, this.elements.progress = he.call(this, this.config.selectors.progress), this.elements.inputs = {
					seek: he.call(this, this.config.selectors.inputs.seek),
					volume: he.call(this, this.config.selectors.inputs.volume)
				}, this.elements.display = {
					buffer: he.call(this, this.config.selectors.display.buffer),
					currentTime: he.call(this, this.config.selectors.display.currentTime),
					duration: he.call(this, this.config.selectors.display.duration)
				}, H(this.elements.progress) && (this.elements.display.seekTooltip = this.elements.progress.querySelector(`.${this.config.classNames.tooltip}`)), !0
			} catch (e) {
				return this.debug.warn("It looks like there is a problem with your custom controls HTML", e), this.toggleNativeControls(!0), !1
			}
		},
		createIcon(e, t) {
			const i = "http://www.w3.org/2000/svg",
				s = We.getIconUrl.call(this),
				n = `${s.cors?"":s.url}#${this.config.iconPrefix}`,
				a = document.createElementNS(i, "svg");
			G(a, X(t, {
				"aria-hidden": "true",
				focusable: "false"
			}));
			const l = document.createElementNS(i, "use"),
				o = `${n}-${e}`;
			return "href" in l && l.setAttributeNS("http://www.w3.org/1999/xlink", "href", o), l.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", o), a.appendChild(l), a
		},
		createLabel(e, t = {}) {
			const i = He.get(e, this.config);
			return Z("span", {
				...t,
				class: [t.class, this.config.classNames.hidden].filter(Boolean).join(" ")
			}, i)
		},
		createBadge(e) {
			if (W(e)) return null;
			const t = Z("span", {
				class: this.config.classNames.menu.value
			});
			return t.appendChild(Z("span", {
				class: this.config.classNames.menu.badge
			}, e)), t
		},
		createButton(e, t) {
			const i = X({}, t);
			let s = je(e);
			const n = {
				element: "button",
				toggle: !1,
				label: null,
				icon: null,
				labelPressed: null,
				iconPressed: null
			};
			switch (["element", "icon", "label"].forEach((e => {
					Object.keys(i).includes(e) && (n[e] = i[e], delete i[e])
				})), "button" !== n.element || Object.keys(i).includes("type") || (i.type = "button"), Object.keys(i).includes("class") ? i.class.split(" ").some((e => e === this.config.classNames.control)) || X(i, {
					class: `${i.class} ${this.config.classNames.control}`
				}) : i.class = this.config.classNames.control, e) {
				case "play":
					n.toggle = !0, n.label = "play", n.labelPressed = "pause", n.icon = "play", n.iconPressed = "pause";
					break;
				case "mute":
					n.toggle = !0, n.label = "mute", n.labelPressed = "unmute", n.icon = "volume", n.iconPressed = "muted";
					break;
				case "captions":
					n.toggle = !0, n.label = "enableCaptions", n.labelPressed = "disableCaptions", n.icon = "captions-off", n.iconPressed = "captions-on";
					break;
				case "fullscreen":
					n.toggle = !0, n.label = "enterFullscreen", n.labelPressed = "exitFullscreen", n.icon = "enter-fullscreen", n.iconPressed = "exit-fullscreen";
					break;
				case "play-large":
					i.class += ` ${this.config.classNames.control}--overlaid`, s = "play", n.label = "play", n.icon = "play";
					break;
				default:
					W(n.label) && (n.label = s), W(n.icon) && (n.icon = e)
			}
			const a = Z(n.element);
			return n.toggle ? (a.appendChild(We.createIcon.call(this, n.iconPressed, {
				class: "icon--pressed"
			})), a.appendChild(We.createIcon.call(this, n.icon, {
				class: "icon--not-pressed"
			})), a.appendChild(We.createLabel.call(this, n.labelPressed, {
				class: "label--pressed"
			})), a.appendChild(We.createLabel.call(this, n.label, {
				class: "label--not-pressed"
			}))) : (a.appendChild(We.createIcon.call(this, n.icon)), a.appendChild(We.createLabel.call(this, n.label))), X(i, ne(this.config.selectors.buttons[s], i)), G(a, i), "play" === s ? (q(this.elements.buttons[s]) || (this.elements.buttons[s] = []), this.elements.buttons[s].push(a)) : this.elements.buttons[s] = a, a
		},
		createRange(e, t) {
			const i = Z("input", X(ne(this.config.selectors.inputs[e]), {
				type: "range",
				min: 0,
				max: 100,
				step: .01,
				value: 0,
				autocomplete: "off",
				role: "slider",
				"aria-label": He.get(e, this.config),
				"aria-valuemin": 0,
				"aria-valuemax": 100,
				"aria-valuenow": 0
			}, t));
			return this.elements.inputs[e] = i, We.updateRangeFill.call(this, i), T.setup(i), i
		},
		createProgress(e, t) {
			const i = Z("progress", X(ne(this.config.selectors.display[e]), {
				min: 0,
				max: 100,
				value: 0,
				role: "progressbar",
				"aria-hidden": !0
			}, t));
			if ("volume" !== e) {
				i.appendChild(Z("span", null, "0"));
				const t = {
						played: "played",
						buffer: "buffered"
					} [e],
					s = t ? He.get(t, this.config) : "";
				i.innerText = `% ${s.toLowerCase()}`
			}
			return this.elements.display[e] = i, i
		},
		createTime(e, t) {
			const i = ne(this.config.selectors.display[e], t),
				s = Z("div", X(i, {
					class: `${i.class?i.class:""} ${this.config.classNames.display.time} `.trim(),
					"aria-label": He.get(e, this.config)
				}), "00:00");
			return this.elements.display[e] = s, s
		},
		bindMenuItemShortcuts(e, t) {
			fe.call(this, e, "keydown keyup", (i => {
				if (![32, 38, 39, 40].includes(i.which)) return;
				if (i.preventDefault(), i.stopPropagation(), "keydown" === i.type) return;
				const s = re(e, '[role="menuitemradio"]');
				if (!s && [32, 39].includes(i.which)) We.showMenuPanel.call(this, t, !0);
				else {
					let t;
					32 !== i.which && (40 === i.which || s && 39 === i.which ? (t = e.nextElementSibling, H(t) || (t = e.parentNode.firstElementChild)) : (t = e.previousElementSibling, H(t) || (t = e.parentNode.lastElementChild)), ue.call(this, t, !0))
				}
			}), !1), fe.call(this, e, "keyup", (e => {
				13 === e.which && We.focusFirstMenuItem.call(this, null, !0)
			}))
		},
		createMenuItem({
			value: e,
			list: t,
			type: i,
			title: s,
			badge: n = null,
			checked: a = !1
		}) {
			const l = ne(this.config.selectors.inputs[i]),
				o = Z("button", X(l, {
					type: "button",
					role: "menuitemradio",
					class: `${this.config.classNames.control} ${l.class?l.class:""}`.trim(),
					"aria-checked": a,
					value: e
				})),
				r = Z("span");
			r.innerHTML = s, H(n) && r.appendChild(n), o.appendChild(r), Object.defineProperty(o, "checked", {
				enumerable: !0,
				get: () => "true" === o.getAttribute("aria-checked"),
				set(e) {
					e && Array.from(o.parentNode.children).filter((e => re(e, '[role="menuitemradio"]'))).forEach((e => e.setAttribute("aria-checked", "false"))), o.setAttribute("aria-checked", e ? "true" : "false")
				}
			}), this.listeners.bind(o, "click keyup", (t => {
				if (!R(t) || 32 === t.which) {
					switch (t.preventDefault(), t.stopPropagation(), o.checked = !0, i) {
						case "language":
							this.currentTrack = Number(e);
							break;
						case "quality":
							this.quality = e;
							break;
						case "speed":
							this.speed = parseFloat(e)
					}
					We.showMenuPanel.call(this, "home", R(t))
				}
			}), i, !1), We.bindMenuItemShortcuts.call(this, o, i), t.appendChild(o)
		},
		formatTime(e = 0, t = !1) {
			if (!$(e)) return e;
			return Ue(e, Be(this.duration) > 0, t)
		},
		updateTimeDisplay(e = null, t = 0, i = !1) {
			H(e) && $(t) && (e.innerText = We.formatTime(t, i))
		},
		updateVolume() {
			this.supported.ui && (H(this.elements.inputs.volume) && We.setRange.call(this, this.elements.inputs.volume, this.muted ? 0 : this.volume), H(this.elements.buttons.mute) && (this.elements.buttons.mute.pressed = this.muted || 0 === this.volume))
		},
		setRange(e, t = 0) {
			H(e) && (e.value = t, We.updateRangeFill.call(this, e))
		},
		updateProgress(e) {
			if (!this.supported.ui || !F(e)) return;
			let t = 0;
			const i = (e, t) => {
				const i = $(t) ? t : 0,
					s = H(e) ? e : this.elements.display.buffer;
				if (H(s)) {
					s.value = i;
					const e = s.getElementsByTagName("span")[0];
					H(e) && (e.childNodes[0].nodeValue = i)
				}
			};
			if (e) switch (e.type) {
				case "timeupdate":
				case "seeking":
				case "seeked":
					s = this.currentTime, n = this.duration, t = 0 === s || 0 === n || Number.isNaN(s) || Number.isNaN(n) ? 0 : (s / n * 100).toFixed(2), "timeupdate" === e.type && We.setRange.call(this, this.elements.inputs.seek, t);
					break;
				case "playing":
				case "progress":
					i(this.elements.display.buffer, 100 * this.buffered)
			}
			var s, n
		},
		updateRangeFill(e) {
			const t = F(e) ? e.target : e;
			if (H(t) && "range" === t.getAttribute("type")) {
				if (re(t, this.config.selectors.inputs.seek)) {
					t.setAttribute("aria-valuenow", this.currentTime);
					const e = We.formatTime(this.currentTime),
						i = We.formatTime(this.duration),
						s = He.get("seekLabel", this.config);
					t.setAttribute("aria-valuetext", s.replace("{currentTime}", e).replace("{duration}", i))
				} else if (re(t, this.config.selectors.inputs.volume)) {
					const e = 100 * t.value;
					t.setAttribute("aria-valuenow", e), t.setAttribute("aria-valuetext", `${e.toFixed(1)}%`)
				} else t.setAttribute("aria-valuenow", t.value);
				Y.isWebkit && t.style.setProperty("--value", t.value / t.max * 100 + "%")
			}
		},
		updateSeekTooltip(e) {
			if (!this.config.tooltips.seek || !H(this.elements.inputs.seek) || !H(this.elements.display.seekTooltip) || 0 === this.duration) return;
			const t = `${this.config.classNames.tooltip}--visible`,
				i = e => le(this.elements.display.seekTooltip, t, e);
			if (this.touch) return void i(!1);
			let s = 0;
			const n = this.elements.progress.getBoundingClientRect();
			if (F(e)) s = 100 / n.width * (e.pageX - n.left);
			else {
				if (!oe(this.elements.display.seekTooltip, t)) return;
				s = parseFloat(this.elements.display.seekTooltip.style.left, 10)
			}
			s < 0 ? s = 0 : s > 100 && (s = 100), We.updateTimeDisplay.call(this, this.elements.display.seekTooltip, this.duration / 100 * s), this.elements.display.seekTooltip.style.left = `${s}%`, F(e) && ["mouseenter", "mouseleave"].includes(e.type) && i("mouseenter" === e.type)
		},
		timeUpdate(e) {
			const t = !H(this.elements.display.duration) && this.config.invertTime;
			We.updateTimeDisplay.call(this, this.elements.display.currentTime, t ? this.duration - this.currentTime : this.currentTime, t), e && "timeupdate" === e.type && this.media.seeking || We.updateProgress.call(this, e)
		},
		durationUpdate() {
			if (!this.supported.ui || !this.config.invertTime && this.currentTime) return;
			if (this.duration >= 2 ** 32) return ae(this.elements.display.currentTime, !0), void ae(this.elements.progress, !0);
			H(this.elements.inputs.seek) && this.elements.inputs.seek.setAttribute("aria-valuemax", this.duration);
			const e = H(this.elements.display.duration);
			!e && this.config.displayDuration && this.paused && We.updateTimeDisplay.call(this, this.elements.display.currentTime, this.duration), e && We.updateTimeDisplay.call(this, this.elements.display.duration, this.duration), We.updateSeekTooltip.call(this)
		},
		toggleMenuButton(e, t) {
			ae(this.elements.settings.buttons[e], !t)
		},
		updateSetting(e, t, i) {
			const s = this.elements.settings.panels[e];
			let n = null,
				a = t;
			if ("captions" === e) n = this.currentTrack;
			else {
				if (n = W(i) ? this[e] : i, W(n) && (n = this.config[e].default), !W(this.options[e]) && !this.options[e].includes(n)) return void this.debug.warn(`Unsupported value of '${n}' for ${e}`);
				if (!this.config[e].options.includes(n)) return void this.debug.warn(`Disabled value of '${n}' for ${e}`)
			}
			if (H(a) || (a = s && s.querySelector('[role="menu"]')), !H(a)) return;
			this.elements.settings.buttons[e].querySelector(`.${this.config.classNames.menu.value}`).innerHTML = We.getLabel.call(this, e, n);
			const l = a && a.querySelector(`[value="${n}"]`);
			H(l) && (l.checked = !0)
		},
		getLabel(e, t) {
			switch (e) {
				case "speed":
					return 1 === t ? He.get("normal", this.config) : `${t}&times;`;
				case "quality":
					if ($(t)) {
						const e = He.get(`qualityLabel.${t}`, this.config);
						return e.length ? e : `${t}p`
					}
					return Oe(t);
				case "captions":
					return Ye.getLabel.call(this);
				default:
					return null
			}
		},
		setQualityMenu(e) {
			if (!H(this.elements.settings.panels.quality)) return;
			const t = "quality",
				i = this.elements.settings.panels.quality.querySelector('[role="menu"]');
			q(e) && (this.options.quality = Ce(e).filter((e => this.config.quality.options.includes(e))));
			const s = !W(this.options.quality) && this.options.quality.length > 1;
			if (We.toggleMenuButton.call(this, t, s), ie(i), We.checkMenu.call(this), !s) return;
			const n = e => {
				const t = He.get(`qualityBadge.${e}`, this.config);
				return t.length ? We.createBadge.call(this, t) : null
			};
			this.options.quality.sort(((e, t) => {
				const i = this.config.quality.options;
				return i.indexOf(e) > i.indexOf(t) ? 1 : -1
			})).forEach((e => {
				We.createMenuItem.call(this, {
					value: e,
					list: i,
					type: t,
					title: We.getLabel.call(this, "quality", e),
					badge: n(e)
				})
			})), We.updateSetting.call(this, t, i)
		},
		setCaptionsMenu() {
			if (!H(this.elements.settings.panels.captions)) return;
			const e = "captions",
				t = this.elements.settings.panels.captions.querySelector('[role="menu"]'),
				i = Ye.getTracks.call(this),
				s = Boolean(i.length);
			if (We.toggleMenuButton.call(this, e, s), ie(t), We.checkMenu.call(this), !s) return;
			const n = i.map(((e, i) => ({
				value: i,
				checked: this.captions.toggled && this.currentTrack === i,
				title: Ye.getLabel.call(this, e),
				badge: e.language && We.createBadge.call(this, e.language.toUpperCase()),
				list: t,
				type: "language"
			})));
			n.unshift({
				value: -1,
				checked: !this.captions.toggled,
				title: He.get("disabled", this.config),
				list: t,
				type: "language"
			}), n.forEach(We.createMenuItem.bind(this)), We.updateSetting.call(this, e, t)
		},
		setSpeedMenu() {
			if (!H(this.elements.settings.panels.speed)) return;
			const e = "speed",
				t = this.elements.settings.panels.speed.querySelector('[role="menu"]');
			this.options.speed = this.options.speed.filter((e => e >= this.minimumSpeed && e <= this.maximumSpeed));
			const i = !W(this.options.speed) && this.options.speed.length > 1;
			We.toggleMenuButton.call(this, e, i), ie(t), We.checkMenu.call(this), i && (this.options.speed.forEach((i => {
				We.createMenuItem.call(this, {
					value: i,
					list: t,
					type: e,
					title: We.getLabel.call(this, "speed", i)
				})
			})), We.updateSetting.call(this, e, t))
		},
		checkMenu() {
			const {
				buttons: e
			} = this.elements.settings, t = !W(e) && Object.values(e).some((e => !e.hidden));
			ae(this.elements.settings.menu, !t)
		},
		focusFirstMenuItem(e, t = !1) {
			if (this.elements.settings.popup.hidden) return;
			let i = e;
			H(i) || (i = Object.values(this.elements.settings.panels).find((e => !e.hidden)));
			const s = i.querySelector('[role^="menuitem"]');
			ue.call(this, s, t)
		},
		toggleMenu(e) {
			const {
				popup: t
			} = this.elements.settings, i = this.elements.buttons.settings;
			if (!H(t) || !H(i)) return;
			const {
				hidden: s
			} = t;
			let n = s;
			if (O(e)) n = e;
			else if (R(e) && 27 === e.which) n = !1;
			else if (F(e)) {
				const s = j(e.composedPath) ? e.composedPath()[0] : e.target,
					a = t.contains(s);
				if (a || !a && e.target !== i && n) return
			}
			i.setAttribute("aria-expanded", n), ae(t, !n), le(this.elements.container, this.config.classNames.menu.open, n), n && R(e) ? We.focusFirstMenuItem.call(this, null, !0) : n || s || ue.call(this, i, R(e))
		},
		getMenuSize(e) {
			const t = e.cloneNode(!0);
			t.style.position = "absolute", t.style.opacity = 0, t.removeAttribute("hidden"), e.parentNode.appendChild(t);
			const i = t.scrollWidth,
				s = t.scrollHeight;
			return te(t), {
				width: i,
				height: s
			}
		},
		showMenuPanel(e = "", t = !1) {
			const i = this.elements.container.querySelector(`#plyr-settings-${this.id}-${e}`);
			if (!H(i)) return;
			const s = i.parentNode,
				n = Array.from(s.children).find((e => !e.hidden));
			if (me.transitions && !me.reducedMotion) {
				s.style.width = `${n.scrollWidth}px`, s.style.height = `${n.scrollHeight}px`;
				const e = We.getMenuSize.call(this, i),
					t = e => {
						e.target === s && ["width", "height"].includes(e.propertyName) && (s.style.width = "", s.style.height = "", be.call(this, s, z, t))
					};
				fe.call(this, s, z, t), s.style.width = `${e.width}px`, s.style.height = `${e.height}px`
			}
			ae(n, !0), ae(i, !1), We.focusFirstMenuItem.call(this, i, t)
		},
		setDownloadUrl() {
			const e = this.elements.buttons.download;
			H(e) && e.setAttribute("href", this.download)
		},
		create(e) {
			const {
				bindMenuItemShortcuts: t,
				createButton: i,
				createProgress: s,
				createRange: n,
				createTime: a,
				setQualityMenu: l,
				setSpeedMenu: o,
				showMenuPanel: r
			} = We;
			this.elements.controls = null, q(this.config.controls) && this.config.controls.includes("play-large") && this.elements.container.appendChild(i.call(this, "play-large"));
			const c = Z("div", ne(this.config.selectors.controls.wrapper));
			this.elements.controls = c;
			const h = {
				class: "plyr__controls__item"
			};
			return Ce(q(this.config.controls) ? this.config.controls : []).forEach((l => {
				if ("restart" === l && c.appendChild(i.call(this, "restart", h)), "rewind" === l && c.appendChild(i.call(this, "rewind", h)), "play" === l && c.appendChild(i.call(this, "play", h)), "fast-forward" === l && c.appendChild(i.call(this, "fast-forward", h)), "progress" === l) {
					const t = Z("div", {
							class: `${h.class} plyr__progress__container`
						}),
						i = Z("div", ne(this.config.selectors.progress));
					if (i.appendChild(n.call(this, "seek", {
							id: `plyr-seek-${e.id}`
						})), i.appendChild(s.call(this, "buffer")), this.config.tooltips.seek) {
						const e = Z("span", {
							class: this.config.classNames.tooltip
						}, "00:00");
						i.appendChild(e), this.elements.display.seekTooltip = e
					}
					this.elements.progress = i, t.appendChild(this.elements.progress), c.appendChild(t)
				}
				if ("current-time" === l && c.appendChild(a.call(this, "currentTime", h)), "duration" === l && c.appendChild(a.call(this, "duration", h)), "mute" === l || "volume" === l) {
					let {
						volume: t
					} = this.elements;
					if (H(t) && c.contains(t) || (t = Z("div", X({}, h, {
							class: `${h.class} plyr__volume`.trim()
						})), this.elements.volume = t, c.appendChild(t)), "mute" === l && t.appendChild(i.call(this, "mute")), "volume" === l && !Y.isIos) {
						const i = {
							max: 1,
							step: .05,
							value: this.config.volume
						};
						t.appendChild(n.call(this, "volume", X(i, {
							id: `plyr-volume-${e.id}`
						})))
					}
				}
				if ("captions" === l && c.appendChild(i.call(this, "captions", h)), "settings" === l && !W(this.config.settings)) {
					const s = Z("div", X({}, h, {
						class: `${h.class} plyr__menu`.trim(),
						hidden: ""
					}));
					s.appendChild(i.call(this, "settings", {
						"aria-haspopup": !0,
						"aria-controls": `plyr-settings-${e.id}`,
						"aria-expanded": !1
					}));
					const n = Z("div", {
							class: "plyr__menu__container",
							id: `plyr-settings-${e.id}`,
							hidden: ""
						}),
						a = Z("div"),
						l = Z("div", {
							id: `plyr-settings-${e.id}-home`
						}),
						o = Z("div", {
							role: "menu"
						});
					l.appendChild(o), a.appendChild(l), this.elements.settings.panels.home = l, this.config.settings.forEach((i => {
						const s = Z("button", X(ne(this.config.selectors.buttons.settings), {
							type: "button",
							class: `${this.config.classNames.control} ${this.config.classNames.control}--forward`,
							role: "menuitem",
							"aria-haspopup": !0,
							hidden: ""
						}));
						t.call(this, s, i), fe.call(this, s, "click", (() => {
							r.call(this, i, !1)
						}));
						const n = Z("span", null, He.get(i, this.config)),
							l = Z("span", {
								class: this.config.classNames.menu.value
							});
						l.innerHTML = e[i], n.appendChild(l), s.appendChild(n), o.appendChild(s);
						const c = Z("div", {
								id: `plyr-settings-${e.id}-${i}`,
								hidden: ""
							}),
							h = Z("button", {
								type: "button",
								class: `${this.config.classNames.control} ${this.config.classNames.control}--back`
							});
						h.appendChild(Z("span", {
							"aria-hidden": !0
						}, He.get(i, this.config))), h.appendChild(Z("span", {
							class: this.config.classNames.hidden
						}, He.get("menuBack", this.config))), fe.call(this, c, "keydown", (e => {
							37 === e.which && (e.preventDefault(), e.stopPropagation(), r.call(this, "home", !0))
						}), !1), fe.call(this, h, "click", (() => {
							r.call(this, "home", !1)
						})), c.appendChild(h), c.appendChild(Z("div", {
							role: "menu"
						})), a.appendChild(c), this.elements.settings.buttons[i] = s, this.elements.settings.panels[i] = c
					})), n.appendChild(a), s.appendChild(n), c.appendChild(s), this.elements.settings.popup = n, this.elements.settings.menu = s
				}
				if ("pip" === l && me.pip && c.appendChild(i.call(this, "pip", h)), "airplay" === l && me.airplay && c.appendChild(i.call(this, "airplay", h)), "download" === l) {
					const e = X({}, h, {
						element: "a",
						href: this.download,
						target: "_blank"
					});
					this.isHTML5 && (e.download = "");
					const {
						download: t
					} = this.config.urls;
					!U(t) && this.isEmbed && X(e, {
						icon: `logo-${this.provider}`,
						label: this.provider
					}), c.appendChild(i.call(this, "download", e))
				}
				"fullscreen" === l && c.appendChild(i.call(this, "fullscreen", h))
			})), this.isHTML5 && l.call(this, Le.getQualityOptions.call(this)), o.call(this), c
		},
		inject() {
			if (this.config.loadSprite) {
				const e = We.getIconUrl.call(this);
				e.cors && Ve(e.url, "sprite-plyr")
			}
			this.id = Math.floor(1e4 * Math.random());
			let e = null;
			this.elements.controls = null;
			const t = {
				id: this.id,
				seektime: this.config.seekTime,
				title: this.config.title
			};
			let i = !0;
			j(this.config.controls) && (this.config.controls = this.config.controls.call(this, t)), this.config.controls || (this.config.controls = []), H(this.config.controls) || _(this.config.controls) ? e = this.config.controls : (e = We.create.call(this, {
				id: this.id,
				seektime: this.config.seekTime,
				speed: this.speed,
				quality: this.quality,
				captions: Ye.getLabel.call(this)
			}), i = !1);
			let s;
			i && _(this.config.controls) && (e = (e => {
				let i = e;
				return Object.entries(t).forEach((([e, t]) => {
					i = _e(i, `{${e}}`, t)
				})), i
			})(e)), _(this.config.selectors.controls.container) && (s = document.querySelector(this.config.selectors.controls.container)), H(s) || (s = this.elements.container);
			if (s[H(e) ? "insertAdjacentElement" : "insertAdjacentHTML"]("afterbegin", e), H(this.elements.controls) || We.findElements.call(this), !W(this.elements.buttons)) {
				const e = e => {
					const t = this.config.classNames.controlPressed;
					Object.defineProperty(e, "pressed", {
						enumerable: !0,
						get: () => oe(e, t),
						set(i = !1) {
							le(e, t, i)
						}
					})
				};
				Object.values(this.elements.buttons).filter(Boolean).forEach((t => {
					q(t) || D(t) ? Array.from(t).filter(Boolean).forEach(e) : e(t)
				}))
			}
			if (Y.isEdge && K(s), this.config.tooltips.controls) {
				const {
					classNames: e,
					selectors: t
				} = this.config, i = `${t.controls.wrapper} ${t.labels} .${e.hidden}`, s = ce.call(this, i);
				Array.from(s).forEach((e => {
					le(e, this.config.classNames.hidden, !1), le(e, this.config.classNames.tooltip, !0)
				}))
			}
		}
	};

	function ze(e, t = !0) {
		let i = e;
		if (t) {
			const e = document.createElement("a");
			e.href = i, i = e.href
		}
		try {
			return new URL(i)
		} catch (e) {
			return null
		}
	}

	function Ke(e) {
		const t = new URLSearchParams;
		return L(e) && Object.entries(e).forEach((([e, i]) => {
			t.set(e, i)
		})), t
	}
	const Ye = {
			setup() {
				if (!this.supported.ui) return;
				if (!this.isVideo || this.isYouTube || this.isHTML5 && !me.textTracks) return void(q(this.config.controls) && this.config.controls.includes("settings") && this.config.settings.includes("captions") && We.setCaptionsMenu.call(this));
				var e, t;
				if (H(this.elements.captions) || (this.elements.captions = Z("div", ne(this.config.selectors.captions)), e = this.elements.captions, t = this.elements.wrapper, H(e) && H(t) && t.parentNode.insertBefore(e, t.nextSibling)), Y.isIE && window.URL) {
					const e = this.media.querySelectorAll("track");
					Array.from(e).forEach((e => {
						const t = e.getAttribute("src"),
							i = ze(t);
						null !== i && i.hostname !== window.location.href.hostname && ["http:", "https:"].includes(i.protocol) && Re(t, "blob").then((t => {
							e.setAttribute("src", window.URL.createObjectURL(t))
						})).catch((() => {
							te(e)
						}))
					}))
				}
				const i = Ce((navigator.languages || [navigator.language || navigator.userLanguage || "en"]).map((e => e.split("-")[0])));
				let s = (this.storage.get("language") || this.config.captions.language || "auto").toLowerCase();
				"auto" === s && ([s] = i);
				let n = this.storage.get("captions");
				if (O(n) || ({
						active: n
					} = this.config.captions), Object.assign(this.captions, {
						toggled: !1,
						active: n,
						language: s,
						languages: i
					}), this.isHTML5) {
					const e = this.config.captions.update ? "addtrack removetrack" : "removetrack";
					fe.call(this, this.media.textTracks, e, Ye.update.bind(this))
				}
				setTimeout(Ye.update.bind(this), 0)
			},
			update() {
				const e = Ye.getTracks.call(this, !0),
					{
						active: t,
						language: i,
						meta: s,
						currentTrackNode: n
					} = this.captions,
					a = Boolean(e.find((e => e.language === i)));
				this.isHTML5 && this.isVideo && e.filter((e => !s.get(e))).forEach((e => {
					this.debug.log("Track added", e), s.set(e, {
						default: "showing" === e.mode
					}), "showing" === e.mode && (e.mode = "hidden"), fe.call(this, e, "cuechange", (() => Ye.updateCues.call(this)))
				})), (a && this.language !== i || !e.includes(n)) && (Ye.setLanguage.call(this, i), Ye.toggle.call(this, t && a)), this.elements && le(this.elements.container, this.config.classNames.captions.enabled, !W(e)), q(this.config.controls) && this.config.controls.includes("settings") && this.config.settings.includes("captions") && We.setCaptionsMenu.call(this)
			},
			toggle(e, t = !0) {
				if (!this.supported.ui) return;
				const {
					toggled: i
				} = this.captions, s = this.config.classNames.captions.active, n = I(e) ? !i : e;
				if (n !== i) {
					if (t || (this.captions.active = n, this.storage.set({
							captions: n
						})), !this.language && n && !t) {
						const e = Ye.getTracks.call(this),
							t = Ye.findTrack.call(this, [this.captions.language, ...this.captions.languages], !0);
						return this.captions.language = t.language, void Ye.set.call(this, e.indexOf(t))
					}
					this.elements.buttons.captions && (this.elements.buttons.captions.pressed = n), le(this.elements.container, s, n), this.captions.toggled = n, We.updateSetting.call(this, "captions"), ve.call(this, this.media, n ? "captionsenabled" : "captionsdisabled")
				}
				setTimeout((() => {
					n && this.captions.toggled && (this.captions.currentTrackNode.mode = "hidden")
				}))
			},
			set(e, t = !0) {
				const i = Ye.getTracks.call(this);
				if (-1 !== e)
					if ($(e))
						if (e in i) {
							if (this.captions.currentTrack !== e) {
								this.captions.currentTrack = e;
								const s = i[e],
									{
										language: n
									} = s || {};
								this.captions.currentTrackNode = s, We.updateSetting.call(this, "captions"), t || (this.captions.language = n, this.storage.set({
									language: n
								})), this.isVimeo && this.embed.enableTextTrack(n), ve.call(this, this.media, "languagechange")
							}
							Ye.toggle.call(this, !0, t), this.isHTML5 && this.isVideo && Ye.updateCues.call(this)
						} else this.debug.warn("Track not found", e);
				else this.debug.warn("Invalid caption argument", e);
				else Ye.toggle.call(this, !1, t)
			},
			setLanguage(e, t = !0) {
				if (!_(e)) return void this.debug.warn("Invalid language argument", e);
				const i = e.toLowerCase();
				this.captions.language = i;
				const s = Ye.getTracks.call(this),
					n = Ye.findTrack.call(this, [i]);
				Ye.set.call(this, s.indexOf(n), t)
			},
			getTracks(e = !1) {
				return Array.from((this.media || {}).textTracks || []).filter((t => !this.isHTML5 || e || this.captions.meta.has(t))).filter((e => ["captions", "subtitles"].includes(e.kind)))
			},
			findTrack(e, t = !1) {
				const i = Ye.getTracks.call(this),
					s = e => Number((this.captions.meta.get(e) || {}).default),
					n = Array.from(i).sort(((e, t) => s(t) - s(e)));
				let a;
				return e.every((e => (a = n.find((t => t.language === e)), !a))), a || (t ? n[0] : void 0)
			},
			getCurrentTrack() {
				return Ye.getTracks.call(this)[this.currentTrack]
			},
			getLabel(e) {
				let t = e;
				return !V(t) && me.textTracks && this.captions.toggled && (t = Ye.getCurrentTrack.call(this)), V(t) ? W(t.label) ? W(t.language) ? He.get("enabled", this.config) : e.language.toUpperCase() : t.label : He.get("disabled", this.config)
			},
			updateCues(e) {
				if (!this.supported.ui) return;
				if (!H(this.elements.captions)) return void this.debug.warn("No captions element to render to");
				if (!I(e) && !Array.isArray(e)) return void this.debug.warn("updateCues: Invalid input", e);
				let t = e;
				if (!t) {
					const e = Ye.getCurrentTrack.call(this);
					t = Array.from((e || {}).activeCues || []).map((e => e.getCueAsHTML())).map(qe)
				}
				const i = t.map((e => e.trim())).join("\n");
				if (i !== this.elements.captions.innerHTML) {
					ie(this.elements.captions);
					const e = Z("span", ne(this.config.selectors.caption));
					e.innerHTML = i, this.elements.captions.appendChild(e), ve.call(this, this.media, "cuechange")
				}
			}
		},
		Qe = {
			enabled: !0,
			title: "",
			debug: !1,
			autoplay: !1,
			autopause: !0,
			playsinline: !0,
			seekTime: 10,
			volume: 1,
			muted: !1,
			duration: null,
			displayDuration: !0,
			invertTime: !0,
			toggleInvert: !0,
			ratio: null,
			clickToPlay: !0,
			hideControls: !0,
			resetOnEnd: !1,
			disableContextMenu: !0,
			loadSprite: !0,
			iconPrefix: "plyr",
			iconUrl: "https://cdn.plyr.io/3.6.12/plyr.svg",
			blankVideo: "https://cdn.plyr.io/static/blank.mp4",
			quality: {
				default: 576,
				options: [4320, 2880, 2160, 1440, 1080, 720, 576, 480, 360, 240],
				forced: !1,
				onChange: null
			},
			loop: {
				active: !1
			},
			speed: {
				selected: 1,
				options: [.5, .75, 1, 1.25, 1.5, 1.75, 2, 4]
			},
			keyboard: {
				focused: !0,
				global: !1
			},
			tooltips: {
				controls: !1,
				seek: !0
			},
			captions: {
				active: !1,
				language: "auto",
				update: !1
			},
			fullscreen: {
				enabled: !0,
				fallback: !0,
				iosNative: !1
			},
			storage: {
				enabled: !0,
				key: "plyr"
			},
			controls: ["play-large", "play", "progress", "current-time", "mute", "volume", "captions", "settings", "pip", "airplay", "fullscreen"],
			settings: ["captions", "quality", "speed"],
			i18n: {
				restart: "Restart",
				rewind: "Rewind {seektime}s",
				play: "Play",
				pause: "Pause",
				fastForward: "Forward {seektime}s",
				seek: "Seek",
				seekLabel: "{currentTime} of {duration}",
				played: "Played",
				buffered: "Buffered",
				currentTime: "Current time",
				duration: "Duration",
				volume: "Volume",
				mute: "Mute",
				unmute: "Unmute",
				enableCaptions: "Enable captions",
				disableCaptions: "Disable captions",
				download: "Download",
				enterFullscreen: "Enter fullscreen",
				exitFullscreen: "Exit fullscreen",
				frameTitle: "Player for {title}",
				captions: "Captions",
				settings: "Settings",
				pip: "PIP",
				menuBack: "Go back to previous menu",
				speed: "Speed",
				normal: "Normal",
				quality: "Quality",
				loop: "Loop",
				start: "Start",
				end: "End",
				all: "All",
				reset: "Reset",
				disabled: "Disabled",
				enabled: "Enabled",
				advertisement: "Ad",
				qualityBadge: {
					2160: "4K",
					1440: "HD",
					1080: "HD",
					720: "HD",
					576: "SD",
					480: "SD"
				}
			},
			urls: {
				download: null,
				vimeo: {
					sdk: "https://player.vimeo.com/api/player.js",
					iframe: "https://player.vimeo.com/video/{0}?{1}",
					api: "https://vimeo.com/api/oembed.json?url={0}"
				},
				youtube: {
					sdk: "https://www.youtube.com/iframe_api",
					api: "https://noembed.com/embed?url=https://www.youtube.com/watch?v={0}"
				},
				googleIMA: {
					sdk: "https://imasdk.googleapis.com/js/sdkloader/ima3.js"
				}
			},
			listeners: {
				seek: null,
				play: null,
				pause: null,
				restart: null,
				rewind: null,
				fastForward: null,
				mute: null,
				volume: null,
				captions: null,
				download: null,
				fullscreen: null,
				pip: null,
				airplay: null,
				speed: null,
				quality: null,
				loop: null,
				language: null
			},
			events: ["ended", "progress", "stalled", "playing", "waiting", "canplay", "canplaythrough", "loadstart", "loadeddata", "loadedmetadata", "timeupdate", "volumechange", "play", "pause", "error", "seeking", "seeked", "emptied", "ratechange", "cuechange", "download", "enterfullscreen", "exitfullscreen", "captionsenabled", "captionsdisabled", "languagechange", "controlshidden", "controlsshown", "ready", "statechange", "qualitychange", "adsloaded", "adscontentpause", "adscontentresume", "adstarted", "adsmidpoint", "adscomplete", "adsallcomplete", "adsimpression", "adsclick"],
			selectors: {
				editable: "input, textarea, select, [contenteditable]",
				container: ".plyr",
				controls: {
					container: null,
					wrapper: ".plyr__controls"
				},
				labels: "[data-plyr]",
				buttons: {
					play: '[data-plyr="play"]',
					pause: '[data-plyr="pause"]',
					restart: '[data-plyr="restart"]',
					rewind: '[data-plyr="rewind"]',
					fastForward: '[data-plyr="fast-forward"]',
					mute: '[data-plyr="mute"]',
					captions: '[data-plyr="captions"]',
					download: '[data-plyr="download"]',
					fullscreen: '[data-plyr="fullscreen"]',
					pip: '[data-plyr="pip"]',
					airplay: '[data-plyr="airplay"]',
					settings: '[data-plyr="settings"]',
					loop: '[data-plyr="loop"]'
				},
				inputs: {
					seek: '[data-plyr="seek"]',
					volume: '[data-plyr="volume"]',
					speed: '[data-plyr="speed"]',
					language: '[data-plyr="language"]',
					quality: '[data-plyr="quality"]'
				},
				display: {
					currentTime: ".plyr__time--current",
					duration: ".plyr__time--duration",
					buffer: ".plyr__progress__buffer",
					loop: ".plyr__progress__loop",
					volume: ".plyr__volume--display"
				},
				progress: ".plyr__progress",
				captions: ".plyr__captions",
				caption: ".plyr__caption"
			},
			classNames: {
				type: "plyr--{0}",
				provider: "plyr--{0}",
				video: "plyr__video-wrapper",
				embed: "plyr__video-embed",
				videoFixedRatio: "plyr__video-wrapper--fixed-ratio",
				embedContainer: "plyr__video-embed__container",
				poster: "plyr__poster",
				posterEnabled: "plyr__poster-enabled",
				ads: "plyr__ads",
				control: "plyr__control",
				controlPressed: "plyr__control--pressed",
				playing: "plyr--playing",
				paused: "plyr--paused",
				stopped: "plyr--stopped",
				loading: "plyr--loading",
				hover: "plyr--hover",
				tooltip: "plyr__tooltip",
				cues: "plyr__cues",
				hidden: "plyr__sr-only",
				hideControls: "plyr--hide-controls",
				isIos: "plyr--is-ios",
				isTouch: "plyr--is-touch",
				uiSupported: "plyr--full-ui",
				noTransition: "plyr--no-transition",
				display: {
					time: "plyr__time"
				},
				menu: {
					value: "plyr__menu__value",
					badge: "plyr__badge",
					open: "plyr--menu-open"
				},
				captions: {
					enabled: "plyr--captions-enabled",
					active: "plyr--captions-active"
				},
				fullscreen: {
					enabled: "plyr--fullscreen-enabled",
					fallback: "plyr--fullscreen-fallback"
				},
				pip: {
					supported: "plyr--pip-supported",
					active: "plyr--pip-active"
				},
				airplay: {
					supported: "plyr--airplay-supported",
					active: "plyr--airplay-active"
				},
				tabFocus: "plyr__tab-focus",
				previewThumbnails: {
					thumbContainer: "plyr__preview-thumb",
					thumbContainerShown: "plyr__preview-thumb--is-shown",
					imageContainer: "plyr__preview-thumb__image-container",
					timeContainer: "plyr__preview-thumb__time-container",
					scrubbingContainer: "plyr__preview-scrubbing",
					scrubbingContainerShown: "plyr__preview-scrubbing--is-shown"
				}
			},
			attributes: {
				embed: {
					provider: "data-plyr-provider",
					id: "data-plyr-embed-id",
					hash: "data-plyr-embed-hash"
				}
			},
			ads: {
				enabled: !1,
				publisherId: "",
				tagUrl: ""
			},
			previewThumbnails: {
				enabled: !1,
				src: ""
			},
			vimeo: {
				byline: !1,
				portrait: !1,
				title: !1,
				speed: !0,
				transparent: !1,
				customControls: !0,
				referrerPolicy: null,
				premium: !1
			},
			youtube: {
				rel: 0,
				showinfo: 0,
				iv_load_policy: 3,
				modestbranding: 1,
				customControls: !0,
				noCookie: !1
			}
		},
		Xe = "picture-in-picture",
		Je = "inline",
		Ge = {
			html5: "html5",
			youtube: "youtube",
			vimeo: "vimeo"
		},
		Ze = "audio",
		et = "video";
	const tt = () => {};
	class it {
		constructor(e = !1) {
			this.enabled = window.console && e, this.enabled && this.log("Debugging enabled")
		}
		get log() {
			return this.enabled ? Function.prototype.bind.call(console.log, console) : tt
		}
		get warn() {
			return this.enabled ? Function.prototype.bind.call(console.warn, console) : tt
		}
		get error() {
			return this.enabled ? Function.prototype.bind.call(console.error, console) : tt
		}
	}
	class st {
		constructor(t) {
			e(this, "onChange", (() => {
				if (!this.enabled) return;
				const e = this.player.elements.buttons.fullscreen;
				H(e) && (e.pressed = this.active);
				const t = this.target === this.player.media ? this.target : this.player.elements.container;
				ve.call(this.player, t, this.active ? "enterfullscreen" : "exitfullscreen", !0)
			})), e(this, "toggleFallback", ((e = !1) => {
				if (e ? this.scrollPosition = {
						x: window.scrollX || 0,
						y: window.scrollY || 0
					} : window.scrollTo(this.scrollPosition.x, this.scrollPosition.y), document.body.style.overflow = e ? "hidden" : "", le(this.target, this.player.config.classNames.fullscreen.fallback, e), Y.isIos) {
					let t = document.head.querySelector('meta[name="viewport"]');
					const i = "viewport-fit=cover";
					t || (t = document.createElement("meta"), t.setAttribute("name", "viewport"));
					const s = _(t.content) && t.content.includes(i);
					e ? (this.cleanupViewport = !s, s || (t.content += `,${i}`)) : this.cleanupViewport && (t.content = t.content.split(",").filter((e => e.trim() !== i)).join(","))
				}
				this.onChange()
			})), e(this, "trapFocus", (e => {
				if (Y.isIos || !this.active || "Tab" !== e.key || 9 !== e.keyCode) return;
				const t = document.activeElement,
					i = ce.call(this.player, "a[href], button:not(:disabled), input:not(:disabled), [tabindex]"),
					[s] = i,
					n = i[i.length - 1];
				t !== n || e.shiftKey ? t === s && e.shiftKey && (n.focus(), e.preventDefault()) : (s.focus(), e.preventDefault())
			})), e(this, "update", (() => {
				if (this.enabled) {
					let e;
					e = this.forceFallback ? "Fallback (forced)" : st.native ? "Native" : "Fallback", this.player.debug.log(`${e} fullscreen enabled`)
				} else this.player.debug.log("Fullscreen not supported and fallback disabled");
				le(this.player.elements.container, this.player.config.classNames.fullscreen.enabled, this.enabled)
			})), e(this, "enter", (() => {
				this.enabled && (Y.isIos && this.player.config.fullscreen.iosNative ? this.player.isVimeo ? this.player.embed.requestFullscreen() : this.target.webkitEnterFullscreen() : !st.native || this.forceFallback ? this.toggleFallback(!0) : this.prefix ? W(this.prefix) || this.target[`${this.prefix}Request${this.property}`]() : this.target.requestFullscreen({
					navigationUI: "hide"
				}))
			})), e(this, "exit", (() => {
				if (this.enabled)
					if (Y.isIos && this.player.config.fullscreen.iosNative) this.target.webkitExitFullscreen(), ke(this.player.play());
					else if (!st.native || this.forceFallback) this.toggleFallback(!1);
				else if (this.prefix) {
					if (!W(this.prefix)) {
						const e = "moz" === this.prefix ? "Cancel" : "Exit";
						document[`${this.prefix}${e}${this.property}`]()
					}
				} else(document.cancelFullScreen || document.exitFullscreen).call(document)
			})), e(this, "toggle", (() => {
				this.active ? this.exit() : this.enter()
			})), this.player = t, this.prefix = st.prefix, this.property = st.property, this.scrollPosition = {
				x: 0,
				y: 0
			}, this.forceFallback = "force" === t.config.fullscreen.fallback, this.player.elements.fullscreen = t.config.fullscreen.container && function(e, t) {
				const {
					prototype: i
				} = Element;
				return (i.closest || function() {
					let e = this;
					do {
						if (re.matches(e, t)) return e;
						e = e.parentElement || e.parentNode
					} while (null !== e && 1 === e.nodeType);
					return null
				}).call(e, t)
			}(this.player.elements.container, t.config.fullscreen.container), fe.call(this.player, document, "ms" === this.prefix ? "MSFullscreenChange" : `${this.prefix}fullscreenchange`, (() => {
				this.onChange()
			})), fe.call(this.player, this.player.elements.container, "dblclick", (e => {
				H(this.player.elements.controls) && this.player.elements.controls.contains(e.target) || this.player.listeners.proxy(e, this.toggle, "fullscreen")
			})), fe.call(this, this.player.elements.container, "keydown", (e => this.trapFocus(e))), this.update()
		}
		static get native() {
			return !!(document.fullscreenEnabled || document.webkitFullscreenEnabled || document.mozFullScreenEnabled || document.msFullscreenEnabled)
		}
		get usingNative() {
			return st.native && !this.forceFallback
		}
		static get prefix() {
			if (j(document.exitFullscreen)) return "";
			let e = "";
			return ["webkit", "moz", "ms"].some((t => !(!j(document[`${t}ExitFullscreen`]) && !j(document[`${t}CancelFullScreen`])) && (e = t, !0))), e
		}
		static get property() {
			return "moz" === this.prefix ? "FullScreen" : "Fullscreen"
		}
		get enabled() {
			return (st.native || this.player.config.fullscreen.fallback) && this.player.config.fullscreen.enabled && this.player.supported.ui && this.player.isVideo
		}
		get active() {
			if (!this.enabled) return !1;
			if (!st.native || this.forceFallback) return oe(this.target, this.player.config.classNames.fullscreen.fallback);
			const e = this.prefix ? this.target.getRootNode()[`${this.prefix}${this.property}Element`] : this.target.getRootNode().fullscreenElement;
			return e && e.shadowRoot ? e === this.target.getRootNode().host : e === this.target
		}
		get target() {
			return Y.isIos && this.player.config.fullscreen.iosNative ? this.player.media : this.player.elements.fullscreen || this.player.elements.container
		}
	}

	function nt(e, t = 1) {
		return new Promise(((i, s) => {
			const n = new Image,
				a = () => {
					delete n.onload, delete n.onerror, (n.naturalWidth >= t ? i : s)(n)
				};
			Object.assign(n, {
				onload: a,
				onerror: a,
				src: e
			})
		}))
	}
	const at = {
		addStyleHook() {
			le(this.elements.container, this.config.selectors.container.replace(".", ""), !0), le(this.elements.container, this.config.classNames.uiSupported, this.supported.ui)
		},
		toggleNativeControls(e = !1) {
			e && this.isHTML5 ? this.media.setAttribute("controls", "") : this.media.removeAttribute("controls")
		},
		build() {
			if (this.listeners.media(), !this.supported.ui) return this.debug.warn(`Basic support only for ${this.provider} ${this.type}`), void at.toggleNativeControls.call(this, !0);
			H(this.elements.controls) || (We.inject.call(this), this.listeners.controls()), at.toggleNativeControls.call(this), this.isHTML5 && Ye.setup.call(this), this.volume = null, this.muted = null, this.loop = null, this.quality = null, this.speed = null, We.updateVolume.call(this), We.timeUpdate.call(this), We.durationUpdate.call(this), at.checkPlaying.call(this), le(this.elements.container, this.config.classNames.pip.supported, me.pip && this.isHTML5 && this.isVideo), le(this.elements.container, this.config.classNames.airplay.supported, me.airplay && this.isHTML5), le(this.elements.container, this.config.classNames.isIos, Y.isIos), le(this.elements.container, this.config.classNames.isTouch, this.touch), this.ready = !0, setTimeout((() => {
				ve.call(this, this.media, "ready")
			}), 0), at.setTitle.call(this), this.poster && at.setPoster.call(this, this.poster, !1).catch((() => {})), this.config.duration && We.durationUpdate.call(this)
		},
		setTitle() {
			let e = He.get("play", this.config);
			if (_(this.config.title) && !W(this.config.title) && (e += `, ${this.config.title}`), Array.from(this.elements.buttons.play || []).forEach((t => {
					t.setAttribute("aria-label", e)
				})), this.isEmbed) {
				const e = he.call(this, "iframe");
				if (!H(e)) return;
				const t = W(this.config.title) ? "video" : this.config.title,
					i = He.get("frameTitle", this.config);
				e.setAttribute("title", i.replace("{title}", t))
			}
		},
		togglePoster(e) {
			le(this.elements.container, this.config.classNames.posterEnabled, e)
		},
		setPoster(e, t = !0) {
			return t && this.poster ? Promise.reject(new Error("Poster already set")) : (this.media.setAttribute("data-poster", e), this.elements.poster.removeAttribute("hidden"), Te.call(this).then((() => nt(e))).catch((t => {
				throw e === this.poster && at.togglePoster.call(this, !1), t
			})).then((() => {
				if (e !== this.poster) throw new Error("setPoster cancelled by later call to setPoster")
			})).then((() => (Object.assign(this.elements.poster.style, {
				backgroundImage: `url('${e}')`,
				backgroundSize: ""
			}), at.togglePoster.call(this, !0), e))))
		},
		checkPlaying(e) {
			le(this.elements.container, this.config.classNames.playing, this.playing), le(this.elements.container, this.config.classNames.paused, this.paused), le(this.elements.container, this.config.classNames.stopped, this.stopped), Array.from(this.elements.buttons.play || []).forEach((e => {
				Object.assign(e, {
					pressed: this.playing
				}), e.setAttribute("aria-label", He.get(this.playing ? "pause" : "play", this.config))
			})), F(e) && "timeupdate" === e.type || at.toggleControls.call(this)
		},
		checkLoading(e) {
			this.loading = ["stalled", "waiting"].includes(e.type), clearTimeout(this.timers.loading), this.timers.loading = setTimeout((() => {
				le(this.elements.container, this.config.classNames.loading, this.loading), at.toggleControls.call(this)
			}), this.loading ? 250 : 0)
		},
		toggleControls(e) {
			const {
				controls: t
			} = this.elements;
			if (t && this.config.hideControls) {
				const i = this.touch && this.lastSeekTime + 2e3 > Date.now();
				this.toggleControls(Boolean(e || this.loading || this.paused || t.pressed || t.hover || i))
			}
		},
		migrateStyles() {
			Object.values({
				...this.media.style
			}).filter((e => !W(e) && _(e) && e.startsWith("--plyr"))).forEach((e => {
				this.elements.container.style.setProperty(e, this.media.style.getPropertyValue(e)), this.media.style.removeProperty(e)
			})), W(this.media.style) && this.media.removeAttribute("style")
		}
	};
	class lt {
		constructor(t) {
			e(this, "firstTouch", (() => {
				const {
					player: e
				} = this, {
					elements: t
				} = e;
				e.touch = !0, le(t.container, e.config.classNames.isTouch, !0)
			})), e(this, "setTabFocus", (e => {
				const {
					player: t
				} = this, {
					elements: i
				} = t;
				if (clearTimeout(this.focusTimer), "keydown" === e.type && 9 !== e.which) return;
				"keydown" === e.type && (this.lastKeyDown = e.timeStamp);
				const s = e.timeStamp - this.lastKeyDown <= 20;
				("focus" !== e.type || s) && ((() => {
					const e = t.config.classNames.tabFocus;
					le(ce.call(t, `.${e}`), e, !1)
				})(), "focusout" !== e.type && (this.focusTimer = setTimeout((() => {
					const e = document.activeElement;
					i.container.contains(e) && le(document.activeElement, t.config.classNames.tabFocus, !0)
				}), 10)))
			})), e(this, "global", ((e = !0) => {
				const {
					player: t
				} = this;
				t.config.keyboard.global && ge.call(t, window, "keydown keyup", this.handleKey, e, !1), ge.call(t, document.body, "click", this.toggleMenu, e), ye.call(t, document.body, "touchstart", this.firstTouch), ge.call(t, document.body, "keydown focus blur focusout", this.setTabFocus, e, !1, !0)
			})), e(this, "container", (() => {
				const {
					player: e
				} = this, {
					config: t,
					elements: i,
					timers: s
				} = e;
				!t.keyboard.global && t.keyboard.focused && fe.call(e, i.container, "keydown keyup", this.handleKey, !1), fe.call(e, i.container, "mousemove mouseleave touchstart touchmove enterfullscreen exitfullscreen", (t => {
					const {
						controls: n
					} = i;
					n && "enterfullscreen" === t.type && (n.pressed = !1, n.hover = !1);
					let a = 0;
					["touchstart", "touchmove", "mousemove"].includes(t.type) && (at.toggleControls.call(e, !0), a = e.touch ? 3e3 : 2e3), clearTimeout(s.controls), s.controls = setTimeout((() => at.toggleControls.call(e, !1)), a)
				}));
				const n = () => {
						if (!e.isVimeo || e.config.vimeo.premium) return;
						const t = i.wrapper,
							{
								active: s
							} = e.fullscreen,
							[n, a] = xe.call(e),
							l = Se(`aspect-ratio: ${n} / ${a}`);
						if (!s) return void(l ? (t.style.width = null, t.style.height = null) : (t.style.maxWidth = null, t.style.margin = null));
						const [o, r] = [Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0), Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)], c = o / r > n / a;
						l ? (t.style.width = c ? "auto" : "100%", t.style.height = c ? "100%" : "auto") : (t.style.maxWidth = c ? r / a * n + "px" : null, t.style.margin = c ? "0 auto" : null)
					},
					a = () => {
						clearTimeout(s.resized), s.resized = setTimeout(n, 50)
					};
				fe.call(e, i.container, "enterfullscreen exitfullscreen", (t => {
					const {
						target: s
					} = e.fullscreen;
					if (s !== i.container) return;
					if (!e.isEmbed && W(e.config.ratio)) return;
					n();
					("enterfullscreen" === t.type ? fe : be).call(e, window, "resize", a)
				}))
			})), e(this, "media", (() => {
				const {
					player: e
				} = this, {
					elements: t
				} = e;
				if (fe.call(e, e.media, "timeupdate seeking seeked", (t => We.timeUpdate.call(e, t))), fe.call(e, e.media, "durationchange loadeddata loadedmetadata", (t => We.durationUpdate.call(e, t))), fe.call(e, e.media, "ended", (() => {
						e.isHTML5 && e.isVideo && e.config.resetOnEnd && (e.restart(), e.pause())
					})), fe.call(e, e.media, "progress playing seeking seeked", (t => We.updateProgress.call(e, t))), fe.call(e, e.media, "volumechange", (t => We.updateVolume.call(e, t))), fe.call(e, e.media, "playing play pause ended emptied timeupdate", (t => at.checkPlaying.call(e, t))), fe.call(e, e.media, "waiting canplay seeked playing", (t => at.checkLoading.call(e, t))), e.supported.ui && e.config.clickToPlay && !e.isAudio) {
					const i = he.call(e, `.${e.config.classNames.video}`);
					if (!H(i)) return;
					fe.call(e, t.container, "click", (s => {
						([t.container, i].includes(s.target) || i.contains(s.target)) && (e.touch && e.config.hideControls || (e.ended ? (this.proxy(s, e.restart, "restart"), this.proxy(s, (() => {
							ke(e.play())
						}), "play")) : this.proxy(s, (() => {
							ke(e.togglePlay())
						}), "play")))
					}))
				}
				e.supported.ui && e.config.disableContextMenu && fe.call(e, t.wrapper, "contextmenu", (e => {
					e.preventDefault()
				}), !1), fe.call(e, e.media, "volumechange", (() => {
					e.storage.set({
						volume: e.volume,
						muted: e.muted
					})
				})), fe.call(e, e.media, "ratechange", (() => {
					We.updateSetting.call(e, "speed"), e.storage.set({
						speed: e.speed
					})
				})), fe.call(e, e.media, "qualitychange", (t => {
					We.updateSetting.call(e, "quality", null, t.detail.quality)
				})), fe.call(e, e.media, "ready qualitychange", (() => {
					We.setDownloadUrl.call(e)
				}));
				const i = e.config.events.concat(["keyup", "keydown"]).join(" ");
				fe.call(e, e.media, i, (i => {
					let {
						detail: s = {}
					} = i;
					"error" === i.type && (s = e.media.error), ve.call(e, t.container, i.type, !0, s)
				}))
			})), e(this, "proxy", ((e, t, i) => {
				const {
					player: s
				} = this, n = s.config.listeners[i];
				let a = !0;
				j(n) && (a = n.call(s, e)), !1 !== a && j(t) && t.call(s, e)
			})), e(this, "bind", ((e, t, i, s, n = !0) => {
				const {
					player: a
				} = this, l = a.config.listeners[s], o = j(l);
				fe.call(a, e, t, (e => this.proxy(e, i, s)), n && !o)
			})), e(this, "controls", (() => {
				const {
					player: e
				} = this, {
					elements: t
				} = e, i = Y.isIE ? "change" : "input";
				if (t.buttons.play && Array.from(t.buttons.play).forEach((t => {
						this.bind(t, "click", (() => {
							ke(e.togglePlay())
						}), "play")
					})), this.bind(t.buttons.restart, "click", e.restart, "restart"), this.bind(t.buttons.rewind, "click", (() => {
						e.lastSeekTime = Date.now(), e.rewind()
					}), "rewind"), this.bind(t.buttons.fastForward, "click", (() => {
						e.lastSeekTime = Date.now(), e.forward()
					}), "fastForward"), this.bind(t.buttons.mute, "click", (() => {
						e.muted = !e.muted
					}), "mute"), this.bind(t.buttons.captions, "click", (() => e.toggleCaptions())), this.bind(t.buttons.download, "click", (() => {
						ve.call(e, e.media, "download")
					}), "download"), this.bind(t.buttons.fullscreen, "click", (() => {
						e.fullscreen.toggle()
					}), "fullscreen"), this.bind(t.buttons.pip, "click", (() => {
						e.pip = "toggle"
					}), "pip"), this.bind(t.buttons.airplay, "click", e.airplay, "airplay"), this.bind(t.buttons.settings, "click", (t => {
						t.stopPropagation(), t.preventDefault(), We.toggleMenu.call(e, t)
					}), null, !1), this.bind(t.buttons.settings, "keyup", (t => {
						const i = t.which;
						[13, 32].includes(i) && (13 !== i ? (t.preventDefault(), t.stopPropagation(), We.toggleMenu.call(e, t)) : We.focusFirstMenuItem.call(e, null, !0))
					}), null, !1), this.bind(t.settings.menu, "keydown", (t => {
						27 === t.which && We.toggleMenu.call(e, t)
					})), this.bind(t.inputs.seek, "mousedown mousemove", (e => {
						const i = t.progress.getBoundingClientRect(),
							s = 100 / i.width * (e.pageX - i.left);
						e.currentTarget.setAttribute("seek-value", s)
					})), this.bind(t.inputs.seek, "mousedown mouseup keydown keyup touchstart touchend", (t => {
						const i = t.currentTarget,
							s = t.keyCode ? t.keyCode : t.which,
							n = "play-on-seeked";
						if (R(t) && 39 !== s && 37 !== s) return;
						e.lastSeekTime = Date.now();
						const a = i.hasAttribute(n),
							l = ["mouseup", "touchend", "keyup"].includes(t.type);
						a && l ? (i.removeAttribute(n), ke(e.play())) : !l && e.playing && (i.setAttribute(n, ""), e.pause())
					})), Y.isIos) {
					const t = ce.call(e, 'input[type="range"]');
					Array.from(t).forEach((e => this.bind(e, i, (e => K(e.target)))))
				}
				this.bind(t.inputs.seek, i, (t => {
					const i = t.currentTarget;
					let s = i.getAttribute("seek-value");
					W(s) && (s = i.value), i.removeAttribute("seek-value"), e.currentTime = s / i.max * e.duration
				}), "seek"), this.bind(t.progress, "mouseenter mouseleave mousemove", (t => We.updateSeekTooltip.call(e, t))), this.bind(t.progress, "mousemove touchmove", (t => {
					const {
						previewThumbnails: i
					} = e;
					i && i.loaded && i.startMove(t)
				})), this.bind(t.progress, "mouseleave touchend click", (() => {
					const {
						previewThumbnails: t
					} = e;
					t && t.loaded && t.endMove(!1, !0)
				})), this.bind(t.progress, "mousedown touchstart", (t => {
					const {
						previewThumbnails: i
					} = e;
					i && i.loaded && i.startScrubbing(t)
				})), this.bind(t.progress, "mouseup touchend", (t => {
					const {
						previewThumbnails: i
					} = e;
					i && i.loaded && i.endScrubbing(t)
				})), Y.isWebkit && Array.from(ce.call(e, 'input[type="range"]')).forEach((t => {
					this.bind(t, "input", (t => We.updateRangeFill.call(e, t.target)))
				})), e.config.toggleInvert && !H(t.display.duration) && this.bind(t.display.currentTime, "click", (() => {
					0 !== e.currentTime && (e.config.invertTime = !e.config.invertTime, We.timeUpdate.call(e))
				})), this.bind(t.inputs.volume, i, (t => {
					e.volume = t.target.value
				}), "volume"), this.bind(t.controls, "mouseenter mouseleave", (i => {
					t.controls.hover = !e.touch && "mouseenter" === i.type
				})), t.fullscreen && Array.from(t.fullscreen.children).filter((e => !e.contains(t.container))).forEach((i => {
					this.bind(i, "mouseenter mouseleave", (i => {
						t.controls && (t.controls.hover = !e.touch && "mouseenter" === i.type)
					}))
				})), this.bind(t.controls, "mousedown mouseup touchstart touchend touchcancel", (e => {
					t.controls.pressed = ["mousedown", "touchstart"].includes(e.type)
				})), this.bind(t.controls, "focusin", (() => {
					const {
						config: i,
						timers: s
					} = e;
					le(t.controls, i.classNames.noTransition, !0), at.toggleControls.call(e, !0), setTimeout((() => {
						le(t.controls, i.classNames.noTransition, !1)
					}), 0);
					const n = this.touch ? 3e3 : 4e3;
					clearTimeout(s.controls), s.controls = setTimeout((() => at.toggleControls.call(e, !1)), n)
				})), this.bind(t.inputs.volume, "wheel", (t => {
					const i = t.webkitDirectionInvertedFromDevice,
						[s, n] = [t.deltaX, -t.deltaY].map((e => i ? -e : e)),
						a = Math.sign(Math.abs(s) > Math.abs(n) ? s : n);
					e.increaseVolume(a / 50);
					const {
						volume: l
					} = e.media;
					(1 === a && l < 1 || -1 === a && l > 0) && t.preventDefault()
				}), "volume", !1)
			})), this.player = t, this.lastKey = null, this.focusTimer = null, this.lastKeyDown = null, this.handleKey = this.handleKey.bind(this), this.toggleMenu = this.toggleMenu.bind(this), this.setTabFocus = this.setTabFocus.bind(this), this.firstTouch = this.firstTouch.bind(this)
		}
		handleKey(e) {
			const {
				player: t
			} = this, {
				elements: i
			} = t, s = e.keyCode ? e.keyCode : e.which, n = "keydown" === e.type, a = n && s === this.lastKey;
			if (e.altKey || e.ctrlKey || e.metaKey || e.shiftKey) return;
			if (!$(s)) return;
			if (n) {
				const n = document.activeElement;
				if (H(n)) {
					const {
						editable: s
					} = t.config.selectors, {
						seek: a
					} = i.inputs;
					if (n !== a && re(n, s)) return;
					if (32 === e.which && re(n, 'button, [role^="menuitem"]')) return
				}
				switch ([32, 37, 38, 39, 40, 48, 49, 50, 51, 52, 53, 54, 56, 57, 67, 70, 73, 75, 76, 77, 79].includes(s) && (e.preventDefault(), e.stopPropagation()), s) {
					case 48:
					case 49:
					case 50:
					case 51:
					case 52:
					case 53:
					case 54:
					case 55:
					case 56:
					case 57:
						a || (t.currentTime = t.duration / 10 * (s - 48));
						break;
					case 32:
					case 75:
						a || ke(t.togglePlay());
						break;
					case 38:
						t.increaseVolume(.1);
						break;
					case 40:
						t.decreaseVolume(.1);
						break;
					case 77:
						a || (t.muted = !t.muted);
						break;
					case 39:
						t.forward();
						break;
					case 37:
						t.rewind();
						break;
					case 70:
						t.fullscreen.toggle();
						break;
					case 67:
						a || t.toggleCaptions();
						break;
					case 76:
						t.loop = !t.loop
				}
				27 === s && !t.fullscreen.usingNative && t.fullscreen.active && t.fullscreen.toggle(), this.lastKey = s
			} else this.lastKey = null
		}
		toggleMenu(e) {
			We.toggleMenu.call(this.player, e)
		}
	}
	"undefined" != typeof globalThis ? globalThis : "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self && self;
	var ot = function(e, t) {
		return e(t = {
			exports: {}
		}, t.exports), t.exports
	}((function(e, t) {
		e.exports = function() {
			var e = function() {},
				t = {},
				i = {},
				s = {};

			function n(e, t) {
				e = e.push ? e : [e];
				var n, a, l, o = [],
					r = e.length,
					c = r;
				for (n = function(e, i) {
						i.length && o.push(e), --c || t(o)
					}; r--;) a = e[r], (l = i[a]) ? n(a, l) : (s[a] = s[a] || []).push(n)
			}

			function a(e, t) {
				if (e) {
					var n = s[e];
					if (i[e] = t, n)
						for (; n.length;) n[0](e, t), n.splice(0, 1)
				}
			}

			function l(t, i) {
				t.call && (t = {
					success: t
				}), i.length ? (t.error || e)(i) : (t.success || e)(t)
			}

			function o(t, i, s, n) {
				var a, l, r = document,
					c = s.async,
					h = (s.numRetries || 0) + 1,
					u = s.before || e,
					d = t.replace(/[\?|#].*$/, ""),
					m = t.replace(/^(css|img)!/, "");
				n = n || 0, /(^css!|\.css$)/.test(d) ? ((l = r.createElement("link")).rel = "stylesheet", l.href = m, (a = "hideFocus" in l) && l.relList && (a = 0, l.rel = "preload", l.as = "style")) : /(^img!|\.(png|gif|jpg|svg|webp)$)/.test(d) ? (l = r.createElement("img")).src = m : ((l = r.createElement("script")).src = t, l.async = void 0 === c || c), l.onload = l.onerror = l.onbeforeload = function(e) {
					var r = e.type[0];
					if (a) try {
						l.sheet.cssText.length || (r = "e")
					} catch (e) {
						18 != e.code && (r = "e")
					}
					if ("e" == r) {
						if ((n += 1) < h) return o(t, i, s, n)
					} else if ("preload" == l.rel && "style" == l.as) return l.rel = "stylesheet";
					i(t, r, e.defaultPrevented)
				}, !1 !== u(t, l) && r.head.appendChild(l)
			}

			function r(e, t, i) {
				var s, n, a = (e = e.push ? e : [e]).length,
					l = a,
					r = [];
				for (s = function(e, i, s) {
						if ("e" == i && r.push(e), "b" == i) {
							if (!s) return;
							r.push(e)
						}--a || t(r)
					}, n = 0; n < l; n++) o(e[n], s, i)
			}

			function c(e, i, s) {
				var n, o;
				if (i && i.trim && (n = i), o = (n ? s : i) || {}, n) {
					if (n in t) throw "LoadJS";
					t[n] = !0
				}

				function c(t, i) {
					r(e, (function(e) {
						l(o, e), t && l({
							success: t,
							error: i
						}, e), a(n, e)
					}), o)
				}
				if (o.returnPromise) return new Promise(c);
				c()
			}
			return c.ready = function(e, t) {
				return n(e, (function(e) {
					l(t, e)
				})), c
			}, c.done = function(e) {
				a(e, [])
			}, c.reset = function() {
				t = {}, i = {}, s = {}
			}, c.isDefined = function(e) {
				return e in t
			}, c
		}()
	}));

	function rt(e) {
		return new Promise(((t, i) => {
			ot(e, {
				success: t,
				error: i
			})
		}))
	}

	function ct(e) {
		e && !this.embed.hasPlayed && (this.embed.hasPlayed = !0), this.media.paused === e && (this.media.paused = !e, ve.call(this, this.media, e ? "play" : "pause"))
	}
	const ht = {
		setup() {
			const e = this;
			le(e.elements.wrapper, e.config.classNames.embed, !0), e.options.speed = e.config.speed.options, Me.call(e), L(window.Vimeo) ? ht.ready.call(e) : rt(e.config.urls.vimeo.sdk).then((() => {
				ht.ready.call(e)
			})).catch((t => {
				e.debug.warn("Vimeo SDK (player.js) failed to load", t)
			}))
		},
		ready() {
			const e = this,
				t = e.config.vimeo,
				{
					premium: i,
					referrerPolicy: s,
					...n
				} = t;
			let a = e.media.getAttribute("src"),
				l = "";
			W(a) ? (a = e.media.getAttribute(e.config.attributes.embed.id), l = e.media.getAttribute(e.config.attributes.embed.hash)) : l = function(e) {
				const t = e.match(/^.*(?:vimeo.com\/|video\/)(?:\d+)(?:\?.*&*h=|\/)+(?<hash>[\d,a-f]+)/);
				return t ? t.groups.hash : null
			}(a);
			const o = l ? {
				h: l
			} : {};
			i && Object.assign(n, {
				controls: !1,
				sidedock: !1
			});
			const r = Ke({
					loop: e.config.loop.active,
					autoplay: e.autoplay,
					muted: e.muted,
					gesture: "media",
					playsinline: !this.config.fullscreen.iosNative,
					...o,
					...n
				}),
				c = W(h = a) ? null : $(Number(h)) ? h : h.match(/^.*(vimeo.com\/|video\/)(\d+).*/) ? RegExp.$2 : h;
			var h;
			const u = Z("iframe"),
				d = $e(e.config.urls.vimeo.iframe, c, r);
			if (u.setAttribute("src", d), u.setAttribute("allowfullscreen", ""), u.setAttribute("allow", ["autoplay", "fullscreen", "picture-in-picture", "encrypted-media", "accelerometer", "gyroscope"].join("; ")), W(s) || u.setAttribute("referrerPolicy", s), i || !t.customControls) u.setAttribute("data-poster", e.poster), e.media = se(u, e.media);
			else {
				const t = Z("div", {
					class: e.config.classNames.embedContainer,
					"data-poster": e.poster
				});
				t.appendChild(u), e.media = se(t, e.media)
			}
			t.customControls || Re($e(e.config.urls.vimeo.api, d)).then((t => {
				!W(t) && t.thumbnail_url && at.setPoster.call(e, t.thumbnail_url).catch((() => {}))
			})), e.embed = new window.Vimeo.Player(u, {
				autopause: e.config.autopause,
				muted: e.muted
			}), e.media.paused = !0, e.media.currentTime = 0, e.supported.ui && e.embed.disableTextTrack(), e.media.play = () => (ct.call(e, !0), e.embed.play()), e.media.pause = () => (ct.call(e, !1), e.embed.pause()), e.media.stop = () => {
				e.pause(), e.currentTime = 0
			};
			let {
				currentTime: m
			} = e.media;
			Object.defineProperty(e.media, "currentTime", {
				get: () => m,
				set(t) {
					const {
						embed: i,
						media: s,
						paused: n,
						volume: a
					} = e, l = n && !i.hasPlayed;
					s.seeking = !0, ve.call(e, s, "seeking"), Promise.resolve(l && i.setVolume(0)).then((() => i.setCurrentTime(t))).then((() => l && i.pause())).then((() => l && i.setVolume(a))).catch((() => {}))
				}
			});
			let p = e.config.speed.selected;
			Object.defineProperty(e.media, "playbackRate", {
				get: () => p,
				set(t) {
					e.embed.setPlaybackRate(t).then((() => {
						p = t, ve.call(e, e.media, "ratechange")
					})).catch((() => {
						e.options.speed = [1]
					}))
				}
			});
			let {
				volume: g
			} = e.config;
			Object.defineProperty(e.media, "volume", {
				get: () => g,
				set(t) {
					e.embed.setVolume(t).then((() => {
						g = t, ve.call(e, e.media, "volumechange")
					}))
				}
			});
			let {
				muted: f
			} = e.config;
			Object.defineProperty(e.media, "muted", {
				get: () => f,
				set(t) {
					const i = !!O(t) && t;
					e.embed.setVolume(i ? 0 : e.config.volume).then((() => {
						f = i, ve.call(e, e.media, "volumechange")
					}))
				}
			});
			let b, {
				loop: y
			} = e.config;
			Object.defineProperty(e.media, "loop", {
				get: () => y,
				set(t) {
					const i = O(t) ? t : e.config.loop.active;
					e.embed.setLoop(i).then((() => {
						y = i
					}))
				}
			}), e.embed.getVideoUrl().then((t => {
				b = t, We.setDownloadUrl.call(e)
			})).catch((e => {
				this.debug.warn(e)
			})), Object.defineProperty(e.media, "currentSrc", {
				get: () => b
			}), Object.defineProperty(e.media, "ended", {
				get: () => e.currentTime === e.duration
			}), Promise.all([e.embed.getVideoWidth(), e.embed.getVideoHeight()]).then((t => {
				const [i, s] = t;
				e.embed.ratio = Ie(i, s), Me.call(this)
			})), e.embed.setAutopause(e.config.autopause).then((t => {
				e.config.autopause = t
			})), e.embed.getVideoTitle().then((t => {
				e.config.title = t, at.setTitle.call(this)
			})), e.embed.getCurrentTime().then((t => {
				m = t, ve.call(e, e.media, "timeupdate")
			})), e.embed.getDuration().then((t => {
				e.media.duration = t, ve.call(e, e.media, "durationchange")
			})), e.embed.getTextTracks().then((t => {
				e.media.textTracks = t, Ye.setup.call(e)
			})), e.embed.on("cuechange", (({
				cues: t = []
			}) => {
				const i = t.map((e => function(e) {
					const t = document.createDocumentFragment(),
						i = document.createElement("div");
					return t.appendChild(i), i.innerHTML = e, t.firstChild.innerText
				}(e.text)));
				Ye.updateCues.call(e, i)
			})), e.embed.on("loaded", (() => {
				if (e.embed.getPaused().then((t => {
						ct.call(e, !t), t || ve.call(e, e.media, "playing")
					})), H(e.embed.element) && e.supported.ui) {
					e.embed.element.setAttribute("tabindex", -1)
				}
			})), e.embed.on("bufferstart", (() => {
				ve.call(e, e.media, "waiting")
			})), e.embed.on("bufferend", (() => {
				ve.call(e, e.media, "playing")
			})), e.embed.on("play", (() => {
				ct.call(e, !0), ve.call(e, e.media, "playing")
			})), e.embed.on("pause", (() => {
				ct.call(e, !1)
			})), e.embed.on("timeupdate", (t => {
				e.media.seeking = !1, m = t.seconds, ve.call(e, e.media, "timeupdate")
			})), e.embed.on("progress", (t => {
				e.media.buffered = t.percent, ve.call(e, e.media, "progress"), 1 === parseInt(t.percent, 10) && ve.call(e, e.media, "canplaythrough"), e.embed.getDuration().then((t => {
					t !== e.media.duration && (e.media.duration = t, ve.call(e, e.media, "durationchange"))
				}))
			})), e.embed.on("seeked", (() => {
				e.media.seeking = !1, ve.call(e, e.media, "seeked")
			})), e.embed.on("ended", (() => {
				e.media.paused = !0, ve.call(e, e.media, "ended")
			})), e.embed.on("error", (t => {
				e.media.error = t, ve.call(e, e.media, "error")
			})), t.customControls && setTimeout((() => at.build.call(e)), 0)
		}
	};

	function ut(e) {
		e && !this.embed.hasPlayed && (this.embed.hasPlayed = !0), this.media.paused === e && (this.media.paused = !e, ve.call(this, this.media, e ? "play" : "pause"))
	}

	function dt(e) {
		return e.noCookie ? "https://www.youtube-nocookie.com" : "http:" === window.location.protocol ? "http://www.youtube.com" : void 0
	}
	const mt = {
			setup() {
				if (le(this.elements.wrapper, this.config.classNames.embed, !0), L(window.YT) && j(window.YT.Player)) mt.ready.call(this);
				else {
					const e = window.onYouTubeIframeAPIReady;
					window.onYouTubeIframeAPIReady = () => {
						j(e) && e(), mt.ready.call(this)
					}, rt(this.config.urls.youtube.sdk).catch((e => {
						this.debug.warn("YouTube API failed to load", e)
					}))
				}
			},
			getTitle(e) {
				Re($e(this.config.urls.youtube.api, e)).then((e => {
					if (L(e)) {
						const {
							title: t,
							height: i,
							width: s
						} = e;
						this.config.title = t, at.setTitle.call(this), this.embed.ratio = Ie(s, i)
					}
					Me.call(this)
				})).catch((() => {
					Me.call(this)
				}))
			},
			ready() {
				const e = this,
					t = e.config.youtube,
					i = e.media && e.media.getAttribute("id");
				if (!W(i) && i.startsWith("youtube-")) return;
				let s = e.media.getAttribute("src");
				W(s) && (s = e.media.getAttribute(this.config.attributes.embed.id));
				const n = W(a = s) ? null : a.match(/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/) ? RegExp.$2 : a;
				var a;
				const l = Z("div", {
					id: `${e.provider}-${Math.floor(1e4*Math.random())}`,
					"data-poster": t.customControls ? e.poster : void 0
				});
				if (e.media = se(l, e.media), t.customControls) {
					const t = e => `https://i.ytimg.com/vi/${n}/${e}default.jpg`;
					nt(t("maxres"), 121).catch((() => nt(t("sd"), 121))).catch((() => nt(t("hq")))).then((t => at.setPoster.call(e, t.src))).then((t => {
						t.includes("maxres") || (e.elements.poster.style.backgroundSize = "cover")
					})).catch((() => {}))
				}
				e.embed = new window.YT.Player(e.media, {
					videoId: n,
					host: dt(t),
					playerVars: X({}, {
						autoplay: e.config.autoplay ? 1 : 0,
						hl: e.config.hl,
						controls: e.supported.ui && t.customControls ? 0 : 1,
						disablekb: 1,
						playsinline: e.config.fullscreen.iosNative ? 0 : 1,
						cc_load_policy: e.captions.active ? 1 : 0,
						cc_lang_pref: e.config.captions.language,
						widget_referrer: window ? window.location.href : null
					}, t),
					events: {
						onError(t) {
							if (!e.media.error) {
								const i = t.data,
									s = {
										2: "The request contains an invalid parameter value. For example, this error occurs if you specify a video ID that does not have 11 characters, or if the video ID contains invalid characters, such as exclamation points or asterisks.",
										5: "The requested content cannot be played in an HTML5 player or another error related to the HTML5 player has occurred.",
										100: "The video requested was not found. This error occurs when a video has been removed (for any reason) or has been marked as private.",
										101: "The owner of the requested video does not allow it to be played in embedded players.",
										150: "The owner of the requested video does not allow it to be played in embedded players."
									} [i] || "An unknown error occured";
								e.media.error = {
									code: i,
									message: s
								}, ve.call(e, e.media, "error")
							}
						},
						onPlaybackRateChange(t) {
							const i = t.target;
							e.media.playbackRate = i.getPlaybackRate(), ve.call(e, e.media, "ratechange")
						},
						onReady(i) {
							if (j(e.media.play)) return;
							const s = i.target;
							mt.getTitle.call(e, n), e.media.play = () => {
								ut.call(e, !0), s.playVideo()
							}, e.media.pause = () => {
								ut.call(e, !1), s.pauseVideo()
							}, e.media.stop = () => {
								s.stopVideo()
							}, e.media.duration = s.getDuration(), e.media.paused = !0, e.media.currentTime = 0, Object.defineProperty(e.media, "currentTime", {
								get: () => Number(s.getCurrentTime()),
								set(t) {
									e.paused && !e.embed.hasPlayed && e.embed.mute(), e.media.seeking = !0, ve.call(e, e.media, "seeking"), s.seekTo(t)
								}
							}), Object.defineProperty(e.media, "playbackRate", {
								get: () => s.getPlaybackRate(),
								set(e) {
									s.setPlaybackRate(e)
								}
							});
							let {
								volume: a
							} = e.config;
							Object.defineProperty(e.media, "volume", {
								get: () => a,
								set(t) {
									a = t, s.setVolume(100 * a), ve.call(e, e.media, "volumechange")
								}
							});
							let {
								muted: l
							} = e.config;
							Object.defineProperty(e.media, "muted", {
								get: () => l,
								set(t) {
									const i = O(t) ? t : l;
									l = i, s[i ? "mute" : "unMute"](), s.setVolume(100 * a), ve.call(e, e.media, "volumechange")
								}
							}), Object.defineProperty(e.media, "currentSrc", {
								get: () => s.getVideoUrl()
							}), Object.defineProperty(e.media, "ended", {
								get: () => e.currentTime === e.duration
							});
							const o = s.getAvailablePlaybackRates();
							e.options.speed = o.filter((t => e.config.speed.options.includes(t))), e.supported.ui && t.customControls && e.media.setAttribute("tabindex", -1), ve.call(e, e.media, "timeupdate"), ve.call(e, e.media, "durationchange"), clearInterval(e.timers.buffering), e.timers.buffering = setInterval((() => {
								e.media.buffered = s.getVideoLoadedFraction(), (null === e.media.lastBuffered || e.media.lastBuffered < e.media.buffered) && ve.call(e, e.media, "progress"), e.media.lastBuffered = e.media.buffered, 1 === e.media.buffered && (clearInterval(e.timers.buffering), ve.call(e, e.media, "canplaythrough"))
							}), 200), t.customControls && setTimeout((() => at.build.call(e)), 50)
						},
						onStateChange(i) {
							const s = i.target;
							clearInterval(e.timers.playing);
							switch (e.media.seeking && [1, 2].includes(i.data) && (e.media.seeking = !1, ve.call(e, e.media, "seeked")), i.data) {
								case -1:
									ve.call(e, e.media, "timeupdate"), e.media.buffered = s.getVideoLoadedFraction(), ve.call(e, e.media, "progress");
									break;
								case 0:
									ut.call(e, !1), e.media.loop ? (s.stopVideo(), s.playVideo()) : ve.call(e, e.media, "ended");
									break;
								case 1:
									t.customControls && !e.config.autoplay && e.media.paused && !e.embed.hasPlayed ? e.media.pause() : (ut.call(e, !0), ve.call(e, e.media, "playing"), e.timers.playing = setInterval((() => {
										ve.call(e, e.media, "timeupdate")
									}), 50), e.media.duration !== s.getDuration() && (e.media.duration = s.getDuration(), ve.call(e, e.media, "durationchange")));
									break;
								case 2:
									e.muted || e.embed.unMute(), ut.call(e, !1);
									break;
								case 3:
									ve.call(e, e.media, "waiting")
							}
							ve.call(e, e.elements.container, "statechange", !1, {
								code: i.data
							})
						}
					}
				})
			}
		},
		pt = {
			setup() {
				this.media ? (le(this.elements.container, this.config.classNames.type.replace("{0}", this.type), !0), le(this.elements.container, this.config.classNames.provider.replace("{0}", this.provider), !0), this.isEmbed && le(this.elements.container, this.config.classNames.type.replace("{0}", "video"), !0), this.isVideo && (this.elements.wrapper = Z("div", {
					class: this.config.classNames.video
				}), J(this.media, this.elements.wrapper), this.elements.poster = Z("div", {
					class: this.config.classNames.poster
				}), this.elements.wrapper.appendChild(this.elements.poster)), this.isHTML5 ? Le.setup.call(this) : this.isYouTube ? mt.setup.call(this) : this.isVimeo && ht.setup.call(this)) : this.debug.warn("No media element found!")
			}
		};
	class gt {
		constructor(t) {
			e(this, "load", (() => {
				this.enabled && (L(window.google) && L(window.google.ima) ? this.ready() : rt(this.player.config.urls.googleIMA.sdk).then((() => {
					this.ready()
				})).catch((() => {
					this.trigger("error", new Error("Google IMA SDK failed to load"))
				})))
			})), e(this, "ready", (() => {
				var e;
				this.enabled || ((e = this).manager && e.manager.destroy(), e.elements.displayContainer && e.elements.displayContainer.destroy(), e.elements.container.remove()), this.startSafetyTimer(12e3, "ready()"), this.managerPromise.then((() => {
					this.clearSafetyTimer("onAdsManagerLoaded()")
				})), this.listeners(), this.setupIMA()
			})), e(this, "setupIMA", (() => {
				this.elements.container = Z("div", {
					class: this.player.config.classNames.ads
				}), this.player.elements.container.appendChild(this.elements.container), google.ima.settings.setVpaidMode(google.ima.ImaSdkSettings.VpaidMode.ENABLED), google.ima.settings.setLocale(this.player.config.ads.language), google.ima.settings.setDisableCustomPlaybackForIOS10Plus(this.player.config.playsinline), this.elements.displayContainer = new google.ima.AdDisplayContainer(this.elements.container, this.player.media), this.loader = new google.ima.AdsLoader(this.elements.displayContainer), this.loader.addEventListener(google.ima.AdsManagerLoadedEvent.Type.ADS_MANAGER_LOADED, (e => this.onAdsManagerLoaded(e)), !1), this.loader.addEventListener(google.ima.AdErrorEvent.Type.AD_ERROR, (e => this.onAdError(e)), !1), this.requestAds()
			})), e(this, "requestAds", (() => {
				const {
					container: e
				} = this.player.elements;
				try {
					const t = new google.ima.AdsRequest;
					t.adTagUrl = this.tagUrl, t.linearAdSlotWidth = e.offsetWidth, t.linearAdSlotHeight = e.offsetHeight, t.nonLinearAdSlotWidth = e.offsetWidth, t.nonLinearAdSlotHeight = e.offsetHeight, t.forceNonLinearFullSlot = !1, t.setAdWillPlayMuted(!this.player.muted), this.loader.requestAds(t)
				} catch (e) {
					this.onAdError(e)
				}
			})), e(this, "pollCountdown", ((e = !1) => {
				if (!e) return clearInterval(this.countdownTimer), void this.elements.container.removeAttribute("data-badge-text");
				this.countdownTimer = setInterval((() => {
					const e = Ue(Math.max(this.manager.getRemainingTime(), 0)),
						t = `${He.get("advertisement",this.player.config)} - ${e}`;
					this.elements.container.setAttribute("data-badge-text", t)
				}), 100)
			})), e(this, "onAdsManagerLoaded", (e => {
				if (!this.enabled) return;
				const t = new google.ima.AdsRenderingSettings;
				t.restoreCustomPlaybackStateOnAdBreakComplete = !0, t.enablePreloading = !0, this.manager = e.getAdsManager(this.player, t), this.cuePoints = this.manager.getCuePoints(), this.manager.addEventListener(google.ima.AdErrorEvent.Type.AD_ERROR, (e => this.onAdError(e))), Object.keys(google.ima.AdEvent.Type).forEach((e => {
					this.manager.addEventListener(google.ima.AdEvent.Type[e], (e => this.onAdEvent(e)))
				})), this.trigger("loaded")
			})), e(this, "addCuePoints", (() => {
				W(this.cuePoints) || this.cuePoints.forEach((e => {
					if (0 !== e && -1 !== e && e < this.player.duration) {
						const t = this.player.elements.progress;
						if (H(t)) {
							const i = 100 / this.player.duration * e,
								s = Z("span", {
									class: this.player.config.classNames.cues
								});
							s.style.left = `${i.toString()}%`, t.appendChild(s)
						}
					}
				}))
			})), e(this, "onAdEvent", (e => {
				const {
					container: t
				} = this.player.elements, i = e.getAd(), s = e.getAdData();
				switch ((e => {
						ve.call(this.player, this.player.media, `ads${e.replace(/_/g,"").toLowerCase()}`)
					})(e.type), e.type) {
					case google.ima.AdEvent.Type.LOADED:
						this.trigger("loaded"), this.pollCountdown(!0), i.isLinear() || (i.width = t.offsetWidth, i.height = t.offsetHeight);
						break;
					case google.ima.AdEvent.Type.STARTED:
						this.manager.setVolume(this.player.volume);
						break;
					case google.ima.AdEvent.Type.ALL_ADS_COMPLETED:
						this.player.ended ? this.loadAds() : this.loader.contentComplete();
						break;
					case google.ima.AdEvent.Type.CONTENT_PAUSE_REQUESTED:
						this.pauseContent();
						break;
					case google.ima.AdEvent.Type.CONTENT_RESUME_REQUESTED:
						this.pollCountdown(), this.resumeContent();
						break;
					case google.ima.AdEvent.Type.LOG:
						s.adError && this.player.debug.warn(`Non-fatal ad error: ${s.adError.getMessage()}`)
				}
			})), e(this, "onAdError", (e => {
				this.cancel(), this.player.debug.warn("Ads error", e)
			})), e(this, "listeners", (() => {
				const {
					container: e
				} = this.player.elements;
				let t;
				this.player.on("canplay", (() => {
					this.addCuePoints()
				})), this.player.on("ended", (() => {
					this.loader.contentComplete()
				})), this.player.on("timeupdate", (() => {
					t = this.player.currentTime
				})), this.player.on("seeked", (() => {
					const e = this.player.currentTime;
					W(this.cuePoints) || this.cuePoints.forEach(((i, s) => {
						t < i && i < e && (this.manager.discardAdBreak(), this.cuePoints.splice(s, 1))
					}))
				})), window.addEventListener("resize", (() => {
					this.manager && this.manager.resize(e.offsetWidth, e.offsetHeight, google.ima.ViewMode.NORMAL)
				}))
			})), e(this, "play", (() => {
				const {
					container: e
				} = this.player.elements;
				this.managerPromise || this.resumeContent(), this.managerPromise.then((() => {
					this.manager.setVolume(this.player.volume), this.elements.displayContainer.initialize();
					try {
						this.initialized || (this.manager.init(e.offsetWidth, e.offsetHeight, google.ima.ViewMode.NORMAL), this.manager.start()), this.initialized = !0
					} catch (e) {
						this.onAdError(e)
					}
				})).catch((() => {}))
			})), e(this, "resumeContent", (() => {
				this.elements.container.style.zIndex = "", this.playing = !1, ke(this.player.media.play())
			})), e(this, "pauseContent", (() => {
				this.elements.container.style.zIndex = 3, this.playing = !0, this.player.media.pause()
			})), e(this, "cancel", (() => {
				this.initialized && this.resumeContent(), this.trigger("error"), this.loadAds()
			})), e(this, "loadAds", (() => {
				this.managerPromise.then((() => {
					this.manager && this.manager.destroy(), this.managerPromise = new Promise((e => {
						this.on("loaded", e), this.player.debug.log(this.manager)
					})), this.initialized = !1, this.requestAds()
				})).catch((() => {}))
			})), e(this, "trigger", ((e, ...t) => {
				const i = this.events[e];
				q(i) && i.forEach((e => {
					j(e) && e.apply(this, t)
				}))
			})), e(this, "on", ((e, t) => (q(this.events[e]) || (this.events[e] = []), this.events[e].push(t), this))), e(this, "startSafetyTimer", ((e, t) => {
				this.player.debug.log(`Safety timer invoked from: ${t}`), this.safetyTimer = setTimeout((() => {
					this.cancel(), this.clearSafetyTimer("startSafetyTimer()")
				}), e)
			})), e(this, "clearSafetyTimer", (e => {
				I(this.safetyTimer) || (this.player.debug.log(`Safety timer cleared from: ${e}`), clearTimeout(this.safetyTimer), this.safetyTimer = null)
			})), this.player = t, this.config = t.config.ads, this.playing = !1, this.initialized = !1, this.elements = {
				container: null,
				displayContainer: null
			}, this.manager = null, this.loader = null, this.cuePoints = null, this.events = {}, this.safetyTimer = null, this.countdownTimer = null, this.managerPromise = new Promise(((e, t) => {
				this.on("loaded", e), this.on("error", t)
			})), this.load()
		}
		get enabled() {
			const {
				config: e
			} = this;
			return this.player.isHTML5 && this.player.isVideo && e.enabled && (!W(e.publisherId) || U(e.tagUrl))
		}
		get tagUrl() {
			const {
				config: e
			} = this;
			if (U(e.tagUrl)) return e.tagUrl;
			return `https://go.aniview.com/api/adserver6/vast/?${Ke({AV_PUBLISHERID:"58c25bb0073ef448b1087ad6",AV_CHANNELID:"5a0458dc28a06145e4519d21",AV_URL:window.location.hostname,cb:Date.now(),AV_WIDTH:640,AV_HEIGHT:480,AV_CDIM2:e.publisherId})}`
		}
	}
	const ft = e => {
			const t = [];
			return e.split(/\r\n\r\n|\n\n|\r\r/).forEach((e => {
				const i = {};
				e.split(/\r\n|\n|\r/).forEach((e => {
					if ($(i.startTime)) {
						if (!W(e.trim()) && W(i.text)) {
							const t = e.trim().split("#xywh=");
							[i.text] = t, t[1] && ([i.x, i.y, i.w, i.h] = t[1].split(","))
						}
					} else {
						const t = e.match(/([0-9]{2})?:?([0-9]{2}):([0-9]{2}).([0-9]{2,3})( ?--> ?)([0-9]{2})?:?([0-9]{2}):([0-9]{2}).([0-9]{2,3})/);
						t && (i.startTime = 60 * Number(t[1] || 0) * 60 + 60 * Number(t[2]) + Number(t[3]) + Number(`0.${t[4]}`), i.endTime = 60 * Number(t[6] || 0) * 60 + 60 * Number(t[7]) + Number(t[8]) + Number(`0.${t[9]}`))
					}
				})), i.text && t.push(i)
			})), t
		},
		bt = (e, t) => {
			const i = {};
			return e > t.width / t.height ? (i.width = t.width, i.height = 1 / e * t.width) : (i.height = t.height, i.width = e * t.height), i
		};
	class yt {
		constructor(t) {
			e(this, "load", (() => {
				this.player.elements.display.seekTooltip && (this.player.elements.display.seekTooltip.hidden = this.enabled), this.enabled && this.getThumbnails().then((() => {
					this.enabled && (this.render(), this.determineContainerAutoSizing(), this.loaded = !0)
				}))
			})), e(this, "getThumbnails", (() => new Promise((e => {
				const {
					src: t
				} = this.player.config.previewThumbnails;
				if (W(t)) throw new Error("Missing previewThumbnails.src config attribute");
				const i = () => {
					this.thumbnails.sort(((e, t) => e.height - t.height)), this.player.debug.log("Preview thumbnails", this.thumbnails), e()
				};
				if (j(t)) t((e => {
					this.thumbnails = e, i()
				}));
				else {
					const e = (_(t) ? [t] : t).map((e => this.getThumbnail(e)));
					Promise.all(e).then(i)
				}
			})))), e(this, "getThumbnail", (e => new Promise((t => {
				Re(e).then((i => {
					const s = {
						frames: ft(i),
						height: null,
						urlPrefix: ""
					};
					s.frames[0].text.startsWith("/") || s.frames[0].text.startsWith("http://") || s.frames[0].text.startsWith("https://") || (s.urlPrefix = e.substring(0, e.lastIndexOf("/") + 1));
					const n = new Image;
					n.onload = () => {
						s.height = n.naturalHeight, s.width = n.naturalWidth, this.thumbnails.push(s), t()
					}, n.src = s.urlPrefix + s.frames[0].text
				}))
			})))), e(this, "startMove", (e => {
				if (this.loaded && F(e) && ["touchmove", "mousemove"].includes(e.type) && this.player.media.duration) {
					if ("touchmove" === e.type) this.seekTime = this.player.media.duration * (this.player.elements.inputs.seek.value / 100);
					else {
						const t = this.player.elements.progress.getBoundingClientRect(),
							i = 100 / t.width * (e.pageX - t.left);
						this.seekTime = this.player.media.duration * (i / 100), this.seekTime < 0 && (this.seekTime = 0), this.seekTime > this.player.media.duration - 1 && (this.seekTime = this.player.media.duration - 1), this.mousePosX = e.pageX, this.elements.thumb.time.innerText = Ue(this.seekTime)
					}
					this.showImageAtCurrentTime()
				}
			})), e(this, "endMove", (() => {
				this.toggleThumbContainer(!1, !0)
			})), e(this, "startScrubbing", (e => {
				(I(e.button) || !1 === e.button || 0 === e.button) && (this.mouseDown = !0, this.player.media.duration && (this.toggleScrubbingContainer(!0), this.toggleThumbContainer(!1, !0), this.showImageAtCurrentTime()))
			})), e(this, "endScrubbing", (() => {
				this.mouseDown = !1, Math.ceil(this.lastTime) === Math.ceil(this.player.media.currentTime) ? this.toggleScrubbingContainer(!1) : ye.call(this.player, this.player.media, "timeupdate", (() => {
					this.mouseDown || this.toggleScrubbingContainer(!1)
				}))
			})), e(this, "listeners", (() => {
				this.player.on("play", (() => {
					this.toggleThumbContainer(!1, !0)
				})), this.player.on("seeked", (() => {
					this.toggleThumbContainer(!1)
				})), this.player.on("timeupdate", (() => {
					this.lastTime = this.player.media.currentTime
				}))
			})), e(this, "render", (() => {
				this.elements.thumb.container = Z("div", {
					class: this.player.config.classNames.previewThumbnails.thumbContainer
				}), this.elements.thumb.imageContainer = Z("div", {
					class: this.player.config.classNames.previewThumbnails.imageContainer
				}), this.elements.thumb.container.appendChild(this.elements.thumb.imageContainer);
				const e = Z("div", {
					class: this.player.config.classNames.previewThumbnails.timeContainer
				});
				this.elements.thumb.time = Z("span", {}, "00:00"), e.appendChild(this.elements.thumb.time), this.elements.thumb.container.appendChild(e), H(this.player.elements.progress) && this.player.elements.progress.appendChild(this.elements.thumb.container), this.elements.scrubbing.container = Z("div", {
					class: this.player.config.classNames.previewThumbnails.scrubbingContainer
				}), this.player.elements.wrapper.appendChild(this.elements.scrubbing.container)
			})), e(this, "destroy", (() => {
				this.elements.thumb.container && this.elements.thumb.container.remove(), this.elements.scrubbing.container && this.elements.scrubbing.container.remove()
			})), e(this, "showImageAtCurrentTime", (() => {
				this.mouseDown ? this.setScrubbingContainerSize() : this.setThumbContainerSizeAndPos();
				const e = this.thumbnails[0].frames.findIndex((e => this.seekTime >= e.startTime && this.seekTime <= e.endTime)),
					t = e >= 0;
				let i = 0;
				this.mouseDown || this.toggleThumbContainer(t), t && (this.thumbnails.forEach(((t, s) => {
					this.loadedImages.includes(t.frames[e].text) && (i = s)
				})), e !== this.showingThumb && (this.showingThumb = e, this.loadImage(i)))
			})), e(this, "loadImage", ((e = 0) => {
				const t = this.showingThumb,
					i = this.thumbnails[e],
					{
						urlPrefix: s
					} = i,
					n = i.frames[t],
					a = i.frames[t].text,
					l = s + a;
				if (this.currentImageElement && this.currentImageElement.dataset.filename === a) this.showImage(this.currentImageElement, n, e, t, a, !1), this.currentImageElement.dataset.index = t, this.removeOldImages(this.currentImageElement);
				else {
					this.loadingImage && this.usingSprites && (this.loadingImage.onload = null);
					const i = new Image;
					i.src = l, i.dataset.index = t, i.dataset.filename = a, this.showingThumbFilename = a, this.player.debug.log(`Loading image: ${l}`), i.onload = () => this.showImage(i, n, e, t, a, !0), this.loadingImage = i, this.removeOldImages(i)
				}
			})), e(this, "showImage", ((e, t, i, s, n, a = !0) => {
				this.player.debug.log(`Showing thumb: ${n}. num: ${s}. qual: ${i}. newimg: ${a}`), this.setImageSizeAndOffset(e, t), a && (this.currentImageContainer.appendChild(e), this.currentImageElement = e, this.loadedImages.includes(n) || this.loadedImages.push(n)), this.preloadNearby(s, !0).then(this.preloadNearby(s, !1)).then(this.getHigherQuality(i, e, t, n))
			})), e(this, "removeOldImages", (e => {
				Array.from(this.currentImageContainer.children).forEach((t => {
					if ("img" !== t.tagName.toLowerCase()) return;
					const i = this.usingSprites ? 500 : 1e3;
					if (t.dataset.index !== e.dataset.index && !t.dataset.deleting) {
						t.dataset.deleting = !0;
						const {
							currentImageContainer: e
						} = this;
						setTimeout((() => {
							e.removeChild(t), this.player.debug.log(`Removing thumb: ${t.dataset.filename}`)
						}), i)
					}
				}))
			})), e(this, "preloadNearby", ((e, t = !0) => new Promise((i => {
				setTimeout((() => {
					const s = this.thumbnails[0].frames[e].text;
					if (this.showingThumbFilename === s) {
						let n;
						n = t ? this.thumbnails[0].frames.slice(e) : this.thumbnails[0].frames.slice(0, e).reverse();
						let a = !1;
						n.forEach((e => {
							const t = e.text;
							if (t !== s && !this.loadedImages.includes(t)) {
								a = !0, this.player.debug.log(`Preloading thumb filename: ${t}`);
								const {
									urlPrefix: e
								} = this.thumbnails[0], s = e + t, n = new Image;
								n.src = s, n.onload = () => {
									this.player.debug.log(`Preloaded thumb filename: ${t}`), this.loadedImages.includes(t) || this.loadedImages.push(t), i()
								}
							}
						})), a || i()
					}
				}), 300)
			})))), e(this, "getHigherQuality", ((e, t, i, s) => {
				if (e < this.thumbnails.length - 1) {
					let n = t.naturalHeight;
					this.usingSprites && (n = i.h), n < this.thumbContainerHeight && setTimeout((() => {
						this.showingThumbFilename === s && (this.player.debug.log(`Showing higher quality thumb for: ${s}`), this.loadImage(e + 1))
					}), 300)
				}
			})), e(this, "toggleThumbContainer", ((e = !1, t = !1) => {
				const i = this.player.config.classNames.previewThumbnails.thumbContainerShown;
				this.elements.thumb.container.classList.toggle(i, e), !e && t && (this.showingThumb = null, this.showingThumbFilename = null)
			})), e(this, "toggleScrubbingContainer", ((e = !1) => {
				const t = this.player.config.classNames.previewThumbnails.scrubbingContainerShown;
				this.elements.scrubbing.container.classList.toggle(t, e), e || (this.showingThumb = null, this.showingThumbFilename = null)
			})), e(this, "determineContainerAutoSizing", (() => {
				(this.elements.thumb.imageContainer.clientHeight > 20 || this.elements.thumb.imageContainer.clientWidth > 20) && (this.sizeSpecifiedInCSS = !0)
			})), e(this, "setThumbContainerSizeAndPos", (() => {
				if (this.sizeSpecifiedInCSS) {
					if (this.elements.thumb.imageContainer.clientHeight > 20 && this.elements.thumb.imageContainer.clientWidth < 20) {
						const e = Math.floor(this.elements.thumb.imageContainer.clientHeight * this.thumbAspectRatio);
						this.elements.thumb.imageContainer.style.width = `${e}px`
					} else if (this.elements.thumb.imageContainer.clientHeight < 20 && this.elements.thumb.imageContainer.clientWidth > 20) {
						const e = Math.floor(this.elements.thumb.imageContainer.clientWidth / this.thumbAspectRatio);
						this.elements.thumb.imageContainer.style.height = `${e}px`
					}
				} else {
					const e = Math.floor(this.thumbContainerHeight * this.thumbAspectRatio);
					this.elements.thumb.imageContainer.style.height = `${this.thumbContainerHeight}px`, this.elements.thumb.imageContainer.style.width = `${e}px`
				}
				this.setThumbContainerPos()
			})), e(this, "setThumbContainerPos", (() => {
				const e = this.player.elements.progress.getBoundingClientRect(),
					t = this.player.elements.container.getBoundingClientRect(),
					{
						container: i
					} = this.elements.thumb,
					s = t.left - e.left + 10,
					n = t.right - e.left - i.clientWidth - 10;
				let a = this.mousePosX - e.left - i.clientWidth / 2;
				a < s && (a = s), a > n && (a = n), i.style.left = `${a}px`
			})), e(this, "setScrubbingContainerSize", (() => {
				const {
					width: e,
					height: t
				} = bt(this.thumbAspectRatio, {
					width: this.player.media.clientWidth,
					height: this.player.media.clientHeight
				});
				this.elements.scrubbing.container.style.width = `${e}px`, this.elements.scrubbing.container.style.height = `${t}px`
			})), e(this, "setImageSizeAndOffset", ((e, t) => {
				if (!this.usingSprites) return;
				const i = this.thumbContainerHeight / t.h;
				e.style.height = e.naturalHeight * i + "px", e.style.width = e.naturalWidth * i + "px", e.style.left = `-${t.x*i}px`, e.style.top = `-${t.y*i}px`
			})), this.player = t, this.thumbnails = [], this.loaded = !1, this.lastMouseMoveTime = Date.now(), this.mouseDown = !1, this.loadedImages = [], this.elements = {
				thumb: {},
				scrubbing: {}
			}, this.load()
		}
		get enabled() {
			return this.player.isHTML5 && this.player.isVideo && this.player.config.previewThumbnails.enabled
		}
		get currentImageContainer() {
			return this.mouseDown ? this.elements.scrubbing.container : this.elements.thumb.imageContainer
		}
		get usingSprites() {
			return Object.keys(this.thumbnails[0].frames[0]).includes("w")
		}
		get thumbAspectRatio() {
			return this.usingSprites ? this.thumbnails[0].frames[0].w / this.thumbnails[0].frames[0].h : this.thumbnails[0].width / this.thumbnails[0].height
		}
		get thumbContainerHeight() {
			if (this.mouseDown) {
				const {
					height: e
				} = bt(this.thumbAspectRatio, {
					width: this.player.media.clientWidth,
					height: this.player.media.clientHeight
				});
				return e
			}
			return this.sizeSpecifiedInCSS ? this.elements.thumb.imageContainer.clientHeight : Math.floor(this.player.media.clientWidth / this.thumbAspectRatio / 4)
		}
		get currentImageElement() {
			return this.mouseDown ? this.currentScrubbingImageElement : this.currentThumbnailImageElement
		}
		set currentImageElement(e) {
			this.mouseDown ? this.currentScrubbingImageElement = e : this.currentThumbnailImageElement = e
		}
	}
	const vt = {
		insertElements(e, t) {
			_(t) ? ee(e, this.media, {
				src: t
			}) : q(t) && t.forEach((t => {
				ee(e, this.media, t)
			}))
		},
		change(e) {
			Q(e, "sources.length") ? (Le.cancelRequests.call(this), this.destroy.call(this, (() => {
				this.options.quality = [], te(this.media), this.media = null, H(this.elements.container) && this.elements.container.removeAttribute("class");
				const {
					sources: t,
					type: i
				} = e, [{
					provider: s = Ge.html5,
					src: n
				}] = t, a = "html5" === s ? i : "div", l = "html5" === s ? {} : {
					src: n
				};
				Object.assign(this, {
					provider: s,
					type: i,
					supported: me.check(i, s, this.config.playsinline),
					media: Z(a, l)
				}), this.elements.container.appendChild(this.media), O(e.autoplay) && (this.config.autoplay = e.autoplay), this.isHTML5 && (this.config.crossorigin && this.media.setAttribute("crossorigin", ""), this.config.autoplay && this.media.setAttribute("autoplay", ""), W(e.poster) || (this.poster = e.poster), this.config.loop.active && this.media.setAttribute("loop", ""), this.config.muted && this.media.setAttribute("muted", ""), this.config.playsinline && this.media.setAttribute("playsinline", "")), at.addStyleHook.call(this), this.isHTML5 && vt.insertElements.call(this, "source", t), this.config.title = e.title, pt.setup.call(this), this.isHTML5 && Object.keys(e).includes("tracks") && vt.insertElements.call(this, "track", e.tracks), (this.isHTML5 || this.isEmbed && !this.supported.ui) && at.build.call(this), this.isHTML5 && this.media.load(), W(e.previewThumbnails) || (Object.assign(this.config.previewThumbnails, e.previewThumbnails), this.previewThumbnails && this.previewThumbnails.loaded && (this.previewThumbnails.destroy(), this.previewThumbnails = null), this.config.previewThumbnails.enabled && (this.previewThumbnails = new yt(this))), this.fullscreen.update()
			}), !0)) : this.debug.warn("Invalid source format")
		}
	};
	class wt {
		constructor(t, i) {
			if (e(this, "play", (() => j(this.media.play) ? (this.ads && this.ads.enabled && this.ads.managerPromise.then((() => this.ads.play())).catch((() => ke(this.media.play()))), this.media.play()) : null)), e(this, "pause", (() => this.playing && j(this.media.pause) ? this.media.pause() : null)), e(this, "togglePlay", (e => (O(e) ? e : !this.playing) ? this.play() : this.pause())), e(this, "stop", (() => {
					this.isHTML5 ? (this.pause(), this.restart()) : j(this.media.stop) && this.media.stop()
				})), e(this, "restart", (() => {
					this.currentTime = 0
				})), e(this, "rewind", (e => {
					this.currentTime -= $(e) ? e : this.config.seekTime
				})), e(this, "forward", (e => {
					this.currentTime += $(e) ? e : this.config.seekTime
				})), e(this, "increaseVolume", (e => {
					const t = this.media.muted ? 0 : this.volume;
					this.volume = t + ($(e) ? e : 0)
				})), e(this, "decreaseVolume", (e => {
					this.increaseVolume(-e)
				})), e(this, "airplay", (() => {
					me.airplay && this.media.webkitShowPlaybackTargetPicker()
				})), e(this, "toggleControls", (e => {
					if (this.supported.ui && !this.isAudio) {
						const t = oe(this.elements.container, this.config.classNames.hideControls),
							i = void 0 === e ? void 0 : !e,
							s = le(this.elements.container, this.config.classNames.hideControls, i);
						if (s && q(this.config.controls) && this.config.controls.includes("settings") && !W(this.config.settings) && We.toggleMenu.call(this, !1), s !== t) {
							const e = s ? "controlshidden" : "controlsshown";
							ve.call(this, this.media, e)
						}
						return !s
					}
					return !1
				})), e(this, "on", ((e, t) => {
					fe.call(this, this.elements.container, e, t)
				})), e(this, "once", ((e, t) => {
					ye.call(this, this.elements.container, e, t)
				})), e(this, "off", ((e, t) => {
					be(this.elements.container, e, t)
				})), e(this, "destroy", ((e, t = !1) => {
					if (!this.ready) return;
					const i = () => {
						document.body.style.overflow = "", this.embed = null, t ? (Object.keys(this.elements).length && (te(this.elements.buttons.play), te(this.elements.captions), te(this.elements.controls), te(this.elements.wrapper), this.elements.buttons.play = null, this.elements.captions = null, this.elements.controls = null, this.elements.wrapper = null), j(e) && e()) : (we.call(this), Le.cancelRequests.call(this), se(this.elements.original, this.elements.container), ve.call(this, this.elements.original, "destroyed", !0), j(e) && e.call(this.elements.original), this.ready = !1, setTimeout((() => {
							this.elements = null, this.media = null
						}), 200))
					};
					this.stop(), clearTimeout(this.timers.loading), clearTimeout(this.timers.controls), clearTimeout(this.timers.resized), this.isHTML5 ? (at.toggleNativeControls.call(this, !0), i()) : this.isYouTube ? (clearInterval(this.timers.buffering), clearInterval(this.timers.playing), null !== this.embed && j(this.embed.destroy) && this.embed.destroy(), i()) : this.isVimeo && (null !== this.embed && this.embed.unload().then(i), setTimeout(i, 200))
				})), e(this, "supports", (e => me.mime.call(this, e))), this.timers = {}, this.ready = !1, this.loading = !1, this.failed = !1, this.touch = me.touch, this.media = t, _(this.media) && (this.media = document.querySelectorAll(this.media)), (window.jQuery && this.media instanceof jQuery || D(this.media) || q(this.media)) && (this.media = this.media[0]), this.config = X({}, Qe, wt.defaults, i || {}, (() => {
					try {
						return JSON.parse(this.media.getAttribute("data-plyr-config"))
					} catch (e) {
						return {}
					}
				})()), this.elements = {
					container: null,
					fullscreen: null,
					captions: null,
					buttons: {},
					display: {},
					progress: {},
					inputs: {},
					settings: {
						popup: null,
						menu: null,
						panels: {},
						buttons: {}
					}
				}, this.captions = {
					active: null,
					currentTrack: -1,
					meta: new WeakMap
				}, this.fullscreen = {
					active: !1
				}, this.options = {
					speed: [],
					quality: []
				}, this.debug = new it(this.config.debug), this.debug.log("Config", this.config), this.debug.log("Support", me), I(this.media) || !H(this.media)) return void this.debug.error("Setup failed: no suitable element passed");
			if (this.media.plyr) return void this.debug.warn("Target already setup");
			if (!this.config.enabled) return void this.debug.error("Setup failed: disabled by config");
			if (!me.check().api) return void this.debug.error("Setup failed: no support");
			const s = this.media.cloneNode(!0);
			s.autoplay = !1, this.elements.original = s;
			const n = this.media.tagName.toLowerCase();
			let a = null,
				l = null;
			switch (n) {
				case "div":
					if (a = this.media.querySelector("iframe"), H(a)) {
						if (l = ze(a.getAttribute("src")), this.provider = function(e) {
								return /^(https?:\/\/)?(www\.)?(youtube\.com|youtube-nocookie\.com|youtu\.?be)\/.+$/.test(e) ? Ge.youtube : /^https?:\/\/player.vimeo.com\/video\/\d{0,9}(?=\b|\/)/.test(e) ? Ge.vimeo : null
							}(l.toString()), this.elements.container = this.media, this.media = a, this.elements.container.className = "", l.search.length) {
							const e = ["1", "true"];
							e.includes(l.searchParams.get("autoplay")) && (this.config.autoplay = !0), e.includes(l.searchParams.get("loop")) && (this.config.loop.active = !0), this.isYouTube ? (this.config.playsinline = e.includes(l.searchParams.get("playsinline")), this.config.youtube.hl = l.searchParams.get("hl")) : this.config.playsinline = !0
						}
					} else this.provider = this.media.getAttribute(this.config.attributes.embed.provider), this.media.removeAttribute(this.config.attributes.embed.provider);
					if (W(this.provider) || !Object.values(Ge).includes(this.provider)) return void this.debug.error("Setup failed: Invalid provider");
					this.type = et;
					break;
				case "video":
				case "audio":
					this.type = n, this.provider = Ge.html5, this.media.hasAttribute("crossorigin") && (this.config.crossorigin = !0), this.media.hasAttribute("autoplay") && (this.config.autoplay = !0), (this.media.hasAttribute("playsinline") || this.media.hasAttribute("webkit-playsinline")) && (this.config.playsinline = !0), this.media.hasAttribute("muted") && (this.config.muted = !0), this.media.hasAttribute("loop") && (this.config.loop.active = !0);
					break;
				default:
					return void this.debug.error("Setup failed: unsupported type")
			}
			this.supported = me.check(this.type, this.provider, this.config.playsinline), this.supported.api ? (this.eventListeners = [], this.listeners = new lt(this), this.storage = new Fe(this), this.media.plyr = this, H(this.elements.container) || (this.elements.container = Z("div", {
				tabindex: 0
			}), J(this.media, this.elements.container)), at.migrateStyles.call(this), at.addStyleHook.call(this), pt.setup.call(this), this.config.debug && fe.call(this, this.elements.container, this.config.events.join(" "), (e => {
				this.debug.log(`event: ${e.type}`)
			})), this.fullscreen = new st(this), (this.isHTML5 || this.isEmbed && !this.supported.ui) && at.build.call(this), this.listeners.container(), this.listeners.global(), this.config.ads.enabled && (this.ads = new gt(this)), this.isHTML5 && this.config.autoplay && this.once("canplay", (() => ke(this.play()))), this.lastSeekTime = 0, this.config.previewThumbnails.enabled && (this.previewThumbnails = new yt(this))) : this.debug.error("Setup failed: no support")
		}
		get isHTML5() {
			return this.provider === Ge.html5
		}
		get isEmbed() {
			return this.isYouTube || this.isVimeo
		}
		get isYouTube() {
			return this.provider === Ge.youtube
		}
		get isVimeo() {
			return this.provider === Ge.vimeo
		}
		get isVideo() {
			return this.type === et
		}
		get isAudio() {
			return this.type === Ze
		}
		get playing() {
			return Boolean(this.ready && !this.paused && !this.ended)
		}
		get paused() {
			return Boolean(this.media.paused)
		}
		get stopped() {
			return Boolean(this.paused && 0 === this.currentTime)
		}
		get ended() {
			return Boolean(this.media.ended)
		}
		set currentTime(e) {
			if (!this.duration) return;
			const t = $(e) && e > 0;
			this.media.currentTime = t ? Math.min(e, this.duration) : 0, this.debug.log(`Seeking to ${this.currentTime} seconds`)
		}
		get currentTime() {
			return Number(this.media.currentTime)
		}
		get buffered() {
			const {
				buffered: e
			} = this.media;
			return $(e) ? e : e && e.length && this.duration > 0 ? e.end(0) / this.duration : 0
		}
		get seeking() {
			return Boolean(this.media.seeking)
		}
		get duration() {
			const e = parseFloat(this.config.duration),
				t = (this.media || {}).duration,
				i = $(t) && t !== 1 / 0 ? t : 0;
			return e || i
		}
		set volume(e) {
			let t = e;
			_(t) && (t = Number(t)), $(t) || (t = this.storage.get("volume")), $(t) || ({
				volume: t
			} = this.config), t > 1 && (t = 1), t < 0 && (t = 0), this.config.volume = t, this.media.volume = t, !W(e) && this.muted && t > 0 && (this.muted = !1)
		}
		get volume() {
			return Number(this.media.volume)
		}
		set muted(e) {
			let t = e;
			O(t) || (t = this.storage.get("muted")), O(t) || (t = this.config.muted), this.config.muted = t, this.media.muted = t
		}
		get muted() {
			return Boolean(this.media.muted)
		}
		get hasAudio() {
			return !this.isHTML5 || (!!this.isAudio || (Boolean(this.media.mozHasAudio) || Boolean(this.media.webkitAudioDecodedByteCount) || Boolean(this.media.audioTracks && this.media.audioTracks.length)))
		}
		set speed(e) {
			let t = null;
			$(e) && (t = e), $(t) || (t = this.storage.get("speed")), $(t) || (t = this.config.speed.selected);
			const {
				minimumSpeed: i,
				maximumSpeed: s
			} = this;
			t = function(e = 0, t = 0, i = 255) {
				return Math.min(Math.max(e, t), i)
			}(t, i, s), this.config.speed.selected = t, setTimeout((() => {
				this.media && (this.media.playbackRate = t)
			}), 0)
		}
		get speed() {
			return Number(this.media.playbackRate)
		}
		get minimumSpeed() {
			return this.isYouTube ? Math.min(...this.options.speed) : this.isVimeo ? .5 : .0625
		}
		get maximumSpeed() {
			return this.isYouTube ? Math.max(...this.options.speed) : this.isVimeo ? 2 : 16
		}
		set quality(e) {
			const t = this.config.quality,
				i = this.options.quality;
			if (!i.length) return;
			let s = [!W(e) && Number(e), this.storage.get("quality"), t.selected, t.default].find($),
				n = !0;
			if (!i.includes(s)) {
				const e = Ae(i, s);
				this.debug.warn(`Unsupported quality option: ${s}, using ${e} instead`), s = e, n = !1
			}
			t.selected = s, this.media.quality = s, n && this.storage.set({
				quality: s
			})
		}
		get quality() {
			return this.media.quality
		}
		set loop(e) {
			const t = O(e) ? e : this.config.loop.active;
			this.config.loop.active = t, this.media.loop = t
		}
		get loop() {
			return Boolean(this.media.loop)
		}
		set source(e) {
			vt.change.call(this, e)
		}
		get source() {
			return this.media.currentSrc
		}
		get download() {
			const {
				download: e
			} = this.config.urls;
			return U(e) ? e : this.source
		}
		set download(e) {
			U(e) && (this.config.urls.download = e, We.setDownloadUrl.call(this))
		}
		set poster(e) {
			this.isVideo ? at.setPoster.call(this, e, !1).catch((() => {})) : this.debug.warn("Poster can only be set for video")
		}
		get poster() {
			return this.isVideo ? this.media.getAttribute("poster") || this.media.getAttribute("data-poster") : null
		}
		get ratio() {
			if (!this.isVideo) return null;
			const e = Ne(xe.call(this));
			return q(e) ? e.join(":") : e
		}
		set ratio(e) {
			this.isVideo ? _(e) && Pe(e) ? (this.config.ratio = Ne(e), Me.call(this)) : this.debug.error(`Invalid aspect ratio specified (${e})`) : this.debug.warn("Aspect ratio can only be set for video")
		}
		set autoplay(e) {
			const t = O(e) ? e : this.config.autoplay;
			this.config.autoplay = t
		}
		get autoplay() {
			return Boolean(this.config.autoplay)
		}
		toggleCaptions(e) {
			Ye.toggle.call(this, e, !1)
		}
		set currentTrack(e) {
			Ye.set.call(this, e, !1), Ye.setup()
		}
		get currentTrack() {
			const {
				toggled: e,
				currentTrack: t
			} = this.captions;
			return e ? t : -1
		}
		set language(e) {
			Ye.setLanguage.call(this, e, !1)
		}
		get language() {
			return (Ye.getCurrentTrack.call(this) || {}).language
		}
		set pip(e) {
			if (!me.pip) return;
			const t = O(e) ? e : !this.pip;
			j(this.media.webkitSetPresentationMode) && this.media.webkitSetPresentationMode(t ? Xe : Je), j(this.media.requestPictureInPicture) && (!this.pip && t ? this.media.requestPictureInPicture() : this.pip && !t && document.exitPictureInPicture())
		}
		get pip() {
			return me.pip ? W(this.media.webkitPresentationMode) ? this.media === document.pictureInPictureElement : this.media.webkitPresentationMode === Xe : null
		}
		setPreviewThumbnails(e) {
			this.previewThumbnails && this.previewThumbnails.loaded && (this.previewThumbnails.destroy(), this.previewThumbnails = null), Object.assign(this.config.previewThumbnails, e), this.config.previewThumbnails.enabled && (this.previewThumbnails = new yt(this))
		}
		static supported(e, t, i) {
			return me.check(e, t, i)
		}
		static loadSprite(e, t) {
			return Ve(e, t)
		}
		static setup(e, t = {}) {
			let i = null;
			return _(e) ? i = Array.from(document.querySelectorAll(e)) : D(e) ? i = Array.from(e) : q(e) && (i = e.filter(H)), W(i) ? null : i.map((e => new wt(e, t)))
		}
	}
	var Tt;
	return wt.defaults = (Tt = Qe, JSON.parse(JSON.stringify(Tt))), wt
}));;

! function(t, e) {
	"object" == typeof exports && "undefined" != typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define(e) : (t = t || self).SimpleBar = e()
}(this, (function() {
	"use strict";
	var t = "undefined" != typeof globalThis ? globalThis : "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : {};

	function e(t, e) {
		return t(e = {
			exports: {}
		}, e.exports), e.exports
	}
	var r, i, n, o = "object",
		s = function(t) {
			return t && t.Math == Math && t
		},
		a = s(typeof globalThis == o && globalThis) || s(typeof window == o && window) || s(typeof self == o && self) || s(typeof t == o && t) || Function("return this")(),
		c = function(t) {
			try {
				return !!t()
			} catch (t) {
				return !0
			}
		},
		l = !c((function() {
			return 7 != Object.defineProperty({}, "a", {
				get: function() {
					return 7
				}
			}).a
		})),
		u = {}.propertyIsEnumerable,
		f = Object.getOwnPropertyDescriptor,
		h = {
			f: f && !u.call({
				1: 2
			}, 1) ? function(t) {
				var e = f(this, t);
				return !!e && e.enumerable
			} : u
		},
		d = function(t, e) {
			return {
				enumerable: !(1 & t),
				configurable: !(2 & t),
				writable: !(4 & t),
				value: e
			}
		},
		p = {}.toString,
		v = function(t) {
			return p.call(t).slice(8, -1)
		},
		g = "".split,
		b = c((function() {
			return !Object("z").propertyIsEnumerable(0)
		})) ? function(t) {
			return "String" == v(t) ? g.call(t, "") : Object(t)
		} : Object,
		y = function(t) {
			if (null == t) throw TypeError("Can't call method on " + t);
			return t
		},
		m = function(t) {
			return b(y(t))
		},
		x = function(t) {
			return "object" == typeof t ? null !== t : "function" == typeof t
		},
		E = function(t, e) {
			if (!x(t)) return t;
			var r, i;
			if (e && "function" == typeof(r = t.toString) && !x(i = r.call(t))) return i;
			if ("function" == typeof(r = t.valueOf) && !x(i = r.call(t))) return i;
			if (!e && "function" == typeof(r = t.toString) && !x(i = r.call(t))) return i;
			throw TypeError("Can't convert object to primitive value")
		},
		w = {}.hasOwnProperty,
		S = function(t, e) {
			return w.call(t, e)
		},
		O = a.document,
		k = x(O) && x(O.createElement),
		A = function(t) {
			return k ? O.createElement(t) : {}
		},
		T = !l && !c((function() {
			return 7 != Object.defineProperty(A("div"), "a", {
				get: function() {
					return 7
				}
			}).a
		})),
		L = Object.getOwnPropertyDescriptor,
		z = {
			f: l ? L : function(t, e) {
				if (t = m(t), e = E(e, !0), T) try {
					return L(t, e)
				} catch (t) {}
				if (S(t, e)) return d(!h.f.call(t, e), t[e])
			}
		},
		R = function(t) {
			if (!x(t)) throw TypeError(String(t) + " is not an object");
			return t
		},
		_ = Object.defineProperty,
		M = {
			f: l ? _ : function(t, e, r) {
				if (R(t), e = E(e, !0), R(r), T) try {
					return _(t, e, r)
				} catch (t) {}
				if ("get" in r || "set" in r) throw TypeError("Accessors not supported");
				return "value" in r && (t[e] = r.value), t
			}
		},
		C = l ? function(t, e, r) {
			return M.f(t, e, d(1, r))
		} : function(t, e, r) {
			return t[e] = r, t
		},
		W = function(t, e) {
			try {
				C(a, t, e)
			} catch (r) {
				a[t] = e
			}
			return e
		},
		j = e((function(t) {
			var e = a["__core-js_shared__"] || W("__core-js_shared__", {});
			(t.exports = function(t, r) {
				return e[t] || (e[t] = void 0 !== r ? r : {})
			})("versions", []).push({
				version: "3.2.1",
				mode: "global",
				copyright: "Â© 2019 Denis Pushkarev (zloirock.ru)"
			})
		})),
		N = j("native-function-to-string", Function.toString),
		I = a.WeakMap,
		B = "function" == typeof I && /native code/.test(N.call(I)),
		D = 0,
		P = Math.random(),
		F = function(t) {
			return "Symbol(" + String(void 0 === t ? "" : t) + ")_" + (++D + P).toString(36)
		},
		V = j("keys"),
		X = function(t) {
			return V[t] || (V[t] = F(t))
		},
		H = {},
		q = a.WeakMap;
	if (B) {
		var $ = new q,
			Y = $.get,
			G = $.has,
			U = $.set;
		r = function(t, e) {
			return U.call($, t, e), e
		}, i = function(t) {
			return Y.call($, t) || {}
		}, n = function(t) {
			return G.call($, t)
		}
	} else {
		var Q = X("state");
		H[Q] = !0, r = function(t, e) {
			return C(t, Q, e), e
		}, i = function(t) {
			return S(t, Q) ? t[Q] : {}
		}, n = function(t) {
			return S(t, Q)
		}
	}
	var K = {
			set: r,
			get: i,
			has: n,
			enforce: function(t) {
				return n(t) ? i(t) : r(t, {})
			},
			getterFor: function(t) {
				return function(e) {
					var r;
					if (!x(e) || (r = i(e)).type !== t) throw TypeError("Incompatible receiver, " + t + " required");
					return r
				}
			}
		},
		J = e((function(t) {
			var e = K.get,
				r = K.enforce,
				i = String(N).split("toString");
			j("inspectSource", (function(t) {
				return N.call(t)
			})), (t.exports = function(t, e, n, o) {
				var s = !!o && !!o.unsafe,
					c = !!o && !!o.enumerable,
					l = !!o && !!o.noTargetGet;
				"function" == typeof n && ("string" != typeof e || S(n, "name") || C(n, "name", e), r(n).source = i.join("string" == typeof e ? e : "")), t !== a ? (s ? !l && t[e] && (c = !0) : delete t[e], c ? t[e] = n : C(t, e, n)) : c ? t[e] = n : W(e, n)
			})(Function.prototype, "toString", (function() {
				return "function" == typeof this && e(this).source || N.call(this)
			}))
		})),
		Z = a,
		tt = function(t) {
			return "function" == typeof t ? t : void 0
		},
		et = function(t, e) {
			return arguments.length < 2 ? tt(Z[t]) || tt(a[t]) : Z[t] && Z[t][e] || a[t] && a[t][e]
		},
		rt = Math.ceil,
		it = Math.floor,
		nt = function(t) {
			return isNaN(t = +t) ? 0 : (t > 0 ? it : rt)(t)
		},
		ot = Math.min,
		st = function(t) {
			return t > 0 ? ot(nt(t), 9007199254740991) : 0
		},
		at = Math.max,
		ct = Math.min,
		lt = function(t) {
			return function(e, r, i) {
				var n, o = m(e),
					s = st(o.length),
					a = function(t, e) {
						var r = nt(t);
						return r < 0 ? at(r + e, 0) : ct(r, e)
					}(i, s);
				if (t && r != r) {
					for (; s > a;)
						if ((n = o[a++]) != n) return !0
				} else
					for (; s > a; a++)
						if ((t || a in o) && o[a] === r) return t || a || 0;
				return !t && -1
			}
		},
		ut = {
			includes: lt(!0),
			indexOf: lt(!1)
		}.indexOf,
		ft = function(t, e) {
			var r, i = m(t),
				n = 0,
				o = [];
			for (r in i) !S(H, r) && S(i, r) && o.push(r);
			for (; e.length > n;) S(i, r = e[n++]) && (~ut(o, r) || o.push(r));
			return o
		},
		ht = ["constructor", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "toLocaleString", "toString", "valueOf"],
		dt = ht.concat("length", "prototype"),
		pt = {
			f: Object.getOwnPropertyNames || function(t) {
				return ft(t, dt)
			}
		},
		vt = {
			f: Object.getOwnPropertySymbols
		},
		gt = et("Reflect", "ownKeys") || function(t) {
			var e = pt.f(R(t)),
				r = vt.f;
			return r ? e.concat(r(t)) : e
		},
		bt = function(t, e) {
			for (var r = gt(e), i = M.f, n = z.f, o = 0; o < r.length; o++) {
				var s = r[o];
				S(t, s) || i(t, s, n(e, s))
			}
		},
		yt = /#|\.prototype\./,
		mt = function(t, e) {
			var r = Et[xt(t)];
			return r == St || r != wt && ("function" == typeof e ? c(e) : !!e)
		},
		xt = mt.normalize = function(t) {
			return String(t).replace(yt, ".").toLowerCase()
		},
		Et = mt.data = {},
		wt = mt.NATIVE = "N",
		St = mt.POLYFILL = "P",
		Ot = mt,
		kt = z.f,
		At = function(t, e) {
			var r, i, n, o, s, c = t.target,
				l = t.global,
				u = t.stat;
			if (r = l ? a : u ? a[c] || W(c, {}) : (a[c] || {}).prototype)
				for (i in e) {
					if (o = e[i], n = t.noTargetGet ? (s = kt(r, i)) && s.value : r[i], !Ot(l ? i : c + (u ? "." : "#") + i, t.forced) && void 0 !== n) {
						if (typeof o == typeof n) continue;
						bt(o, n)
					}(t.sham || n && n.sham) && C(o, "sham", !0), J(r, i, o, t)
				}
		},
		Tt = function(t) {
			if ("function" != typeof t) throw TypeError(String(t) + " is not a function");
			return t
		},
		Lt = function(t, e, r) {
			if (Tt(t), void 0 === e) return t;
			switch (r) {
				case 0:
					return function() {
						return t.call(e)
					};
				case 1:
					return function(r) {
						return t.call(e, r)
					};
				case 2:
					return function(r, i) {
						return t.call(e, r, i)
					};
				case 3:
					return function(r, i, n) {
						return t.call(e, r, i, n)
					}
			}
			return function() {
				return t.apply(e, arguments)
			}
		},
		zt = function(t) {
			return Object(y(t))
		},
		Rt = Array.isArray || function(t) {
			return "Array" == v(t)
		},
		_t = !!Object.getOwnPropertySymbols && !c((function() {
			return !String(Symbol())
		})),
		Mt = a.Symbol,
		Ct = j("wks"),
		Wt = function(t) {
			return Ct[t] || (Ct[t] = _t && Mt[t] || (_t ? Mt : F)("Symbol." + t))
		},
		jt = Wt("species"),
		Nt = function(t, e) {
			var r;
			return Rt(t) && ("function" != typeof(r = t.constructor) || r !== Array && !Rt(r.prototype) ? x(r) && null === (r = r[jt]) && (r = void 0) : r = void 0), new(void 0 === r ? Array : r)(0 === e ? 0 : e)
		},
		It = [].push,
		Bt = function(t) {
			var e = 1 == t,
				r = 2 == t,
				i = 3 == t,
				n = 4 == t,
				o = 6 == t,
				s = 5 == t || o;
			return function(a, c, l, u) {
				for (var f, h, d = zt(a), p = b(d), v = Lt(c, l, 3), g = st(p.length), y = 0, m = u || Nt, x = e ? m(a, g) : r ? m(a, 0) : void 0; g > y; y++)
					if ((s || y in p) && (h = v(f = p[y], y, d), t))
						if (e) x[y] = h;
						else if (h) switch (t) {
					case 3:
						return !0;
					case 5:
						return f;
					case 6:
						return y;
					case 2:
						It.call(x, f)
				} else if (n) return !1;
				return o ? -1 : i || n ? n : x
			}
		},
		Dt = {
			forEach: Bt(0),
			map: Bt(1),
			filter: Bt(2),
			some: Bt(3),
			every: Bt(4),
			find: Bt(5),
			findIndex: Bt(6)
		},
		Pt = function(t, e) {
			var r = [][t];
			return !r || !c((function() {
				r.call(null, e || function() {
					throw 1
				}, 1)
			}))
		},
		Ft = Dt.forEach,
		Vt = Pt("forEach") ? function(t) {
			return Ft(this, t, arguments.length > 1 ? arguments[1] : void 0)
		} : [].forEach;
	At({
		target: "Array",
		proto: !0,
		forced: [].forEach != Vt
	}, {
		forEach: Vt
	});
	var Xt = {
		CSSRuleList: 0,
		CSSStyleDeclaration: 0,
		CSSValueList: 0,
		ClientRectList: 0,
		DOMRectList: 0,
		DOMStringList: 0,
		DOMTokenList: 1,
		DataTransferItemList: 0,
		FileList: 0,
		HTMLAllCollection: 0,
		HTMLCollection: 0,
		HTMLFormElement: 0,
		HTMLSelectElement: 0,
		MediaList: 0,
		MimeTypeArray: 0,
		NamedNodeMap: 0,
		NodeList: 1,
		PaintRequestList: 0,
		Plugin: 0,
		PluginArray: 0,
		SVGLengthList: 0,
		SVGNumberList: 0,
		SVGPathSegList: 0,
		SVGPointList: 0,
		SVGStringList: 0,
		SVGTransformList: 0,
		SourceBufferList: 0,
		StyleSheetList: 0,
		TextTrackCueList: 0,
		TextTrackList: 0,
		TouchList: 0
	};
	for (var Ht in Xt) {
		var qt = a[Ht],
			$t = qt && qt.prototype;
		if ($t && $t.forEach !== Vt) try {
			C($t, "forEach", Vt)
		} catch (t) {
			$t.forEach = Vt
		}
	}
	var Yt = !("undefined" == typeof window || !window.document || !window.document.createElement),
		Gt = Wt("species"),
		Ut = Dt.filter;
	At({
		target: "Array",
		proto: !0,
		forced: ! function(t) {
			return !c((function() {
				var e = [];
				return (e.constructor = {})[Gt] = function() {
					return {
						foo: 1
					}
				}, 1 !== e[t](Boolean).foo
			}))
		}("filter")
	}, {
		filter: function(t) {
			return Ut(this, t, arguments.length > 1 ? arguments[1] : void 0)
		}
	});
	var Qt = Object.keys || function(t) {
			return ft(t, ht)
		},
		Kt = l ? Object.defineProperties : function(t, e) {
			R(t);
			for (var r, i = Qt(e), n = i.length, o = 0; n > o;) M.f(t, r = i[o++], e[r]);
			return t
		},
		Jt = et("document", "documentElement"),
		Zt = X("IE_PROTO"),
		te = function() {},
		ee = function() {
			var t, e = A("iframe"),
				r = ht.length;
			for (e.style.display = "none", Jt.appendChild(e), e.src = String("javascript:"), (t = e.contentWindow.document).open(), t.write("<script>document.F=Object<\/script>"), t.close(), ee = t.F; r--;) delete ee.prototype[ht[r]];
			return ee()
		},
		re = Object.create || function(t, e) {
			var r;
			return null !== t ? (te.prototype = R(t), r = new te, te.prototype = null, r[Zt] = t) : r = ee(), void 0 === e ? r : Kt(r, e)
		};
	H[Zt] = !0;
	var ie = Wt("unscopables"),
		ne = Array.prototype;
	null == ne[ie] && C(ne, ie, re(null));
	var oe, se, ae, ce = function(t) {
			ne[ie][t] = !0
		},
		le = {},
		ue = !c((function() {
			function t() {}
			return t.prototype.constructor = null, Object.getPrototypeOf(new t) !== t.prototype
		})),
		fe = X("IE_PROTO"),
		he = Object.prototype,
		de = ue ? Object.getPrototypeOf : function(t) {
			return t = zt(t), S(t, fe) ? t[fe] : "function" == typeof t.constructor && t instanceof t.constructor ? t.constructor.prototype : t instanceof Object ? he : null
		},
		pe = Wt("iterator"),
		ve = !1;
	[].keys && ("next" in (ae = [].keys()) ? (se = de(de(ae))) !== Object.prototype && (oe = se) : ve = !0), null == oe && (oe = {}), S(oe, pe) || C(oe, pe, (function() {
		return this
	}));
	var ge = {
			IteratorPrototype: oe,
			BUGGY_SAFARI_ITERATORS: ve
		},
		be = M.f,
		ye = Wt("toStringTag"),
		me = function(t, e, r) {
			t && !S(t = r ? t : t.prototype, ye) && be(t, ye, {
				configurable: !0,
				value: e
			})
		},
		xe = ge.IteratorPrototype,
		Ee = function() {
			return this
		},
		we = Object.setPrototypeOf || ("__proto__" in {} ? function() {
			var t, e = !1,
				r = {};
			try {
				(t = Object.getOwnPropertyDescriptor(Object.prototype, "__proto__").set).call(r, []), e = r instanceof Array
			} catch (t) {}
			return function(r, i) {
				return R(r),
					function(t) {
						if (!x(t) && null !== t) throw TypeError("Can't set " + String(t) + " as a prototype")
					}(i), e ? t.call(r, i) : r.__proto__ = i, r
			}
		}() : void 0),
		Se = ge.IteratorPrototype,
		Oe = ge.BUGGY_SAFARI_ITERATORS,
		ke = Wt("iterator"),
		Ae = function() {
			return this
		},
		Te = function(t, e, r, i, n, o, s) {
			! function(t, e, r) {
				var i = e + " Iterator";
				t.prototype = re(xe, {
					next: d(1, r)
				}), me(t, i, !1), le[i] = Ee
			}(r, e, i);
			var a, c, l, u = function(t) {
					if (t === n && g) return g;
					if (!Oe && t in p) return p[t];
					switch (t) {
						case "keys":
						case "values":
						case "entries":
							return function() {
								return new r(this, t)
							}
					}
					return function() {
						return new r(this)
					}
				},
				f = e + " Iterator",
				h = !1,
				p = t.prototype,
				v = p[ke] || p["@@iterator"] || n && p[n],
				g = !Oe && v || u(n),
				b = "Array" == e && p.entries || v;
			if (b && (a = de(b.call(new t)), Se !== Object.prototype && a.next && (de(a) !== Se && (we ? we(a, Se) : "function" != typeof a[ke] && C(a, ke, Ae)), me(a, f, !0))), "values" == n && v && "values" !== v.name && (h = !0, g = function() {
					return v.call(this)
				}), p[ke] !== g && C(p, ke, g), le[e] = g, n)
				if (c = {
						values: u("values"),
						keys: o ? g : u("keys"),
						entries: u("entries")
					}, s)
					for (l in c) !Oe && !h && l in p || J(p, l, c[l]);
				else At({
					target: e,
					proto: !0,
					forced: Oe || h
				}, c);
			return c
		},
		Le = K.set,
		ze = K.getterFor("Array Iterator"),
		Re = Te(Array, "Array", (function(t, e) {
			Le(this, {
				type: "Array Iterator",
				target: m(t),
				index: 0,
				kind: e
			})
		}), (function() {
			var t = ze(this),
				e = t.target,
				r = t.kind,
				i = t.index++;
			return !e || i >= e.length ? (t.target = void 0, {
				value: void 0,
				done: !0
			}) : "keys" == r ? {
				value: i,
				done: !1
			} : "values" == r ? {
				value: e[i],
				done: !1
			} : {
				value: [i, e[i]],
				done: !1
			}
		}), "values");
	le.Arguments = le.Array, ce("keys"), ce("values"), ce("entries");
	var _e = Object.assign,
		Me = !_e || c((function() {
			var t = {},
				e = {},
				r = Symbol();
			return t[r] = 7, "abcdefghijklmnopqrst".split("").forEach((function(t) {
				e[t] = t
			})), 7 != _e({}, t)[r] || "abcdefghijklmnopqrst" != Qt(_e({}, e)).join("")
		})) ? function(t, e) {
			for (var r = zt(t), i = arguments.length, n = 1, o = vt.f, s = h.f; i > n;)
				for (var a, c = b(arguments[n++]), u = o ? Qt(c).concat(o(c)) : Qt(c), f = u.length, d = 0; f > d;) a = u[d++], l && !s.call(c, a) || (r[a] = c[a]);
			return r
		} : _e;
	At({
		target: "Object",
		stat: !0,
		forced: Object.assign !== Me
	}, {
		assign: Me
	});
	var Ce = Wt("toStringTag"),
		We = "Arguments" == v(function() {
			return arguments
		}()),
		je = function(t) {
			var e, r, i;
			return void 0 === t ? "Undefined" : null === t ? "Null" : "string" == typeof(r = function(t, e) {
				try {
					return t[e]
				} catch (t) {}
			}(e = Object(t), Ce)) ? r : We ? v(e) : "Object" == (i = v(e)) && "function" == typeof e.callee ? "Arguments" : i
		},
		Ne = {};
	Ne[Wt("toStringTag")] = "z";
	var Ie = "[object z]" !== String(Ne) ? function() {
			return "[object " + je(this) + "]"
		} : Ne.toString,
		Be = Object.prototype;
	Ie !== Be.toString && J(Be, "toString", Ie, {
		unsafe: !0
	});
	var De = "\t\n\v\f\r Â áš€â€€â€â€‚â€ƒâ€„â€…â€†â€‡â€ˆâ€‰â€Šâ€¯âŸã€€\u2028\u2029\ufeff",
		Pe = "[" + De + "]",
		Fe = RegExp("^" + Pe + Pe + "*"),
		Ve = RegExp(Pe + Pe + "*$"),
		Xe = function(t) {
			return function(e) {
				var r = String(y(e));
				return 1 & t && (r = r.replace(Fe, "")), 2 & t && (r = r.replace(Ve, "")), r
			}
		},
		He = {
			start: Xe(1),
			end: Xe(2),
			trim: Xe(3)
		}.trim,
		qe = a.parseInt,
		$e = /^[+-]?0[Xx]/,
		Ye = 8 !== qe(De + "08") || 22 !== qe(De + "0x16") ? function(t, e) {
			var r = He(String(t));
			return qe(r, e >>> 0 || ($e.test(r) ? 16 : 10))
		} : qe;
	At({
		global: !0,
		forced: parseInt != Ye
	}, {
		parseInt: Ye
	});
	var Ge = function(t) {
			return function(e, r) {
				var i, n, o = String(y(e)),
					s = nt(r),
					a = o.length;
				return s < 0 || s >= a ? t ? "" : void 0 : (i = o.charCodeAt(s)) < 55296 || i > 56319 || s + 1 === a || (n = o.charCodeAt(s + 1)) < 56320 || n > 57343 ? t ? o.charAt(s) : i : t ? o.slice(s, s + 2) : n - 56320 + (i - 55296 << 10) + 65536
			}
		},
		Ue = {
			codeAt: Ge(!1),
			charAt: Ge(!0)
		},
		Qe = Ue.charAt,
		Ke = K.set,
		Je = K.getterFor("String Iterator");
	Te(String, "String", (function(t) {
		Ke(this, {
			type: "String Iterator",
			string: String(t),
			index: 0
		})
	}), (function() {
		var t, e = Je(this),
			r = e.string,
			i = e.index;
		return i >= r.length ? {
			value: void 0,
			done: !0
		} : (t = Qe(r, i), e.index += t.length, {
			value: t,
			done: !1
		})
	}));
	var Ze = function(t, e, r) {
			for (var i in e) J(t, i, e[i], r);
			return t
		},
		tr = !c((function() {
			return Object.isExtensible(Object.preventExtensions({}))
		})),
		er = e((function(t) {
			var e = M.f,
				r = F("meta"),
				i = 0,
				n = Object.isExtensible || function() {
					return !0
				},
				o = function(t) {
					e(t, r, {
						value: {
							objectID: "O" + ++i,
							weakData: {}
						}
					})
				},
				s = t.exports = {
					REQUIRED: !1,
					fastKey: function(t, e) {
						if (!x(t)) return "symbol" == typeof t ? t : ("string" == typeof t ? "S" : "P") + t;
						if (!S(t, r)) {
							if (!n(t)) return "F";
							if (!e) return "E";
							o(t)
						}
						return t[r].objectID
					},
					getWeakData: function(t, e) {
						if (!S(t, r)) {
							if (!n(t)) return !0;
							if (!e) return !1;
							o(t)
						}
						return t[r].weakData
					},
					onFreeze: function(t) {
						return tr && s.REQUIRED && n(t) && !S(t, r) && o(t), t
					}
				};
			H[r] = !0
		})),
		rr = (er.REQUIRED, er.fastKey, er.getWeakData, er.onFreeze, Wt("iterator")),
		ir = Array.prototype,
		nr = Wt("iterator"),
		or = function(t, e, r, i) {
			try {
				return i ? e(R(r)[0], r[1]) : e(r)
			} catch (e) {
				var n = t.return;
				throw void 0 !== n && R(n.call(t)), e
			}
		},
		sr = e((function(t) {
			var e = function(t, e) {
				this.stopped = t, this.result = e
			};
			(t.exports = function(t, r, i, n, o) {
				var s, a, c, l, u, f, h, d = Lt(r, i, n ? 2 : 1);
				if (o) s = t;
				else {
					if ("function" != typeof(a = function(t) {
							if (null != t) return t[nr] || t["@@iterator"] || le[je(t)]
						}(t))) throw TypeError("Target is not iterable");
					if (void 0 !== (h = a) && (le.Array === h || ir[rr] === h)) {
						for (c = 0, l = st(t.length); l > c; c++)
							if ((u = n ? d(R(f = t[c])[0], f[1]) : d(t[c])) && u instanceof e) return u;
						return new e(!1)
					}
					s = a.call(t)
				}
				for (; !(f = s.next()).done;)
					if ((u = or(s, d, f.value, n)) && u instanceof e) return u;
				return new e(!1)
			}).stop = function(t) {
				return new e(!0, t)
			}
		})),
		ar = function(t, e, r) {
			if (!(t instanceof e)) throw TypeError("Incorrect " + (r ? r + " " : "") + "invocation");
			return t
		},
		cr = Wt("iterator"),
		lr = !1;
	try {
		var ur = 0,
			fr = {
				next: function() {
					return {
						done: !!ur++
					}
				},
				return: function() {
					lr = !0
				}
			};
		fr[cr] = function() {
			return this
		}, Array.from(fr, (function() {
			throw 2
		}))
	} catch (t) {}
	var hr = function(t, e, r, i, n) {
			var o = a[t],
				s = o && o.prototype,
				l = o,
				u = i ? "set" : "add",
				f = {},
				h = function(t) {
					var e = s[t];
					J(s, t, "add" == t ? function(t) {
						return e.call(this, 0 === t ? 0 : t), this
					} : "delete" == t ? function(t) {
						return !(n && !x(t)) && e.call(this, 0 === t ? 0 : t)
					} : "get" == t ? function(t) {
						return n && !x(t) ? void 0 : e.call(this, 0 === t ? 0 : t)
					} : "has" == t ? function(t) {
						return !(n && !x(t)) && e.call(this, 0 === t ? 0 : t)
					} : function(t, r) {
						return e.call(this, 0 === t ? 0 : t, r), this
					})
				};
			if (Ot(t, "function" != typeof o || !(n || s.forEach && !c((function() {
					(new o).entries().next()
				}))))) l = r.getConstructor(e, t, i, u), er.REQUIRED = !0;
			else if (Ot(t, !0)) {
				var d = new l,
					p = d[u](n ? {} : -0, 1) != d,
					v = c((function() {
						d.has(1)
					})),
					g = function(t, e) {
						if (!e && !lr) return !1;
						var r = !1;
						try {
							var i = {};
							i[cr] = function() {
								return {
									next: function() {
										return {
											done: r = !0
										}
									}
								}
							}, t(i)
						} catch (t) {}
						return r
					}((function(t) {
						new o(t)
					})),
					b = !n && c((function() {
						for (var t = new o, e = 5; e--;) t[u](e, e);
						return !t.has(-0)
					}));
				g || ((l = e((function(e, r) {
					ar(e, l, t);
					var n = function(t, e, r) {
						var i, n;
						return we && "function" == typeof(i = e.constructor) && i !== r && x(n = i.prototype) && n !== r.prototype && we(t, n), t
					}(new o, e, l);
					return null != r && sr(r, n[u], n, i), n
				}))).prototype = s, s.constructor = l), (v || b) && (h("delete"), h("has"), i && h("get")), (b || p) && h(u), n && s.clear && delete s.clear
			}
			return f[t] = l, At({
				global: !0,
				forced: l != o
			}, f), me(l, t), n || r.setStrong(l, t, i), l
		},
		dr = er.getWeakData,
		pr = K.set,
		vr = K.getterFor,
		gr = Dt.find,
		br = Dt.findIndex,
		yr = 0,
		mr = function(t) {
			return t.frozen || (t.frozen = new xr)
		},
		xr = function() {
			this.entries = []
		},
		Er = function(t, e) {
			return gr(t.entries, (function(t) {
				return t[0] === e
			}))
		};
	xr.prototype = {
		get: function(t) {
			var e = Er(this, t);
			if (e) return e[1]
		},
		has: function(t) {
			return !!Er(this, t)
		},
		set: function(t, e) {
			var r = Er(this, t);
			r ? r[1] = e : this.entries.push([t, e])
		},
		delete: function(t) {
			var e = br(this.entries, (function(e) {
				return e[0] === t
			}));
			return ~e && this.entries.splice(e, 1), !!~e
		}
	};
	var wr = {
			getConstructor: function(t, e, r, i) {
				var n = t((function(t, o) {
						ar(t, n, e), pr(t, {
							type: e,
							id: yr++,
							frozen: void 0
						}), null != o && sr(o, t[i], t, r)
					})),
					o = vr(e),
					s = function(t, e, r) {
						var i = o(t),
							n = dr(R(e), !0);
						return !0 === n ? mr(i).set(e, r) : n[i.id] = r, t
					};
				return Ze(n.prototype, {
					delete: function(t) {
						var e = o(this);
						if (!x(t)) return !1;
						var r = dr(t);
						return !0 === r ? mr(e).delete(t) : r && S(r, e.id) && delete r[e.id]
					},
					has: function(t) {
						var e = o(this);
						if (!x(t)) return !1;
						var r = dr(t);
						return !0 === r ? mr(e).has(t) : r && S(r, e.id)
					}
				}), Ze(n.prototype, r ? {
					get: function(t) {
						var e = o(this);
						if (x(t)) {
							var r = dr(t);
							return !0 === r ? mr(e).get(t) : r ? r[e.id] : void 0
						}
					},
					set: function(t, e) {
						return s(this, t, e)
					}
				} : {
					add: function(t) {
						return s(this, t, !0)
					}
				}), n
			}
		},
		Sr = (e((function(t) {
			var e, r = K.enforce,
				i = !a.ActiveXObject && "ActiveXObject" in a,
				n = Object.isExtensible,
				o = function(t) {
					return function() {
						return t(this, arguments.length ? arguments[0] : void 0)
					}
				},
				s = t.exports = hr("WeakMap", o, wr, !0, !0);
			if (B && i) {
				e = wr.getConstructor(o, "WeakMap", !0), er.REQUIRED = !0;
				var c = s.prototype,
					l = c.delete,
					u = c.has,
					f = c.get,
					h = c.set;
				Ze(c, {
					delete: function(t) {
						if (x(t) && !n(t)) {
							var i = r(this);
							return i.frozen || (i.frozen = new e), l.call(this, t) || i.frozen.delete(t)
						}
						return l.call(this, t)
					},
					has: function(t) {
						if (x(t) && !n(t)) {
							var i = r(this);
							return i.frozen || (i.frozen = new e), u.call(this, t) || i.frozen.has(t)
						}
						return u.call(this, t)
					},
					get: function(t) {
						if (x(t) && !n(t)) {
							var i = r(this);
							return i.frozen || (i.frozen = new e), u.call(this, t) ? f.call(this, t) : i.frozen.get(t)
						}
						return f.call(this, t)
					},
					set: function(t, i) {
						if (x(t) && !n(t)) {
							var o = r(this);
							o.frozen || (o.frozen = new e), u.call(this, t) ? h.call(this, t, i) : o.frozen.set(t, i)
						} else h.call(this, t, i);
						return this
					}
				})
			}
		})), Wt("iterator")),
		Or = Wt("toStringTag"),
		kr = Re.values;
	for (var Ar in Xt) {
		var Tr = a[Ar],
			Lr = Tr && Tr.prototype;
		if (Lr) {
			if (Lr[Sr] !== kr) try {
				C(Lr, Sr, kr)
			} catch (t) {
				Lr[Sr] = kr
			}
			if (Lr[Or] || C(Lr, Or, Ar), Xt[Ar])
				for (var zr in Re)
					if (Lr[zr] !== Re[zr]) try {
						C(Lr, zr, Re[zr])
					} catch (t) {
						Lr[zr] = Re[zr]
					}
		}
	}
	var Rr = "Expected a function",
		_r = NaN,
		Mr = "[object Symbol]",
		Cr = /^\s+|\s+$/g,
		Wr = /^[-+]0x[0-9a-f]+$/i,
		jr = /^0b[01]+$/i,
		Nr = /^0o[0-7]+$/i,
		Ir = parseInt,
		Br = "object" == typeof t && t && t.Object === Object && t,
		Dr = "object" == typeof self && self && self.Object === Object && self,
		Pr = Br || Dr || Function("return this")(),
		Fr = Object.prototype.toString,
		Vr = Math.max,
		Xr = Math.min,
		Hr = function() {
			return Pr.Date.now()
		};

	function qr(t, e, r) {
		var i, n, o, s, a, c, l = 0,
			u = !1,
			f = !1,
			h = !0;
		if ("function" != typeof t) throw new TypeError(Rr);

		function d(e) {
			var r = i,
				o = n;
			return i = n = void 0, l = e, s = t.apply(o, r)
		}

		function p(t) {
			var r = t - c;
			return void 0 === c || r >= e || r < 0 || f && t - l >= o
		}

		function v() {
			var t = Hr();
			if (p(t)) return g(t);
			a = setTimeout(v, function(t) {
				var r = e - (t - c);
				return f ? Xr(r, o - (t - l)) : r
			}(t))
		}

		function g(t) {
			return a = void 0, h && i ? d(t) : (i = n = void 0, s)
		}

		function b() {
			var t = Hr(),
				r = p(t);
			if (i = arguments, n = this, c = t, r) {
				if (void 0 === a) return function(t) {
					return l = t, a = setTimeout(v, e), u ? d(t) : s
				}(c);
				if (f) return a = setTimeout(v, e), d(c)
			}
			return void 0 === a && (a = setTimeout(v, e)), s
		}
		return e = Yr(e) || 0, $r(r) && (u = !!r.leading, o = (f = "maxWait" in r) ? Vr(Yr(r.maxWait) || 0, e) : o, h = "trailing" in r ? !!r.trailing : h), b.cancel = function() {
			void 0 !== a && clearTimeout(a), l = 0, i = c = n = a = void 0
		}, b.flush = function() {
			return void 0 === a ? s : g(Hr())
		}, b
	}

	function $r(t) {
		var e = typeof t;
		return !!t && ("object" == e || "function" == e)
	}

	function Yr(t) {
		if ("number" == typeof t) return t;
		if (function(t) {
				return "symbol" == typeof t || function(t) {
					return !!t && "object" == typeof t
				}(t) && Fr.call(t) == Mr
			}(t)) return _r;
		if ($r(t)) {
			var e = "function" == typeof t.valueOf ? t.valueOf() : t;
			t = $r(e) ? e + "" : e
		}
		if ("string" != typeof t) return 0 === t ? t : +t;
		t = t.replace(Cr, "");
		var r = jr.test(t);
		return r || Nr.test(t) ? Ir(t.slice(2), r ? 2 : 8) : Wr.test(t) ? _r : +t
	}
	var Gr = function(t, e, r) {
			var i = !0,
				n = !0;
			if ("function" != typeof t) throw new TypeError(Rr);
			return $r(r) && (i = "leading" in r ? !!r.leading : i, n = "trailing" in r ? !!r.trailing : n), qr(t, e, {
				leading: i,
				maxWait: e,
				trailing: n
			})
		},
		Ur = "Expected a function",
		Qr = NaN,
		Kr = "[object Symbol]",
		Jr = /^\s+|\s+$/g,
		Zr = /^[-+]0x[0-9a-f]+$/i,
		ti = /^0b[01]+$/i,
		ei = /^0o[0-7]+$/i,
		ri = parseInt,
		ii = "object" == typeof t && t && t.Object === Object && t,
		ni = "object" == typeof self && self && self.Object === Object && self,
		oi = ii || ni || Function("return this")(),
		si = Object.prototype.toString,
		ai = Math.max,
		ci = Math.min,
		li = function() {
			return oi.Date.now()
		};

	function ui(t) {
		var e = typeof t;
		return !!t && ("object" == e || "function" == e)
	}

	function fi(t) {
		if ("number" == typeof t) return t;
		if (function(t) {
				return "symbol" == typeof t || function(t) {
					return !!t && "object" == typeof t
				}(t) && si.call(t) == Kr
			}(t)) return Qr;
		if (ui(t)) {
			var e = "function" == typeof t.valueOf ? t.valueOf() : t;
			t = ui(e) ? e + "" : e
		}
		if ("string" != typeof t) return 0 === t ? t : +t;
		t = t.replace(Jr, "");
		var r = ti.test(t);
		return r || ei.test(t) ? ri(t.slice(2), r ? 2 : 8) : Zr.test(t) ? Qr : +t
	}
	var hi = function(t, e, r) {
			var i, n, o, s, a, c, l = 0,
				u = !1,
				f = !1,
				h = !0;
			if ("function" != typeof t) throw new TypeError(Ur);

			function d(e) {
				var r = i,
					o = n;
				return i = n = void 0, l = e, s = t.apply(o, r)
			}

			function p(t) {
				var r = t - c;
				return void 0 === c || r >= e || r < 0 || f && t - l >= o
			}

			function v() {
				var t = li();
				if (p(t)) return g(t);
				a = setTimeout(v, function(t) {
					var r = e - (t - c);
					return f ? ci(r, o - (t - l)) : r
				}(t))
			}

			function g(t) {
				return a = void 0, h && i ? d(t) : (i = n = void 0, s)
			}

			function b() {
				var t = li(),
					r = p(t);
				if (i = arguments, n = this, c = t, r) {
					if (void 0 === a) return function(t) {
						return l = t, a = setTimeout(v, e), u ? d(t) : s
					}(c);
					if (f) return a = setTimeout(v, e), d(c)
				}
				return void 0 === a && (a = setTimeout(v, e)), s
			}
			return e = fi(e) || 0, ui(r) && (u = !!r.leading, o = (f = "maxWait" in r) ? ai(fi(r.maxWait) || 0, e) : o, h = "trailing" in r ? !!r.trailing : h), b.cancel = function() {
				void 0 !== a && clearTimeout(a), l = 0, i = c = n = a = void 0
			}, b.flush = function() {
				return void 0 === a ? s : g(li())
			}, b
		},
		di = "Expected a function",
		pi = "__lodash_hash_undefined__",
		vi = "[object Function]",
		gi = "[object GeneratorFunction]",
		bi = /^\[object .+?Constructor\]$/,
		yi = "object" == typeof t && t && t.Object === Object && t,
		mi = "object" == typeof self && self && self.Object === Object && self,
		xi = yi || mi || Function("return this")();
	var Ei = Array.prototype,
		wi = Function.prototype,
		Si = Object.prototype,
		Oi = xi["__core-js_shared__"],
		ki = function() {
			var t = /[^.]+$/.exec(Oi && Oi.keys && Oi.keys.IE_PROTO || "");
			return t ? "Symbol(src)_1." + t : ""
		}(),
		Ai = wi.toString,
		Ti = Si.hasOwnProperty,
		Li = Si.toString,
		zi = RegExp("^" + Ai.call(Ti).replace(/[\\^$.*+?()[\]{}|]/g, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"),
		Ri = Ei.splice,
		_i = Di(xi, "Map"),
		Mi = Di(Object, "create");

	function Ci(t) {
		var e = -1,
			r = t ? t.length : 0;
		for (this.clear(); ++e < r;) {
			var i = t[e];
			this.set(i[0], i[1])
		}
	}

	function Wi(t) {
		var e = -1,
			r = t ? t.length : 0;
		for (this.clear(); ++e < r;) {
			var i = t[e];
			this.set(i[0], i[1])
		}
	}

	function ji(t) {
		var e = -1,
			r = t ? t.length : 0;
		for (this.clear(); ++e < r;) {
			var i = t[e];
			this.set(i[0], i[1])
		}
	}

	function Ni(t, e) {
		for (var r, i, n = t.length; n--;)
			if ((r = t[n][0]) === (i = e) || r != r && i != i) return n;
		return -1
	}

	function Ii(t) {
		return !(!Fi(t) || (e = t, ki && ki in e)) && (function(t) {
			var e = Fi(t) ? Li.call(t) : "";
			return e == vi || e == gi
		}(t) || function(t) {
			var e = !1;
			if (null != t && "function" != typeof t.toString) try {
				e = !!(t + "")
			} catch (t) {}
			return e
		}(t) ? zi : bi).test(function(t) {
			if (null != t) {
				try {
					return Ai.call(t)
				} catch (t) {}
				try {
					return t + ""
				} catch (t) {}
			}
			return ""
		}(t));
		var e
	}

	function Bi(t, e) {
		var r, i, n = t.__data__;
		return ("string" == (i = typeof(r = e)) || "number" == i || "symbol" == i || "boolean" == i ? "__proto__" !== r : null === r) ? n["string" == typeof e ? "string" : "hash"] : n.map
	}

	function Di(t, e) {
		var r = function(t, e) {
			return null == t ? void 0 : t[e]
		}(t, e);
		return Ii(r) ? r : void 0
	}

	function Pi(t, e) {
		if ("function" != typeof t || e && "function" != typeof e) throw new TypeError(di);
		var r = function() {
			var i = arguments,
				n = e ? e.apply(this, i) : i[0],
				o = r.cache;
			if (o.has(n)) return o.get(n);
			var s = t.apply(this, i);
			return r.cache = o.set(n, s), s
		};
		return r.cache = new(Pi.Cache || ji), r
	}

	function Fi(t) {
		var e = typeof t;
		return !!t && ("object" == e || "function" == e)
	}
	Ci.prototype.clear = function() {
		this.__data__ = Mi ? Mi(null) : {}
	}, Ci.prototype.delete = function(t) {
		return this.has(t) && delete this.__data__[t]
	}, Ci.prototype.get = function(t) {
		var e = this.__data__;
		if (Mi) {
			var r = e[t];
			return r === pi ? void 0 : r
		}
		return Ti.call(e, t) ? e[t] : void 0
	}, Ci.prototype.has = function(t) {
		var e = this.__data__;
		return Mi ? void 0 !== e[t] : Ti.call(e, t)
	}, Ci.prototype.set = function(t, e) {
		return this.__data__[t] = Mi && void 0 === e ? pi : e, this
	}, Wi.prototype.clear = function() {
		this.__data__ = []
	}, Wi.prototype.delete = function(t) {
		var e = this.__data__,
			r = Ni(e, t);
		return !(r < 0) && (r == e.length - 1 ? e.pop() : Ri.call(e, r, 1), !0)
	}, Wi.prototype.get = function(t) {
		var e = this.__data__,
			r = Ni(e, t);
		return r < 0 ? void 0 : e[r][1]
	}, Wi.prototype.has = function(t) {
		return Ni(this.__data__, t) > -1
	}, Wi.prototype.set = function(t, e) {
		var r = this.__data__,
			i = Ni(r, t);
		return i < 0 ? r.push([t, e]) : r[i][1] = e, this
	}, ji.prototype.clear = function() {
		this.__data__ = {
			hash: new Ci,
			map: new(_i || Wi),
			string: new Ci
		}
	}, ji.prototype.delete = function(t) {
		return Bi(this, t).delete(t)
	}, ji.prototype.get = function(t) {
		return Bi(this, t).get(t)
	}, ji.prototype.has = function(t) {
		return Bi(this, t).has(t)
	}, ji.prototype.set = function(t, e) {
		return Bi(this, t).set(t, e), this
	}, Pi.Cache = ji;
	var Vi, Xi = Pi,
		Hi = [],
		qi = "ResizeObserver loop completed with undelivered notifications.";
	! function(t) {
		t.BORDER_BOX = "border-box", t.CONTENT_BOX = "content-box", t.DEVICE_PIXEL_CONTENT_BOX = "device-pixel-content-box"
	}(Vi || (Vi = {}));
	var $i, Yi = function(t) {
			return Object.freeze(t)
		},
		Gi = function(t, e) {
			this.inlineSize = t, this.blockSize = e, Yi(this)
		},
		Ui = function() {
			function t(t, e, r, i) {
				return this.x = t, this.y = e, this.width = r, this.height = i, this.top = this.y, this.left = this.x, this.bottom = this.top + this.height, this.right = this.left + this.width, Yi(this)
			}
			return t.prototype.toJSON = function() {
				var t = this;
				return {
					x: t.x,
					y: t.y,
					top: t.top,
					right: t.right,
					bottom: t.bottom,
					left: t.left,
					width: t.width,
					height: t.height
				}
			}, t.fromRect = function(e) {
				return new t(e.x, e.y, e.width, e.height)
			}, t
		}(),
		Qi = function(t) {
			return t instanceof SVGElement && "getBBox" in t
		},
		Ki = function(t) {
			if (Qi(t)) {
				var e = t.getBBox(),
					r = e.width,
					i = e.height;
				return !r && !i
			}
			var n = t,
				o = n.offsetWidth,
				s = n.offsetHeight;
			return !(o || s || t.getClientRects().length)
		},
		Ji = function(t) {
			var e, r;
			if (t instanceof Element) return !0;
			var i = null === (r = null === (e = t) || void 0 === e ? void 0 : e.ownerDocument) || void 0 === r ? void 0 : r.defaultView;
			return !!(i && t instanceof i.Element)
		},
		Zi = "undefined" != typeof window ? window : {},
		tn = new WeakMap,
		en = /auto|scroll/,
		rn = /^tb|vertical/,
		nn = /msie|trident/i.test(Zi.navigator && Zi.navigator.userAgent),
		on = function(t) {
			return parseFloat(t || "0")
		},
		sn = function(t, e, r) {
			return void 0 === t && (t = 0), void 0 === e && (e = 0), void 0 === r && (r = !1), new Gi((r ? e : t) || 0, (r ? t : e) || 0)
		},
		an = Yi({
			devicePixelContentBoxSize: sn(),
			borderBoxSize: sn(),
			contentBoxSize: sn(),
			contentRect: new Ui(0, 0, 0, 0)
		}),
		cn = function(t, e) {
			if (void 0 === e && (e = !1), tn.has(t) && !e) return tn.get(t);
			if (Ki(t)) return tn.set(t, an), an;
			var r = getComputedStyle(t),
				i = Qi(t) && t.ownerSVGElement && t.getBBox(),
				n = !nn && "border-box" === r.boxSizing,
				o = rn.test(r.writingMode || ""),
				s = !i && en.test(r.overflowY || ""),
				a = !i && en.test(r.overflowX || ""),
				c = i ? 0 : on(r.paddingTop),
				l = i ? 0 : on(r.paddingRight),
				u = i ? 0 : on(r.paddingBottom),
				f = i ? 0 : on(r.paddingLeft),
				h = i ? 0 : on(r.borderTopWidth),
				d = i ? 0 : on(r.borderRightWidth),
				p = i ? 0 : on(r.borderBottomWidth),
				v = f + l,
				g = c + u,
				b = (i ? 0 : on(r.borderLeftWidth)) + d,
				y = h + p,
				m = a ? t.offsetHeight - y - t.clientHeight : 0,
				x = s ? t.offsetWidth - b - t.clientWidth : 0,
				E = n ? v + b : 0,
				w = n ? g + y : 0,
				S = i ? i.width : on(r.width) - E - x,
				O = i ? i.height : on(r.height) - w - m,
				k = S + v + x + b,
				A = O + g + m + y,
				T = Yi({
					devicePixelContentBoxSize: sn(Math.round(S * devicePixelRatio), Math.round(O * devicePixelRatio), o),
					borderBoxSize: sn(k, A, o),
					contentBoxSize: sn(S, O, o),
					contentRect: new Ui(f, c, S, O)
				});
			return tn.set(t, T), T
		},
		ln = function(t, e, r) {
			var i = cn(t, r),
				n = i.borderBoxSize,
				o = i.contentBoxSize,
				s = i.devicePixelContentBoxSize;
			switch (e) {
				case Vi.DEVICE_PIXEL_CONTENT_BOX:
					return s;
				case Vi.BORDER_BOX:
					return n;
				default:
					return o
			}
		},
		un = function(t) {
			var e = cn(t);
			this.target = t, this.contentRect = e.contentRect, this.borderBoxSize = Yi([e.borderBoxSize]), this.contentBoxSize = Yi([e.contentBoxSize]), this.devicePixelContentBoxSize = Yi([e.devicePixelContentBoxSize])
		},
		fn = function(t) {
			if (Ki(t)) return 1 / 0;
			for (var e = 0, r = t.parentNode; r;) e += 1, r = r.parentNode;
			return e
		},
		hn = function() {
			var t = 1 / 0,
				e = [];
			Hi.forEach((function(r) {
				if (0 !== r.activeTargets.length) {
					var i = [];
					r.activeTargets.forEach((function(e) {
						var r = new un(e.target),
							n = fn(e.target);
						i.push(r), e.lastReportedSize = ln(e.target, e.observedBox), n < t && (t = n)
					})), e.push((function() {
						r.callback.call(r.observer, i, r.observer)
					})), r.activeTargets.splice(0, r.activeTargets.length)
				}
			}));
			for (var r = 0, i = e; r < i.length; r++) {
				(0, i[r])()
			}
			return t
		},
		dn = function(t) {
			Hi.forEach((function(e) {
				e.activeTargets.splice(0, e.activeTargets.length), e.skippedTargets.splice(0, e.skippedTargets.length), e.observationTargets.forEach((function(r) {
					r.isActive() && (fn(r.target) > t ? e.activeTargets.push(r) : e.skippedTargets.push(r))
				}))
			}))
		},
		pn = function() {
			var t, e = 0;
			for (dn(e); Hi.some((function(t) {
					return t.activeTargets.length > 0
				}));) e = hn(), dn(e);
			return Hi.some((function(t) {
				return t.skippedTargets.length > 0
			})) && ("function" == typeof ErrorEvent ? t = new ErrorEvent("error", {
				message: qi
			}) : ((t = document.createEvent("Event")).initEvent("error", !1, !1), t.message = qi), window.dispatchEvent(t)), e > 0
		},
		vn = [],
		gn = function(t) {
			if (!$i) {
				var e = 0,
					r = document.createTextNode("");
				new MutationObserver((function() {
					return vn.splice(0).forEach((function(t) {
						return t()
					}))
				})).observe(r, {
					characterData: !0
				}), $i = function() {
					r.textContent = "" + (e ? e-- : e++)
				}
			}
			vn.push(t), $i()
		},
		bn = 0,
		yn = {
			attributes: !0,
			characterData: !0,
			childList: !0,
			subtree: !0
		},
		mn = ["resize", "load", "transitionend", "animationend", "animationstart", "animationiteration", "keyup", "keydown", "mouseup", "mousedown", "mouseover", "mouseout", "blur", "focus"],
		xn = function(t) {
			return void 0 === t && (t = 0), Date.now() + t
		},
		En = !1,
		wn = new(function() {
			function t() {
				var t = this;
				this.stopped = !0, this.listener = function() {
					return t.schedule()
				}
			}
			return t.prototype.run = function(t) {
				var e = this;
				if (void 0 === t && (t = 250), !En) {
					En = !0;
					var r, i = xn(t);
					r = function() {
						var r = !1;
						try {
							r = pn()
						} finally {
							if (En = !1, t = i - xn(), !bn) return;
							r ? e.run(1e3) : t > 0 ? e.run(t) : e.start()
						}
					}, gn((function() {
						requestAnimationFrame(r)
					}))
				}
			}, t.prototype.schedule = function() {
				this.stop(), this.run()
			}, t.prototype.observe = function() {
				var t = this,
					e = function() {
						return t.observer && t.observer.observe(document.body, yn)
					};
				document.body ? e() : Zi.addEventListener("DOMContentLoaded", e)
			}, t.prototype.start = function() {
				var t = this;
				this.stopped && (this.stopped = !1, this.observer = new MutationObserver(this.listener), this.observe(), mn.forEach((function(e) {
					return Zi.addEventListener(e, t.listener, !0)
				})))
			}, t.prototype.stop = function() {
				var t = this;
				this.stopped || (this.observer && this.observer.disconnect(), mn.forEach((function(e) {
					return Zi.removeEventListener(e, t.listener, !0)
				})), this.stopped = !0)
			}, t
		}()),
		Sn = function(t) {
			!bn && t > 0 && wn.start(), !(bn += t) && wn.stop()
		},
		On = function() {
			function t(t, e) {
				this.target = t, this.observedBox = e || Vi.CONTENT_BOX, this.lastReportedSize = {
					inlineSize: 0,
					blockSize: 0
				}
			}
			return t.prototype.isActive = function() {
				var t, e = ln(this.target, this.observedBox, !0);
				return t = this.target, Qi(t) || function(t) {
					switch (t.tagName) {
						case "INPUT":
							if ("image" !== t.type) break;
						case "VIDEO":
						case "AUDIO":
						case "EMBED":
						case "OBJECT":
						case "CANVAS":
						case "IFRAME":
						case "IMG":
							return !0
					}
					return !1
				}(t) || "inline" !== getComputedStyle(t).display || (this.lastReportedSize = e), this.lastReportedSize.inlineSize !== e.inlineSize || this.lastReportedSize.blockSize !== e.blockSize
			}, t
		}(),
		kn = function(t, e) {
			this.activeTargets = [], this.skippedTargets = [], this.observationTargets = [], this.observer = t, this.callback = e
		},
		An = new WeakMap,
		Tn = function(t, e) {
			for (var r = 0; r < t.length; r += 1)
				if (t[r].target === e) return r;
			return -1
		},
		Ln = function() {
			function t() {}
			return t.connect = function(t, e) {
				var r = new kn(t, e);
				An.set(t, r)
			}, t.observe = function(t, e, r) {
				var i = An.get(t),
					n = 0 === i.observationTargets.length;
				Tn(i.observationTargets, e) < 0 && (n && Hi.push(i), i.observationTargets.push(new On(e, r && r.box)), Sn(1), wn.schedule())
			}, t.unobserve = function(t, e) {
				var r = An.get(t),
					i = Tn(r.observationTargets, e),
					n = 1 === r.observationTargets.length;
				i >= 0 && (n && Hi.splice(Hi.indexOf(r), 1), r.observationTargets.splice(i, 1), Sn(-1))
			}, t.disconnect = function(t) {
				var e = this,
					r = An.get(t);
				r.observationTargets.slice().forEach((function(r) {
					return e.unobserve(t, r.target)
				})), r.activeTargets.splice(0, r.activeTargets.length)
			}, t
		}(),
		zn = function() {
			function t(t) {
				if (0 === arguments.length) throw new TypeError("Failed to construct 'ResizeObserver': 1 argument required, but only 0 present.");
				if ("function" != typeof t) throw new TypeError("Failed to construct 'ResizeObserver': The callback provided as parameter 1 is not a function.");
				Ln.connect(this, t)
			}
			return t.prototype.observe = function(t, e) {
				if (0 === arguments.length) throw new TypeError("Failed to execute 'observe' on 'ResizeObserver': 1 argument required, but only 0 present.");
				if (!Ji(t)) throw new TypeError("Failed to execute 'observe' on 'ResizeObserver': parameter 1 is not of type 'Element");
				Ln.observe(this, t, e)
			}, t.prototype.unobserve = function(t) {
				if (0 === arguments.length) throw new TypeError("Failed to execute 'unobserve' on 'ResizeObserver': 1 argument required, but only 0 present.");
				if (!Ji(t)) throw new TypeError("Failed to execute 'unobserve' on 'ResizeObserver': parameter 1 is not of type 'Element");
				Ln.unobserve(this, t)
			}, t.prototype.disconnect = function() {
				Ln.disconnect(this)
			}, t.toString = function() {
				return "function ResizeObserver () { [polyfill code] }"
			}, t
		}(),
		Rn = function(t) {
			return function(e, r, i, n) {
				Tt(r);
				var o = zt(e),
					s = b(o),
					a = st(o.length),
					c = t ? a - 1 : 0,
					l = t ? -1 : 1;
				if (i < 2)
					for (;;) {
						if (c in s) {
							n = s[c], c += l;
							break
						}
						if (c += l, t ? c < 0 : a <= c) throw TypeError("Reduce of empty array with no initial value")
					}
				for (; t ? c >= 0 : a > c; c += l) c in s && (n = r(n, s[c], c, o));
				return n
			}
		},
		_n = {
			left: Rn(!1),
			right: Rn(!0)
		}.left;
	At({
		target: "Array",
		proto: !0,
		forced: Pt("reduce")
	}, {
		reduce: function(t) {
			return _n(this, t, arguments.length, arguments.length > 1 ? arguments[1] : void 0)
		}
	});
	var Mn = M.f,
		Cn = Function.prototype,
		Wn = Cn.toString,
		jn = /^\s*function ([^ (]*)/;
	!l || "name" in Cn || Mn(Cn, "name", {
		configurable: !0,
		get: function() {
			try {
				return Wn.call(this).match(jn)[1]
			} catch (t) {
				return ""
			}
		}
	});
	var Nn, In, Bn = function() {
			var t = R(this),
				e = "";
			return t.global && (e += "g"), t.ignoreCase && (e += "i"), t.multiline && (e += "m"), t.dotAll && (e += "s"), t.unicode && (e += "u"), t.sticky && (e += "y"), e
		},
		Dn = RegExp.prototype.exec,
		Pn = String.prototype.replace,
		Fn = Dn,
		Vn = (Nn = /a/, In = /b*/g, Dn.call(Nn, "a"), Dn.call(In, "a"), 0 !== Nn.lastIndex || 0 !== In.lastIndex),
		Xn = void 0 !== /()??/.exec("")[1];
	(Vn || Xn) && (Fn = function(t) {
		var e, r, i, n, o = this;
		return Xn && (r = new RegExp("^" + o.source + "$(?!\\s)", Bn.call(o))), Vn && (e = o.lastIndex), i = Dn.call(o, t), Vn && i && (o.lastIndex = o.global ? i.index + i[0].length : e), Xn && i && i.length > 1 && Pn.call(i[0], r, (function() {
			for (n = 1; n < arguments.length - 2; n++) void 0 === arguments[n] && (i[n] = void 0)
		})), i
	});
	var Hn = Fn;
	At({
		target: "RegExp",
		proto: !0,
		forced: /./.exec !== Hn
	}, {
		exec: Hn
	});
	var qn = Wt("species"),
		$n = !c((function() {
			var t = /./;
			return t.exec = function() {
				var t = [];
				return t.groups = {
					a: "7"
				}, t
			}, "7" !== "".replace(t, "$<a>")
		})),
		Yn = !c((function() {
			var t = /(?:)/,
				e = t.exec;
			t.exec = function() {
				return e.apply(this, arguments)
			};
			var r = "ab".split(t);
			return 2 !== r.length || "a" !== r[0] || "b" !== r[1]
		})),
		Gn = function(t, e, r, i) {
			var n = Wt(t),
				o = !c((function() {
					var e = {};
					return e[n] = function() {
						return 7
					}, 7 != "" [t](e)
				})),
				s = o && !c((function() {
					var e = !1,
						r = /a/;
					return r.exec = function() {
						return e = !0, null
					}, "split" === t && (r.constructor = {}, r.constructor[qn] = function() {
						return r
					}), r[n](""), !e
				}));
			if (!o || !s || "replace" === t && !$n || "split" === t && !Yn) {
				var a = /./ [n],
					l = r(n, "" [t], (function(t, e, r, i, n) {
						return e.exec === Hn ? o && !n ? {
							done: !0,
							value: a.call(e, r, i)
						} : {
							done: !0,
							value: t.call(r, e, i)
						} : {
							done: !1
						}
					})),
					u = l[0],
					f = l[1];
				J(String.prototype, t, u), J(RegExp.prototype, n, 2 == e ? function(t, e) {
					return f.call(t, this, e)
				} : function(t) {
					return f.call(t, this)
				}), i && C(RegExp.prototype[n], "sham", !0)
			}
		},
		Un = Ue.charAt,
		Qn = function(t, e, r) {
			return e + (r ? Un(t, e).length : 1)
		},
		Kn = function(t, e) {
			var r = t.exec;
			if ("function" == typeof r) {
				var i = r.call(t, e);
				if ("object" != typeof i) throw TypeError("RegExp exec method returned something other than an Object or null");
				return i
			}
			if ("RegExp" !== v(t)) throw TypeError("RegExp#exec called on incompatible receiver");
			return Hn.call(t, e)
		};
	Gn("match", 1, (function(t, e, r) {
		return [function(e) {
			var r = y(this),
				i = null == e ? void 0 : e[t];
			return void 0 !== i ? i.call(e, r) : new RegExp(e)[t](String(r))
		}, function(t) {
			var i = r(e, t, this);
			if (i.done) return i.value;
			var n = R(t),
				o = String(this);
			if (!n.global) return Kn(n, o);
			var s = n.unicode;
			n.lastIndex = 0;
			for (var a, c = [], l = 0; null !== (a = Kn(n, o));) {
				var u = String(a[0]);
				c[l] = u, "" === u && (n.lastIndex = Qn(o, st(n.lastIndex), s)), l++
			}
			return 0 === l ? null : c
		}]
	}));
	var Jn = Math.max,
		Zn = Math.min,
		to = Math.floor,
		eo = /\$([$&'`]|\d\d?|<[^>]*>)/g,
		ro = /\$([$&'`]|\d\d?)/g;
	Gn("replace", 2, (function(t, e, r) {
		return [function(r, i) {
			var n = y(this),
				o = null == r ? void 0 : r[t];
			return void 0 !== o ? o.call(r, n, i) : e.call(String(n), r, i)
		}, function(t, n) {
			var o = r(e, t, this, n);
			if (o.done) return o.value;
			var s = R(t),
				a = String(this),
				c = "function" == typeof n;
			c || (n = String(n));
			var l = s.global;
			if (l) {
				var u = s.unicode;
				s.lastIndex = 0
			}
			for (var f = [];;) {
				var h = Kn(s, a);
				if (null === h) break;
				if (f.push(h), !l) break;
				"" === String(h[0]) && (s.lastIndex = Qn(a, st(s.lastIndex), u))
			}
			for (var d, p = "", v = 0, g = 0; g < f.length; g++) {
				h = f[g];
				for (var b = String(h[0]), y = Jn(Zn(nt(h.index), a.length), 0), m = [], x = 1; x < h.length; x++) m.push(void 0 === (d = h[x]) ? d : String(d));
				var E = h.groups;
				if (c) {
					var w = [b].concat(m, y, a);
					void 0 !== E && w.push(E);
					var S = String(n.apply(void 0, w))
				} else S = i(b, a, y, m, E, n);
				y >= v && (p += a.slice(v, y) + S, v = y + b.length)
			}
			return p + a.slice(v)
		}];

		function i(t, r, i, n, o, s) {
			var a = i + t.length,
				c = n.length,
				l = ro;
			return void 0 !== o && (o = zt(o), l = eo), e.call(s, l, (function(e, s) {
				var l;
				switch (s.charAt(0)) {
					case "$":
						return "$";
					case "&":
						return t;
					case "`":
						return r.slice(0, i);
					case "'":
						return r.slice(a);
					case "<":
						l = o[s.slice(1, -1)];
						break;
					default:
						var u = +s;
						if (0 === u) return e;
						if (u > c) {
							var f = to(u / 10);
							return 0 === f ? e : f <= c ? void 0 === n[f - 1] ? s.charAt(1) : n[f - 1] + s.charAt(1) : e
						}
						l = n[u - 1]
				}
				return void 0 === l ? "" : l
			}))
		}
	}));
	var io = function(t) {
		return Array.prototype.reduce.call(t, (function(t, e) {
			var r = e.name.match(/data-simplebar-(.+)/);
			if (r) {
				var i = r[1].replace(/\W+(.)/g, (function(t, e) {
					return e.toUpperCase()
				}));
				switch (e.value) {
					case "true":
						t[i] = !0;
						break;
					case "false":
						t[i] = !1;
						break;
					case void 0:
						t[i] = !0;
						break;
					default:
						t[i] = e.value
				}
			}
			return t
		}), {})
	};

	function no(t) {
		return t && t.ownerDocument && t.ownerDocument.defaultView ? t.ownerDocument.defaultView : window
	}

	function oo(t) {
		return t && t.ownerDocument ? t.ownerDocument : document
	}
	var so = null,
		ao = null;

	function co(t) {
		if (null === so) {
			var e = oo(t);
			if (void 0 === e) return so = 0;
			var r = e.body,
				i = e.createElement("div");
			i.classList.add("simplebar-hide-scrollbar"), r.appendChild(i);
			var n = i.getBoundingClientRect().right;
			r.removeChild(i), so = n
		}
		return so
	}
	Yt && window.addEventListener("resize", (function() {
		ao !== window.devicePixelRatio && (ao = window.devicePixelRatio, so = null)
	}));
	var lo = function() {
		function t(e, r) {
			var i = this;
			this.onScroll = function() {
				var t = no(i.el);
				i.scrollXTicking || (t.requestAnimationFrame(i.scrollX), i.scrollXTicking = !0), i.scrollYTicking || (t.requestAnimationFrame(i.scrollY), i.scrollYTicking = !0)
			}, this.scrollX = function() {
				i.axis.x.isOverflowing && (i.showScrollbar("x"), i.positionScrollbar("x")), i.scrollXTicking = !1
			}, this.scrollY = function() {
				i.axis.y.isOverflowing && (i.showScrollbar("y"), i.positionScrollbar("y")), i.scrollYTicking = !1
			}, this.onMouseEnter = function() {
				i.showScrollbar("x"), i.showScrollbar("y")
			}, this.onMouseMove = function(t) {
				i.mouseX = t.clientX, i.mouseY = t.clientY, (i.axis.x.isOverflowing || i.axis.x.forceVisible) && i.onMouseMoveForAxis("x"), (i.axis.y.isOverflowing || i.axis.y.forceVisible) && i.onMouseMoveForAxis("y")
			}, this.onMouseLeave = function() {
				i.onMouseMove.cancel(), (i.axis.x.isOverflowing || i.axis.x.forceVisible) && i.onMouseLeaveForAxis("x"), (i.axis.y.isOverflowing || i.axis.y.forceVisible) && i.onMouseLeaveForAxis("y"), i.mouseX = -1, i.mouseY = -1
			}, this.onWindowResize = function() {
				i.scrollbarWidth = i.getScrollbarWidth(), i.hideNativeScrollbar()
			}, this.hideScrollbars = function() {
				i.axis.x.track.rect = i.axis.x.track.el.getBoundingClientRect(), i.axis.y.track.rect = i.axis.y.track.el.getBoundingClientRect(), i.isWithinBounds(i.axis.y.track.rect) || (i.axis.y.scrollbar.el.classList.remove(i.classNames.visible), i.axis.y.isVisible = !1), i.isWithinBounds(i.axis.x.track.rect) || (i.axis.x.scrollbar.el.classList.remove(i.classNames.visible), i.axis.x.isVisible = !1)
			}, this.onPointerEvent = function(t) {
				var e, r;
				i.axis.x.track.rect = i.axis.x.track.el.getBoundingClientRect(), i.axis.y.track.rect = i.axis.y.track.el.getBoundingClientRect(), (i.axis.x.isOverflowing || i.axis.x.forceVisible) && (e = i.isWithinBounds(i.axis.x.track.rect)), (i.axis.y.isOverflowing || i.axis.y.forceVisible) && (r = i.isWithinBounds(i.axis.y.track.rect)), (e || r) && (t.preventDefault(), t.stopPropagation(), "mousedown" === t.type && (e && (i.axis.x.scrollbar.rect = i.axis.x.scrollbar.el.getBoundingClientRect(), i.isWithinBounds(i.axis.x.scrollbar.rect) ? i.onDragStart(t, "x") : i.onTrackClick(t, "x")), r && (i.axis.y.scrollbar.rect = i.axis.y.scrollbar.el.getBoundingClientRect(), i.isWithinBounds(i.axis.y.scrollbar.rect) ? i.onDragStart(t, "y") : i.onTrackClick(t, "y"))))
			}, this.drag = function(e) {
				var r = i.axis[i.draggedAxis].track,
					n = r.rect[i.axis[i.draggedAxis].sizeAttr],
					o = i.axis[i.draggedAxis].scrollbar,
					s = i.contentWrapperEl[i.axis[i.draggedAxis].scrollSizeAttr],
					a = parseInt(i.elStyles[i.axis[i.draggedAxis].sizeAttr], 10);
				e.preventDefault(), e.stopPropagation();
				var c = (("y" === i.draggedAxis ? e.pageY : e.pageX) - r.rect[i.axis[i.draggedAxis].offsetAttr] - i.axis[i.draggedAxis].dragOffset) / (n - o.size) * (s - a);
				"x" === i.draggedAxis && (c = i.isRtl && t.getRtlHelpers().isRtlScrollbarInverted ? c - (n + o.size) : c, c = i.isRtl && t.getRtlHelpers().isRtlScrollingInverted ? -c : c), i.contentWrapperEl[i.axis[i.draggedAxis].scrollOffsetAttr] = c
			}, this.onEndDrag = function(t) {
				var e = oo(i.el),
					r = no(i.el);
				t.preventDefault(), t.stopPropagation(), i.el.classList.remove(i.classNames.dragging), e.removeEventListener("mousemove", i.drag, !0), e.removeEventListener("mouseup", i.onEndDrag, !0), i.removePreventClickId = r.setTimeout((function() {
					e.removeEventListener("click", i.preventClick, !0), e.removeEventListener("dblclick", i.preventClick, !0), i.removePreventClickId = null
				}))
			}, this.preventClick = function(t) {
				t.preventDefault(), t.stopPropagation()
			}, this.el = e, this.minScrollbarWidth = 20, this.options = Object.assign({}, t.defaultOptions, {}, r), this.classNames = Object.assign({}, t.defaultOptions.classNames, {}, this.options.classNames), this.axis = {
				x: {
					scrollOffsetAttr: "scrollLeft",
					sizeAttr: "width",
					scrollSizeAttr: "scrollWidth",
					offsetSizeAttr: "offsetWidth",
					offsetAttr: "left",
					overflowAttr: "overflowX",
					dragOffset: 0,
					isOverflowing: !0,
					isVisible: !1,
					forceVisible: !1,
					track: {},
					scrollbar: {}
				},
				y: {
					scrollOffsetAttr: "scrollTop",
					sizeAttr: "height",
					scrollSizeAttr: "scrollHeight",
					offsetSizeAttr: "offsetHeight",
					offsetAttr: "top",
					overflowAttr: "overflowY",
					dragOffset: 0,
					isOverflowing: !0,
					isVisible: !1,
					forceVisible: !1,
					track: {},
					scrollbar: {}
				}
			}, this.removePreventClickId = null, t.instances.has(this.el) || (this.recalculate = Gr(this.recalculate.bind(this), 64), this.onMouseMove = Gr(this.onMouseMove.bind(this), 64), this.hideScrollbars = hi(this.hideScrollbars.bind(this), this.options.timeout), this.onWindowResize = hi(this.onWindowResize.bind(this), 64, {
				leading: !0
			}), t.getRtlHelpers = Xi(t.getRtlHelpers), this.init())
		}
		t.getRtlHelpers = function() {
			var e = document.createElement("div");
			e.innerHTML = '<div class="hs-dummy-scrollbar-size"><div style="height: 200%; width: 200%; margin: 10px 0;"></div></div>';
			var r = e.firstElementChild;
			document.body.appendChild(r);
			var i = r.firstElementChild;
			r.scrollLeft = 0;
			var n = t.getOffset(r),
				o = t.getOffset(i);
			r.scrollLeft = 999;
			var s = t.getOffset(i);
			return {
				isRtlScrollingInverted: n.left !== o.left && o.left - s.left != 0,
				isRtlScrollbarInverted: n.left !== o.left
			}
		}, t.getOffset = function(t) {
			var e = t.getBoundingClientRect(),
				r = oo(t),
				i = no(t);
			return {
				top: e.top + (i.pageYOffset || r.documentElement.scrollTop),
				left: e.left + (i.pageXOffset || r.documentElement.scrollLeft)
			}
		};
		var e = t.prototype;
		return e.init = function() {
			t.instances.set(this.el, this), Yt && (this.initDOM(), this.setAccessibilityAttributes(), this.scrollbarWidth = this.getScrollbarWidth(), this.recalculate(), this.initListeners())
		}, e.initDOM = function() {
			var t = this;
			if (Array.prototype.filter.call(this.el.children, (function(e) {
					return e.classList.contains(t.classNames.wrapper)
				})).length) this.wrapperEl = this.el.querySelector("." + this.classNames.wrapper), this.contentWrapperEl = this.options.scrollableNode || this.el.querySelector("." + this.classNames.contentWrapper), this.contentEl = this.options.contentNode || this.el.querySelector("." + this.classNames.contentEl), this.offsetEl = this.el.querySelector("." + this.classNames.offset), this.maskEl = this.el.querySelector("." + this.classNames.mask), this.placeholderEl = this.findChild(this.wrapperEl, "." + this.classNames.placeholder), this.heightAutoObserverWrapperEl = this.el.querySelector("." + this.classNames.heightAutoObserverWrapperEl), this.heightAutoObserverEl = this.el.querySelector("." + this.classNames.heightAutoObserverEl), this.axis.x.track.el = this.findChild(this.el, "." + this.classNames.track + "." + this.classNames.horizontal), this.axis.y.track.el = this.findChild(this.el, "." + this.classNames.track + "." + this.classNames.vertical);
			else {
				for (this.wrapperEl = document.createElement("div"), this.contentWrapperEl = document.createElement("div"), this.offsetEl = document.createElement("div"), this.maskEl = document.createElement("div"), this.contentEl = document.createElement("div"), this.placeholderEl = document.createElement("div"), this.heightAutoObserverWrapperEl = document.createElement("div"), this.heightAutoObserverEl = document.createElement("div"), this.wrapperEl.classList.add(this.classNames.wrapper), this.contentWrapperEl.classList.add(this.classNames.contentWrapper), this.offsetEl.classList.add(this.classNames.offset), this.maskEl.classList.add(this.classNames.mask), this.contentEl.classList.add(this.classNames.contentEl), this.placeholderEl.classList.add(this.classNames.placeholder), this.heightAutoObserverWrapperEl.classList.add(this.classNames.heightAutoObserverWrapperEl), this.heightAutoObserverEl.classList.add(this.classNames.heightAutoObserverEl); this.el.firstChild;) this.contentEl.appendChild(this.el.firstChild);
				this.contentWrapperEl.appendChild(this.contentEl), this.offsetEl.appendChild(this.contentWrapperEl), this.maskEl.appendChild(this.offsetEl), this.heightAutoObserverWrapperEl.appendChild(this.heightAutoObserverEl), this.wrapperEl.appendChild(this.heightAutoObserverWrapperEl), this.wrapperEl.appendChild(this.maskEl), this.wrapperEl.appendChild(this.placeholderEl), this.el.appendChild(this.wrapperEl)
			}
			if (!this.axis.x.track.el || !this.axis.y.track.el) {
				var e = document.createElement("div"),
					r = document.createElement("div");
				e.classList.add(this.classNames.track), r.classList.add(this.classNames.scrollbar), e.appendChild(r), this.axis.x.track.el = e.cloneNode(!0), this.axis.x.track.el.classList.add(this.classNames.horizontal), this.axis.y.track.el = e.cloneNode(!0), this.axis.y.track.el.classList.add(this.classNames.vertical), this.el.appendChild(this.axis.x.track.el), this.el.appendChild(this.axis.y.track.el)
			}
			this.axis.x.scrollbar.el = this.axis.x.track.el.querySelector("." + this.classNames.scrollbar), this.axis.y.scrollbar.el = this.axis.y.track.el.querySelector("." + this.classNames.scrollbar), this.options.autoHide || (this.axis.x.scrollbar.el.classList.add(this.classNames.visible), this.axis.y.scrollbar.el.classList.add(this.classNames.visible)), this.el.setAttribute("data-simplebar", "init")
		}, e.setAccessibilityAttributes = function() {
			var t = this.options.ariaLabel || "scrollable content";
			this.contentWrapperEl.setAttribute("tabindex", "0"), this.contentWrapperEl.setAttribute("role", "region"), this.contentWrapperEl.setAttribute("aria-label", t)
		}, e.initListeners = function() {
			var t = this,
				e = no(this.el);
			this.options.autoHide && this.el.addEventListener("mouseenter", this.onMouseEnter), ["mousedown", "click", "dblclick"].forEach((function(e) {
				t.el.addEventListener(e, t.onPointerEvent, !0)
			})), ["touchstart", "touchend", "touchmove"].forEach((function(e) {
				t.el.addEventListener(e, t.onPointerEvent, {
					capture: !0,
					passive: !0
				})
			})), this.el.addEventListener("mousemove", this.onMouseMove), this.el.addEventListener("mouseleave", this.onMouseLeave), this.contentWrapperEl.addEventListener("scroll", this.onScroll), e.addEventListener("resize", this.onWindowResize);
			var r = !1,
				i = e.ResizeObserver || zn;
			this.resizeObserver = new i((function() {
				r && t.recalculate()
			})), this.resizeObserver.observe(this.el), this.resizeObserver.observe(this.contentEl), e.requestAnimationFrame((function() {
				r = !0
			})), this.mutationObserver = new e.MutationObserver(this.recalculate), this.mutationObserver.observe(this.contentEl, {
				childList: !0,
				subtree: !0,
				characterData: !0
			})
		}, e.recalculate = function() {
			var t = no(this.el);
			this.elStyles = t.getComputedStyle(this.el), this.isRtl = "rtl" === this.elStyles.direction;
			var e = this.heightAutoObserverEl.offsetHeight <= 1,
				r = this.heightAutoObserverEl.offsetWidth <= 1,
				i = this.contentEl.offsetWidth,
				n = this.contentWrapperEl.offsetWidth,
				o = this.elStyles.overflowX,
				s = this.elStyles.overflowY;
			this.contentEl.style.padding = this.elStyles.paddingTop + " " + this.elStyles.paddingRight + " " + this.elStyles.paddingBottom + " " + this.elStyles.paddingLeft, this.wrapperEl.style.margin = "-" + this.elStyles.paddingTop + " -" + this.elStyles.paddingRight + " -" + this.elStyles.paddingBottom + " -" + this.elStyles.paddingLeft;
			var a = this.contentEl.scrollHeight,
				c = this.contentEl.scrollWidth;
			this.contentWrapperEl.style.height = e ? "auto" : "100%", this.placeholderEl.style.width = r ? i + "px" : "auto", this.placeholderEl.style.height = a + "px";
			var l = this.contentWrapperEl.offsetHeight;
			this.axis.x.isOverflowing = c > i, this.axis.y.isOverflowing = a > l, this.axis.x.isOverflowing = "hidden" !== o && this.axis.x.isOverflowing, this.axis.y.isOverflowing = "hidden" !== s && this.axis.y.isOverflowing, this.axis.x.forceVisible = "x" === this.options.forceVisible || !0 === this.options.forceVisible, this.axis.y.forceVisible = "y" === this.options.forceVisible || !0 === this.options.forceVisible, this.hideNativeScrollbar();
			var u = this.axis.x.isOverflowing ? this.scrollbarWidth : 0,
				f = this.axis.y.isOverflowing ? this.scrollbarWidth : 0;
			this.axis.x.isOverflowing = this.axis.x.isOverflowing && c > n - f, this.axis.y.isOverflowing = this.axis.y.isOverflowing && a > l - u, this.axis.x.scrollbar.size = this.getScrollbarSize("x"), this.axis.y.scrollbar.size = this.getScrollbarSize("y"), this.axis.x.scrollbar.el.style.width = this.axis.x.scrollbar.size + "px", this.axis.y.scrollbar.el.style.height = this.axis.y.scrollbar.size + "px", this.positionScrollbar("x"), this.positionScrollbar("y"), this.toggleTrackVisibility("x"), this.toggleTrackVisibility("y")
		}, e.getScrollbarSize = function(t) {
			if (void 0 === t && (t = "y"), !this.axis[t].isOverflowing) return 0;
			var e, r = this.contentEl[this.axis[t].scrollSizeAttr],
				i = this.axis[t].track.el[this.axis[t].offsetSizeAttr],
				n = i / r;
			return e = Math.max(~~(n * i), this.options.scrollbarMinSize), this.options.scrollbarMaxSize && (e = Math.min(e, this.options.scrollbarMaxSize)), e
		}, e.positionScrollbar = function(e) {
			if (void 0 === e && (e = "y"), this.axis[e].isOverflowing) {
				var r = this.contentWrapperEl[this.axis[e].scrollSizeAttr],
					i = this.axis[e].track.el[this.axis[e].offsetSizeAttr],
					n = parseInt(this.elStyles[this.axis[e].sizeAttr], 10),
					o = this.axis[e].scrollbar,
					s = this.contentWrapperEl[this.axis[e].scrollOffsetAttr],
					a = (s = "x" === e && this.isRtl && t.getRtlHelpers().isRtlScrollingInverted ? -s : s) / (r - n),
					c = ~~((i - o.size) * a);
				c = "x" === e && this.isRtl && t.getRtlHelpers().isRtlScrollbarInverted ? c + (i - o.size) : c, o.el.style.transform = "x" === e ? "translate3d(" + c + "px, 0, 0)" : "translate3d(0, " + c + "px, 0)"
			}
		}, e.toggleTrackVisibility = function(t) {
			void 0 === t && (t = "y");
			var e = this.axis[t].track.el,
				r = this.axis[t].scrollbar.el;
			this.axis[t].isOverflowing || this.axis[t].forceVisible ? (e.style.visibility = "visible", this.contentWrapperEl.style[this.axis[t].overflowAttr] = "scroll") : (e.style.visibility = "hidden", this.contentWrapperEl.style[this.axis[t].overflowAttr] = "hidden"), this.axis[t].isOverflowing ? r.style.display = "block" : r.style.display = "none"
		}, e.hideNativeScrollbar = function() {
			this.offsetEl.style[this.isRtl ? "left" : "right"] = this.axis.y.isOverflowing || this.axis.y.forceVisible ? "-" + this.scrollbarWidth + "px" : 0, this.offsetEl.style.bottom = this.axis.x.isOverflowing || this.axis.x.forceVisible ? "-" + this.scrollbarWidth + "px" : 0
		}, e.onMouseMoveForAxis = function(t) {
			void 0 === t && (t = "y"), this.axis[t].track.rect = this.axis[t].track.el.getBoundingClientRect(), this.axis[t].scrollbar.rect = this.axis[t].scrollbar.el.getBoundingClientRect(), this.isWithinBounds(this.axis[t].scrollbar.rect) ? this.axis[t].scrollbar.el.classList.add(this.classNames.hover) : this.axis[t].scrollbar.el.classList.remove(this.classNames.hover), this.isWithinBounds(this.axis[t].track.rect) ? (this.showScrollbar(t), this.axis[t].track.el.classList.add(this.classNames.hover)) : this.axis[t].track.el.classList.remove(this.classNames.hover)
		}, e.onMouseLeaveForAxis = function(t) {
			void 0 === t && (t = "y"), this.axis[t].track.el.classList.remove(this.classNames.hover), this.axis[t].scrollbar.el.classList.remove(this.classNames.hover)
		}, e.showScrollbar = function(t) {
			void 0 === t && (t = "y");
			var e = this.axis[t].scrollbar.el;
			this.axis[t].isVisible || (e.classList.add(this.classNames.visible), this.axis[t].isVisible = !0), this.options.autoHide && this.hideScrollbars()
		}, e.onDragStart = function(t, e) {
			void 0 === e && (e = "y");
			var r = oo(this.el),
				i = no(this.el),
				n = this.axis[e].scrollbar,
				o = "y" === e ? t.pageY : t.pageX;
			this.axis[e].dragOffset = o - n.rect[this.axis[e].offsetAttr], this.draggedAxis = e, this.el.classList.add(this.classNames.dragging), r.addEventListener("mousemove", this.drag, !0), r.addEventListener("mouseup", this.onEndDrag, !0), null === this.removePreventClickId ? (r.addEventListener("click", this.preventClick, !0), r.addEventListener("dblclick", this.preventClick, !0)) : (i.clearTimeout(this.removePreventClickId), this.removePreventClickId = null)
		}, e.onTrackClick = function(t, e) {
			var r = this;
			if (void 0 === e && (e = "y"), this.options.clickOnTrack) {
				var i = no(this.el);
				this.axis[e].scrollbar.rect = this.axis[e].scrollbar.el.getBoundingClientRect();
				var n = this.axis[e].scrollbar.rect[this.axis[e].offsetAttr],
					o = parseInt(this.elStyles[this.axis[e].sizeAttr], 10),
					s = this.contentWrapperEl[this.axis[e].scrollOffsetAttr],
					a = ("y" === e ? this.mouseY - n : this.mouseX - n) < 0 ? -1 : 1,
					c = -1 === a ? s - o : s + o;
				! function t() {
					var n, o; - 1 === a ? s > c && (s -= r.options.clickOnTrackSpeed, r.contentWrapperEl.scrollTo(((n = {})[r.axis[e].offsetAttr] = s, n)), i.requestAnimationFrame(t)) : s < c && (s += r.options.clickOnTrackSpeed, r.contentWrapperEl.scrollTo(((o = {})[r.axis[e].offsetAttr] = s, o)), i.requestAnimationFrame(t))
				}()
			}
		}, e.getContentElement = function() {
			return this.contentEl
		}, e.getScrollElement = function() {
			return this.contentWrapperEl
		}, e.getScrollbarWidth = function() {
			try {
				return "none" === getComputedStyle(this.contentWrapperEl, "::-webkit-scrollbar").display || "scrollbarWidth" in document.documentElement.style || "-ms-overflow-style" in document.documentElement.style ? 0 : co(this.el)
			} catch (t) {
				return co(this.el)
			}
		}, e.removeListeners = function() {
			var t = this,
				e = no(this.el);
			this.options.autoHide && this.el.removeEventListener("mouseenter", this.onMouseEnter), ["mousedown", "click", "dblclick"].forEach((function(e) {
				t.el.removeEventListener(e, t.onPointerEvent, !0)
			})), ["touchstart", "touchend", "touchmove"].forEach((function(e) {
				t.el.removeEventListener(e, t.onPointerEvent, {
					capture: !0,
					passive: !0
				})
			})), this.el.removeEventListener("mousemove", this.onMouseMove), this.el.removeEventListener("mouseleave", this.onMouseLeave), this.contentWrapperEl && this.contentWrapperEl.removeEventListener("scroll", this.onScroll), e.removeEventListener("resize", this.onWindowResize), this.mutationObserver && this.mutationObserver.disconnect(), this.resizeObserver && this.resizeObserver.disconnect(), this.recalculate.cancel(), this.onMouseMove.cancel(), this.hideScrollbars.cancel(), this.onWindowResize.cancel()
		}, e.unMount = function() {
			this.removeListeners(), t.instances.delete(this.el)
		}, e.isWithinBounds = function(t) {
			return this.mouseX >= t.left && this.mouseX <= t.left + t.width && this.mouseY >= t.top && this.mouseY <= t.top + t.height
		}, e.findChild = function(t, e) {
			var r = t.matches || t.webkitMatchesSelector || t.mozMatchesSelector || t.msMatchesSelector;
			return Array.prototype.filter.call(t.children, (function(t) {
				return r.call(t, e)
			}))[0]
		}, t
	}();
	return lo.defaultOptions = {
		autoHide: !0,
		forceVisible: !1,
		clickOnTrack: !0,
		clickOnTrackSpeed: 40,
		classNames: {
			contentEl: "simplebar-content",
			contentWrapper: "simplebar-content-wrapper",
			offset: "simplebar-offset",
			mask: "simplebar-mask",
			wrapper: "simplebar-wrapper",
			placeholder: "simplebar-placeholder",
			scrollbar: "simplebar-scrollbar",
			track: "simplebar-track",
			heightAutoObserverWrapperEl: "simplebar-height-auto-observer-wrapper",
			heightAutoObserverEl: "simplebar-height-auto-observer",
			visible: "simplebar-visible",
			horizontal: "simplebar-horizontal",
			vertical: "simplebar-vertical",
			hover: "simplebar-hover",
			dragging: "simplebar-dragging"
		},
		scrollbarMinSize: 25,
		scrollbarMaxSize: 0,
		timeout: 1e3
	}, lo.instances = new WeakMap, lo.initDOMLoadedElements = function() {
		document.removeEventListener("DOMContentLoaded", this.initDOMLoadedElements), window.removeEventListener("load", this.initDOMLoadedElements), Array.prototype.forEach.call(document.querySelectorAll("[data-simplebar]"), (function(t) {
			"init" === t.getAttribute("data-simplebar") || lo.instances.has(t) || new lo(t, io(t.attributes))
		}))
	}, lo.removeObserver = function() {
		this.globalObserver.disconnect()
	}, lo.initHtmlApi = function() {
		this.initDOMLoadedElements = this.initDOMLoadedElements.bind(this), "undefined" != typeof MutationObserver && (this.globalObserver = new MutationObserver(lo.handleMutations), this.globalObserver.observe(document, {
			childList: !0,
			subtree: !0
		})), "complete" === document.readyState || "loading" !== document.readyState && !document.documentElement.doScroll ? window.setTimeout(this.initDOMLoadedElements) : (document.addEventListener("DOMContentLoaded", this.initDOMLoadedElements), window.addEventListener("load", this.initDOMLoadedElements))
	}, lo.handleMutations = function(t) {
		t.forEach((function(t) {
			Array.prototype.forEach.call(t.addedNodes, (function(t) {
				1 === t.nodeType && (t.hasAttribute("data-simplebar") ? !lo.instances.has(t) && document.documentElement.contains(t) && new lo(t, io(t.attributes)) : Array.prototype.forEach.call(t.querySelectorAll("[data-simplebar]"), (function(t) {
					"init" !== t.getAttribute("data-simplebar") && !lo.instances.has(t) && document.documentElement.contains(t) && new lo(t, io(t.attributes))
				})))
			})), Array.prototype.forEach.call(t.removedNodes, (function(t) {
				1 === t.nodeType && ("init" === t.getAttribute("data-simplebar") ? lo.instances.has(t) && !document.documentElement.contains(t) && lo.instances.get(t).unMount() : Array.prototype.forEach.call(t.querySelectorAll('[data-simplebar="init"]'), (function(t) {
					lo.instances.has(t) && !document.documentElement.contains(t) && lo.instances.get(t).unMount()
				})))
			}))
		}))
	}, lo.getOptions = io, Yt && lo.initHtmlApi(), lo
}));
/*!
 * in-view 0.6.1 - Get notified when a DOM element enters or exits the viewport.
 * Copyright (c) 2016 Cam Wiegert <cam@camwiegert.com> - https://camwiegert.github.io/in-view
 * License: MIT
 */
! function(t, e) {
	"object" == typeof exports && "object" == typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define([], e) : "object" == typeof exports ? exports.inView = e() : t.inView = e()
}(this, function() {
	return function(t) {
		function e(r) {
			if (n[r]) return n[r].exports;
			var i = n[r] = {
				exports: {},
				id: r,
				loaded: !1
			};
			return t[r].call(i.exports, i, i.exports, e), i.loaded = !0, i.exports
		}
		var n = {};
		return e.m = t, e.c = n, e.p = "", e(0)
	}([function(t, e, n) {
		"use strict";

		function r(t) {
			return t && t.__esModule ? t : {
				"default": t
			}
		}
		var i = n(2),
			o = r(i);
		t.exports = o["default"]
	}, function(t, e) {
		function n(t) {
			var e = typeof t;
			return null != t && ("object" == e || "function" == e)
		}
		t.exports = n
	}, function(t, e, n) {
		"use strict";

		function r(t) {
			return t && t.__esModule ? t : {
				"default": t
			}
		}
		Object.defineProperty(e, "__esModule", {
			value: !0
		});
		var i = n(9),
			o = r(i),
			u = n(3),
			f = r(u),
			s = n(4),
			c = function() {
				if ("undefined" != typeof window) {
					var t = 100,
						e = ["scroll", "resize", "load"],
						n = {
							history: []
						},
						r = {
							offset: {},
							threshold: 0,
							test: s.inViewport
						},
						i = (0, o["default"])(function() {
							n.history.forEach(function(t) {
								n[t].check()
							})
						}, t);
					e.forEach(function(t) {
						return addEventListener(t, i)
					}), window.MutationObserver && addEventListener("DOMContentLoaded", function() {
						new MutationObserver(i).observe(document.body, {
							attributes: !0,
							childList: !0,
							subtree: !0
						})
					});
					var u = function(t) {
						if ("string" == typeof t) {
							var e = [].slice.call(document.querySelectorAll(t));
							return n.history.indexOf(t) > -1 ? n[t].elements = e : (n[t] = (0, f["default"])(e, r), n.history.push(t)), n[t]
						}
					};
					return u.offset = function(t) {
						if (void 0 === t) return r.offset;
						var e = function(t) {
							return "number" == typeof t
						};
						return ["top", "right", "bottom", "left"].forEach(e(t) ? function(e) {
							return r.offset[e] = t
						} : function(n) {
							return e(t[n]) ? r.offset[n] = t[n] : null
						}), r.offset
					}, u.threshold = function(t) {
						return "number" == typeof t && t >= 0 && t <= 1 ? r.threshold = t : r.threshold
					}, u.test = function(t) {
						return "function" == typeof t ? r.test = t : r.test
					}, u.is = function(t) {
						return r.test(t, r)
					}, u.offset(0), u
				}
			};
		e["default"] = c()
	}, function(t, e) {
		"use strict";

		function n(t, e) {
			if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
		}
		Object.defineProperty(e, "__esModule", {
			value: !0
		});
		var r = function() {
				function t(t, e) {
					for (var n = 0; n < e.length; n++) {
						var r = e[n];
						r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(t, r.key, r)
					}
				}
				return function(e, n, r) {
					return n && t(e.prototype, n), r && t(e, r), e
				}
			}(),
			i = function() {
				function t(e, r) {
					n(this, t), this.options = r, this.elements = e, this.current = [], this.handlers = {
						enter: [],
						exit: []
					}, this.singles = {
						enter: [],
						exit: []
					}
				}
				return r(t, [{
					key: "check",
					value: function() {
						var t = this;
						return this.elements.forEach(function(e) {
							var n = t.options.test(e, t.options),
								r = t.current.indexOf(e),
								i = r > -1,
								o = n && !i,
								u = !n && i;
							o && (t.current.push(e), t.emit("enter", e)), u && (t.current.splice(r, 1), t.emit("exit", e))
						}), this
					}
				}, {
					key: "on",
					value: function(t, e) {
						return this.handlers[t].push(e), this
					}
				}, {
					key: "once",
					value: function(t, e) {
						return this.singles[t].unshift(e), this
					}
				}, {
					key: "emit",
					value: function(t, e) {
						for (; this.singles[t].length;) this.singles[t].pop()(e);
						for (var n = this.handlers[t].length; --n > -1;) this.handlers[t][n](e);
						return this
					}
				}]), t
			}();
		e["default"] = function(t, e) {
			return new i(t, e)
		}
	}, function(t, e) {
		"use strict";

		function n(t, e) {
			var n = t.getBoundingClientRect(),
				r = n.top,
				i = n.right,
				o = n.bottom,
				u = n.left,
				f = n.width,
				s = n.height,
				c = {
					t: o,
					r: window.innerWidth - u,
					b: window.innerHeight - r,
					l: i
				},
				a = {
					x: e.threshold * f,
					y: e.threshold * s
				};
			return c.t > e.offset.top + a.y && c.r > e.offset.right + a.x && c.b > e.offset.bottom + a.y && c.l > e.offset.left + a.x
		}
		Object.defineProperty(e, "__esModule", {
			value: !0
		}), e.inViewport = n
	}, function(t, e) {
		(function(e) {
			var n = "object" == typeof e && e && e.Object === Object && e;
			t.exports = n
		}).call(e, function() {
			return this
		}())
	}, function(t, e, n) {
		var r = n(5),
			i = "object" == typeof self && self && self.Object === Object && self,
			o = r || i || Function("return this")();
		t.exports = o
	}, function(t, e, n) {
		function r(t, e, n) {
			function r(e) {
				var n = x,
					r = m;
				return x = m = void 0, E = e, w = t.apply(r, n)
			}

			function a(t) {
				return E = t, j = setTimeout(h, e), M ? r(t) : w
			}

			function l(t) {
				var n = t - O,
					r = t - E,
					i = e - n;
				return _ ? c(i, g - r) : i
			}

			function d(t) {
				var n = t - O,
					r = t - E;
				return void 0 === O || n >= e || n < 0 || _ && r >= g
			}

			function h() {
				var t = o();
				return d(t) ? p(t) : void(j = setTimeout(h, l(t)))
			}

			function p(t) {
				return j = void 0, T && x ? r(t) : (x = m = void 0, w)
			}

			function v() {
				void 0 !== j && clearTimeout(j), E = 0, x = O = m = j = void 0
			}

			function y() {
				return void 0 === j ? w : p(o())
			}

			function b() {
				var t = o(),
					n = d(t);
				if (x = arguments, m = this, O = t, n) {
					if (void 0 === j) return a(O);
					if (_) return j = setTimeout(h, e), r(O)
				}
				return void 0 === j && (j = setTimeout(h, e)), w
			}
			var x, m, g, w, j, O, E = 0,
				M = !1,
				_ = !1,
				T = !0;
			if ("function" != typeof t) throw new TypeError(f);
			return e = u(e) || 0, i(n) && (M = !!n.leading, _ = "maxWait" in n, g = _ ? s(u(n.maxWait) || 0, e) : g, T = "trailing" in n ? !!n.trailing : T), b.cancel = v, b.flush = y, b
		}
		var i = n(1),
			o = n(8),
			u = n(10),
			f = "Expected a function",
			s = Math.max,
			c = Math.min;
		t.exports = r
	}, function(t, e, n) {
		var r = n(6),
			i = function() {
				return r.Date.now()
			};
		t.exports = i
	}, function(t, e, n) {
		function r(t, e, n) {
			var r = !0,
				f = !0;
			if ("function" != typeof t) throw new TypeError(u);
			return o(n) && (r = "leading" in n ? !!n.leading : r, f = "trailing" in n ? !!n.trailing : f), i(t, e, {
				leading: r,
				maxWait: e,
				trailing: f
			})
		}
		var i = n(7),
			o = n(1),
			u = "Expected a function";
		t.exports = r
	}, function(t, e) {
		function n(t) {
			return t
		}
		t.exports = n
	}])
});

function ImageParallax(elm) {
	let Self = this;
	this.init = () => {
		this.elm = document.querySelector(elm);
		if (!this.elm) {
			return
		}
		const imageUp = document.querySelectorAll('[image-parallax=slideup]');
		const imagedown = document.querySelectorAll('[image-parallax=slidedown]');
		imageUp.forEach(function(e) {
			gsap.to(e, {
				yPercent: -12,
				ease: "none",
				scrollTrigger: {
					trigger: e,
					scrub: true
				},
			});
		});
		imagedown.forEach(function(e) {
			gsap.to(e, {
				yPercent: 12,
				ease: "none",
				scrollTrigger: {
					trigger: e,
					scrub: true
				},
			});
		});
	};
};
document.addEventListener('DOMContentLoaded', () => {
	const run = new ImageParallax('#main-content');
	ScrollTrigger.matchMedia({
		"(min-width: 992px)": function() {
			run.init();
		}
	})
});
! function(n, t) {
	"object" == typeof exports && "undefined" != typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define(t) : n.Splitting = t()
}(this, function() {
	"use strict"
	var u = document,
		l = u.createTextNode.bind(u)

	function d(n, t, e) {
		n.style.setProperty(t, e)
	}

	function f(n, t) {
		return n.appendChild(t)
	}

	function p(n, t, e, r) {
		var i = u.createElement("span")
		return t && (i.className = t), e && (!r && i.setAttribute("data-" + t, e), i.textContent = e), n && f(n, i) || i
	}

	function h(n, t) {
		return n.getAttribute("data-" + t)
	}

	function m(n, t) {
		return n && 0 != n.length ? n.nodeName ? [n] : [].slice.call(n[0].nodeName ? n : (t || u).querySelectorAll(n)) : []
	}

	function o(n) {
		for (var t = []; n--;) t[n] = []
		return t
	}

	function g(n, t) {
		n && n.some(t)
	}

	function c(t) {
		return function(n) {
			return t[n]
		}
	}
	var a = {}

	function n(n, t, e, r) {
		return {
			by: n,
			depends: t,
			key: e,
			split: r
		}
	}

	function e(n) {
		return function t(e, n, r) {
			var i = r.indexOf(e)
			if (-1 == i) r.unshift(e), g(a[e].depends, function(n) {
				t(n, e, r)
			})
			else {
				var u = r.indexOf(n)
				r.splice(i, 1), r.splice(u, 0, e)
			}
			return r
		}(n, 0, []).map(c(a))
	}

	function t(n) {
		a[n.by] = n
	}

	function v(n, r, i, u, o) {
		n.normalize()
		var c = [],
			a = document.createDocumentFragment()
		u && c.push(n.previousSibling)
		var s = []
		return m(n.childNodes).some(function(n) {
			if (!n.tagName || n.hasChildNodes()) {
				if (n.childNodes && n.childNodes.length) return s.push(n), void c.push.apply(c, v(n, r, i, u, o))
				var t = n.wholeText || "",
					e = t.trim()
				e.length && (" " === t[0] && s.push(l(" ")), g(e.split(i), function(n, t) {
					t && o && s.push(p(a, "whitespace", " ", o))
					var e = p(a, r, n)
					c.push(e), s.push(e)
				}), " " === t[t.length - 1] && s.push(l(" ")))
			} else s.push(n)
		}), g(s, function(n) {
			f(a, n)
		}), n.innerHTML = "", f(n, a), c
	}
	var s = 0
	var i = "words",
		r = n(i, s, "word", function(n) {
			return v(n, "word", /\s+/, 0, 1)
		}),
		y = "chars",
		w = n(y, [i], "char", function(n, e, t) {
			var r = []
			return g(t[i], function(n, t) {
				r.push.apply(r, v(n, "char", "", e.whitespace && t))
			}), r
		})

	function b(t) {
		var f = (t = t || {}).key
		return m(t.target || "[data-splitting]").map(function(a) {
			var s = a["ðŸŒ"]
			if (!t.force && s) return s
			s = a["ðŸŒ"] = {
				el: a
			}
			var n = e(t.by || h(a, "splitting") || y),
				l = function(n, t) {
					for (var e in t) n[e] = t[e]
					return n
				}({}, t)
			return g(n, function(n) {
				if (n.split) {
					var t = n.by,
						e = (f ? "-" + f : "") + n.key,
						r = n.split(a, l, s)
					e && (i = a, c = (o = "--" + e) + "-index", g(u = r, function(n, t) {
						Array.isArray(n) ? g(n, function(n) {
							d(n, c, t)
						}) : d(n, c, t)
					}), d(i, o + "-total", u.length)), s[t] = r, a.classList.add(t)
				}
				var i, u, o, c
			}), a.classList.add("splitting"), s
		})
	}

	function N(n, t, e) {
		var r = m(t.matching || n.children, n),
			i = {}
		return g(r, function(n) {
			var t = Math.round(n[e]);
			(i[t] || (i[t] = [])).push(n)
		}), Object.keys(i).map(Number).sort(x).map(c(i))
	}

	function x(n, t) {
		return n - t
	}
	b.html = function(n) {
		var t = (n = n || {}).target = p()
		return t.innerHTML = n.content, b(n), t.outerHTML
	}, b.add = t
	var T = n("lines", [i], "line", function(n, t, e) {
			return N(n, {
				matching: e[i]
			}, "offsetTop")
		}),
		L = n("items", s, "item", function(n, t) {
			return m(t.matching || n.children, n)
		}),
		k = n("rows", s, "row", function(n, t) {
			return N(n, t, "offsetTop")
		}),
		A = n("cols", s, "col", function(n, t) {
			return N(n, t, "offsetLeft")
		}),
		C = n("grid", ["rows", "cols"]),
		M = "layout",
		S = n(M, s, s, function(n, t) {
			var e = t.rows = +(t.rows || h(n, "rows") || 1),
				r = t.columns = +(t.columns || h(n, "columns") || 1)
			if (t.image = t.image || h(n, "image") || n.currentSrc || n.src, t.image) {
				var i = m("img", n)[0]
				t.image = i && (i.currentSrc || i.src)
			}
			t.image && d(n, "background-image", "url(" + t.image + ")")
			for (var u = e * r, o = [], c = p(s, "cell-grid"); u--;) {
				var a = p(c, "cell")
				p(a, "cell-inner"), o.push(a)
			}
			return f(n, c), o
		}),
		H = n("cellRows", [M], "row", function(n, t, e) {
			var r = t.rows,
				i = o(r)
			return g(e[M], function(n, t, e) {
				i[Math.floor(t / (e.length / r))].push(n)
			}), i
		}),
		O = n("cellColumns", [M], "col", function(n, t, e) {
			var r = t.columns,
				i = o(r)
			return g(e[M], function(n, t) {
				i[t % r].push(n)
			}), i
		}),
		j = n("cells", ["cellRows", "cellColumns"], "cell", function(n, t, e) {
			return e[M]
		})
	return t(r), t(w), t(T), t(L), t(k), t(A), t(C), t(S), t(H), t(O), t(j), b
});
/*!
 * GSAP 3.9.1
 * https://greensock.com
 * 
 * @license Copyright 2021, GreenSock. All rights reserved.
 * Subject to the terms at https://greensock.com/standard-license or for Club GreenSock members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
 */
! function(t, e) {
	"object" == typeof exports && "undefined" != typeof module ? e(exports) : "function" == typeof define && define.amd ? define(["exports"], e) : e((t = t || self).window = t.window || {})
}(this, function(e) {
	"use strict";

	function _inheritsLoose(t, e) {
		t.prototype = Object.create(e.prototype), (t.prototype.constructor = t).__proto__ = e
	}

	function _assertThisInitialized(t) {
		if (void 0 === t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
		return t
	}

	function o(t) {
		return "string" == typeof t
	}

	function p(t) {
		return "function" == typeof t
	}

	function q(t) {
		return "number" == typeof t
	}

	function r(t) {
		return void 0 === t
	}

	function s(t) {
		return "object" == typeof t
	}

	function t(t) {
		return !1 !== t
	}

	function u() {
		return "undefined" != typeof window
	}

	function v(t) {
		return p(t) || o(t)
	}

	function M(t) {
		return (h = mt(t, ot)) && oe
	}

	function N(t, e) {
		return console.warn("Invalid property", t, "set to", e, "Missing plugin? gsap.registerPlugin()")
	}

	function O(t, e) {
		return !e && console.warn(t)
	}

	function P(t, e) {
		return t && (ot[t] = e) && h && (h[t] = e) || ot
	}

	function Q() {
		return 0
	}

	function $(t) {
		var e, r, i = t[0];
		if (s(i) || p(i) || (t = [t]), !(e = (i._gsap || {}).harness)) {
			for (r = ct.length; r-- && !ct[r].targetTest(i););
			e = ct[r]
		}
		for (r = t.length; r--;) t[r] && (t[r]._gsap || (t[r]._gsap = new Lt(t[r], e))) || t.splice(r, 1);
		return t
	}

	function _(t) {
		return t._gsap || $(xt(t))[0]._gsap
	}

	function aa(t, e, i) {
		return (i = t[e]) && p(i) ? t[e]() : r(i) && t.getAttribute && t.getAttribute(e) || i
	}

	function ba(t, e) {
		return (t = t.split(",")).forEach(e) || t
	}

	function ca(t) {
		return Math.round(1e5 * t) / 1e5 || 0
	}

	function da(t) {
		return Math.round(1e7 * t) / 1e7 || 0
	}

	function ea(t, e) {
		for (var r = e.length, i = 0; t.indexOf(e[i]) < 0 && ++i < r;);
		return i < r
	}

	function fa() {
		var t, e, r = ht.length,
			i = ht.slice(0);
		for (lt = {}, t = ht.length = 0; t < r; t++)(e = i[t]) && e._lazy && (e.render(e._lazy[0], e._lazy[1], !0)._lazy = 0)
	}

	function ga(t, e, r, i) {
		ht.length && fa(), t.render(e, r, i), ht.length && fa()
	}

	function ha(t) {
		var e = parseFloat(t);
		return (e || 0 === e) && (t + "").match(at).length < 2 ? e : o(t) ? t.trim() : t
	}

	function ia(t) {
		return t
	}

	function ja(t, e) {
		for (var r in e) r in t || (t[r] = e[r]);
		return t
	}

	function ma(t, e) {
		for (var r in e) "__proto__" !== r && "constructor" !== r && "prototype" !== r && (t[r] = s(e[r]) ? ma(t[r] || (t[r] = {}), e[r]) : e[r]);
		return t
	}

	function na(t, e) {
		var r, i = {};
		for (r in t) r in e || (i[r] = t[r]);
		return i
	}

	function oa(e) {
		var r = e.parent || I,
			i = e.keyframes ? function _setKeyframeDefaults(i) {
				return function(t, e) {
					for (var r in e) r in t || "duration" === r && i || "ease" === r || (t[r] = e[r])
				}
			}(W(e.keyframes)) : ja;
		if (t(e.inherit))
			for (; r;) i(e, r.vars.defaults), r = r.parent || r._dp;
		return e
	}

	function ra(t, e, r, i) {
		void 0 === r && (r = "_first"), void 0 === i && (i = "_last");
		var n = e._prev,
			a = e._next;
		n ? n._next = a : t[r] === e && (t[r] = a), a ? a._prev = n : t[i] === e && (t[i] = n), e._next = e._prev = e.parent = null
	}

	function sa(t, e) {
		!t.parent || e && !t.parent.autoRemoveChildren || t.parent.remove(t), t._act = 0
	}

	function ta(t, e) {
		if (t && (!e || e._end > t._dur || e._start < 0))
			for (var r = t; r;) r._dirty = 1, r = r.parent;
		return t
	}

	function wa(t) {
		return t._repeat ? gt(t._tTime, t = t.duration() + t._rDelay) * t : 0
	}

	function ya(t, e) {
		return (t - e._start) * e._ts + (0 <= e._ts ? 0 : e._dirty ? e.totalDuration() : e._tDur)
	}

	function za(t) {
		return t._end = da(t._start + (t._tDur / Math.abs(t._ts || t._rts || X) || 0))
	}

	function Aa(t, e) {
		var r = t._dp;
		return r && r.smoothChildTiming && t._ts && (t._start = da(r._time - (0 < t._ts ? e / t._ts : ((t._dirty ? t.totalDuration() : t._tDur) - e) / -t._ts)), za(t), r._dirty || ta(r, t)), t
	}

	function Ba(t, e) {
		var r;
		if ((e._time || e._initted && !e._dur) && (r = ya(t.rawTime(), e), (!e._dur || Tt(0, e.totalDuration(), r) - e._tTime > X) && e.render(r, !0)), ta(t, e)._dp && t._initted && t._time >= t._dur && t._ts) {
			if (t._dur < t.duration())
				for (r = t; r._dp;) 0 <= r.rawTime() && r.totalTime(r._tTime), r = r._dp;
			t._zTime = -X
		}
	}

	function Ca(t, e, r, i) {
		return e.parent && sa(e), e._start = da((q(r) ? r : r || t !== I ? bt(t, r, e) : t._time) + e._delay), e._end = da(e._start + (e.totalDuration() / Math.abs(e.timeScale()) || 0)),
			function _addLinkedListItem(t, e, r, i, n) {
				void 0 === r && (r = "_first"), void 0 === i && (i = "_last");
				var a, s = t[i];
				if (n)
					for (a = e[n]; s && s[n] > a;) s = s._prev;
				s ? (e._next = s._next, s._next = e) : (e._next = t[r], t[r] = e), e._next ? e._next._prev = e : t[i] = e, e._prev = s, e.parent = e._dp = t
			}(t, e, "_first", "_last", t._sort ? "_start" : 0), vt(e) || (t._recent = e), i || Ba(t, e), t
	}

	function Da(t, e) {
		return (ot.ScrollTrigger || N("scrollTrigger", e)) && ot.ScrollTrigger.create(e, t)
	}

	function Ea(t, e, r, i) {
		return jt(t, e), t._initted ? !r && t._pt && (t._dur && !1 !== t.vars.lazy || !t._dur && t.vars.lazy) && f !== St.frame ? (ht.push(t), t._lazy = [e, i], 1) : void 0 : 1
	}

	function Ja(t, e, r, i) {
		var n = t._repeat,
			a = da(e) || 0,
			s = t._tTime / t._tDur;
		return s && !i && (t._time *= a / t._dur), t._dur = a, t._tDur = n ? n < 0 ? 1e10 : da(a * (n + 1) + t._rDelay * n) : a, 0 < s && !i ? Aa(t, t._tTime = t._tDur * s) : t.parent && za(t), r || ta(t.parent, t), t
	}

	function Ka(t) {
		return t instanceof Nt ? ta(t) : Ja(t, t._dur)
	}

	function Na(e, r, i) {
		var n, a, s = q(r[1]),
			o = (s ? 2 : 1) + (e < 2 ? 0 : 1),
			u = r[o];
		if (s && (u.duration = r[1]), u.parent = i, e) {
			for (n = u, a = i; a && !("immediateRender" in n);) n = a.vars.defaults || {}, a = t(a.vars.inherit) && a.parent;
			u.immediateRender = t(n.immediateRender), e < 2 ? u.runBackwards = 1 : u.startAt = r[o - 1]
		}
		return new Jt(r[0], u, r[1 + o])
	}

	function Oa(t, e) {
		return t || 0 === t ? e(t) : e
	}

	function Qa(t, e) {
		return o(t) && (e = st.exec(t)) ? t.substr(e.index + e[0].length) : ""
	}

	function Ta(t, e) {
		return t && s(t) && "length" in t && (!e && !t.length || t.length - 1 in t && s(t[0])) && !t.nodeType && t !== i
	}

	function Xa(t) {
		return t.sort(function() {
			return .5 - Math.random()
		})
	}

	function Ya(t) {
		if (p(t)) return t;
		var c = s(t) ? t : {
				each: t
			},
			_ = Rt(c.ease),
			m = c.from || 0,
			g = parseFloat(c.base) || 0,
			v = {},
			e = 0 < m && m < 1,
			y = isNaN(m) || e,
			b = c.axis,
			T = m,
			w = m;
		return o(m) ? T = w = {
				center: .5,
				edges: .5,
				end: 1
			} [m] || 0 : !e && y && (T = m[0], w = m[1]),
			function(t, e, r) {
				var i, n, a, s, o, u, h, l, f, d = (r || c).length,
					p = v[d];
				if (!p) {
					if (!(f = "auto" === c.grid ? 0 : (c.grid || [1, j])[1])) {
						for (h = -j; h < (h = r[f++].getBoundingClientRect().left) && f < d;);
						f--
					}
					for (p = v[d] = [], i = y ? Math.min(f, d) * T - .5 : m % f, n = f === j ? 0 : y ? d * w / f - .5 : m / f | 0, l = j, u = h = 0; u < d; u++) a = u % f - i, s = n - (u / f | 0), p[u] = o = b ? Math.abs("y" === b ? s : a) : G(a * a + s * s), h < o && (h = o), o < l && (l = o);
					"random" === m && Xa(p), p.max = h - l, p.min = l, p.v = d = (parseFloat(c.amount) || parseFloat(c.each) * (d < f ? d - 1 : b ? "y" === b ? d / f : f : Math.max(f, d / f)) || 0) * ("edges" === m ? -1 : 1), p.b = d < 0 ? g - d : g, p.u = Qa(c.amount || c.each) || 0, _ = _ && d < 0 ? Bt(_) : _
				}
				return d = (p[t] - p.min) / p.max || 0, da(p.b + (_ ? _(d) : d) * p.v) + p.u
			}
	}

	function Za(r) {
		var i = Math.pow(10, ((r + "").split(".")[1] || "").length);
		return function(t) {
			var e = Math.round(parseFloat(t) / r) * r * i;
			return (e - e % 1) / i + (q(t) ? 0 : Qa(t))
		}
	}

	function $a(u, t) {
		var h, l, e = W(u);
		return !e && s(u) && (h = e = u.radius || j, u.values ? (u = xt(u.values), (l = !q(u[0])) && (h *= h)) : u = Za(u.increment)), Oa(t, e ? p(u) ? function(t) {
			return l = u(t), Math.abs(l - t) <= h ? l : t
		} : function(t) {
			for (var e, r, i = parseFloat(l ? t.x : t), n = parseFloat(l ? t.y : 0), a = j, s = 0, o = u.length; o--;)(e = l ? (e = u[o].x - i) * e + (r = u[o].y - n) * r : Math.abs(u[o] - i)) < a && (a = e, s = o);
			return s = !h || a <= h ? u[s] : t, l || s === t || q(t) ? s : s + Qa(t)
		} : Za(u))
	}

	function _a(t, e, r, i) {
		return Oa(W(t) ? !e : !0 === r ? !!(r = 0) : !i, function() {
			return W(t) ? t[~~(Math.random() * t.length)] : (r = r || 1e-5) && (i = r < 1 ? Math.pow(10, (r + "").length - 2) : 1) && Math.floor(Math.round((t - r / 2 + Math.random() * (e - t + .99 * r)) / r) * r * i) / i
		})
	}

	function db(e, r, t) {
		return Oa(t, function(t) {
			return e[~~r(t)]
		})
	}

	function gb(t) {
		for (var e, r, i, n, a = 0, s = ""; ~(e = t.indexOf("random(", a));) i = t.indexOf(")", e), n = "[" === t.charAt(e + 7), r = t.substr(e + 7, i - e - 7).match(n ? at : tt), s += t.substr(a, e - a) + _a(n ? r : +r[0], n ? 0 : +r[1], +r[2] || 1e-5), a = i + 1;
		return s + t.substr(a, t.length - a)
	}

	function jb(t, e, r) {
		var i, n, a, s = t.labels,
			o = j;
		for (i in s)(n = s[i] - e) < 0 == !!r && n && o > (n = Math.abs(n)) && (a = i, o = n);
		return a
	}

	function lb(t) {
		return sa(t), t.scrollTrigger && t.scrollTrigger.kill(!1), t.progress() < 1 && Mt(t, "onInterrupt"), t
	}

	function qb(t, e, r) {
		return (6 * (t += t < 0 ? 1 : 1 < t ? -1 : 0) < 1 ? e + (r - e) * t * 6 : t < .5 ? r : 3 * t < 2 ? e + (r - e) * (2 / 3 - t) * 6 : e) * kt + .5 | 0
	}

	function rb(t, e, r) {
		var i, n, a, s, o, u, h, l, f, d, p = t ? q(t) ? [t >> 16, t >> 8 & kt, t & kt] : 0 : Ct.black;
		if (!p) {
			if ("," === t.substr(-1) && (t = t.substr(0, t.length - 1)), Ct[t]) p = Ct[t];
			else if ("#" === t.charAt(0)) {
				if (t.length < 6 && (t = "#" + (i = t.charAt(1)) + i + (n = t.charAt(2)) + n + (a = t.charAt(3)) + a + (5 === t.length ? t.charAt(4) + t.charAt(4) : "")), 9 === t.length) return [(p = parseInt(t.substr(1, 6), 16)) >> 16, p >> 8 & kt, p & kt, parseInt(t.substr(7), 16) / 255];
				p = [(t = parseInt(t.substr(1), 16)) >> 16, t >> 8 & kt, t & kt]
			} else if ("hsl" === t.substr(0, 3))
				if (p = d = t.match(tt), e) {
					if (~t.indexOf("=")) return p = t.match(et), r && p.length < 4 && (p[3] = 1), p
				} else s = +p[0] % 360 / 360, o = p[1] / 100, i = 2 * (u = p[2] / 100) - (n = u <= .5 ? u * (o + 1) : u + o - u * o), 3 < p.length && (p[3] *= 1), p[0] = qb(s + 1 / 3, i, n), p[1] = qb(s, i, n), p[2] = qb(s - 1 / 3, i, n);
			else p = t.match(tt) || Ct.transparent;
			p = p.map(Number)
		}
		return e && !d && (i = p[0] / kt, n = p[1] / kt, a = p[2] / kt, u = ((h = Math.max(i, n, a)) + (l = Math.min(i, n, a))) / 2, h === l ? s = o = 0 : (f = h - l, o = .5 < u ? f / (2 - h - l) : f / (h + l), s = h === i ? (n - a) / f + (n < a ? 6 : 0) : h === n ? (a - i) / f + 2 : (i - n) / f + 4, s *= 60), p[0] = ~~(s + .5), p[1] = ~~(100 * o + .5), p[2] = ~~(100 * u + .5)), r && p.length < 4 && (p[3] = 1), p
	}

	function sb(t) {
		var r = [],
			i = [],
			n = -1;
		return t.split(Pt).forEach(function(t) {
			var e = t.match(rt) || [];
			r.push.apply(r, e), i.push(n += e.length + 1)
		}), r.c = i, r
	}

	function tb(t, e, r) {
		var i, n, a, s, o = "",
			u = (t + o).match(Pt),
			h = e ? "hsla(" : "rgba(",
			l = 0;
		if (!u) return t;
		if (u = u.map(function(t) {
				return (t = rb(t, e, 1)) && h + (e ? t[0] + "," + t[1] + "%," + t[2] + "%," + t[3] : t.join(",")) + ")"
			}), r && (a = sb(t), (i = r.c).join(o) !== a.c.join(o)))
			for (s = (n = t.replace(Pt, "1").split(rt)).length - 1; l < s; l++) o += n[l] + (~i.indexOf(l) ? u.shift() || h + "0,0,0,0)" : (a.length ? a : u.length ? u : r).shift());
		if (!n)
			for (s = (n = t.split(Pt)).length - 1; l < s; l++) o += n[l] + u[l];
		return o + n[s]
	}

	function wb(t) {
		var e, r = t.join(" ");
		if (Pt.lastIndex = 0, Pt.test(r)) return e = At.test(r), t[1] = tb(t[1], e), t[0] = tb(t[0], e, sb(t[1])), !0
	}

	function Fb(t) {
		var e = (t + "").split("("),
			r = zt[e[0]];
		return r && 1 < e.length && r.config ? r.config.apply(null, ~t.indexOf("{") ? [function _parseObjectInString(t) {
			for (var e, r, i, n = {}, a = t.substr(1, t.length - 3).split(":"), s = a[0], o = 1, u = a.length; o < u; o++) r = a[o], e = o !== u - 1 ? r.lastIndexOf(",") : r.length, i = r.substr(0, e), n[s] = isNaN(i) ? i.replace(Et, "").trim() : +i, s = r.substr(e + 1).trim();
			return n
		}(e[1])] : function _valueInParentheses(t) {
			var e = t.indexOf("(") + 1,
				r = t.indexOf(")"),
				i = t.indexOf("(", e);
			return t.substring(e, ~i && i < r ? t.indexOf(")", r + 1) : r)
		}(t).split(",").map(ha)) : zt._CE && Ft.test(t) ? zt._CE("", t) : r
	}

	function Hb(t, e) {
		for (var r, i = t._first; i;) i instanceof Nt ? Hb(i, e) : !i.vars.yoyoEase || i._yoyo && i._repeat || i._yoyo === e || (i.timeline ? Hb(i.timeline, e) : (r = i._ease, i._ease = i._yEase, i._yEase = r, i._yoyo = e)), i = i._next
	}

	function Jb(t, e, r, i) {
		void 0 === r && (r = function easeOut(t) {
			return 1 - e(1 - t)
		}), void 0 === i && (i = function easeInOut(t) {
			return t < .5 ? e(2 * t) / 2 : 1 - e(2 * (1 - t)) / 2
		});
		var n, a = {
			easeIn: e,
			easeOut: r,
			easeInOut: i
		};
		return ba(t, function(t) {
			for (var e in zt[t] = ot[t] = a, zt[n = t.toLowerCase()] = r, a) zt[n + ("easeIn" === e ? ".in" : "easeOut" === e ? ".out" : ".inOut")] = zt[t + "." + e] = a[e]
		}), a
	}

	function Kb(e) {
		return function(t) {
			return t < .5 ? (1 - e(1 - 2 * t)) / 2 : .5 + e(2 * (t - .5)) / 2
		}
	}

	function Lb(r, t, e) {
		function Sl(t) {
			return 1 === t ? 1 : i * Math.pow(2, -10 * t) * K((t - a) * n) + 1
		}
		var i = 1 <= t ? t : 1,
			n = (e || (r ? .3 : .45)) / (t < 1 ? t : 1),
			a = n / U * (Math.asin(1 / i) || 0),
			s = "out" === r ? Sl : "in" === r ? function(t) {
				return 1 - Sl(1 - t)
			} : Kb(Sl);
		return n = U / n, s.config = function(t, e) {
			return Lb(r, t, e)
		}, s
	}

	function Mb(e, r) {
		function $l(t) {
			return t ? --t * t * ((r + 1) * t + r) + 1 : 0
		}
		void 0 === r && (r = 1.70158);
		var t = "out" === e ? $l : "in" === e ? function(t) {
			return 1 - $l(1 - t)
		} : Kb($l);
		return t.config = function(t) {
			return Mb(e, t)
		}, t
	}
	var R, I, i, n, a, h, l, f, d, c, m, g, y, b, T, w, x, k, C, A, S, D, z, F, E, B, Y = {
			autoSleep: 120,
			force3D: "auto",
			nullTargetWarn: 1,
			units: {
				lineHeight: ""
			}
		},
		L = {
			duration: .5,
			overwrite: !1,
			delay: 0
		},
		j = 1e8,
		X = 1 / j,
		U = 2 * Math.PI,
		V = U / 4,
		J = 0,
		G = Math.sqrt,
		Z = Math.cos,
		K = Math.sin,
		H = "function" == typeof ArrayBuffer && ArrayBuffer.isView || function() {},
		W = Array.isArray,
		tt = /(?:-?\.?\d|\.)+/gi,
		et = /[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g,
		rt = /[-+=.]*\d+[.e-]*\d*[a-z%]*/g,
		it = /[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi,
		nt = /[+-]=-?[.\d]+/,
		at = /[^,'"\[\]\s]+/gi,
		st = /[\d.+\-=]+(?:e[-+]\d*)*/i,
		ot = {},
		ut = {},
		ht = [],
		lt = {},
		ft = {},
		dt = {},
		pt = 30,
		ct = [],
		_t = "",
		mt = function _merge(t, e) {
			for (var r in e) t[r] = e[r];
			return t
		},
		gt = function _animationCycle(t, e) {
			var r = Math.floor(t /= e);
			return t && r === t ? r - 1 : r
		},
		vt = function _isFromOrFromStart(t) {
			var e = t.data;
			return "isFromStart" === e || "isStart" === e
		},
		yt = {
			_start: 0,
			endTime: Q,
			totalDuration: Q
		},
		bt = function _parsePosition(t, e, r) {
			var i, n, a, s = t.labels,
				u = t._recent || yt,
				h = t.duration() >= j ? u.endTime(!1) : t._dur;
			return o(e) && (isNaN(e) || e in s) ? (n = e.charAt(0), a = "%" === e.substr(-1), i = e.indexOf("="), "<" === n || ">" === n ? (0 <= i && (e = e.replace(/=/, "")), ("<" === n ? u._start : u.endTime(0 <= u._repeat)) + (parseFloat(e.substr(1)) || 0) * (a ? (i < 0 ? u : r).totalDuration() / 100 : 1)) : i < 0 ? (e in s || (s[e] = h), s[e]) : (n = parseFloat(e.charAt(i - 1) + e.substr(i + 1)), a && r && (n = n / 100 * (W(r) ? r[0] : r).totalDuration()), 1 < i ? _parsePosition(t, e.substr(0, i - 1), r) + n : h + n)) : null == e ? h : +e
		},
		Tt = function _clamp(t, e, r) {
			return r < t ? t : e < r ? e : r
		},
		wt = [].slice,
		xt = function toArray(t, e, r) {
			return !o(t) || r || !n && Dt() ? W(t) ? function _flatten(t, e, r) {
				return void 0 === r && (r = []), t.forEach(function(t) {
					return o(t) && !e || Ta(t, 1) ? r.push.apply(r, xt(t)) : r.push(t)
				}) || r
			}(t, r) : Ta(t) ? wt.call(t, 0) : t ? [t] : [] : wt.call((e || a).querySelectorAll(t), 0)
		},
		Ot = function mapRange(e, t, r, i, n) {
			var a = t - e,
				s = i - r;
			return Oa(n, function(t) {
				return r + ((t - e) / a * s || 0)
			})
		},
		Mt = function _callback(t, e, r) {
			var i, n, a = t.vars,
				s = a[e];
			if (s) return i = a[e + "Params"], n = a.callbackScope || t, r && ht.length && fa(), i ? s.apply(n, i) : s.call(n)
		},
		kt = 255,
		Ct = {
			aqua: [0, kt, kt],
			lime: [0, kt, 0],
			silver: [192, 192, 192],
			black: [0, 0, 0],
			maroon: [128, 0, 0],
			teal: [0, 128, 128],
			blue: [0, 0, kt],
			navy: [0, 0, 128],
			white: [kt, kt, kt],
			olive: [128, 128, 0],
			yellow: [kt, kt, 0],
			orange: [kt, 165, 0],
			gray: [128, 128, 128],
			purple: [128, 0, 128],
			green: [0, 128, 0],
			red: [kt, 0, 0],
			pink: [kt, 192, 203],
			cyan: [0, kt, kt],
			transparent: [kt, kt, kt, 0]
		},
		Pt = function() {
			var t, e = "(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b";
			for (t in Ct) e += "|" + t + "\\b";
			return new RegExp(e + ")", "gi")
		}(),
		At = /hsl[a]?\(/,
		St = (x = Date.now, k = 500, C = 33, A = x(), S = A, z = D = 1e3 / 240, b = {
			time: 0,
			frame: 0,
			tick: function tick() {
				Ok(!0)
			},
			deltaRatio: function deltaRatio(t) {
				return T / (1e3 / (t || 60))
			},
			wake: function wake() {
				l && (!n && u() && (i = n = window, a = i.document || {}, ot.gsap = oe, (i.gsapVersions || (i.gsapVersions = [])).push(oe.version), M(h || i.GreenSockGlobals || !i.gsap && i || {}), y = i.requestAnimationFrame), m && b.sleep(), g = y || function(t) {
					return setTimeout(t, z - 1e3 * b.time + 1 | 0)
				}, c = 1, Ok(2))
			},
			sleep: function sleep() {
				(y ? i.cancelAnimationFrame : clearTimeout)(m), c = 0, g = Q
			},
			lagSmoothing: function lagSmoothing(t, e) {
				k = t || 1e8, C = Math.min(e, k, 0)
			},
			fps: function fps(t) {
				D = 1e3 / (t || 240), z = 1e3 * b.time + D
			},
			add: function add(t) {
				F.indexOf(t) < 0 && F.push(t), Dt()
			},
			remove: function remove(t, e) {
				~(e = F.indexOf(t)) && F.splice(e, 1) && e <= w && w--
			},
			_listeners: F = []
		}),
		Dt = function _wake() {
			return !c && St.wake()
		},
		zt = {},
		Ft = /^[\d.\-M][\d.\-,\s]/,
		Et = /["']/g,
		Bt = function _invertEase(e) {
			return function(t) {
				return 1 - e(1 - t)
			}
		},
		Rt = function _parseEase(t, e) {
			return t && (p(t) ? t : zt[t] || Fb(t)) || e
		};

	function Ok(t) {
		var e, r, i, n, a = x() - S,
			s = !0 === t;
		if (k < a && (A += a - C), (0 < (e = (i = (S += a) - A) - z) || s) && (n = ++b.frame, T = i - 1e3 * b.time, b.time = i /= 1e3, z += e + (D <= e ? 4 : D - e), r = 1), s || (m = g(Ok)), r)
			for (w = 0; w < F.length; w++) F[w](i, T, n, t)
	}

	function pm(t) {
		return t < B ? E * t * t : t < .7272727272727273 ? E * Math.pow(t - 1.5 / 2.75, 2) + .75 : t < .9090909090909092 ? E * (t -= 2.25 / 2.75) * t + .9375 : E * Math.pow(t - 2.625 / 2.75, 2) + .984375
	}
	ba("Linear,Quad,Cubic,Quart,Quint,Strong", function(t, e) {
		var r = e < 5 ? e + 1 : e;
		Jb(t + ",Power" + (r - 1), e ? function(t) {
			return Math.pow(t, r)
		} : function(t) {
			return t
		}, function(t) {
			return 1 - Math.pow(1 - t, r)
		}, function(t) {
			return t < .5 ? Math.pow(2 * t, r) / 2 : 1 - Math.pow(2 * (1 - t), r) / 2
		})
	}), zt.Linear.easeNone = zt.none = zt.Linear.easeIn, Jb("Elastic", Lb("in"), Lb("out"), Lb()), E = 7.5625, B = 1 / 2.75, Jb("Bounce", function(t) {
		return 1 - pm(1 - t)
	}, pm), Jb("Expo", function(t) {
		return t ? Math.pow(2, 10 * (t - 1)) : 0
	}), Jb("Circ", function(t) {
		return -(G(1 - t * t) - 1)
	}), Jb("Sine", function(t) {
		return 1 === t ? 1 : 1 - Z(t * V)
	}), Jb("Back", Mb("in"), Mb("out"), Mb()), zt.SteppedEase = zt.steps = ot.SteppedEase = {
		config: function config(t, e) {
			void 0 === t && (t = 1);
			var r = 1 / t,
				i = t + (e ? 0 : 1),
				n = e ? 1 : 0;
			return function(t) {
				return ((i * Tt(0, .99999999, t) | 0) + n) * r
			}
		}
	}, L.ease = zt["quad.out"], ba("onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt", function(t) {
		return _t += t + "," + t + "Params,"
	});
	var It, Lt = function GSCache(t, e) {
			this.id = J++, (t._gsap = this).target = t, this.harness = e, this.get = e ? e.get : aa, this.set = e ? e.getSetter : Kt
		},
		qt = ((It = Animation.prototype).delay = function delay(t) {
			return t || 0 === t ? (this.parent && this.parent.smoothChildTiming && this.startTime(this._start + t - this._delay), this._delay = t, this) : this._delay
		}, It.duration = function duration(t) {
			return arguments.length ? this.totalDuration(0 < this._repeat ? t + (t + this._rDelay) * this._repeat : t) : this.totalDuration() && this._dur
		}, It.totalDuration = function totalDuration(t) {
			return arguments.length ? (this._dirty = 0, Ja(this, this._repeat < 0 ? t : (t - this._repeat * this._rDelay) / (this._repeat + 1))) : this._tDur
		}, It.totalTime = function totalTime(t, e) {
			if (Dt(), !arguments.length) return this._tTime;
			var r = this._dp;
			if (r && r.smoothChildTiming && this._ts) {
				for (Aa(this, t), !r._dp || r.parent || Ba(r, this); r && r.parent;) r.parent._time !== r._start + (0 <= r._ts ? r._tTime / r._ts : (r.totalDuration() - r._tTime) / -r._ts) && r.totalTime(r._tTime, !0), r = r.parent;
				!this.parent && this._dp.autoRemoveChildren && (0 < this._ts && t < this._tDur || this._ts < 0 && 0 < t || !this._tDur && !t) && Ca(this._dp, this, this._start - this._delay)
			}
			return (this._tTime !== t || !this._dur && !e || this._initted && Math.abs(this._zTime) === X || !t && !this._initted && (this.add || this._ptLookup)) && (this._ts || (this._pTime = t), ga(this, t, e)), this
		}, It.time = function time(t, e) {
			return arguments.length ? this.totalTime(Math.min(this.totalDuration(), t + wa(this)) % (this._dur + this._rDelay) || (t ? this._dur : 0), e) : this._time
		}, It.totalProgress = function totalProgress(t, e) {
			return arguments.length ? this.totalTime(this.totalDuration() * t, e) : this.totalDuration() ? Math.min(1, this._tTime / this._tDur) : this.ratio
		}, It.progress = function progress(t, e) {
			return arguments.length ? this.totalTime(this.duration() * (!this._yoyo || 1 & this.iteration() ? t : 1 - t) + wa(this), e) : this.duration() ? Math.min(1, this._time / this._dur) : this.ratio
		}, It.iteration = function iteration(t, e) {
			var r = this.duration() + this._rDelay;
			return arguments.length ? this.totalTime(this._time + (t - 1) * r, e) : this._repeat ? gt(this._tTime, r) + 1 : 1
		}, It.timeScale = function timeScale(t) {
			if (!arguments.length) return this._rts === -X ? 0 : this._rts;
			if (this._rts === t) return this;
			var e = this.parent && this._ts ? ya(this.parent._time, this) : this._tTime;
			return this._rts = +t || 0, this._ts = this._ps || t === -X ? 0 : this._rts,
				function _recacheAncestors(t) {
					for (var e = t.parent; e && e.parent;) e._dirty = 1, e.totalDuration(), e = e.parent
				}(this.totalTime(Tt(-this._delay, this._tDur, e), !0)), za(this), this
		}, It.paused = function paused(t) {
			return arguments.length ? (this._ps !== t && ((this._ps = t) ? (this._pTime = this._tTime || Math.max(-this._delay, this.rawTime()), this._ts = this._act = 0) : (Dt(), this._ts = this._rts, this.totalTime(this.parent && !this.parent.smoothChildTiming ? this.rawTime() : this._tTime || this._pTime, 1 === this.progress() && Math.abs(this._zTime) !== X && (this._tTime -= X)))), this) : this._ps
		}, It.startTime = function startTime(t) {
			if (arguments.length) {
				this._start = t;
				var e = this.parent || this._dp;
				return !e || !e._sort && this.parent || Ca(e, this, t - this._delay), this
			}
			return this._start
		}, It.endTime = function endTime(e) {
			return this._start + (t(e) ? this.totalDuration() : this.duration()) / Math.abs(this._ts || 1)
		}, It.rawTime = function rawTime(t) {
			var e = this.parent || this._dp;
			return e ? t && (!this._ts || this._repeat && this._time && this.totalProgress() < 1) ? this._tTime % (this._dur + this._rDelay) : this._ts ? ya(e.rawTime(t), this) : this._tTime : this._tTime
		}, It.globalTime = function globalTime(t) {
			for (var e = this, r = arguments.length ? t : e.rawTime(); e;) r = e._start + r / (e._ts || 1), e = e._dp;
			return r
		}, It.repeat = function repeat(t) {
			return arguments.length ? (this._repeat = t === 1 / 0 ? -2 : t, Ka(this)) : -2 === this._repeat ? 1 / 0 : this._repeat
		}, It.repeatDelay = function repeatDelay(t) {
			if (arguments.length) {
				var e = this._time;
				return this._rDelay = t, Ka(this), e ? this.time(e) : this
			}
			return this._rDelay
		}, It.yoyo = function yoyo(t) {
			return arguments.length ? (this._yoyo = t, this) : this._yoyo
		}, It.seek = function seek(e, r) {
			return this.totalTime(bt(this, e), t(r))
		}, It.restart = function restart(e, r) {
			return this.play().totalTime(e ? -this._delay : 0, t(r))
		}, It.play = function play(t, e) {
			return null != t && this.seek(t, e), this.reversed(!1).paused(!1)
		}, It.reverse = function reverse(t, e) {
			return null != t && this.seek(t || this.totalDuration(), e), this.reversed(!0).paused(!1)
		}, It.pause = function pause(t, e) {
			return null != t && this.seek(t, e), this.paused(!0)
		}, It.resume = function resume() {
			return this.paused(!1)
		}, It.reversed = function reversed(t) {
			return arguments.length ? (!!t !== this.reversed() && this.timeScale(-this._rts || (t ? -X : 0)), this) : this._rts < 0
		}, It.invalidate = function invalidate() {
			return this._initted = this._act = 0, this._zTime = -X, this
		}, It.isActive = function isActive() {
			var t, e = this.parent || this._dp,
				r = this._start;
			return !(e && !(this._ts && this._initted && e.isActive() && (t = e.rawTime(!0)) >= r && t < this.endTime(!0) - X))
		}, It.eventCallback = function eventCallback(t, e, r) {
			var i = this.vars;
			return 1 < arguments.length ? (e ? (i[t] = e, r && (i[t + "Params"] = r), "onUpdate" === t && (this._onUpdate = e)) : delete i[t], this) : i[t]
		}, It.then = function then(t) {
			var i = this;
			return new Promise(function(e) {
				function Gn() {
					var t = i.then;
					i.then = null, p(r) && (r = r(i)) && (r.then || r === i) && (i.then = t), e(r), i.then = t
				}
				var r = p(t) ? t : ia;
				i._initted && 1 === i.totalProgress() && 0 <= i._ts || !i._tTime && i._ts < 0 ? Gn() : i._prom = Gn
			})
		}, It.kill = function kill() {
			lb(this)
		}, Animation);

	function Animation(t) {
		this.vars = t, this._delay = +t.delay || 0, (this._repeat = t.repeat === 1 / 0 ? -2 : t.repeat || 0) && (this._rDelay = t.repeatDelay || 0, this._yoyo = !!t.yoyo || !!t.yoyoEase), this._ts = 1, Ja(this, +t.duration, 1, 1), this.data = t.data, c || St.wake()
	}
	ja(qt.prototype, {
		_time: 0,
		_start: 0,
		_end: 0,
		_tTime: 0,
		_tDur: 0,
		_dirty: 0,
		_repeat: 0,
		_yoyo: !1,
		parent: null,
		_initted: !1,
		_rDelay: 0,
		_ts: 1,
		_dp: 0,
		ratio: 0,
		_zTime: -X,
		_prom: 0,
		_ps: !1,
		_rts: 1
	});
	var Nt = function(n) {
		function Timeline(e, r) {
			var i;
			return void 0 === e && (e = {}), (i = n.call(this, e) || this).labels = {}, i.smoothChildTiming = !!e.smoothChildTiming, i.autoRemoveChildren = !!e.autoRemoveChildren, i._sort = t(e.sortChildren), I && Ca(e.parent || I, _assertThisInitialized(i), r), e.reversed && i.reverse(), e.paused && i.paused(!0), e.scrollTrigger && Da(_assertThisInitialized(i), e.scrollTrigger), i
		}
		_inheritsLoose(Timeline, n);
		var e = Timeline.prototype;
		return e.to = function to(t, e, r) {
			return Na(0, arguments, this), this
		}, e.from = function from(t, e, r) {
			return Na(1, arguments, this), this
		}, e.fromTo = function fromTo(t, e, r, i) {
			return Na(2, arguments, this), this
		}, e.set = function set(t, e, r) {
			return e.duration = 0, e.parent = this, oa(e).repeatDelay || (e.repeat = 0), e.immediateRender = !!e.immediateRender, new Jt(t, e, bt(this, r), 1), this
		}, e.call = function call(t, e, r) {
			return Ca(this, Jt.delayedCall(0, t, e), r)
		}, e.staggerTo = function staggerTo(t, e, r, i, n, a, s) {
			return r.duration = e, r.stagger = r.stagger || i, r.onComplete = a, r.onCompleteParams = s, r.parent = this, new Jt(t, r, bt(this, n)), this
		}, e.staggerFrom = function staggerFrom(e, r, i, n, a, s, o) {
			return i.runBackwards = 1, oa(i).immediateRender = t(i.immediateRender), this.staggerTo(e, r, i, n, a, s, o)
		}, e.staggerFromTo = function staggerFromTo(e, r, i, n, a, s, o, u) {
			return n.startAt = i, oa(n).immediateRender = t(n.immediateRender), this.staggerTo(e, r, n, a, s, o, u)
		}, e.render = function render(t, e, r) {
			var i, n, a, s, o, u, h, l, f, d, p, c, _ = this._time,
				m = this._dirty ? this.totalDuration() : this._tDur,
				g = this._dur,
				v = t <= 0 ? 0 : da(t),
				y = this._zTime < 0 != t < 0 && (this._initted || !g);
			if (this !== I && m < v && 0 <= t && (v = m), v !== this._tTime || r || y) {
				if (_ !== this._time && g && (v += this._time - _, t += this._time - _), i = v, f = this._start, u = !(l = this._ts), y && (g || (_ = this._zTime), !t && e || (this._zTime = t)), this._repeat) {
					if (p = this._yoyo, o = g + this._rDelay, this._repeat < -1 && t < 0) return this.totalTime(100 * o + t, e, r);
					if (i = da(v % o), v === m ? (s = this._repeat, i = g) : ((s = ~~(v / o)) && s === v / o && (i = g, s--), g < i && (i = g)), d = gt(this._tTime, o), !_ && this._tTime && d !== s && (d = s), p && 1 & s && (i = g - i, c = 1), s !== d && !this._lock) {
						var b = p && 1 & d,
							T = b === (p && 1 & s);
						if (s < d && (b = !b), _ = b ? 0 : g, this._lock = 1, this.render(_ || (c ? 0 : da(s * o)), e, !g)._lock = 0, this._tTime = v, !e && this.parent && Mt(this, "onRepeat"), this.vars.repeatRefresh && !c && (this.invalidate()._lock = 1), _ && _ !== this._time || u != !this._ts || this.vars.onRepeat && !this.parent && !this._act) return this;
						if (g = this._dur, m = this._tDur, T && (this._lock = 2, _ = b ? g : -1e-4, this.render(_, !0), this.vars.repeatRefresh && !c && this.invalidate()), this._lock = 0, !this._ts && !u) return this;
						Hb(this, c)
					}
				}
				if (this._hasPause && !this._forcing && this._lock < 2 && (h = function _findNextPauseTween(t, e, r) {
						var i;
						if (e < r)
							for (i = t._first; i && i._start <= r;) {
								if ("isPause" === i.data && i._start > e) return i;
								i = i._next
							} else
								for (i = t._last; i && i._start >= r;) {
									if ("isPause" === i.data && i._start < e) return i;
									i = i._prev
								}
					}(this, da(_), da(i))) && (v -= i - (i = h._start)), this._tTime = v, this._time = i, this._act = !l, this._initted || (this._onUpdate = this.vars.onUpdate, this._initted = 1, this._zTime = t, _ = 0), !_ && i && !e && (Mt(this, "onStart"), this._tTime !== v)) return this;
				if (_ <= i && 0 <= t)
					for (n = this._first; n;) {
						if (a = n._next, (n._act || i >= n._start) && n._ts && h !== n) {
							if (n.parent !== this) return this.render(t, e, r);
							if (n.render(0 < n._ts ? (i - n._start) * n._ts : (n._dirty ? n.totalDuration() : n._tDur) + (i - n._start) * n._ts, e, r), i !== this._time || !this._ts && !u) {
								h = 0, a && (v += this._zTime = -X);
								break
							}
						}
						n = a
					} else {
						n = this._last;
						for (var w = t < 0 ? t : i; n;) {
							if (a = n._prev, (n._act || w <= n._end) && n._ts && h !== n) {
								if (n.parent !== this) return this.render(t, e, r);
								if (n.render(0 < n._ts ? (w - n._start) * n._ts : (n._dirty ? n.totalDuration() : n._tDur) + (w - n._start) * n._ts, e, r), i !== this._time || !this._ts && !u) {
									h = 0, a && (v += this._zTime = w ? -X : X);
									break
								}
							}
							n = a
						}
					}
				if (h && !e && (this.pause(), h.render(_ <= i ? 0 : -X)._zTime = _ <= i ? 1 : -1, this._ts)) return this._start = f, za(this), this.render(t, e, r);
				this._onUpdate && !e && Mt(this, "onUpdate", !0), (v === m && m >= this.totalDuration() || !v && _) && (f !== this._start && Math.abs(l) === Math.abs(this._ts) || this._lock || (!t && g || !(v === m && 0 < this._ts || !v && this._ts < 0) || sa(this, 1), e || t < 0 && !_ || !v && !_ && m || (Mt(this, v === m && 0 <= t ? "onComplete" : "onReverseComplete", !0), !this._prom || v < m && 0 < this.timeScale() || this._prom())))
			}
			return this
		}, e.add = function add(t, e) {
			var r = this;
			if (q(e) || (e = bt(this, e, t)), !(t instanceof qt)) {
				if (W(t)) return t.forEach(function(t) {
					return r.add(t, e)
				}), this;
				if (o(t)) return this.addLabel(t, e);
				if (!p(t)) return this;
				t = Jt.delayedCall(0, t)
			}
			return this !== t ? Ca(this, t, e) : this
		}, e.getChildren = function getChildren(t, e, r, i) {
			void 0 === t && (t = !0), void 0 === e && (e = !0), void 0 === r && (r = !0), void 0 === i && (i = -j);
			for (var n = [], a = this._first; a;) a._start >= i && (a instanceof Jt ? e && n.push(a) : (r && n.push(a), t && n.push.apply(n, a.getChildren(!0, e, r)))), a = a._next;
			return n
		}, e.getById = function getById(t) {
			for (var e = this.getChildren(1, 1, 1), r = e.length; r--;)
				if (e[r].vars.id === t) return e[r]
		}, e.remove = function remove(t) {
			return o(t) ? this.removeLabel(t) : p(t) ? this.killTweensOf(t) : (ra(this, t), t === this._recent && (this._recent = this._last), ta(this))
		}, e.totalTime = function totalTime(t, e) {
			return arguments.length ? (this._forcing = 1, !this._dp && this._ts && (this._start = da(St.time - (0 < this._ts ? t / this._ts : (this.totalDuration() - t) / -this._ts))), n.prototype.totalTime.call(this, t, e), this._forcing = 0, this) : this._tTime
		}, e.addLabel = function addLabel(t, e) {
			return this.labels[t] = bt(this, e), this
		}, e.removeLabel = function removeLabel(t) {
			return delete this.labels[t], this
		}, e.addPause = function addPause(t, e, r) {
			var i = Jt.delayedCall(0, e || Q, r);
			return i.data = "isPause", this._hasPause = 1, Ca(this, i, bt(this, t))
		}, e.removePause = function removePause(t) {
			var e = this._first;
			for (t = bt(this, t); e;) e._start === t && "isPause" === e.data && sa(e), e = e._next
		}, e.killTweensOf = function killTweensOf(t, e, r) {
			for (var i = this.getTweensOf(t, r), n = i.length; n--;) Qt !== i[n] && i[n].kill(t, e);
			return this
		}, e.getTweensOf = function getTweensOf(t, e) {
			for (var r, i = [], n = xt(t), a = this._first, s = q(e); a;) a instanceof Jt ? ea(a._targets, n) && (s ? (!Qt || a._initted && a._ts) && a.globalTime(0) <= e && a.globalTime(a.totalDuration()) > e : !e || a.isActive()) && i.push(a) : (r = a.getTweensOf(n, e)).length && i.push.apply(i, r), a = a._next;
			return i
		}, e.tweenTo = function tweenTo(t, e) {
			e = e || {};
			var r, i = this,
				n = bt(i, t),
				a = e.startAt,
				s = e.onStart,
				o = e.onStartParams,
				u = e.immediateRender,
				h = Jt.to(i, ja({
					ease: e.ease || "none",
					lazy: !1,
					immediateRender: !1,
					time: n,
					overwrite: "auto",
					duration: e.duration || Math.abs((n - (a && "time" in a ? a.time : i._time)) / i.timeScale()) || X,
					onStart: function onStart() {
						if (i.pause(), !r) {
							var t = e.duration || Math.abs((n - (a && "time" in a ? a.time : i._time)) / i.timeScale());
							h._dur !== t && Ja(h, t, 0, 1).render(h._time, !0, !0), r = 1
						}
						s && s.apply(h, o || [])
					}
				}, e));
			return u ? h.render(0) : h
		}, e.tweenFromTo = function tweenFromTo(t, e, r) {
			return this.tweenTo(e, ja({
				startAt: {
					time: bt(this, t)
				}
			}, r))
		}, e.recent = function recent() {
			return this._recent
		}, e.nextLabel = function nextLabel(t) {
			return void 0 === t && (t = this._time), jb(this, bt(this, t))
		}, e.previousLabel = function previousLabel(t) {
			return void 0 === t && (t = this._time), jb(this, bt(this, t), 1)
		}, e.currentLabel = function currentLabel(t) {
			return arguments.length ? this.seek(t, !0) : this.previousLabel(this._time + X)
		}, e.shiftChildren = function shiftChildren(t, e, r) {
			void 0 === r && (r = 0);
			for (var i, n = this._first, a = this.labels; n;) n._start >= r && (n._start += t, n._end += t), n = n._next;
			if (e)
				for (i in a) a[i] >= r && (a[i] += t);
			return ta(this)
		}, e.invalidate = function invalidate() {
			var t = this._first;
			for (this._lock = 0; t;) t.invalidate(), t = t._next;
			return n.prototype.invalidate.call(this)
		}, e.clear = function clear(t) {
			void 0 === t && (t = !0);
			for (var e, r = this._first; r;) e = r._next, this.remove(r), r = e;
			return this._dp && (this._time = this._tTime = this._pTime = 0), t && (this.labels = {}), ta(this)
		}, e.totalDuration = function totalDuration(t) {
			var e, r, i, n = 0,
				a = this,
				s = a._last,
				o = j;
			if (arguments.length) return a.timeScale((a._repeat < 0 ? a.duration() : a.totalDuration()) / (a.reversed() ? -t : t));
			if (a._dirty) {
				for (i = a.parent; s;) e = s._prev, s._dirty && s.totalDuration(), o < (r = s._start) && a._sort && s._ts && !a._lock ? (a._lock = 1, Ca(a, s, r - s._delay, 1)._lock = 0) : o = r, r < 0 && s._ts && (n -= r, (!i && !a._dp || i && i.smoothChildTiming) && (a._start += r / a._ts, a._time -= r, a._tTime -= r), a.shiftChildren(-r, !1, -Infinity), o = 0), s._end > n && s._ts && (n = s._end), s = e;
				Ja(a, a === I && a._time > n ? a._time : n, 1, 1), a._dirty = 0
			}
			return a._tDur
		}, Timeline.updateRoot = function updateRoot(t) {
			if (I._ts && (ga(I, ya(t, I)), f = St.frame), St.frame >= pt) {
				pt += Y.autoSleep || 120;
				var e = I._first;
				if ((!e || !e._ts) && Y.autoSleep && St._listeners.length < 2) {
					for (; e && !e._ts;) e = e._next;
					e || St.sleep()
				}
			}
		}, Timeline
	}(qt);
	ja(Nt.prototype, {
		_lock: 0,
		_hasPause: 0,
		_forcing: 0
	});

	function Tb(t, e, r, i, n, a) {
		var u, h, l, f;
		if (ft[t] && !1 !== (u = new ft[t]).init(n, u.rawVars ? e[t] : function _processVars(t, e, r, i, n) {
				if (p(t) && (t = Xt(t, n, e, r, i)), !s(t) || t.style && t.nodeType || W(t) || H(t)) return o(t) ? Xt(t, n, e, r, i) : t;
				var a, u = {};
				for (a in t) u[a] = Xt(t[a], n, e, r, i);
				return u
			}(e[t], i, n, a, r), r, i, a) && (r._pt = h = new ae(r._pt, n, t, 0, 1, u.render, u, 0, u.priority), r !== d))
			for (l = r._ptLookup[r._targets.indexOf(n)], f = u._props.length; f--;) l[u._props[f]] = h;
		return u
	}

	function Xb(t, r, e, i) {
		var n, a, s = r.ease || i || "power1.inOut";
		if (W(r)) a = e[t] || (e[t] = []), r.forEach(function(t, e) {
			return a.push({
				t: e / (r.length - 1) * 100,
				v: t,
				e: s
			})
		});
		else
			for (n in r) a = e[n] || (e[n] = []), "ease" === n || a.push({
				t: parseFloat(t),
				v: r[n],
				e: s
			})
	}
	var Qt, Yt = function _addPropTween(t, e, r, i, n, a, s, u, h) {
			p(i) && (i = i(n || 0, t, a));
			var l, f = t[e],
				d = "get" !== r ? r : p(f) ? h ? t[e.indexOf("set") || !p(t["get" + e.substr(3)]) ? e : "get" + e.substr(3)](h) : t[e]() : f,
				c = p(f) ? h ? Zt : $t : Gt;
			if (o(i) && (~i.indexOf("random(") && (i = gb(i)), "=" === i.charAt(1) && (!(l = parseFloat(d) + parseFloat(i.substr(2)) * ("-" === i.charAt(0) ? -1 : 1) + (Qa(d) || 0)) && 0 !== l || (i = l))), d !== i) return isNaN(d * i) || "" === i ? (f || e in t || N(e, i), function _addComplexStringPropTween(t, e, r, i, n, a, s) {
				var o, u, h, l, f, d, p, c, _ = new ae(this._pt, t, e, 0, 1, te, null, n),
					m = 0,
					g = 0;
				for (_.b = r, _.e = i, r += "", (p = ~(i += "").indexOf("random(")) && (i = gb(i)), a && (a(c = [r, i], t, e), r = c[0], i = c[1]), u = r.match(it) || []; o = it.exec(i);) l = o[0], f = i.substring(m, o.index), h ? h = (h + 1) % 5 : "rgba(" === f.substr(-5) && (h = 1), l !== u[g++] && (d = parseFloat(u[g - 1]) || 0, _._pt = {
					_next: _._pt,
					p: f || 1 === g ? f : ",",
					s: d,
					c: "=" === l.charAt(1) ? parseFloat(l.substr(2)) * ("-" === l.charAt(0) ? -1 : 1) : parseFloat(l) - d,
					m: h && h < 4 ? Math.round : 0
				}, m = it.lastIndex);
				return _.c = m < i.length ? i.substring(m, i.length) : "", _.fp = s, (nt.test(i) || p) && (_.e = 0), this._pt = _
			}.call(this, t, e, d, i, c, u || Y.stringFilter, h)) : (l = new ae(this._pt, t, e, +d || 0, i - (d || 0), "boolean" == typeof f ? Wt : Ht, 0, c), h && (l.fp = h), s && l.modifier(s, this, t), this._pt = l)
		},
		jt = function _initTween(e, r) {
			var i, n, a, s, o, u, h, l, f, d, p, c, m, g = e.vars,
				v = g.ease,
				y = g.startAt,
				b = g.immediateRender,
				T = g.lazy,
				w = g.onUpdate,
				x = g.onUpdateParams,
				O = g.callbackScope,
				M = g.runBackwards,
				k = g.yoyoEase,
				C = g.keyframes,
				P = g.autoRevert,
				A = e._dur,
				S = e._startAt,
				D = e._targets,
				z = e.parent,
				F = z && "nested" === z.data ? z.parent._targets : D,
				E = "auto" === e._overwrite && !R,
				B = e.timeline;
			if (!B || C && v || (v = "none"), e._ease = Rt(v, L.ease), e._yEase = k ? Bt(Rt(!0 === k ? v : k, L.ease)) : 0, k && e._yoyo && !e._repeat && (k = e._yEase, e._yEase = e._ease, e._ease = k), e._from = !B && !!g.runBackwards, !B || C && !g.stagger) {
				if (c = (l = D[0] ? _(D[0]).harness : 0) && g[l.prop], i = na(g, ut), S && sa(S.render(-1, !0)), y)
					if (sa(e._startAt = Jt.set(D, ja({
							data: "isStart",
							overwrite: !1,
							parent: z,
							immediateRender: !0,
							lazy: t(T),
							startAt: null,
							delay: 0,
							onUpdate: w,
							onUpdateParams: x,
							callbackScope: O,
							stagger: 0
						}, y))), r < 0 && !b && !P && e._startAt.render(-1, !0), b) {
						if (0 < r && !P && (e._startAt = 0), A && r <= 0) return void(r && (e._zTime = r))
					} else !1 === P && (e._startAt = 0);
				else if (M && A)
					if (S) P || (e._startAt = 0);
					else if (r && (b = !1), a = ja({
						overwrite: !1,
						data: "isFromStart",
						lazy: b && t(T),
						immediateRender: b,
						stagger: 0,
						parent: z
					}, i), c && (a[l.prop] = c), sa(e._startAt = Jt.set(D, a)), r < 0 && e._startAt.render(-1, !0), e._zTime = r, b) {
					if (!r) return
				} else _initTween(e._startAt, X);
				for (e._pt = 0, T = A && t(T) || T && !A, n = 0; n < D.length; n++) {
					if (h = (o = D[n])._gsap || $(D)[n]._gsap, e._ptLookup[n] = d = {}, lt[h.id] && ht.length && fa(), p = F === D ? n : F.indexOf(o), l && !1 !== (f = new l).init(o, c || i, e, p, F) && (e._pt = s = new ae(e._pt, o, f.name, 0, 1, f.render, f, 0, f.priority), f._props.forEach(function(t) {
							d[t] = s
						}), f.priority && (u = 1)), !l || c)
						for (a in i) ft[a] && (f = Tb(a, i, e, p, o, F)) ? f.priority && (u = 1) : d[a] = s = Yt.call(e, o, a, "get", i[a], p, F, 0, g.stringFilter);
					e._op && e._op[n] && e.kill(o, e._op[n]), E && e._pt && (Qt = e, I.killTweensOf(o, d, e.globalTime(r)), m = !e.parent, Qt = 0), e._pt && T && (lt[h.id] = 1)
				}
				u && ne(e), e._onInit && e._onInit(e)
			}
			e._onUpdate = w, e._initted = (!e._op || e._pt) && !m, C && r <= 0 && B.render(j, !0, !0)
		},
		Xt = function _parseFuncOrString(t, e, r, i, n) {
			return p(t) ? t.call(e, r, i, n) : o(t) && ~t.indexOf("random(") ? gb(t) : t
		},
		Ut = _t + "repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase",
		Vt = {};
	ba(Ut + ",id,stagger,delay,duration,paused,scrollTrigger", function(t) {
		return Vt[t] = 1
	});
	var Jt = function(F) {
		function Tween(e, r, i, n) {
			var a;
			"number" == typeof r && (i.duration = r, r = i, i = null);
			var o, u, h, l, f, d, p, c, _ = (a = F.call(this, n ? r : oa(r)) || this).vars,
				m = _.duration,
				g = _.delay,
				y = _.immediateRender,
				b = _.stagger,
				T = _.overwrite,
				w = _.keyframes,
				x = _.defaults,
				M = _.scrollTrigger,
				k = _.yoyoEase,
				C = r.parent || I,
				P = (W(e) || H(e) ? q(e[0]) : "length" in r) ? [e] : xt(e);
			if (a._targets = P.length ? $(P) : O("GSAP target " + e + " not found. https://greensock.com", !Y.nullTargetWarn) || [], a._ptLookup = [], a._overwrite = T, w || b || v(m) || v(g)) {
				if (r = a.vars, (o = a.timeline = new Nt({
						data: "nested",
						defaults: x || {}
					})).kill(), o.parent = o._dp = _assertThisInitialized(a), o._start = 0, b || v(m) || v(g)) {
					if (l = P.length, p = b && Ya(b), s(b))
						for (f in b) ~Ut.indexOf(f) && ((c = c || {})[f] = b[f]);
					for (u = 0; u < l; u++)(h = na(r, Vt)).stagger = 0, k && (h.yoyoEase = k), c && mt(h, c), d = P[u], h.duration = +Xt(m, _assertThisInitialized(a), u, d, P), h.delay = (+Xt(g, _assertThisInitialized(a), u, d, P) || 0) - a._delay, !b && 1 === l && h.delay && (a._delay = g = h.delay, a._start += g, h.delay = 0), o.to(d, h, p ? p(u, d, P) : 0), o._ease = zt.none;
					o.duration() ? m = g = 0 : a.timeline = 0
				} else if (w) {
					oa(ja(o.vars.defaults, {
						ease: "none"
					})), o._ease = Rt(w.ease || r.ease || "none");
					var A, S, D, z = 0;
					if (W(w)) w.forEach(function(t) {
						return o.to(P, t, ">")
					});
					else {
						for (f in h = {}, w) "ease" === f || "easeEach" === f || Xb(f, w[f], h, w.easeEach);
						for (f in h)
							for (A = h[f].sort(function(t, e) {
									return t.t - e.t
								}), u = z = 0; u < A.length; u++)(D = {
								ease: (S = A[u]).e,
								duration: (S.t - (u ? A[u - 1].t : 0)) / 100 * m
							})[f] = S.v, o.to(P, D, z), z += D.duration;
						o.duration() < m && o.to({}, {
							duration: m - o.duration()
						})
					}
				}
				m || a.duration(m = o.duration())
			} else a.timeline = 0;
			return !0 !== T || R || (Qt = _assertThisInitialized(a), I.killTweensOf(P), Qt = 0), Ca(C, _assertThisInitialized(a), i), r.reversed && a.reverse(), r.paused && a.paused(!0), (y || !m && !w && a._start === da(C._time) && t(y) && function _hasNoPausedAncestors(t) {
				return !t || t._ts && _hasNoPausedAncestors(t.parent)
			}(_assertThisInitialized(a)) && "nested" !== C.data) && (a._tTime = -X, a.render(Math.max(0, -g))), M && Da(_assertThisInitialized(a), M), a
		}
		_inheritsLoose(Tween, F);
		var e = Tween.prototype;
		return e.render = function render(t, e, r) {
			var i, n, a, s, o, u, h, l, f, d = this._time,
				p = this._tDur,
				c = this._dur,
				_ = p - X < t && 0 <= t ? p : t < X ? 0 : t;
			if (c) {
				if (_ !== this._tTime || !t || r || !this._initted && this._tTime || this._startAt && this._zTime < 0 != t < 0) {
					if (i = _, l = this.timeline, this._repeat) {
						if (s = c + this._rDelay, this._repeat < -1 && t < 0) return this.totalTime(100 * s + t, e, r);
						if (i = da(_ % s), _ === p ? (a = this._repeat, i = c) : ((a = ~~(_ / s)) && a === _ / s && (i = c, a--), c < i && (i = c)), (u = this._yoyo && 1 & a) && (f = this._yEase, i = c - i), o = gt(this._tTime, s), i === d && !r && this._initted) return this;
						a !== o && (l && this._yEase && Hb(l, u), !this.vars.repeatRefresh || u || this._lock || (this._lock = r = 1, this.render(da(s * a), !0).invalidate()._lock = 0))
					}
					if (!this._initted) {
						if (Ea(this, t < 0 ? t : i, r, e)) return this._tTime = 0, this;
						if (c !== this._dur) return this.render(t, e, r)
					}
					if (this._tTime = _, this._time = i, !this._act && this._ts && (this._act = 1, this._lazy = 0), this.ratio = h = (f || this._ease)(i / c), this._from && (this.ratio = h = 1 - h), i && !d && !e && (Mt(this, "onStart"), this._tTime !== _)) return this;
					for (n = this._pt; n;) n.r(h, n.d), n = n._next;
					l && l.render(t < 0 ? t : !i && u ? -X : l._dur * l._ease(i / this._dur), e, r) || this._startAt && (this._zTime = t), this._onUpdate && !e && (t < 0 && this._startAt && this._startAt.render(t, !0, r), Mt(this, "onUpdate")), this._repeat && a !== o && this.vars.onRepeat && !e && this.parent && Mt(this, "onRepeat"), _ !== this._tDur && _ || this._tTime !== _ || (t < 0 && this._startAt && !this._onUpdate && this._startAt.render(t, !0, !0), !t && c || !(_ === this._tDur && 0 < this._ts || !_ && this._ts < 0) || sa(this, 1), e || t < 0 && !d || !_ && !d || (Mt(this, _ === p ? "onComplete" : "onReverseComplete", !0), !this._prom || _ < p && 0 < this.timeScale() || this._prom()))
				}
			} else ! function _renderZeroDurationTween(t, e, r, i) {
				var n, a, s, o = t.ratio,
					u = e < 0 || !e && (!t._start && function _parentPlayheadIsBeforeStart(t) {
						var e = t.parent;
						return e && e._ts && e._initted && !e._lock && (e.rawTime() < 0 || _parentPlayheadIsBeforeStart(e))
					}(t) && (t._initted || !vt(t)) || (t._ts < 0 || t._dp._ts < 0) && !vt(t)) ? 0 : 1,
					h = t._rDelay,
					l = 0;
				if (h && t._repeat && (l = Tt(0, t._tDur, e), a = gt(l, h), t._yoyo && 1 & a && (u = 1 - u), a !== gt(t._tTime, h) && (o = 1 - u, t.vars.repeatRefresh && t._initted && t.invalidate())), u !== o || i || t._zTime === X || !e && t._zTime) {
					if (!t._initted && Ea(t, e, i, r)) return;
					for (s = t._zTime, t._zTime = e || (r ? X : 0), r = r || e && !s, t.ratio = u, t._from && (u = 1 - u), t._time = 0, t._tTime = l, n = t._pt; n;) n.r(u, n.d), n = n._next;
					t._startAt && e < 0 && t._startAt.render(e, !0, !0), t._onUpdate && !r && Mt(t, "onUpdate"), l && t._repeat && !r && t.parent && Mt(t, "onRepeat"), (e >= t._tDur || e < 0) && t.ratio === u && (u && sa(t, 1), r || (Mt(t, u ? "onComplete" : "onReverseComplete", !0), t._prom && t._prom()))
				} else t._zTime || (t._zTime = e)
			}(this, t, e, r);
			return this
		}, e.targets = function targets() {
			return this._targets
		}, e.invalidate = function invalidate() {
			return this._pt = this._op = this._startAt = this._onUpdate = this._lazy = this.ratio = 0, this._ptLookup = [], this.timeline && this.timeline.invalidate(), F.prototype.invalidate.call(this)
		}, e.kill = function kill(t, e) {
			if (void 0 === e && (e = "all"), !(t || e && "all" !== e)) return this._lazy = this._pt = 0, this.parent ? lb(this) : this;
			if (this.timeline) {
				var r = this.timeline.totalDuration();
				return this.timeline.killTweensOf(t, e, Qt && !0 !== Qt.vars.overwrite)._first || lb(this), this.parent && r !== this.timeline.totalDuration() && Ja(this, this._dur * this.timeline._tDur / r, 0, 1), this
			}
			var i, n, a, s, u, h, l, f = this._targets,
				d = t ? xt(t) : f,
				p = this._ptLookup,
				c = this._pt;
			if ((!e || "all" === e) && function _arraysMatch(t, e) {
					for (var r = t.length, i = r === e.length; i && r-- && t[r] === e[r];);
					return r < 0
				}(f, d)) return "all" === e && (this._pt = 0), lb(this);
			for (i = this._op = this._op || [], "all" !== e && (o(e) && (u = {}, ba(e, function(t) {
					return u[t] = 1
				}), e = u), e = function _addAliasesToVars(t, e) {
					var r, i, n, a, s = t[0] ? _(t[0]).harness : 0,
						o = s && s.aliases;
					if (!o) return e;
					for (i in r = mt({}, e), o)
						if (i in r)
							for (n = (a = o[i].split(",")).length; n--;) r[a[n]] = r[i];
					return r
				}(f, e)), l = f.length; l--;)
				if (~d.indexOf(f[l]))
					for (u in n = p[l], "all" === e ? (i[l] = e, s = n, a = {}) : (a = i[l] = i[l] || {}, s = e), s)(h = n && n[u]) && ("kill" in h.d && !0 !== h.d.kill(u) || ra(this, h, "_pt"), delete n[u]), "all" !== a && (a[u] = 1);
			return this._initted && !this._pt && c && lb(this), this
		}, Tween.to = function to(t, e, r) {
			return new Tween(t, e, r)
		}, Tween.from = function from(t, e) {
			return Na(1, arguments)
		}, Tween.delayedCall = function delayedCall(t, e, r, i) {
			return new Tween(e, 0, {
				immediateRender: !1,
				lazy: !1,
				overwrite: !1,
				delay: t,
				onComplete: e,
				onReverseComplete: e,
				onCompleteParams: r,
				onReverseCompleteParams: r,
				callbackScope: i
			})
		}, Tween.fromTo = function fromTo(t, e, r) {
			return Na(2, arguments)
		}, Tween.set = function set(t, e) {
			return e.duration = 0, e.repeatDelay || (e.repeat = 0), new Tween(t, e)
		}, Tween.killTweensOf = function killTweensOf(t, e, r) {
			return I.killTweensOf(t, e, r)
		}, Tween
	}(qt);
	ja(Jt.prototype, {
		_targets: [],
		_lazy: 0,
		_startAt: 0,
		_op: 0,
		_onInit: 0
	}), ba("staggerTo,staggerFrom,staggerFromTo", function(r) {
		Jt[r] = function() {
			var t = new Nt,
				e = wt.call(arguments, 0);
			return e.splice("staggerFromTo" === r ? 5 : 4, 0, 0), t[r].apply(t, e)
		}
	});

	function dc(t, e, r) {
		return t.setAttribute(e, r)
	}

	function lc(t, e, r, i) {
		i.mSet(t, e, i.m.call(i.tween, r, i.mt), i)
	}
	var Gt = function _setterPlain(t, e, r) {
			return t[e] = r
		},
		$t = function _setterFunc(t, e, r) {
			return t[e](r)
		},
		Zt = function _setterFuncWithParam(t, e, r, i) {
			return t[e](i.fp, r)
		},
		Kt = function _getSetter(t, e) {
			return p(t[e]) ? $t : r(t[e]) && t.setAttribute ? dc : Gt
		},
		Ht = function _renderPlain(t, e) {
			return e.set(e.t, e.p, Math.round(1e6 * (e.s + e.c * t)) / 1e6, e)
		},
		Wt = function _renderBoolean(t, e) {
			return e.set(e.t, e.p, !!(e.s + e.c * t), e)
		},
		te = function _renderComplexString(t, e) {
			var r = e._pt,
				i = "";
			if (!t && e.b) i = e.b;
			else if (1 === t && e.e) i = e.e;
			else {
				for (; r;) i = r.p + (r.m ? r.m(r.s + r.c * t) : Math.round(1e4 * (r.s + r.c * t)) / 1e4) + i, r = r._next;
				i += e.c
			}
			e.set(e.t, e.p, i, e)
		},
		ee = function _renderPropTweens(t, e) {
			for (var r = e._pt; r;) r.r(t, r.d), r = r._next
		},
		re = function _addPluginModifier(t, e, r, i) {
			for (var n, a = this._pt; a;) n = a._next, a.p === i && a.modifier(t, e, r), a = n
		},
		ie = function _killPropTweensOf(t) {
			for (var e, r, i = this._pt; i;) r = i._next, i.p === t && !i.op || i.op === t ? ra(this, i, "_pt") : i.dep || (e = 1), i = r;
			return !e
		},
		ne = function _sortPropTweensByPriority(t) {
			for (var e, r, i, n, a = t._pt; a;) {
				for (e = a._next, r = i; r && r.pr > a.pr;) r = r._next;
				(a._prev = r ? r._prev : n) ? a._prev._next = a: i = a, (a._next = r) ? r._prev = a : n = a, a = e
			}
			t._pt = i
		},
		ae = (PropTween.prototype.modifier = function modifier(t, e, r) {
			this.mSet = this.mSet || this.set, this.set = lc, this.m = t, this.mt = r, this.tween = e
		}, PropTween);

	function PropTween(t, e, r, i, n, a, s, o, u) {
		this.t = e, this.s = i, this.c = n, this.p = r, this.r = a || Ht, this.d = s || this, this.set = o || Gt, this.pr = u || 0, (this._next = t) && (t._prev = this)
	}
	ba(_t + "parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger", function(t) {
		return ut[t] = 1
	}), ot.TweenMax = ot.TweenLite = Jt, ot.TimelineLite = ot.TimelineMax = Nt, I = new Nt({
		sortChildren: !1,
		defaults: L,
		autoRemoveChildren: !0,
		id: "root",
		smoothChildTiming: !0
	}), Y.stringFilter = wb;
	var se = {
		registerPlugin: function registerPlugin() {
			for (var t = arguments.length, e = new Array(t), r = 0; r < t; r++) e[r] = arguments[r];
			e.forEach(function(t) {
				return function _createPlugin(t) {
					var e = (t = !t.name && t.default || t).name,
						r = p(t),
						i = e && !r && t.init ? function() {
							this._props = []
						} : t,
						n = {
							init: Q,
							render: ee,
							add: Yt,
							kill: ie,
							modifier: re,
							rawVars: 0
						},
						a = {
							targetTest: 0,
							get: 0,
							getSetter: Kt,
							aliases: {},
							register: 0
						};
					if (Dt(), t !== i) {
						if (ft[e]) return;
						ja(i, ja(na(t, n), a)), mt(i.prototype, mt(n, na(t, a))), ft[i.prop = e] = i, t.targetTest && (ct.push(i), ut[e] = 1), e = ("css" === e ? "CSS" : e.charAt(0).toUpperCase() + e.substr(1)) + "Plugin"
					}
					P(e, i), t.register && t.register(oe, i, ae)
				}(t)
			})
		},
		timeline: function timeline(t) {
			return new Nt(t)
		},
		getTweensOf: function getTweensOf(t, e) {
			return I.getTweensOf(t, e)
		},
		getProperty: function getProperty(i, t, e, r) {
			o(i) && (i = xt(i)[0]);
			var n = _(i || {}).get,
				a = e ? ia : ha;
			return "native" === e && (e = ""), i ? t ? a((ft[t] && ft[t].get || n)(i, t, e, r)) : function(t, e, r) {
				return a((ft[t] && ft[t].get || n)(i, t, e, r))
			} : i
		},
		quickSetter: function quickSetter(r, e, i) {
			if (1 < (r = xt(r)).length) {
				var n = r.map(function(t) {
						return oe.quickSetter(t, e, i)
					}),
					a = n.length;
				return function(t) {
					for (var e = a; e--;) n[e](t)
				}
			}
			r = r[0] || {};
			var s = ft[e],
				o = _(r),
				u = o.harness && (o.harness.aliases || {})[e] || e,
				h = s ? function(t) {
					var e = new s;
					d._pt = 0, e.init(r, i ? t + i : t, d, 0, [r]), e.render(1, e), d._pt && ee(1, d)
				} : o.set(r, u);
			return s ? h : function(t) {
				return h(r, u, i ? t + i : t, o, 1)
			}
		},
		isTweening: function isTweening(t) {
			return 0 < I.getTweensOf(t, !0).length
		},
		defaults: function defaults(t) {
			return t && t.ease && (t.ease = Rt(t.ease, L.ease)), ma(L, t || {})
		},
		config: function config(t) {
			return ma(Y, t || {})
		},
		registerEffect: function registerEffect(t) {
			var i = t.name,
				n = t.effect,
				e = t.plugins,
				a = t.defaults,
				r = t.extendTimeline;
			(e || "").split(",").forEach(function(t) {
				return t && !ft[t] && !ot[t] && O(i + " effect requires " + t + " plugin.")
			}), dt[i] = function(t, e, r) {
				return n(xt(t), ja(e || {}, a), r)
			}, r && (Nt.prototype[i] = function(t, e, r) {
				return this.add(dt[i](t, s(e) ? e : (r = e) && {}, this), r)
			})
		},
		registerEase: function registerEase(t, e) {
			zt[t] = Rt(e)
		},
		parseEase: function parseEase(t, e) {
			return arguments.length ? Rt(t, e) : zt
		},
		getById: function getById(t) {
			return I.getById(t)
		},
		exportRoot: function exportRoot(e, r) {
			void 0 === e && (e = {});
			var i, n, a = new Nt(e);
			for (a.smoothChildTiming = t(e.smoothChildTiming), I.remove(a), a._dp = 0, a._time = a._tTime = I._time, i = I._first; i;) n = i._next, !r && !i._dur && i instanceof Jt && i.vars.onComplete === i._targets[0] || Ca(a, i, i._start - i._delay), i = n;
			return Ca(I, a, 0), a
		},
		utils: {
			wrap: function wrap(e, t, r) {
				var i = t - e;
				return W(e) ? db(e, wrap(0, e.length), t) : Oa(r, function(t) {
					return (i + (t - e) % i) % i + e
				})
			},
			wrapYoyo: function wrapYoyo(e, t, r) {
				var i = t - e,
					n = 2 * i;
				return W(e) ? db(e, wrapYoyo(0, e.length - 1), t) : Oa(r, function(t) {
					return e + (i < (t = (n + (t - e) % n) % n || 0) ? n - t : t)
				})
			},
			distribute: Ya,
			random: _a,
			snap: $a,
			normalize: function normalize(t, e, r) {
				return Ot(t, e, 0, 1, r)
			},
			getUnit: Qa,
			clamp: function clamp(e, r, t) {
				return Oa(t, function(t) {
					return Tt(e, r, t)
				})
			},
			splitColor: rb,
			toArray: xt,
			selector: function selector(r) {
				return r = xt(r)[0] || O("Invalid scope") || {},
					function(t) {
						var e = r.current || r.nativeElement || r;
						return xt(t, e.querySelectorAll ? e : e === r ? O("Invalid scope") || a.createElement("div") : r)
					}
			},
			mapRange: Ot,
			pipe: function pipe() {
				for (var t = arguments.length, e = new Array(t), r = 0; r < t; r++) e[r] = arguments[r];
				return function(t) {
					return e.reduce(function(t, e) {
						return e(t)
					}, t)
				}
			},
			unitize: function unitize(e, r) {
				return function(t) {
					return e(parseFloat(t)) + (r || Qa(t))
				}
			},
			interpolate: function interpolate(e, r, t, i) {
				var n = isNaN(e + r) ? 0 : function(t) {
					return (1 - t) * e + t * r
				};
				if (!n) {
					var a, s, u, h, l, f = o(e),
						d = {};
					if (!0 === t && (i = 1) && (t = null), f) e = {
						p: e
					}, r = {
						p: r
					};
					else if (W(e) && !W(r)) {
						for (u = [], h = e.length, l = h - 2, s = 1; s < h; s++) u.push(interpolate(e[s - 1], e[s]));
						h--, n = function func(t) {
							t *= h;
							var e = Math.min(l, ~~t);
							return u[e](t - e)
						}, t = r
					} else i || (e = mt(W(e) ? [] : {}, e));
					if (!u) {
						for (a in r) Yt.call(d, e, a, "get", r[a]);
						n = function func(t) {
							return ee(t, d) || (f ? e.p : e)
						}
					}
				}
				return Oa(t, n)
			},
			shuffle: Xa
		},
		install: M,
		effects: dt,
		ticker: St,
		updateRoot: Nt.updateRoot,
		plugins: ft,
		globalTimeline: I,
		core: {
			PropTween: ae,
			globals: P,
			Tween: Jt,
			Timeline: Nt,
			Animation: qt,
			getCache: _,
			_removeLinkedListItem: ra,
			suppressOverwrites: function suppressOverwrites(t) {
				return R = t
			}
		}
	};
	ba("to,from,fromTo,delayedCall,set,killTweensOf", function(t) {
		return se[t] = Jt[t]
	}), St.add(Nt.updateRoot), d = se.to({}, {
		duration: 0
	});

	function pc(t, e) {
		for (var r = t._pt; r && r.p !== e && r.op !== e && r.fp !== e;) r = r._next;
		return r
	}

	function rc(t, n) {
		return {
			name: t,
			rawVars: 1,
			init: function init(t, i, e) {
				e._onInit = function(t) {
					var e, r;
					if (o(i) && (e = {}, ba(i, function(t) {
							return e[t] = 1
						}), i = e), n) {
						for (r in e = {}, i) e[r] = n(i[r]);
						i = e
					}! function _addModifiers(t, e) {
						var r, i, n, a = t._targets;
						for (r in e)
							for (i = a.length; i--;)(n = (n = t._ptLookup[i][r]) && n.d) && (n._pt && (n = pc(n, r)), n && n.modifier && n.modifier(e[r], t, a[i], r))
					}(t, i)
				}
			}
		}
	}
	var oe = se.registerPlugin({
		name: "attr",
		init: function init(t, e, r, i, n) {
			var a, s;
			for (a in e)(s = this.add(t, "setAttribute", (t.getAttribute(a) || 0) + "", e[a], i, n, 0, 0, a)) && (s.op = a), this._props.push(a)
		}
	}, {
		name: "endArray",
		init: function init(t, e) {
			for (var r = e.length; r--;) this.add(t, r, t[r] || 0, e[r])
		}
	}, rc("roundProps", Za), rc("modifiers"), rc("snap", $a)) || se;
	Jt.version = Nt.version = oe.version = "3.9.1", l = 1, u() && Dt();

	function ad(t, e) {
		return e.set(e.t, e.p, Math.round(1e4 * (e.s + e.c * t)) / 1e4 + e.u, e)
	}

	function bd(t, e) {
		return e.set(e.t, e.p, 1 === t ? e.e : Math.round(1e4 * (e.s + e.c * t)) / 1e4 + e.u, e)
	}

	function cd(t, e) {
		return e.set(e.t, e.p, t ? Math.round(1e4 * (e.s + e.c * t)) / 1e4 + e.u : e.b, e)
	}

	function dd(t, e) {
		var r = e.s + e.c * t;
		e.set(e.t, e.p, ~~(r + (r < 0 ? -.5 : .5)) + e.u, e)
	}

	function ed(t, e) {
		return e.set(e.t, e.p, t ? e.e : e.b, e)
	}

	function fd(t, e) {
		return e.set(e.t, e.p, 1 !== t ? e.b : e.e, e)
	}

	function gd(t, e, r) {
		return t.style[e] = r
	}

	function hd(t, e, r) {
		return t.style.setProperty(e, r)
	}

	function id(t, e, r) {
		return t._gsap[e] = r
	}

	function jd(t, e, r) {
		return t._gsap.scaleX = t._gsap.scaleY = r
	}

	function kd(t, e, r, i, n) {
		var a = t._gsap;
		a.scaleX = a.scaleY = r, a.renderTransform(n, a)
	}

	function ld(t, e, r, i, n) {
		var a = t._gsap;
		a[e] = r, a.renderTransform(n, a)
	}

	function pd(t, e) {
		var r = he.createElementNS ? he.createElementNS((e || "http://www.w3.org/1999/xhtml").replace(/^https/, "http"), t) : he.createElement(t);
		return r.style ? r : he.createElement(t)
	}

	function qd(t, e, r) {
		var i = getComputedStyle(t);
		return i[e] || i.getPropertyValue(e.replace(Ie, "-$1").toLowerCase()) || i.getPropertyValue(e) || !r && qd(t, Xe(e) || e, 1) || ""
	}

	function td() {
		(function _windowExists() {
			return "undefined" != typeof window
		})() && window.document && (ue = window, he = ue.document, le = he.documentElement, de = pd("div") || {
			style: {}
		}, pd("div"), Qe = Xe(Qe), Ye = Qe + "Origin", de.style.cssText = "border-width:0;line-height:0;position:absolute;padding:0", ce = !!Xe("perspective"), fe = 1)
	}

	function ud(t) {
		var e, r = pd("svg", this.ownerSVGElement && this.ownerSVGElement.getAttribute("xmlns") || "http://www.w3.org/2000/svg"),
			i = this.parentNode,
			n = this.nextSibling,
			a = this.style.cssText;
		if (le.appendChild(r), r.appendChild(this), this.style.display = "block", t) try {
			e = this.getBBox(), this._gsapBBox = this.getBBox, this.getBBox = ud
		} catch (t) {} else this._gsapBBox && (e = this._gsapBBox());
		return i && (n ? i.insertBefore(this, n) : i.appendChild(this)), le.removeChild(r), this.style.cssText = a, e
	}

	function vd(t, e) {
		for (var r = e.length; r--;)
			if (t.hasAttribute(e[r])) return t.getAttribute(e[r])
	}

	function wd(e) {
		var r;
		try {
			r = e.getBBox()
		} catch (t) {
			r = ud.call(e, !0)
		}
		return r && (r.width || r.height) || e.getBBox === ud || (r = ud.call(e, !0)), !r || r.width || r.x || r.y ? r : {
			x: +vd(e, ["x", "cx", "x1"]) || 0,
			y: +vd(e, ["y", "cy", "y1"]) || 0,
			width: 0,
			height: 0
		}
	}

	function xd(t) {
		return !(!t.getCTM || t.parentNode && !t.ownerSVGElement || !wd(t))
	}

	function yd(t, e) {
		if (e) {
			var r = t.style;
			e in Fe && e !== Ye && (e = Qe), r.removeProperty ? ("ms" !== e.substr(0, 2) && "webkit" !== e.substr(0, 6) || (e = "-" + e), r.removeProperty(e.replace(Ie, "-$1").toLowerCase())) : r.removeAttribute(e)
		}
	}

	function zd(t, e, r, i, n, a) {
		var s = new ae(t._pt, e, r, 0, 1, a ? fd : ed);
		return (t._pt = s).b = i, s.e = n, t._props.push(r), s
	}

	function Bd(t, e, r, i) {
		var n, a, s, o, u = parseFloat(r) || 0,
			h = (r + "").trim().substr((u + "").length) || "px",
			l = de.style,
			f = Le.test(e),
			d = "svg" === t.tagName.toLowerCase(),
			p = (d ? "client" : "offset") + (f ? "Width" : "Height"),
			c = "px" === i,
			m = "%" === i;
		return i === h || !u || Ue[i] || Ue[h] ? u : ("px" === h || c || (u = Bd(t, e, r, "px")), o = t.getCTM && xd(t), !m && "%" !== h || !Fe[e] && !~e.indexOf("adius") ? (l[f ? "width" : "height"] = 100 + (c ? h : i), a = ~e.indexOf("adius") || "em" === i && t.appendChild && !d ? t : t.parentNode, o && (a = (t.ownerSVGElement || {}).parentNode), a && a !== he && a.appendChild || (a = he.body), (s = a._gsap) && m && s.width && f && s.time === St.time ? ca(u / s.width * 100) : (!m && "%" !== h || (l.position = qd(t, "position")), a === t && (l.position = "static"), a.appendChild(de), n = de[p], a.removeChild(de), l.position = "absolute", f && m && ((s = _(a)).time = St.time, s.width = a[p]), ca(c ? n * u / 100 : n && u ? 100 / n * u : 0))) : (n = o ? t.getBBox()[f ? "width" : "height"] : t[p], ca(m ? u / n * 100 : u / 100 * n)))
	}

	function Cd(t, e, r, i) {
		var n;
		return fe || td(), e in Ne && "transform" !== e && ~(e = Ne[e]).indexOf(",") && (e = e.split(",")[0]), Fe[e] && "transform" !== e ? (n = Ze(t, i), n = "transformOrigin" !== e ? n[e] : n.svg ? n.origin : Ke(qd(t, Ye)) + " " + n.zOrigin + "px") : (n = t.style[e]) && "auto" !== n && !i && !~(n + "").indexOf("calc(") || (n = Je[e] && Je[e](t, e, r) || qd(t, e) || aa(t, e) || ("opacity" === e ? 1 : 0)), r && !~(n + "").trim().indexOf(" ") ? Bd(t, e, n, r) + r : n
	}

	function Dd(t, e, r, i) {
		if (!r || "none" === r) {
			var n = Xe(e, t, 1),
				a = n && qd(t, n, 1);
			a && a !== r ? (e = n, r = a) : "borderColor" === e && (r = qd(t, "borderTopColor"))
		}
		var s, o, u, h, l, f, d, p, c, _, m, g, v = new ae(this._pt, t.style, e, 0, 1, te),
			y = 0,
			b = 0;
		if (v.b = r, v.e = i, r += "", "auto" === (i += "") && (t.style[e] = i, i = qd(t, e) || i, t.style[e] = r), wb(s = [r, i]), i = s[1], u = (r = s[0]).match(rt) || [], (i.match(rt) || []).length) {
			for (; o = rt.exec(i);) d = o[0], c = i.substring(y, o.index), l ? l = (l + 1) % 5 : "rgba(" !== c.substr(-5) && "hsla(" !== c.substr(-5) || (l = 1), d !== (f = u[b++] || "") && (h = parseFloat(f) || 0, m = f.substr((h + "").length), (g = "=" === d.charAt(1) ? +(d.charAt(0) + "1") : 0) && (d = d.substr(2)), p = parseFloat(d), _ = d.substr((p + "").length), y = rt.lastIndex - _.length, _ || (_ = _ || Y.units[e] || m, y === i.length && (i += _, v.e += _)), m !== _ && (h = Bd(t, e, f, _) || 0), v._pt = {
				_next: v._pt,
				p: c || 1 === b ? c : ",",
				s: h,
				c: g ? g * p : p - h,
				m: l && l < 4 || "zIndex" === e ? Math.round : 0
			});
			v.c = y < i.length ? i.substring(y, i.length) : ""
		} else v.r = "display" === e && "none" === i ? fd : ed;
		return nt.test(i) && (v.e = 0), this._pt = v
	}

	function Fd(t) {
		var e = t.split(" "),
			r = e[0],
			i = e[1] || "50%";
		return "top" !== r && "bottom" !== r && "left" !== i && "right" !== i || (t = r, r = i, i = t), e[0] = Ve[r] || r, e[1] = Ve[i] || i, e.join(" ")
	}

	function Gd(t, e) {
		if (e.tween && e.tween._time === e.tween._dur) {
			var r, i, n, a = e.t,
				s = a.style,
				o = e.u,
				u = a._gsap;
			if ("all" === o || !0 === o) s.cssText = "", i = 1;
			else
				for (n = (o = o.split(",")).length; - 1 < --n;) r = o[n], Fe[r] && (i = 1, r = "transformOrigin" === r ? Ye : Qe), yd(a, r);
			i && (yd(a, Qe), u && (u.svg && a.removeAttribute("transform"), Ze(a, 1), u.uncache = 1))
		}
	}

	function Kd(t) {
		return "matrix(1, 0, 0, 1, 0, 0)" === t || "none" === t || !t
	}

	function Ld(t) {
		var e = qd(t, Qe);
		return Kd(e) ? Ge : e.substr(7).match(et).map(ca)
	}

	function Md(t, e) {
		var r, i, n, a, s = t._gsap || _(t),
			o = t.style,
			u = Ld(t);
		return s.svg && t.getAttribute("transform") ? "1,0,0,1,0,0" === (u = [(n = t.transform.baseVal.consolidate().matrix).a, n.b, n.c, n.d, n.e, n.f]).join(",") ? Ge : u : (u !== Ge || t.offsetParent || t === le || s.svg || (n = o.display, o.display = "block", (r = t.parentNode) && t.offsetParent || (a = 1, i = t.nextSibling, le.appendChild(t)), u = Ld(t), n ? o.display = n : yd(t, "display"), a && (i ? r.insertBefore(t, i) : r ? r.appendChild(t) : le.removeChild(t))), e && 6 < u.length ? [u[0], u[1], u[4], u[5], u[12], u[13]] : u)
	}

	function Nd(t, e, r, i, n, a) {
		var s, o, u, h = t._gsap,
			l = n || Md(t, !0),
			f = h.xOrigin || 0,
			d = h.yOrigin || 0,
			p = h.xOffset || 0,
			c = h.yOffset || 0,
			_ = l[0],
			m = l[1],
			g = l[2],
			v = l[3],
			y = l[4],
			b = l[5],
			T = e.split(" "),
			w = parseFloat(T[0]) || 0,
			x = parseFloat(T[1]) || 0;
		r ? l !== Ge && (o = _ * v - m * g) && (u = w * (-m / o) + x * (_ / o) - (_ * b - m * y) / o, w = w * (v / o) + x * (-g / o) + (g * b - v * y) / o, x = u) : (w = (s = wd(t)).x + (~T[0].indexOf("%") ? w / 100 * s.width : w), x = s.y + (~(T[1] || T[0]).indexOf("%") ? x / 100 * s.height : x)), i || !1 !== i && h.smooth ? (y = w - f, b = x - d, h.xOffset = p + (y * _ + b * g) - y, h.yOffset = c + (y * m + b * v) - b) : h.xOffset = h.yOffset = 0, h.xOrigin = w, h.yOrigin = x, h.smooth = !!i, h.origin = e, h.originIsAbsolute = !!r, t.style[Ye] = "0px 0px", a && (zd(a, h, "xOrigin", f, w), zd(a, h, "yOrigin", d, x), zd(a, h, "xOffset", p, h.xOffset), zd(a, h, "yOffset", c, h.yOffset)), t.setAttribute("data-svg-origin", w + " " + x)
	}

	function Qd(t, e, r) {
		var i = Qa(e);
		return ca(parseFloat(e) + parseFloat(Bd(t, "x", r + "px", i))) + i
	}

	function Xd(t, e, r, i, n, a) {
		var s, u, h = 360,
			l = o(n),
			f = parseFloat(n) * (l && ~n.indexOf("rad") ? Ee : 1),
			d = a ? f * a : f - i,
			p = i + d + "deg";
		return l && ("short" === (s = n.split("_")[1]) && (d %= h) !== d % 180 && (d += d < 0 ? h : -h), "cw" === s && d < 0 ? d = (d + 36e9) % h - ~~(d / h) * h : "ccw" === s && 0 < d && (d = (d - 36e9) % h - ~~(d / h) * h)), t._pt = u = new ae(t._pt, e, r, i, d, bd), u.e = p, u.u = "deg", t._props.push(r), u
	}

	function Yd(t, e) {
		for (var r in e) t[r] = e[r];
		return t
	}

	function Zd(t, e, r) {
		var i, n, a, s, o, u, h, l = Yd({}, r._gsap),
			f = r.style;
		for (n in l.svg ? (a = r.getAttribute("transform"), r.setAttribute("transform", ""), f[Qe] = e, i = Ze(r, 1), yd(r, Qe), r.setAttribute("transform", a)) : (a = getComputedStyle(r)[Qe], f[Qe] = e, i = Ze(r, 1), f[Qe] = a), Fe)(a = l[n]) !== (s = i[n]) && "perspective,force3D,transformOrigin,svgOrigin".indexOf(n) < 0 && (o = Qa(a) !== (h = Qa(s)) ? Bd(r, n, a, h) : parseFloat(a), u = parseFloat(s), t._pt = new ae(t._pt, i, n, o, u - o, ad), t._pt.u = h || 0, t._props.push(n));
		Yd(i, l)
	}
	var ue, he, le, fe, de, pe, ce, _e = zt.Power0,
		me = zt.Power1,
		ge = zt.Power2,
		ve = zt.Power3,
		ye = zt.Power4,
		be = zt.Linear,
		Te = zt.Quad,
		we = zt.Cubic,
		xe = zt.Quart,
		Oe = zt.Quint,
		Me = zt.Strong,
		ke = zt.Elastic,
		Ce = zt.Back,
		Pe = zt.SteppedEase,
		Ae = zt.Bounce,
		Se = zt.Sine,
		De = zt.Expo,
		ze = zt.Circ,
		Fe = {},
		Ee = 180 / Math.PI,
		Be = Math.PI / 180,
		Re = Math.atan2,
		Ie = /([A-Z])/g,
		Le = /(?:left|right|width|margin|padding|x)/i,
		qe = /[\s,\(]\S/,
		Ne = {
			autoAlpha: "opacity,visibility",
			scale: "scaleX,scaleY",
			alpha: "opacity"
		},
		Qe = "transform",
		Ye = Qe + "Origin",
		je = "O,Moz,ms,Ms,Webkit".split(","),
		Xe = function _checkPropPrefix(t, e, r) {
			var i = (e || de).style,
				n = 5;
			if (t in i && !r) return t;
			for (t = t.charAt(0).toUpperCase() + t.substr(1); n-- && !(je[n] + t in i););
			return n < 0 ? null : (3 === n ? "ms" : 0 <= n ? je[n] : "") + t
		},
		Ue = {
			deg: 1,
			rad: 1,
			turn: 1
		},
		Ve = {
			top: "0%",
			bottom: "100%",
			left: "0%",
			right: "100%",
			center: "50%"
		},
		Je = {
			clearProps: function clearProps(t, e, r, i, n) {
				if ("isFromStart" !== n.data) {
					var a = t._pt = new ae(t._pt, e, r, 0, 0, Gd);
					return a.u = i, a.pr = -10, a.tween = n, t._props.push(r), 1
				}
			}
		},
		Ge = [1, 0, 0, 1, 0, 0],
		$e = {},
		Ze = function _parseTransform(t, e) {
			var r = t._gsap || new Lt(t);
			if ("x" in r && !e && !r.uncache) return r;
			var i, n, a, s, o, u, h, l, f, d, p, c, _, m, g, v, y, b, T, w, x, O, M, k, C, P, A, S, D, z, F, E, B = t.style,
				R = r.scaleX < 0,
				I = "deg",
				L = qd(t, Ye) || "0";
			return i = n = a = u = h = l = f = d = p = 0, s = o = 1, r.svg = !(!t.getCTM || !xd(t)), m = Md(t, r.svg), r.svg && (k = (!r.uncache || "0px 0px" === L) && !e && t.getAttribute("data-svg-origin"), Nd(t, k || L, !!k || r.originIsAbsolute, !1 !== r.smooth, m)), c = r.xOrigin || 0, _ = r.yOrigin || 0, m !== Ge && (b = m[0], T = m[1], w = m[2], x = m[3], i = O = m[4], n = M = m[5], 6 === m.length ? (s = Math.sqrt(b * b + T * T), o = Math.sqrt(x * x + w * w), u = b || T ? Re(T, b) * Ee : 0, (f = w || x ? Re(w, x) * Ee + u : 0) && (o *= Math.abs(Math.cos(f * Be))), r.svg && (i -= c - (c * b + _ * w), n -= _ - (c * T + _ * x))) : (E = m[6], z = m[7], A = m[8], S = m[9], D = m[10], F = m[11], i = m[12], n = m[13], a = m[14], h = (g = Re(E, D)) * Ee, g && (k = O * (v = Math.cos(-g)) + A * (y = Math.sin(-g)), C = M * v + S * y, P = E * v + D * y, A = O * -y + A * v, S = M * -y + S * v, D = E * -y + D * v, F = z * -y + F * v, O = k, M = C, E = P), l = (g = Re(-w, D)) * Ee, g && (v = Math.cos(-g), F = x * (y = Math.sin(-g)) + F * v, b = k = b * v - A * y, T = C = T * v - S * y, w = P = w * v - D * y), u = (g = Re(T, b)) * Ee, g && (k = b * (v = Math.cos(g)) + T * (y = Math.sin(g)), C = O * v + M * y, T = T * v - b * y, M = M * v - O * y, b = k, O = C), h && 359.9 < Math.abs(h) + Math.abs(u) && (h = u = 0, l = 180 - l), s = ca(Math.sqrt(b * b + T * T + w * w)), o = ca(Math.sqrt(M * M + E * E)), g = Re(O, M), f = 2e-4 < Math.abs(g) ? g * Ee : 0, p = F ? 1 / (F < 0 ? -F : F) : 0), r.svg && (k = t.getAttribute("transform"), r.forceCSS = t.setAttribute("transform", "") || !Kd(qd(t, Qe)), k && t.setAttribute("transform", k))), 90 < Math.abs(f) && Math.abs(f) < 270 && (R ? (s *= -1, f += u <= 0 ? 180 : -180, u += u <= 0 ? 180 : -180) : (o *= -1, f += f <= 0 ? 180 : -180)), r.x = i - ((r.xPercent = i && (r.xPercent || (Math.round(t.offsetWidth / 2) === Math.round(-i) ? -50 : 0))) ? t.offsetWidth * r.xPercent / 100 : 0) + "px", r.y = n - ((r.yPercent = n && (r.yPercent || (Math.round(t.offsetHeight / 2) === Math.round(-n) ? -50 : 0))) ? t.offsetHeight * r.yPercent / 100 : 0) + "px", r.z = a + "px", r.scaleX = ca(s), r.scaleY = ca(o), r.rotation = ca(u) + I, r.rotationX = ca(h) + I, r.rotationY = ca(l) + I, r.skewX = f + I, r.skewY = d + I, r.transformPerspective = p + "px", (r.zOrigin = parseFloat(L.split(" ")[2]) || 0) && (B[Ye] = Ke(L)), r.xOffset = r.yOffset = 0, r.force3D = Y.force3D, r.renderTransform = r.svg ? ir : ce ? rr : He, r.uncache = 0, r
		},
		Ke = function _firstTwoOnly(t) {
			return (t = t.split(" "))[0] + " " + t[1]
		},
		He = function _renderNon3DTransforms(t, e) {
			e.z = "0px", e.rotationY = e.rotationX = "0deg", e.force3D = 0, rr(t, e)
		},
		We = "0deg",
		tr = "0px",
		er = ") ",
		rr = function _renderCSSTransforms(t, e) {
			var r = e || this,
				i = r.xPercent,
				n = r.yPercent,
				a = r.x,
				s = r.y,
				o = r.z,
				u = r.rotation,
				h = r.rotationY,
				l = r.rotationX,
				f = r.skewX,
				d = r.skewY,
				p = r.scaleX,
				c = r.scaleY,
				_ = r.transformPerspective,
				m = r.force3D,
				g = r.target,
				v = r.zOrigin,
				y = "",
				b = "auto" === m && t && 1 !== t || !0 === m;
			if (v && (l !== We || h !== We)) {
				var T, w = parseFloat(h) * Be,
					x = Math.sin(w),
					O = Math.cos(w);
				w = parseFloat(l) * Be, T = Math.cos(w), a = Qd(g, a, x * T * -v), s = Qd(g, s, -Math.sin(w) * -v), o = Qd(g, o, O * T * -v + v)
			}
			_ !== tr && (y += "perspective(" + _ + er), (i || n) && (y += "translate(" + i + "%, " + n + "%) "), !b && a === tr && s === tr && o === tr || (y += o !== tr || b ? "translate3d(" + a + ", " + s + ", " + o + ") " : "translate(" + a + ", " + s + er), u !== We && (y += "rotate(" + u + er), h !== We && (y += "rotateY(" + h + er), l !== We && (y += "rotateX(" + l + er), f === We && d === We || (y += "skew(" + f + ", " + d + er), 1 === p && 1 === c || (y += "scale(" + p + ", " + c + er), g.style[Qe] = y || "translate(0, 0)"
		},
		ir = function _renderSVGTransforms(t, e) {
			var r, i, n, a, s, o = e || this,
				u = o.xPercent,
				h = o.yPercent,
				l = o.x,
				f = o.y,
				d = o.rotation,
				p = o.skewX,
				c = o.skewY,
				_ = o.scaleX,
				m = o.scaleY,
				g = o.target,
				v = o.xOrigin,
				y = o.yOrigin,
				b = o.xOffset,
				T = o.yOffset,
				w = o.forceCSS,
				x = parseFloat(l),
				O = parseFloat(f);
			d = parseFloat(d), p = parseFloat(p), (c = parseFloat(c)) && (p += c = parseFloat(c), d += c), d || p ? (d *= Be, p *= Be, r = Math.cos(d) * _, i = Math.sin(d) * _, n = Math.sin(d - p) * -m, a = Math.cos(d - p) * m, p && (c *= Be, s = Math.tan(p - c), n *= s = Math.sqrt(1 + s * s), a *= s, c && (s = Math.tan(c), r *= s = Math.sqrt(1 + s * s), i *= s)), r = ca(r), i = ca(i), n = ca(n), a = ca(a)) : (r = _, a = m, i = n = 0), (x && !~(l + "").indexOf("px") || O && !~(f + "").indexOf("px")) && (x = Bd(g, "x", l, "px"), O = Bd(g, "y", f, "px")), (v || y || b || T) && (x = ca(x + v - (v * r + y * n) + b), O = ca(O + y - (v * i + y * a) + T)), (u || h) && (s = g.getBBox(), x = ca(x + u / 100 * s.width), O = ca(O + h / 100 * s.height)), s = "matrix(" + r + "," + i + "," + n + "," + a + "," + x + "," + O + ")", g.setAttribute("transform", s), w && (g.style[Qe] = s)
		};
	ba("padding,margin,Width,Radius", function(e, r) {
		var t = "Right",
			i = "Bottom",
			n = "Left",
			o = (r < 3 ? ["Top", t, i, n] : ["Top" + n, "Top" + t, i + t, i + n]).map(function(t) {
				return r < 2 ? e + t : "border" + t + e
			});
		Je[1 < r ? "border" + e : e] = function(e, t, r, i, n) {
			var a, s;
			if (arguments.length < 4) return a = o.map(function(t) {
				return Cd(e, t, r)
			}), 5 === (s = a.join(" ")).split(a[0]).length ? a[0] : s;
			a = (i + "").split(" "), s = {}, o.forEach(function(t, e) {
				return s[t] = a[e] = a[e] || a[(e - 1) / 2 | 0]
			}), e.init(t, s, n)
		}
	});
	var nr, ar, sr, or = {
		name: "css",
		register: td,
		targetTest: function targetTest(t) {
			return t.style && t.nodeType
		},
		init: function init(t, e, r, i, n) {
			var a, s, u, h, l, f, d, p, c, _, m, g, v, y, b, T = this._props,
				w = t.style,
				x = r.vars.startAt;
			for (d in fe || td(), e)
				if ("autoRound" !== d && (s = e[d], !ft[d] || !Tb(d, e, r, i, t, n)))
					if (l = typeof s, f = Je[d], "function" === l && (l = typeof(s = s.call(r, i, t, n))), "string" === l && ~s.indexOf("random(") && (s = gb(s)), f) f(this, t, d, s, r) && (b = 1);
					else if ("--" === d.substr(0, 2)) a = (getComputedStyle(t).getPropertyValue(d) + "").trim(), s += "", Pt.lastIndex = 0, Pt.test(a) || (p = Qa(a), c = Qa(s)), c ? p !== c && (a = Bd(t, d, a, c) + c) : p && (s += p), this.add(w, "setProperty", a, s, i, n, 0, 0, d), T.push(d);
			else if ("undefined" !== l) {
				if (x && d in x ? (a = "function" == typeof x[d] ? x[d].call(r, i, t, n) : x[d], o(a) && ~a.indexOf("random(") && (a = gb(a)), Qa(a + "") || (a += Y.units[d] || Qa(Cd(t, d)) || ""), "=" === (a + "").charAt(1) && (a = Cd(t, d))) : a = Cd(t, d), h = parseFloat(a), (_ = "string" === l && "=" === s.charAt(1) ? +(s.charAt(0) + "1") : 0) && (s = s.substr(2)), u = parseFloat(s), d in Ne && ("autoAlpha" === d && (1 === h && "hidden" === Cd(t, "visibility") && u && (h = 0), zd(this, w, "visibility", h ? "inherit" : "hidden", u ? "inherit" : "hidden", !u)), "scale" !== d && "transform" !== d && ~(d = Ne[d]).indexOf(",") && (d = d.split(",")[0])), m = d in Fe)
					if (g || ((v = t._gsap).renderTransform && !e.parseTransform || Ze(t, e.parseTransform), y = !1 !== e.smoothOrigin && v.smooth, (g = this._pt = new ae(this._pt, w, Qe, 0, 1, v.renderTransform, v, 0, -1)).dep = 1), "scale" === d) this._pt = new ae(this._pt, v, "scaleY", v.scaleY, (_ ? _ * u : u - v.scaleY) || 0), T.push("scaleY", d), d += "X";
					else {
						if ("transformOrigin" === d) {
							s = Fd(s), v.svg ? Nd(t, s, 0, y, 0, this) : ((c = parseFloat(s.split(" ")[2]) || 0) !== v.zOrigin && zd(this, v, "zOrigin", v.zOrigin, c), zd(this, w, d, Ke(a), Ke(s)));
							continue
						}
						if ("svgOrigin" === d) {
							Nd(t, s, 1, y, 0, this);
							continue
						}
						if (d in $e) {
							Xd(this, v, d, h, s, _);
							continue
						}
						if ("smoothOrigin" === d) {
							zd(this, v, "smooth", v.smooth, s);
							continue
						}
						if ("force3D" === d) {
							v[d] = s;
							continue
						}
						if ("transform" === d) {
							Zd(this, s, t);
							continue
						}
					}
				else d in w || (d = Xe(d) || d);
				if (m || (u || 0 === u) && (h || 0 === h) && !qe.test(s) && d in w) u = u || 0, (p = (a + "").substr((h + "").length)) !== (c = Qa(s) || (d in Y.units ? Y.units[d] : p)) && (h = Bd(t, d, a, c)), this._pt = new ae(this._pt, m ? v : w, d, h, _ ? _ * u : u - h, m || "px" !== c && "zIndex" !== d || !1 === e.autoRound ? ad : dd), this._pt.u = c || 0, p !== c && "%" !== c && (this._pt.b = a, this._pt.r = cd);
				else if (d in w) Dd.call(this, t, d, a, s);
				else {
					if (!(d in t)) {
						N(d, s);
						continue
					}
					this.add(t, d, a || t[d], s, i, n)
				}
				T.push(d)
			}
			b && ne(this)
		},
		get: Cd,
		aliases: Ne,
		getSetter: function getSetter(t, e, i) {
			var n = Ne[e];
			return n && n.indexOf(",") < 0 && (e = n), e in Fe && e !== Ye && (t._gsap.x || Cd(t, "x")) ? i && pe === i ? "scale" === e ? jd : id : (pe = i || {}) && ("scale" === e ? kd : ld) : t.style && !r(t.style[e]) ? gd : ~e.indexOf("-") ? hd : Kt(t, e)
		},
		core: {
			_removeProperty: yd,
			_getMatrix: Md
		}
	};
	oe.utils.checkPrefix = Xe, sr = ba((nr = "x,y,z,scale,scaleX,scaleY,xPercent,yPercent") + "," + (ar = "rotation,rotationX,rotationY,skewX,skewY") + ",transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective", function(t) {
		Fe[t] = 1
	}), ba(ar, function(t) {
		Y.units[t] = "deg", $e[t] = 1
	}), Ne[sr[13]] = nr + "," + ar, ba("0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY", function(t) {
		var e = t.split(":");
		Ne[e[1]] = sr[e[0]]
	}), ba("x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective", function(t) {
		Y.units[t] = "px"
	}), oe.registerPlugin(or);
	var ur = oe.registerPlugin(or) || oe,
		hr = ur.core.Tween;
	e.Back = Ce, e.Bounce = Ae, e.CSSPlugin = or, e.Circ = ze, e.Cubic = we, e.Elastic = ke, e.Expo = De, e.Linear = be, e.Power0 = _e, e.Power1 = me, e.Power2 = ge, e.Power3 = ve, e.Power4 = ye, e.Quad = Te, e.Quart = xe, e.Quint = Oe, e.Sine = Se, e.SteppedEase = Pe, e.Strong = Me, e.TimelineLite = Nt, e.TimelineMax = Nt, e.TweenLite = Jt, e.TweenMax = hr, e.default = ur, e.gsap = ur;
	if (typeof(window) === "undefined" || window !== e) {
		Object.defineProperty(e, "__esModule", {
			value: !0
		})
	} else {
		delete e.default
	}
});
/*!
 * ScrollTrigger 3.9.1
 * https://greensock.com
 * 
 * @license Copyright 2021, GreenSock. All rights reserved.
 * Subject to the terms at https://greensock.com/standard-license or for Club GreenSock members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
 */
! function(e, r) {
	"object" == typeof exports && "undefined" != typeof module ? r(exports) : "function" == typeof define && define.amd ? define(["exports"], r) : r((e = e || self).window = e.window || {})
}(this, function(e) {
	"use strict";

	function H(e) {
		return e
	}

	function I(e) {
		return Ve(e)[0] || (rr(e) && !1 !== Re.config().nullTargetWarn ? console.warn("Element not found:", e) : null)
	}

	function J(e) {
		return Math.round(1e5 * e) / 1e5 || 0
	}

	function K() {
		return "undefined" != typeof window
	}

	function L() {
		return Re || K() && (Re = window.gsap) && Re.registerPlugin && Re
	}

	function M(e) {
		return !!~i.indexOf(e)
	}

	function N(e, r) {
		return ~Ue.indexOf(e) && Ue[Ue.indexOf(e) + 1][r]
	}

	function O(r, e) {
		var t = e.s,
			n = e.sc,
			i = g.indexOf(r),
			o = n === gr.sc ? 1 : 2;
		return ~i || (i = g.push(r) - 1), g[i + o] || (g[i + o] = N(r, t) || (M(r) ? n : function(e) {
			return arguments.length ? r[t] = e : r[t]
		}))
	}

	function P(e) {
		return N(e, "getBoundingClientRect") || (M(e) ? function() {
			return wr.width = ze.innerWidth, wr.height = ze.innerHeight, wr
		} : function() {
			return hr(e)
		})
	}

	function S(e, r) {
		var t = r.s,
			n = r.d2,
			i = r.d,
			o = r.a;
		return (t = "scroll" + n) && (o = N(e, t)) ? o() - P(e)()[i] : M(e) ? (Fe[t] || We[t]) - (ze["inner" + n] || We["client" + n] || Fe["client" + n]) : e[t] - e["offset" + n]
	}

	function T(e, r) {
		for (var t = 0; t < f.length; t += 3) r && !~r.indexOf(f[t + 1]) || e(f[t], f[t + 1], f[t + 2])
	}

	function V(e) {
		return "function" == typeof e
	}

	function W(e) {
		return "number" == typeof e
	}

	function X(e) {
		return "object" == typeof e
	}

	function Y(e) {
		return V(e) && e()
	}

	function Z(t, n) {
		return function() {
			var e = Y(t),
				r = Y(n);
			return function() {
				Y(e), Y(r)
			}
		}
	}

	function $(e, r, t) {
		return e && e.progress(r ? 0 : 1) && t && e.pause()
	}

	function _(e, r) {
		if (e.enabled) {
			var t = r(e);
			t && t.totalTime && (e.callbackAnimation = t)
		}
	}

	function ua(e) {
		return ze.getComputedStyle(e)
	}

	function wa(e, r) {
		for (var t in r) t in e || (e[t] = r[t]);
		return e
	}

	function ya(e, r) {
		var t = r.d2;
		return e["offset" + t] || e["client" + t] || 0
	}

	function za(e) {
		var r, t = [],
			n = e.labels,
			i = e.duration();
		for (r in n) t.push(n[r] / i);
		return t
	}

	function Ba(i) {
		var o = Re.utils.snap(i),
			a = Array.isArray(i) && i.slice(0).sort(function(e, r) {
				return e - r
			});
		return a ? function(e, r, t) {
			var n;
			if (void 0 === t && (t = .001), !r) return o(e);
			if (0 < r) {
				for (e -= t, n = 0; n < a.length; n++)
					if (a[n] >= e) return a[n];
				return a[n - 1]
			}
			for (n = a.length, e += t; n--;)
				if (a[n] <= e) return a[n];
			return a[0]
		} : function(e, r, t) {
			void 0 === t && (t = .001);
			var n = o(e);
			return !r || Math.abs(n - e) < t || n - e < 0 == r < 0 ? n : o(r < 0 ? e - i : e + i)
		}
	}

	function Da(r, t, e, n) {
		return e.split(",").forEach(function(e) {
			return r(t, e, n)
		})
	}

	function Ea(e, r, t) {
		return e.addEventListener(r, t, {
			passive: !0
		})
	}

	function Fa(e, r, t) {
		return e.removeEventListener(r, t)
	}

	function Ja(e, r) {
		if (rr(e)) {
			var t = e.indexOf("="),
				n = ~t ? (e.charAt(t - 1) + 1) * parseFloat(e.substr(t + 1)) : 0;
			~t && (e.indexOf("%") > t && (n *= r / 100), e = e.substr(0, t - 1)), e = n + (e in b ? b[e] * r : ~e.indexOf("%") ? parseFloat(e) * r / 100 : parseFloat(e) || 0)
		}
		return e
	}

	function Ka(e, r, t, n, i, o, a, s) {
		var l = i.startColor,
			c = i.endColor,
			u = i.fontSize,
			f = i.indent,
			p = i.fontWeight,
			d = Le.createElement("div"),
			g = M(t) || "fixed" === N(t, "pinType"),
			h = -1 !== e.indexOf("scroller"),
			v = g ? Fe : t,
			m = -1 !== e.indexOf("start"),
			b = m ? l : c,
			x = "border-color:" + b + ";font-size:" + u + ";color:" + b + ";font-weight:" + p + ";pointer-events:none;white-space:nowrap;font-family:sans-serif,Arial;z-index:1000;padding:4px 8px;border-width:0;border-style:solid;";
		return x += "position:" + ((h || s) && g ? "fixed;" : "absolute;"), !h && !s && g || (x += (n === gr ? y : w) + ":" + (o + parseFloat(f)) + "px;"), a && (x += "box-sizing:border-box;text-align:left;width:" + a.offsetWidth + "px;"), d._isStart = m, d.setAttribute("class", "gsap-marker-" + e + (r ? " marker-" + r : "")), d.style.cssText = x, d.innerText = r || 0 === r ? e + "-" + r : e, v.children[0] ? v.insertBefore(d, v.children[0]) : v.appendChild(d), d._offset = d["offset" + n.op.d2], E(d, 0, n, m), d
	}

	function Oa() {
		return 34 < Ze() - Ge && j()
	}

	function Pa() {
		j(), Ge || A("scrollStart"), Ge = Ze()
	}

	function Qa() {
		return !Xe && !t && !Le.fullscreenElement && a.restart(!0)
	}

	function Wa(e) {
		var r, t = Re.ticker.frame,
			n = [],
			i = 0;
		if (p !== t || qe) {
			for (z(); i < C.length; i += 4)(r = ze.matchMedia(C[i]).matches) !== C[i + 3] && ((C[i + 3] = r) ? n.push(i) : z(1, C[i]) || V(C[i + 2]) && C[i + 2]());
			for (R(), i = 0; i < n.length; i++) r = n[i], Qe = C[r], C[r + 2] = C[r + 1](e);
			Qe = 0, o && F(0, 1), p = t, A("matchMedia")
		}
	}

	function Xa() {
		return Fa(ee, "scrollEnd", Xa) || F(!0)
	}

	function ab() {
		return g.forEach(function(e) {
			return "function" == typeof e && (e.rec = 0)
		})
	}

	function jb(e, r, t, n) {
		if (e.parentNode !== r) {
			for (var i, o = Q.length, a = r.style, s = e.style; o--;) a[i = Q[o]] = t[i];
			a.position = "absolute" === t.position ? "absolute" : "relative", "inline" === t.display && (a.display = "inline-block"), s[w] = s[y] = a.flexBasis = "auto", a.overflow = "visible", a.boxSizing = "border-box", a[nr] = ya(e, dr) + pr, a[ir] = ya(e, gr) + pr, a[cr] = s[ur] = s.top = s[v] = "0", Sr(n), s[nr] = s.maxWidth = t[nr], s[ir] = s.maxHeight = t[ir], s[cr] = t[cr], e.parentNode.insertBefore(r, e), r.appendChild(e)
		}
	}

	function mb(e) {
		for (var r = q.length, t = e.style, n = [], i = 0; i < r; i++) n.push(q[i], t[q[i]]);
		return n.t = e, n
	}

	function pb(e, r, t, n, i, o, a, s, l, c, u, f, p) {
		V(e) && (e = e(s)), rr(e) && "max" === e.substr(0, 3) && (e = f + ("=" === e.charAt(4) ? Ja("0" + e.substr(3), t) : 0));
		var d, g, h, v = p ? p.time() : 0;
		if (p && p.seek(0), W(e)) a && E(a, t, n, !0);
		else {
			V(r) && (r = r(s));
			var m, b, x, y, S = e.split(" ");
			h = I(r) || Fe, (m = hr(h) || {}) && (m.left || m.top) || "none" !== ua(h).display || (y = h.style.display, h.style.display = "block", m = hr(h), y ? h.style.display = y : h.style.removeProperty("display")), b = Ja(S[0], m[n.d]), x = Ja(S[1] || "0", t), e = m[n.p] - l[n.p] - c + b + i - x, a && E(a, x, n, t - x < 20 || a._isStart && 20 < x), t -= t - x
		}
		if (o) {
			var w = e + t,
				T = o._isStart;
			d = "scroll" + n.d2, E(o, w, n, T && 20 < w || !T && (u ? Math.max(Fe[d], We[d]) : o.parentNode[d]) <= w + 1), u && (l = hr(a), u && (o.style[n.op.p] = l[n.op.p] - n.op.m - o._offset + pr))
		}
		return p && h && (d = hr(h), p.seek(f), g = hr(h), p._caScrollDist = d[n.p] - g[n.p], e = e / p._caScrollDist * f), p && p.seek(v), p ? e : Math.round(e)
	}

	function rb(e, r, t, n) {
		if (e.parentNode !== r) {
			var i, o, a = e.style;
			if (r === Fe) {
				for (i in e._stOrig = a.cssText, o = ua(e)) + i || G.test(i) || !o[i] || "string" != typeof a[i] || "0" === i || (a[i] = o[i]);
				a.top = t, a.left = n
			} else a.cssText = e._stOrig;
			Re.core.getCache(e).uncache = 1, r.appendChild(e)
		}
	}

	function sb(l, e) {
		function xf(e, r, t, n, i) {
			var o = xf.tween,
				a = r.onComplete,
				s = {};
			return o && o.kill(), c = Math.round(t), r[p] = e, (r.modifiers = s)[p] = function(e) {
				return (e = J(f())) !== c && e !== u && 2 < Math.abs(e - c) && 2 < Math.abs(e - u) ? (o.kill(), xf.tween = 0) : e = t + n * o.ratio + i * o.ratio * o.ratio, u = c, c = J(e)
			}, r.onComplete = function() {
				xf.tween = 0, a && a.call(o)
			}, o = xf.tween = Re.to(l, r)
		}
		var c, u, f = O(l, e),
			p = "_scroll" + e.p2;
		return l[p] = f, Ea(l, "wheel", function() {
			return xf.tween && xf.tween.kill() && (xf.tween = 0)
		}), xf
	}
	var Re, o, ze, Le, We, Fe, i, a, Ve, De, He, s, Xe, je, l, Je, c, u, f, Ke, Ye, t, $e, Qe, p, d, qe = 1,
		Ue = [],
		g = [],
		Ze = Date.now,
		h = Ze(),
		Ge = 0,
		er = 1,
		rr = function _isString(e) {
			return "string" == typeof e
		},
		tr = Math.abs,
		r = "scrollLeft",
		n = "scrollTop",
		v = "left",
		y = "right",
		w = "bottom",
		nr = "width",
		ir = "height",
		or = "Right",
		ar = "Left",
		sr = "Top",
		lr = "Bottom",
		cr = "padding",
		ur = "margin",
		fr = "Width",
		m = "Height",
		pr = "px",
		dr = {
			s: r,
			p: v,
			p2: ar,
			os: y,
			os2: or,
			d: nr,
			d2: fr,
			a: "x",
			sc: function sc(e) {
				return arguments.length ? ze.scrollTo(e, gr.sc()) : ze.pageXOffset || Le[r] || We[r] || Fe[r] || 0
			}
		},
		gr = {
			s: n,
			p: "top",
			p2: sr,
			os: w,
			os2: lr,
			d: ir,
			d2: m,
			a: "y",
			op: dr,
			sc: function sc(e) {
				return arguments.length ? ze.scrollTo(dr.sc(), e) : ze.pageYOffset || Le[n] || We[n] || Fe[n] || 0
			}
		},
		hr = function _getBounds(e, r) {
			var t = r && "matrix(1, 0, 0, 1, 0, 0)" !== ua(e)[l] && Re.to(e, {
					x: 0,
					y: 0,
					xPercent: 0,
					yPercent: 0,
					rotation: 0,
					rotationX: 0,
					rotationY: 0,
					scale: 1,
					skewX: 0,
					skewY: 0
				}).progress(1),
				n = e.getBoundingClientRect();
			return t && t.progress(0).kill(), n
		},
		vr = {
			startColor: "green",
			endColor: "red",
			indent: 0,
			fontSize: "16px",
			fontWeight: "normal"
		},
		mr = {
			toggleActions: "play",
			anticipatePin: 0
		},
		b = {
			top: 0,
			left: 0,
			center: .5,
			bottom: 1,
			right: 1
		},
		E = function _positionMarker(e, r, t, n) {
			var i = {
					display: "block"
				},
				o = t[n ? "os2" : "p2"],
				a = t[n ? "p2" : "os2"];
			e._isFlipped = n, i[t.a + "Percent"] = n ? -100 : 0, i[t.a] = n ? "1px" : 0, i["border" + o + fr] = 1, i["border" + a + fr] = 0, i[t.p] = r + "px", Re.set(e, i)
		},
		br = [],
		xr = {},
		x = {},
		k = [],
		C = [],
		A = function _dispatch(e) {
			return x[e] && x[e].map(function(e) {
				return e()
			}) || k
		},
		B = [],
		R = function _revertRecorded(e) {
			for (var r = 0; r < B.length; r += 5) e && B[r + 4] !== e || (B[r].style.cssText = B[r + 1], B[r].getBBox && B[r].setAttribute("transform", B[r + 2] || ""), B[r + 3].uncache = 1)
		},
		z = function _revertAll(e, r) {
			var t;
			for (Je = 0; Je < br.length; Je++) t = br[Je], r && t.media !== r || (e ? t.kill(1) : t.revert());
			r && R(r), r || A("revert")
		},
		F = function _refreshAll(e, r) {
			if (!Ge || e) {
				d = !0;
				var t = A("refreshInit");
				Ke && ee.sort(), r || z(), br.forEach(function(e) {
					return e.refresh()
				}), br.forEach(function(e) {
					return "max" === e.vars.end && e.setPositions(e.start, S(e.scroller, e._dir))
				}), t.forEach(function(e) {
					return e && e.render && e.render(-1)
				}), ab(), a.pause(), d = !1, A("refresh")
			} else Ea(ee, "scrollEnd", Xa)
		},
		D = 0,
		yr = 1,
		j = function _updateAll() {
			if (!d) {
				var e = br.length,
					r = Ze(),
					t = 50 <= r - h,
					n = e && br[0].scroll();
				if (yr = n < D ? -1 : 1, D = n, t && (Ge && !je && 200 < r - Ge && (Ge = 0, A("scrollEnd")), He = h, h = r), yr < 0) {
					for (Je = e; 0 < Je--;) br[Je] && br[Je].update(0, t);
					yr = 1
				} else
					for (Je = 0; Je < e; Je++) br[Je] && br[Je].update(0, t)
			}
		},
		Q = [v, "top", w, y, ur + lr, ur + or, ur + sr, ur + ar, "display", "flexShrink", "float", "zIndex", "gridColumnStart", "gridColumnEnd", "gridRowStart", "gridRowEnd", "gridArea", "justifySelf", "alignSelf", "placeSelf", "order"],
		q = Q.concat([nr, ir, "boxSizing", "max" + fr, "max" + m, "position", ur, cr, cr + sr, cr + or, cr + lr, cr + ar]),
		U = /([A-Z])/g,
		Sr = function _setState(e) {
			if (e) {
				var r, t, n = e.t.style,
					i = e.length,
					o = 0;
				for ((e.t._gsap || Re.core.getCache(e.t)).uncache = 1; o < i; o += 2) t = e[o + 1], r = e[o], t ? n[r] = t : n[r] && n.removeProperty(r.replace(U, "-$1").toLowerCase())
			}
		},
		wr = {
			left: 0,
			top: 0
		},
		G = /(?:webkit|moz|length|cssText|inset)/i;
	dr.op = gr;
	var ee = (ScrollTrigger.prototype.init = function init(E, k) {
		if (this.progress = this.start = 0, this.vars && this.kill(1), er) {
			var m, n, f, C, A, B, R, z, L, F, D, e, j, J, K, Y, Q, r, q, b, U, Z, x, G, y, w, t, T, ee, re, i, p, te, ne, ie, oe, ae, se = (E = wa(rr(E) || W(E) || E.nodeType ? {
					trigger: E
				} : E, mr)).onUpdate,
				le = E.toggleClass,
				o = E.id,
				ce = E.onToggle,
				ue = E.onRefresh,
				fe = E.scrub,
				pe = E.trigger,
				de = E.pin,
				ge = E.pinSpacing,
				he = E.invalidateOnRefresh,
				ve = E.anticipatePin,
				a = E.onScrubComplete,
				d = E.onSnapComplete,
				me = E.once,
				be = E.snap,
				xe = E.pinReparent,
				s = E.pinSpacer,
				ye = E.containerAnimation,
				Se = E.fastScrollEnd,
				we = E.preventOverlaps,
				Te = E.horizontal || E.containerAnimation && !1 !== E.horizontal ? dr : gr,
				Ee = !fe && 0 !== fe,
				Oe = I(E.scroller || ze),
				l = Re.core.getCache(Oe),
				_e = M(Oe),
				ke = "fixed" === ("pinType" in E ? E.pinType : N(Oe, "pinType") || _e && "fixed"),
				Ce = [E.onEnter, E.onLeave, E.onEnterBack, E.onLeaveBack],
				Me = Ee && E.toggleActions.split(" "),
				c = "markers" in E ? E.markers : mr.markers,
				Pe = _e ? 0 : parseFloat(ua(Oe)["border" + Te.p2 + fr]) || 0,
				Ie = this,
				u = E.onRefreshInit && function() {
					return E.onRefreshInit(Ie)
				},
				Ae = function _getSizeFunc(e, r, t) {
					var n = t.d,
						i = t.d2,
						o = t.a;
					return (o = N(e, "getBoundingClientRect")) ? function() {
						return o()[n]
					} : function() {
						return (r ? ze["inner" + i] : e["client" + i]) || 0
					}
				}(Oe, _e, Te),
				Ne = function _getOffsetsFunc(e, r) {
					return !r || ~Ue.indexOf(e) ? P(e) : function() {
						return wr
					}
				}(Oe, _e),
				g = 0,
				Be = O(Oe, Te);
			if (Ie.media = Qe, Ie._dir = Te, ve *= 45, Ie.scroller = Oe, Ie.scroll = ye ? ye.time.bind(ye) : Be, C = Be(), Ie.vars = E, k = k || E.animation, "refreshPriority" in E && (Ke = 1), l.tweenScroll = l.tweenScroll || {
					top: sb(Oe, gr),
					left: sb(Oe, dr)
				}, Ie.tweenTo = m = l.tweenScroll[Te.p], k && (k.vars.lazy = !1, k._initted || !1 !== k.vars.immediateRender && !1 !== E.immediateRender && k.render(0, !0, !0), Ie.animation = k.pause(), k.scrollTrigger = Ie, (i = W(fe) && fe) && (re = Re.to(k, {
					ease: "power3",
					duration: i,
					onComplete: function onComplete() {
						return a && a(Ie)
					}
				})), T = 0, o = o || k.vars.id), br.push(Ie), be && (X(be) && !be.push || (be = {
					snapTo: be
				}), "scrollBehavior" in Fe.style && Re.set(_e ? [Fe, We] : Oe, {
					scrollBehavior: "auto"
				}), f = V(be.snapTo) ? be.snapTo : "labels" === be.snapTo ? function _getClosestLabel(r) {
					return function(e) {
						return Re.utils.snap(za(r), e)
					}
				}(k) : "labelsDirectional" === be.snapTo ? function _getLabelAtDirection(t) {
					return function(e, r) {
						return Ba(za(t))(e, r.direction)
					}
				}(k) : !1 !== be.directional ? function(e, r) {
					return Ba(be.snapTo)(e, r.direction)
				} : Re.utils.snap(be.snapTo), p = be.duration || {
					min: .1,
					max: 2
				}, p = X(p) ? De(p.min, p.max) : De(p, p), te = Re.delayedCall(be.delay || i / 2 || .1, function() {
					if (Math.abs(Ie.getVelocity()) < 10 && !je && g !== Be()) {
						var e = k && !Ee ? k.totalProgress() : Ie.progress,
							r = (e - ee) / (Ze() - He) * 1e3 || 0,
							t = Re.utils.clamp(-Ie.progress, 1 - Ie.progress, tr(r / 2) * r / .185),
							n = Ie.progress + (!1 === be.inertia ? 0 : t),
							i = De(0, 1, f(n, Ie)),
							o = Be(),
							a = Math.round(B + i * j),
							s = be.onStart,
							l = be.onInterrupt,
							c = be.onComplete,
							u = m.tween;
						if (o <= R && B <= o && a !== o) {
							if (u && !u._initted && u.data <= tr(a - o)) return;
							!1 === be.inertia && (t = i - Ie.progress), m(a, {
								duration: p(tr(.185 * Math.max(tr(n - e), tr(i - e)) / r / .05 || 0)),
								ease: be.ease || "power3",
								data: tr(a - o),
								onInterrupt: function onInterrupt() {
									return te.restart(!0) && l && l(Ie)
								},
								onComplete: function onComplete() {
									Ie.update(), g = Be(), T = ee = k && !Ee ? k.totalProgress() : Ie.progress, d && d(Ie), c && c(Ie)
								}
							}, o, t * j, a - o - t * j), s && s(Ie, m.tween)
						}
					} else Ie.isActive && te.restart(!0)
				}).pause()), o && (xr[o] = Ie), pe = Ie.trigger = I(pe || de), de = !0 === de ? pe : I(de), rr(le) && (le = {
					targets: pe,
					className: le
				}), de && (!1 === ge || ge === ur || (ge = !(!ge && "flex" === ua(de.parentNode).display) && cr), Ie.pin = de, !1 !== E.force3D && Re.set(de, {
					force3D: !0
				}), (n = Re.core.getCache(de)).spacer ? J = n.pinState : (s && ((s = I(s)) && !s.nodeType && (s = s.current || s.nativeElement), n.spacerIsNative = !!s, s && (n.spacerState = mb(s))), n.spacer = Q = s || Le.createElement("div"), Q.classList.add("pin-spacer"), o && Q.classList.add("pin-spacer-" + o), n.pinState = J = mb(de)), Ie.spacer = Q = n.spacer, t = ua(de), x = t[ge + Te.os2], q = Re.getProperty(de), b = Re.quickSetter(de, Te.a, pr), jb(de, Q, t), Y = mb(de)), c && (e = X(c) ? wa(c, vr) : vr, F = Ka("scroller-start", o, Oe, Te, e, 0), D = Ka("scroller-end", o, Oe, Te, e, 0, F), r = F["offset" + Te.op.d2], z = Ka("start", o, Oe, Te, e, r, 0, ye), L = Ka("end", o, Oe, Te, e, r, 0, ye), ye && (ae = Re.quickSetter([z, L], Te.a, pr)), ke || Ue.length && !0 === N(Oe, "fixedMarkers") || (function _makePositionable(e) {
					var r = ua(e).position;
					e.style.position = "absolute" === r || "fixed" === r ? r : "relative"
				}(_e ? Fe : Oe), Re.set([F, D], {
					force3D: !0
				}), y = Re.quickSetter(F, Te.a, pr), w = Re.quickSetter(D, Te.a, pr))), ye) {
				var h = ye.vars.onUpdate,
					v = ye.vars.onUpdateParams;
				ye.eventCallback("onUpdate", function() {
					Ie.update(0, 0, 1), h && h.apply(v || [])
				})
			}
			Ie.previous = function() {
				return br[br.indexOf(Ie) - 1]
			}, Ie.next = function() {
				return br[br.indexOf(Ie) + 1]
			}, Ie.revert = function(e) {
				var r = !1 !== e || !Ie.enabled,
					t = Xe;
				r !== Ie.isReverted && (r && (Ie.scroll.rec || (Ie.scroll.rec = Be()), ie = Math.max(Be(), Ie.scroll.rec || 0), ne = Ie.progress, oe = k && k.progress()), z && [z, L, F, D].forEach(function(e) {
					return e.style.display = r ? "none" : "block"
				}), r && (Xe = 1), Ie.update(r), Xe = t, de && (r ? function _swapPinOut(e, r, t) {
					Sr(t);
					var n = e._gsap;
					if (n.spacerIsNative) Sr(n.spacerState);
					else if (e.parentNode === r) {
						var i = r.parentNode;
						i && (i.insertBefore(e, r), i.removeChild(r))
					}
				}(de, Q, J) : xe && Ie.isActive || jb(de, Q, ua(de), G)), Ie.isReverted = r)
			}, Ie.refresh = function(e, r) {
				if (!Xe && Ie.enabled || r)
					if (de && e && Ge) Ea(ScrollTrigger, "scrollEnd", Xa);
					else {
						Xe = 1, re && re.pause(), he && k && k.time(-.01, !0).invalidate(), Ie.isReverted || Ie.revert();
						for (var t, n, i, o, a, s, l, c, u, f, p = Ae(), d = Ne(), g = ye ? ye.duration() : S(Oe, Te), h = 0, v = 0, m = E.end, b = E.endTrigger || pe, x = E.start || (0 !== E.start && pe ? de ? "0 0" : "0 100%" : 0), y = E.pinnedContainer && I(E.pinnedContainer), w = pe && Math.max(0, br.indexOf(Ie)) || 0, T = w; T--;)(s = br[T]).end || s.refresh(0, 1) || (Xe = 1), !(l = s.pin) || l !== pe && l !== de || s.isReverted || ((f = f || []).unshift(s), s.revert());
						for (V(x) && (x = x(Ie)), B = pb(x, pe, p, Te, Be(), z, F, Ie, d, Pe, ke, g, ye) || (de ? -.001 : 0), V(m) && (m = m(Ie)), rr(m) && !m.indexOf("+=") && (~m.indexOf(" ") ? m = (rr(x) ? x.split(" ")[0] : "") + m : (h = Ja(m.substr(2), p), m = rr(x) ? x : B + h, b = pe)), R = Math.max(B, pb(m || (b ? "100% 0" : g), b, p, Te, Be() + h, L, D, Ie, d, Pe, ke, g, ye)) || -.001, j = R - B || (B -= .01) && .001, h = 0, T = w; T--;)(l = (s = br[T]).pin) && s.start - s._pinPush < B && !ye && (t = s.end - s.start, l !== pe && l !== y || W(x) || (h += t * (1 - s.progress)), l === de && (v += t));
						if (B += h, R += h, Ie._pinPush = v, z && h && ((t = {})[Te.a] = "+=" + h, y && (t[Te.p] = "-=" + Be()), Re.set([z, L], t)), de) t = ua(de), o = Te === gr, i = Be(), U = parseFloat(q(Te.a)) + v, !g && 1 < R && ((_e ? Fe : Oe).style["overflow-" + Te.a] = "scroll"), jb(de, Q, t), Y = mb(de), n = hr(de, !0), c = ke && O(Oe, o ? dr : gr)(), ge && ((G = [ge + Te.os2, j + v + pr]).t = Q, (T = ge === cr ? ya(de, Te) + j + v : 0) && G.push(Te.d, T + pr), Sr(G), ke && Be(ie)), ke && ((a = {
							top: n.top + (o ? i - B : c) + pr,
							left: n.left + (o ? c : i - B) + pr,
							boxSizing: "border-box",
							position: "fixed"
						})[nr] = a.maxWidth = Math.ceil(n.width) + pr, a[ir] = a.maxHeight = Math.ceil(n.height) + pr, a[ur] = a[ur + sr] = a[ur + or] = a[ur + lr] = a[ur + ar] = "0", a[cr] = t[cr], a[cr + sr] = t[cr + sr], a[cr + or] = t[cr + or], a[cr + lr] = t[cr + lr], a[cr + ar] = t[cr + ar], K = function _copyState(e, r, t) {
							for (var n, i = [], o = e.length, a = t ? 8 : 0; a < o; a += 2) n = e[a], i.push(n, n in r ? r[n] : e[a + 1]);
							return i.t = e.t, i
						}(J, a, xe)), k ? (u = k._initted, Ye(1), k.render(k.duration(), !0, !0), Z = q(Te.a) - U + j + v, j !== Z && K.splice(K.length - 2, 2), k.render(0, !0, !0), u || k.invalidate(), Ye(0)) : Z = j;
						else if (pe && Be() && !ye)
							for (n = pe.parentNode; n && n !== Fe;) n._pinOffset && (B -= n._pinOffset, R -= n._pinOffset), n = n.parentNode;
						f && f.forEach(function(e) {
							return e.revert(!1)
						}), Ie.start = B, Ie.end = R, C = A = Be(), ye || (C < ie && Be(ie), Ie.scroll.rec = 0), Ie.revert(!1), Xe = 0, k && Ee && k._initted && k.progress() !== oe && k.progress(oe, !0).render(k.time(), !0, !0), ne === Ie.progress && !ye || (k && !Ee && k.totalProgress(ne, !0), Ie.progress = ne, Ie.update(0, 0, 1)), de && ge && (Q._pinOffset = Math.round(Ie.progress * Z)), ue && ue(Ie)
					}
			}, Ie.getVelocity = function() {
				return (Be() - A) / (Ze() - He) * 1e3 || 0
			}, Ie.endAnimation = function() {
				$(Ie.callbackAnimation), k && (re ? re.progress(1) : k.paused() ? Ee || $(k, Ie.direction < 0, 1) : $(k, k.reversed()))
			}, Ie.labelToScroll = function(e) {
				return k && k.labels && (B || Ie.refresh() || B) + k.labels[e] / k.duration() * j || 0
			}, Ie.getTrailing = function(r) {
				var e = br.indexOf(Ie),
					t = 0 < Ie.direction ? br.slice(0, e).reverse() : br.slice(e + 1);
				return rr(r) ? t.filter(function(e) {
					return e.vars.preventOverlaps === r
				}) : t
			}, Ie.update = function(e, r, t) {
				if (!ye || t || e) {
					var n, i, o, a, s, l, c, u = Ie.scroll(),
						f = e ? 0 : (u - B) / j,
						p = f < 0 ? 0 : 1 < f ? 1 : f || 0,
						d = Ie.progress;
					if (r && (A = C, C = ye ? Be() : u, be && (ee = T, T = k && !Ee ? k.totalProgress() : p)), ve && !p && de && !Xe && !qe && Ge && B < u + (u - A) / (Ze() - He) * ve && (p = 1e-4), p !== d && Ie.enabled) {
						if (a = (s = (n = Ie.isActive = !!p && p < 1) != (!!d && d < 1)) || !!p != !!d, Ie.direction = d < p ? 1 : -1, Ie.progress = p, a && !Xe && (i = p && !d ? 0 : 1 === p ? 1 : 1 === d ? 2 : 3, Ee && (o = !s && "none" !== Me[i + 1] && Me[i + 1] || Me[i], c = k && ("complete" === o || "reset" === o || o in k))), we && s && (c || fe || !k) && (V(we) ? we(Ie) : Ie.getTrailing(we).forEach(function(e) {
								return e.endAnimation()
							})), Ee || (!re || Xe || qe ? k && k.totalProgress(p, !!Xe) : (re.vars.totalProgress = p, re.invalidate().restart())), de)
							if (e && ge && (Q.style[ge + Te.os2] = x), ke) {
								if (a) {
									if (l = !e && d < p && u < R + 1 && u + 1 >= S(Oe, Te), xe)
										if (e || !n && !l) rb(de, Q);
										else {
											var g = hr(de, !0),
												h = u - B;
											rb(de, Fe, g.top + (Te === gr ? h : 0) + pr, g.left + (Te === gr ? 0 : h) + pr)
										} Sr(n || l ? K : Y), Z !== j && p < 1 && n || b(U + (1 !== p || l ? 0 : Z))
								}
							} else b(U + Z * p);
						!be || m.tween || Xe || qe || te.restart(!0), le && (s || me && p && (p < 1 || !$e)) && Ve(le.targets).forEach(function(e) {
							return e.classList[n || me ? "add" : "remove"](le.className)
						}), !se || Ee || e || se(Ie), a && !Xe ? (Ee && (c && ("complete" === o ? k.pause().totalProgress(1) : "reset" === o ? k.restart(!0).pause() : "restart" === o ? k.restart(!0) : k[o]()), se && se(Ie)), !s && $e || (ce && s && _(Ie, ce), Ce[i] && _(Ie, Ce[i]), me && (1 === p ? Ie.kill(!1, 1) : Ce[i] = 0), s || Ce[i = 1 === p ? 1 : 3] && _(Ie, Ce[i])), Se && !n && Math.abs(Ie.getVelocity()) > (W(Se) ? Se : 2500) && ($(Ie.callbackAnimation), re ? re.progress(1) : $(k, !p, 1))) : Ee && se && !Xe && se(Ie)
					}
					if (w) {
						var v = ye ? u / ye.duration() * (ye._caScrollDist || 0) : u;
						y(v + (F._isFlipped ? 1 : 0)), w(v)
					}
					ae && ae(-u / ye.duration() * (ye._caScrollDist || 0))
				}
			}, Ie.enable = function(e, r) {
				Ie.enabled || (Ie.enabled = !0, Ea(Oe, "resize", Qa), Ea(Oe, "scroll", Pa), u && Ea(ScrollTrigger, "refreshInit", u), !1 !== e && (Ie.progress = ne = 0, C = A = g = Be()), !1 !== r && Ie.refresh())
			}, Ie.getTween = function(e) {
				return e && m ? m.tween : re
			}, Ie.setPositions = function(e, r) {
				de && (U += e - B, Z += r - e - j), Ie.start = B = e, Ie.end = R = r, j = r - e, Ie.update()
			}, Ie.disable = function(e, r) {
				if (Ie.enabled && (!1 !== e && Ie.revert(), Ie.enabled = Ie.isActive = !1, r || re && re.pause(), ie = 0, n && (n.uncache = 1), u && Fa(ScrollTrigger, "refreshInit", u), te && (te.pause(), m.tween && m.tween.kill() && (m.tween = 0)), !_e)) {
					for (var t = br.length; t--;)
						if (br[t].scroller === Oe && br[t] !== Ie) return;
					Fa(Oe, "resize", Qa), Fa(Oe, "scroll", Pa)
				}
			}, Ie.kill = function(e, r) {
				Ie.disable(e, r), re && re.kill(), o && delete xr[o];
				var t = br.indexOf(Ie);
				0 <= t && br.splice(t, 1), t === Je && 0 < yr && Je--, t = 0, br.forEach(function(e) {
					return e.scroller === Ie.scroller && (t = 1)
				}), t || (Ie.scroll.rec = 0), k && (k.scrollTrigger = null, e && k.render(-1), r || k.kill()), z && [z, L, F, D].forEach(function(e) {
					return e.parentNode && e.parentNode.removeChild(e)
				}), de && (n && (n.uncache = 1), t = 0, br.forEach(function(e) {
					return e.pin === de && t++
				}), t || (n.spacer = 0))
			}, Ie.enable(!1, !1), k && k.add && !j ? Re.delayedCall(.01, function() {
				return B || R || Ie.refresh()
			}) && (j = .01) && (B = R = 0) : Ie.refresh()
		} else this.update = this.refresh = this.kill = H
	}, ScrollTrigger.register = function register(e) {
		if (!o && (Re = e || L(), K() && window.document && (ze = window, Le = document, We = Le.documentElement, Fe = Le.body), Re && (Ve = Re.utils.toArray, De = Re.utils.clamp, Ye = Re.core.suppressOverwrites || H, Re.core.globals("ScrollTrigger", ScrollTrigger), Fe))) {
			Ea(ze, "wheel", Pa), i = [ze, Le, We, Fe], Ea(Le, "scroll", Pa);
			var r, t = Fe.style,
				n = t.borderTopStyle;
			t.borderTopStyle = "solid", r = hr(Fe), gr.m = Math.round(r.top + gr.sc()) || 0, dr.m = Math.round(r.left + dr.sc()) || 0, n ? t.borderTopStyle = n : t.removeProperty("border-top-style"), s = setInterval(Oa, 200), Re.delayedCall(.5, function() {
				return qe = 0
			}), Ea(Le, "touchcancel", H), Ea(Fe, "touchstart", H), Da(Ea, Le, "pointerdown,touchstart,mousedown", function() {
				return je = 1
			}), Da(Ea, Le, "pointerup,touchend,mouseup", function() {
				return je = 0
			}), l = Re.utils.checkPrefix("transform"), q.push(l), o = Ze(), a = Re.delayedCall(.2, F).pause(), f = [Le, "visibilitychange", function() {
				var e = ze.innerWidth,
					r = ze.innerHeight;
				Le.hidden ? (c = e, u = r) : c === e && u === r || Qa()
			}, Le, "DOMContentLoaded", F, ze, "load", function() {
				return Ge || F()
			}, ze, "resize", Qa], T(Ea)
		}
		return o
	}, ScrollTrigger.defaults = function defaults(e) {
		if (e)
			for (var r in e) mr[r] = e[r];
		return mr
	}, ScrollTrigger.kill = function kill() {
		er = 0, br.slice(0).forEach(function(e) {
			return e.kill(1)
		})
	}, ScrollTrigger.config = function config(e) {
		"limitCallbacks" in e && ($e = !!e.limitCallbacks);
		var r = e.syncInterval;
		r && clearInterval(s) || (s = r) && setInterval(Oa, r), "autoRefreshEvents" in e && (T(Fa) || T(Ea, e.autoRefreshEvents || "none"), t = -1 === (e.autoRefreshEvents + "").indexOf("resize"))
	}, ScrollTrigger.scrollerProxy = function scrollerProxy(e, r) {
		var t = I(e),
			n = g.indexOf(t),
			i = M(t);
		~n && g.splice(n, i ? 6 : 2), r && (i ? Ue.unshift(ze, r, Fe, r, We, r) : Ue.unshift(t, r))
	}, ScrollTrigger.matchMedia = function matchMedia(e) {
		var r, t, n, i, o;
		for (t in e) n = C.indexOf(t), i = e[t], "all" === (Qe = t) ? i() : (r = ze.matchMedia(t)) && (r.matches && (o = i()), ~n ? (C[n + 1] = Z(C[n + 1], i), C[n + 2] = Z(C[n + 2], o)) : (n = C.length, C.push(t, i, o), r.addListener ? r.addListener(Wa) : r.addEventListener("change", Wa)), C[n + 3] = r.matches), Qe = 0;
		return C
	}, ScrollTrigger.clearMatchMedia = function clearMatchMedia(e) {
		e || (C.length = 0), 0 <= (e = C.indexOf(e)) && C.splice(e, 4)
	}, ScrollTrigger.isInViewport = function isInViewport(e, r, t) {
		var n = (rr(e) ? I(e) : e).getBoundingClientRect(),
			i = n[t ? nr : ir] * r || 0;
		return t ? 0 < n.right - i && n.left + i < ze.innerWidth : 0 < n.bottom - i && n.top + i < ze.innerHeight
	}, ScrollTrigger.positionInViewport = function positionInViewport(e, r, t) {
		rr(e) && (e = I(e));
		var n = e.getBoundingClientRect(),
			i = n[t ? nr : ir],
			o = null == r ? i / 2 : r in b ? b[r] * i : ~r.indexOf("%") ? parseFloat(r) * i / 100 : parseFloat(r) || 0;
		return t ? (n.left + o) / ze.innerWidth : (n.top + o) / ze.innerHeight
	}, ScrollTrigger);

	function ScrollTrigger(e, r) {
		o || ScrollTrigger.register(Re) || console.warn("Please gsap.registerPlugin(ScrollTrigger)"), this.init(e, r)
	}
	ee.version = "3.9.1", ee.saveStyles = function(e) {
		return e ? Ve(e).forEach(function(e) {
			if (e && e.style) {
				var r = B.indexOf(e);
				0 <= r && B.splice(r, 5), B.push(e, e.style.cssText, e.getBBox && e.getAttribute("transform"), Re.core.getCache(e), Qe)
			}
		}) : B
	}, ee.revert = function(e, r) {
		return z(!e, r)
	}, ee.create = function(e, r) {
		return new ee(e, r)
	}, ee.refresh = function(e) {
		return e ? Qa() : (o || ee.register()) && F(!0)
	}, ee.update = j, ee.clearScrollMemory = ab, ee.maxScroll = function(e, r) {
		return S(e, r ? dr : gr)
	}, ee.getScrollFunc = function(e, r) {
		return O(I(e), r ? dr : gr)
	}, ee.getById = function(e) {
		return xr[e]
	}, ee.getAll = function() {
		return br.slice(0)
	}, ee.isScrolling = function() {
		return !!Ge
	}, ee.snapDirectional = Ba, ee.addEventListener = function(e, r) {
		var t = x[e] || (x[e] = []);
		~t.indexOf(r) || t.push(r)
	}, ee.removeEventListener = function(e, r) {
		var t = x[e],
			n = t && t.indexOf(r);
		0 <= n && t.splice(n, 1)
	}, ee.batch = function(e, r) {
		function Nj(e, r) {
			var t = [],
				n = [],
				i = Re.delayedCall(o, function() {
					r(t, n), t = [], n = []
				}).pause();
			return function(e) {
				t.length || i.restart(!0), t.push(e.trigger), n.push(e), a <= t.length && i.progress(1)
			}
		}
		var t, n = [],
			i = {},
			o = r.interval || .016,
			a = r.batchMax || 1e9;
		for (t in r) i[t] = "on" === t.substr(0, 2) && V(r[t]) && "onRefreshInit" !== t ? Nj(0, r[t]) : r[t];
		return V(a) && (a = a(), Ea(ee, "refresh", function() {
			return a = r.batchMax()
		})), Ve(e).forEach(function(e) {
			var r = {};
			for (t in i) r[t] = i[t];
			r.trigger = e, n.push(ee.create(r))
		}), n
	}, ee.sort = function(e) {
		return br.sort(e || function(e, r) {
			return -1e6 * (e.vars.refreshPriority || 0) + e.start - (r.start + -1e6 * (r.vars.refreshPriority || 0))
		})
	}, L() && Re.registerPlugin(ee), e.ScrollTrigger = ee, e.default = ee;
	if (typeof(window) === "undefined" || window !== e) {
		Object.defineProperty(e, "__esModule", {
			value: !0
		})
	} else {
		delete e.default
	}
});
/*!
 * Isotope PACKAGED v3.0.6
 *
 * Licensed GPLv3 for open source use
 * or Isotope Commercial License for commercial use
 *
 * https://isotope.metafizzy.co
 * Copyright 2010-2018 Metafizzy
 */
! function(t, e) {
	"function" == typeof define && define.amd ? define("jquery-bridget/jquery-bridget", ["jquery"], function(i) {
		return e(t, i)
	}) : "object" == typeof module && module.exports ? module.exports = e(t, require("jquery")) : t.jQueryBridget = e(t, t.jQuery)
}(window, function(t, e) {
	"use strict";

	function i(i, s, a) {
		function u(t, e, o) {
			var n, s = "$()." + i + '("' + e + '")';
			return t.each(function(t, u) {
				var h = a.data(u, i);
				if (!h) return void r(i + " not initialized. Cannot call methods, i.e. " + s);
				var d = h[e];
				if (!d || "_" == e.charAt(0)) return void r(s + " is not a valid method");
				var l = d.apply(h, o);
				n = void 0 === n ? l : n
			}), void 0 !== n ? n : t
		}

		function h(t, e) {
			t.each(function(t, o) {
				var n = a.data(o, i);
				n ? (n.option(e), n._init()) : (n = new s(o, e), a.data(o, i, n))
			})
		}
		a = a || e || t.jQuery, a && (s.prototype.option || (s.prototype.option = function(t) {
			a.isPlainObject(t) && (this.options = a.extend(!0, this.options, t))
		}), a.fn[i] = function(t) {
			if ("string" == typeof t) {
				var e = n.call(arguments, 1);
				return u(this, t, e)
			}
			return h(this, t), this
		}, o(a))
	}

	function o(t) {
		!t || t && t.bridget || (t.bridget = i)
	}
	var n = Array.prototype.slice,
		s = t.console,
		r = "undefined" == typeof s ? function() {} : function(t) {
			s.error(t)
		};
	return o(e || t.jQuery), i
}),
function(t, e) {
	"function" == typeof define && define.amd ? define("ev-emitter/ev-emitter", e) : "object" == typeof module && module.exports ? module.exports = e() : t.EvEmitter = e()
}("undefined" != typeof window ? window : this, function() {
	function t() {}
	var e = t.prototype;
	return e.on = function(t, e) {
		if (t && e) {
			var i = this._events = this._events || {},
				o = i[t] = i[t] || [];
			return o.indexOf(e) == -1 && o.push(e), this
		}
	}, e.once = function(t, e) {
		if (t && e) {
			this.on(t, e);
			var i = this._onceEvents = this._onceEvents || {},
				o = i[t] = i[t] || {};
			return o[e] = !0, this
		}
	}, e.off = function(t, e) {
		var i = this._events && this._events[t];
		if (i && i.length) {
			var o = i.indexOf(e);
			return o != -1 && i.splice(o, 1), this
		}
	}, e.emitEvent = function(t, e) {
		var i = this._events && this._events[t];
		if (i && i.length) {
			i = i.slice(0), e = e || [];
			for (var o = this._onceEvents && this._onceEvents[t], n = 0; n < i.length; n++) {
				var s = i[n],
					r = o && o[s];
				r && (this.off(t, s), delete o[s]), s.apply(this, e)
			}
			return this
		}
	}, e.allOff = function() {
		delete this._events, delete this._onceEvents
	}, t
}),
function(t, e) {
	"function" == typeof define && define.amd ? define("get-size/get-size", e) : "object" == typeof module && module.exports ? module.exports = e() : t.getSize = e()
}(window, function() {
	"use strict";

	function t(t) {
		var e = parseFloat(t),
			i = t.indexOf("%") == -1 && !isNaN(e);
		return i && e
	}

	function e() {}

	function i() {
		for (var t = {
				width: 0,
				height: 0,
				innerWidth: 0,
				innerHeight: 0,
				outerWidth: 0,
				outerHeight: 0
			}, e = 0; e < h; e++) {
			var i = u[e];
			t[i] = 0
		}
		return t
	}

	function o(t) {
		var e = getComputedStyle(t);
		return e || a("Style returned " + e + ". Are you running this code in a hidden iframe on Firefox? See https://bit.ly/getsizebug1"), e
	}

	function n() {
		if (!d) {
			d = !0;
			var e = document.createElement("div");
			e.style.width = "200px", e.style.padding = "1px 2px 3px 4px", e.style.borderStyle = "solid", e.style.borderWidth = "1px 2px 3px 4px", e.style.boxSizing = "border-box";
			var i = document.body || document.documentElement;
			i.appendChild(e);
			var n = o(e);
			r = 200 == Math.round(t(n.width)), s.isBoxSizeOuter = r, i.removeChild(e)
		}
	}

	function s(e) {
		if (n(), "string" == typeof e && (e = document.querySelector(e)), e && "object" == typeof e && e.nodeType) {
			var s = o(e);
			if ("none" == s.display) return i();
			var a = {};
			a.width = e.offsetWidth, a.height = e.offsetHeight;
			for (var d = a.isBorderBox = "border-box" == s.boxSizing, l = 0; l < h; l++) {
				var f = u[l],
					c = s[f],
					m = parseFloat(c);
				a[f] = isNaN(m) ? 0 : m
			}
			var p = a.paddingLeft + a.paddingRight,
				y = a.paddingTop + a.paddingBottom,
				g = a.marginLeft + a.marginRight,
				v = a.marginTop + a.marginBottom,
				_ = a.borderLeftWidth + a.borderRightWidth,
				z = a.borderTopWidth + a.borderBottomWidth,
				I = d && r,
				x = t(s.width);
			x !== !1 && (a.width = x + (I ? 0 : p + _));
			var S = t(s.height);
			return S !== !1 && (a.height = S + (I ? 0 : y + z)), a.innerWidth = a.width - (p + _), a.innerHeight = a.height - (y + z), a.outerWidth = a.width + g, a.outerHeight = a.height + v, a
		}
	}
	var r, a = "undefined" == typeof console ? e : function(t) {
			console.error(t)
		},
		u = ["paddingLeft", "paddingRight", "paddingTop", "paddingBottom", "marginLeft", "marginRight", "marginTop", "marginBottom", "borderLeftWidth", "borderRightWidth", "borderTopWidth", "borderBottomWidth"],
		h = u.length,
		d = !1;
	return s
}),
function(t, e) {
	"use strict";
	"function" == typeof define && define.amd ? define("desandro-matches-selector/matches-selector", e) : "object" == typeof module && module.exports ? module.exports = e() : t.matchesSelector = e()
}(window, function() {
	"use strict";
	var t = function() {
		var t = window.Element.prototype;
		if (t.matches) return "matches";
		if (t.matchesSelector) return "matchesSelector";
		for (var e = ["webkit", "moz", "ms", "o"], i = 0; i < e.length; i++) {
			var o = e[i],
				n = o + "MatchesSelector";
			if (t[n]) return n
		}
	}();
	return function(e, i) {
		return e[t](i)
	}
}),
function(t, e) {
	"function" == typeof define && define.amd ? define("fizzy-ui-utils/utils", ["desandro-matches-selector/matches-selector"], function(i) {
		return e(t, i)
	}) : "object" == typeof module && module.exports ? module.exports = e(t, require("desandro-matches-selector")) : t.fizzyUIUtils = e(t, t.matchesSelector)
}(window, function(t, e) {
	var i = {};
	i.extend = function(t, e) {
		for (var i in e) t[i] = e[i];
		return t
	}, i.modulo = function(t, e) {
		return (t % e + e) % e
	};
	var o = Array.prototype.slice;
	i.makeArray = function(t) {
		if (Array.isArray(t)) return t;
		if (null === t || void 0 === t) return [];
		var e = "object" == typeof t && "number" == typeof t.length;
		return e ? o.call(t) : [t]
	}, i.removeFrom = function(t, e) {
		var i = t.indexOf(e);
		i != -1 && t.splice(i, 1)
	}, i.getParent = function(t, i) {
		for (; t.parentNode && t != document.body;)
			if (t = t.parentNode, e(t, i)) return t
	}, i.getQueryElement = function(t) {
		return "string" == typeof t ? document.querySelector(t) : t
	}, i.handleEvent = function(t) {
		var e = "on" + t.type;
		this[e] && this[e](t)
	}, i.filterFindElements = function(t, o) {
		t = i.makeArray(t);
		var n = [];
		return t.forEach(function(t) {
			if (t instanceof HTMLElement) {
				if (!o) return void n.push(t);
				e(t, o) && n.push(t);
				for (var i = t.querySelectorAll(o), s = 0; s < i.length; s++) n.push(i[s])
			}
		}), n
	}, i.debounceMethod = function(t, e, i) {
		i = i || 100;
		var o = t.prototype[e],
			n = e + "Timeout";
		t.prototype[e] = function() {
			var t = this[n];
			clearTimeout(t);
			var e = arguments,
				s = this;
			this[n] = setTimeout(function() {
				o.apply(s, e), delete s[n]
			}, i)
		}
	}, i.docReady = function(t) {
		var e = document.readyState;
		"complete" == e || "interactive" == e ? setTimeout(t) : document.addEventListener("DOMContentLoaded", t)
	}, i.toDashed = function(t) {
		return t.replace(/(.)([A-Z])/g, function(t, e, i) {
			return e + "-" + i
		}).toLowerCase()
	};
	var n = t.console;
	return i.htmlInit = function(e, o) {
		i.docReady(function() {
			var s = i.toDashed(o),
				r = "data-" + s,
				a = document.querySelectorAll("[" + r + "]"),
				u = document.querySelectorAll(".js-" + s),
				h = i.makeArray(a).concat(i.makeArray(u)),
				d = r + "-options",
				l = t.jQuery;
			h.forEach(function(t) {
				var i, s = t.getAttribute(r) || t.getAttribute(d);
				try {
					i = s && JSON.parse(s)
				} catch (a) {
					return void(n && n.error("Error parsing " + r + " on " + t.className + ": " + a))
				}
				var u = new e(t, i);
				l && l.data(t, o, u)
			})
		})
	}, i
}),
function(t, e) {
	"function" == typeof define && define.amd ? define("outlayer/item", ["ev-emitter/ev-emitter", "get-size/get-size"], e) : "object" == typeof module && module.exports ? module.exports = e(require("ev-emitter"), require("get-size")) : (t.Outlayer = {}, t.Outlayer.Item = e(t.EvEmitter, t.getSize))
}(window, function(t, e) {
	"use strict";

	function i(t) {
		for (var e in t) return !1;
		return e = null, !0
	}

	function o(t, e) {
		t && (this.element = t, this.layout = e, this.position = {
			x: 0,
			y: 0
		}, this._create())
	}

	function n(t) {
		return t.replace(/([A-Z])/g, function(t) {
			return "-" + t.toLowerCase()
		})
	}
	var s = document.documentElement.style,
		r = "string" == typeof s.transition ? "transition" : "WebkitTransition",
		a = "string" == typeof s.transform ? "transform" : "WebkitTransform",
		u = {
			WebkitTransition: "webkitTransitionEnd",
			transition: "transitionend"
		} [r],
		h = {
			transform: a,
			transition: r,
			transitionDuration: r + "Duration",
			transitionProperty: r + "Property",
			transitionDelay: r + "Delay"
		},
		d = o.prototype = Object.create(t.prototype);
	d.constructor = o, d._create = function() {
		this._transn = {
			ingProperties: {},
			clean: {},
			onEnd: {}
		}, this.css({
			position: "absolute"
		})
	}, d.handleEvent = function(t) {
		var e = "on" + t.type;
		this[e] && this[e](t)
	}, d.getSize = function() {
		this.size = e(this.element)
	}, d.css = function(t) {
		var e = this.element.style;
		for (var i in t) {
			var o = h[i] || i;
			e[o] = t[i]
		}
	}, d.getPosition = function() {
		var t = getComputedStyle(this.element),
			e = this.layout._getOption("originLeft"),
			i = this.layout._getOption("originTop"),
			o = t[e ? "left" : "right"],
			n = t[i ? "top" : "bottom"],
			s = parseFloat(o),
			r = parseFloat(n),
			a = this.layout.size;
		o.indexOf("%") != -1 && (s = s / 100 * a.width), n.indexOf("%") != -1 && (r = r / 100 * a.height), s = isNaN(s) ? 0 : s, r = isNaN(r) ? 0 : r, s -= e ? a.paddingLeft : a.paddingRight, r -= i ? a.paddingTop : a.paddingBottom, this.position.x = s, this.position.y = r
	}, d.layoutPosition = function() {
		var t = this.layout.size,
			e = {},
			i = this.layout._getOption("originLeft"),
			o = this.layout._getOption("originTop"),
			n = i ? "paddingLeft" : "paddingRight",
			s = i ? "left" : "right",
			r = i ? "right" : "left",
			a = this.position.x + t[n];
		e[s] = this.getXValue(a), e[r] = "";
		var u = o ? "paddingTop" : "paddingBottom",
			h = o ? "top" : "bottom",
			d = o ? "bottom" : "top",
			l = this.position.y + t[u];
		e[h] = this.getYValue(l), e[d] = "", this.css(e), this.emitEvent("layout", [this])
	}, d.getXValue = function(t) {
		var e = this.layout._getOption("horizontal");
		return this.layout.options.percentPosition && !e ? t / this.layout.size.width * 100 + "%" : t + "px"
	}, d.getYValue = function(t) {
		var e = this.layout._getOption("horizontal");
		return this.layout.options.percentPosition && e ? t / this.layout.size.height * 100 + "%" : t + "px"
	}, d._transitionTo = function(t, e) {
		this.getPosition();
		var i = this.position.x,
			o = this.position.y,
			n = t == this.position.x && e == this.position.y;
		if (this.setPosition(t, e), n && !this.isTransitioning) return void this.layoutPosition();
		var s = t - i,
			r = e - o,
			a = {};
		a.transform = this.getTranslate(s, r), this.transition({
			to: a,
			onTransitionEnd: {
				transform: this.layoutPosition
			},
			isCleaning: !0
		})
	}, d.getTranslate = function(t, e) {
		var i = this.layout._getOption("originLeft"),
			o = this.layout._getOption("originTop");
		return t = i ? t : -t, e = o ? e : -e, "translate3d(" + t + "px, " + e + "px, 0)"
	}, d.goTo = function(t, e) {
		this.setPosition(t, e), this.layoutPosition()
	}, d.moveTo = d._transitionTo, d.setPosition = function(t, e) {
		this.position.x = parseFloat(t), this.position.y = parseFloat(e)
	}, d._nonTransition = function(t) {
		this.css(t.to), t.isCleaning && this._removeStyles(t.to);
		for (var e in t.onTransitionEnd) t.onTransitionEnd[e].call(this)
	}, d.transition = function(t) {
		if (!parseFloat(this.layout.options.transitionDuration)) return void this._nonTransition(t);
		var e = this._transn;
		for (var i in t.onTransitionEnd) e.onEnd[i] = t.onTransitionEnd[i];
		for (i in t.to) e.ingProperties[i] = !0, t.isCleaning && (e.clean[i] = !0);
		if (t.from) {
			this.css(t.from);
			var o = this.element.offsetHeight;
			o = null
		}
		this.enableTransition(t.to), this.css(t.to), this.isTransitioning = !0
	};
	var l = "opacity," + n(a);
	d.enableTransition = function() {
		if (!this.isTransitioning) {
			var t = this.layout.options.transitionDuration;
			t = "number" == typeof t ? t + "ms" : t, this.css({
				transitionProperty: l,
				transitionDuration: t,
				transitionDelay: this.staggerDelay || 0
			}), this.element.addEventListener(u, this, !1)
		}
	}, d.onwebkitTransitionEnd = function(t) {
		this.ontransitionend(t)
	}, d.onotransitionend = function(t) {
		this.ontransitionend(t)
	};
	var f = {
		"-webkit-transform": "transform"
	};
	d.ontransitionend = function(t) {
		if (t.target === this.element) {
			var e = this._transn,
				o = f[t.propertyName] || t.propertyName;
			if (delete e.ingProperties[o], i(e.ingProperties) && this.disableTransition(), o in e.clean && (this.element.style[t.propertyName] = "", delete e.clean[o]), o in e.onEnd) {
				var n = e.onEnd[o];
				n.call(this), delete e.onEnd[o]
			}
			this.emitEvent("transitionEnd", [this])
		}
	}, d.disableTransition = function() {
		this.removeTransitionStyles(), this.element.removeEventListener(u, this, !1), this.isTransitioning = !1
	}, d._removeStyles = function(t) {
		var e = {};
		for (var i in t) e[i] = "";
		this.css(e)
	};
	var c = {
		transitionProperty: "",
		transitionDuration: "",
		transitionDelay: ""
	};
	return d.removeTransitionStyles = function() {
		this.css(c)
	}, d.stagger = function(t) {
		t = isNaN(t) ? 0 : t, this.staggerDelay = t + "ms"
	}, d.removeElem = function() {
		this.element.parentNode.removeChild(this.element), this.css({
			display: ""
		}), this.emitEvent("remove", [this])
	}, d.remove = function() {
		return r && parseFloat(this.layout.options.transitionDuration) ? (this.once("transitionEnd", function() {
			this.removeElem()
		}), void this.hide()) : void this.removeElem()
	}, d.reveal = function() {
		delete this.isHidden, this.css({
			display: ""
		});
		var t = this.layout.options,
			e = {},
			i = this.getHideRevealTransitionEndProperty("visibleStyle");
		e[i] = this.onRevealTransitionEnd, this.transition({
			from: t.hiddenStyle,
			to: t.visibleStyle,
			isCleaning: !0,
			onTransitionEnd: e
		})
	}, d.onRevealTransitionEnd = function() {
		this.isHidden || this.emitEvent("reveal")
	}, d.getHideRevealTransitionEndProperty = function(t) {
		var e = this.layout.options[t];
		if (e.opacity) return "opacity";
		for (var i in e) return i
	}, d.hide = function() {
		this.isHidden = !0, this.css({
			display: ""
		});
		var t = this.layout.options,
			e = {},
			i = this.getHideRevealTransitionEndProperty("hiddenStyle");
		e[i] = this.onHideTransitionEnd, this.transition({
			from: t.visibleStyle,
			to: t.hiddenStyle,
			isCleaning: !0,
			onTransitionEnd: e
		})
	}, d.onHideTransitionEnd = function() {
		this.isHidden && (this.css({
			display: "none"
		}), this.emitEvent("hide"))
	}, d.destroy = function() {
		this.css({
			position: "",
			left: "",
			right: "",
			top: "",
			bottom: "",
			transition: "",
			transform: ""
		})
	}, o
}),
function(t, e) {
	"use strict";
	"function" == typeof define && define.amd ? define("outlayer/outlayer", ["ev-emitter/ev-emitter", "get-size/get-size", "fizzy-ui-utils/utils", "./item"], function(i, o, n, s) {
		return e(t, i, o, n, s)
	}) : "object" == typeof module && module.exports ? module.exports = e(t, require("ev-emitter"), require("get-size"), require("fizzy-ui-utils"), require("./item")) : t.Outlayer = e(t, t.EvEmitter, t.getSize, t.fizzyUIUtils, t.Outlayer.Item)
}(window, function(t, e, i, o, n) {
	"use strict";

	function s(t, e) {
		var i = o.getQueryElement(t);
		if (!i) return void(u && u.error("Bad element for " + this.constructor.namespace + ": " + (i || t)));
		this.element = i, h && (this.$element = h(this.element)), this.options = o.extend({}, this.constructor.defaults), this.option(e);
		var n = ++l;
		this.element.outlayerGUID = n, f[n] = this, this._create();
		var s = this._getOption("initLayout");
		s && this.layout()
	}

	function r(t) {
		function e() {
			t.apply(this, arguments)
		}
		return e.prototype = Object.create(t.prototype), e.prototype.constructor = e, e
	}

	function a(t) {
		if ("number" == typeof t) return t;
		var e = t.match(/(^\d*\.?\d*)(\w*)/),
			i = e && e[1],
			o = e && e[2];
		if (!i.length) return 0;
		i = parseFloat(i);
		var n = m[o] || 1;
		return i * n
	}
	var u = t.console,
		h = t.jQuery,
		d = function() {},
		l = 0,
		f = {};
	s.namespace = "outlayer", s.Item = n, s.defaults = {
		containerStyle: {
			position: "relative"
		},
		initLayout: !0,
		originLeft: !0,
		originTop: !0,
		resize: !0,
		resizeContainer: !0,
		transitionDuration: "0.4s",
		hiddenStyle: {
			opacity: 0,
			transform: "scale(0.001)"
		},
		visibleStyle: {
			opacity: 1,
			transform: "scale(1)"
		}
	};
	var c = s.prototype;
	o.extend(c, e.prototype), c.option = function(t) {
		o.extend(this.options, t)
	}, c._getOption = function(t) {
		var e = this.constructor.compatOptions[t];
		return e && void 0 !== this.options[e] ? this.options[e] : this.options[t]
	}, s.compatOptions = {
		initLayout: "isInitLayout",
		horizontal: "isHorizontal",
		layoutInstant: "isLayoutInstant",
		originLeft: "isOriginLeft",
		originTop: "isOriginTop",
		resize: "isResizeBound",
		resizeContainer: "isResizingContainer"
	}, c._create = function() {
		this.reloadItems(), this.stamps = [], this.stamp(this.options.stamp), o.extend(this.element.style, this.options.containerStyle);
		var t = this._getOption("resize");
		t && this.bindResize()
	}, c.reloadItems = function() {
		this.items = this._itemize(this.element.children)
	}, c._itemize = function(t) {
		for (var e = this._filterFindItemElements(t), i = this.constructor.Item, o = [], n = 0; n < e.length; n++) {
			var s = e[n],
				r = new i(s, this);
			o.push(r)
		}
		return o
	}, c._filterFindItemElements = function(t) {
		return o.filterFindElements(t, this.options.itemSelector)
	}, c.getItemElements = function() {
		return this.items.map(function(t) {
			return t.element
		})
	}, c.layout = function() {
		this._resetLayout(), this._manageStamps();
		var t = this._getOption("layoutInstant"),
			e = void 0 !== t ? t : !this._isLayoutInited;
		this.layoutItems(this.items, e), this._isLayoutInited = !0
	}, c._init = c.layout, c._resetLayout = function() {
		this.getSize()
	}, c.getSize = function() {
		this.size = i(this.element)
	}, c._getMeasurement = function(t, e) {
		var o, n = this.options[t];
		n ? ("string" == typeof n ? o = this.element.querySelector(n) : n instanceof HTMLElement && (o = n), this[t] = o ? i(o)[e] : n) : this[t] = 0
	}, c.layoutItems = function(t, e) {
		t = this._getItemsForLayout(t), this._layoutItems(t, e), this._postLayout()
	}, c._getItemsForLayout = function(t) {
		return t.filter(function(t) {
			return !t.isIgnored
		})
	}, c._layoutItems = function(t, e) {
		if (this._emitCompleteOnItems("layout", t), t && t.length) {
			var i = [];
			t.forEach(function(t) {
				var o = this._getItemLayoutPosition(t);
				o.item = t, o.isInstant = e || t.isLayoutInstant, i.push(o)
			}, this), this._processLayoutQueue(i)
		}
	}, c._getItemLayoutPosition = function() {
		return {
			x: 0,
			y: 0
		}
	}, c._processLayoutQueue = function(t) {
		this.updateStagger(), t.forEach(function(t, e) {
			this._positionItem(t.item, t.x, t.y, t.isInstant, e)
		}, this)
	}, c.updateStagger = function() {
		var t = this.options.stagger;
		return null === t || void 0 === t ? void(this.stagger = 0) : (this.stagger = a(t), this.stagger)
	}, c._positionItem = function(t, e, i, o, n) {
		o ? t.goTo(e, i) : (t.stagger(n * this.stagger), t.moveTo(e, i))
	}, c._postLayout = function() {
		this.resizeContainer()
	}, c.resizeContainer = function() {
		var t = this._getOption("resizeContainer");
		if (t) {
			var e = this._getContainerSize();
			e && (this._setContainerMeasure(e.width, !0), this._setContainerMeasure(e.height, !1))
		}
	}, c._getContainerSize = d, c._setContainerMeasure = function(t, e) {
		if (void 0 !== t) {
			var i = this.size;
			i.isBorderBox && (t += e ? i.paddingLeft + i.paddingRight + i.borderLeftWidth + i.borderRightWidth : i.paddingBottom + i.paddingTop + i.borderTopWidth + i.borderBottomWidth), t = Math.max(t, 0), this.element.style[e ? "width" : "height"] = t + "px"
		}
	}, c._emitCompleteOnItems = function(t, e) {
		function i() {
			n.dispatchEvent(t + "Complete", null, [e])
		}

		function o() {
			r++, r == s && i()
		}
		var n = this,
			s = e.length;
		if (!e || !s) return void i();
		var r = 0;
		e.forEach(function(e) {
			e.once(t, o)
		})
	}, c.dispatchEvent = function(t, e, i) {
		var o = e ? [e].concat(i) : i;
		if (this.emitEvent(t, o), h)
			if (this.$element = this.$element || h(this.element), e) {
				var n = h.Event(e);
				n.type = t, this.$element.trigger(n, i)
			} else this.$element.trigger(t, i)
	}, c.ignore = function(t) {
		var e = this.getItem(t);
		e && (e.isIgnored = !0)
	}, c.unignore = function(t) {
		var e = this.getItem(t);
		e && delete e.isIgnored
	}, c.stamp = function(t) {
		t = this._find(t), t && (this.stamps = this.stamps.concat(t), t.forEach(this.ignore, this))
	}, c.unstamp = function(t) {
		t = this._find(t), t && t.forEach(function(t) {
			o.removeFrom(this.stamps, t), this.unignore(t)
		}, this)
	}, c._find = function(t) {
		if (t) return "string" == typeof t && (t = this.element.querySelectorAll(t)), t = o.makeArray(t)
	}, c._manageStamps = function() {
		this.stamps && this.stamps.length && (this._getBoundingRect(), this.stamps.forEach(this._manageStamp, this))
	}, c._getBoundingRect = function() {
		var t = this.element.getBoundingClientRect(),
			e = this.size;
		this._boundingRect = {
			left: t.left + e.paddingLeft + e.borderLeftWidth,
			top: t.top + e.paddingTop + e.borderTopWidth,
			right: t.right - (e.paddingRight + e.borderRightWidth),
			bottom: t.bottom - (e.paddingBottom + e.borderBottomWidth)
		}
	}, c._manageStamp = d, c._getElementOffset = function(t) {
		var e = t.getBoundingClientRect(),
			o = this._boundingRect,
			n = i(t),
			s = {
				left: e.left - o.left - n.marginLeft,
				top: e.top - o.top - n.marginTop,
				right: o.right - e.right - n.marginRight,
				bottom: o.bottom - e.bottom - n.marginBottom
			};
		return s
	}, c.handleEvent = o.handleEvent, c.bindResize = function() {
		t.addEventListener("resize", this), this.isResizeBound = !0
	}, c.unbindResize = function() {
		t.removeEventListener("resize", this), this.isResizeBound = !1
	}, c.onresize = function() {
		this.resize()
	}, o.debounceMethod(s, "onresize", 100), c.resize = function() {
		this.isResizeBound && this.needsResizeLayout() && this.layout()
	}, c.needsResizeLayout = function() {
		var t = i(this.element),
			e = this.size && t;
		return e && t.innerWidth !== this.size.innerWidth
	}, c.addItems = function(t) {
		var e = this._itemize(t);
		return e.length && (this.items = this.items.concat(e)), e
	}, c.appended = function(t) {
		var e = this.addItems(t);
		e.length && (this.layoutItems(e, !0), this.reveal(e))
	}, c.prepended = function(t) {
		var e = this._itemize(t);
		if (e.length) {
			var i = this.items.slice(0);
			this.items = e.concat(i), this._resetLayout(), this._manageStamps(), this.layoutItems(e, !0), this.reveal(e), this.layoutItems(i)
		}
	}, c.reveal = function(t) {
		if (this._emitCompleteOnItems("reveal", t), t && t.length) {
			var e = this.updateStagger();
			t.forEach(function(t, i) {
				t.stagger(i * e), t.reveal()
			})
		}
	}, c.hide = function(t) {
		if (this._emitCompleteOnItems("hide", t), t && t.length) {
			var e = this.updateStagger();
			t.forEach(function(t, i) {
				t.stagger(i * e), t.hide()
			})
		}
	}, c.revealItemElements = function(t) {
		var e = this.getItems(t);
		this.reveal(e)
	}, c.hideItemElements = function(t) {
		var e = this.getItems(t);
		this.hide(e)
	}, c.getItem = function(t) {
		for (var e = 0; e < this.items.length; e++) {
			var i = this.items[e];
			if (i.element == t) return i
		}
	}, c.getItems = function(t) {
		t = o.makeArray(t);
		var e = [];
		return t.forEach(function(t) {
			var i = this.getItem(t);
			i && e.push(i)
		}, this), e
	}, c.remove = function(t) {
		var e = this.getItems(t);
		this._emitCompleteOnItems("remove", e), e && e.length && e.forEach(function(t) {
			t.remove(), o.removeFrom(this.items, t)
		}, this)
	}, c.destroy = function() {
		var t = this.element.style;
		t.height = "", t.position = "", t.width = "", this.items.forEach(function(t) {
			t.destroy()
		}), this.unbindResize();
		var e = this.element.outlayerGUID;
		delete f[e], delete this.element.outlayerGUID, h && h.removeData(this.element, this.constructor.namespace)
	}, s.data = function(t) {
		t = o.getQueryElement(t);
		var e = t && t.outlayerGUID;
		return e && f[e]
	}, s.create = function(t, e) {
		var i = r(s);
		return i.defaults = o.extend({}, s.defaults), o.extend(i.defaults, e), i.compatOptions = o.extend({}, s.compatOptions), i.namespace = t, i.data = s.data, i.Item = r(n), o.htmlInit(i, t), h && h.bridget && h.bridget(t, i), i
	};
	var m = {
		ms: 1,
		s: 1e3
	};
	return s.Item = n, s
}),
function(t, e) {
	"function" == typeof define && define.amd ? define("isotope-layout/js/item", ["outlayer/outlayer"], e) : "object" == typeof module && module.exports ? module.exports = e(require("outlayer")) : (t.Isotope = t.Isotope || {}, t.Isotope.Item = e(t.Outlayer))
}(window, function(t) {
	"use strict";

	function e() {
		t.Item.apply(this, arguments)
	}
	var i = e.prototype = Object.create(t.Item.prototype),
		o = i._create;
	i._create = function() {
		this.id = this.layout.itemGUID++, o.call(this), this.sortData = {}
	}, i.updateSortData = function() {
		if (!this.isIgnored) {
			this.sortData.id = this.id, this.sortData["original-order"] = this.id, this.sortData.random = Math.random();
			var t = this.layout.options.getSortData,
				e = this.layout._sorters;
			for (var i in t) {
				var o = e[i];
				this.sortData[i] = o(this.element, this)
			}
		}
	};
	var n = i.destroy;
	return i.destroy = function() {
		n.apply(this, arguments), this.css({
			display: ""
		})
	}, e
}),
function(t, e) {
	"function" == typeof define && define.amd ? define("isotope-layout/js/layout-mode", ["get-size/get-size", "outlayer/outlayer"], e) : "object" == typeof module && module.exports ? module.exports = e(require("get-size"), require("outlayer")) : (t.Isotope = t.Isotope || {}, t.Isotope.LayoutMode = e(t.getSize, t.Outlayer))
}(window, function(t, e) {
	"use strict";

	function i(t) {
		this.isotope = t, t && (this.options = t.options[this.namespace], this.element = t.element, this.items = t.filteredItems, this.size = t.size)
	}
	var o = i.prototype,
		n = ["_resetLayout", "_getItemLayoutPosition", "_manageStamp", "_getContainerSize", "_getElementOffset", "needsResizeLayout", "_getOption"];
	return n.forEach(function(t) {
		o[t] = function() {
			return e.prototype[t].apply(this.isotope, arguments)
		}
	}), o.needsVerticalResizeLayout = function() {
		var e = t(this.isotope.element),
			i = this.isotope.size && e;
		return i && e.innerHeight != this.isotope.size.innerHeight
	}, o._getMeasurement = function() {
		this.isotope._getMeasurement.apply(this, arguments)
	}, o.getColumnWidth = function() {
		this.getSegmentSize("column", "Width")
	}, o.getRowHeight = function() {
		this.getSegmentSize("row", "Height")
	}, o.getSegmentSize = function(t, e) {
		var i = t + e,
			o = "outer" + e;
		if (this._getMeasurement(i, o), !this[i]) {
			var n = this.getFirstItemSize();
			this[i] = n && n[o] || this.isotope.size["inner" + e]
		}
	}, o.getFirstItemSize = function() {
		var e = this.isotope.filteredItems[0];
		return e && e.element && t(e.element)
	}, o.layout = function() {
		this.isotope.layout.apply(this.isotope, arguments)
	}, o.getSize = function() {
		this.isotope.getSize(), this.size = this.isotope.size
	}, i.modes = {}, i.create = function(t, e) {
		function n() {
			i.apply(this, arguments)
		}
		return n.prototype = Object.create(o), n.prototype.constructor = n, e && (n.options = e), n.prototype.namespace = t, i.modes[t] = n, n
	}, i
}),
function(t, e) {
	"function" == typeof define && define.amd ? define("masonry-layout/masonry", ["outlayer/outlayer", "get-size/get-size"], e) : "object" == typeof module && module.exports ? module.exports = e(require("outlayer"), require("get-size")) : t.Masonry = e(t.Outlayer, t.getSize)
}(window, function(t, e) {
	var i = t.create("masonry");
	i.compatOptions.fitWidth = "isFitWidth";
	var o = i.prototype;
	return o._resetLayout = function() {
		this.getSize(), this._getMeasurement("columnWidth", "outerWidth"), this._getMeasurement("gutter", "outerWidth"), this.measureColumns(), this.colYs = [];
		for (var t = 0; t < this.cols; t++) this.colYs.push(0);
		this.maxY = 0, this.horizontalColIndex = 0
	}, o.measureColumns = function() {
		if (this.getContainerWidth(), !this.columnWidth) {
			var t = this.items[0],
				i = t && t.element;
			this.columnWidth = i && e(i).outerWidth || this.containerWidth
		}
		var o = this.columnWidth += this.gutter,
			n = this.containerWidth + this.gutter,
			s = n / o,
			r = o - n % o,
			a = r && r < 1 ? "round" : "floor";
		s = Math[a](s), this.cols = Math.max(s, 1)
	}, o.getContainerWidth = function() {
		var t = this._getOption("fitWidth"),
			i = t ? this.element.parentNode : this.element,
			o = e(i);
		this.containerWidth = o && o.innerWidth
	}, o._getItemLayoutPosition = function(t) {
		t.getSize();
		var e = t.size.outerWidth % this.columnWidth,
			i = e && e < 1 ? "round" : "ceil",
			o = Math[i](t.size.outerWidth / this.columnWidth);
		o = Math.min(o, this.cols);
		for (var n = this.options.horizontalOrder ? "_getHorizontalColPosition" : "_getTopColPosition", s = this[n](o, t), r = {
				x: this.columnWidth * s.col,
				y: s.y
			}, a = s.y + t.size.outerHeight, u = o + s.col, h = s.col; h < u; h++) this.colYs[h] = a;
		return r
	}, o._getTopColPosition = function(t) {
		var e = this._getTopColGroup(t),
			i = Math.min.apply(Math, e);
		return {
			col: e.indexOf(i),
			y: i
		}
	}, o._getTopColGroup = function(t) {
		if (t < 2) return this.colYs;
		for (var e = [], i = this.cols + 1 - t, o = 0; o < i; o++) e[o] = this._getColGroupY(o, t);
		return e
	}, o._getColGroupY = function(t, e) {
		if (e < 2) return this.colYs[t];
		var i = this.colYs.slice(t, t + e);
		return Math.max.apply(Math, i)
	}, o._getHorizontalColPosition = function(t, e) {
		var i = this.horizontalColIndex % this.cols,
			o = t > 1 && i + t > this.cols;
		i = o ? 0 : i;
		var n = e.size.outerWidth && e.size.outerHeight;
		return this.horizontalColIndex = n ? i + t : this.horizontalColIndex, {
			col: i,
			y: this._getColGroupY(i, t)
		}
	}, o._manageStamp = function(t) {
		var i = e(t),
			o = this._getElementOffset(t),
			n = this._getOption("originLeft"),
			s = n ? o.left : o.right,
			r = s + i.outerWidth,
			a = Math.floor(s / this.columnWidth);
		a = Math.max(0, a);
		var u = Math.floor(r / this.columnWidth);
		u -= r % this.columnWidth ? 0 : 1, u = Math.min(this.cols - 1, u);
		for (var h = this._getOption("originTop"), d = (h ? o.top : o.bottom) + i.outerHeight, l = a; l <= u; l++) this.colYs[l] = Math.max(d, this.colYs[l])
	}, o._getContainerSize = function() {
		this.maxY = Math.max.apply(Math, this.colYs);
		var t = {
			height: this.maxY
		};
		return this._getOption("fitWidth") && (t.width = this._getContainerFitWidth()), t
	}, o._getContainerFitWidth = function() {
		for (var t = 0, e = this.cols; --e && 0 === this.colYs[e];) t++;
		return (this.cols - t) * this.columnWidth - this.gutter
	}, o.needsResizeLayout = function() {
		var t = this.containerWidth;
		return this.getContainerWidth(), t != this.containerWidth
	}, i
}),
function(t, e) {
	"function" == typeof define && define.amd ? define("isotope-layout/js/layout-modes/masonry", ["../layout-mode", "masonry-layout/masonry"], e) : "object" == typeof module && module.exports ? module.exports = e(require("../layout-mode"), require("masonry-layout")) : e(t.Isotope.LayoutMode, t.Masonry)
}(window, function(t, e) {
	"use strict";
	var i = t.create("masonry"),
		o = i.prototype,
		n = {
			_getElementOffset: !0,
			layout: !0,
			_getMeasurement: !0
		};
	for (var s in e.prototype) n[s] || (o[s] = e.prototype[s]);
	var r = o.measureColumns;
	o.measureColumns = function() {
		this.items = this.isotope.filteredItems, r.call(this)
	};
	var a = o._getOption;
	return o._getOption = function(t) {
		return "fitWidth" == t ? void 0 !== this.options.isFitWidth ? this.options.isFitWidth : this.options.fitWidth : a.apply(this.isotope, arguments)
	}, i
}),
function(t, e) {
	"function" == typeof define && define.amd ? define("isotope-layout/js/layout-modes/fit-rows", ["../layout-mode"], e) : "object" == typeof exports ? module.exports = e(require("../layout-mode")) : e(t.Isotope.LayoutMode)
}(window, function(t) {
	"use strict";
	var e = t.create("fitRows"),
		i = e.prototype;
	return i._resetLayout = function() {
		this.x = 0, this.y = 0, this.maxY = 0, this._getMeasurement("gutter", "outerWidth")
	}, i._getItemLayoutPosition = function(t) {
		t.getSize();
		var e = t.size.outerWidth + this.gutter,
			i = this.isotope.size.innerWidth + this.gutter;
		0 !== this.x && e + this.x > i && (this.x = 0, this.y = this.maxY);
		var o = {
			x: this.x,
			y: this.y
		};
		return this.maxY = Math.max(this.maxY, this.y + t.size.outerHeight), this.x += e, o
	}, i._getContainerSize = function() {
		return {
			height: this.maxY
		}
	}, e
}),
function(t, e) {
	"function" == typeof define && define.amd ? define("isotope-layout/js/layout-modes/vertical", ["../layout-mode"], e) : "object" == typeof module && module.exports ? module.exports = e(require("../layout-mode")) : e(t.Isotope.LayoutMode)
}(window, function(t) {
	"use strict";
	var e = t.create("vertical", {
			horizontalAlignment: 0
		}),
		i = e.prototype;
	return i._resetLayout = function() {
		this.y = 0
	}, i._getItemLayoutPosition = function(t) {
		t.getSize();
		var e = (this.isotope.size.innerWidth - t.size.outerWidth) * this.options.horizontalAlignment,
			i = this.y;
		return this.y += t.size.outerHeight, {
			x: e,
			y: i
		}
	}, i._getContainerSize = function() {
		return {
			height: this.y
		}
	}, e
}),
function(t, e) {
	"function" == typeof define && define.amd ? define(["outlayer/outlayer", "get-size/get-size", "desandro-matches-selector/matches-selector", "fizzy-ui-utils/utils", "isotope-layout/js/item", "isotope-layout/js/layout-mode", "isotope-layout/js/layout-modes/masonry", "isotope-layout/js/layout-modes/fit-rows", "isotope-layout/js/layout-modes/vertical"], function(i, o, n, s, r, a) {
		return e(t, i, o, n, s, r, a)
	}) : "object" == typeof module && module.exports ? module.exports = e(t, require("outlayer"), require("get-size"), require("desandro-matches-selector"), require("fizzy-ui-utils"), require("isotope-layout/js/item"), require("isotope-layout/js/layout-mode"), require("isotope-layout/js/layout-modes/masonry"), require("isotope-layout/js/layout-modes/fit-rows"), require("isotope-layout/js/layout-modes/vertical")) : t.Isotope = e(t, t.Outlayer, t.getSize, t.matchesSelector, t.fizzyUIUtils, t.Isotope.Item, t.Isotope.LayoutMode)
}(window, function(t, e, i, o, n, s, r) {
	function a(t, e) {
		return function(i, o) {
			for (var n = 0; n < t.length; n++) {
				var s = t[n],
					r = i.sortData[s],
					a = o.sortData[s];
				if (r > a || r < a) {
					var u = void 0 !== e[s] ? e[s] : e,
						h = u ? 1 : -1;
					return (r > a ? 1 : -1) * h
				}
			}
			return 0
		}
	}
	var u = t.jQuery,
		h = String.prototype.trim ? function(t) {
			return t.trim()
		} : function(t) {
			return t.replace(/^\s+|\s+$/g, "")
		},
		d = e.create("isotope", {
			layoutMode: "masonry",
			isJQueryFiltering: !0,
			sortAscending: !0
		});
	d.Item = s, d.LayoutMode = r;
	var l = d.prototype;
	l._create = function() {
		this.itemGUID = 0, this._sorters = {}, this._getSorters(), e.prototype._create.call(this), this.modes = {}, this.filteredItems = this.items, this.sortHistory = ["original-order"];
		for (var t in r.modes) this._initLayoutMode(t)
	}, l.reloadItems = function() {
		this.itemGUID = 0, e.prototype.reloadItems.call(this)
	}, l._itemize = function() {
		for (var t = e.prototype._itemize.apply(this, arguments), i = 0; i < t.length; i++) {
			var o = t[i];
			o.id = this.itemGUID++
		}
		return this._updateItemsSortData(t), t
	}, l._initLayoutMode = function(t) {
		var e = r.modes[t],
			i = this.options[t] || {};
		this.options[t] = e.options ? n.extend(e.options, i) : i, this.modes[t] = new e(this)
	}, l.layout = function() {
		return !this._isLayoutInited && this._getOption("initLayout") ? void this.arrange() : void this._layout()
	}, l._layout = function() {
		var t = this._getIsInstant();
		this._resetLayout(), this._manageStamps(), this.layoutItems(this.filteredItems, t), this._isLayoutInited = !0
	}, l.arrange = function(t) {
		this.option(t), this._getIsInstant();
		var e = this._filter(this.items);
		this.filteredItems = e.matches, this._bindArrangeComplete(), this._isInstant ? this._noTransition(this._hideReveal, [e]) : this._hideReveal(e), this._sort(), this._layout()
	}, l._init = l.arrange, l._hideReveal = function(t) {
		this.reveal(t.needReveal), this.hide(t.needHide)
	}, l._getIsInstant = function() {
		var t = this._getOption("layoutInstant"),
			e = void 0 !== t ? t : !this._isLayoutInited;
		return this._isInstant = e, e
	}, l._bindArrangeComplete = function() {
		function t() {
			e && i && o && n.dispatchEvent("arrangeComplete", null, [n.filteredItems])
		}
		var e, i, o, n = this;
		this.once("layoutComplete", function() {
			e = !0, t()
		}), this.once("hideComplete", function() {
			i = !0, t()
		}), this.once("revealComplete", function() {
			o = !0, t()
		})
	}, l._filter = function(t) {
		var e = this.options.filter;
		e = e || "*";
		for (var i = [], o = [], n = [], s = this._getFilterTest(e), r = 0; r < t.length; r++) {
			var a = t[r];
			if (!a.isIgnored) {
				var u = s(a);
				u && i.push(a), u && a.isHidden ? o.push(a) : u || a.isHidden || n.push(a)
			}
		}
		return {
			matches: i,
			needReveal: o,
			needHide: n
		}
	}, l._getFilterTest = function(t) {
		return u && this.options.isJQueryFiltering ? function(e) {
			return u(e.element).is(t);
		} : "function" == typeof t ? function(e) {
			return t(e.element)
		} : function(e) {
			return o(e.element, t)
		}
	}, l.updateSortData = function(t) {
		var e;
		t ? (t = n.makeArray(t), e = this.getItems(t)) : e = this.items, this._getSorters(), this._updateItemsSortData(e)
	}, l._getSorters = function() {
		var t = this.options.getSortData;
		for (var e in t) {
			var i = t[e];
			this._sorters[e] = f(i)
		}
	}, l._updateItemsSortData = function(t) {
		for (var e = t && t.length, i = 0; e && i < e; i++) {
			var o = t[i];
			o.updateSortData()
		}
	};
	var f = function() {
		function t(t) {
			if ("string" != typeof t) return t;
			var i = h(t).split(" "),
				o = i[0],
				n = o.match(/^\[(.+)\]$/),
				s = n && n[1],
				r = e(s, o),
				a = d.sortDataParsers[i[1]];
			return t = a ? function(t) {
				return t && a(r(t))
			} : function(t) {
				return t && r(t)
			}
		}

		function e(t, e) {
			return t ? function(e) {
				return e.getAttribute(t)
			} : function(t) {
				var i = t.querySelector(e);
				return i && i.textContent
			}
		}
		return t
	}();
	d.sortDataParsers = {
		parseInt: function(t) {
			return parseInt(t, 10)
		},
		parseFloat: function(t) {
			return parseFloat(t)
		}
	}, l._sort = function() {
		if (this.options.sortBy) {
			var t = n.makeArray(this.options.sortBy);
			this._getIsSameSortBy(t) || (this.sortHistory = t.concat(this.sortHistory));
			var e = a(this.sortHistory, this.options.sortAscending);
			this.filteredItems.sort(e)
		}
	}, l._getIsSameSortBy = function(t) {
		for (var e = 0; e < t.length; e++)
			if (t[e] != this.sortHistory[e]) return !1;
		return !0
	}, l._mode = function() {
		var t = this.options.layoutMode,
			e = this.modes[t];
		if (!e) throw new Error("No layout mode: " + t);
		return e.options = this.options[t], e
	}, l._resetLayout = function() {
		e.prototype._resetLayout.call(this), this._mode()._resetLayout()
	}, l._getItemLayoutPosition = function(t) {
		return this._mode()._getItemLayoutPosition(t)
	}, l._manageStamp = function(t) {
		this._mode()._manageStamp(t)
	}, l._getContainerSize = function() {
		return this._mode()._getContainerSize()
	}, l.needsResizeLayout = function() {
		return this._mode().needsResizeLayout()
	}, l.appended = function(t) {
		var e = this.addItems(t);
		if (e.length) {
			var i = this._filterRevealAdded(e);
			this.filteredItems = this.filteredItems.concat(i)
		}
	}, l.prepended = function(t) {
		var e = this._itemize(t);
		if (e.length) {
			this._resetLayout(), this._manageStamps();
			var i = this._filterRevealAdded(e);
			this.layoutItems(this.filteredItems), this.filteredItems = i.concat(this.filteredItems), this.items = e.concat(this.items)
		}
	}, l._filterRevealAdded = function(t) {
		var e = this._filter(t);
		return this.hide(e.needHide), this.reveal(e.matches), this.layoutItems(e.matches, !0), e.matches
	}, l.insert = function(t) {
		var e = this.addItems(t);
		if (e.length) {
			var i, o, n = e.length;
			for (i = 0; i < n; i++) o = e[i], this.element.appendChild(o.element);
			var s = this._filter(e).matches;
			for (i = 0; i < n; i++) e[i].isLayoutInstant = !0;
			for (this.arrange(), i = 0; i < n; i++) delete e[i].isLayoutInstant;
			this.reveal(s)
		}
	};
	var c = l.remove;
	return l.remove = function(t) {
		t = n.makeArray(t);
		var e = this.getItems(t);
		c.call(this, t);
		for (var i = e && e.length, o = 0; i && o < i; o++) {
			var s = e[o];
			n.removeFrom(this.filteredItems, s)
		}
	}, l.shuffle = function() {
		for (var t = 0; t < this.items.length; t++) {
			var e = this.items[t];
			e.sortData.random = Math.random()
		}
		this.options.sortBy = "random", this._sort(), this._layout()
	}, l._noTransition = function(t, e) {
		var i = this.options.transitionDuration;
		this.options.transitionDuration = 0;
		var o = t.apply(this, e);
		return this.options.transitionDuration = i, o
	}, l.getFilteredItemElements = function() {
		return this.filteredItems.map(function(t) {
			return t.element
		})
	}, d
});
/*!
 * Packery layout mode PACKAGED v2.0.1
 * sub-classes Packery
 */
! function(a, b) {
	"function" == typeof define && define.amd ? define("packery/js/rect", b) : "object" == typeof module && module.exports ? module.exports = b() : (a.Packery = a.Packery || {}, a.Packery.Rect = b())
}(window, function() {
	function a(b) {
		for (var c in a.defaults) this[c] = a.defaults[c];
		for (c in b) this[c] = b[c]
	}
	a.defaults = {
		x: 0,
		y: 0,
		width: 0,
		height: 0
	};
	var b = a.prototype;
	return b.contains = function(a) {
		var b = a.width || 0,
			c = a.height || 0;
		return this.x <= a.x && this.y <= a.y && this.x + this.width >= a.x + b && this.y + this.height >= a.y + c
	}, b.overlaps = function(a) {
		var b = this.x + this.width,
			c = this.y + this.height,
			d = a.x + a.width,
			e = a.y + a.height;
		return this.x < d && b > a.x && this.y < e && c > a.y
	}, b.getMaximalFreeRects = function(b) {
		if (!this.overlaps(b)) return !1;
		var c, d = [],
			e = this.x + this.width,
			f = this.y + this.height,
			g = b.x + b.width,
			h = b.y + b.height;
		return this.y < b.y && (c = new a({
			x: this.x,
			y: this.y,
			width: this.width,
			height: b.y - this.y
		}), d.push(c)), e > g && (c = new a({
			x: g,
			y: this.y,
			width: e - g,
			height: this.height
		}), d.push(c)), f > h && (c = new a({
			x: this.x,
			y: h,
			width: this.width,
			height: f - h
		}), d.push(c)), this.x < b.x && (c = new a({
			x: this.x,
			y: this.y,
			width: b.x - this.x,
			height: this.height
		}), d.push(c)), d
	}, b.canFit = function(a) {
		return this.width >= a.width && this.height >= a.height
	}, a
}),
function(a, b) {
	if ("function" == typeof define && define.amd) define("packery/js/packer", ["./rect"], b);
	else if ("object" == typeof module && module.exports) module.exports = b(require("./rect"));
	else {
		var c = a.Packery = a.Packery || {};
		c.Packer = b(c.Rect)
	}
}(window, function(a) {
	function b(a, b, c) {
		this.width = a || 0, this.height = b || 0, this.sortDirection = c || "downwardLeftToRight", this.reset()
	}
	var c = b.prototype;
	c.reset = function() {
		this.spaces = [];
		var b = new a({
			x: 0,
			y: 0,
			width: this.width,
			height: this.height
		});
		this.spaces.push(b), this.sorter = d[this.sortDirection] || d.downwardLeftToRight
	}, c.pack = function(a) {
		for (var b = 0; b < this.spaces.length; b++) {
			var c = this.spaces[b];
			if (c.canFit(a)) {
				this.placeInSpace(a, c);
				break
			}
		}
	}, c.columnPack = function(a) {
		for (var b = 0; b < this.spaces.length; b++) {
			var c = this.spaces[b],
				d = c.x <= a.x && c.x + c.width >= a.x + a.width && c.height >= a.height - .01;
			if (d) {
				a.y = c.y, this.placed(a);
				break
			}
		}
	}, c.rowPack = function(a) {
		for (var b = 0; b < this.spaces.length; b++) {
			var c = this.spaces[b],
				d = c.y <= a.y && c.y + c.height >= a.y + a.height && c.width >= a.width - .01;
			if (d) {
				a.x = c.x, this.placed(a);
				break
			}
		}
	}, c.placeInSpace = function(a, b) {
		a.x = b.x, a.y = b.y, this.placed(a)
	}, c.placed = function(a) {
		for (var b = [], c = 0; c < this.spaces.length; c++) {
			var d = this.spaces[c],
				e = d.getMaximalFreeRects(a);
			e ? b.push.apply(b, e) : b.push(d)
		}
		this.spaces = b, this.mergeSortSpaces()
	}, c.mergeSortSpaces = function() {
		b.mergeRects(this.spaces), this.spaces.sort(this.sorter)
	}, c.addSpace = function(a) {
		this.spaces.push(a), this.mergeSortSpaces()
	}, b.mergeRects = function(a) {
		var b = 0,
			c = a[b];
		a: for (; c;) {
			for (var d = 0, e = a[b + d]; e;) {
				if (e == c) d++;
				else {
					if (e.contains(c)) {
						a.splice(b, 1), c = a[b];
						continue a
					}
					c.contains(e) ? a.splice(b + d, 1) : d++
				}
				e = a[b + d]
			}
			b++, c = a[b]
		}
		return a
	};
	var d = {
		downwardLeftToRight: function(a, b) {
			return a.y - b.y || a.x - b.x
		},
		rightwardTopToBottom: function(a, b) {
			return a.x - b.x || a.y - b.y
		}
	};
	return b
}),
function(a, b) {
	"function" == typeof define && define.amd ? define("packery/js/item", ["outlayer/outlayer", "./rect"], b) : "object" == typeof module && module.exports ? module.exports = b(require("outlayer"), require("./rect")) : a.Packery.Item = b(a.Outlayer, a.Packery.Rect)
}(window, function(a, b) {
	var c = document.documentElement.style,
		d = "string" == typeof c.transform ? "transform" : "WebkitTransform",
		e = function() {
			a.Item.apply(this, arguments)
		},
		f = e.prototype = Object.create(a.Item.prototype),
		g = f._create;
	f._create = function() {
		g.call(this), this.rect = new b
	};
	var h = f.moveTo;
	return f.moveTo = function(a, b) {
		var c = Math.abs(this.position.x - a),
			d = Math.abs(this.position.y - b),
			e = this.layout.dragItemCount && !this.isPlacing && !this.isTransitioning && 1 > c && 1 > d;
		return e ? void this.goTo(a, b) : void h.apply(this, arguments)
	}, f.enablePlacing = function() {
		this.removeTransitionStyles(), this.isTransitioning && d && (this.element.style[d] = "none"), this.isTransitioning = !1, this.getSize(), this.layout._setRectSize(this.element, this.rect), this.isPlacing = !0
	}, f.disablePlacing = function() {
		this.isPlacing = !1
	}, f.removeElem = function() {
		this.element.parentNode.removeChild(this.element), this.layout.packer.addSpace(this.rect), this.emitEvent("remove", [this])
	}, f.showDropPlaceholder = function() {
		var a = this.dropPlaceholder;
		a || (a = this.dropPlaceholder = document.createElement("div"), a.className = "packery-drop-placeholder", a.style.position = "absolute"), a.style.width = this.size.width + "px", a.style.height = this.size.height + "px", this.positionDropPlaceholder(), this.layout.element.appendChild(a)
	}, f.positionDropPlaceholder = function() {
		this.dropPlaceholder.style[d] = "translate(" + this.rect.x + "px, " + this.rect.y + "px)"
	}, f.hideDropPlaceholder = function() {
		this.layout.element.removeChild(this.dropPlaceholder)
	}, e
}),
function(a, b) {
	"function" == typeof define && define.amd ? define("packery/js/packery", ["get-size/get-size", "outlayer/outlayer", "./rect", "./packer", "./item"], b) : "object" == typeof module && module.exports ? module.exports = b(require("get-size"), require("outlayer"), require("./rect"), require("./packer"), require("./item")) : a.Packery = b(a.getSize, a.Outlayer, a.Packery.Rect, a.Packery.Packer, a.Packery.Item)
}(window, function(a, b, c, d, e) {
	function f(a, b) {
		return a.position.y - b.position.y || a.position.x - b.position.x
	}

	function g(a, b) {
		return a.position.x - b.position.x || a.position.y - b.position.y
	}

	function h(a, b) {
		var c = b.x - a.x,
			d = b.y - a.y;
		return Math.sqrt(c * c + d * d)
	}
	c.prototype.canFit = function(a) {
		return this.width >= a.width - 1 && this.height >= a.height - 1
	};
	var i = b.create("packery");
	i.Item = e;
	var j = i.prototype;
	j._create = function() {
		b.prototype._create.call(this), this.packer = new d, this.shiftPacker = new d, this.isEnabled = !0, this.dragItemCount = 0;
		var a = this;
		this.handleDraggabilly = {
			dragStart: function() {
				a.itemDragStart(this.element)
			},
			dragMove: function() {
				a.itemDragMove(this.element, this.position.x, this.position.y)
			},
			dragEnd: function() {
				a.itemDragEnd(this.element)
			}
		}, this.handleUIDraggable = {
			start: function(b, c) {
				c && a.itemDragStart(b.currentTarget)
			},
			drag: function(b, c) {
				c && a.itemDragMove(b.currentTarget, c.position.left, c.position.top)
			},
			stop: function(b, c) {
				c && a.itemDragEnd(b.currentTarget)
			}
		}
	}, j._resetLayout = function() {
		this.getSize(), this._getMeasurements();
		var a, b, c;
		this._getOption("horizontal") ? (a = 1 / 0, b = this.size.innerHeight + this.gutter, c = "rightwardTopToBottom") : (a = this.size.innerWidth + this.gutter, b = 1 / 0, c = "downwardLeftToRight"), this.packer.width = this.shiftPacker.width = a, this.packer.height = this.shiftPacker.height = b, this.packer.sortDirection = this.shiftPacker.sortDirection = c, this.packer.reset(), this.maxY = 0, this.maxX = 0
	}, j._getMeasurements = function() {
		this._getMeasurement("columnWidth", "width"), this._getMeasurement("rowHeight", "height"), this._getMeasurement("gutter", "width")
	}, j._getItemLayoutPosition = function(a) {
		if (this._setRectSize(a.element, a.rect), this.isShifting || this.dragItemCount > 0) {
			var b = this._getPackMethod();
			this.packer[b](a.rect)
		} else this.packer.pack(a.rect);
		return this._setMaxXY(a.rect), a.rect
	}, j.shiftLayout = function() {
		this.isShifting = !0, this.layout(), delete this.isShifting
	}, j._getPackMethod = function() {
		return this._getOption("horizontal") ? "rowPack" : "columnPack"
	}, j._setMaxXY = function(a) {
		this.maxX = Math.max(a.x + a.width, this.maxX), this.maxY = Math.max(a.y + a.height, this.maxY)
	}, j._setRectSize = function(b, c) {
		var d = a(b),
			e = d.outerWidth,
			f = d.outerHeight;
		(e || f) && (e = this._applyGridGutter(e, this.columnWidth), f = this._applyGridGutter(f, this.rowHeight)), c.width = Math.min(e, this.packer.width), c.height = Math.min(f, this.packer.height)
	}, j._applyGridGutter = function(a, b) {
		if (!b) return a + this.gutter;
		b += this.gutter;
		var c = a % b,
			d = c && 1 > c ? "round" : "ceil";
		return a = Math[d](a / b) * b
	}, j._getContainerSize = function() {
		return this._getOption("horizontal") ? {
			width: this.maxX - this.gutter
		} : {
			height: this.maxY - this.gutter
		}
	}, j._manageStamp = function(a) {
		var b, d = this.getItem(a);
		if (d && d.isPlacing) b = d.rect;
		else {
			var e = this._getElementOffset(a);
			b = new c({
				x: this._getOption("originLeft") ? e.left : e.right,
				y: this._getOption("originTop") ? e.top : e.bottom
			})
		}
		this._setRectSize(a, b), this.packer.placed(b), this._setMaxXY(b)
	}, j.sortItemsByPosition = function() {
		var a = this._getOption("horizontal") ? g : f;
		this.items.sort(a)
	}, j.fit = function(a, b, c) {
		var d = this.getItem(a);
		d && (this.stamp(d.element), d.enablePlacing(), this.updateShiftTargets(d), b = void 0 === b ? d.rect.x : b, c = void 0 === c ? d.rect.y : c, this.shift(d, b, c), this._bindFitEvents(d), d.moveTo(d.rect.x, d.rect.y), this.shiftLayout(), this.unstamp(d.element), this.sortItemsByPosition(), d.disablePlacing())
	}, j._bindFitEvents = function(a) {
		function b() {
			d++, 2 == d && c.dispatchEvent("fitComplete", null, [a])
		}
		var c = this,
			d = 0;
		a.once("layout", b), this.once("layoutComplete", b)
	}, j.resize = function() {
		this.isResizeBound && this.needsResizeLayout() && (this.options.shiftPercentResize ? this.resizeShiftPercentLayout() : this.layout())
	}, j.needsResizeLayout = function() {
		var b = a(this.element),
			c = this._getOption("horizontal") ? "innerHeight" : "innerWidth";
		return b[c] != this.size[c]
	}, j.resizeShiftPercentLayout = function() {
		var b = this._getItemsForLayout(this.items),
			c = this._getOption("horizontal"),
			d = c ? "y" : "x",
			e = c ? "height" : "width",
			f = c ? "rowHeight" : "columnWidth",
			g = c ? "innerHeight" : "innerWidth",
			h = this[f];
		if (h = h && h + this.gutter) {
			this._getMeasurements();
			var i = this[f] + this.gutter;
			b.forEach(function(a) {
				var b = Math.round(a.rect[d] / h);
				a.rect[d] = b * i
			})
		} else {
			var j = a(this.element)[g] + this.gutter,
				k = this.packer[e];
			b.forEach(function(a) {
				a.rect[d] = a.rect[d] / k * j
			})
		}
		this.shiftLayout()
	}, j.itemDragStart = function(a) {
		if (this.isEnabled) {
			this.stamp(a);
			var b = this.getItem(a);
			b && (b.enablePlacing(), b.showDropPlaceholder(), this.dragItemCount++, this.updateShiftTargets(b))
		}
	}, j.updateShiftTargets = function(a) {
		this.shiftPacker.reset(), this._getBoundingRect();
		var b = this._getOption("originLeft"),
			d = this._getOption("originTop");
		this.stamps.forEach(function(a) {
			var e = this.getItem(a);
			if (!e || !e.isPlacing) {
				var f = this._getElementOffset(a),
					g = new c({
						x: b ? f.left : f.right,
						y: d ? f.top : f.bottom
					});
				this._setRectSize(a, g), this.shiftPacker.placed(g)
			}
		}, this);
		var e = this._getOption("horizontal"),
			f = e ? "rowHeight" : "columnWidth",
			g = e ? "height" : "width";
		this.shiftTargetKeys = [], this.shiftTargets = [];
		var h, i = this[f];
		if (i = i && i + this.gutter) {
			var j = Math.ceil(a.rect[g] / i),
				k = Math.floor((this.shiftPacker[g] + this.gutter) / i);
			h = (k - j) * i;
			for (var l = 0; k > l; l++) this._addShiftTarget(l * i, 0, h)
		} else h = this.shiftPacker[g] + this.gutter - a.rect[g], this._addShiftTarget(0, 0, h);
		var m = this._getItemsForLayout(this.items),
			n = this._getPackMethod();
		m.forEach(function(a) {
			var b = a.rect;
			this._setRectSize(a.element, b), this.shiftPacker[n](b), this._addShiftTarget(b.x, b.y, h);
			var c = e ? b.x + b.width : b.x,
				d = e ? b.y : b.y + b.height;
			if (this._addShiftTarget(c, d, h), i)
				for (var f = Math.round(b[g] / i), j = 1; f > j; j++) {
					var k = e ? c : b.x + i * j,
						l = e ? b.y + i * j : d;
					this._addShiftTarget(k, l, h)
				}
		}, this)
	}, j._addShiftTarget = function(a, b, c) {
		var d = this._getOption("horizontal") ? b : a;
		if (!(0 !== d && d > c)) {
			var e = a + "," + b,
				f = -1 != this.shiftTargetKeys.indexOf(e);
			f || (this.shiftTargetKeys.push(e), this.shiftTargets.push({
				x: a,
				y: b
			}))
		}
	}, j.shift = function(a, b, c) {
		var d, e = 1 / 0,
			f = {
				x: b,
				y: c
			};
		this.shiftTargets.forEach(function(a) {
			var b = h(a, f);
			e > b && (d = a, e = b)
		}), a.rect.x = d.x, a.rect.y = d.y
	};
	var k = 120;
	j.itemDragMove = function(a, b, c) {
		function d() {
			f.shift(e, b, c), e.positionDropPlaceholder(), f.layout()
		}
		var e = this.isEnabled && this.getItem(a);
		if (e) {
			b -= this.size.paddingLeft, c -= this.size.paddingTop;
			var f = this,
				g = new Date;
			this._itemDragTime && g - this._itemDragTime < k ? (clearTimeout(this.dragTimeout), this.dragTimeout = setTimeout(d, k)) : (d(), this._itemDragTime = g)
		}
	}, j.itemDragEnd = function(a) {
		function b() {
			d++, 2 == d && (c.element.classList.remove("is-positioning-post-drag"), c.hideDropPlaceholder(), e.dispatchEvent("dragItemPositioned", null, [c]))
		}
		var c = this.isEnabled && this.getItem(a);
		if (c) {
			clearTimeout(this.dragTimeout), c.element.classList.add("is-positioning-post-drag");
			var d = 0,
				e = this;
			c.once("layout", b), this.once("layoutComplete", b), c.moveTo(c.rect.x, c.rect.y), this.layout(), this.dragItemCount = Math.max(0, this.dragItemCount - 1), this.sortItemsByPosition(), c.disablePlacing(), this.unstamp(c.element)
		}
	}, j.bindDraggabillyEvents = function(a) {
		this._bindDraggabillyEvents(a, "on")
	}, j.unbindDraggabillyEvents = function(a) {
		this._bindDraggabillyEvents(a, "off")
	}, j._bindDraggabillyEvents = function(a, b) {
		var c = this.handleDraggabilly;
		a[b]("dragStart", c.dragStart), a[b]("dragMove", c.dragMove), a[b]("dragEnd", c.dragEnd)
	}, j.bindUIDraggableEvents = function(a) {
		this._bindUIDraggableEvents(a, "on")
	}, j.unbindUIDraggableEvents = function(a) {
		this._bindUIDraggableEvents(a, "off")
	}, j._bindUIDraggableEvents = function(a, b) {
		var c = this.handleUIDraggable;
		a[b]("dragstart", c.start)[b]("drag", c.drag)[b]("dragstop", c.stop)
	};
	var l = j.destroy;
	return j.destroy = function() {
		l.apply(this, arguments), this.isEnabled = !1
	}, i.Rect = c, i.Packer = d, i
}),
function(a, b) {
	"function" == typeof define && define.amd ? define(["isotope-layout/js/layout-mode", "packery/js/packery"], b) : "object" == typeof module && module.exports ? module.exports = b(require("isotope-layout/js/layout-mode"), require("packery")) : b(a.Isotope.LayoutMode, a.Packery)
}(window, function(a, b) {
	var c = a.create("packery"),
		d = c.prototype,
		e = {
			_getElementOffset: !0,
			_getMeasurement: !0
		};
	for (var f in b.prototype) e[f] || (d[f] = b.prototype[f]);
	var g = d._resetLayout;
	d._resetLayout = function() {
		this.packer = this.packer || new b.Packer, this.shiftPacker = this.shiftPacker || new b.Packer, g.apply(this, arguments)
	};
	var h = d._getItemLayoutPosition;
	d._getItemLayoutPosition = function(a) {
		return a.rect = a.rect || new b.Rect, h.call(this, a)
	};
	var i = d.needsResizeLayout;
	d.needsResizeLayout = function() {
		return this._getOption("horizontal") ? this.needsVerticalResizeLayout() : i.call(this)
	};
	var j = d._getOption;
	return d._getOption = function(a) {
		return "horizontal" == a ? void 0 !== this.options.isHorizontal ? this.options.isHorizontal : this.options.horizontal : j.apply(this.isotope, arguments)
	}, c
});
/*!
 * masonryHorizontal layout mode for Isotope
 * v2.0.1
 * https://isotope.metafizzy.co/layout-modes/masonryhorizontal.html
 */
(function(window, factory) {
	'use strict';
	if (typeof define === 'function' && define.amd) {
		define(['get-size/get-size', 'isotope-layout/js/layout-mode'], factory);
	} else if (typeof module == 'object' && module.exports) {
		module.exports = factory(require('get-size'), require('isotope-layout/js/layout-mode'));
	} else {
		factory(window.getSize, window.Isotope.LayoutMode);
	}
}(window, function factory(getSize, LayoutMode) {
	'use strict';
	var MasonryHorizontal = LayoutMode.create('masonryHorizontal');
	var proto = MasonryHorizontal.prototype;
	proto._resetLayout = function() {
		this.getRowHeight();
		this._getMeasurement('gutter', 'outerHeight');
		this.rowHeight += this.gutter;
		this.rows = Math.floor((this.isotope.size.innerHeight + this.gutter) / this.rowHeight);
		this.rows = Math.max(this.rows, 1);
		var i = this.rows;
		this.rowXs = [];
		while (i--) {
			this.rowXs.push(0);
		}
		this.maxX = 0;
	};
	proto._getItemLayoutPosition = function(item) {
		item.getSize();
		var remainder = item.size.outerHeight % this.rowHeight;
		var mathMethod = remainder && remainder < 1 ? 'round' : 'ceil';
		var rowSpan = Math[mathMethod](item.size.outerHeight / this.rowHeight);
		rowSpan = Math.min(rowSpan, this.rows);
		var rowGroup = this._getRowGroup(rowSpan);
		var minimumX = Math.min.apply(Math, rowGroup);
		var shortRowIndex = rowGroup.indexOf(minimumX);
		var position = {
			x: minimumX,
			y: this.rowHeight * shortRowIndex
		};
		var setWidth = minimumX + item.size.outerWidth;
		var setSpan = this.rows + 1 - rowGroup.length;
		for (var i = 0; i < setSpan; i++) {
			this.rowXs[shortRowIndex + i] = setWidth;
		}
		return position;
	};
	proto._getRowGroup = function(rowSpan) {
		if (rowSpan < 2) {
			return this.rowXs;
		}
		var rowGroup = [];
		var groupCount = this.rows + 1 - rowSpan;
		for (var i = 0; i < groupCount; i++) {
			var groupRowXs = this.rowXs.slice(i, i + rowSpan);
			rowGroup[i] = Math.max.apply(Math, groupRowXs);
		}
		return rowGroup;
	};
	proto._manageStamp = function(stamp) {
		var stampSize = getSize(stamp);
		var offset = this.isotope._getElementOffset(stamp);
		var firstY = this._getOption('originTop') ? offset.top : offset.bottom;
		var lastY = firstY + stampSize.outerHeight;
		var firstRow = Math.floor(firstY / this.rowHeight);
		firstRow = Math.max(0, firstRow);
		var lastRow = Math.floor(lastY / this.rowHeight);
		lastRow = Math.min(this.rows - 1, lastRow);
		var stampMaxX = (this._getOption('originLeft') ? offset.left : offset.right) +
			stampSize.outerWidth;
		for (var i = firstRow; i <= lastRow; i++) {
			this.rowXs[i] = Math.max(stampMaxX, this.rowXs[i]);
		}
	};
	proto._getContainerSize = function() {
		this.maxX = Math.max.apply(Math, this.rowXs);
		return {
			width: this.maxX
		};
	};
	proto.needsResizeLayout = function() {
		return this.needsVerticalResizeLayout();
	};
	return MasonryHorizontal;
}));

function Animations(elm) {
	let Self = this;
	this.init = () => {
		this.elm = document.querySelector(elm);
		if (!this.elm) {
			return
		}
		inView.threshold(0.2);
		const observer = new IntersectionObserver(entries => {
			entries.forEach(entry => {
				entry.target.classList.add('scroll-init');
				if (entry.isIntersecting) {
					entry.target.classList.add('in-view');
				}
			});
		});
		document.querySelectorAll('.on-scroll').forEach(el => {
			observer.observe(el);
		});
		this.triggerAnimation();
	};
	this.triggerAnimation = () => {
		let elm = document.querySelectorAll('[data-animation]');
		if (elm) {
			let count = 0;
			elm.forEach(element => {
				if (element == document.querySelector('.banner--homepage__content--title')) {
					window.addEventListener('DOMContentLoaded', () => {
						setTimeout(() => {
							if (!element.classList.contains('animation-trigger')) {
								element.classList.add('animation-trigger');
								let animation = element.dataset.animation;
								element.dataset.animationKey = count;
								if (typeof this.animation[animation] !== 'undefined') {
									this.animation[animation].init(element, count);
								}
								count++;
							}
						}, 2300);
					});
				} else {
					if (!element.classList.contains('animation-trigger')) {
						element.classList.add('animation-trigger');
						let animation = element.dataset.animation;
						element.dataset.animationKey = count;
						if (typeof this.animation[animation] !== 'undefined') {
							this.animation[animation].init(element, count);
						}
						count++;
					}
				}
			});
		}
	};
	this.animation = {
		staggerText: {
			namespace: 'staggerText',
			init: (elm, key) => {
				let tl = new TimelineMax({
					paused: true
				});
				let alpha = Splitting({
					target: elm,
					by: 'chars'
				});
				tl.staggerFrom(alpha[0].chars, 1, {
					y: '-110%',
					ease: Power4.easeOut,
					delay: 0.2
				}, 0.03, 0.48);
				if (inView.is(elm) && !elm.classList.contains('animation-running')) {
					elm.classList.add('animation-running');
					tl.play();
				} else {
					inView('[data-animation-key="' + key + '"]').on('enter', el => {
						if (el == elm && !el.inViewDone && !elm.classList.contains('animation-running')) {
							elm.classList.add('animation-running');
							tl.play();
						}
					}).on('exit', el => (el.inViewDone = true));
				}
			}
		}
	};
};
document.addEventListener('DOMContentLoaded', () => {
	const run = new Animations('#main-content');
	run.init();
});
! function(e, t) {
	"object" == typeof exports && "undefined" != typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define(t) : (e = e || self).GLightbox = t()
}(this, (function() {
	"use strict";

	function e(t) {
		return (e = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
			return typeof e
		} : function(e) {
			return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
		})(t)
	}

	function t(e, t) {
		if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
	}

	function i(e, t) {
		for (var i = 0; i < t.length; i++) {
			var n = t[i];
			n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
		}
	}

	function n(e, t, n) {
		return t && i(e.prototype, t), n && i(e, n), e
	}
	var s = Date.now();

	function l() {
		var e = {},
			t = !0,
			i = 0,
			n = arguments.length;
		"[object Boolean]" === Object.prototype.toString.call(arguments[0]) && (t = arguments[0], i++);
		for (var s = function(i) {
				for (var n in i) Object.prototype.hasOwnProperty.call(i, n) && (t && "[object Object]" === Object.prototype.toString.call(i[n]) ? e[n] = l(!0, e[n], i[n]) : e[n] = i[n])
			}; i < n; i++) {
			var o = arguments[i];
			s(o)
		}
		return e
	}

	function o(e, t) {
		if ((k(e) || e === window || e === document) && (e = [e]), A(e) || L(e) || (e = [e]), 0 != P(e))
			if (A(e) && !L(e))
				for (var i = e.length, n = 0; n < i && !1 !== t.call(e[n], e[n], n, e); n++);
			else if (L(e))
			for (var s in e)
				if (O(e, s) && !1 === t.call(e[s], e[s], s, e)) break
	}

	function r(e) {
		var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null,
			i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : null,
			n = e[s] = e[s] || [],
			l = {
				all: n,
				evt: null,
				found: null
			};
		return t && i && P(n) > 0 && o(n, (function(e, n) {
			if (e.eventName == t && e.fn.toString() == i.toString()) return l.found = !0, l.evt = n, !1
		})), l
	}

	function a(e) {
		var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
			i = t.onElement,
			n = t.withCallback,
			s = t.avoidDuplicate,
			l = void 0 === s || s,
			a = t.once,
			h = void 0 !== a && a,
			d = t.useCapture,
			c = void 0 !== d && d,
			u = arguments.length > 2 ? arguments[2] : void 0,
			g = i || [];

		function v(e) {
			T(n) && n.call(u, e, this), h && v.destroy()
		}
		return C(g) && (g = document.querySelectorAll(g)), v.destroy = function() {
			o(g, (function(t) {
				var i = r(t, e, v);
				i.found && i.all.splice(i.evt, 1), t.removeEventListener && t.removeEventListener(e, v, c)
			}))
		}, o(g, (function(t) {
			var i = r(t, e, v);
			(t.addEventListener && l && !i.found || !l) && (t.addEventListener(e, v, c), i.all.push({
				eventName: e,
				fn: v
			}))
		})), v
	}

	function h(e, t) {
		o(t.split(" "), (function(t) {
			return e.classList.add(t)
		}))
	}

	function d(e, t) {
		o(t.split(" "), (function(t) {
			return e.classList.remove(t)
		}))
	}

	function c(e, t) {
		return e.classList.contains(t)
	}

	function u(e, t) {
		for (; e !== document.body;) {
			if (!(e = e.parentElement)) return !1;
			if ("function" == typeof e.matches ? e.matches(t) : e.msMatchesSelector(t)) return e
		}
	}

	function g(e) {
		var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "",
			i = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
		if (!e || "" === t) return !1;
		if ("none" == t) return T(i) && i(), !1;
		var n = x(),
			s = t.split(" ");
		o(s, (function(t) {
			h(e, "g" + t)
		})), a(n, {
			onElement: e,
			avoidDuplicate: !1,
			once: !0,
			withCallback: function(e, t) {
				o(s, (function(e) {
					d(t, "g" + e)
				})), T(i) && i()
			}
		})
	}

	function v(e) {
		var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "";
		if ("" == t) return e.style.webkitTransform = "", e.style.MozTransform = "", e.style.msTransform = "", e.style.OTransform = "", e.style.transform = "", !1;
		e.style.webkitTransform = t, e.style.MozTransform = t, e.style.msTransform = t, e.style.OTransform = t, e.style.transform = t
	}

	function f(e) {
		e.style.display = "block"
	}

	function p(e) {
		e.style.display = "none"
	}

	function m(e) {
		var t = document.createDocumentFragment(),
			i = document.createElement("div");
		for (i.innerHTML = e; i.firstChild;) t.appendChild(i.firstChild);
		return t
	}

	function y() {
		return {
			width: window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
			height: window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
		}
	}

	function x() {
		var e, t = document.createElement("fakeelement"),
			i = {
				animation: "animationend",
				OAnimation: "oAnimationEnd",
				MozAnimation: "animationend",
				WebkitAnimation: "webkitAnimationEnd"
			};
		for (e in i)
			if (void 0 !== t.style[e]) return i[e]
	}

	function b(e, t, i, n) {
		if (e()) t();
		else {
			var s;
			i || (i = 100);
			var l = setInterval((function() {
				e() && (clearInterval(l), s && clearTimeout(s), t())
			}), i);
			n && (s = setTimeout((function() {
				clearInterval(l)
			}), n))
		}
	}

	function S(e, t, i) {
		if (I(e)) console.error("Inject assets error");
		else if (T(t) && (i = t, t = !1), C(t) && t in window) T(i) && i();
		else {
			var n;
			if (-1 !== e.indexOf(".css")) {
				if ((n = document.querySelectorAll('link[href="' + e + '"]')) && n.length > 0) return void(T(i) && i());
				var s = document.getElementsByTagName("head")[0],
					l = s.querySelectorAll('link[rel="stylesheet"]'),
					o = document.createElement("link");
				return o.rel = "stylesheet", o.type = "text/css", o.href = e, o.media = "all", l ? s.insertBefore(o, l[0]) : s.appendChild(o), void(T(i) && i())
			}
			if ((n = document.querySelectorAll('script[src="' + e + '"]')) && n.length > 0) {
				if (T(i)) {
					if (C(t)) return b((function() {
						return void 0 !== window[t]
					}), (function() {
						i()
					})), !1;
					i()
				}
			} else {
				var r = document.createElement("script");
				r.type = "text/javascript", r.src = e, r.onload = function() {
					if (T(i)) {
						if (C(t)) return b((function() {
							return void 0 !== window[t]
						}), (function() {
							i()
						})), !1;
						i()
					}
				}, document.body.appendChild(r)
			}
		}
	}

	function w() {
		return "navigator" in window && window.navigator.userAgent.match(/(iPad)|(iPhone)|(iPod)|(Android)|(PlayBook)|(BB10)|(BlackBerry)|(Opera Mini)|(IEMobile)|(webOS)|(MeeGo)/i)
	}

	function T(e) {
		return "function" == typeof e
	}

	function C(e) {
		return "string" == typeof e
	}

	function k(e) {
		return !(!e || !e.nodeType || 1 != e.nodeType)
	}

	function E(e) {
		return Array.isArray(e)
	}

	function A(e) {
		return e && e.length && isFinite(e.length)
	}

	function L(t) {
		return "object" === e(t) && null != t && !T(t) && !E(t)
	}

	function I(e) {
		return null == e
	}

	function O(e, t) {
		return null !== e && hasOwnProperty.call(e, t)
	}

	function P(e) {
		if (L(e)) {
			if (e.keys) return e.keys().length;
			var t = 0;
			for (var i in e) O(e, i) && t++;
			return t
		}
		return e.length
	}

	function z(e) {
		return !isNaN(parseFloat(e)) && isFinite(e)
	}

	function M() {
		var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : -1,
			t = document.querySelectorAll(".gbtn[data-taborder]:not(.disabled)");
		if (!t.length) return !1;
		if (1 == t.length) return t[0];
		"string" == typeof e && (e = parseInt(e));
		var i = e < 0 ? 1 : e + 1;
		i > t.length && (i = "1");
		var n = [];
		o(t, (function(e) {
			n.push(e.getAttribute("data-taborder"))
		}));
		var s = n.filter((function(e) {
				return e >= parseInt(i)
			})),
			l = s.sort()[0];
		return document.querySelector('.gbtn[data-taborder="'.concat(l, '"]'))
	}

	function X(e) {
		if (e.events.hasOwnProperty("keyboard")) return !1;
		e.events.keyboard = a("keydown", {
			onElement: window,
			withCallback: function(t, i) {
				var n = (t = t || window.event).keyCode;
				if (9 == n) {
					var s = document.querySelector(".gbtn.focused");
					if (!s) {
						var l = !(!document.activeElement || !document.activeElement.nodeName) && document.activeElement.nodeName.toLocaleLowerCase();
						if ("input" == l || "textarea" == l || "button" == l) return
					}
					t.preventDefault();
					var o = document.querySelectorAll(".gbtn[data-taborder]");
					if (!o || o.length <= 0) return;
					if (!s) {
						var r = M();
						return void(r && (r.focus(), h(r, "focused")))
					}
					var a = M(s.getAttribute("data-taborder"));
					d(s, "focused"), a && (a.focus(), h(a, "focused"))
				}
				39 == n && e.nextSlide(), 37 == n && e.prevSlide(), 27 == n && e.close()
			}
		})
	}

	function Y(e) {
		return Math.sqrt(e.x * e.x + e.y * e.y)
	}

	function q(e, t) {
		var i = function(e, t) {
			var i = Y(e) * Y(t);
			if (0 === i) return 0;
			var n = function(e, t) {
				return e.x * t.x + e.y * t.y
			}(e, t) / i;
			return n > 1 && (n = 1), Math.acos(n)
		}(e, t);
		return function(e, t) {
			return e.x * t.y - t.x * e.y
		}(e, t) > 0 && (i *= -1), 180 * i / Math.PI
	}
	var N = function() {
		function e(i) {
			t(this, e), this.handlers = [], this.el = i
		}
		return n(e, [{
			key: "add",
			value: function(e) {
				this.handlers.push(e)
			}
		}, {
			key: "del",
			value: function(e) {
				e || (this.handlers = []);
				for (var t = this.handlers.length; t >= 0; t--) this.handlers[t] === e && this.handlers.splice(t, 1)
			}
		}, {
			key: "dispatch",
			value: function() {
				for (var e = 0, t = this.handlers.length; e < t; e++) {
					var i = this.handlers[e];
					"function" == typeof i && i.apply(this.el, arguments)
				}
			}
		}]), e
	}();

	function D(e, t) {
		var i = new N(e);
		return i.add(t), i
	}
	var _ = function() {
		function e(i, n) {
			t(this, e), this.element = "string" == typeof i ? document.querySelector(i) : i, this.start = this.start.bind(this), this.move = this.move.bind(this), this.end = this.end.bind(this), this.cancel = this.cancel.bind(this), this.element.addEventListener("touchstart", this.start, !1), this.element.addEventListener("touchmove", this.move, !1), this.element.addEventListener("touchend", this.end, !1), this.element.addEventListener("touchcancel", this.cancel, !1), this.preV = {
				x: null,
				y: null
			}, this.pinchStartLen = null, this.zoom = 1, this.isDoubleTap = !1;
			var s = function() {};
			this.rotate = D(this.element, n.rotate || s), this.touchStart = D(this.element, n.touchStart || s), this.multipointStart = D(this.element, n.multipointStart || s), this.multipointEnd = D(this.element, n.multipointEnd || s), this.pinch = D(this.element, n.pinch || s), this.swipe = D(this.element, n.swipe || s), this.tap = D(this.element, n.tap || s), this.doubleTap = D(this.element, n.doubleTap || s), this.longTap = D(this.element, n.longTap || s), this.singleTap = D(this.element, n.singleTap || s), this.pressMove = D(this.element, n.pressMove || s), this.twoFingerPressMove = D(this.element, n.twoFingerPressMove || s), this.touchMove = D(this.element, n.touchMove || s), this.touchEnd = D(this.element, n.touchEnd || s), this.touchCancel = D(this.element, n.touchCancel || s), this.translateContainer = this.element, this._cancelAllHandler = this.cancelAll.bind(this), window.addEventListener("scroll", this._cancelAllHandler), this.delta = null, this.last = null, this.now = null, this.tapTimeout = null, this.singleTapTimeout = null, this.longTapTimeout = null, this.swipeTimeout = null, this.x1 = this.x2 = this.y1 = this.y2 = null, this.preTapPosition = {
				x: null,
				y: null
			}
		}
		return n(e, [{
			key: "start",
			value: function(e) {
				if (e.touches) {
					if (e.target && e.target.nodeName && ["a", "button", "input"].indexOf(e.target.nodeName.toLowerCase()) >= 0) console.log("ignore drag for this touched element", e.target.nodeName.toLowerCase());
					else {
						this.now = Date.now(), this.x1 = e.touches[0].pageX, this.y1 = e.touches[0].pageY, this.delta = this.now - (this.last || this.now), this.touchStart.dispatch(e, this.element), null !== this.preTapPosition.x && (this.isDoubleTap = this.delta > 0 && this.delta <= 250 && Math.abs(this.preTapPosition.x - this.x1) < 30 && Math.abs(this.preTapPosition.y - this.y1) < 30, this.isDoubleTap && clearTimeout(this.singleTapTimeout)), this.preTapPosition.x = this.x1, this.preTapPosition.y = this.y1, this.last = this.now;
						var t = this.preV;
						if (e.touches.length > 1) {
							this._cancelLongTap(), this._cancelSingleTap();
							var i = {
								x: e.touches[1].pageX - this.x1,
								y: e.touches[1].pageY - this.y1
							};
							t.x = i.x, t.y = i.y, this.pinchStartLen = Y(t), this.multipointStart.dispatch(e, this.element)
						}
						this._preventTap = !1, this.longTapTimeout = setTimeout(function() {
							this.longTap.dispatch(e, this.element), this._preventTap = !0
						}.bind(this), 750)
					}
				}
			}
		}, {
			key: "move",
			value: function(e) {
				if (e.touches) {
					var t = this.preV,
						i = e.touches.length,
						n = e.touches[0].pageX,
						s = e.touches[0].pageY;
					if (this.isDoubleTap = !1, i > 1) {
						var l = e.touches[1].pageX,
							o = e.touches[1].pageY,
							r = {
								x: e.touches[1].pageX - n,
								y: e.touches[1].pageY - s
							};
						null !== t.x && (this.pinchStartLen > 0 && (e.zoom = Y(r) / this.pinchStartLen, this.pinch.dispatch(e, this.element)), e.angle = q(r, t), this.rotate.dispatch(e, this.element)), t.x = r.x, t.y = r.y, null !== this.x2 && null !== this.sx2 ? (e.deltaX = (n - this.x2 + l - this.sx2) / 2, e.deltaY = (s - this.y2 + o - this.sy2) / 2) : (e.deltaX = 0, e.deltaY = 0), this.twoFingerPressMove.dispatch(e, this.element), this.sx2 = l, this.sy2 = o
					} else {
						if (null !== this.x2) {
							e.deltaX = n - this.x2, e.deltaY = s - this.y2;
							var a = Math.abs(this.x1 - this.x2),
								h = Math.abs(this.y1 - this.y2);
							(a > 10 || h > 10) && (this._preventTap = !0)
						} else e.deltaX = 0, e.deltaY = 0;
						this.pressMove.dispatch(e, this.element)
					}
					this.touchMove.dispatch(e, this.element), this._cancelLongTap(), this.x2 = n, this.y2 = s, i > 1 && e.preventDefault()
				}
			}
		}, {
			key: "end",
			value: function(e) {
				if (e.changedTouches) {
					this._cancelLongTap();
					var t = this;
					e.touches.length < 2 && (this.multipointEnd.dispatch(e, this.element), this.sx2 = this.sy2 = null), this.x2 && Math.abs(this.x1 - this.x2) > 30 || this.y2 && Math.abs(this.y1 - this.y2) > 30 ? (e.direction = this._swipeDirection(this.x1, this.x2, this.y1, this.y2), this.swipeTimeout = setTimeout((function() {
						t.swipe.dispatch(e, t.element)
					}), 0)) : (this.tapTimeout = setTimeout((function() {
						t._preventTap || t.tap.dispatch(e, t.element), t.isDoubleTap && (t.doubleTap.dispatch(e, t.element), t.isDoubleTap = !1)
					}), 0), t.isDoubleTap || (t.singleTapTimeout = setTimeout((function() {
						t.singleTap.dispatch(e, t.element)
					}), 250))), this.touchEnd.dispatch(e, this.element), this.preV.x = 0, this.preV.y = 0, this.zoom = 1, this.pinchStartLen = null, this.x1 = this.x2 = this.y1 = this.y2 = null
				}
			}
		}, {
			key: "cancelAll",
			value: function() {
				this._preventTap = !0, clearTimeout(this.singleTapTimeout), clearTimeout(this.tapTimeout), clearTimeout(this.longTapTimeout), clearTimeout(this.swipeTimeout)
			}
		}, {
			key: "cancel",
			value: function(e) {
				this.cancelAll(), this.touchCancel.dispatch(e, this.element)
			}
		}, {
			key: "_cancelLongTap",
			value: function() {
				clearTimeout(this.longTapTimeout)
			}
		}, {
			key: "_cancelSingleTap",
			value: function() {
				clearTimeout(this.singleTapTimeout)
			}
		}, {
			key: "_swipeDirection",
			value: function(e, t, i, n) {
				return Math.abs(e - t) >= Math.abs(i - n) ? e - t > 0 ? "Left" : "Right" : i - n > 0 ? "Up" : "Down"
			}
		}, {
			key: "on",
			value: function(e, t) {
				this[e] && this[e].add(t)
			}
		}, {
			key: "off",
			value: function(e, t) {
				this[e] && this[e].del(t)
			}
		}, {
			key: "destroy",
			value: function() {
				return this.singleTapTimeout && clearTimeout(this.singleTapTimeout), this.tapTimeout && clearTimeout(this.tapTimeout), this.longTapTimeout && clearTimeout(this.longTapTimeout), this.swipeTimeout && clearTimeout(this.swipeTimeout), this.element.removeEventListener("touchstart", this.start), this.element.removeEventListener("touchmove", this.move), this.element.removeEventListener("touchend", this.end), this.element.removeEventListener("touchcancel", this.cancel), this.rotate.del(), this.touchStart.del(), this.multipointStart.del(), this.multipointEnd.del(), this.pinch.del(), this.swipe.del(), this.tap.del(), this.doubleTap.del(), this.longTap.del(), this.singleTap.del(), this.pressMove.del(), this.twoFingerPressMove.del(), this.touchMove.del(), this.touchEnd.del(), this.touchCancel.del(), this.preV = this.pinchStartLen = this.zoom = this.isDoubleTap = this.delta = this.last = this.now = this.tapTimeout = this.singleTapTimeout = this.longTapTimeout = this.swipeTimeout = this.x1 = this.x2 = this.y1 = this.y2 = this.preTapPosition = this.rotate = this.touchStart = this.multipointStart = this.multipointEnd = this.pinch = this.swipe = this.tap = this.doubleTap = this.longTap = this.singleTap = this.pressMove = this.touchMove = this.touchEnd = this.touchCancel = this.twoFingerPressMove = null, window.removeEventListener("scroll", this._cancelAllHandler), null
			}
		}]), e
	}();

	function W(e) {
		var t = function() {
				var e, t = document.createElement("fakeelement"),
					i = {
						transition: "transitionend",
						OTransition: "oTransitionEnd",
						MozTransition: "transitionend",
						WebkitTransition: "webkitTransitionEnd"
					};
				for (e in i)
					if (void 0 !== t.style[e]) return i[e]
			}(),
			i = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
			n = c(e, "gslide-media") ? e : e.querySelector(".gslide-media"),
			s = u(n, ".ginner-container"),
			l = e.querySelector(".gslide-description");
		i > 769 && (n = s), h(n, "greset"), v(n, "translate3d(0, 0, 0)"), a(t, {
			onElement: n,
			once: !0,
			withCallback: function(e, t) {
				d(n, "greset")
			}
		}), n.style.opacity = "", l && (l.style.opacity = "")
	}

	function B(e) {
		if (e.events.hasOwnProperty("touch")) return !1;
		var t, i, n, s = y(),
			l = s.width,
			o = s.height,
			r = !1,
			a = null,
			g = null,
			f = null,
			p = !1,
			m = 1,
			x = 1,
			b = !1,
			S = !1,
			w = null,
			T = null,
			C = null,
			k = null,
			E = 0,
			A = 0,
			L = !1,
			I = !1,
			O = {},
			P = {},
			z = 0,
			M = 0,
			X = document.getElementById("glightbox-slider"),
			Y = document.querySelector(".goverlay"),
			q = new _(X, {
				touchStart: function(t) {
					if (r = !0, (c(t.targetTouches[0].target, "ginner-container") || u(t.targetTouches[0].target, ".gslide-desc") || "a" == t.targetTouches[0].target.nodeName.toLowerCase()) && (r = !1), u(t.targetTouches[0].target, ".gslide-inline") && !c(t.targetTouches[0].target.parentNode, "gslide-inline") && (r = !1), r) {
						if (P = t.targetTouches[0], O.pageX = t.targetTouches[0].pageX, O.pageY = t.targetTouches[0].pageY, z = t.targetTouches[0].clientX, M = t.targetTouches[0].clientY, a = e.activeSlide, g = a.querySelector(".gslide-media"), n = a.querySelector(".gslide-inline"), f = null, c(g, "gslide-image") && (f = g.querySelector("img")), (window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth) > 769 && (g = a.querySelector(".ginner-container")), d(Y, "greset"), t.pageX > 20 && t.pageX < window.innerWidth - 20) return;
						t.preventDefault()
					}
				},
				touchMove: function(s) {
					if (r && (P = s.targetTouches[0], !b && !S)) {
						if (n && n.offsetHeight > o) {
							var a = O.pageX - P.pageX;
							if (Math.abs(a) <= 13) return !1
						}
						p = !0;
						var h, d = s.targetTouches[0].clientX,
							c = s.targetTouches[0].clientY,
							u = z - d,
							m = M - c;
						if (Math.abs(u) > Math.abs(m) ? (L = !1, I = !0) : (I = !1, L = !0), t = P.pageX - O.pageX, E = 100 * t / l, i = P.pageY - O.pageY, A = 100 * i / o, L && f && (h = 1 - Math.abs(i) / o, Y.style.opacity = h, e.settings.touchFollowAxis && (E = 0)), I && (h = 1 - Math.abs(t) / l, g.style.opacity = h, e.settings.touchFollowAxis && (A = 0)), !f) return v(g, "translate3d(".concat(E, "%, 0, 0)"));
						v(g, "translate3d(".concat(E, "%, ").concat(A, "%, 0)"))
					}
				},
				touchEnd: function() {
					if (r) {
						if (p = !1, S || b) return C = w, void(k = T);
						var t = Math.abs(parseInt(A)),
							i = Math.abs(parseInt(E));
						if (!(t > 29 && f)) return t < 29 && i < 25 ? (h(Y, "greset"), Y.style.opacity = 1, W(g)) : void 0;
						e.close()
					}
				},
				multipointEnd: function() {
					setTimeout((function() {
						b = !1
					}), 50)
				},
				multipointStart: function() {
					b = !0, m = x || 1
				},
				pinch: function(e) {
					if (!f || p) return !1;
					b = !0, f.scaleX = f.scaleY = m * e.zoom;
					var t = m * e.zoom;
					if (S = !0, t <= 1) return S = !1, t = 1, k = null, C = null, w = null, T = null, void f.setAttribute("style", "");
					t > 4.5 && (t = 4.5), f.style.transform = "scale3d(".concat(t, ", ").concat(t, ", 1)"), x = t
				},
				pressMove: function(e) {
					if (S && !b) {
						var t = P.pageX - O.pageX,
							i = P.pageY - O.pageY;
						C && (t += C), k && (i += k), w = t, T = i;
						var n = "translate3d(".concat(t, "px, ").concat(i, "px, 0)");
						x && (n += " scale3d(".concat(x, ", ").concat(x, ", 1)")), v(f, n)
					}
				},
				swipe: function(t) {
					if (!S)
						if (b) b = !1;
						else {
							if ("Left" == t.direction) {
								if (e.index == e.elements.length - 1) return W(g);
								e.nextSlide()
							}
							if ("Right" == t.direction) {
								if (0 == e.index) return W(g);
								e.prevSlide()
							}
						}
				}
			});
		e.events.touch = q
	}
	var H = function() {
			function e(i, n) {
				var s = this,
					l = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : null;
				if (t(this, e), this.img = i, this.slide = n, this.onclose = l, this.img.setZoomEvents) return !1;
				this.active = !1, this.zoomedIn = !1, this.dragging = !1, this.currentX = null, this.currentY = null, this.initialX = null, this.initialY = null, this.xOffset = 0, this.yOffset = 0, this.img.addEventListener("mousedown", (function(e) {
					return s.dragStart(e)
				}), !1), this.img.addEventListener("mouseup", (function(e) {
					return s.dragEnd(e)
				}), !1), this.img.addEventListener("mousemove", (function(e) {
					return s.drag(e)
				}), !1), this.img.addEventListener("click", (function(e) {
					return s.slide.classList.contains("dragging-nav") ? (s.zoomOut(), !1) : s.zoomedIn ? void(s.zoomedIn && !s.dragging && s.zoomOut()) : s.zoomIn()
				}), !1), this.img.setZoomEvents = !0
			}
			return n(e, [{
				key: "zoomIn",
				value: function() {
					var e = this.widowWidth();
					if (!(this.zoomedIn || e <= 768)) {
						var t = this.img;
						if (t.setAttribute("data-style", t.getAttribute("style")), t.style.maxWidth = t.naturalWidth + "px", t.style.maxHeight = t.naturalHeight + "px", t.naturalWidth > e) {
							var i = e / 2 - t.naturalWidth / 2;
							this.setTranslate(this.img.parentNode, i, 0)
						}
						this.slide.classList.add("zoomed"), this.zoomedIn = !0
					}
				}
			}, {
				key: "zoomOut",
				value: function() {
					this.img.parentNode.setAttribute("style", ""), this.img.setAttribute("style", this.img.getAttribute("data-style")), this.slide.classList.remove("zoomed"), this.zoomedIn = !1, this.currentX = null, this.currentY = null, this.initialX = null, this.initialY = null, this.xOffset = 0, this.yOffset = 0, this.onclose && "function" == typeof this.onclose && this.onclose()
				}
			}, {
				key: "dragStart",
				value: function(e) {
					e.preventDefault(), this.zoomedIn ? ("touchstart" === e.type ? (this.initialX = e.touches[0].clientX - this.xOffset, this.initialY = e.touches[0].clientY - this.yOffset) : (this.initialX = e.clientX - this.xOffset, this.initialY = e.clientY - this.yOffset), e.target === this.img && (this.active = !0, this.img.classList.add("dragging"))) : this.active = !1
				}
			}, {
				key: "dragEnd",
				value: function(e) {
					var t = this;
					e.preventDefault(), this.initialX = this.currentX, this.initialY = this.currentY, this.active = !1, setTimeout((function() {
						t.dragging = !1, t.img.isDragging = !1, t.img.classList.remove("dragging")
					}), 100)
				}
			}, {
				key: "drag",
				value: function(e) {
					this.active && (e.preventDefault(), "touchmove" === e.type ? (this.currentX = e.touches[0].clientX - this.initialX, this.currentY = e.touches[0].clientY - this.initialY) : (this.currentX = e.clientX - this.initialX, this.currentY = e.clientY - this.initialY), this.xOffset = this.currentX, this.yOffset = this.currentY, this.img.isDragging = !0, this.dragging = !0, this.setTranslate(this.img, this.currentX, this.currentY))
				}
			}, {
				key: "onMove",
				value: function(e) {
					if (this.zoomedIn) {
						var t = e.clientX - this.img.naturalWidth / 2,
							i = e.clientY - this.img.naturalHeight / 2;
						this.setTranslate(this.img, t, i)
					}
				}
			}, {
				key: "setTranslate",
				value: function(e, t, i) {
					e.style.transform = "translate3d(" + t + "px, " + i + "px, 0)"
				}
			}, {
				key: "widowWidth",
				value: function() {
					return window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
				}
			}]), e
		}(),
		V = function() {
			function e() {
				var i = this,
					n = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
				t(this, e);
				var s = n.dragEl,
					l = n.toleranceX,
					o = void 0 === l ? 40 : l,
					r = n.toleranceY,
					a = void 0 === r ? 65 : r,
					h = n.slide,
					d = void 0 === h ? null : h,
					c = n.instance,
					u = void 0 === c ? null : c;
				this.el = s, this.active = !1, this.dragging = !1, this.currentX = null, this.currentY = null, this.initialX = null, this.initialY = null, this.xOffset = 0, this.yOffset = 0, this.direction = null, this.lastDirection = null, this.toleranceX = o, this.toleranceY = a, this.toleranceReached = !1, this.dragContainer = this.el, this.slide = d, this.instance = u, this.el.addEventListener("mousedown", (function(e) {
					return i.dragStart(e)
				}), !1), this.el.addEventListener("mouseup", (function(e) {
					return i.dragEnd(e)
				}), !1), this.el.addEventListener("mousemove", (function(e) {
					return i.drag(e)
				}), !1)
			}
			return n(e, [{
				key: "dragStart",
				value: function(e) {
					if (this.slide.classList.contains("zoomed")) this.active = !1;
					else {
						"touchstart" === e.type ? (this.initialX = e.touches[0].clientX - this.xOffset, this.initialY = e.touches[0].clientY - this.yOffset) : (this.initialX = e.clientX - this.xOffset, this.initialY = e.clientY - this.yOffset);
						var t = e.target.nodeName.toLowerCase();
						e.target.classList.contains("nodrag") || u(e.target, ".nodrag") || -1 !== ["input", "select", "textarea", "button", "a"].indexOf(t) ? this.active = !1 : (e.preventDefault(), (e.target === this.el || "img" !== t && u(e.target, ".gslide-inline")) && (this.active = !0, this.el.classList.add("dragging"), this.dragContainer = u(e.target, ".ginner-container")))
					}
				}
			}, {
				key: "dragEnd",
				value: function(e) {
					var t = this;
					e && e.preventDefault(), this.initialX = 0, this.initialY = 0, this.currentX = null, this.currentY = null, this.initialX = null, this.initialY = null, this.xOffset = 0, this.yOffset = 0, this.active = !1, this.doSlideChange && (this.instance.preventOutsideClick = !0, "right" == this.doSlideChange && this.instance.prevSlide(), "left" == this.doSlideChange && this.instance.nextSlide()), this.doSlideClose && this.instance.close(), this.toleranceReached || this.setTranslate(this.dragContainer, 0, 0, !0), setTimeout((function() {
						t.instance.preventOutsideClick = !1, t.toleranceReached = !1, t.lastDirection = null, t.dragging = !1, t.el.isDragging = !1, t.el.classList.remove("dragging"), t.slide.classList.remove("dragging-nav"), t.dragContainer.style.transform = "", t.dragContainer.style.transition = ""
					}), 100)
				}
			}, {
				key: "drag",
				value: function(e) {
					if (this.active) {
						e.preventDefault(), this.slide.classList.add("dragging-nav"), "touchmove" === e.type ? (this.currentX = e.touches[0].clientX - this.initialX, this.currentY = e.touches[0].clientY - this.initialY) : (this.currentX = e.clientX - this.initialX, this.currentY = e.clientY - this.initialY), this.xOffset = this.currentX, this.yOffset = this.currentY, this.el.isDragging = !0, this.dragging = !0, this.doSlideChange = !1, this.doSlideClose = !1;
						var t = Math.abs(this.currentX),
							i = Math.abs(this.currentY);
						if (t > 0 && t >= Math.abs(this.currentY) && (!this.lastDirection || "x" == this.lastDirection)) {
							this.yOffset = 0, this.lastDirection = "x", this.setTranslate(this.dragContainer, this.currentX, 0);
							var n = this.shouldChange();
							if (!this.instance.settings.dragAutoSnap && n && (this.doSlideChange = n), this.instance.settings.dragAutoSnap && n) return this.instance.preventOutsideClick = !0, this.toleranceReached = !0, this.active = !1, this.instance.preventOutsideClick = !0, this.dragEnd(null), "right" == n && this.instance.prevSlide(), void("left" == n && this.instance.nextSlide())
						}
						if (this.toleranceY > 0 && i > 0 && i >= t && (!this.lastDirection || "y" == this.lastDirection)) {
							this.xOffset = 0, this.lastDirection = "y", this.setTranslate(this.dragContainer, 0, this.currentY);
							var s = this.shouldClose();
							return !this.instance.settings.dragAutoSnap && s && (this.doSlideClose = !0), void(this.instance.settings.dragAutoSnap && s && this.instance.close())
						}
					}
				}
			}, {
				key: "shouldChange",
				value: function() {
					var e = !1;
					if (Math.abs(this.currentX) >= this.toleranceX) {
						var t = this.currentX > 0 ? "right" : "left";
						("left" == t && this.slide !== this.slide.parentNode.lastChild || "right" == t && this.slide !== this.slide.parentNode.firstChild) && (e = t)
					}
					return e
				}
			}, {
				key: "shouldClose",
				value: function() {
					var e = !1;
					return Math.abs(this.currentY) >= this.toleranceY && (e = !0), e
				}
			}, {
				key: "setTranslate",
				value: function(e, t, i) {
					var n = arguments.length > 3 && void 0 !== arguments[3] && arguments[3];
					e.style.transition = n ? "all .2s ease" : "", e.style.transform = "translate3d(".concat(t, "px, ").concat(i, "px, 0)")
				}
			}]), e
		}();

	function j(e, t, i, n) {
		var s = e.querySelector(".gslide-media"),
			l = new Image,
			o = "gSlideTitle_" + i,
			r = "gSlideDesc_" + i;
		l.addEventListener("load", (function() {
			T(n) && n()
		}), !1), l.src = t.href, "" != t.sizes && "" != t.srcset && (l.sizes = t.sizes, l.srcset = t.srcset), l.alt = "", I(t.alt) || "" === t.alt || (l.alt = t.alt), "" !== t.title && l.setAttribute("aria-labelledby", o), "" !== t.description && l.setAttribute("aria-describedby", r), t.hasOwnProperty("_hasCustomWidth") && t._hasCustomWidth && (l.style.width = t.width), t.hasOwnProperty("_hasCustomHeight") && t._hasCustomHeight && (l.style.height = t.height), s.insertBefore(l, s.firstChild)
	}

	function F(e, t, i, n) {
		var s = this,
			l = e.querySelector(".ginner-container"),
			o = "gvideo" + i,
			r = e.querySelector(".gslide-media"),
			a = this.getAllPlayers();
		h(l, "gvideo-container"), r.insertBefore(m('<div class="gvideo-wrapper"></div>'), r.firstChild);
		var d = e.querySelector(".gvideo-wrapper");
		S(this.settings.plyr.css, "Plyr");
		var c = t.href,
			u = location.protocol.replace(":", ""),
			g = "",
			v = "",
			f = !1;
		"file" == u && (u = "http"), r.style.maxWidth = t.width, S(this.settings.plyr.js, "Plyr", (function() {
			if (c.match(/vimeo\.com\/([0-9]*)/)) {
				var l = /vimeo.*\/(\d+)/i.exec(c);
				g = "vimeo", v = l[1]
			}
			if (c.match(/(youtube\.com|youtube-nocookie\.com)\/watch\?v=([a-zA-Z0-9\-_]+)/) || c.match(/youtu\.be\/([a-zA-Z0-9\-_]+)/) || c.match(/(youtube\.com|youtube-nocookie\.com)\/embed\/([a-zA-Z0-9\-_]+)/)) {
				var r = function(e) {
					var t = "";
					t = void 0 !== (e = e.replace(/(>|<)/gi, "").split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/))[2] ? (t = e[2].split(/[^0-9a-z_\-]/i))[0] : e;
					return t
				}(c);
				g = "youtube", v = r
			}
			if (null !== c.match(/\.(mp4|ogg|webm|mov)$/)) {
				g = "local";
				var u = '<video id="' + o + '" ';
				u += 'style="background:#000; max-width: '.concat(t.width, ';" '), u += 'preload="metadata" ', u += 'x-webkit-airplay="allow" ', u += "playsinline ", u += "controls ", u += 'class="gvideo-local">';
				var p = c.toLowerCase().split(".").pop(),
					y = {
						mp4: "",
						ogg: "",
						webm: ""
					};
				for (var x in y[p = "mov" == p ? "mp4" : p] = c, y)
					if (y.hasOwnProperty(x)) {
						var S = y[x];
						t.hasOwnProperty(x) && (S = t[x]), "" !== S && (u += '<source src="'.concat(S, '" type="video/').concat(x, '">'))
					} f = m(u += "</video>")
			}
			var w = f || m('<div id="'.concat(o, '" data-plyr-provider="').concat(g, '" data-plyr-embed-id="').concat(v, '"></div>'));
			h(d, "".concat(g, "-video gvideo")), d.appendChild(w), d.setAttribute("data-id", o), d.setAttribute("data-index", i);
			var C = O(s.settings.plyr, "config") ? s.settings.plyr.config : {},
				k = new Plyr("#" + o, C);
			k.on("ready", (function(e) {
				var t = e.detail.plyr;
				a[o] = t, T(n) && n()
			})), b((function() {
				return e.querySelector("iframe") && "true" == e.querySelector("iframe").dataset.ready
			}), (function() {
				s.resize(e)
			})), k.on("enterfullscreen", R), k.on("exitfullscreen", R)
		}))
	}

	function R(e) {
		var t = u(e.target, ".gslide-media");
		"enterfullscreen" == e.type && h(t, "fullscreen"), "exitfullscreen" == e.type && d(t, "fullscreen")
	}

	function G(e, t, i, n) {
		var s, l = this,
			o = e.querySelector(".gslide-media"),
			r = !(!O(t, "href") || !t.href) && t.href.split("#").pop().trim(),
			d = !(!O(t, "content") || !t.content) && t.content;
		if (d && (C(d) && (s = m('<div class="ginlined-content">'.concat(d, "</div>"))), k(d))) {
			"none" == d.style.display && (d.style.display = "block");
			var c = document.createElement("div");
			c.className = "ginlined-content", c.appendChild(d), s = c
		}
		if (r) {
			var u = document.getElementById(r);
			if (!u) return !1;
			var g = u.cloneNode(!0);
			g.style.height = t.height, g.style.maxWidth = t.width, h(g, "ginlined-content"), s = g
		}
		if (!s) return console.error("Unable to append inline slide content", t), !1;
		o.style.height = t.height, o.style.width = t.width, o.appendChild(s), this.events["inlineclose" + r] = a("click", {
			onElement: o.querySelectorAll(".gtrigger-close"),
			withCallback: function(e) {
				e.preventDefault(), l.close()
			}
		}), T(n) && n()
	}

	function Z(e, t, i, n) {
		var s = e.querySelector(".gslide-media"),
			l = function(e) {
				var t = e.url,
					i = e.allow,
					n = e.callback,
					s = e.appendTo,
					l = document.createElement("iframe");
				return l.className = "vimeo-video gvideo", l.src = t, l.style.width = "100%", l.style.height = "100%", i && l.setAttribute("allow", i), l.onload = function() {
					h(l, "node-ready"), T(n) && n()
				}, s && s.appendChild(l), l
			}({
				url: t.href,
				callback: n
			});
		s.parentNode.style.maxWidth = t.width, s.parentNode.style.height = t.height, s.appendChild(l)
	}
	var $ = function() {
			function e() {
				var i = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
				t(this, e), this.defaults = {
					href: "",
					sizes: "",
					srcset: "",
					title: "",
					type: "",
					description: "",
					alt: "",
					descPosition: "bottom",
					effect: "",
					width: "",
					height: "",
					content: !1,
					zoomable: !0,
					draggable: !0
				}, L(i) && (this.defaults = l(this.defaults, i))
			}
			return n(e, [{
				key: "sourceType",
				value: function(e) {
					var t = e;
					if (null !== (e = e.toLowerCase()).match(/\.(jpeg|jpg|jpe|gif|png|apn|webp|avif|svg)/)) return "image";
					if (e.match(/(youtube\.com|youtube-nocookie\.com)\/watch\?v=([a-zA-Z0-9\-_]+)/) || e.match(/youtu\.be\/([a-zA-Z0-9\-_]+)/) || e.match(/(youtube\.com|youtube-nocookie\.com)\/embed\/([a-zA-Z0-9\-_]+)/)) return "video";
					if (e.match(/vimeo\.com\/([0-9]*)/)) return "video";
					if (null !== e.match(/\.(mp4|ogg|webm|mov)/)) return "video";
					if (null !== e.match(/\.(mp3|wav|wma|aac|ogg)/)) return "audio";
					if (e.indexOf("#") > -1 && "" !== t.split("#").pop().trim()) return "inline";
					return e.indexOf("goajax=true") > -1 ? "ajax" : "external"
				}
			}, {
				key: "parseConfig",
				value: function(e, t) {
					var i = this,
						n = l({
							descPosition: t.descPosition
						}, this.defaults);
					if (L(e) && !k(e)) {
						O(e, "type") || (O(e, "content") && e.content ? e.type = "inline" : O(e, "href") && (e.type = this.sourceType(e.href)));
						var s = l(n, e);
						return this.setSize(s, t), s
					}
					var r = "",
						a = e.getAttribute("data-glightbox"),
						h = e.nodeName.toLowerCase();
					if ("a" === h && (r = e.href), "img" === h && (r = e.src, n.alt = e.alt), n.href = r, o(n, (function(s, l) {
							O(t, l) && "width" !== l && (n[l] = t[l]);
							var o = e.dataset[l];
							I(o) || (n[l] = i.sanitizeValue(o))
						})), n.content && (n.type = "inline"), !n.type && r && (n.type = this.sourceType(r)), I(a)) {
						if (!n.title && "a" == h) {
							var d = e.title;
							I(d) || "" === d || (n.title = d)
						}
						if (!n.title && "img" == h) {
							var c = e.alt;
							I(c) || "" === c || (n.title = c)
						}
					} else {
						var u = [];
						o(n, (function(e, t) {
							u.push(";\\s?" + t)
						})), u = u.join("\\s?:|"), "" !== a.trim() && o(n, (function(e, t) {
							var s = a,
								l = new RegExp("s?" + t + "s?:s?(.*?)(" + u + "s?:|$)"),
								o = s.match(l);
							if (o && o.length && o[1]) {
								var r = o[1].trim().replace(/;\s*$/, "");
								n[t] = i.sanitizeValue(r)
							}
						}))
					}
					if (n.description && "." === n.description.substring(0, 1)) {
						var g;
						try {
							g = document.querySelector(n.description).innerHTML
						} catch (e) {
							if (!(e instanceof DOMException)) throw e
						}
						g && (n.description = g)
					}
					if (!n.description) {
						var v = e.querySelector(".glightbox-desc");
						v && (n.description = v.innerHTML)
					}
					return this.setSize(n, t, e), this.slideConfig = n, n
				}
			}, {
				key: "setSize",
				value: function(e, t) {
					var i = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : null,
						n = "video" == e.type ? this.checkSize(t.videosWidth) : this.checkSize(t.width),
						s = this.checkSize(t.height);
					return e.width = O(e, "width") && "" !== e.width ? this.checkSize(e.width) : n, e.height = O(e, "height") && "" !== e.height ? this.checkSize(e.height) : s, i && "image" == e.type && (e._hasCustomWidth = !!i.dataset.width, e._hasCustomHeight = !!i.dataset.height), e
				}
			}, {
				key: "checkSize",
				value: function(e) {
					return z(e) ? "".concat(e, "px") : e
				}
			}, {
				key: "sanitizeValue",
				value: function(e) {
					return "true" !== e && "false" !== e ? e : "true" === e
				}
			}]), e
		}(),
		U = function() {
			function e(i, n, s) {
				t(this, e), this.element = i, this.instance = n, this.index = s
			}
			return n(e, [{
				key: "setContent",
				value: function() {
					var e = this,
						t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : null,
						i = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
					if (c(t, "loaded")) return !1;
					var n = this.instance.settings,
						s = this.slideConfig,
						l = w();
					T(n.beforeSlideLoad) && n.beforeSlideLoad({
						index: this.index,
						slide: t,
						player: !1
					});
					var o = s.type,
						r = s.descPosition,
						a = t.querySelector(".gslide-media"),
						d = t.querySelector(".gslide-title"),
						u = t.querySelector(".gslide-desc"),
						g = t.querySelector(".gdesc-inner"),
						v = i,
						f = "gSlideTitle_" + this.index,
						p = "gSlideDesc_" + this.index;
					if (T(n.afterSlideLoad) && (v = function() {
							T(i) && i(), n.afterSlideLoad({
								index: e.index,
								slide: t,
								player: e.instance.getSlidePlayerInstance(e.index)
							})
						}), "" == s.title && "" == s.description ? g && g.parentNode.parentNode.removeChild(g.parentNode) : (d && "" !== s.title ? (d.id = f, d.innerHTML = s.title) : d.parentNode.removeChild(d), u && "" !== s.description ? (u.id = p, l && n.moreLength > 0 ? (s.smallDescription = this.slideShortDesc(s.description, n.moreLength, n.moreText), u.innerHTML = s.smallDescription, this.descriptionEvents(u, s)) : u.innerHTML = s.description) : u.parentNode.removeChild(u), h(a.parentNode, "desc-".concat(r)), h(g.parentNode, "description-".concat(r))), h(a, "gslide-".concat(o)), h(t, "loaded"), "video" !== o) {
						if ("external" !== o) return "inline" === o ? (G.apply(this.instance, [t, s, this.index, v]), void(s.draggable && new V({
							dragEl: t.querySelector(".gslide-inline"),
							toleranceX: n.dragToleranceX,
							toleranceY: n.dragToleranceY,
							slide: t,
							instance: this.instance
						}))) : void("image" !== o ? T(v) && v() : j(t, s, this.index, (function() {
							var i = t.querySelector("img");
							s.draggable && new V({
								dragEl: i,
								toleranceX: n.dragToleranceX,
								toleranceY: n.dragToleranceY,
								slide: t,
								instance: e.instance
							}), s.zoomable && i.naturalWidth > i.offsetWidth && (h(i, "zoomable"), new H(i, t, (function() {
								e.instance.resize()
							}))), T(v) && v()
						})));
						Z.apply(this, [t, s, this.index, v])
					} else F.apply(this.instance, [t, s, this.index, v])
				}
			}, {
				key: "slideShortDesc",
				value: function(e) {
					var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 50,
						i = arguments.length > 2 && void 0 !== arguments[2] && arguments[2],
						n = document.createElement("div");
					n.innerHTML = e;
					var s = n.innerText,
						l = i;
					if ((e = s.trim()).length <= t) return e;
					var o = e.substr(0, t - 1);
					return l ? (n = null, o + '... <a href="#" class="desc-more">' + i + "</a>") : o
				}
			}, {
				key: "descriptionEvents",
				value: function(e, t) {
					var i = this,
						n = e.querySelector(".desc-more");
					if (!n) return !1;
					a("click", {
						onElement: n,
						withCallback: function(e, n) {
							e.preventDefault();
							var s = document.body,
								l = u(n, ".gslide-desc");
							if (!l) return !1;
							l.innerHTML = t.description, h(s, "gdesc-open");
							var o = a("click", {
								onElement: [s, u(l, ".gslide-description")],
								withCallback: function(e, n) {
									"a" !== e.target.nodeName.toLowerCase() && (d(s, "gdesc-open"), h(s, "gdesc-closed"), l.innerHTML = t.smallDescription, i.descriptionEvents(l, t), setTimeout((function() {
										d(s, "gdesc-closed")
									}), 400), o.destroy())
								}
							})
						}
					})
				}
			}, {
				key: "create",
				value: function() {
					return m(this.instance.settings.slideHTML)
				}
			}, {
				key: "getConfig",
				value: function() {
					k(this.element) || this.element.hasOwnProperty("draggable") || (this.element.draggable = this.instance.settings.draggable);
					var e = new $(this.instance.settings.slideExtraAttributes);
					return this.slideConfig = e.parseConfig(this.element, this.instance.settings), this.slideConfig
				}
			}]), e
		}(),
		J = w(),
		K = null !== w() || void 0 !== document.createTouch || "ontouchstart" in window || "onmsgesturechange" in window || navigator.msMaxTouchPoints,
		Q = document.getElementsByTagName("html")[0],
		ee = {
			selector: ".glightbox",
			elements: null,
			skin: "clean",
			theme: "clean",
			closeButton: !0,
			startAt: null,
			autoplayVideos: !0,
			autofocusVideos: !0,
			descPosition: "bottom",
			width: "900px",
			height: "506px",
			videosWidth: "960px",
			beforeSlideChange: null,
			afterSlideChange: null,
			beforeSlideLoad: null,
			afterSlideLoad: null,
			slideInserted: null,
			slideRemoved: null,
			slideExtraAttributes: null,
			onOpen: null,
			onClose: null,
			loop: !1,
			zoomable: !0,
			draggable: !0,
			dragAutoSnap: !1,
			dragToleranceX: 40,
			dragToleranceY: 65,
			preload: !0,
			oneSlidePerOpen: !1,
			touchNavigation: !0,
			touchFollowAxis: !0,
			keyboardNavigation: !0,
			closeOnOutsideClick: !0,
			plugins: !1,
			plyr: {
				css: "https://cdn.plyr.io/3.6.8/plyr.css",
				js: "https://cdn.plyr.io/3.6.8/plyr.js",
				config: {
					ratio: "16:9",
					fullscreen: {
						enabled: !0,
						iosNative: !0
					},
					youtube: {
						noCookie: !0,
						rel: 0,
						showinfo: 0,
						iv_load_policy: 3
					},
					vimeo: {
						byline: !1,
						portrait: !1,
						title: !1,
						transparent: !1
					}
				}
			},
			openEffect: "zoom",
			closeEffect: "zoom",
			slideEffect: "slide",
			moreText: "See more",
			moreLength: 60,
			cssEfects: {
				fade: {
					in: "fadeIn",
					out: "fadeOut"
				},
				zoom: {
					in: "zoomIn",
					out: "zoomOut"
				},
				slide: {
					in: "slideInRight",
					out: "slideOutLeft"
				},
				slideBack: {
					in: "slideInLeft",
					out: "slideOutRight"
				},
				none: {
					in: "none",
					out: "none"
				}
			},
			svg: {
				close: '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512 512" xml:space="preserve"><g><g><path d="M505.943,6.058c-8.077-8.077-21.172-8.077-29.249,0L6.058,476.693c-8.077,8.077-8.077,21.172,0,29.249C10.096,509.982,15.39,512,20.683,512c5.293,0,10.586-2.019,14.625-6.059L505.943,35.306C514.019,27.23,514.019,14.135,505.943,6.058z"/></g></g><g><g><path d="M505.942,476.694L35.306,6.059c-8.076-8.077-21.172-8.077-29.248,0c-8.077,8.076-8.077,21.171,0,29.248l470.636,470.636c4.038,4.039,9.332,6.058,14.625,6.058c5.293,0,10.587-2.019,14.624-6.057C514.018,497.866,514.018,484.771,505.942,476.694z"/></g></g></svg>',
				next: '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 477.175 477.175" xml:space="preserve"> <g><path d="M360.731,229.075l-225.1-225.1c-5.3-5.3-13.8-5.3-19.1,0s-5.3,13.8,0,19.1l215.5,215.5l-215.5,215.5c-5.3,5.3-5.3,13.8,0,19.1c2.6,2.6,6.1,4,9.5,4c3.4,0,6.9-1.3,9.5-4l225.1-225.1C365.931,242.875,365.931,234.275,360.731,229.075z"/></g></svg>',
				prev: '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 477.175 477.175" xml:space="preserve"><g><path d="M145.188,238.575l215.5-215.5c5.3-5.3,5.3-13.8,0-19.1s-13.8-5.3-19.1,0l-225.1,225.1c-5.3,5.3-5.3,13.8,0,19.1l225.1,225c2.6,2.6,6.1,4,9.5,4s6.9-1.3,9.5-4c5.3-5.3,5.3-13.8,0-19.1L145.188,238.575z"/></g></svg>'
			},
			slideHTML: '<div class="gslide">\n    <div class="gslide-inner-content">\n        <div class="ginner-container">\n            <div class="gslide-media">\n            </div>\n            <div class="gslide-description">\n                <div class="gdesc-inner">\n                    <h4 class="gslide-title"></h4>\n                    <div class="gslide-desc"></div>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>',
			lightboxHTML: '<div id="glightbox-body" class="glightbox-container" tabindex="-1" role="dialog" aria-hidden="false">\n    <div class="gloader visible"></div>\n    <div class="goverlay"></div>\n    <div class="gcontainer">\n    <div id="glightbox-slider" class="gslider"></div>\n    <button class="gclose gbtn" aria-label="Close" data-taborder="3">{closeSVG}</button>\n    <button class="gprev gbtn" aria-label="Previous" data-taborder="2">{prevSVG}</button>\n    <button class="gnext gbtn" aria-label="Next" data-taborder="1">{nextSVG}</button>\n</div>\n</div>'
		},
		te = function() {
			function e() {
				var i = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
				t(this, e), this.customOptions = i, this.settings = l(ee, i), this.effectsClasses = this.getAnimationClasses(), this.videoPlayers = {}, this.apiEvents = [], this.fullElementsList = !1
			}
			return n(e, [{
				key: "init",
				value: function() {
					var e = this,
						t = this.getSelector();
					t && (this.baseEvents = a("click", {
						onElement: t,
						withCallback: function(t, i) {
							t.preventDefault(), e.open(i)
						}
					})), this.elements = this.getElements()
				}
			}, {
				key: "open",
				value: function() {
					var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : null,
						t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null;
					if (0 == this.elements.length) return !1;
					this.activeSlide = null, this.prevActiveSlideIndex = null, this.prevActiveSlide = null;
					var i = z(t) ? t : this.settings.startAt;
					if (k(e)) {
						var n = e.getAttribute("data-gallery");
						n && (this.fullElementsList = this.elements, this.elements = this.getGalleryElements(this.elements, n)), I(i) && (i = this.getElementIndex(e)) < 0 && (i = 0)
					}
					z(i) || (i = 0), this.build(), g(this.overlay, "none" == this.settings.openEffect ? "none" : this.settings.cssEfects.fade.in);
					var s = document.body,
						l = window.innerWidth - document.documentElement.clientWidth;
					if (l > 0) {
						var o = document.createElement("style");
						o.type = "text/css", o.className = "gcss-styles", o.innerText = ".gscrollbar-fixer {margin-right: ".concat(l, "px}"), document.head.appendChild(o), h(s, "gscrollbar-fixer")
					}
					h(s, "glightbox-open"), h(Q, "glightbox-open"), J && (h(document.body, "glightbox-mobile"), this.settings.slideEffect = "slide"), this.showSlide(i, !0), 1 == this.elements.length ? (h(this.prevButton, "glightbox-button-hidden"), h(this.nextButton, "glightbox-button-hidden")) : (d(this.prevButton, "glightbox-button-hidden"), d(this.nextButton, "glightbox-button-hidden")), this.lightboxOpen = !0, this.trigger("open"), T(this.settings.onOpen) && this.settings.onOpen(), K && this.settings.touchNavigation && B(this), this.settings.keyboardNavigation && X(this)
				}
			}, {
				key: "openAt",
				value: function() {
					var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0;
					this.open(null, e)
				}
			}, {
				key: "showSlide",
				value: function() {
					var e = this,
						t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0,
						i = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
					f(this.loader), this.index = parseInt(t);
					var n = this.slidesContainer.querySelector(".current");
					n && d(n, "current"), this.slideAnimateOut();
					var s = this.slidesContainer.querySelectorAll(".gslide")[t];
					if (c(s, "loaded")) this.slideAnimateIn(s, i), p(this.loader);
					else {
						f(this.loader);
						var l = this.elements[t],
							o = {
								index: this.index,
								slide: s,
								slideNode: s,
								slideConfig: l.slideConfig,
								slideIndex: this.index,
								trigger: l.node,
								player: null
							};
						this.trigger("slide_before_load", o), l.instance.setContent(s, (function() {
							p(e.loader), e.resize(), e.slideAnimateIn(s, i), e.trigger("slide_after_load", o)
						}))
					}
					this.slideDescription = s.querySelector(".gslide-description"), this.slideDescriptionContained = this.slideDescription && c(this.slideDescription.parentNode, "gslide-media"), this.settings.preload && (this.preloadSlide(t + 1), this.preloadSlide(t - 1)), this.updateNavigationClasses(), this.activeSlide = s
				}
			}, {
				key: "preloadSlide",
				value: function(e) {
					var t = this;
					if (e < 0 || e > this.elements.length - 1) return !1;
					if (I(this.elements[e])) return !1;
					var i = this.slidesContainer.querySelectorAll(".gslide")[e];
					if (c(i, "loaded")) return !1;
					var n = this.elements[e],
						s = n.type,
						l = {
							index: e,
							slide: i,
							slideNode: i,
							slideConfig: n.slideConfig,
							slideIndex: e,
							trigger: n.node,
							player: null
						};
					this.trigger("slide_before_load", l), "video" == s || "external" == s ? setTimeout((function() {
						n.instance.setContent(i, (function() {
							t.trigger("slide_after_load", l)
						}))
					}), 200) : n.instance.setContent(i, (function() {
						t.trigger("slide_after_load", l)
					}))
				}
			}, {
				key: "prevSlide",
				value: function() {
					this.goToSlide(this.index - 1)
				}
			}, {
				key: "nextSlide",
				value: function() {
					this.goToSlide(this.index + 1)
				}
			}, {
				key: "goToSlide",
				value: function() {
					var e = arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
					if (this.prevActiveSlide = this.activeSlide, this.prevActiveSlideIndex = this.index, !this.loop() && (e < 0 || e > this.elements.length - 1)) return !1;
					e < 0 ? e = this.elements.length - 1 : e >= this.elements.length && (e = 0), this.showSlide(e)
				}
			}, {
				key: "insertSlide",
				value: function() {
					var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
						t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : -1;
					t < 0 && (t = this.elements.length);
					var i = new U(e, this, t),
						n = i.getConfig(),
						s = l({}, n),
						o = i.create(),
						r = this.elements.length - 1;
					s.index = t, s.node = !1, s.instance = i, s.slideConfig = n, this.elements.splice(t, 0, s);
					var a = null,
						h = null;
					if (this.slidesContainer) {
						if (t > r) this.slidesContainer.appendChild(o);
						else {
							var d = this.slidesContainer.querySelectorAll(".gslide")[t];
							this.slidesContainer.insertBefore(o, d)
						}(this.settings.preload && 0 == this.index && 0 == t || this.index - 1 == t || this.index + 1 == t) && this.preloadSlide(t), 0 == this.index && 0 == t && (this.index = 1), this.updateNavigationClasses(), a = this.slidesContainer.querySelectorAll(".gslide")[t], h = this.getSlidePlayerInstance(t), s.slideNode = a
					}
					this.trigger("slide_inserted", {
						index: t,
						slide: a,
						slideNode: a,
						slideConfig: n,
						slideIndex: t,
						trigger: null,
						player: h
					}), T(this.settings.slideInserted) && this.settings.slideInserted({
						index: t,
						slide: a,
						player: h
					})
				}
			}, {
				key: "removeSlide",
				value: function() {
					var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : -1;
					if (e < 0 || e > this.elements.length - 1) return !1;
					var t = this.slidesContainer && this.slidesContainer.querySelectorAll(".gslide")[e];
					t && (this.getActiveSlideIndex() == e && (e == this.elements.length - 1 ? this.prevSlide() : this.nextSlide()), t.parentNode.removeChild(t)), this.elements.splice(e, 1), this.trigger("slide_removed", e), T(this.settings.slideRemoved) && this.settings.slideRemoved(e)
				}
			}, {
				key: "slideAnimateIn",
				value: function(e, t) {
					var i = this,
						n = e.querySelector(".gslide-media"),
						s = e.querySelector(".gslide-description"),
						l = {
							index: this.prevActiveSlideIndex,
							slide: this.prevActiveSlide,
							slideNode: this.prevActiveSlide,
							slideIndex: this.prevActiveSlide,
							slideConfig: I(this.prevActiveSlideIndex) ? null : this.elements[this.prevActiveSlideIndex].slideConfig,
							trigger: I(this.prevActiveSlideIndex) ? null : this.elements[this.prevActiveSlideIndex].node,
							player: this.getSlidePlayerInstance(this.prevActiveSlideIndex)
						},
						o = {
							index: this.index,
							slide: this.activeSlide,
							slideNode: this.activeSlide,
							slideConfig: this.elements[this.index].slideConfig,
							slideIndex: this.index,
							trigger: this.elements[this.index].node,
							player: this.getSlidePlayerInstance(this.index)
						};
					if (n.offsetWidth > 0 && s && (p(s), s.style.display = ""), d(e, this.effectsClasses), t) g(e, this.settings.cssEfects[this.settings.openEffect].in, (function() {
						i.settings.autoplayVideos && i.slidePlayerPlay(e), i.trigger("slide_changed", {
							prev: l,
							current: o
						}), T(i.settings.afterSlideChange) && i.settings.afterSlideChange.apply(i, [l, o])
					}));
					else {
						var r = this.settings.slideEffect,
							a = "none" !== r ? this.settings.cssEfects[r].in : r;
						this.prevActiveSlideIndex > this.index && "slide" == this.settings.slideEffect && (a = this.settings.cssEfects.slideBack.in), g(e, a, (function() {
							i.settings.autoplayVideos && i.slidePlayerPlay(e), i.trigger("slide_changed", {
								prev: l,
								current: o
							}), T(i.settings.afterSlideChange) && i.settings.afterSlideChange.apply(i, [l, o])
						}))
					}
					setTimeout((function() {
						i.resize(e)
					}), 100), h(e, "current")
				}
			}, {
				key: "slideAnimateOut",
				value: function() {
					if (!this.prevActiveSlide) return !1;
					var e = this.prevActiveSlide;
					d(e, this.effectsClasses), h(e, "prev");
					var t = this.settings.slideEffect,
						i = "none" !== t ? this.settings.cssEfects[t].out : t;
					this.slidePlayerPause(e), this.trigger("slide_before_change", {
						prev: {
							index: this.prevActiveSlideIndex,
							slide: this.prevActiveSlide,
							slideNode: this.prevActiveSlide,
							slideIndex: this.prevActiveSlideIndex,
							slideConfig: I(this.prevActiveSlideIndex) ? null : this.elements[this.prevActiveSlideIndex].slideConfig,
							trigger: I(this.prevActiveSlideIndex) ? null : this.elements[this.prevActiveSlideIndex].node,
							player: this.getSlidePlayerInstance(this.prevActiveSlideIndex)
						},
						current: {
							index: this.index,
							slide: this.activeSlide,
							slideNode: this.activeSlide,
							slideIndex: this.index,
							slideConfig: this.elements[this.index].slideConfig,
							trigger: this.elements[this.index].node,
							player: this.getSlidePlayerInstance(this.index)
						}
					}), T(this.settings.beforeSlideChange) && this.settings.beforeSlideChange.apply(this, [{
						index: this.prevActiveSlideIndex,
						slide: this.prevActiveSlide,
						player: this.getSlidePlayerInstance(this.prevActiveSlideIndex)
					}, {
						index: this.index,
						slide: this.activeSlide,
						player: this.getSlidePlayerInstance(this.index)
					}]), this.prevActiveSlideIndex > this.index && "slide" == this.settings.slideEffect && (i = this.settings.cssEfects.slideBack.out), g(e, i, (function() {
						var t = e.querySelector(".ginner-container"),
							i = e.querySelector(".gslide-media"),
							n = e.querySelector(".gslide-description");
						t.style.transform = "", i.style.transform = "", d(i, "greset"), i.style.opacity = "", n && (n.style.opacity = ""), d(e, "prev")
					}))
				}
			}, {
				key: "getAllPlayers",
				value: function() {
					return this.videoPlayers
				}
			}, {
				key: "getSlidePlayerInstance",
				value: function(e) {
					var t = "gvideo" + e,
						i = this.getAllPlayers();
					return !(!O(i, t) || !i[t]) && i[t]
				}
			}, {
				key: "stopSlideVideo",
				value: function(e) {
					if (k(e)) {
						var t = e.querySelector(".gvideo-wrapper");
						t && (e = t.getAttribute("data-index"))
					}
					console.log("stopSlideVideo is deprecated, use slidePlayerPause");
					var i = this.getSlidePlayerInstance(e);
					i && i.playing && i.pause()
				}
			}, {
				key: "slidePlayerPause",
				value: function(e) {
					if (k(e)) {
						var t = e.querySelector(".gvideo-wrapper");
						t && (e = t.getAttribute("data-index"))
					}
					var i = this.getSlidePlayerInstance(e);
					i && i.playing && i.pause()
				}
			}, {
				key: "playSlideVideo",
				value: function(e) {
					if (k(e)) {
						var t = e.querySelector(".gvideo-wrapper");
						t && (e = t.getAttribute("data-index"))
					}
					console.log("playSlideVideo is deprecated, use slidePlayerPlay");
					var i = this.getSlidePlayerInstance(e);
					i && !i.playing && i.play()
				}
			}, {
				key: "slidePlayerPlay",
				value: function(e) {
					if (k(e)) {
						var t = e.querySelector(".gvideo-wrapper");
						t && (e = t.getAttribute("data-index"))
					}
					var i = this.getSlidePlayerInstance(e);
					i && !i.playing && (i.play(), this.settings.autofocusVideos && i.elements.container.focus())
				}
			}, {
				key: "setElements",
				value: function(e) {
					var t = this;
					this.settings.elements = !1;
					var i = [];
					e && e.length && o(e, (function(e, n) {
						var s = new U(e, t, n),
							o = s.getConfig(),
							r = l({}, o);
						r.slideConfig = o, r.instance = s, r.index = n, i.push(r)
					})), this.elements = i, this.lightboxOpen && (this.slidesContainer.innerHTML = "", this.elements.length && (o(this.elements, (function() {
						var e = m(t.settings.slideHTML);
						t.slidesContainer.appendChild(e)
					})), this.showSlide(0, !0)))
				}
			}, {
				key: "getElementIndex",
				value: function(e) {
					var t = !1;
					return o(this.elements, (function(i, n) {
						if (O(i, "node") && i.node == e) return t = n, !0
					})), t
				}
			}, {
				key: "getElements",
				value: function() {
					var e = this,
						t = [];
					this.elements = this.elements ? this.elements : [], !I(this.settings.elements) && E(this.settings.elements) && this.settings.elements.length && o(this.settings.elements, (function(i, n) {
						var s = new U(i, e, n),
							o = s.getConfig(),
							r = l({}, o);
						r.node = !1, r.index = n, r.instance = s, r.slideConfig = o, t.push(r)
					}));
					var i = !1;
					return this.getSelector() && (i = document.querySelectorAll(this.getSelector())), i ? (o(i, (function(i, n) {
						var s = new U(i, e, n),
							o = s.getConfig(),
							r = l({}, o);
						r.node = i, r.index = n, r.instance = s, r.slideConfig = o, r.gallery = i.getAttribute("data-gallery"), t.push(r)
					})), t) : t
				}
			}, {
				key: "getGalleryElements",
				value: function(e, t) {
					return e.filter((function(e) {
						return e.gallery == t
					}))
				}
			}, {
				key: "getSelector",
				value: function() {
					return !this.settings.elements && (this.settings.selector && "data-" == this.settings.selector.substring(0, 5) ? "*[".concat(this.settings.selector, "]") : this.settings.selector)
				}
			}, {
				key: "getActiveSlide",
				value: function() {
					return this.slidesContainer.querySelectorAll(".gslide")[this.index]
				}
			}, {
				key: "getActiveSlideIndex",
				value: function() {
					return this.index
				}
			}, {
				key: "getAnimationClasses",
				value: function() {
					var e = [];
					for (var t in this.settings.cssEfects)
						if (this.settings.cssEfects.hasOwnProperty(t)) {
							var i = this.settings.cssEfects[t];
							e.push("g".concat(i.in)), e.push("g".concat(i.out))
						} return e.join(" ")
				}
			}, {
				key: "build",
				value: function() {
					var e = this;
					if (this.built) return !1;
					var t = document.body.childNodes,
						i = [];
					o(t, (function(e) {
						e.parentNode == document.body && "#" !== e.nodeName.charAt(0) && e.hasAttribute && !e.hasAttribute("aria-hidden") && (i.push(e), e.setAttribute("aria-hidden", "true"))
					}));
					var n = O(this.settings.svg, "next") ? this.settings.svg.next : "",
						s = O(this.settings.svg, "prev") ? this.settings.svg.prev : "",
						l = O(this.settings.svg, "close") ? this.settings.svg.close : "",
						r = this.settings.lightboxHTML;
					r = m(r = (r = (r = r.replace(/{nextSVG}/g, n)).replace(/{prevSVG}/g, s)).replace(/{closeSVG}/g, l)), document.body.appendChild(r);
					var d = document.getElementById("glightbox-body");
					this.modal = d;
					var g = d.querySelector(".gclose");
					this.prevButton = d.querySelector(".gprev"), this.nextButton = d.querySelector(".gnext"), this.overlay = d.querySelector(".goverlay"), this.loader = d.querySelector(".gloader"), this.slidesContainer = document.getElementById("glightbox-slider"), this.bodyHiddenChildElms = i, this.events = {}, h(this.modal, "glightbox-" + this.settings.skin), this.settings.closeButton && g && (this.events.close = a("click", {
						onElement: g,
						withCallback: function(t, i) {
							t.preventDefault(), e.close()
						}
					})), g && !this.settings.closeButton && g.parentNode.removeChild(g), this.nextButton && (this.events.next = a("click", {
						onElement: this.nextButton,
						withCallback: function(t, i) {
							t.preventDefault(), e.nextSlide()
						}
					})), this.prevButton && (this.events.prev = a("click", {
						onElement: this.prevButton,
						withCallback: function(t, i) {
							t.preventDefault(), e.prevSlide()
						}
					})), this.settings.closeOnOutsideClick && (this.events.outClose = a("click", {
						onElement: d,
						withCallback: function(t, i) {
							e.preventOutsideClick || c(document.body, "glightbox-mobile") || u(t.target, ".ginner-container") || u(t.target, ".gbtn") || c(t.target, "gnext") || c(t.target, "gprev") || e.close()
						}
					})), o(this.elements, (function(t, i) {
						e.slidesContainer.appendChild(t.instance.create()), t.slideNode = e.slidesContainer.querySelectorAll(".gslide")[i]
					})), K && h(document.body, "glightbox-touch"), this.events.resize = a("resize", {
						onElement: window,
						withCallback: function() {
							e.resize()
						}
					}), this.built = !0
				}
			}, {
				key: "resize",
				value: function() {
					var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : null;
					if ((e = e || this.activeSlide) && !c(e, "zoomed")) {
						var t = y(),
							i = e.querySelector(".gvideo-wrapper"),
							n = e.querySelector(".gslide-image"),
							s = this.slideDescription,
							l = t.width,
							o = t.height;
						if (l <= 768 ? h(document.body, "glightbox-mobile") : d(document.body, "glightbox-mobile"), i || n) {
							var r = !1;
							if (s && (c(s, "description-bottom") || c(s, "description-top")) && !c(s, "gabsolute") && (r = !0), n)
								if (l <= 768) n.querySelector("img");
								else if (r) {
								var a = s.offsetHeight,
									u = n.querySelector("img");
								u.setAttribute("style", "max-height: calc(100vh - ".concat(a, "px)")), s.setAttribute("style", "max-width: ".concat(u.offsetWidth, "px;"))
							}
							if (i) {
								var g = O(this.settings.plyr.config, "ratio") ? this.settings.plyr.config.ratio : "";
								if (!g) {
									var v = i.clientWidth,
										f = i.clientHeight,
										p = v / f;
									g = "".concat(v / p, ":").concat(f / p)
								}
								var m = g.split(":"),
									x = this.settings.videosWidth,
									b = this.settings.videosWidth,
									S = (b = z(x) || -1 !== x.indexOf("px") ? parseInt(x) : -1 !== x.indexOf("vw") ? l * parseInt(x) / 100 : -1 !== x.indexOf("vh") ? o * parseInt(x) / 100 : -1 !== x.indexOf("%") ? l * parseInt(x) / 100 : parseInt(i.clientWidth)) / (parseInt(m[0]) / parseInt(m[1]));
								if (S = Math.floor(S), r && (o -= s.offsetHeight), b > l || S > o || o < S && l > b) {
									var w = i.offsetWidth,
										T = i.offsetHeight,
										C = o / T,
										k = {
											width: w * C,
											height: T * C
										};
									i.parentNode.setAttribute("style", "max-width: ".concat(k.width, "px")), r && s.setAttribute("style", "max-width: ".concat(k.width, "px;"))
								} else i.parentNode.style.maxWidth = "".concat(x), r && s.setAttribute("style", "max-width: ".concat(x, ";"))
							}
						}
					}
				}
			}, {
				key: "reload",
				value: function() {
					this.init()
				}
			}, {
				key: "updateNavigationClasses",
				value: function() {
					var e = this.loop();
					d(this.nextButton, "disabled"), d(this.prevButton, "disabled"), 0 == this.index && this.elements.length - 1 == 0 ? (h(this.prevButton, "disabled"), h(this.nextButton, "disabled")) : 0 !== this.index || e ? this.index !== this.elements.length - 1 || e || h(this.nextButton, "disabled") : h(this.prevButton, "disabled")
				}
			}, {
				key: "loop",
				value: function() {
					var e = O(this.settings, "loopAtEnd") ? this.settings.loopAtEnd : null;
					return e = O(this.settings, "loop") ? this.settings.loop : e, e
				}
			}, {
				key: "close",
				value: function() {
					var e = this;
					if (!this.lightboxOpen) {
						if (this.events) {
							for (var t in this.events) this.events.hasOwnProperty(t) && this.events[t].destroy();
							this.events = null
						}
						return !1
					}
					if (this.closing) return !1;
					this.closing = !0, this.slidePlayerPause(this.activeSlide), this.fullElementsList && (this.elements = this.fullElementsList), this.bodyHiddenChildElms.length && o(this.bodyHiddenChildElms, (function(e) {
						e.removeAttribute("aria-hidden")
					})), h(this.modal, "glightbox-closing"), g(this.overlay, "none" == this.settings.openEffect ? "none" : this.settings.cssEfects.fade.out), g(this.activeSlide, this.settings.cssEfects[this.settings.closeEffect].out, (function() {
						if (e.activeSlide = null, e.prevActiveSlideIndex = null, e.prevActiveSlide = null, e.built = !1, e.events) {
							for (var t in e.events) e.events.hasOwnProperty(t) && e.events[t].destroy();
							e.events = null
						}
						var i = document.body;
						d(Q, "glightbox-open"), d(i, "glightbox-open touching gdesc-open glightbox-touch glightbox-mobile gscrollbar-fixer"), e.modal.parentNode.removeChild(e.modal), e.trigger("close"), T(e.settings.onClose) && e.settings.onClose();
						var n = document.querySelector(".gcss-styles");
						n && n.parentNode.removeChild(n), e.lightboxOpen = !1, e.closing = null
					}))
				}
			}, {
				key: "destroy",
				value: function() {
					this.close(), this.clearAllEvents(), this.baseEvents && this.baseEvents.destroy()
				}
			}, {
				key: "on",
				value: function(e, t) {
					var i = arguments.length > 2 && void 0 !== arguments[2] && arguments[2];
					if (!e || !T(t)) throw new TypeError("Event name and callback must be defined");
					this.apiEvents.push({
						evt: e,
						once: i,
						callback: t
					})
				}
			}, {
				key: "once",
				value: function(e, t) {
					this.on(e, t, !0)
				}
			}, {
				key: "trigger",
				value: function(e) {
					var t = this,
						i = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : null,
						n = [];
					o(this.apiEvents, (function(t, s) {
						var l = t.evt,
							o = t.once,
							r = t.callback;
						l == e && (r(i), o && n.push(s))
					})), n.length && o(n, (function(e) {
						return t.apiEvents.splice(e, 1)
					}))
				}
			}, {
				key: "clearAllEvents",
				value: function() {
					this.apiEvents.splice(0, this.apiEvents.length)
				}
			}, {
				key: "version",
				value: function() {
					return "3.1.1"
				}
			}]), e
		}();
	return function() {
		var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
			t = new te(e);
		return t.init(), t
	}
}));
(function() {
	"use strict";
	const select = (el, all = false) => {
		el = el.trim()
		if (all) {
			return [...document.querySelectorAll(el)]
		} else {
			return document.querySelector(el)
		}
	}
	const on = (type, el, listener, all = false) => {
		if (all) {
			select(el, all).forEach(e => e.addEventListener(type, listener))
		} else {
			select(el, all).addEventListener(type, listener)
		}
	}
	const onscroll = (el, listener) => {
		el.addEventListener('scroll', listener)
	}
	const scrollto = (el) => {
		let header = select('#header')
		let offset = header.offsetHeight
		if (!header.classList.contains('header-scrolled')) {
			offset -= 10
		}
		let elementPos = select(el).offsetTop
		window.scrollTo({
			top: elementPos - offset,
			behavior: 'smooth'
		})
	}
	window.addEventListener('load', () => {
		if (window.location.hash) {
			if (select(window.location.hash)) {
				scrollto(window.location.hash)
			}
		}
	});
})();
var allowedBrowsers = ["IEWin7", "Chrome", "Safari"];
! function() {
	var s, l, i, r, o = {
			frameRate: 150,
			animationTime: 400,
			stepSize: 100,
			pulseAlgorithm: !0,
			pulseScale: 4,
			pulseNormalize: 1,
			accelerationDelta: 50,
			accelerationMax: 3,
			keyboardSupport: !0,
			arrowScroll: 50
		},
		m = o,
		c = !1,
		u = !1,
		n = {
			x: 0,
			y: 0
		},
		d = !1,
		f = document.documentElement,
		a = [],
		w = /^Mac/.test(navigator.platform),
		h = {
			left: 37,
			up: 38,
			right: 39,
			down: 40,
			spacebar: 32,
			pageup: 33,
			pagedown: 34,
			end: 35,
			home: 36
		},
		p = {
			37: 1,
			38: 1,
			39: 1,
			40: 1
		};

	function v() {
		var e, t, o, n, r, a;
		!d && document.body && (d = !0, e = document.body, t = document.documentElement, a = window.innerHeight, o = e.scrollHeight, f = 0 <= document.compatMode.indexOf("CSS") ? t : e, s = e, m.keyboardSupport && Y("keydown", x), top != self ? u = !0 : Q && a < o && (e.offsetHeight <= a || t.offsetHeight <= a) && ((n = document.createElement("div")).style.cssText = "position:absolute; z-index:-10000; top:0; left:0; right:0; height:" + f.scrollHeight + "px", document.body.appendChild(n), i = function() {
			r = r || setTimeout(function() {
				c || (n.style.height = "0", n.style.height = f.scrollHeight + "px", r = null)
			}, 500)
		}, setTimeout(i, 10), Y("resize", i), (l = new R(i)).observe(e, {
			attributes: !0,
			childList: !0,
			characterData: !1
		}), f.offsetHeight <= a && ((a = document.createElement("div")).style.clear = "both", e.appendChild(a))))
	}
	var y = [],
		b = !1,
		g = Date.now();

	function S(s, u, d) {
		var e, t, o, f, w;
		e = 0 < (e = u) ? 1 : -1, t = 0 < (t = d) ? 1 : -1, n.x === e && n.y === t || (n.x = e, n.y = t, y = [], g = 0), 1 != m.accelerationMax && ((t = Date.now() - g) < m.accelerationDelta && (1 < (o = (1 + 50 / t) / 2) && (o = Math.min(o, m.accelerationMax), u *= o, d *= o)), g = Date.now()), y.push({
			x: u,
			y: d,
			lastX: u < 0 ? .99 : -.99,
			lastY: d < 0 ? .99 : -.99,
			start: Date.now()
		}), b || (o = q(), f = s === o || s === document.body, null == s.$scrollBehavior && function(e) {
			var t = B(e);
			null == T[t] && (e = getComputedStyle(e, "")["scroll-behavior"], T[t] = "smooth" == e);
			return T[t]
		}(s) && (s.$scrollBehavior = s.style.scrollBehavior, s.style.scrollBehavior = "auto"), w = function(e) {
			for (var t = Date.now(), o = 0, n = 0, r = 0; r < y.length; r++) {
				var a = y[r],
					l = t - a.start,
					i = l >= m.animationTime,
					c = i ? 1 : l / m.animationTime;
				m.pulseAlgorithm && (c = function(e) {
					if (1 <= e) return 1;
					if (e <= 0) return 0;
					1 == m.pulseNormalize && (m.pulseNormalize /= F(1));
					return F(e)
				}(c));
				l = a.x * c - a.lastX >> 0, c = a.y * c - a.lastY >> 0;
				o += l, n += c, a.lastX += l, a.lastY += c, i && (y.splice(r, 1), r--)
			}
			f ? window.scrollBy(o, n) : (o && (s.scrollLeft += o), n && (s.scrollTop += n)), (y = !u && !d ? [] : y).length ? A(w, s, 1e3 / m.frameRate + 1) : (b = !1, null != s.$scrollBehavior && (s.style.scrollBehavior = s.$scrollBehavior, s.$scrollBehavior = null))
		}, A(w, s, 0), b = !0)
	}

	function e(e) {
		d || v();
		var t = e.target;
		if (e.defaultPrevented || e.ctrlKey) return !0;
		if (K(s, "embed") || K(t, "embed") && /\.pdf/i.test(t.src) || K(s, "object") || t.shadowRoot) return !0;
		var o = -e.wheelDeltaX || e.deltaX || 0,
			n = -e.wheelDeltaY || e.deltaY || 0;
		w && (e.wheelDeltaX && P(e.wheelDeltaX, 120) && (o = e.wheelDeltaX / Math.abs(e.wheelDeltaX) * -120), e.wheelDeltaY && P(e.wheelDeltaY, 120) && (n = e.wheelDeltaY / Math.abs(e.wheelDeltaY) * -120)), o || n || (n = -e.wheelDelta || 0), 1 === e.deltaMode && (o *= 40, n *= 40);
		t = H(t);
		return t ? !! function(e) {
			if (e) {
				a.length || (a = [e, e, e]), e = Math.abs(e), a.push(e), a.shift(), clearTimeout(r), r = setTimeout(function() {
					try {
						localStorage.SS_deltaBuffer = a.join(",")
					} catch (e) {}
				}, 1e3);
				var t = 120 < e && $(e),
					t = !$(120) && !$(100) && !t;
				return e < 50 || t
			}
		}(n) || (1.2 < Math.abs(o) && (o *= m.stepSize / 120), 1.2 < Math.abs(n) && (n *= m.stepSize / 120), S(t, o, n), e.preventDefault(), void O()) : !u || !W || (Object.defineProperty(e, "target", {
			value: window.frameElement
		}), parent.wheel(e))
	}

	function x(e) {
		var t = e.target,
			o = e.ctrlKey || e.altKey || e.metaKey || e.shiftKey && e.keyCode !== h.spacebar;
		document.body.contains(s) || (s = document.activeElement);
		var n = /^(button|submit|radio|checkbox|file|color|image)$/i;
		if (e.defaultPrevented || /^(textarea|select|embed|object)$/i.test(t.nodeName) || K(t, "input") && !n.test(t.type) || K(s, "video") || function(e) {
				var t = e.target,
					o = !1;
				if (-1 != document.URL.indexOf("www.youtube.com/watch"))
					do {
						if (o = t.classList && t.classList.contains("html5-video-controls")) break
					} while (t = t.parentNode);
				return o
			}(e) || t.isContentEditable || o) return !0;
		if ((K(t, "button") || K(t, "input") && n.test(t.type)) && e.keyCode === h.spacebar) return !0;
		if (K(t, "input") && "radio" == t.type && p[e.keyCode]) return !0;
		var r = 0,
			a = 0,
			l = H(s);
		if (!l) return !u || !W || parent.keydown(e);
		var i = l.clientHeight;
		switch (l == document.body && (i = window.innerHeight), e.keyCode) {
			case h.up:
				a = -m.arrowScroll;
				break;
			case h.down:
				a = m.arrowScroll;
				break;
			case h.spacebar:
				a = -(e.shiftKey ? 1 : -1) * i * .9;
				break;
			case h.pageup:
				a = .9 * -i;
				break;
			case h.pagedown:
				a = .9 * i;
				break;
			case h.home:
				a = -(l = l == document.body && document.scrollingElement ? document.scrollingElement : l).scrollTop;
				break;
			case h.end:
				var c = l.scrollHeight - l.scrollTop - i,
					a = 0 < c ? 10 + c : 0;
				break;
			case h.left:
				r = -m.arrowScroll;
				break;
			case h.right:
				r = m.arrowScroll;
				break;
			default:
				return !0
		}
		S(l, r, a), e.preventDefault(), O()
	}

	function t(e) {
		s = e.target
	}
	var D, k, B = (D = 0, function(e) {
			return e.uniqueID || (e.uniqueID = D++)
		}),
		E = {},
		M = {},
		T = {};

	function O() {
		clearTimeout(k), k = setInterval(function() {
			E = M = T = {}
		}, 1e3)
	}

	function C(e, t, o) {
		for (var n = o ? E : M, r = e.length; r--;) n[B(e[r])] = t;
		return t
	}

	function H(e) {
		var t = [],
			o = document.body,
			n = f.scrollHeight;
		do {
			var r = (!1 ? E : M)[B(e)];
			if (r) return C(t, r);
			if (t.push(e), n === e.scrollHeight) {
				r = L(f) && L(o) || X(f);
				if (u && z(f) || !u && r) return C(t, q())
			} else if (z(e) && X(e)) return C(t, e)
		} while (e = e.parentElement)
	}

	function z(e) {
		return e.clientHeight + 10 < e.scrollHeight
	}

	function L(e) {
		return "hidden" !== getComputedStyle(e, "").getPropertyValue("overflow-y")
	}

	function X(e) {
		e = getComputedStyle(e, "").getPropertyValue("overflow-y");
		return "scroll" === e || "auto" === e
	}

	function Y(e, t, o) {
		window.addEventListener(e, t, o || !1)
	}

	function N(e, t, o) {
		window.removeEventListener(e, t, o || !1)
	}

	function K(e, t) {
		return e && (e.nodeName || "").toLowerCase() === t.toLowerCase()
	}
	if (window.localStorage && localStorage.SS_deltaBuffer) try {
		a = localStorage.SS_deltaBuffer.split(",")
	} catch (e) {}

	function P(e, t) {
		return Math.floor(e / t) == e / t
	}

	function $(e) {
		return P(a[0], e) && P(a[1], e) && P(a[2], e)
	}
	var j, A = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function(e, t, o) {
			window.setTimeout(e, o || 1e3 / 60)
		},
		R = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver,
		q = (j = document.scrollingElement, function() {
			var e, t;
			return j || ((e = document.createElement("div")).style.cssText = "height:10000px;width:1px;", document.body.appendChild(e), t = document.body.scrollTop, document.documentElement.scrollTop, window.scrollBy(0, 3), j = document.body.scrollTop != t ? document.body : document.documentElement, window.scrollBy(0, -3), document.body.removeChild(e)), j
		});

	function F(e) {
		var t;
		return ((e *= m.pulseScale) < 1 ? e - (1 - Math.exp(-e)) : (--e, (t = Math.exp(-1)) + (1 - Math.exp(-e)) * (1 - t))) * m.pulseNormalize
	}
	var I = window.navigator.userAgent,
		V = /Edge/.test(I),
		W = /chrome/i.test(I) && !V,
		_ = /safari/i.test(I) && !V,
		U = /firefox/i.test(I),
		G = /mobile/i.test(I),
		J = /Windows NT 6.1/i.test(I) && /rv:11/i.test(I),
		Q = _ && (/Version\/8/i.test(I) || /Version\/9/i.test(I)),
		Z = function() {
			if (G) return ~allowedBrowsers.indexOf("Mobile");
			return V ? ~allowedBrowsers.indexOf("Edge") : W ? ~allowedBrowsers.indexOf("Chrome") : _ ? ~allowedBrowsers.indexOf("Safari") : U ? ~allowedBrowsers.indexOf("Firefox") : J ? ~allowedBrowsers.indexOf("IEWin7") : ~allowedBrowsers.indexOf("other")
		}();
	var ee = !1;
	try {
		window.addEventListener("test", null, Object.defineProperty({}, "passive", {
			get: function() {
				ee = !0
			}
		}))
	} catch (e) {}
	var I = !!ee && {
			passive: !1
		},
		te = "onwheel" in document.createElement("div") ? "wheel" : "mousewheel";

	function oe(e) {
		for (var t in e) o.hasOwnProperty(t) && (m[t] = e[t])
	}
	te && Z && (Y(te, e, I), Y("mousedown", t), Y("load", v)), oe.destroy = function() {
		l && l.disconnect(), N(te, e), N("mousedown", t), N("keydown", x), N("resize", i), N("load", v)
	}, window.SmoothScrollOptions && oe(window.SmoothScrollOptions), "function" == typeof define && define.amd ? define(function() {
		return oe
	}) : "object" == typeof exports ? module.exports = oe : window.SmoothScroll = oe
}();
SmoothScroll({
	frameRate: 150,
	animationTime: 800,
	stepSize: 65,
	pulseAlgorithm: 1,
	pulseScale: 4,
	pulseNormalize: 1,
	accelerationDelta: 40,
	accelerationMax: 3,
	keyboardSupport: 1,
	arrowScroll: 50,
});
// document.addEventListener("DOMContentLoaded", (t => {
// 	var e;
// 	wpcf7_recaptcha = {
// 		...null !== (e = wpcf7_recaptcha) && void 0 !== e ? e : {}
// 	};
// 	const c = wpcf7_recaptcha.sitekey,
// 		{
// 			homepage: n,
// 			contactform: a
// 		} = wpcf7_recaptcha.actions,
// 		o = t => {
// 			const {
// 				action: e,
// 				func: n,
// 				params: a
// 			} = t;
// 			grecaptcha.execute(c, {
// 				action: e
// 			}).then((t => {
// 				const c = new CustomEvent("wpcf7grecaptchaexecuted", {
// 					detail: {
// 						action: e,
// 						token: t
// 					}
// 				});
// 				document.dispatchEvent(c)
// 			})).then((() => {
// 				"function" == typeof n && n(...a)
// 			})).catch((t => console.error(t)))
// 		};
// 	if (grecaptcha.ready((() => {
// 			o({
// 				action: n
// 			})
// 		})), document.addEventListener("change", (t => {
// 			o({
// 				action: a
// 			})
// 		})), "undefined" != typeof wpcf7 && "function" == typeof wpcf7.submit) {
// 		const t = wpcf7.submit;
// 		wpcf7.submit = function(e) {
// 			let c = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
// 			o({
// 				action: a,
// 				func: t,
// 				params: [e, c]
// 			})
// 		}
// 	}
// 	document.addEventListener("wpcf7grecaptchaexecuted", (t => {
// 		const e = document.querySelectorAll('form.wpcf7-form input[name="_wpcf7_recaptcha_response"]');
// 		for (let c = 0; c < e.length; c++) e[c].setAttribute("value", t.detail.token)
// 	}))
// }));
const header = {
	init: () => {
		header.openMenu();
		header.openSubmenu();
		header.changeImage();
		header.onScrollMenu();
		header.closeMenu();
		if (window.innerWidth < 992) {
			header.changeMainMenuClassOnMobile();
		}
	},
	openMenu: () => {
		const menuButton = document.querySelector('.header__main--button');
		menuButton.addEventListener('click', () => {
			document.querySelector('body').classList.toggle('nav-active');
		});
	},
	closeMenu: () => {
		const subMenuLinks = document.querySelectorAll('.nav__item--1>.nav__link');
		subMenuLinks.forEach(elm => {
			elm.addEventListener('click', () => {
				document.querySelector('body').classList.toggle('nav-active');
			});
		});
	},
	openSubmenu: () => {
		const menuButton = document.querySelectorAll('.nav__item--0>.nav__link');
		if (document.querySelector('.nav__item--0>.nav__link')) {
			menuButton.forEach(element => {
				element.addEventListener('click', (e) => {
					if (e.target == element.querySelector('.nav__arrow--wrapper') || e.target == element.querySelector('.icon-arrow-bottom')) {
						e.preventDefault();
						element.parentNode.classList.toggle('submenu-active');
						const submenuElement = element.parentNode.querySelector('.nav__submenu');
						const submenusLength = submenuElement.querySelectorAll('.nav__item--1').length;
						let submenusTitleHeight = 2.75;
						if (window.innerWidth < 992) {
							submenusTitleHeight = 7.944;
						} else if (window.innerWidth >= 1536) {
							submenusTitleHeight = 2.4;
						}
						let headerNavWrpElm = document.querySelector('.header__nav--wrapper>.nav');
						if (element.parentNode.classList.contains('submenu-active')) {
							submenuElement.style.height = 'calc(' + (submenusLength * 2.31) + 'vh + ' + (submenusLength * submenusTitleHeight) + 'vw)';
							if (window.innerWidth < 1536) {
								headerNavWrpElm.style.paddingBottom = `20.4vh`;
							} else {
								headerNavWrpElm.style.paddingBottom = `18.4vh`;
							}
						} else {
							submenuElement.style.height = '0';
							if (window.innerWidth < 1536) {
								headerNavWrpElm.style.paddingBottom = `17.4vh`;
							} else {
								headerNavWrpElm.style.paddingBottom = `29.4vh`;
							}
						}
					}
				});
			});
		}
	},
	changeImage: () => {
		const menuButton = document.querySelectorAll('.nav__item--0>.nav__link');
		if (document.querySelector('.nav__item--0>.nav__link')) {
			menuButton.forEach(element => {
				element.addEventListener('mouseenter', () => {
					const imageLink = element.getAttribute('data-image') == '' ? window.location.protocol + '//' + window.location.hostname + '/wp-content/themes/ibuku/images/menu-first-background.jpg' : element.getAttribute('data-image');
					document.querySelector('.header__nav--image').style.backgroundImage = `url('${imageLink}')`;
				});
			});
		}
	},
	changeMainMenuClassOnMobile: () => {
		const mainMenuElements = document.querySelectorAll('.header__nav .nav__item--0>.nav__link');
		if (mainMenuElements[0]) {
			mainMenuElements.forEach(element => {
				element.classList.remove('h1');
				element.classList.add('h3');
			});
		}
	},
	onScrollMenu: () => {
		const bodyElm = document.querySelector('body');
		window.addEventListener('scroll', () => {
			if (window.scrollY > 75) {
				bodyElm.classList.add('scrolled');
			} else {
				bodyElm.classList.remove('scrolled');
			}
		});
	}
};
header.init();
class Banner {
	constructor() {
		this.homepage_banner = document.querySelector('.banner--homepage');
		console.log('hi')
		this.banner_with_image = document.querySelector('.banner--with-image');
		this.topOffset = 0;
		this.scale = 1;
		this.minScale = 1;
		this.maxScale = 1.25;
		if (this.homepage_banner) {
			this.bannerHeight = this.homepage_banner.offsetHeight;
		}
	}
	init() {
		if (this.homepage_banner) {
			window.addEventListener('DOMContentLoaded', () => {
				setTimeout(() => {
					document.querySelector('html').classList.add('loaded');
					this.homepage_banner.querySelector('.banner--homepage__content--title').classList.add('show');
					// this.homepage_banner.querySelector('.banner--homepage__arrow').classList.add('load');
					this.homepage_banner.querySelectorAll('.banner--homepage__button').forEach(elm => elm.classList.add('load'));
				}, 2500);
			});
		}
		this.homeBanner();
		if (this.banner_with_image) {
			window.addEventListener('DOMContentLoaded', () => {
				this.bannerWithImageScaling();
			});
		}
		if (window.innerWidth < 992) {
			this.addH4ClassForTitleOnMobile();
			this.removeXLClassForHeader();
		}
	}
	homeBanner() {
		if (!document.body.contains(this.homepage_banner)) {
			return;
		}
		const _this = this;
		_this.homeBannerScaling();
		window.addEventListener('scroll', () => {
			_this.homeBannerScaling();
		});
		let swiperElm = this.homepage_banner.querySelector('.banner--homepage__swiper');
		if (!swiperElm) {
			return;
		}
		let duration = parseInt(swiperElm.getAttribute('data-duration'));
		const swiper = new Swiper('.banner--homepage__swiper', {
		      autoplay: true,  
            loop:true,  
            // speed: 1000,
			autoplay: {
				delay: duration,
			},
			effect: 'fade',
			fadeEffect: {
				crossFade: true
			},
		});
	}
	homeBannerScaling() {
		let scrollPos = window.scrollY || window.scrollTop || document.getElementsByTagName('html')[0].scrollTop;
		let currentScale = this.scale - (scrollPos / this.bannerHeight);
		if (currentScale < this.minScale) {
			currentScale = this.minScale;
		}
		if (scrollPos < 10) {
			currentScale = this.maxScale;
		}
		if (scrollPos > this.topOffset && scrollPos < this.bannerHeight) {
			this.homepage_banner.querySelector('.banner--homepage__background').style.transform = `scale(${currentScale})`;
		}
	}
	bannerWithImageScaling() {
		const imageHeight = this.banner_with_image.querySelector('.banner--with-image__image img').offsetHeight;
		let backgroundHeight = 87.5 / 100 * Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
		const headerInnerHeight = 115 + document.querySelector('.banner--with-image__content .widget__heading').offsetHeight + 200;
		if (window.innerWidth < 992) {
			backgroundHeight = 50 / 100 * Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
		}
		let headerHeight = backgroundHeight - headerInnerHeight;
		if (window.innerWidth > 991) {
			this.banner_with_image.setAttribute('style', 'height:calc(87.5vh + ' + (imageHeight - headerHeight) + 'px);');
		} else if (window.innerWidth > 767) {
			headerHeight = headerInnerHeight > 600 ? backgroundHeight - headerInnerHeight - 70 : headerHeight;
			this.banner_with_image.setAttribute('style', 'height:calc(50vh + ' + (imageHeight - headerHeight) + 'px);');
		} else {
			headerHeight = headerInnerHeight > 500 ? backgroundHeight - headerInnerHeight - 120 : headerHeight;
			this.banner_with_image.setAttribute('style', 'height:calc(35vh + ' + (imageHeight - headerHeight) + 'px);');
		}
	}
	addH4ClassForTitleOnMobile() {
		if (this.homepage_banner) {
			const titleElement = this.homepage_banner.querySelector('.banner--homepage__content--title');
			if (titleElement) {
				titleElement.classList.add('h4');
			}
		}
	}
	removeXLClassForHeader() {
		if (document.querySelector('.banner .widget__heading')) {
			const headingElement = document.querySelector('.banner .widget__heading h2');
			headingElement.classList.remove('xl');
		}
	}
}
let banner = new Banner();
banner.init();
const columnTextImage = {
	textImageWidgets: document.querySelectorAll('.columns-text-image'),
	init: () => {
		if (!columnTextImage.textImageWidgets[0]) {
			return;
		}
		columnTextImage.initPlyr();
	},
	initPlyr: () => {
		const x2player = new Plyr('#x2-player');
	}
};
window.addEventListener('load', () => {
	columnTextImage.init();
});;;
const partners = {
	partnersWidget: document.querySelectorAll('.partners'),
	init: () => {
		if (!partners.partnersWidget[0]) {
			return;
		}
		partners.addH5ClassInParagraph();
		partners.stretchDivider();
	},
	addH5ClassInParagraph: () => {
		partners.partnersWidget.forEach(element => {
			const paragraphs = element.querySelector('.partners__description').querySelectorAll('p');
			paragraphs.forEach(paragraph => {
				paragraph.classList.add('h5');
			});
		});
	},
	stretchDivider: () => {
		partners.partnersWidget.forEach(element => {
			const divider = element.querySelector('.partners__divider svg');
			divider.setAttribute('preserveAspectRatio', 'none');
		});
	}
};
partners.init();
const quick_links = {
	quickLinksWidget: document.querySelectorAll('.quick-links'),
	init: () => {
		if (!quick_links.quickLinksWidget[0]) {}
		quick_links.addHoverState();
	},
	addHoverState: () => {
		quick_links.quickLinksWidget.forEach(element => {
			let containerWrapper = element.querySelector('.quick-links__links');
			const links = element.querySelectorAll('.quick-links__link');
			links.forEach(link => {
				let imageElm = link.parentNode.querySelector('.quick-links__image--inner');
				let imageWrapper = imageElm.parentNode.parentNode;
				link.addEventListener('mouseenter', () => {
					if (element.querySelector('.active')) {
						element.querySelectorAll('.active').forEach(active => {
							active.classList.remove('active');
						});
					}
					link.classList.add('active');
					link.parentNode.classList.add('active');
					const imageLink = link.hasAttribute('data-image') && link.getAttribute('data-image') !== '' ? link.getAttribute('data-image') : window.location.protocol + '//' + window.location.hostname + '/wp-content/themes/ibuku/images/quick-link-default.png';
					imageElm.style.backgroundImage = 'url("' + imageLink + '")';
				});
				link.addEventListener('mouseleave', () => {
					element.querySelectorAll('.active').forEach(active => {
						active.classList.remove('active');
					});
				});
			});
		});
	}
};
quick_links.init();
const publications = {
	publicationsWidgets: document.querySelectorAll('.publications'),
	init: () => {
		if (!publications.publicationsWidgets[0]) {
			return;
		}
		publications.addH5ClassToParagraph();
	},
	addH5ClassToParagraph: () => {
		publications.publicationsWidgets.forEach(element => {
			const allParagraphs = element.querySelectorAll('.publications__description p');
			allParagraphs.forEach(paragraph => {
				paragraph.classList.add('h5');
			});
		});
	}
};
publications.init();

 
 
 
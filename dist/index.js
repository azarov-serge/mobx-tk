import { observable, action, makeAutoObservable, makeObservable, computed } from "mobx";
import axios, { CanceledError } from "axios";
import { jsx } from "react/jsx-runtime";
import React from "react";
var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
function getDefaultExportFromCjs(x) {
  return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, "default") ? x["default"] : x;
}
function getAugmentedNamespace(n) {
  if (Object.prototype.hasOwnProperty.call(n, "__esModule")) return n;
  var f = n.default;
  if (typeof f == "function") {
    var a = function a2() {
      if (this instanceof a2) {
        return Reflect.construct(f, arguments, this.constructor);
      }
      return f.apply(this, arguments);
    };
    a.prototype = f.prototype;
  } else a = {};
  Object.defineProperty(a, "__esModule", { value: true });
  Object.keys(n).forEach(function(k) {
    var d = Object.getOwnPropertyDescriptor(n, k);
    Object.defineProperty(a, k, d.get ? d : {
      enumerable: true,
      get: function() {
        return n[k];
      }
    });
  });
  return a;
}
var queryString = {};
var base = {};
var decodeUriComponent = {};
var hasRequiredDecodeUriComponent;
function requireDecodeUriComponent() {
  if (hasRequiredDecodeUriComponent) return decodeUriComponent;
  hasRequiredDecodeUriComponent = 1;
  Object.defineProperty(decodeUriComponent, "__esModule", {
    value: true
  });
  decodeUriComponent.default = decodeUriComponent$1;
  function _typeof(o) {
    "@babel/helpers - typeof";
    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
      return typeof o2;
    } : function(o2) {
      return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
    }, _typeof(o);
  }
  var token = "%[a-f0-9]{2}";
  var singleMatcher = new RegExp("(" + token + ")|([^%]+?)", "gi");
  var multiMatcher = new RegExp("(" + token + ")+", "gi");
  function decodeComponents(components, split) {
    try {
      return [decodeURIComponent(components.join(""))];
    } catch (_unused) {
    }
    if (components.length === 1) {
      return components;
    }
    split = split || 1;
    var left = components.slice(0, split);
    var right = components.slice(split);
    return Array.prototype.concat.call([], decodeComponents(left), decodeComponents(right));
  }
  function decode(input) {
    try {
      return decodeURIComponent(input);
    } catch (_unused2) {
      var tokens = input.match(singleMatcher) || [];
      for (var i = 1; i < tokens.length; i++) {
        input = decodeComponents(tokens, i).join("");
        tokens = input.match(singleMatcher) || [];
      }
      return input;
    }
  }
  function customDecodeURIComponent(input) {
    var replaceMap = {
      "%FE%FF": "��",
      "%FF%FE": "��"
    };
    var match = multiMatcher.exec(input);
    while (match) {
      try {
        replaceMap[match[0]] = decodeURIComponent(match[0]);
      } catch (_unused3) {
        var result = decode(match[0]);
        if (result !== match[0]) {
          replaceMap[match[0]] = result;
        }
      }
      match = multiMatcher.exec(input);
    }
    replaceMap["%C2"] = "�";
    var entries = Object.keys(replaceMap);
    for (var _i = 0, _entries = entries; _i < _entries.length; _i++) {
      var key = _entries[_i];
      input = input.replace(new RegExp(key, "g"), replaceMap[key]);
    }
    return input;
  }
  function decodeUriComponent$1(encodedURI) {
    if (typeof encodedURI !== "string") {
      throw new TypeError("Expected `encodedURI` to be of type `string`, got `" + _typeof(encodedURI) + "`");
    }
    try {
      return decodeURIComponent(encodedURI);
    } catch (_unused4) {
      return customDecodeURIComponent(encodedURI);
    }
  }
  return decodeUriComponent;
}
var splitOnFirst = {};
var hasRequiredSplitOnFirst;
function requireSplitOnFirst() {
  if (hasRequiredSplitOnFirst) return splitOnFirst;
  hasRequiredSplitOnFirst = 1;
  Object.defineProperty(splitOnFirst, "__esModule", {
    value: true
  });
  splitOnFirst.default = splitOnFirst$1;
  function splitOnFirst$1(string, separator) {
    if (!(typeof string === "string" && typeof separator === "string")) {
      throw new TypeError("Expected the arguments to be of type `string`");
    }
    if (string === "" || separator === "") {
      return [];
    }
    var separatorIndex = string.indexOf(separator);
    if (separatorIndex === -1) {
      return [];
    }
    return [string.slice(0, separatorIndex), string.slice(separatorIndex + separator.length)];
  }
  return splitOnFirst;
}
var filterObj = {};
var hasRequiredFilterObj;
function requireFilterObj() {
  if (hasRequiredFilterObj) return filterObj;
  hasRequiredFilterObj = 1;
  Object.defineProperty(filterObj, "__esModule", {
    value: true
  });
  filterObj.excludeKeys = excludeKeys;
  filterObj.includeKeys = includeKeys;
  function _createForOfIteratorHelper(r, e) {
    var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
    if (!t) {
      if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e) {
        t && (r = t);
        var _n = 0, F = function F2() {
        };
        return { s: F, n: function n() {
          return _n >= r.length ? { done: true } : { done: false, value: r[_n++] };
        }, e: function e2(r2) {
          throw r2;
        }, f: F };
      }
      throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }
    var o, a = true, u = false;
    return { s: function s() {
      t = t.call(r);
    }, n: function n() {
      var r2 = t.next();
      return a = r2.done, r2;
    }, e: function e2(r2) {
      u = true, o = r2;
    }, f: function f() {
      try {
        a || null == t.return || t.return();
      } finally {
        if (u) throw o;
      }
    } };
  }
  function _unsupportedIterableToArray(r, a) {
    if (r) {
      if ("string" == typeof r) return _arrayLikeToArray(r, a);
      var t = {}.toString.call(r).slice(8, -1);
      return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0;
    }
  }
  function _arrayLikeToArray(r, a) {
    (null == a || a > r.length) && (a = r.length);
    for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
    return n;
  }
  function includeKeys(object, predicate) {
    var result = {};
    if (Array.isArray(predicate)) {
      var _iterator = _createForOfIteratorHelper(predicate), _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done; ) {
          var key = _step.value;
          var descriptor = Object.getOwnPropertyDescriptor(object, key);
          if (descriptor !== null && descriptor !== void 0 && descriptor.enumerable) {
            Object.defineProperty(result, key, descriptor);
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    } else {
      var _iterator2 = _createForOfIteratorHelper(Reflect.ownKeys(object)), _step2;
      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done; ) {
          var _key = _step2.value;
          var _descriptor = Object.getOwnPropertyDescriptor(object, _key);
          if (_descriptor.enumerable) {
            var value = object[_key];
            if (predicate(_key, value, object)) {
              Object.defineProperty(result, _key, _descriptor);
            }
          }
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
    }
    return result;
  }
  function excludeKeys(object, predicate) {
    if (Array.isArray(predicate)) {
      var set = new Set(predicate);
      return includeKeys(object, function(key) {
        return !set.has(key);
      });
    }
    return includeKeys(object, function(key, value, object2) {
      return !predicate(key, value, object2);
    });
  }
  return filterObj;
}
var hasRequiredBase;
function requireBase() {
  if (hasRequiredBase) return base;
  hasRequiredBase = 1;
  Object.defineProperty(base, "__esModule", {
    value: true
  });
  base.exclude = exclude;
  base.extract = extract;
  base.parse = parse;
  base.parseUrl = parseUrl;
  base.pick = pick;
  base.stringify = stringify;
  base.stringifyUrl = stringifyUrl;
  var _decodeUriComponent = _interopRequireDefault(requireDecodeUriComponent());
  var _splitOnFirst5 = _interopRequireDefault(requireSplitOnFirst());
  var _filterObj = requireFilterObj();
  function _interopRequireDefault(e) {
    return e && e.__esModule ? e : { default: e };
  }
  function _slicedToArray(r, e) {
    return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest();
  }
  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  function _iterableToArrayLimit(r, l) {
    var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
    if (null != t) {
      var e, n, i, u, a = [], f = true, o = false;
      try {
        if (i = (t = t.call(r)).next, 0 === l) ;
        else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = true) ;
      } catch (r2) {
        o = true, n = r2;
      } finally {
        try {
          if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return;
        } finally {
          if (o) throw n;
        }
      }
      return a;
    }
  }
  function _arrayWithHoles(r) {
    if (Array.isArray(r)) return r;
  }
  function _createForOfIteratorHelper(r, e) {
    var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
    if (!t) {
      if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e) {
        t && (r = t);
        var _n = 0, F = function F2() {
        };
        return { s: F, n: function n() {
          return _n >= r.length ? { done: true } : { done: false, value: r[_n++] };
        }, e: function e2(r2) {
          throw r2;
        }, f: F };
      }
      throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }
    var o, a = true, u = false;
    return { s: function s() {
      t = t.call(r);
    }, n: function n() {
      var r2 = t.next();
      return a = r2.done, r2;
    }, e: function e2(r2) {
      u = true, o = r2;
    }, f: function f() {
      try {
        a || null == t.return || t.return();
      } finally {
        if (u) throw o;
      }
    } };
  }
  function ownKeys(e, r) {
    var t = Object.keys(e);
    if (Object.getOwnPropertySymbols) {
      var o = Object.getOwnPropertySymbols(e);
      r && (o = o.filter(function(r2) {
        return Object.getOwnPropertyDescriptor(e, r2).enumerable;
      })), t.push.apply(t, o);
    }
    return t;
  }
  function _objectSpread(e) {
    for (var r = 1; r < arguments.length; r++) {
      var t = null != arguments[r] ? arguments[r] : {};
      r % 2 ? ownKeys(Object(t), true).forEach(function(r2) {
        _defineProperty(e, r2, t[r2]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function(r2) {
        Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
      });
    }
    return e;
  }
  function _defineProperty(e, r, t) {
    return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: true, configurable: true, writable: true }) : e[r] = t, e;
  }
  function _toPropertyKey(t) {
    var i = _toPrimitive(t, "string");
    return "symbol" == _typeof(i) ? i : i + "";
  }
  function _toPrimitive(t, r) {
    if ("object" != _typeof(t) || !t) return t;
    var e = t[Symbol.toPrimitive];
    if (void 0 !== e) {
      var i = e.call(t, r);
      if ("object" != _typeof(i)) return i;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return ("string" === r ? String : Number)(t);
  }
  function _typeof(o) {
    "@babel/helpers - typeof";
    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
      return typeof o2;
    } : function(o2) {
      return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
    }, _typeof(o);
  }
  function _toConsumableArray(r) {
    return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread();
  }
  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  function _unsupportedIterableToArray(r, a) {
    if (r) {
      if ("string" == typeof r) return _arrayLikeToArray(r, a);
      var t = {}.toString.call(r).slice(8, -1);
      return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0;
    }
  }
  function _iterableToArray(r) {
    if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r);
  }
  function _arrayWithoutHoles(r) {
    if (Array.isArray(r)) return _arrayLikeToArray(r);
  }
  function _arrayLikeToArray(r, a) {
    (null == a || a > r.length) && (a = r.length);
    for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
    return n;
  }
  var isNullOrUndefined = function isNullOrUndefined2(value) {
    return value === null || value === void 0;
  };
  var strictUriEncode = function strictUriEncode2(string) {
    return encodeURIComponent(string).replace(/[!'()*]/g, function(x) {
      return "%".concat(x.charCodeAt(0).toString(16).toUpperCase());
    });
  };
  var encodeFragmentIdentifier = Symbol("encodeFragmentIdentifier");
  function encoderForArrayFormat(options) {
    switch (options.arrayFormat) {
      case "index": {
        return function(key) {
          return function(result, value) {
            var index = result.length;
            if (value === void 0 || options.skipNull && value === null || options.skipEmptyString && value === "") {
              return result;
            }
            if (value === null) {
              return [].concat(_toConsumableArray(result), [[encode(key, options), "[", index, "]"].join("")]);
            }
            return [].concat(_toConsumableArray(result), [[encode(key, options), "[", encode(index, options), "]=", encode(value, options)].join("")]);
          };
        };
      }
      case "bracket": {
        return function(key) {
          return function(result, value) {
            if (value === void 0 || options.skipNull && value === null || options.skipEmptyString && value === "") {
              return result;
            }
            if (value === null) {
              return [].concat(_toConsumableArray(result), [[encode(key, options), "[]"].join("")]);
            }
            return [].concat(_toConsumableArray(result), [[encode(key, options), "[]=", encode(value, options)].join("")]);
          };
        };
      }
      case "colon-list-separator": {
        return function(key) {
          return function(result, value) {
            if (value === void 0 || options.skipNull && value === null || options.skipEmptyString && value === "") {
              return result;
            }
            if (value === null) {
              return [].concat(_toConsumableArray(result), [[encode(key, options), ":list="].join("")]);
            }
            return [].concat(_toConsumableArray(result), [[encode(key, options), ":list=", encode(value, options)].join("")]);
          };
        };
      }
      case "comma":
      case "separator":
      case "bracket-separator": {
        var keyValueSep = options.arrayFormat === "bracket-separator" ? "[]=" : "=";
        return function(key) {
          return function(result, value) {
            if (value === void 0 || options.skipNull && value === null || options.skipEmptyString && value === "") {
              return result;
            }
            value = value === null ? "" : value;
            if (result.length === 0) {
              return [[encode(key, options), keyValueSep, encode(value, options)].join("")];
            }
            return [[result, encode(value, options)].join(options.arrayFormatSeparator)];
          };
        };
      }
      default: {
        return function(key) {
          return function(result, value) {
            if (value === void 0 || options.skipNull && value === null || options.skipEmptyString && value === "") {
              return result;
            }
            if (value === null) {
              return [].concat(_toConsumableArray(result), [encode(key, options)]);
            }
            return [].concat(_toConsumableArray(result), [[encode(key, options), "=", encode(value, options)].join("")]);
          };
        };
      }
    }
  }
  function parserForArrayFormat(options) {
    var result;
    switch (options.arrayFormat) {
      case "index": {
        return function(key, value, accumulator) {
          result = /\[(\d*)]$/.exec(key);
          key = key.replace(/\[\d*]$/, "");
          if (!result) {
            accumulator[key] = value;
            return;
          }
          if (accumulator[key] === void 0) {
            accumulator[key] = {};
          }
          accumulator[key][result[1]] = value;
        };
      }
      case "bracket": {
        return function(key, value, accumulator) {
          result = /(\[])$/.exec(key);
          key = key.replace(/\[]$/, "");
          if (!result) {
            accumulator[key] = value;
            return;
          }
          if (accumulator[key] === void 0) {
            accumulator[key] = [value];
            return;
          }
          accumulator[key] = [].concat(_toConsumableArray(accumulator[key]), [value]);
        };
      }
      case "colon-list-separator": {
        return function(key, value, accumulator) {
          result = /(:list)$/.exec(key);
          key = key.replace(/:list$/, "");
          if (!result) {
            accumulator[key] = value;
            return;
          }
          if (accumulator[key] === void 0) {
            accumulator[key] = [value];
            return;
          }
          accumulator[key] = [].concat(_toConsumableArray(accumulator[key]), [value]);
        };
      }
      case "comma":
      case "separator": {
        return function(key, value, accumulator) {
          var isArray = typeof value === "string" && value.includes(options.arrayFormatSeparator);
          var isEncodedArray = typeof value === "string" && !isArray && decode(value, options).includes(options.arrayFormatSeparator);
          value = isEncodedArray ? decode(value, options) : value;
          var newValue = isArray || isEncodedArray ? value.split(options.arrayFormatSeparator).map(function(item) {
            return decode(item, options);
          }) : value === null ? value : decode(value, options);
          accumulator[key] = newValue;
        };
      }
      case "bracket-separator": {
        return function(key, value, accumulator) {
          var isArray = /(\[])$/.test(key);
          key = key.replace(/\[]$/, "");
          if (!isArray) {
            accumulator[key] = value ? decode(value, options) : value;
            return;
          }
          var arrayValue = value === null ? [] : value.split(options.arrayFormatSeparator).map(function(item) {
            return decode(item, options);
          });
          if (accumulator[key] === void 0) {
            accumulator[key] = arrayValue;
            return;
          }
          accumulator[key] = [].concat(_toConsumableArray(accumulator[key]), _toConsumableArray(arrayValue));
        };
      }
      default: {
        return function(key, value, accumulator) {
          if (accumulator[key] === void 0) {
            accumulator[key] = value;
            return;
          }
          accumulator[key] = [].concat(_toConsumableArray([accumulator[key]].flat()), [value]);
        };
      }
    }
  }
  function validateArrayFormatSeparator(value) {
    if (typeof value !== "string" || value.length !== 1) {
      throw new TypeError("arrayFormatSeparator must be single character string");
    }
  }
  function encode(value, options) {
    if (options.encode) {
      return options.strict ? strictUriEncode(value) : encodeURIComponent(value);
    }
    return value;
  }
  function decode(value, options) {
    if (options.decode) {
      return (0, _decodeUriComponent.default)(value);
    }
    return value;
  }
  function keysSorter(input) {
    if (Array.isArray(input)) {
      return input.sort();
    }
    if (_typeof(input) === "object") {
      return keysSorter(Object.keys(input)).sort(function(a, b) {
        return Number(a) - Number(b);
      }).map(function(key) {
        return input[key];
      });
    }
    return input;
  }
  function removeHash(input) {
    var hashStart = input.indexOf("#");
    if (hashStart !== -1) {
      input = input.slice(0, hashStart);
    }
    return input;
  }
  function getHash(url) {
    var hash = "";
    var hashStart = url.indexOf("#");
    if (hashStart !== -1) {
      hash = url.slice(hashStart);
    }
    return hash;
  }
  function parseValue(value, options) {
    if (options.parseNumbers && !Number.isNaN(Number(value)) && typeof value === "string" && value.trim() !== "") {
      value = Number(value);
    } else if (options.parseBooleans && value !== null && (value.toLowerCase() === "true" || value.toLowerCase() === "false")) {
      value = value.toLowerCase() === "true";
    }
    return value;
  }
  function extract(input) {
    input = removeHash(input);
    var queryStart = input.indexOf("?");
    if (queryStart === -1) {
      return "";
    }
    return input.slice(queryStart + 1);
  }
  function parse(query, options) {
    options = _objectSpread({
      decode: true,
      sort: true,
      arrayFormat: "none",
      arrayFormatSeparator: ",",
      parseNumbers: false,
      parseBooleans: false
    }, options);
    validateArrayFormatSeparator(options.arrayFormatSeparator);
    var formatter = parserForArrayFormat(options);
    var returnValue = /* @__PURE__ */ Object.create(null);
    if (typeof query !== "string") {
      return returnValue;
    }
    query = query.trim().replace(/^[?#&]/, "");
    if (!query) {
      return returnValue;
    }
    var _iterator = _createForOfIteratorHelper(query.split("&")), _step;
    try {
      for (_iterator.s(); !(_step = _iterator.n()).done; ) {
        var parameter = _step.value;
        if (parameter === "") {
          continue;
        }
        var parameter_ = options.decode ? parameter.replace(/\+/g, " ") : parameter;
        var _splitOnFirst = (0, _splitOnFirst5.default)(parameter_, "="), _splitOnFirst2 = _slicedToArray(_splitOnFirst, 2), _key = _splitOnFirst2[0], _value = _splitOnFirst2[1];
        if (_key === void 0) {
          _key = parameter_;
        }
        _value = _value === void 0 ? null : ["comma", "separator", "bracket-separator"].includes(options.arrayFormat) ? _value : decode(_value, options);
        formatter(decode(_key, options), _value, returnValue);
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
    for (var _i = 0, _Object$entries = Object.entries(returnValue); _i < _Object$entries.length; _i++) {
      var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2), key = _Object$entries$_i[0], value = _Object$entries$_i[1];
      if (_typeof(value) === "object" && value !== null) {
        for (var _i2 = 0, _Object$entries2 = Object.entries(value); _i2 < _Object$entries2.length; _i2++) {
          var _Object$entries2$_i = _slicedToArray(_Object$entries2[_i2], 2), key2 = _Object$entries2$_i[0], value2 = _Object$entries2$_i[1];
          value[key2] = parseValue(value2, options);
        }
      } else {
        returnValue[key] = parseValue(value, options);
      }
    }
    if (options.sort === false) {
      return returnValue;
    }
    return (options.sort === true ? Object.keys(returnValue).sort() : Object.keys(returnValue).sort(options.sort)).reduce(function(result, key3) {
      var value3 = returnValue[key3];
      if (Boolean(value3) && _typeof(value3) === "object" && !Array.isArray(value3)) {
        result[key3] = keysSorter(value3);
      } else {
        result[key3] = value3;
      }
      return result;
    }, /* @__PURE__ */ Object.create(null));
  }
  function stringify(object, options) {
    if (!object) {
      return "";
    }
    options = _objectSpread({
      encode: true,
      strict: true,
      arrayFormat: "none",
      arrayFormatSeparator: ","
    }, options);
    validateArrayFormatSeparator(options.arrayFormatSeparator);
    var shouldFilter = function shouldFilter2(key2) {
      return options.skipNull && isNullOrUndefined(object[key2]) || options.skipEmptyString && object[key2] === "";
    };
    var formatter = encoderForArrayFormat(options);
    var objectCopy = {};
    for (var _i3 = 0, _Object$entries3 = Object.entries(object); _i3 < _Object$entries3.length; _i3++) {
      var _Object$entries3$_i = _slicedToArray(_Object$entries3[_i3], 2), key = _Object$entries3$_i[0], value = _Object$entries3$_i[1];
      if (!shouldFilter(key)) {
        objectCopy[key] = value;
      }
    }
    var keys = Object.keys(objectCopy);
    if (options.sort !== false) {
      keys.sort(options.sort);
    }
    return keys.map(function(key2) {
      var value2 = object[key2];
      if (value2 === void 0) {
        return "";
      }
      if (value2 === null) {
        return encode(key2, options);
      }
      if (Array.isArray(value2)) {
        if (value2.length === 0 && options.arrayFormat === "bracket-separator") {
          return encode(key2, options) + "[]";
        }
        return value2.reduce(formatter(key2), []).join("&");
      }
      return encode(key2, options) + "=" + encode(value2, options);
    }).filter(function(x) {
      return x.length > 0;
    }).join("&");
  }
  function parseUrl(url, options) {
    var _url_$split$, _url_;
    options = _objectSpread({
      decode: true
    }, options);
    var _splitOnFirst3 = (0, _splitOnFirst5.default)(url, "#"), _splitOnFirst4 = _slicedToArray(_splitOnFirst3, 2), url_ = _splitOnFirst4[0], hash = _splitOnFirst4[1];
    if (url_ === void 0) {
      url_ = url;
    }
    return _objectSpread({
      url: (_url_$split$ = (_url_ = url_) === null || _url_ === void 0 || (_url_ = _url_.split("?")) === null || _url_ === void 0 ? void 0 : _url_[0]) !== null && _url_$split$ !== void 0 ? _url_$split$ : "",
      query: parse(extract(url), options)
    }, options && options.parseFragmentIdentifier && hash ? {
      fragmentIdentifier: decode(hash, options)
    } : {});
  }
  function stringifyUrl(object, options) {
    options = _objectSpread(_defineProperty({
      encode: true,
      strict: true
    }, encodeFragmentIdentifier, true), options);
    var url = removeHash(object.url).split("?")[0] || "";
    var queryFromUrl = extract(object.url);
    var query = _objectSpread(_objectSpread({}, parse(queryFromUrl, {
      sort: false
    })), object.query);
    var queryString2 = stringify(query, options);
    if (queryString2) {
      queryString2 = "?".concat(queryString2);
    }
    var hash = getHash(object.url);
    if (object.fragmentIdentifier) {
      var urlObjectForFragmentEncode = new URL(url);
      urlObjectForFragmentEncode.hash = object.fragmentIdentifier;
      hash = options[encodeFragmentIdentifier] ? urlObjectForFragmentEncode.hash : "#".concat(object.fragmentIdentifier);
    }
    return "".concat(url).concat(queryString2).concat(hash);
  }
  function pick(input, filter, options) {
    options = _objectSpread(_defineProperty({
      parseFragmentIdentifier: true
    }, encodeFragmentIdentifier, false), options);
    var _parseUrl = parseUrl(input, options), url = _parseUrl.url, query = _parseUrl.query, fragmentIdentifier = _parseUrl.fragmentIdentifier;
    return stringifyUrl({
      url,
      query: (0, _filterObj.includeKeys)(query, filter),
      fragmentIdentifier
    }, options);
  }
  function exclude(input, filter, options) {
    var exclusionFilter = Array.isArray(filter) ? function(key) {
      return !filter.includes(key);
    } : function(key, value) {
      return !filter(key, value);
    };
    return pick(input, exclusionFilter, options);
  }
  return base;
}
var hasRequiredQueryString;
function requireQueryString() {
  if (hasRequiredQueryString) return queryString;
  hasRequiredQueryString = 1;
  function _typeof(o) {
    "@babel/helpers - typeof";
    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
      return typeof o2;
    } : function(o2) {
      return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
    }, _typeof(o);
  }
  Object.defineProperty(queryString, "__esModule", {
    value: true
  });
  queryString.default = void 0;
  var queryString$1 = _interopRequireWildcard(requireBase());
  function _interopRequireWildcard(e, t) {
    if ("function" == typeof WeakMap) var r = /* @__PURE__ */ new WeakMap(), n = /* @__PURE__ */ new WeakMap();
    return (_interopRequireWildcard = function _interopRequireWildcard2(e2, t2) {
      if (!t2 && e2 && e2.__esModule) return e2;
      var o, i, f = { __proto__: null, default: e2 };
      if (null === e2 || "object" != _typeof(e2) && "function" != typeof e2) return f;
      if (o = t2 ? n : r) {
        if (o.has(e2)) return o.get(e2);
        o.set(e2, f);
      }
      for (var _t in e2) "default" !== _t && {}.hasOwnProperty.call(e2, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e2, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e2[_t]);
      return f;
    })(e, t);
  }
  queryString.default = queryString$1;
  return queryString;
}
var queryStringExports = requireQueryString();
const qs = /* @__PURE__ */ getDefaultExportFromCjs(queryStringExports);
class AbstractQuery {
  constructor(data) {
    this.id = "";
    this.baseUrl = "";
    this.method = "GET";
    this.params = {};
    this.urlParam = "";
    this.getParamsValue = (key, defaultValue) => {
      return this.params[key] ?? defaultValue;
    };
    this.createUrl = (params) => {
      const query = AbstractQuery.createParams(params ?? this.params);
      return `${this.baseUrl}${this.urlParam}${query ? `?${query}` : ""}`;
    };
    this.createKey = (url, params) => {
      const id = this.id ? `/${this.id}` : "";
      return `[${this.method}]:${url ?? this.createUrl(params)}${id}`;
    };
    this.id = `${(data == null ? void 0 : data.id) || this.id}`;
    this.method = (data == null ? void 0 : data.method) || this.method;
    this.params = { ...(data == null ? void 0 : data.params) ?? this.params };
    this.baseUrl = (data == null ? void 0 : data.baseUrl) || (data == null ? void 0 : data.url) || this.baseUrl;
    this.urlParam = (data == null ? void 0 : data.urlParam) || this.urlParam;
    if (data == null ? void 0 : data.key) {
      this._key = data.key;
    }
  }
  /** Unique resource key */
  get key() {
    if (this._key) {
      return this._key;
    }
    return this.createKey();
  }
  /** Can be used to clear state if there is a search like search=*/
  get keyShort() {
    return `[${this.method}]:${this.baseUrl}`;
  }
  /** URL for getting data */
  get url() {
    return this.createUrl();
  }
  cloneWith(data) {
    throw Error(`This is abstract method with ${JSON.stringify(data)}`);
  }
  static createUrlString(data) {
    const { url, query } = qs.parseUrl(data);
    if (!query) {
      return url;
    }
    return `${url}?${AbstractQuery.createParams(query)}`;
  }
  /** Uses qs.stringify. Sorts keys and converts to query string
   * @description
   * @param query
   * @param options
   * @returns
   */
  static createParams(params, options) {
    if (JSON.stringify(params) === "{}") {
      return "";
    }
    return qs.stringify(
      Object.keys(params).filter((key) => params[key] !== void 0 && params[key] !== "").sort((a, b) => a.localeCompare(b)).reduce((acc, key) => {
        acc[key] = Array.isArray(params[key]) ? (
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          //@ts-ignore
          params[key].sort((a, b) => JSON.stringify(a).localeCompare(JSON.stringify(b)))
        ) : params[key];
        return acc;
      }, {}),
      options
    );
  }
}
class PaginationQuery extends AbstractQuery {
  constructor(data) {
    super(data);
    this.page = 1;
    this.pageParams = {};
    this.pageLimit = {};
    this.cloneWith = (data2) => {
      return new PaginationQuery({ ...this, ...data2 ?? {} });
    };
    this.nextPage = (params) => {
      const currentParams = PaginationQuery.createParams({
        ...this.pageParams[this.page] ?? {}
      });
      const newParams = PaginationQuery.createParams(params);
      if (currentParams === newParams) {
        return false;
      }
      this.pageLimit[this.page + 1] = this.limit;
      this.page = this.page + 1;
      this.pageParams[this.page] = params;
      return true;
    };
    this.getPaginationParamsValue = (key, defaultValue, page) => {
      const params = this.pageParams[page ?? this.page] ?? {};
      return params[key] ?? defaultValue;
    };
    this.setParams = (params) => {
      if (PaginationQuery.createParams(params) !== PaginationQuery.createParams(this.params)) {
        this.page = 1;
        this.pageParams = {};
        this.pageLimit = {
          1: { ...this.getLimit(1) }
        };
      }
      this.params = { ...params };
    };
    this.getLimit = (page) => {
      return this.pageLimit[page ?? this.page] ?? {};
    };
    this.page = (data == null ? void 0 : data.page) ?? this.page;
    this.pageParams = {
      ...this.pageParams,
      ...(data == null ? void 0 : data.pageParams) ?? {}
    };
    this.pageLimit = {
      ...this.pageLimit,
      ...(data == null ? void 0 : data.pageLimit) ?? {}
    };
    if (data == null ? void 0 : data.limit) {
      this.pageLimit[this.page] = data.limit;
    }
    this.params = { ...(data == null ? void 0 : data.params) ?? this.params };
  }
  get url() {
    const params = this.pageParams[this.page] ?? {};
    const limit = this.getLimit();
    return this.createUrl({ ...this.params, ...params, ...limit });
  }
  get urls() {
    return Array.from({ length: this.page }).map((_, index) => {
      const page = index + 1;
      const params = this.pageParams[page] ?? {};
      const limit = this.getLimit(page);
      return this.createUrl({ ...this.params, ...params, ...limit });
    });
  }
  /** Unique resource keys */
  get key() {
    return this.keys[this.page - 1];
  }
  /** Unique resource keys */
  get keys() {
    return this.urls.map((url) => this.createKey(url));
  }
  get limit() {
    return this.getLimit();
  }
  static isInstance(value) {
    return value instanceof PaginationQuery;
  }
}
class QueryError {
  constructor(data) {
    this.toString = () => {
      return `${this.status ? `Status ${this.status}: ` : ""}${this.message}`;
    };
    this.status = data.status;
    this.message = data.message;
  }
}
let CertError$1 = class CertError extends QueryError {
  constructor() {
    super({
      status: 0,
      message: "ERR_CERT_AUTHORITY_INVALID"
    });
  }
};
let NetworkError$1 = class NetworkError extends QueryError {
  constructor(message) {
    super({
      status: 0,
      message: message ?? "NETWORK ERROR"
    });
  }
};
class QueryStatus {
  constructor(data) {
    this.isFetching = false;
    this.isFetched = false;
    this.data = null;
    this.error = null;
    this.cloneWith = (data2) => {
      return new QueryStatus({ ...this, ...data2 });
    };
    this.isFetching = (data == null ? void 0 : data.isFetching) ?? this.isFetching;
    this.isFetched = (data == null ? void 0 : data.isFetched) ?? this.isFetched;
    this.data = (data == null ? void 0 : data.data) ?? this.data;
    this.error = (data == null ? void 0 : data.error) ?? this.error;
  }
}
class Query extends AbstractQuery {
  constructor() {
    super(...arguments);
    this.cloneWith = (data) => {
      return new Query({ ...this, ...data });
    };
  }
  static isInstance(value) {
    return value instanceof Query;
  }
}
class ResponseError {
  constructor(data) {
    this.toString = () => {
      return `${this.status ? `Status ${this.status}: ` : ""}${this.message}`;
    };
    this.status = data.status;
    this.message = data.message;
  }
}
class CertError2 extends ResponseError {
  constructor() {
    super({
      status: 0,
      message: "ERR_CERT_AUTHORITY_INVALID"
    });
  }
}
class NetworkError2 extends ResponseError {
  constructor(message) {
    super({
      status: 0,
      message: message ?? "NETWORK ERROR"
    });
  }
}
const CERT_ERROR_CODE$1 = "ERR_CERT_AUTHORITY_INVALID";
const networkErrors$1 = [
  "Timeout when waiting for 3rd party check iframe message.",
  "ERR_NETWORK"
];
const TYPE_KEY = "authStrategyName";
const START_URL_KEY = "startUrl";
const protocol$1 = window.location.protocol;
const [baseUrl$1] = window.location.href.replace(`${protocol$1}//`, "").split("/");
const startUrl$1 = `${protocol$1}//${baseUrl$1}`;
class StrategyHelper {
  constructor() {
    this.isAuthenticated = false;
    this.clearStorage = () => {
      localStorage.removeItem(TYPE_KEY);
    };
    this.reset = () => {
      this.clearStorage();
      this.isAuthenticated = false;
    };
  }
  get activeStrategyName() {
    return localStorage.getItem(TYPE_KEY) ?? "";
  }
  set activeStrategyName(name) {
    if (!name) {
      localStorage.removeItem(TYPE_KEY);
    } else {
      localStorage.setItem(TYPE_KEY, name);
    }
  }
  get startUrl() {
    return localStorage.getItem(START_URL_KEY) ?? startUrl$1;
  }
  set startUrl(url) {
    if (url) {
      localStorage.setItem(START_URL_KEY, url);
    } else {
      localStorage.removeItem(START_URL_KEY);
    }
  }
}
const strategyHelper = new StrategyHelper();
class EmptyStrategy extends StrategyHelper {
  constructor() {
    super(...arguments);
    this.name = "empty";
    this.check = async () => {
      return false;
    };
    this.signIn = async () => {
      return false;
    };
    this.signUp = async () => {
      return false;
    };
    this.signOut = async () => {
      this.clearStorage();
    };
    this.refreshToken = async () => {
    };
    this.getUserProfile = async () => {
      return void 0;
    };
  }
}
var sha256$1 = { exports: {} };
const __viteBrowserExternal = {};
const __viteBrowserExternal$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: __viteBrowserExternal
}, Symbol.toStringTag, { value: "Module" }));
const require$$1 = /* @__PURE__ */ getAugmentedNamespace(__viteBrowserExternal$1);
sha256$1.exports;
var hasRequiredSha256;
function requireSha256() {
  if (hasRequiredSha256) return sha256$1.exports;
  hasRequiredSha256 = 1;
  (function(module) {
    function _typeof(o) {
      "@babel/helpers - typeof";
      return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
        return typeof o2;
      } : function(o2) {
        return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
      }, _typeof(o);
    }
    /**
     * [js-sha256]{@link https://github.com/emn178/js-sha256}
     *
     * @version 0.11.1
     * @author Chen, Yi-Cyuan [emn178@gmail.com]
     * @copyright Chen, Yi-Cyuan 2014-2025
     * @license MIT
     */
    (function() {
      var ERROR = "input is invalid type";
      var WINDOW = (typeof window === "undefined" ? "undefined" : _typeof(window)) === "object";
      var root = WINDOW ? window : {};
      if (root.JS_SHA256_NO_WINDOW) {
        WINDOW = false;
      }
      var WEB_WORKER = !WINDOW && (typeof self === "undefined" ? "undefined" : _typeof(self)) === "object";
      var NODE_JS = !root.JS_SHA256_NO_NODE_JS && (typeof process === "undefined" ? "undefined" : _typeof(process)) === "object" && process.versions && process.versions.node && process.type != "renderer";
      if (NODE_JS) {
        root = commonjsGlobal;
      } else if (WEB_WORKER) {
        root = self;
      }
      var COMMON_JS = !root.JS_SHA256_NO_COMMON_JS && _typeof(module) === "object" && module.exports;
      var ARRAY_BUFFER = !root.JS_SHA256_NO_ARRAY_BUFFER && typeof ArrayBuffer !== "undefined";
      var HEX_CHARS = "0123456789abcdef".split("");
      var EXTRA = [-2147483648, 8388608, 32768, 128];
      var SHIFT = [24, 16, 8, 0];
      var K = [1116352408, 1899447441, 3049323471, 3921009573, 961987163, 1508970993, 2453635748, 2870763221, 3624381080, 310598401, 607225278, 1426881987, 1925078388, 2162078206, 2614888103, 3248222580, 3835390401, 4022224774, 264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986, 2554220882, 2821834349, 2952996808, 3210313671, 3336571891, 3584528711, 113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291, 1695183700, 1986661051, 2177026350, 2456956037, 2730485921, 2820302411, 3259730800, 3345764771, 3516065817, 3600352804, 4094571909, 275423344, 430227734, 506948616, 659060556, 883997877, 958139571, 1322822218, 1537002063, 1747873779, 1955562222, 2024104815, 2227730452, 2361852424, 2428436474, 2756734187, 3204031479, 3329325298];
      var OUTPUT_TYPES = ["hex", "array", "digest", "arrayBuffer"];
      var blocks = [];
      if (root.JS_SHA256_NO_NODE_JS || !Array.isArray) {
        Array.isArray = function(obj) {
          return Object.prototype.toString.call(obj) === "[object Array]";
        };
      }
      if (ARRAY_BUFFER && (root.JS_SHA256_NO_ARRAY_BUFFER_IS_VIEW || !ArrayBuffer.isView)) {
        ArrayBuffer.isView = function(obj) {
          return _typeof(obj) === "object" && obj.buffer && obj.buffer.constructor === ArrayBuffer;
        };
      }
      var createOutputMethod = function createOutputMethod2(outputType, is224) {
        return function(message) {
          return new Sha256(is224, true).update(message)[outputType]();
        };
      };
      var createMethod = function createMethod2(is224) {
        var method = createOutputMethod("hex", is224);
        if (NODE_JS) {
          method = nodeWrap(method, is224);
        }
        method.create = function() {
          return new Sha256(is224);
        };
        method.update = function(message) {
          return method.create().update(message);
        };
        for (var i = 0; i < OUTPUT_TYPES.length; ++i) {
          var type = OUTPUT_TYPES[i];
          method[type] = createOutputMethod(type, is224);
        }
        return method;
      };
      var nodeWrap = function nodeWrap2(method, is224) {
        var crypto = require$$1;
        var Buffer = require$$1.Buffer;
        var algorithm = is224 ? "sha224" : "sha256";
        var bufferFrom;
        if (Buffer.from && !root.JS_SHA256_NO_BUFFER_FROM) {
          bufferFrom = Buffer.from;
        } else {
          bufferFrom = function bufferFrom2(message) {
            return new Buffer(message);
          };
        }
        var nodeMethod = function nodeMethod2(message) {
          if (typeof message === "string") {
            return crypto.createHash(algorithm).update(message, "utf8").digest("hex");
          } else {
            if (message === null || message === void 0) {
              throw new Error(ERROR);
            } else if (message.constructor === ArrayBuffer) {
              message = new Uint8Array(message);
            }
          }
          if (Array.isArray(message) || ArrayBuffer.isView(message) || message.constructor === Buffer) {
            return crypto.createHash(algorithm).update(bufferFrom(message)).digest("hex");
          } else {
            return method(message);
          }
        };
        return nodeMethod;
      };
      var createHmacOutputMethod = function createHmacOutputMethod2(outputType, is224) {
        return function(key, message) {
          return new HmacSha256(key, is224, true).update(message)[outputType]();
        };
      };
      var createHmacMethod = function createHmacMethod2(is224) {
        var method = createHmacOutputMethod("hex", is224);
        method.create = function(key) {
          return new HmacSha256(key, is224);
        };
        method.update = function(key, message) {
          return method.create(key).update(message);
        };
        for (var i = 0; i < OUTPUT_TYPES.length; ++i) {
          var type = OUTPUT_TYPES[i];
          method[type] = createHmacOutputMethod(type, is224);
        }
        return method;
      };
      function Sha256(is224, sharedMemory) {
        if (sharedMemory) {
          blocks[0] = blocks[16] = blocks[1] = blocks[2] = blocks[3] = blocks[4] = blocks[5] = blocks[6] = blocks[7] = blocks[8] = blocks[9] = blocks[10] = blocks[11] = blocks[12] = blocks[13] = blocks[14] = blocks[15] = 0;
          this.blocks = blocks;
        } else {
          this.blocks = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        }
        if (is224) {
          this.h0 = 3238371032;
          this.h1 = 914150663;
          this.h2 = 812702999;
          this.h3 = 4144912697;
          this.h4 = 4290775857;
          this.h5 = 1750603025;
          this.h6 = 1694076839;
          this.h7 = 3204075428;
        } else {
          this.h0 = 1779033703;
          this.h1 = 3144134277;
          this.h2 = 1013904242;
          this.h3 = 2773480762;
          this.h4 = 1359893119;
          this.h5 = 2600822924;
          this.h6 = 528734635;
          this.h7 = 1541459225;
        }
        this.block = this.start = this.bytes = this.hBytes = 0;
        this.finalized = this.hashed = false;
        this.first = true;
        this.is224 = is224;
      }
      Sha256.prototype.update = function(message) {
        if (this.finalized) {
          return;
        }
        var notString, type = _typeof(message);
        if (type !== "string") {
          if (type === "object") {
            if (message === null) {
              throw new Error(ERROR);
            } else if (ARRAY_BUFFER && message.constructor === ArrayBuffer) {
              message = new Uint8Array(message);
            } else if (!Array.isArray(message)) {
              if (!ARRAY_BUFFER || !ArrayBuffer.isView(message)) {
                throw new Error(ERROR);
              }
            }
          } else {
            throw new Error(ERROR);
          }
          notString = true;
        }
        var code, index = 0, i, length = message.length, blocks2 = this.blocks;
        while (index < length) {
          if (this.hashed) {
            this.hashed = false;
            blocks2[0] = this.block;
            this.block = blocks2[16] = blocks2[1] = blocks2[2] = blocks2[3] = blocks2[4] = blocks2[5] = blocks2[6] = blocks2[7] = blocks2[8] = blocks2[9] = blocks2[10] = blocks2[11] = blocks2[12] = blocks2[13] = blocks2[14] = blocks2[15] = 0;
          }
          if (notString) {
            for (i = this.start; index < length && i < 64; ++index) {
              blocks2[i >>> 2] |= message[index] << SHIFT[i++ & 3];
            }
          } else {
            for (i = this.start; index < length && i < 64; ++index) {
              code = message.charCodeAt(index);
              if (code < 128) {
                blocks2[i >>> 2] |= code << SHIFT[i++ & 3];
              } else if (code < 2048) {
                blocks2[i >>> 2] |= (192 | code >>> 6) << SHIFT[i++ & 3];
                blocks2[i >>> 2] |= (128 | code & 63) << SHIFT[i++ & 3];
              } else if (code < 55296 || code >= 57344) {
                blocks2[i >>> 2] |= (224 | code >>> 12) << SHIFT[i++ & 3];
                blocks2[i >>> 2] |= (128 | code >>> 6 & 63) << SHIFT[i++ & 3];
                blocks2[i >>> 2] |= (128 | code & 63) << SHIFT[i++ & 3];
              } else {
                code = 65536 + ((code & 1023) << 10 | message.charCodeAt(++index) & 1023);
                blocks2[i >>> 2] |= (240 | code >>> 18) << SHIFT[i++ & 3];
                blocks2[i >>> 2] |= (128 | code >>> 12 & 63) << SHIFT[i++ & 3];
                blocks2[i >>> 2] |= (128 | code >>> 6 & 63) << SHIFT[i++ & 3];
                blocks2[i >>> 2] |= (128 | code & 63) << SHIFT[i++ & 3];
              }
            }
          }
          this.lastByteIndex = i;
          this.bytes += i - this.start;
          if (i >= 64) {
            this.block = blocks2[16];
            this.start = i - 64;
            this.hash();
            this.hashed = true;
          } else {
            this.start = i;
          }
        }
        if (this.bytes > 4294967295) {
          this.hBytes += this.bytes / 4294967296 << 0;
          this.bytes = this.bytes % 4294967296;
        }
        return this;
      };
      Sha256.prototype.finalize = function() {
        if (this.finalized) {
          return;
        }
        this.finalized = true;
        var blocks2 = this.blocks, i = this.lastByteIndex;
        blocks2[16] = this.block;
        blocks2[i >>> 2] |= EXTRA[i & 3];
        this.block = blocks2[16];
        if (i >= 56) {
          if (!this.hashed) {
            this.hash();
          }
          blocks2[0] = this.block;
          blocks2[16] = blocks2[1] = blocks2[2] = blocks2[3] = blocks2[4] = blocks2[5] = blocks2[6] = blocks2[7] = blocks2[8] = blocks2[9] = blocks2[10] = blocks2[11] = blocks2[12] = blocks2[13] = blocks2[14] = blocks2[15] = 0;
        }
        blocks2[14] = this.hBytes << 3 | this.bytes >>> 29;
        blocks2[15] = this.bytes << 3;
        this.hash();
      };
      Sha256.prototype.hash = function() {
        var a = this.h0, b = this.h1, c = this.h2, d = this.h3, e = this.h4, f = this.h5, g = this.h6, h = this.h7, blocks2 = this.blocks, j, s0, s1, maj, t1, t2, ch, ab, da, cd, bc;
        for (j = 16; j < 64; ++j) {
          t1 = blocks2[j - 15];
          s0 = (t1 >>> 7 | t1 << 25) ^ (t1 >>> 18 | t1 << 14) ^ t1 >>> 3;
          t1 = blocks2[j - 2];
          s1 = (t1 >>> 17 | t1 << 15) ^ (t1 >>> 19 | t1 << 13) ^ t1 >>> 10;
          blocks2[j] = blocks2[j - 16] + s0 + blocks2[j - 7] + s1 << 0;
        }
        bc = b & c;
        for (j = 0; j < 64; j += 4) {
          if (this.first) {
            if (this.is224) {
              ab = 300032;
              t1 = blocks2[0] - 1413257819;
              h = t1 - 150054599 << 0;
              d = t1 + 24177077 << 0;
            } else {
              ab = 704751109;
              t1 = blocks2[0] - 210244248;
              h = t1 - 1521486534 << 0;
              d = t1 + 143694565 << 0;
            }
            this.first = false;
          } else {
            s0 = (a >>> 2 | a << 30) ^ (a >>> 13 | a << 19) ^ (a >>> 22 | a << 10);
            s1 = (e >>> 6 | e << 26) ^ (e >>> 11 | e << 21) ^ (e >>> 25 | e << 7);
            ab = a & b;
            maj = ab ^ a & c ^ bc;
            ch = e & f ^ ~e & g;
            t1 = h + s1 + ch + K[j] + blocks2[j];
            t2 = s0 + maj;
            h = d + t1 << 0;
            d = t1 + t2 << 0;
          }
          s0 = (d >>> 2 | d << 30) ^ (d >>> 13 | d << 19) ^ (d >>> 22 | d << 10);
          s1 = (h >>> 6 | h << 26) ^ (h >>> 11 | h << 21) ^ (h >>> 25 | h << 7);
          da = d & a;
          maj = da ^ d & b ^ ab;
          ch = h & e ^ ~h & f;
          t1 = g + s1 + ch + K[j + 1] + blocks2[j + 1];
          t2 = s0 + maj;
          g = c + t1 << 0;
          c = t1 + t2 << 0;
          s0 = (c >>> 2 | c << 30) ^ (c >>> 13 | c << 19) ^ (c >>> 22 | c << 10);
          s1 = (g >>> 6 | g << 26) ^ (g >>> 11 | g << 21) ^ (g >>> 25 | g << 7);
          cd = c & d;
          maj = cd ^ c & a ^ da;
          ch = g & h ^ ~g & e;
          t1 = f + s1 + ch + K[j + 2] + blocks2[j + 2];
          t2 = s0 + maj;
          f = b + t1 << 0;
          b = t1 + t2 << 0;
          s0 = (b >>> 2 | b << 30) ^ (b >>> 13 | b << 19) ^ (b >>> 22 | b << 10);
          s1 = (f >>> 6 | f << 26) ^ (f >>> 11 | f << 21) ^ (f >>> 25 | f << 7);
          bc = b & c;
          maj = bc ^ b & d ^ cd;
          ch = f & g ^ ~f & h;
          t1 = e + s1 + ch + K[j + 3] + blocks2[j + 3];
          t2 = s0 + maj;
          e = a + t1 << 0;
          a = t1 + t2 << 0;
          this.chromeBugWorkAround = true;
        }
        this.h0 = this.h0 + a << 0;
        this.h1 = this.h1 + b << 0;
        this.h2 = this.h2 + c << 0;
        this.h3 = this.h3 + d << 0;
        this.h4 = this.h4 + e << 0;
        this.h5 = this.h5 + f << 0;
        this.h6 = this.h6 + g << 0;
        this.h7 = this.h7 + h << 0;
      };
      Sha256.prototype.hex = function() {
        this.finalize();
        var h0 = this.h0, h1 = this.h1, h2 = this.h2, h3 = this.h3, h4 = this.h4, h5 = this.h5, h6 = this.h6, h7 = this.h7;
        var hex = HEX_CHARS[h0 >>> 28 & 15] + HEX_CHARS[h0 >>> 24 & 15] + HEX_CHARS[h0 >>> 20 & 15] + HEX_CHARS[h0 >>> 16 & 15] + HEX_CHARS[h0 >>> 12 & 15] + HEX_CHARS[h0 >>> 8 & 15] + HEX_CHARS[h0 >>> 4 & 15] + HEX_CHARS[h0 & 15] + HEX_CHARS[h1 >>> 28 & 15] + HEX_CHARS[h1 >>> 24 & 15] + HEX_CHARS[h1 >>> 20 & 15] + HEX_CHARS[h1 >>> 16 & 15] + HEX_CHARS[h1 >>> 12 & 15] + HEX_CHARS[h1 >>> 8 & 15] + HEX_CHARS[h1 >>> 4 & 15] + HEX_CHARS[h1 & 15] + HEX_CHARS[h2 >>> 28 & 15] + HEX_CHARS[h2 >>> 24 & 15] + HEX_CHARS[h2 >>> 20 & 15] + HEX_CHARS[h2 >>> 16 & 15] + HEX_CHARS[h2 >>> 12 & 15] + HEX_CHARS[h2 >>> 8 & 15] + HEX_CHARS[h2 >>> 4 & 15] + HEX_CHARS[h2 & 15] + HEX_CHARS[h3 >>> 28 & 15] + HEX_CHARS[h3 >>> 24 & 15] + HEX_CHARS[h3 >>> 20 & 15] + HEX_CHARS[h3 >>> 16 & 15] + HEX_CHARS[h3 >>> 12 & 15] + HEX_CHARS[h3 >>> 8 & 15] + HEX_CHARS[h3 >>> 4 & 15] + HEX_CHARS[h3 & 15] + HEX_CHARS[h4 >>> 28 & 15] + HEX_CHARS[h4 >>> 24 & 15] + HEX_CHARS[h4 >>> 20 & 15] + HEX_CHARS[h4 >>> 16 & 15] + HEX_CHARS[h4 >>> 12 & 15] + HEX_CHARS[h4 >>> 8 & 15] + HEX_CHARS[h4 >>> 4 & 15] + HEX_CHARS[h4 & 15] + HEX_CHARS[h5 >>> 28 & 15] + HEX_CHARS[h5 >>> 24 & 15] + HEX_CHARS[h5 >>> 20 & 15] + HEX_CHARS[h5 >>> 16 & 15] + HEX_CHARS[h5 >>> 12 & 15] + HEX_CHARS[h5 >>> 8 & 15] + HEX_CHARS[h5 >>> 4 & 15] + HEX_CHARS[h5 & 15] + HEX_CHARS[h6 >>> 28 & 15] + HEX_CHARS[h6 >>> 24 & 15] + HEX_CHARS[h6 >>> 20 & 15] + HEX_CHARS[h6 >>> 16 & 15] + HEX_CHARS[h6 >>> 12 & 15] + HEX_CHARS[h6 >>> 8 & 15] + HEX_CHARS[h6 >>> 4 & 15] + HEX_CHARS[h6 & 15];
        if (!this.is224) {
          hex += HEX_CHARS[h7 >>> 28 & 15] + HEX_CHARS[h7 >>> 24 & 15] + HEX_CHARS[h7 >>> 20 & 15] + HEX_CHARS[h7 >>> 16 & 15] + HEX_CHARS[h7 >>> 12 & 15] + HEX_CHARS[h7 >>> 8 & 15] + HEX_CHARS[h7 >>> 4 & 15] + HEX_CHARS[h7 & 15];
        }
        return hex;
      };
      Sha256.prototype.toString = Sha256.prototype.hex;
      Sha256.prototype.digest = function() {
        this.finalize();
        var h0 = this.h0, h1 = this.h1, h2 = this.h2, h3 = this.h3, h4 = this.h4, h5 = this.h5, h6 = this.h6, h7 = this.h7;
        var arr = [h0 >>> 24 & 255, h0 >>> 16 & 255, h0 >>> 8 & 255, h0 & 255, h1 >>> 24 & 255, h1 >>> 16 & 255, h1 >>> 8 & 255, h1 & 255, h2 >>> 24 & 255, h2 >>> 16 & 255, h2 >>> 8 & 255, h2 & 255, h3 >>> 24 & 255, h3 >>> 16 & 255, h3 >>> 8 & 255, h3 & 255, h4 >>> 24 & 255, h4 >>> 16 & 255, h4 >>> 8 & 255, h4 & 255, h5 >>> 24 & 255, h5 >>> 16 & 255, h5 >>> 8 & 255, h5 & 255, h6 >>> 24 & 255, h6 >>> 16 & 255, h6 >>> 8 & 255, h6 & 255];
        if (!this.is224) {
          arr.push(h7 >>> 24 & 255, h7 >>> 16 & 255, h7 >>> 8 & 255, h7 & 255);
        }
        return arr;
      };
      Sha256.prototype.array = Sha256.prototype.digest;
      Sha256.prototype.arrayBuffer = function() {
        this.finalize();
        var buffer = new ArrayBuffer(this.is224 ? 28 : 32);
        var dataView = new DataView(buffer);
        dataView.setUint32(0, this.h0);
        dataView.setUint32(4, this.h1);
        dataView.setUint32(8, this.h2);
        dataView.setUint32(12, this.h3);
        dataView.setUint32(16, this.h4);
        dataView.setUint32(20, this.h5);
        dataView.setUint32(24, this.h6);
        if (!this.is224) {
          dataView.setUint32(28, this.h7);
        }
        return buffer;
      };
      function HmacSha256(key, is224, sharedMemory) {
        var i, type = _typeof(key);
        if (type === "string") {
          var bytes = [], length = key.length, index = 0, code;
          for (i = 0; i < length; ++i) {
            code = key.charCodeAt(i);
            if (code < 128) {
              bytes[index++] = code;
            } else if (code < 2048) {
              bytes[index++] = 192 | code >>> 6;
              bytes[index++] = 128 | code & 63;
            } else if (code < 55296 || code >= 57344) {
              bytes[index++] = 224 | code >>> 12;
              bytes[index++] = 128 | code >>> 6 & 63;
              bytes[index++] = 128 | code & 63;
            } else {
              code = 65536 + ((code & 1023) << 10 | key.charCodeAt(++i) & 1023);
              bytes[index++] = 240 | code >>> 18;
              bytes[index++] = 128 | code >>> 12 & 63;
              bytes[index++] = 128 | code >>> 6 & 63;
              bytes[index++] = 128 | code & 63;
            }
          }
          key = bytes;
        } else {
          if (type === "object") {
            if (key === null) {
              throw new Error(ERROR);
            } else if (ARRAY_BUFFER && key.constructor === ArrayBuffer) {
              key = new Uint8Array(key);
            } else if (!Array.isArray(key)) {
              if (!ARRAY_BUFFER || !ArrayBuffer.isView(key)) {
                throw new Error(ERROR);
              }
            }
          } else {
            throw new Error(ERROR);
          }
        }
        if (key.length > 64) {
          key = new Sha256(is224, true).update(key).array();
        }
        var oKeyPad = [], iKeyPad = [];
        for (i = 0; i < 64; ++i) {
          var b = key[i] || 0;
          oKeyPad[i] = 92 ^ b;
          iKeyPad[i] = 54 ^ b;
        }
        Sha256.call(this, is224, sharedMemory);
        this.update(iKeyPad);
        this.oKeyPad = oKeyPad;
        this.inner = true;
        this.sharedMemory = sharedMemory;
      }
      HmacSha256.prototype = new Sha256();
      HmacSha256.prototype.finalize = function() {
        Sha256.prototype.finalize.call(this);
        if (this.inner) {
          this.inner = false;
          var innerHash = this.array();
          Sha256.call(this, this.is224, this.sharedMemory);
          this.update(this.oKeyPad);
          this.update(innerHash);
          Sha256.prototype.finalize.call(this);
        }
      };
      var exports = createMethod();
      exports.sha256 = exports;
      exports.sha224 = createMethod(true);
      exports.sha256.hmac = createHmacMethod();
      exports.sha224.hmac = createHmacMethod(true);
      if (COMMON_JS) {
        module.exports = exports;
      } else {
        root.sha256 = exports.sha256;
        root.sha224 = exports.sha224;
      }
    })();
  })(sha256$1);
  return sha256$1.exports;
}
var sha256Exports = requireSha256();
const sha256 = /* @__PURE__ */ getDefaultExportFromCjs(sha256Exports);
var esm = {};
var hasRequiredEsm;
function requireEsm() {
  if (hasRequiredEsm) return esm;
  hasRequiredEsm = 1;
  function _typeof(o) {
    "@babel/helpers - typeof";
    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
      return typeof o2;
    } : function(o2) {
      return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
    }, _typeof(o);
  }
  Object.defineProperty(esm, "__esModule", {
    value: true
  });
  esm.InvalidTokenError = void 0;
  esm.jwtDecode = jwtDecode;
  function _createClass(e, r, t) {
    return Object.defineProperty(e, "prototype", { writable: false }), e;
  }
  function _classCallCheck(a, n) {
    if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function");
  }
  function _callSuper(t, o, e) {
    return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e));
  }
  function _possibleConstructorReturn(t, e) {
    if (e && ("object" == _typeof(e) || "function" == typeof e)) return e;
    if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined");
    return _assertThisInitialized(t);
  }
  function _assertThisInitialized(e) {
    if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return e;
  }
  function _inherits(t, e) {
    if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function");
    t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: true, configurable: true } }), Object.defineProperty(t, "prototype", { writable: false }), e && _setPrototypeOf(t, e);
  }
  function _wrapNativeSuper(t) {
    var r = "function" == typeof Map ? /* @__PURE__ */ new Map() : void 0;
    return _wrapNativeSuper = function _wrapNativeSuper2(t2) {
      if (null === t2 || !_isNativeFunction(t2)) return t2;
      if ("function" != typeof t2) throw new TypeError("Super expression must either be null or a function");
      if (void 0 !== r) {
        if (r.has(t2)) return r.get(t2);
        r.set(t2, Wrapper);
      }
      function Wrapper() {
        return _construct(t2, arguments, _getPrototypeOf(this).constructor);
      }
      return Wrapper.prototype = Object.create(t2.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }), _setPrototypeOf(Wrapper, t2);
    }, _wrapNativeSuper(t);
  }
  function _construct(t, e, r) {
    if (_isNativeReflectConstruct()) return Reflect.construct.apply(null, arguments);
    var o = [null];
    o.push.apply(o, e);
    var p = new (t.bind.apply(t, o))();
    return r && _setPrototypeOf(p, r.prototype), p;
  }
  function _isNativeReflectConstruct() {
    try {
      var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
      }));
    } catch (t2) {
    }
    return (_isNativeReflectConstruct = function _isNativeReflectConstruct2() {
      return !!t;
    })();
  }
  function _isNativeFunction(t) {
    try {
      return -1 !== Function.toString.call(t).indexOf("[native code]");
    } catch (n) {
      return "function" == typeof t;
    }
  }
  function _setPrototypeOf(t, e) {
    return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(t2, e2) {
      return t2.__proto__ = e2, t2;
    }, _setPrototypeOf(t, e);
  }
  function _getPrototypeOf(t) {
    return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(t2) {
      return t2.__proto__ || Object.getPrototypeOf(t2);
    }, _getPrototypeOf(t);
  }
  var InvalidTokenError = esm.InvalidTokenError = /* @__PURE__ */ function(_Error) {
    function InvalidTokenError2() {
      _classCallCheck(this, InvalidTokenError2);
      return _callSuper(this, InvalidTokenError2, arguments);
    }
    _inherits(InvalidTokenError2, _Error);
    return _createClass(InvalidTokenError2);
  }(/* @__PURE__ */ _wrapNativeSuper(Error));
  InvalidTokenError.prototype.name = "InvalidTokenError";
  function b64DecodeUnicode(str) {
    return decodeURIComponent(atob(str).replace(/(.)/g, function(m, p) {
      var code = p.charCodeAt(0).toString(16).toUpperCase();
      if (code.length < 2) {
        code = "0" + code;
      }
      return "%" + code;
    }));
  }
  function base64UrlDecode(str) {
    var output = str.replace(/-/g, "+").replace(/_/g, "/");
    switch (output.length % 4) {
      case 0:
        break;
      case 2:
        output += "==";
        break;
      case 3:
        output += "=";
        break;
      default:
        throw new Error("base64 string is not of the correct length");
    }
    try {
      return b64DecodeUnicode(output);
    } catch (err) {
      return atob(output);
    }
  }
  function jwtDecode(token, options) {
    if (typeof token !== "string") {
      throw new InvalidTokenError("Invalid token specified: must be a string");
    }
    options || (options = {});
    var pos = options.header === true ? 0 : 1;
    var part = token.split(".")[pos];
    if (typeof part !== "string") {
      throw new InvalidTokenError("Invalid token specified: missing part #".concat(pos + 1));
    }
    var decoded;
    try {
      decoded = base64UrlDecode(part);
    } catch (e) {
      throw new InvalidTokenError("Invalid token specified: invalid base64 for part #".concat(pos + 1, " (").concat(e.message, ")"));
    }
    try {
      return JSON.parse(decoded);
    } catch (e) {
      throw new InvalidTokenError("Invalid token specified: invalid json for part #".concat(pos + 1, " (").concat(e.message, ")"));
    }
  }
  return esm;
}
var esmExports = requireEsm();
if (typeof Promise === "undefined") {
  throw Error("Keycloak requires an environment that supports Promises. Make sure that you include the appropriate polyfill.");
}
function Keycloak(config) {
  if (!(this instanceof Keycloak)) {
    throw new Error("The 'Keycloak' constructor must be invoked with 'new'.");
  }
  var kc = this;
  var adapter;
  var refreshQueue = [];
  var callbackStorage;
  var loginIframe = {
    enable: true,
    callbackList: [],
    interval: 5
  };
  var scripts = document.getElementsByTagName("script");
  for (var i = 0; i < scripts.length; i++) {
    if ((scripts[i].src.indexOf("keycloak.js") !== -1 || scripts[i].src.indexOf("keycloak.min.js") !== -1) && scripts[i].src.indexOf("version=") !== -1) {
      kc.iframeVersion = scripts[i].src.substring(scripts[i].src.indexOf("version=") + 8).split("&")[0];
    }
  }
  var useNonce = true;
  var logInfo = createLogger(console.info);
  var logWarn = createLogger(console.warn);
  kc.init = function(initOptions) {
    if (kc.didInitialize) {
      throw new Error("A 'Keycloak' instance can only be initialized once.");
    }
    kc.didInitialize = true;
    kc.authenticated = false;
    callbackStorage = createCallbackStorage();
    var adapters = ["default", "cordova", "cordova-native"];
    if (initOptions && adapters.indexOf(initOptions.adapter) > -1) {
      adapter = loadAdapter(initOptions.adapter);
    } else if (initOptions && typeof initOptions.adapter === "object") {
      adapter = initOptions.adapter;
    } else {
      if (window.Cordova || window.cordova) {
        adapter = loadAdapter("cordova");
      } else {
        adapter = loadAdapter();
      }
    }
    if (initOptions) {
      if (typeof initOptions.useNonce !== "undefined") {
        useNonce = initOptions.useNonce;
      }
      if (typeof initOptions.checkLoginIframe !== "undefined") {
        loginIframe.enable = initOptions.checkLoginIframe;
      }
      if (initOptions.checkLoginIframeInterval) {
        loginIframe.interval = initOptions.checkLoginIframeInterval;
      }
      if (initOptions.onLoad === "login-required") {
        kc.loginRequired = true;
      }
      if (initOptions.responseMode) {
        if (initOptions.responseMode === "query" || initOptions.responseMode === "fragment") {
          kc.responseMode = initOptions.responseMode;
        } else {
          throw "Invalid value for responseMode";
        }
      }
      if (initOptions.flow) {
        switch (initOptions.flow) {
          case "standard":
            kc.responseType = "code";
            break;
          case "implicit":
            kc.responseType = "id_token token";
            break;
          case "hybrid":
            kc.responseType = "code id_token token";
            break;
          default:
            throw "Invalid value for flow";
        }
        kc.flow = initOptions.flow;
      }
      if (initOptions.timeSkew != null) {
        kc.timeSkew = initOptions.timeSkew;
      }
      if (initOptions.redirectUri) {
        kc.redirectUri = initOptions.redirectUri;
      }
      if (initOptions.silentCheckSsoRedirectUri) {
        kc.silentCheckSsoRedirectUri = initOptions.silentCheckSsoRedirectUri;
      }
      if (typeof initOptions.silentCheckSsoFallback === "boolean") {
        kc.silentCheckSsoFallback = initOptions.silentCheckSsoFallback;
      } else {
        kc.silentCheckSsoFallback = true;
      }
      if (initOptions.pkceMethod) {
        if (initOptions.pkceMethod !== "S256") {
          throw new TypeError(`Invalid value for 'pkceMethod', expected 'S256' but got '${initOptions.pkceMethod}'.`);
        }
        kc.pkceMethod = initOptions.pkceMethod;
      } else {
        kc.pkceMethod = "S256";
      }
      if (typeof initOptions.enableLogging === "boolean") {
        kc.enableLogging = initOptions.enableLogging;
      } else {
        kc.enableLogging = false;
      }
      if (initOptions.logoutMethod === "POST") {
        kc.logoutMethod = "POST";
      } else {
        kc.logoutMethod = "GET";
      }
      if (typeof initOptions.scope === "string") {
        kc.scope = initOptions.scope;
      }
      if (typeof initOptions.acrValues === "string") {
        kc.acrValues = initOptions.acrValues;
      }
      if (typeof initOptions.messageReceiveTimeout === "number" && initOptions.messageReceiveTimeout > 0) {
        kc.messageReceiveTimeout = initOptions.messageReceiveTimeout;
      } else {
        kc.messageReceiveTimeout = 1e4;
      }
    }
    if (!kc.responseMode) {
      kc.responseMode = "fragment";
    }
    if (!kc.responseType) {
      kc.responseType = "code";
      kc.flow = "standard";
    }
    var promise = createPromise();
    var initPromise = createPromise();
    initPromise.promise.then(function() {
      kc.onReady && kc.onReady(kc.authenticated);
      promise.setSuccess(kc.authenticated);
    }).catch(function(error) {
      promise.setError(error);
    });
    var configPromise = loadConfig();
    function onLoad() {
      var doLogin = function(prompt) {
        if (!prompt) {
          options.prompt = "none";
        }
        if (initOptions && initOptions.locale) {
          options.locale = initOptions.locale;
        }
        kc.login(options).then(function() {
          initPromise.setSuccess();
        }).catch(function(error) {
          initPromise.setError(error);
        });
      };
      var checkSsoSilently = function() {
        var ifrm = document.createElement("iframe");
        var src = kc.createLoginUrl({ prompt: "none", redirectUri: kc.silentCheckSsoRedirectUri });
        ifrm.setAttribute("src", src);
        ifrm.setAttribute("sandbox", "allow-storage-access-by-user-activation allow-scripts allow-same-origin");
        ifrm.setAttribute("title", "keycloak-silent-check-sso");
        ifrm.style.display = "none";
        document.body.appendChild(ifrm);
        var messageCallback = function(event) {
          if (event.origin !== window.location.origin || ifrm.contentWindow !== event.source) {
            return;
          }
          var oauth = parseCallback(event.data);
          processCallback(oauth, initPromise);
          document.body.removeChild(ifrm);
          window.removeEventListener("message", messageCallback);
        };
        window.addEventListener("message", messageCallback);
      };
      var options = {};
      switch (initOptions.onLoad) {
        case "check-sso":
          if (loginIframe.enable) {
            setupCheckLoginIframe().then(function() {
              checkLoginIframe().then(function(unchanged) {
                if (!unchanged) {
                  kc.silentCheckSsoRedirectUri ? checkSsoSilently() : doLogin(false);
                } else {
                  initPromise.setSuccess();
                }
              }).catch(function(error) {
                initPromise.setError(error);
              });
            });
          } else {
            kc.silentCheckSsoRedirectUri ? checkSsoSilently() : doLogin(false);
          }
          break;
        case "login-required":
          doLogin(true);
          break;
        default:
          throw "Invalid value for onLoad";
      }
    }
    function processInit() {
      var callback = parseCallback(window.location.href);
      if (callback) {
        window.history.replaceState(window.history.state, null, callback.newUrl);
      }
      if (callback && callback.valid) {
        return setupCheckLoginIframe().then(function() {
          processCallback(callback, initPromise);
        }).catch(function(error) {
          initPromise.setError(error);
        });
      } else if (initOptions) {
        if (initOptions.token && initOptions.refreshToken) {
          setToken(initOptions.token, initOptions.refreshToken, initOptions.idToken);
          if (loginIframe.enable) {
            setupCheckLoginIframe().then(function() {
              checkLoginIframe().then(function(unchanged) {
                if (unchanged) {
                  kc.onAuthSuccess && kc.onAuthSuccess();
                  initPromise.setSuccess();
                  scheduleCheckIframe();
                } else {
                  initPromise.setSuccess();
                }
              }).catch(function(error) {
                initPromise.setError(error);
              });
            });
          } else {
            kc.updateToken(-1).then(function() {
              kc.onAuthSuccess && kc.onAuthSuccess();
              initPromise.setSuccess();
            }).catch(function(error) {
              kc.onAuthError && kc.onAuthError();
              if (initOptions.onLoad) {
                onLoad();
              } else {
                initPromise.setError(error);
              }
            });
          }
        } else if (initOptions.onLoad) {
          onLoad();
        } else {
          initPromise.setSuccess();
        }
      } else {
        initPromise.setSuccess();
      }
    }
    function domReady() {
      var promise2 = createPromise();
      var checkReadyState = function() {
        if (document.readyState === "interactive" || document.readyState === "complete") {
          document.removeEventListener("readystatechange", checkReadyState);
          promise2.setSuccess();
        }
      };
      document.addEventListener("readystatechange", checkReadyState);
      checkReadyState();
      return promise2.promise;
    }
    configPromise.then(function() {
      domReady().then(check3pCookiesSupported).then(processInit).catch(function(error) {
        promise.setError(error);
      });
    });
    configPromise.catch(function(error) {
      promise.setError(error);
    });
    return promise.promise;
  };
  kc.login = function(options) {
    return adapter.login(options);
  };
  function generateRandomData(len) {
    var array = null;
    var crypto = window.crypto || window.msCrypto;
    if (crypto && crypto.getRandomValues && window.Uint8Array) {
      array = new Uint8Array(len);
      crypto.getRandomValues(array);
      return array;
    }
    array = new Array(len);
    for (var j = 0; j < array.length; j++) {
      array[j] = Math.floor(256 * Math.random());
    }
    return array;
  }
  function generateCodeVerifier(len) {
    return generateRandomString(len, "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789");
  }
  function generateRandomString(len, alphabet) {
    var randomData = generateRandomData(len);
    var chars = new Array(len);
    for (var i2 = 0; i2 < len; i2++) {
      chars[i2] = alphabet.charCodeAt(randomData[i2] % alphabet.length);
    }
    return String.fromCharCode.apply(null, chars);
  }
  function generatePkceChallenge(pkceMethod, codeVerifier) {
    if (pkceMethod !== "S256") {
      throw new TypeError(`Invalid value for 'pkceMethod', expected 'S256' but got '${pkceMethod}'.`);
    }
    const hashBytes = new Uint8Array(sha256.arrayBuffer(codeVerifier));
    const encodedHash = bytesToBase64(hashBytes).replace(/\+/g, "-").replace(/\//g, "_").replace(/\=/g, "");
    return encodedHash;
  }
  function buildClaimsParameter(requestedAcr) {
    var claims = {
      id_token: {
        acr: requestedAcr
      }
    };
    return JSON.stringify(claims);
  }
  kc.createLoginUrl = function(options) {
    var state = createUUID();
    var nonce = createUUID();
    var redirectUri = adapter.redirectUri(options);
    var callbackState = {
      state,
      nonce,
      redirectUri: encodeURIComponent(redirectUri)
    };
    if (options && options.prompt) {
      callbackState.prompt = options.prompt;
    }
    var baseUrl2;
    if (options && options.action == "register") {
      baseUrl2 = kc.endpoints.register();
    } else {
      baseUrl2 = kc.endpoints.authorize();
    }
    var scope = options && options.scope || kc.scope;
    if (!scope) {
      scope = "openid";
    } else if (scope.indexOf("openid") === -1) {
      scope = "openid " + scope;
    }
    var url = baseUrl2 + "?client_id=" + encodeURIComponent(kc.clientId) + "&redirect_uri=" + encodeURIComponent(redirectUri) + "&state=" + encodeURIComponent(state) + "&response_mode=" + encodeURIComponent(kc.responseMode) + "&response_type=" + encodeURIComponent(kc.responseType) + "&scope=" + encodeURIComponent(scope);
    if (useNonce) {
      url = url + "&nonce=" + encodeURIComponent(nonce);
    }
    if (options && options.prompt) {
      url += "&prompt=" + encodeURIComponent(options.prompt);
    }
    if (options && options.maxAge) {
      url += "&max_age=" + encodeURIComponent(options.maxAge);
    }
    if (options && options.loginHint) {
      url += "&login_hint=" + encodeURIComponent(options.loginHint);
    }
    if (options && options.idpHint) {
      url += "&kc_idp_hint=" + encodeURIComponent(options.idpHint);
    }
    if (options && options.action && options.action != "register") {
      url += "&kc_action=" + encodeURIComponent(options.action);
    }
    if (options && options.locale) {
      url += "&ui_locales=" + encodeURIComponent(options.locale);
    }
    if (options && options.acr) {
      var claimsParameter = buildClaimsParameter(options.acr);
      url += "&claims=" + encodeURIComponent(claimsParameter);
    }
    if (options && options.acrValues || kc.acrValues) {
      url += "&acr_values=" + encodeURIComponent(options.acrValues || kc.acrValues);
    }
    if (kc.pkceMethod) {
      var codeVerifier = generateCodeVerifier(96);
      callbackState.pkceCodeVerifier = codeVerifier;
      var pkceChallenge = generatePkceChallenge(kc.pkceMethod, codeVerifier);
      url += "&code_challenge=" + pkceChallenge;
      url += "&code_challenge_method=" + kc.pkceMethod;
    }
    callbackStorage.add(callbackState);
    return url;
  };
  kc.logout = function(options) {
    return adapter.logout(options);
  };
  kc.createLogoutUrl = function(options) {
    const logoutMethod = (options == null ? void 0 : options.logoutMethod) ?? kc.logoutMethod;
    if (logoutMethod === "POST") {
      return kc.endpoints.logout();
    }
    var url = kc.endpoints.logout() + "?client_id=" + encodeURIComponent(kc.clientId) + "&post_logout_redirect_uri=" + encodeURIComponent(adapter.redirectUri(options, false));
    if (kc.idToken) {
      url += "&id_token_hint=" + encodeURIComponent(kc.idToken);
    }
    return url;
  };
  kc.register = function(options) {
    return adapter.register(options);
  };
  kc.createRegisterUrl = function(options) {
    if (!options) {
      options = {};
    }
    options.action = "register";
    return kc.createLoginUrl(options);
  };
  kc.createAccountUrl = function(options) {
    var realm = getRealmUrl();
    var url = void 0;
    if (typeof realm !== "undefined") {
      url = realm + "/account?referrer=" + encodeURIComponent(kc.clientId) + "&referrer_uri=" + encodeURIComponent(adapter.redirectUri(options));
    }
    return url;
  };
  kc.accountManagement = function() {
    return adapter.accountManagement();
  };
  kc.hasRealmRole = function(role) {
    var access = kc.realmAccess;
    return !!access && access.roles.indexOf(role) >= 0;
  };
  kc.hasResourceRole = function(role, resource) {
    if (!kc.resourceAccess) {
      return false;
    }
    var access = kc.resourceAccess[resource || kc.clientId];
    return !!access && access.roles.indexOf(role) >= 0;
  };
  kc.loadUserProfile = function() {
    var url = getRealmUrl() + "/account";
    var req = new XMLHttpRequest();
    req.open("GET", url, true);
    req.setRequestHeader("Accept", "application/json");
    req.setRequestHeader("Authorization", "bearer " + kc.token);
    var promise = createPromise();
    req.onreadystatechange = function() {
      if (req.readyState == 4) {
        if (req.status == 200) {
          kc.profile = JSON.parse(req.responseText);
          promise.setSuccess(kc.profile);
        } else {
          promise.setError();
        }
      }
    };
    req.send();
    return promise.promise;
  };
  kc.loadUserInfo = function() {
    var url = kc.endpoints.userinfo();
    var req = new XMLHttpRequest();
    req.open("GET", url, true);
    req.setRequestHeader("Accept", "application/json");
    req.setRequestHeader("Authorization", "bearer " + kc.token);
    var promise = createPromise();
    req.onreadystatechange = function() {
      if (req.readyState == 4) {
        if (req.status == 200) {
          kc.userInfo = JSON.parse(req.responseText);
          promise.setSuccess(kc.userInfo);
        } else {
          promise.setError();
        }
      }
    };
    req.send();
    return promise.promise;
  };
  kc.isTokenExpired = function(minValidity) {
    if (!kc.tokenParsed || !kc.refreshToken && kc.flow != "implicit") {
      throw "Not authenticated";
    }
    if (kc.timeSkew == null) {
      logInfo("[KEYCLOAK] Unable to determine if token is expired as timeskew is not set");
      return true;
    }
    var expiresIn = kc.tokenParsed["exp"] - Math.ceil((/* @__PURE__ */ new Date()).getTime() / 1e3) + kc.timeSkew;
    if (minValidity) {
      if (isNaN(minValidity)) {
        throw "Invalid minValidity";
      }
      expiresIn -= minValidity;
    }
    return expiresIn < 0;
  };
  kc.updateToken = function(minValidity) {
    var promise = createPromise();
    if (!kc.refreshToken) {
      promise.setError();
      return promise.promise;
    }
    minValidity = minValidity || 5;
    var exec = function() {
      var refreshToken = false;
      if (minValidity == -1) {
        refreshToken = true;
        logInfo("[KEYCLOAK] Refreshing token: forced refresh");
      } else if (!kc.tokenParsed || kc.isTokenExpired(minValidity)) {
        refreshToken = true;
        logInfo("[KEYCLOAK] Refreshing token: token expired");
      }
      if (!refreshToken) {
        promise.setSuccess(false);
      } else {
        var params = "grant_type=refresh_token&refresh_token=" + kc.refreshToken;
        var url = kc.endpoints.token();
        refreshQueue.push(promise);
        if (refreshQueue.length == 1) {
          var req = new XMLHttpRequest();
          req.open("POST", url, true);
          req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
          req.withCredentials = true;
          params += "&client_id=" + encodeURIComponent(kc.clientId);
          var timeLocal = (/* @__PURE__ */ new Date()).getTime();
          req.onreadystatechange = function() {
            if (req.readyState == 4) {
              if (req.status == 200) {
                logInfo("[KEYCLOAK] Token refreshed");
                timeLocal = (timeLocal + (/* @__PURE__ */ new Date()).getTime()) / 2;
                var tokenResponse = JSON.parse(req.responseText);
                setToken(tokenResponse["access_token"], tokenResponse["refresh_token"], tokenResponse["id_token"], timeLocal);
                kc.onAuthRefreshSuccess && kc.onAuthRefreshSuccess();
                for (var p = refreshQueue.pop(); p != null; p = refreshQueue.pop()) {
                  p.setSuccess(true);
                }
              } else {
                logWarn("[KEYCLOAK] Failed to refresh token");
                if (req.status == 400) {
                  kc.clearToken();
                }
                kc.onAuthRefreshError && kc.onAuthRefreshError();
                for (var p = refreshQueue.pop(); p != null; p = refreshQueue.pop()) {
                  p.setError(true);
                }
              }
            }
          };
          req.send(params);
        }
      }
    };
    if (loginIframe.enable) {
      var iframePromise = checkLoginIframe();
      iframePromise.then(function() {
        exec();
      }).catch(function(error) {
        promise.setError(error);
      });
    } else {
      exec();
    }
    return promise.promise;
  };
  kc.clearToken = function() {
    if (kc.token) {
      setToken(null, null, null);
      kc.onAuthLogout && kc.onAuthLogout();
      if (kc.loginRequired) {
        kc.login();
      }
    }
  };
  function getRealmUrl() {
    if (typeof kc.authServerUrl !== "undefined") {
      if (kc.authServerUrl.charAt(kc.authServerUrl.length - 1) == "/") {
        return kc.authServerUrl + "realms/" + encodeURIComponent(kc.realm);
      } else {
        return kc.authServerUrl + "/realms/" + encodeURIComponent(kc.realm);
      }
    } else {
      return void 0;
    }
  }
  function getOrigin() {
    if (!window.location.origin) {
      return window.location.protocol + "//" + window.location.hostname + (window.location.port ? ":" + window.location.port : "");
    } else {
      return window.location.origin;
    }
  }
  function processCallback(oauth, promise) {
    var code = oauth.code;
    var error = oauth.error;
    var prompt = oauth.prompt;
    var timeLocal = (/* @__PURE__ */ new Date()).getTime();
    if (oauth["kc_action_status"]) {
      kc.onActionUpdate && kc.onActionUpdate(oauth["kc_action_status"]);
    }
    if (error) {
      if (prompt != "none") {
        var errorData = { error, error_description: oauth.error_description };
        kc.onAuthError && kc.onAuthError(errorData);
        promise && promise.setError(errorData);
      } else {
        promise && promise.setSuccess();
      }
      return;
    } else if (kc.flow != "standard" && (oauth.access_token || oauth.id_token)) {
      authSuccess(oauth.access_token, null, oauth.id_token, true);
    }
    if (kc.flow != "implicit" && code) {
      var params = "code=" + code + "&grant_type=authorization_code";
      var url = kc.endpoints.token();
      var req = new XMLHttpRequest();
      req.open("POST", url, true);
      req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
      params += "&client_id=" + encodeURIComponent(kc.clientId);
      params += "&redirect_uri=" + oauth.redirectUri;
      if (oauth.pkceCodeVerifier) {
        params += "&code_verifier=" + oauth.pkceCodeVerifier;
      }
      req.withCredentials = true;
      req.onreadystatechange = function() {
        if (req.readyState == 4) {
          if (req.status == 200) {
            var tokenResponse = JSON.parse(req.responseText);
            authSuccess(tokenResponse["access_token"], tokenResponse["refresh_token"], tokenResponse["id_token"], kc.flow === "standard");
            scheduleCheckIframe();
          } else {
            kc.onAuthError && kc.onAuthError();
            promise && promise.setError();
          }
        }
      };
      req.send(params);
    }
    function authSuccess(accessToken, refreshToken, idToken, fulfillPromise) {
      timeLocal = (timeLocal + (/* @__PURE__ */ new Date()).getTime()) / 2;
      setToken(accessToken, refreshToken, idToken, timeLocal);
      if (useNonce && (kc.idTokenParsed && kc.idTokenParsed.nonce != oauth.storedNonce)) {
        logInfo("[KEYCLOAK] Invalid nonce, clearing token");
        kc.clearToken();
        promise && promise.setError();
      } else {
        if (fulfillPromise) {
          kc.onAuthSuccess && kc.onAuthSuccess();
          promise && promise.setSuccess();
        }
      }
    }
  }
  function loadConfig(url) {
    var promise = createPromise();
    var configUrl;
    if (!config) {
      configUrl = "keycloak.json";
    } else if (typeof config === "string") {
      configUrl = config;
    }
    function setupOidcEndoints(oidcConfiguration) {
      if (!oidcConfiguration) {
        kc.endpoints = {
          authorize: function() {
            return getRealmUrl() + "/protocol/openid-connect/auth";
          },
          token: function() {
            return getRealmUrl() + "/protocol/openid-connect/token";
          },
          logout: function() {
            return getRealmUrl() + "/protocol/openid-connect/logout";
          },
          checkSessionIframe: function() {
            var src = getRealmUrl() + "/protocol/openid-connect/login-status-iframe.html";
            if (kc.iframeVersion) {
              src = src + "?version=" + kc.iframeVersion;
            }
            return src;
          },
          thirdPartyCookiesIframe: function() {
            var src = getRealmUrl() + "/protocol/openid-connect/3p-cookies/step1.html";
            if (kc.iframeVersion) {
              src = src + "?version=" + kc.iframeVersion;
            }
            return src;
          },
          register: function() {
            return getRealmUrl() + "/protocol/openid-connect/registrations";
          },
          userinfo: function() {
            return getRealmUrl() + "/protocol/openid-connect/userinfo";
          }
        };
      } else {
        kc.endpoints = {
          authorize: function() {
            return oidcConfiguration.authorization_endpoint;
          },
          token: function() {
            return oidcConfiguration.token_endpoint;
          },
          logout: function() {
            if (!oidcConfiguration.end_session_endpoint) {
              throw "Not supported by the OIDC server";
            }
            return oidcConfiguration.end_session_endpoint;
          },
          checkSessionIframe: function() {
            if (!oidcConfiguration.check_session_iframe) {
              throw "Not supported by the OIDC server";
            }
            return oidcConfiguration.check_session_iframe;
          },
          register: function() {
            throw 'Redirection to "Register user" page not supported in standard OIDC mode';
          },
          userinfo: function() {
            if (!oidcConfiguration.userinfo_endpoint) {
              throw "Not supported by the OIDC server";
            }
            return oidcConfiguration.userinfo_endpoint;
          }
        };
      }
    }
    if (configUrl) {
      var req = new XMLHttpRequest();
      req.open("GET", configUrl, true);
      req.setRequestHeader("Accept", "application/json");
      req.onreadystatechange = function() {
        if (req.readyState == 4) {
          if (req.status == 200 || fileLoaded(req)) {
            var config2 = JSON.parse(req.responseText);
            kc.authServerUrl = config2["auth-server-url"];
            kc.realm = config2["realm"];
            kc.clientId = config2["resource"];
            setupOidcEndoints(null);
            promise.setSuccess();
          } else {
            promise.setError();
          }
        }
      };
      req.send();
    } else {
      if (!config.clientId) {
        throw "clientId missing";
      }
      kc.clientId = config.clientId;
      var oidcProvider = config["oidcProvider"];
      if (!oidcProvider) {
        if (!config["url"]) {
          var scripts2 = document.getElementsByTagName("script");
          for (var i2 = 0; i2 < scripts2.length; i2++) {
            if (scripts2[i2].src.match(/.*keycloak\.js/)) {
              config.url = scripts2[i2].src.substr(0, scripts2[i2].src.indexOf("/js/keycloak.js"));
              break;
            }
          }
        }
        if (!config.realm) {
          throw "realm missing";
        }
        kc.authServerUrl = config.url;
        kc.realm = config.realm;
        setupOidcEndoints(null);
        promise.setSuccess();
      } else {
        if (typeof oidcProvider === "string") {
          var oidcProviderConfigUrl;
          if (oidcProvider.charAt(oidcProvider.length - 1) == "/") {
            oidcProviderConfigUrl = oidcProvider + ".well-known/openid-configuration";
          } else {
            oidcProviderConfigUrl = oidcProvider + "/.well-known/openid-configuration";
          }
          var req = new XMLHttpRequest();
          req.open("GET", oidcProviderConfigUrl, true);
          req.setRequestHeader("Accept", "application/json");
          req.onreadystatechange = function() {
            if (req.readyState == 4) {
              if (req.status == 200 || fileLoaded(req)) {
                var oidcProviderConfig = JSON.parse(req.responseText);
                setupOidcEndoints(oidcProviderConfig);
                promise.setSuccess();
              } else {
                promise.setError();
              }
            }
          };
          req.send();
        } else {
          setupOidcEndoints(oidcProvider);
          promise.setSuccess();
        }
      }
    }
    return promise.promise;
  }
  function fileLoaded(xhr) {
    return xhr.status == 0 && xhr.responseText && xhr.responseURL.startsWith("file:");
  }
  function setToken(token, refreshToken, idToken, timeLocal) {
    if (kc.tokenTimeoutHandle) {
      clearTimeout(kc.tokenTimeoutHandle);
      kc.tokenTimeoutHandle = null;
    }
    if (refreshToken) {
      kc.refreshToken = refreshToken;
      kc.refreshTokenParsed = esmExports.jwtDecode(refreshToken);
    } else {
      delete kc.refreshToken;
      delete kc.refreshTokenParsed;
    }
    if (idToken) {
      kc.idToken = idToken;
      kc.idTokenParsed = esmExports.jwtDecode(idToken);
    } else {
      delete kc.idToken;
      delete kc.idTokenParsed;
    }
    if (token) {
      kc.token = token;
      kc.tokenParsed = esmExports.jwtDecode(token);
      kc.sessionId = kc.tokenParsed.session_state;
      kc.authenticated = true;
      kc.subject = kc.tokenParsed.sub;
      kc.realmAccess = kc.tokenParsed.realm_access;
      kc.resourceAccess = kc.tokenParsed.resource_access;
      if (timeLocal) {
        kc.timeSkew = Math.floor(timeLocal / 1e3) - kc.tokenParsed.iat;
      }
      if (kc.timeSkew != null) {
        logInfo("[KEYCLOAK] Estimated time difference between browser and server is " + kc.timeSkew + " seconds");
        if (kc.onTokenExpired) {
          var expiresIn = (kc.tokenParsed["exp"] - (/* @__PURE__ */ new Date()).getTime() / 1e3 + kc.timeSkew) * 1e3;
          logInfo("[KEYCLOAK] Token expires in " + Math.round(expiresIn / 1e3) + " s");
          if (expiresIn <= 0) {
            kc.onTokenExpired();
          } else {
            kc.tokenTimeoutHandle = setTimeout(kc.onTokenExpired, expiresIn);
          }
        }
      }
    } else {
      delete kc.token;
      delete kc.tokenParsed;
      delete kc.subject;
      delete kc.realmAccess;
      delete kc.resourceAccess;
      kc.authenticated = false;
    }
  }
  function createUUID() {
    var hexDigits = "0123456789abcdef";
    var s = generateRandomString(36, hexDigits).split("");
    s[14] = "4";
    s[19] = hexDigits.substr(s[19] & 3 | 8, 1);
    s[8] = s[13] = s[18] = s[23] = "-";
    var uuid = s.join("");
    return uuid;
  }
  function parseCallback(url) {
    var oauth = parseCallbackUrl(url);
    if (!oauth) {
      return;
    }
    var oauthState = callbackStorage.get(oauth.state);
    if (oauthState) {
      oauth.valid = true;
      oauth.redirectUri = oauthState.redirectUri;
      oauth.storedNonce = oauthState.nonce;
      oauth.prompt = oauthState.prompt;
      oauth.pkceCodeVerifier = oauthState.pkceCodeVerifier;
    }
    return oauth;
  }
  function parseCallbackUrl(url) {
    var supportedParams;
    switch (kc.flow) {
      case "standard":
        supportedParams = ["code", "state", "session_state", "kc_action_status", "iss"];
        break;
      case "implicit":
        supportedParams = ["access_token", "token_type", "id_token", "state", "session_state", "expires_in", "kc_action_status", "iss"];
        break;
      case "hybrid":
        supportedParams = ["access_token", "token_type", "id_token", "code", "state", "session_state", "expires_in", "kc_action_status", "iss"];
        break;
    }
    supportedParams.push("error");
    supportedParams.push("error_description");
    supportedParams.push("error_uri");
    var queryIndex = url.indexOf("?");
    var fragmentIndex = url.indexOf("#");
    var newUrl;
    var parsed;
    if (kc.responseMode === "query" && queryIndex !== -1) {
      newUrl = url.substring(0, queryIndex);
      parsed = parseCallbackParams(url.substring(queryIndex + 1, fragmentIndex !== -1 ? fragmentIndex : url.length), supportedParams);
      if (parsed.paramsString !== "") {
        newUrl += "?" + parsed.paramsString;
      }
      if (fragmentIndex !== -1) {
        newUrl += url.substring(fragmentIndex);
      }
    } else if (kc.responseMode === "fragment" && fragmentIndex !== -1) {
      newUrl = url.substring(0, fragmentIndex);
      parsed = parseCallbackParams(url.substring(fragmentIndex + 1), supportedParams);
      if (parsed.paramsString !== "") {
        newUrl += "#" + parsed.paramsString;
      }
    }
    if (parsed && parsed.oauthParams) {
      if (kc.flow === "standard" || kc.flow === "hybrid") {
        if ((parsed.oauthParams.code || parsed.oauthParams.error) && parsed.oauthParams.state) {
          parsed.oauthParams.newUrl = newUrl;
          return parsed.oauthParams;
        }
      } else if (kc.flow === "implicit") {
        if ((parsed.oauthParams.access_token || parsed.oauthParams.error) && parsed.oauthParams.state) {
          parsed.oauthParams.newUrl = newUrl;
          return parsed.oauthParams;
        }
      }
    }
  }
  function parseCallbackParams(paramsString, supportedParams) {
    var p = paramsString.split("&");
    var result = {
      paramsString: "",
      oauthParams: {}
    };
    for (var i2 = 0; i2 < p.length; i2++) {
      var split = p[i2].indexOf("=");
      var key = p[i2].slice(0, split);
      if (supportedParams.indexOf(key) !== -1) {
        result.oauthParams[key] = p[i2].slice(split + 1);
      } else {
        if (result.paramsString !== "") {
          result.paramsString += "&";
        }
        result.paramsString += p[i2];
      }
    }
    return result;
  }
  function createPromise() {
    var p = {
      setSuccess: function(result) {
        p.resolve(result);
      },
      setError: function(result) {
        p.reject(result);
      }
    };
    p.promise = new Promise(function(resolve, reject) {
      p.resolve = resolve;
      p.reject = reject;
    });
    return p;
  }
  function applyTimeoutToPromise(promise, timeout, errorMessage) {
    var timeoutHandle = null;
    var timeoutPromise = new Promise(function(resolve, reject) {
      timeoutHandle = setTimeout(function() {
        reject({ "error": errorMessage });
      }, timeout);
    });
    return Promise.race([promise, timeoutPromise]).finally(function() {
      clearTimeout(timeoutHandle);
    });
  }
  function setupCheckLoginIframe() {
    var promise = createPromise();
    if (!loginIframe.enable) {
      promise.setSuccess();
      return promise.promise;
    }
    if (loginIframe.iframe) {
      promise.setSuccess();
      return promise.promise;
    }
    var iframe = document.createElement("iframe");
    loginIframe.iframe = iframe;
    iframe.onload = function() {
      var authUrl = kc.endpoints.authorize();
      if (authUrl.charAt(0) === "/") {
        loginIframe.iframeOrigin = getOrigin();
      } else {
        loginIframe.iframeOrigin = authUrl.substring(0, authUrl.indexOf("/", 8));
      }
      promise.setSuccess();
    };
    var src = kc.endpoints.checkSessionIframe();
    iframe.setAttribute("src", src);
    iframe.setAttribute("sandbox", "allow-storage-access-by-user-activation allow-scripts allow-same-origin");
    iframe.setAttribute("title", "keycloak-session-iframe");
    iframe.style.display = "none";
    document.body.appendChild(iframe);
    var messageCallback = function(event) {
      if (event.origin !== loginIframe.iframeOrigin || loginIframe.iframe.contentWindow !== event.source) {
        return;
      }
      if (!(event.data == "unchanged" || event.data == "changed" || event.data == "error")) {
        return;
      }
      if (event.data != "unchanged") {
        kc.clearToken();
      }
      var callbacks = loginIframe.callbackList.splice(0, loginIframe.callbackList.length);
      for (var i2 = callbacks.length - 1; i2 >= 0; --i2) {
        var promise2 = callbacks[i2];
        if (event.data == "error") {
          promise2.setError();
        } else {
          promise2.setSuccess(event.data == "unchanged");
        }
      }
    };
    window.addEventListener("message", messageCallback, false);
    return promise.promise;
  }
  function scheduleCheckIframe() {
    if (loginIframe.enable) {
      if (kc.token) {
        setTimeout(function() {
          checkLoginIframe().then(function(unchanged) {
            if (unchanged) {
              scheduleCheckIframe();
            }
          });
        }, loginIframe.interval * 1e3);
      }
    }
  }
  function checkLoginIframe() {
    var promise = createPromise();
    if (loginIframe.iframe && loginIframe.iframeOrigin) {
      var msg = kc.clientId + " " + (kc.sessionId ? kc.sessionId : "");
      loginIframe.callbackList.push(promise);
      var origin = loginIframe.iframeOrigin;
      if (loginIframe.callbackList.length == 1) {
        loginIframe.iframe.contentWindow.postMessage(msg, origin);
      }
    } else {
      promise.setSuccess();
    }
    return promise.promise;
  }
  function check3pCookiesSupported() {
    var promise = createPromise();
    if (loginIframe.enable || kc.silentCheckSsoRedirectUri) {
      var iframe = document.createElement("iframe");
      iframe.setAttribute("src", kc.endpoints.thirdPartyCookiesIframe());
      iframe.setAttribute("sandbox", "allow-storage-access-by-user-activation allow-scripts allow-same-origin");
      iframe.setAttribute("title", "keycloak-3p-check-iframe");
      iframe.style.display = "none";
      document.body.appendChild(iframe);
      var messageCallback = function(event) {
        if (iframe.contentWindow !== event.source) {
          return;
        }
        if (event.data !== "supported" && event.data !== "unsupported") {
          return;
        } else if (event.data === "unsupported") {
          logWarn(
            "[KEYCLOAK] Your browser is blocking access to 3rd-party cookies, this means:\n\n - It is not possible to retrieve tokens without redirecting to the Keycloak server (a.k.a. no support for silent authentication).\n - It is not possible to automatically detect changes to the session status (such as the user logging out in another tab).\n\nFor more information see: https://www.keycloak.org/docs/latest/securing_apps/#_modern_browsers"
          );
          loginIframe.enable = false;
          if (kc.silentCheckSsoFallback) {
            kc.silentCheckSsoRedirectUri = false;
          }
        }
        document.body.removeChild(iframe);
        window.removeEventListener("message", messageCallback);
        promise.setSuccess();
      };
      window.addEventListener("message", messageCallback, false);
    } else {
      promise.setSuccess();
    }
    return applyTimeoutToPromise(promise.promise, kc.messageReceiveTimeout, "Timeout when waiting for 3rd party check iframe message.");
  }
  function loadAdapter(type) {
    if (!type || type == "default") {
      return {
        login: function(options) {
          window.location.assign(kc.createLoginUrl(options));
          return createPromise().promise;
        },
        logout: async function(options) {
          const logoutMethod = (options == null ? void 0 : options.logoutMethod) ?? kc.logoutMethod;
          if (logoutMethod === "GET") {
            window.location.replace(kc.createLogoutUrl(options));
            return;
          }
          const logoutUrl = kc.createLogoutUrl(options);
          const response = await fetch(logoutUrl, {
            method: "POST",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded"
            },
            body: new URLSearchParams({
              id_token_hint: kc.idToken,
              client_id: kc.clientId,
              post_logout_redirect_uri: adapter.redirectUri(options, false)
            })
          });
          if (response.redirected) {
            window.location.href = response.url;
            return;
          }
          if (response.ok) {
            window.location.reload();
            return;
          }
          throw new Error("Logout failed, request returned an error code.");
        },
        register: function(options) {
          window.location.assign(kc.createRegisterUrl(options));
          return createPromise().promise;
        },
        accountManagement: function() {
          var accountUrl = kc.createAccountUrl();
          if (typeof accountUrl !== "undefined") {
            window.location.href = accountUrl;
          } else {
            throw "Not supported by the OIDC server";
          }
          return createPromise().promise;
        },
        redirectUri: function(options, encodeHash) {
          if (options && options.redirectUri) {
            return options.redirectUri;
          } else if (kc.redirectUri) {
            return kc.redirectUri;
          } else {
            return location.href;
          }
        }
      };
    }
    if (type == "cordova") {
      loginIframe.enable = false;
      var cordovaOpenWindowWrapper = function(loginUrl, target, options) {
        if (window.cordova && window.cordova.InAppBrowser) {
          return window.cordova.InAppBrowser.open(loginUrl, target, options);
        } else {
          return window.open(loginUrl, target, options);
        }
      };
      var shallowCloneCordovaOptions = function(userOptions) {
        if (userOptions && userOptions.cordovaOptions) {
          return Object.keys(userOptions.cordovaOptions).reduce(function(options, optionName) {
            options[optionName] = userOptions.cordovaOptions[optionName];
            return options;
          }, {});
        } else {
          return {};
        }
      };
      var formatCordovaOptions = function(cordovaOptions) {
        return Object.keys(cordovaOptions).reduce(function(options, optionName) {
          options.push(optionName + "=" + cordovaOptions[optionName]);
          return options;
        }, []).join(",");
      };
      var createCordovaOptions = function(userOptions) {
        var cordovaOptions = shallowCloneCordovaOptions(userOptions);
        cordovaOptions.location = "no";
        if (userOptions && userOptions.prompt == "none") {
          cordovaOptions.hidden = "yes";
        }
        return formatCordovaOptions(cordovaOptions);
      };
      var getCordovaRedirectUri = function() {
        return kc.redirectUri || "http://localhost";
      };
      return {
        login: function(options) {
          var promise = createPromise();
          var cordovaOptions = createCordovaOptions(options);
          var loginUrl = kc.createLoginUrl(options);
          var ref = cordovaOpenWindowWrapper(loginUrl, "_blank", cordovaOptions);
          var completed = false;
          var closed = false;
          var closeBrowser = function() {
            closed = true;
            ref.close();
          };
          ref.addEventListener("loadstart", function(event) {
            if (event.url.indexOf(getCordovaRedirectUri()) == 0) {
              var callback = parseCallback(event.url);
              processCallback(callback, promise);
              closeBrowser();
              completed = true;
            }
          });
          ref.addEventListener("loaderror", function(event) {
            if (!completed) {
              if (event.url.indexOf(getCordovaRedirectUri()) == 0) {
                var callback = parseCallback(event.url);
                processCallback(callback, promise);
                closeBrowser();
                completed = true;
              } else {
                promise.setError();
                closeBrowser();
              }
            }
          });
          ref.addEventListener("exit", function(event) {
            if (!closed) {
              promise.setError({
                reason: "closed_by_user"
              });
            }
          });
          return promise.promise;
        },
        logout: function(options) {
          var promise = createPromise();
          var logoutUrl = kc.createLogoutUrl(options);
          var ref = cordovaOpenWindowWrapper(logoutUrl, "_blank", "location=no,hidden=yes,clearcache=yes");
          var error;
          ref.addEventListener("loadstart", function(event) {
            if (event.url.indexOf(getCordovaRedirectUri()) == 0) {
              ref.close();
            }
          });
          ref.addEventListener("loaderror", function(event) {
            if (event.url.indexOf(getCordovaRedirectUri()) == 0) {
              ref.close();
            } else {
              error = true;
              ref.close();
            }
          });
          ref.addEventListener("exit", function(event) {
            if (error) {
              promise.setError();
            } else {
              kc.clearToken();
              promise.setSuccess();
            }
          });
          return promise.promise;
        },
        register: function(options) {
          var promise = createPromise();
          var registerUrl = kc.createRegisterUrl();
          var cordovaOptions = createCordovaOptions(options);
          var ref = cordovaOpenWindowWrapper(registerUrl, "_blank", cordovaOptions);
          ref.addEventListener("loadstart", function(event) {
            if (event.url.indexOf(getCordovaRedirectUri()) == 0) {
              ref.close();
              var oauth = parseCallback(event.url);
              processCallback(oauth, promise);
            }
          });
          return promise.promise;
        },
        accountManagement: function() {
          var accountUrl = kc.createAccountUrl();
          if (typeof accountUrl !== "undefined") {
            var ref = cordovaOpenWindowWrapper(accountUrl, "_blank", "location=no");
            ref.addEventListener("loadstart", function(event) {
              if (event.url.indexOf(getCordovaRedirectUri()) == 0) {
                ref.close();
              }
            });
          } else {
            throw "Not supported by the OIDC server";
          }
        },
        redirectUri: function(options) {
          return getCordovaRedirectUri();
        }
      };
    }
    if (type == "cordova-native") {
      loginIframe.enable = false;
      return {
        login: function(options) {
          var promise = createPromise();
          var loginUrl = kc.createLoginUrl(options);
          universalLinks.subscribe("keycloak", function(event) {
            universalLinks.unsubscribe("keycloak");
            window.cordova.plugins.browsertab.close();
            var oauth = parseCallback(event.url);
            processCallback(oauth, promise);
          });
          window.cordova.plugins.browsertab.openUrl(loginUrl);
          return promise.promise;
        },
        logout: function(options) {
          var promise = createPromise();
          var logoutUrl = kc.createLogoutUrl(options);
          universalLinks.subscribe("keycloak", function(event) {
            universalLinks.unsubscribe("keycloak");
            window.cordova.plugins.browsertab.close();
            kc.clearToken();
            promise.setSuccess();
          });
          window.cordova.plugins.browsertab.openUrl(logoutUrl);
          return promise.promise;
        },
        register: function(options) {
          var promise = createPromise();
          var registerUrl = kc.createRegisterUrl(options);
          universalLinks.subscribe("keycloak", function(event) {
            universalLinks.unsubscribe("keycloak");
            window.cordova.plugins.browsertab.close();
            var oauth = parseCallback(event.url);
            processCallback(oauth, promise);
          });
          window.cordova.plugins.browsertab.openUrl(registerUrl);
          return promise.promise;
        },
        accountManagement: function() {
          var accountUrl = kc.createAccountUrl();
          if (typeof accountUrl !== "undefined") {
            window.cordova.plugins.browsertab.openUrl(accountUrl);
          } else {
            throw "Not supported by the OIDC server";
          }
        },
        redirectUri: function(options) {
          if (options && options.redirectUri) {
            return options.redirectUri;
          } else if (kc.redirectUri) {
            return kc.redirectUri;
          } else {
            return "http://localhost";
          }
        }
      };
    }
    throw "invalid adapter type: " + type;
  }
  var LocalStorage = function() {
    if (!(this instanceof LocalStorage)) {
      return new LocalStorage();
    }
    localStorage.setItem("kc-test", "test");
    localStorage.removeItem("kc-test");
    var cs = this;
    function clearExpired() {
      var time = (/* @__PURE__ */ new Date()).getTime();
      for (var i2 = 0; i2 < localStorage.length; i2++) {
        var key = localStorage.key(i2);
        if (key && key.indexOf("kc-callback-") == 0) {
          var value = localStorage.getItem(key);
          if (value) {
            try {
              var expires = JSON.parse(value).expires;
              if (!expires || expires < time) {
                localStorage.removeItem(key);
              }
            } catch (err) {
              localStorage.removeItem(key);
            }
          }
        }
      }
    }
    cs.get = function(state) {
      if (!state) {
        return;
      }
      var key = "kc-callback-" + state;
      var value = localStorage.getItem(key);
      if (value) {
        localStorage.removeItem(key);
        value = JSON.parse(value);
      }
      clearExpired();
      return value;
    };
    cs.add = function(state) {
      clearExpired();
      var key = "kc-callback-" + state.state;
      state.expires = (/* @__PURE__ */ new Date()).getTime() + 60 * 60 * 1e3;
      localStorage.setItem(key, JSON.stringify(state));
    };
  };
  var CookieStorage = function() {
    if (!(this instanceof CookieStorage)) {
      return new CookieStorage();
    }
    var cs = this;
    cs.get = function(state) {
      if (!state) {
        return;
      }
      var value = getCookie("kc-callback-" + state);
      setCookie("kc-callback-" + state, "", cookieExpiration(-100));
      if (value) {
        return JSON.parse(value);
      }
    };
    cs.add = function(state) {
      setCookie("kc-callback-" + state.state, JSON.stringify(state), cookieExpiration(60));
    };
    cs.removeItem = function(key) {
      setCookie(key, "", cookieExpiration(-100));
    };
    var cookieExpiration = function(minutes) {
      var exp = /* @__PURE__ */ new Date();
      exp.setTime(exp.getTime() + minutes * 60 * 1e3);
      return exp;
    };
    var getCookie = function(key) {
      var name = key + "=";
      var ca = document.cookie.split(";");
      for (var i2 = 0; i2 < ca.length; i2++) {
        var c = ca[i2];
        while (c.charAt(0) == " ") {
          c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
          return c.substring(name.length, c.length);
        }
      }
      return "";
    };
    var setCookie = function(key, value, expirationDate) {
      var cookie = key + "=" + value + "; expires=" + expirationDate.toUTCString() + "; ";
      document.cookie = cookie;
    };
  };
  function createCallbackStorage() {
    try {
      return new LocalStorage();
    } catch (err) {
    }
    return new CookieStorage();
  }
  function createLogger(fn) {
    return function() {
      if (kc.enableLogging) {
        fn.apply(console, Array.prototype.slice.call(arguments));
      }
    };
  }
}
function bytesToBase64(bytes) {
  const binString = String.fromCodePoint(...bytes);
  return btoa(binString);
}
const DEFAULT_NAME = "keycloak";
const MIN_VALIDITY_SECONDS = 5;
class KeycloakStrategy {
  constructor(config) {
    this.check = async () => {
      if (this.helper.isAuthenticated) {
        return true;
      }
      const isAuthenticated = await this.keycloak.init({
        flow: "standard",
        onLoad: "check-sso"
      });
      this.helper.isAuthenticated = isAuthenticated;
      if (isAuthenticated) {
        this.helper.activeStrategyName = this.name;
      }
      return isAuthenticated;
    };
    this.signIn = async () => {
      this.helper.activeStrategyName = this.name;
      if (this.helper.isAuthenticated) {
        return void 0;
      }
      try {
        await this.keycloak.login({ redirectUri: this.startUrl });
        this.helper.isAuthenticated = true;
      } catch (error) {
        await this.keycloak.init({
          onLoad: "login-required",
          redirectUri: this.startUrl
        });
        this.helper.isAuthenticated = true;
      }
      return void 0;
    };
    this.signUp = async () => {
      return void 0;
    };
    this.signOut = async () => {
      await this.keycloak.logout({
        redirectUri: this.only ? void 0 : this.signInUrl
      });
      this.helper.reset();
    };
    this.refreshToken = async (sec) => {
      const minValiditySeconds = typeof sec === "number" ? sec : MIN_VALIDITY_SECONDS;
      try {
        await this.keycloak.updateToken(minValiditySeconds);
      } catch (error) {
      }
    };
    const { name, keycloak, loginUrl } = config;
    this.helper = strategyHelper;
    this.name = name || DEFAULT_NAME;
    this.signInUrl = loginUrl;
    this.only = (config == null ? void 0 : config.only) ?? false;
    this.keycloak = new Keycloak(keycloak);
  }
  get startUrl() {
    return this.helper.startUrl;
  }
  set startUrl(url) {
    this.helper.startUrl = url;
  }
  get token() {
    return this.keycloak.token;
  }
  get isAuthenticated() {
    return this.helper.isAuthenticated;
  }
}
const emptyStrategy = new EmptyStrategy();
const protocol = window.location.protocol;
const [baseUrl] = window.location.href.replace(`${protocol}//`, "").split("/");
const startUrl = `${protocol}//${baseUrl}`;
class Authorizer extends StrategyHelper {
  constructor(strategies) {
    super();
    this.check = async () => {
      var _a, _b, _c, _d;
      const strategyNames = Object.keys(this.strategies);
      const strategyName = strategyNames[0];
      if (strategyNames.length === 1 && this.strategies[strategyName] instanceof KeycloakStrategy) {
        const isAuthenticated2 = await this.strategies[strategyName].check();
        await this.strategies[strategyName].signIn();
        return isAuthenticated2;
      }
      const actives = await Promise.allSettled(
        strategyNames.map((strategyName2) => this.strategies[strategyName2].check())
      );
      let isAuthenticated = false;
      for (let index = 0; index < actives.length; index++) {
        const active = actives[index];
        if (active.status === "fulfilled" && active.value === true) {
          this.activeStrategyName = strategyNames[index];
          isAuthenticated = true;
          break;
        }
        if (active.status === "rejected" && networkErrors$1.includes(((_a = active.reason) == null ? void 0 : _a.code) ?? ((_b = active == null ? void 0 : active.reason) == null ? void 0 : _b.message))) {
          throw new NetworkError2((_c = active == null ? void 0 : active.reason) == null ? void 0 : _c.message);
        }
        if (active.status === "rejected" && ((_d = active.reason) == null ? void 0 : _d.code) === CERT_ERROR_CODE$1) {
          throw new CertError2();
        }
      }
      return isAuthenticated;
    };
    this.setStrategies = async (strategies2) => {
      this.strategies = strategies2.reduce((acc, strategy) => {
        acc[strategy.name] = strategy;
        return acc;
      }, {});
    };
    this.use = (strategyName) => {
      this.activeStrategyName = strategyName;
    };
    this.clear = () => {
      this.activeStrategyName = emptyStrategy.name;
      this.startUrl = startUrl;
    };
    this.helper = strategyHelper;
    this.strategiesCount = strategies.length;
    this.strategies = strategies.reduce((acc, strategy) => {
      acc[strategy.name] = strategy;
      return acc;
    }, {});
  }
  get strategy() {
    if (!this.activeStrategyName || !this.strategies) {
      return emptyStrategy;
    }
    return this.strategies[this.activeStrategyName] ?? emptyStrategy;
  }
  get isKeycloak() {
    return this.strategy instanceof KeycloakStrategy;
  }
  get startUrl() {
    return this.helper.startUrl;
  }
  set startUrl(url) {
    this.helper.startUrl = url;
  }
}
const isString = (value) => typeof value === "string";
const isNumber = (value) => typeof value === "number";
const isBoolean = (value) => typeof value === "boolean";
const isObject = (value) => value !== null && typeof value === "object";
const delay = (ms) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
};
const CERT_ERROR_CODE = "ERR_CERT_AUTHORITY_INVALID";
const networkErrors = [
  "Timeout when waiting for 3rd party check iframe message.",
  "ERR_NETWORK"
];
const authorizer = new Authorizer([]);
var __defProp$2 = Object.defineProperty;
var __decorateClass$2 = (decorators, target, key, kind) => {
  var result = void 0;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = decorator(target, key, result) || result;
  if (result) __defProp$2(target, key, result);
  return result;
};
const DEFAULT_DELAY_MS = 300;
const ABORT_REQUEST_MESSAGE = "Abort request";
class RestService {
  constructor(args) {
    this.statuses = {};
    this.retries = {};
    this.abortControllers = {};
    this.axiosInstance = axios.create();
    this.authorizer = authorizer;
    this.request = async (args2) => {
      var _a, _b, _c;
      const { query, data, fetch: fetchFn, adaptResponse, retry, retryDelay } = args2;
      const { mock } = args2;
      let status = this.getStatus(query.key).cloneWith({ error: null });
      if (!retry && status.isFetching && query.method === "GET") {
        return status;
      }
      status = status.cloneWith({ isFetching: true, error: null });
      this.setStatus(query.key, status);
      const headers = {
        ["Accept"]: "application/json",
        ["Content-Type"]: "application/json",
        ...(args2 == null ? void 0 : args2.headers) ?? {}
      };
      if (mock && mock.data) {
        await delay((mock == null ? void 0 : mock.delay) || DEFAULT_DELAY_MS);
        status = status.cloneWith({
          data: adaptResponse ? adaptResponse(mock.data) : mock.data,
          isFetched: true,
          isFetching: false
        });
        this.setStatus(query.key, status);
        return status;
      }
      try {
        if (retry) {
          this.retries[query.key] = (this.retries[query.key] ?? 0) + 1;
        }
        const abortController = new AbortController();
        this.abortControllers[query.key] = abortController;
        const request = fetchFn ? fetchFn({ ...args2, signal: abortController.signal }) : this.axiosInstance({
          url: query.url,
          method: query.method,
          headers,
          data,
          signal: abortController.signal
        });
        const response = await request;
        status = status.cloneWith({
          data: adaptResponse ? adaptResponse(response) : response,
          isFetched: true,
          isFetching: false
        });
        delete this.abortControllers[query.key];
        this.setStatus(query.key, status);
        if (retry) {
          delete this.retries[query.key];
        }
        return status;
      } catch (error) {
        delete this.abortControllers[query.key];
        if (error instanceof CanceledError) {
          delete this.statuses[query.key];
          return new QueryStatus();
        }
        const isAuthError = (error == null ? void 0 : error.status) === 401 || ((_a = error == null ? void 0 : error.response) == null ? void 0 : _a.status) === 401;
        const isLoginPath = window.location.pathname.includes(
          this.authorizer.strategy.signInUrl ?? ""
        );
        if (isAuthError && !isLoginPath) {
          await this.authorizer.strategy.signOut();
          this.authorizer.startUrl = window.location.href;
          this.authorizer.strategy.signInUrl && window.location.replace(this.authorizer.strategy.signInUrl);
          status = status.cloneWith({
            isFetched: true,
            isFetching: false
          });
          this.setStatus(query.key, status);
          return status;
        }
        if ((error == null ? void 0 : error.status) !== 403 && !((_c = (_b = error == null ? void 0 : error.config) == null ? void 0 : _b.signal) == null ? void 0 : _c.aborted) && retry && this.retries[query.key] < retry) {
          await delay(retryDelay ?? 0);
          return await this.request(args2);
        }
        if (error instanceof CertError2) {
          status = status.cloneWith({ error: new CertError$1() });
        } else if (error instanceof NetworkError2) {
          status = status.cloneWith({ error: new NetworkError$1(error.message) });
        } else if (axios.isAxiosError(error) && networkErrors.includes(`${(error == null ? void 0 : error.code) ?? (error == null ? void 0 : error.message)}`)) {
          status = status.cloneWith({
            error: new NetworkError$1(error.message)
          });
        } else if (axios.isAxiosError(error)) {
          status = status.cloneWith({
            error: (error == null ? void 0 : error.code) === CERT_ERROR_CODE ? new CertError$1() : new QueryError({
              status: error.status ?? 500,
              message: error.message
            })
          });
        } else if (error instanceof Error) {
          status = status.cloneWith({
            error: new QueryError({
              status: 500,
              message: error.message
            })
          });
        } else if (error instanceof QueryError) {
          status = status.cloneWith({ error });
        } else if (this.getError) {
          status = status.cloneWith({ error: this.getError(error) });
        } else {
          status = status.cloneWith({
            error: new QueryError({
              status: 500,
              message: JSON.stringify(error)
            })
          });
        }
        status = status.cloneWith({
          isFetched: true,
          isFetching: false
        });
        this.setStatus(query.key, status);
        return status;
      }
    };
    this.getStatus = (key) => {
      const status = this.statuses[key];
      if (!status) {
        return new QueryStatus();
      }
      return status;
    };
    this.setStatus = action((key, status) => {
      this.statuses[key] = status;
    });
    this.reset = (keys) => {
      if (Array.isArray(keys)) {
        keys.forEach((key) => {
          const abortController2 = this.abortControllers[key];
          abortController2 == null ? void 0 : abortController2.abort(ABORT_REQUEST_MESSAGE);
          delete this.abortControllers[key];
          delete this.statuses[key];
        });
        return;
      }
      const abortController = this.abortControllers[keys];
      abortController == null ? void 0 : abortController.abort(ABORT_REQUEST_MESSAGE);
      delete this.abortControllers[keys];
      delete this.statuses[keys];
    };
    this.resetQuery = (key) => {
      Object.keys(this.statuses).forEach((statusKey) => {
        if (!statusKey.includes(key)) {
          return;
        }
        const abortController = this.abortControllers[statusKey];
        abortController == null ? void 0 : abortController.abort(ABORT_REQUEST_MESSAGE);
        delete this.abortControllers[statusKey];
        delete this.statuses[statusKey];
      });
    };
    this.resetAll = () => {
      this.statuses = {};
      Object.keys(this.statuses).forEach((statusKey) => {
        const abortController = this.abortControllers[statusKey];
        abortController == null ? void 0 : abortController.abort(ABORT_REQUEST_MESSAGE);
        delete this.abortControllers[statusKey];
      });
    };
    this.clearError = (keys) => {
      if (Array.isArray(keys)) {
        keys.forEach((key) => {
          const status2 = this.statuses[key] ?? new QueryStatus();
          this.statuses[key] = status2.cloneWith({ error: null });
        });
        return;
      }
      const status = this.statuses[keys] ?? new QueryStatus();
      this.statuses[keys] = status.cloneWith({ error: null });
    };
    makeAutoObservable(this);
    this.getStatus = this.getStatus.bind(this);
    this.setStatus = this.setStatus.bind(this);
    this.request = this.request.bind(this);
    this.reset = this.reset.bind(this);
    this.resetAll = this.resetAll.bind(this);
    this.clearError = this.clearError.bind(this);
    this.axiosInstance = (args == null ? void 0 : args.axiosInstance) ?? this.axiosInstance;
    this.authorizer = (args == null ? void 0 : args.authorizer) ?? this.authorizer;
    this.getError = (args == null ? void 0 : args.getError) ?? this.getError;
  }
}
__decorateClass$2([
  observable.deep
], RestService.prototype, "statuses");
var __defProp$1 = Object.defineProperty;
var __getOwnPropDesc$1 = Object.getOwnPropertyDescriptor;
var __decorateClass$1 = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$1(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp$1(target, key, result);
  return result;
};
class FetchResource {
  constructor(queries, args) {
    this.getStatus = (key) => {
      return this.rest.getStatus(key);
    };
    this.setQuery = action((key, query) => {
      this.queries[key] = query;
    });
    this.resetQuery = action((key) => {
      this.queries[key] = this._queries[key];
    });
    makeObservable(this);
    this.rest = new RestService(args);
    this.queries = queries;
    this._queries = queries;
  }
  get statuses() {
    return this.rest.statuses;
  }
  getPaginationStatus(keys) {
    const status = keys.reduce((acc, key) => {
      var _a, _b;
      let result = acc.cloneWith();
      const pageStatus = this.getStatus(key);
      if (pageStatus.data) {
        const data = [...((_a = result == null ? void 0 : result.data) == null ? void 0 : _a.data) ?? [], ...((_b = pageStatus.data) == null ? void 0 : _b.data) ?? []];
        result = result.cloneWith({
          ...result,
          ...pageStatus,
          data: {
            ...result.data,
            ...pageStatus.data ?? {},
            data
          }
        });
      } else {
        result = result.cloneWith({
          ...result,
          ...pageStatus,
          data: {
            count: 0,
            lastId: 0,
            lastValue: 0,
            page: 0,
            limit: 0,
            data: [],
            ...result.data ?? {}
          }
        });
      }
      return result;
    }, new QueryStatus());
    return status;
  }
}
__decorateClass$1([
  observable.deep
], FetchResource.prototype, "queries", 2);
__decorateClass$1([
  computed
], FetchResource.prototype, "statuses", 1);
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __decorateClass = (decorators, target, key, kind) => {
  var result = __getOwnPropDesc(target, key);
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = decorator(target, key, result) || result;
  if (result) __defProp(target, key, result);
  return result;
};
class View {
  constructor(service) {
    this.resetAll = () => {
      this._service.rest.resetAll();
    };
    this.setHelpers = action((key, helpers) => {
      this.helpers[key] = helpers;
    });
    this.setPaginationHelpers = action((key, helpers) => {
      this.paginationHelpers[key] = helpers;
    });
    makeObservable(this);
    this._service = service;
    this.helpers = {};
    this.paginationHelpers = {};
  }
  get service() {
    return this._service;
  }
  get statuses() {
    return this._service.rest.statuses;
  }
  get queries() {
    return this._service.queries;
  }
  createHelpers(key) {
    if (!this.helpers[key]) {
      const clearError = (args) => {
        const query = this.queries[key];
        this._service.rest.clearError(query.cloneWith(args).key);
      };
      const reset = (args) => {
        const query = this.queries[key];
        if (!query) {
          return;
        }
        this._service.rest.reset(query.cloneWith(args).key);
      };
      const resetQuery = () => {
        const query = this.queries[key];
        if (!query) {
          return;
        }
        this._service.rest.reset(query.keyShort);
        this._service.resetQuery(key);
      };
      this.setHelpers(key, {
        clearError,
        reset,
        resetQuery
      });
    }
    return this.helpers[key];
  }
  createPaginationHelpers(key) {
    if (!this.paginationHelpers[key]) {
      const nextPage = (params) => {
        const query = this._service.queries[key];
        const result = query.nextPage(params);
        this._service.setQuery(key, query.cloneWith());
        return result;
      };
      const clearError = (args) => {
        const query = this._service.queries[key];
        this._service.rest.clearError(query.cloneWith(args).key);
      };
      const reset = (args) => {
        const query = this._service.queries[key];
        if (!query) {
          return;
        }
        this._service.rest.reset(query.cloneWith(args).key);
      };
      const resetQuery = () => {
        const query = this._service.queries[key];
        if (!query) {
          return;
        }
        this._service.rest.resetQuery(query.keyShort);
        this._service.resetQuery(key);
      };
      this.setPaginationHelpers(key, {
        nextPage,
        clearError,
        reset,
        resetQuery
      });
    }
    return this.paginationHelpers[key];
  }
  createQueryPaginationHelpers(query) {
    const clearError = (args) => {
      this._service.rest.clearError(query.cloneWith(args).key);
    };
    const reset = (args) => {
      this._service.rest.reset(query.cloneWith(args).key);
    };
    const resetQuery = () => {
      this._service.rest.resetQuery(query.keyShort);
    };
    return {
      clearError,
      reset,
      resetQuery
    };
  }
}
__decorateClass([
  computed
], View.prototype, "statuses");
__decorateClass([
  computed
], View.prototype, "queries");
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: "" };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error) {
    this.setState((prev) => ({
      ...prev,
      error: (error == null ? void 0 : error.stack) ?? (error == null ? void 0 : error.message) ?? JSON.stringify(error)
    }));
  }
  render() {
    if (this.state.hasError) {
      const ErrorPage = this.props.errorPage;
      return /* @__PURE__ */ jsx(ErrorPage, { error: this.state.error });
    }
    return this.props.children;
  }
}
export {
  ABORT_REQUEST_MESSAGE,
  CERT_ERROR_CODE,
  CertError$1 as CertError,
  ErrorBoundary,
  FetchResource,
  NetworkError$1 as NetworkError,
  PaginationQuery,
  Query,
  QueryError,
  QueryStatus,
  RestService,
  View,
  authorizer,
  delay,
  isBoolean,
  isNumber,
  isObject,
  isString,
  networkErrors
};

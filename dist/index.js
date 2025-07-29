import { observable, action, makeAutoObservable, makeObservable, computed } from "mobx";
import axios, { CanceledError } from "axios";
import { jsx } from "react/jsx-runtime";
import React from "react";
function getDefaultExportFromCjs(x) {
  return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, "default") ? x["default"] : x;
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
    this.getQueryArgs = data == null ? void 0 : data.getQueryArgs;
    this.data = data == null ? void 0 : data.data;
    this.headers = data == null ? void 0 : data.headers;
    this.withCache = data == null ? void 0 : data.withCache;
    this.mock = data == null ? void 0 : data.mock;
    this.mockDelay = data == null ? void 0 : data.mockDelay;
    this.retry = data == null ? void 0 : data.retry;
    this.retryDelay = data == null ? void 0 : data.retryDelay;
    this.fetch = data == null ? void 0 : data.fetch;
    this.transformResponse = data == null ? void 0 : data.transformResponse;
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
      return new PaginationQuery({ ...this, ...data2 });
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
    this.build = () => {
      return this.cloneWith();
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
class CertError extends QueryError {
  constructor() {
    super({
      status: 0,
      message: "ERR_CERT_AUTHORITY_INVALID"
    });
  }
}
class NetworkError extends QueryError {
  constructor(message) {
    super({
      status: 0,
      message: message ?? "NETWORK ERROR"
    });
  }
}
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
  constructor(data) {
    super(data);
    this.cloneWith = (query) => {
      return new Query({ ...this, ...query });
    };
    this.build = () => {
      if (this.getQueryArgs) {
        return new Query({ ...this, ...this.getQueryArgs(this) });
      }
      return new Query({ ...this });
    };
  }
  static isInstance(value) {
    return value instanceof Query;
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
var __defProp$3 = Object.defineProperty;
var __decorateClass$3 = (decorators, target, key, kind) => {
  var result = void 0;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = decorator(target, key, result) || result;
  if (result) __defProp$3(target, key, result);
  return result;
};
const ABORT_REQUEST_MESSAGE = "Abort request";
class RestService {
  constructor(args) {
    this.statuses = {};
    this.retries = {};
    this.abortControllers = {};
    this.axiosInstance = axios.create();
    this.request = async (args2) => {
      var _a, _b;
      const query = args2.query.build();
      let status = this.getStatus(query.key).cloneWith({ error: null });
      if (!query.retry && status.isFetching && query.method === "GET") {
        return status;
      }
      status = status.cloneWith({ isFetching: true, error: null });
      this.setStatus(query.key, status);
      const headers = {
        ["Accept"]: "application/json",
        ["Content-Type"]: "application/json",
        ...query.headers ?? {}
      };
      if (query.mock && query.mockDelay) {
        await delay(query.mockDelay);
        status = status.cloneWith({
          data: query.transformResponse ? query.transformResponse(query.mock) : query.data,
          isFetched: true,
          isFetching: false
        });
        this.setStatus(query.key, status);
        return status;
      }
      try {
        if (query.retry) {
          this.retries[query.key] = (this.retries[query.key] ?? 0) + 1;
        }
        const abortController = new AbortController();
        this.abortControllers[query.key] = abortController;
        const request = query.fetch ? query.fetch(query, abortController.signal) : this.axiosInstance({
          url: query.url,
          method: query.method,
          headers,
          data: query.data,
          signal: abortController.signal
        });
        const response = await request;
        status = status.cloneWith({
          data: query.transformResponse ? query.transformResponse(response) : response,
          isFetched: true,
          isFetching: false
        });
        delete this.abortControllers[query.key];
        this.setStatus(query.key, status);
        if (query.retry) {
          delete this.retries[query.key];
        }
        return status;
      } catch (error) {
        delete this.abortControllers[query.key];
        if (error instanceof CanceledError) {
          delete this.statuses[query.key];
          return new QueryStatus();
        }
        if (this.getError) {
          status = status.cloneWith({ error: this.getError(error) });
          this.setStatus(query.key, status);
          return status;
        }
        if ((error == null ? void 0 : error.status) !== 403 && !((_b = (_a = error == null ? void 0 : error.config) == null ? void 0 : _a.signal) == null ? void 0 : _b.aborted) && query.retry && this.retries[query.key] < query.retry) {
          await delay(query.retryDelay ?? 0);
          return await this.request(args2);
        }
        if (axios.isAxiosError(error)) {
          status = status.cloneWith({
            error: new QueryError({
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
    this.getError = (args == null ? void 0 : args.getError) ?? this.getError;
  }
}
__decorateClass$3([
  observable.deep
], RestService.prototype, "statuses");
var __defProp$2 = Object.defineProperty;
var __getOwnPropDesc$2 = Object.getOwnPropertyDescriptor;
var __decorateClass$2 = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$2(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp$2(target, key, result);
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
            params: {},
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
__decorateClass$2([
  observable.deep
], FetchResource.prototype, "queries", 2);
__decorateClass$2([
  computed
], FetchResource.prototype, "statuses", 1);
var __defProp$1 = Object.defineProperty;
var __getOwnPropDesc$1 = Object.getOwnPropertyDescriptor;
var __decorateClass$1 = (decorators, target, key, kind) => {
  var result = __getOwnPropDesc$1(target, key);
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = decorator(target, key, result) || result;
  if (result) __defProp$1(target, key, result);
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
__decorateClass$1([
  computed
], View.prototype, "statuses");
__decorateClass$1([
  computed
], View.prototype, "queries");
const CERT_ERROR_CODE = "ERR_CERT_AUTHORITY_INVALID";
const TIMEOUT_3RD_PARTY_CHECK_IFRAME_MESSAGE = "Timeout when waiting for 3rd party check iframe message.";
const ERR_NETWORK = "ERR_NETWORK";
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
class TKStore {
  constructor(queries, args) {
    this.resetAll = () => {
      this._service.rest.resetAll();
    };
    this.createData = (query) => {
      const status = this._service.getStatus(query.key);
      let helperKey;
      const helperKeys = Object.keys(this._service.queries);
      for (const key of helperKeys) {
        if (this._service.queries[key].key === query.key) {
          helperKey = key;
          break;
        }
      }
      if (!helperKey) {
        throw new Error("Helper key not found");
      }
      const helpers = this.createHelpers(helperKey);
      return { ...status, ...helpers, fetchData: query.fetch };
    };
    this.createPaginationData = (query) => {
      const status = this._service.getPaginationStatus(query.keys);
      let helperKey;
      const helperKeys = Object.keys(this._service.queries);
      for (const key of helperKeys) {
        if (this._service.queries[key].key === query.key) {
          helperKey = key;
          break;
        }
      }
      if (!helperKey) {
        throw new Error("Helper key not found");
      }
      const helpers = this.createPaginationHelpers(helperKey);
      return { ...status, ...helpers, fetchData: query.fetch };
    };
    this.setHelpers = action((key, helpers) => {
      this.helpers[key] = helpers;
    });
    this.setPaginationHelpers = action((key, helpers) => {
      this.paginationHelpers[key] = helpers;
    });
    makeObservable(this);
    this._service = new FetchResource(queries, args);
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
  // TODO: Подумать на будущее
  // public createPaginationData
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
], TKStore.prototype, "statuses");
__decorateClass([
  computed
], TKStore.prototype, "queries");
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
  CertError,
  ERR_NETWORK,
  ErrorBoundary,
  FetchResource,
  NetworkError,
  PaginationQuery,
  Query,
  QueryError,
  QueryStatus,
  RestService,
  TIMEOUT_3RD_PARTY_CHECK_IFRAME_MESSAGE,
  TKStore,
  View,
  delay,
  isBoolean,
  isNumber,
  isObject,
  isString
};

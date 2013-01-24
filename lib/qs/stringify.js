/*!
 * Hyperion Querysting (stringify)
 * Copyright(c) 2013 Jake Luer <jake@qualiancy.com>
 * MIT Licensed
 */

/*!
 * Module dependencies
 */

var type = require('tea-type');

/*!
 * Internal dependencies
 */

var uri = require('./uri');

/**
 * Stringify an object given an optional prefix
 * and other options.
 *
 * Options:
 * - `sep`: seperator (`&`)
 * - `eq`: equals (`=`)
 *
 * @param {Mixed} object to convert to querystring
 * @param {String} prefix (optional)
 * @param {Object} options
 * @return {String} querystring
 */

var exports = module.exports = function (obj, prefix, opts) {
  if ('object' === type(prefix)) opts = prefix, prefix = null;
  opts = defaults(opts || {});
  var el = type(obj);
  return el === 'object' || el === 'array'
    ? stringify[el](obj, prefix, opts)
    : stringify.string(obj, prefix, opts);
};

/*!
 * Easy access for sub-types
 */

var stringify = {};

/*!
 * Stringify a JSON object using included options.
 *
 * @param {Mixed} object to convert to querystring
 * @param {String} prefix (optional)
 * @param {Object} options
 * @return {String} querystring
 */

stringify.object = function (obj, prefix, opts) {
  var i = 0
    , keys = Object.keys(obj)
    , res = []
    , key, next;

  for (; i < keys.length; i++) {
    key = keys[i];
    next = prefix
      ? prefix + '[' + uri.encode(key) + ']'
      : uri.encode(key);
    res.push(exports(obj[key], next, opts));
  }

  return res.join(opts.sep);
};

/*!
 * Stringify a JSON array using included options.
 *
 * @param {Mixed} object to convert to querystring
 * @param {String} prefix (optional)
 * @param {Object} options
 * @return {String} querystring
 */

stringify.array = function (arr, prefix, opts) {
  var i = 0
    , res = []
    , next;

  for (; i < arr.length; i++) {
    next = prefix + '[' + i + ']';
    res.push(exports(arr[i], next, opts));
  }

  return res.join(opts.sep);
};

/*!
 * Stringify a string using included options. Requires
 * a prefix.
 *
 * @param {Mixed} object to convert to querystring
 * @param {String} prefix (required)
 * @param {Object} options
 * @return {String} querystring
 */

stringify.string = function (str, prefix, opts) {
  return prefix + opts.eq + uri.encode(str);
};

/*!
 * Ensure default options.
 *
 * @param {Object} current options
 * @return {Object} options filled in
 * @api private
 */

function defaults (opts) {
  var options = {};
  options.eq = opts.eq || '=';
  options.sep = opts.seq || '&';
  return options;
}

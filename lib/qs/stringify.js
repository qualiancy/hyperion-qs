var type = require('tea-type');

var uri = require('./uri');

var exports = module.exports = function (obj, prefix, opts) {
  if ('object' === type(prefix)) opts = prefix, prefix = null;
  opts = defaults(opts || {});
  var el = type(obj);
  return el === 'object' || el === 'array'
    ? stringify[el](obj, prefix, opts)
    : stringify.string(obj, prefix, opts);
};

var stringify = {};

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

stringify.string = function (str, prefix, opts) {
  return prefix + opts.eq + uri.encode(str);
};

function defaults (opts) {
  var options = {};
  options.eq = opts.eq || '=';
  options.sep = opts.seq || '&';
  return options;
}

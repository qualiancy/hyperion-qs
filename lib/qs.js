
var uri = require('./qs/uri');

exports.stringify = require('./qs/stringify');

exports.parse = function (query, sep, eq) {
  sep = sep || '&';
  eq = eq || '=';

  var i = 0
    , qs = query.split(sep)
    , res = {};

  for (; i < qs.length; i++) {
    var chunk = qs[i].replace(/\+/g, '%20')
      , loc = chunk.indexOf(eq)
      , key, value;

    if (loc >= 0) {
      key = chunk.substr(0, loc);
      value = chunk.substr(loc + 1);
    } else {
      key = chunk;
      value = '';
    }

    key = uri.decode(key);
    res[key] = uri.decode(value);
  }

  return res;
};


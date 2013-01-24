/*!
 * Hyperion Querysting (parse)
 * Copyright(c) 2013 Jake Luer <jake@qualiancy.com>
 * MIT Licensed
 */

/*!
 * Internal dependencies
 */

var uri = require('./uri');

/**
 * Parse a querystring given a separator and
 * equivelance string.
 *
 * @param {String} query
 * @param {String} seperator (&)
 * @param {String} equals (=)
 * @api public
 */

module.exports = function (query, sep, eq) {
  sep = sep || '&';
  eq = eq || '=';

  var i = 0
    , qs = query.split(sep)
    , res = {}
    , chunk, loc, key, value;

  for (; i < qs.length; i++) {
    chunk = qs[i].replace(/\+/g, '%20');
    loc = chunk.indexOf(eq);

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

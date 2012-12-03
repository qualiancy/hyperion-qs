
exports.decode = function (str) {
  try { return decodeURIComponent(str); }
  catch (ex) { return str; }
};

exports.encode = function (str) {
  try { return encodeURIComponent(str); }
  catch (ex) { return str; }
};

module.exports = process.env.qs_COV
  ? require('./lib-cov/qs')
  : require('./lib/qs');

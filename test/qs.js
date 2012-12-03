var common = {
    'foo=bar&bar=baz': { foo: 'bar', bar: 'baz' }
  , '0=2': { 0: '2' }
  , 'h%3Dello=univ%3Derse': { 'h=ello': 'univ=erse' }
  , 'foo=bar%3Dbaz': { foo: 'bar=baz' }
  , 'hello[world]=one&hello[universe]=two': { hello: { world: 'one', universe: 'two' }}
};


describe('.stringify()', function () {

  function addTests (list, prefix) {
    Object.keys(list).forEach(function (res) {
      var subject = list[res];
      it(JSON.stringify(subject), function () {
        qs.stringify(subject, prefix).should.equal(res);
      });
    });
  }

  // common test
  addTests(common);

  // type coersion
  addTests({
    '0=2': { 0: 2 }
  });

  // prefix
  addTests({
      'prefix=2': 2
    , 'prefix[0]=hello&prefix[1]=universe': [ 'hello', 'universe' ]
  },'prefix');

});

describe.skip('.parse()', function () {

  function addTests (list) {
    Object.keys(list).forEach(function (subject) {
      it(subject, function () {
        qs.parse(subject).should.deep.equal(list[subject]);
      });
    });
  }

  addTests(common);

  addTests({
    'foo=bar=baz': { foo: 'bar=baz' }
  });

});

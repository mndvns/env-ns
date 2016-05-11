var should = require('should');
var Env = require('../..');

var env1 = Env(null, {foo: 10});
env1.foo.should.equal(10);

var env2 = Env(null, {foo: 20});
env2.foo.should.equal(20);

// instances are distinct
env1.foo.should.equal(10);

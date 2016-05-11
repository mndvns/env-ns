var should = require('should');
var env = require('../..')('parent');

// values persist in node instance
env.foo.should.equal(10);

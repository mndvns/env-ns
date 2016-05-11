var should = require('should');
var env = require('../..')('operations');

should.not.exist(env.foo);

// default value used
env('foo', 'z').should.equal('z');

// process.env value used
process.env.foo = 'a'
env.foo.should.equal('a');

// process.env value still used
env('foo', 'x').should.equal('a');

// env value used when defined
env.foo = 'q'
env.foo.should.equal('q');
env('foo', 'q').should.equal('q');

// process.env not affected
process.env.foo.should.equal('a');

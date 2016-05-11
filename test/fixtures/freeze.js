var should = require('should');
var env = require('../..')('freeze');

// env value mutates
env.foo = 'u';
env.foo.should.equal('u');

// env value freezes
env.freeze('foo');
env.foo = 'r';
env.foo.should.equal('u');

// freeze multiple values
env.a = 'a';
env.b = 'b';
env.freeze('a', 'b');
env.a = 'z';
env.b = 'z';
env.a.should.equal('a');
env.b.should.equal('b');

// freeze all values
env.c = 'c';
env.d = 'd';
env.freeze();
env.c = 'z';
env.d = 'z';
env.c.should.equal('c');
env.d.should.equal('d');

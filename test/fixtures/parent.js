var env = require('../..')('parent');

env.foo = 10;

require('./parent.child');

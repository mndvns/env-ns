var should = require('should');
var env = require('../..')('files', __dirname + '/conf.ini', __dirname + '/conf.yaml', [__dirname + '/conf.json'], {QUX: 30});

// properties are merged

env.BAR.should.equal(10);
env.FOO.should.equal(20);
env.QUX.should.equal(30);
env.FIZ.should.equal(40);

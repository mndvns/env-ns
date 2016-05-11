var should = require('should');
var envs = require('..');
var fs = require('fs');
var fork = require('child_process').fork;

fs.readdirSync(`${__dirname}/fixtures`).forEach(file => {
  var parts = file.split('.');
  if (parts.length > 2) return;
  if (parts.pop() !== 'js') return;
  it(parts, done => {
    var proc = spawn(file);
    proc.on('close', code => done());
  });
});

function spawn(name) {
  return fork(`${__dirname}/fixtures/${name}`, [should], {
    cwd: `${__dirname}/fixtures`
  });
}

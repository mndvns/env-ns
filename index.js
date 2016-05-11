/**
 * Module dependencies
 */

var debug = require('debug')('env-namespace');
var wf = require('whatever-format');

const namespaces = {};

/**
 * Expose `resolveNamespace` as module
 */

exports = module.exports = resolveNamespace;

/**
 * Resolve or create a namespace, given a `name`
 * and optional `confs`
 * @param {String} name
 * @param {...(Object|String)} [confs] - either a path to file or object
 */

function resolveNamespace(name, ...confs) {
  name = name || uid();

  if (namespaces[name] && confs.length) {
    throw new Error(`${name} is already set`);
  }

  if (namespaces[name]) {
    debug(`resolved ${name}`, namespaces[name]);
    return namespaces[name];
  }

  var merged = resolveConfs(confs);
  var namespace = createNamespace(merged);
  debug(`created ${name}`, namespace);
  return namespaces[name] = namespace;
};

/**
 * Instantiate a new namespace
 * @param {Object} conf
 */

function createNamespace(conf) {
  var frozen = {};

  var fn = function(){};
  fn.toJSON = function() {
    return JSON.stringify(conf);
  };
  fn.toString = function() {
    return '[function Namespace]';
  };
  fn.freeze = function(...keys) {
    if (!keys.length) keys = Object.keys(conf);
    keys.map(key => {
      frozen[key] = {value: this[key]};
    });
  };

  var handler = {
    get: function(target, prop) {
      if (conf[prop]) return conf[prop];
      if (target[prop]) return target[prop];
      if (process.env[prop]) return process.env[prop];
    },
    set: function(target, prop, value) {
      if (frozen[prop]) return frozen[prop].value;
      return target[prop] = conf[prop] = value;
    },
    apply: function(target, context, [prop, defaultValue]) {
      return this.get(target, prop) || defaultValue;
    }
  };

  return new Proxy(fn, handler);
}

/**
 * Resolve `confs` and merge
 * @param {(Object|String)[]} confs - path or objects
 */

function resolveConfs(confs) {
  return confs.map(conf => {
    if (Array.isArray(conf)) return resolveConfs(conf);
    if (typeof conf === 'object') return conf;
    return wf.readFileSync(conf);
  }).reduce((acc, conf) => {
    return Object.assign(acc, conf);
  }, {});
}

function uid() {
  var output = Math.random().toString(35).substr(2, 7);
  if (namespaces[output]) return uid();
  return output;
}

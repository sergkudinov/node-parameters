// Generated by CoffeeScript 2.5.1
// # Parameters
var Parameters, clone, error, is_object_literal, load, merge, path, register, registry, stream, types;

registry = [];

register = function(hook) {
  return registry.push(hook);
};

Parameters = function(config) {
  this.registry = [];
  this.config = {};
  this.init();
  this.collision = {};
  config = clone(config || {});
  this.config = config;
  this.confx().set(this.config);
  return this;
};

Parameters.prototype.init = (function() {});

Parameters.prototype.register = function(hook) {
  if (!is_object_literal(hook)) {
    throw error(['Invalid Hook Registration:', 'hooks must consist of keys representing the hook names', 'associated with function implementing the hook,', `got ${hook}`]);
  }
  this.registry.push(hook);
  return this;
};

Parameters.prototype.hook = function() {
  var args, handler, hook, hooks, i, j, k, len, len1, len2, name, ref;
  switch (arguments.length) {
    case 3:
      [name, args, handler] = arguments;
      break;
    case 4:
      [name, args, hooks, handler] = arguments;
      break;
    default:
      throw error(['Invalid Hook Argument:', 'function hook expect 3 or 4 arguments', 'name, args, hooks? and handler,', `got ${arguments.length} arguments`]);
  }
  if (typeof hooks === 'function') {
    hooks = [hooks];
  }
  for (i = 0, len = registry.length; i < len; i++) {
    hook = registry[i];
    if (hook[name]) {
      handler = hook.call(this, args, handler);
    }
  }
  ref = this.registry;
  for (j = 0, len1 = ref.length; j < len1; j++) {
    hook = ref[j];
    if (hook[name]) {
      handler = hook[name].call(this, args, handler);
    }
  }
  if (hooks) {
    for (k = 0, len2 = hooks.length; k < len2; k++) {
      hook = hooks[k];
      handler = hook.call(this, args, handler);
    }
  }
  return handler.call(this, args);
};

// ## `load(module)`

// * `module`   
//   Name of the module to load, required.

// Load and return a module, use `require.main.require` by default but can be
// overwritten by the `load` options passed in the configuration.
Parameters.prototype.load = function(module) {
  if (typeof module !== 'string') {
    throw Error(['Invalid Load Argument:', 'load is expecting string,', `got ${JSON.stringify(module)}`].join(' '));
  }
  if (this.config.load) {
    if (typeof this.config.load === 'string') {
      return load(this.config.load)(module);
    } else {
      return this.config.load(module);
    }
  } else {
    return load(module);
  }
};

// ## Export
module.exports = Parameters;

// ## Dependencies
path = require('path');

stream = require('stream');

load = require('./utils/load');

error = require('./utils/error');

({clone, merge, is_object_literal} = require('mixme'));

// ## Internal types
types = ['string', 'boolean', 'integer', 'array'];

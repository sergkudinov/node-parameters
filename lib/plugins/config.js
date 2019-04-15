// Generated by CoffeeScript 2.4.1
// {Parameters} = require './Parameters'
var Parameters, clone, commands_builder, error, is_object_literal, merge, mutate, options_builder;

Parameters = require('../Parameters');

error = require('../utils/error');

({clone, is_object_literal, merge, mutate} = require('mixme'));

commands_builder = function(pconfig) {
  var builder;
  builder = (command) => {
    var ctx, i, lconfig, len, name;
    ctx = this;
    if (typeof command === 'string') {
      command = [command];
    }
    lconfig = pconfig;
    for (i = 0, len = command.length; i < len; i++) {
      name = command[i];
      lconfig = lconfig.commands[name];
    }
    return {
      commands: commands_builder.call(this, lconfig),
      options: options_builder.call(this, lconfig),
      get: function() {
        return lconfig;
      },
      set: function() {
        var base, j, len1, values;
        values = null;
        if (arguments.length === 2) {
          values = {
            [arguments[0]]: arguments[1]
          };
        } else if (arguments.length === 1) {
          values = arguments[0];
        } else {
          throw error(['Invalid Commands Set Arguments:', 'expect 1 or 2 arguments, got 0']);
        }
        lconfig = pconfig;
        for (j = 0, len1 = command.length; j < len1; j++) {
          name = command[j];
          // A new command doesn't have a config registered yet
          if ((base = lconfig.commands)[name] == null) {
            base[name] = {};
          }
          lconfig = lconfig.commands[name];
        }
        mutate(lconfig, values);
        ctx.hook('configure_commands_set', {
          config: lconfig,
          command: command,
          values: values
        }, function({config, command, values}) {
          return config.name = name;
        });
        return this;
      },
      remove: function() {
        return delete lconfig.options[command];
      },
      show: function() {
        return lconfig;
      }
    };
  };
  return builder;
};

options_builder = function(config) {
  var builder;
  builder = function(name) {
    return {
      get: function(properties) {
        var i, len, options, property;
        if (typeof properties === 'string') {
          properties = [properties];
        }
        if (Array.isArray(properties)) {
          options = {};
          for (i = 0, len = properties.length; i < len; i++) {
            property = properties[i];
            options[property] = config.options[name][property];
          }
          return options;
        } else {
          return config.options[name];
        }
      },
      remove: function(name) {
        return delete config.options[name];
      },
      set: function(property, value) {
        config.options[name][property] = value;
        return this;
      }
    };
  };
  builder.__proto__ = {
    list: function() {
      return Object.keys(config.options);
    },
    get: function(name) {
      return config.options[name];
    }
  };
  return builder;
};

Parameters.prototype.configure = (function(parent) {
  return function() {
    if (arguments.length) {
      return parent.call(this, ...arguments);
    }
    parent.set = () => {
      return this.hook('configure_app_set', {
        config: this.config
      }, (function() {}));
    };
    parent.get = () => {
      return this.config;
    };
    parent.options = options_builder.call(this, this.config);
    parent.commands = commands_builder.call(this, this.config);
    parent.show = function() {
      return this.config;
    };
    return parent;
  };
})(Parameters.prototype.configure);
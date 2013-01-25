/**
 * Module dependencies
 */

var
  each      = require('each'),
  domify    = require('domify'),
  hogan = require('hogan'),
  template  = require('./template');

module.exports = Rack;

function Rack (module) {
  this.module = module;
  this.render();
}

Rack.prototype.render = function () {
  var data = this.getRenderData();
  var render = hogan(template, data);
  this.el = domify(render)[0];
  return this;
};

Rack.prototype.bind = function () {
  return this;
};

Rack.prototype.getRenderData = function () {
  var module = this.module;
  var meta   = module.meta || {};
  var data   = {};
  
  data.name = module.meta.name;
  data.params = [];

  each(meta.params, function (values, prop) {
    data.params.push({
      name: prop,
      max: values.max,
      min: values.min,
      default: values.defaultValue,
      type: values.type,
      value: module[ prop ]
    });
  });

  return data;
}

module.exports = Rack;

/**
 * Module dependencies
 */

var
  each      = require('each'),
  dom       = require('dom'),
  domify    = require('domify'),
  hogan     = require('hogan'),
  Dial      = require('dial'),
  template  = require('./template');

/**
 * Expose `Rack`
 */

module.exports = Rack;

/**
 * A constructor for a Rack object
 * that takes a web audio component instance
 * as a parameter
 *
 * @param {Object} module
 * @api public
 */

function Rack (module) {
  this.module = module;
  this.params = (module.meta && module.meta.params) || {};
  this.render();
  this.bind();
}

/**
 * Creates an element to be injected
 * into the DOM stored in the rack's `el`
 * property
 *
 * @return {Rack}
 * @api public
 */

Rack.prototype.render = function () {
  var data = getRenderData(this.module);
  var render = hogan(template, data);
  this.el = domify(render)[0];
  return this;
};

/**
 * Creates the dial and button UI widgets
 * and sets events to modify the module
 * properties on change
 *
 * @return {Rack}
 * @api public
 */

Rack.prototype.bind = function () {
  var that = this;
  var module = this.module;
  this.controls = [];

  each(this.params, function (props, name) {
    var $input = dom('.rack-param-input-' + name, that.el);
    var $feedbackEl = dom('.rack-param-value-' + name, that.el);
    var input  = $input.els && $input.els[0];
    var feedbackEl = $feedbackEl.els && $feedbackEl.els[0];
    var type = props.type;
    var control;

    if (type === 'float' || type === 'int') {
      control = createDial(input, props, name, module, feedbackEl);
    } else if (type === 'bool') {

    }
  });

  return this;
};

function createDial (inputEl, props, name, module, feedbackEl) {
  var dial = new Dial(inputEl, {
    min: props.min,
    max: props.max,
    value: module[name],
    float: props.type === 'float'
  });

  dial.on('change', function (val) {
    feedbackEl.innerHTML = (val || 0).toFixed(2);
    module[name] = val;
  });
}

/**
 * Creates an object to be used for
 * passing into the templating engine
 *
 * @api private
 */

function getRenderData (module) {
  var meta = module.meta || {};
  var data = {};

  data.name = module.meta.name;
  data.params = [];

  each(meta.params, function (values, prop) {
    var value = module[prop];
    value = value.toFixed ? value.toFixed(2) : value;
    data.params.push({
      name: prop,
      max: values.max,
      min: values.min,
      type: values.type,
      value: value
    });
  });

  return data;
}

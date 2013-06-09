/**
 * Module dependencies
 */

var
  each      = require('each'),
  dom       = require('dom'),
  domify    = require('domify'),
  hogan     = require('hogan'),
  Dial      = require('dial'),
  Button    = require('button'),
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
    } else if (type === 'enum') {
      control = createEnumDial(input, props, name, module, feedbackEl);
    } else if (type === 'bool') {
      control = createButton(input, name, module);
    }

    that.controls.push(control);
  });

  return this;
};

/**
 * Unbinds all the controls' event handlers
 *
 * @return {Rack}
 * @api public
 */

Rack.prototype.unbind = function () {
  each(this.controls || [], function (control) {
    control.destroy();
  });
  return this;
};

/**
 * Destroys rack element, unbinds all events
 *
 * @return {Rack}
 * @api public
 */

Rack.prototype.destroy = function () {
  this.unbind();
  if (this.el.parentElement) {
    parent.removeChild(this.el);
  }
  return this;
};

/**
 * Creates a dial for UI controls,
 * bound to the module's param
 * for number based inputs
 *
 * @param {HTMLInputElement} inputEl
 * @param {Object} props
 * @param {String} name
 * @param {Object} module
 * @param {HTMLDivElement} feedbackEl
 * @return {Dial}
 * @api private
 */

function createDial (inputEl, props, name, module, feedbackEl) {
  var dial = new Dial(inputEl, {
    min: props.min,
    max: props.max,
    value: module[name],
    float: props.type === 'float'
  });

  dial.on('change', function (val) {
    val = (val || 0).toFixed(2);
    val = props.type === 'int' ? parseInt(val) : val;
    feedbackEl.innerHTML = val;
    module[name] = val;
  }).emit('change', module[name]);

  return dial;
}

/**
 * Creates a dial for UI controls,
 * bound to the module's param
 * for enumerator based inputs
 *
 * @param {HTMLInputElement} inputEl
 * @param {Object} props
 * @param {String} name
 * @param {Object} module
 * @param {HTMLDivElement} feedbackEl
 * @return {Dial}
 * @api private
 */

function createEnumDial (inputEl, props, name, module, feedbackEl) {
  var values = props.values || [];
  var current = ~values.indexOf(module[name])
    ? values.indexOf(module[name])
    : values.indexOf(props.defaultValue);

  var dial = new Dial(inputEl, {
    min: 0,
    max: values.length - 1,
    value: current,
    float: false
  });

  dial.on('change', function (val) {
    val = values[val];
    feedbackEl.innerHTML = val;
    module[name] = val;
  }).emit('change', current);

  return dial;
}

/**
 * Creates a button for UI controls,
 * bound to the module's param
 *
 * @param {HTMLInputElement} inputEl
 * @param {String} name
 * @param {Object} module
 * @return {Button}
 * @api private
 */

function createButton (inputEl, name, module) {
  var button = new Button(inputEl, !!module[name]);

  button.on('change', function (val) {
    module[name] = !!val;
  }).emit('change', !!module[name]);

  return button;
}

/**
 * Creates an object to be used for
 * passing into the templating engine
 *
 * @return {Object}
 * @api private
 */

function getRenderData (module) {
  var meta = module.meta || {};
  var data = {};

  data.name = format(module.meta.name);
  data.params = [];

  each(meta.params, function (values, prop) {
    var value = module[prop];
    value = value.toFixed ? value.toFixed(2) : value;
    data.params.push({
      name: prop,
      max: values.max,
      min: values.min,
      type: values.type,
      value: value,
      inputType: values.type === 'bool'
        ? 'checkbox'
        : 'number'
    });
  });

  return data;
}

/**
 * Strips white space, converts to hyphens
 *
 * @param {String} string
 * @return {String}
 * @api private
 */

function format (string) {
  return (string || '').replace(/ /g, '-');
}

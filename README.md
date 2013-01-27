rack
====

GUI for your web audio components

**Rack** autogenerates a GUI for your web audio components following the [web audio components spec](http://).

## Installation

`component install web-audio-components/rack`

## API

Most of the Rack methods are used internally, and on instantiation, the element to be injected into the DOM for use is in the instance's `el` property.

### new Rack(module)

Instantiates a new `rack` hooked into a web audio component instance `module`

### Rack#render()

Generates the property `el` on the `Rack` instance with the DOM element to be injected on the page. Called during instantiation already.

### Rack#bind()

Creates and binds the UI components (buttons and dials) in the `el` property. Called during instnatiation already.

### Rack#unbind()

Unbinds all of the UI components (buttons and dials) in the `el` property. Called during `destroy`.

### Rack#destroy()

Calls `unbind` and removes the related element from the DOM if in the DOM.

## Example

```js
var Rack  = require('rack');
var Delay = require('web-audio-components-delay');
var ctx   = new AudioContext();

var delay = new Delay(ctx);
var rack  = new Rack(delay);

document.getElementById('container').appendChild(rack.el);
```

## Example

View the [example](http://web-audio-components.github.com/rack) or check out the repo and run `component install --dev && component build --dev` and view the example page.

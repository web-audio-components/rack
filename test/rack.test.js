var Rack  = require('rack');
var Delay = require('web-audio-components-delay');
var allen = require('jsantell-allen/allen.js');
var ctx   = allen.getAudioContext();
var expectedHTML = '<div class="rack-container rack-container-delay"><div class="rack-logo"></div><div class="rack-name">delay</div><div class="rack-params"><div class="rack-param"><div class="rack-param-name">delay</div><div class="rack-param-control"><div class="rack-param-control-float"></div></div><div class="rack-param-value">1</div></div><div class="rack-param"><div class="rack-param-name">feedback</div><div class="rack-param-control"><div class="rack-param-control-float"></div></div><div class="rack-param-value">0.5</div></div></div></div>';

describe('Rack', function () {
  
  beforeEach(function () {
    this.delay = new Delay(ctx);
    this.rack = new Rack(this.delay);
  });

  describe('constructor', function () {
    it('calls render on instantiation');
  });

  describe('render', function () {
    it('creates the el property with element', function () {
      this.rack.render();
      expect(this.rack.el).to.be.instanceOf(window.HTMLDivElement);
      expect(this.rack.el.outerHTML).to.equal(expectedHTML);
    });
    it('returns rack instance', function () {
      var ret = this.rack.render();
      expect(ret).to.equal(this.rack);
    });
  });

  describe('bind', function () {});

  describe('getRenderData', function () {
    it('returns name and parameter data', function () {
      var data = this.rack.getRenderData();
      expect(data.name).to.equal('delay');
      expect(data.params.length).to.equal(2);
    });

    it('returns all parameter data', function () {
      var data = this.rack.getRenderData();
      expect(data.params[1].name).to.equal('feedback');
      expect(data.params[1].min).to.equal(0);
      expect(data.params[1].max).to.equal(1);
      expect(data.params[1].default).to.equal(0.5);
      expect(data.params[1].type).to.equal('float');
    });
  });
});

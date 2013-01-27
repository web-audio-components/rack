module.exports =
'<div class="rack-container rack-container-{{name}}">' +
  '<div class="rack-logo"></div>' +
  '<div class="rack-text">' +
    '<div class="rack-name">{{name}}</div>' +
    '<div class="rack-logo-text">Web Audio Component</div>' +
  '</div>' +
  '<ul class="rack-params">' +
    '{{#params}}' +
      '<li class="rack-param">' +
        '<div class="rack-param-name">{{name}}</div>' +
        '<div class="rack-param-control">' +
          '<input type="number" class="rack-param-input-{{name}}" ' +
            'data-type="{{type}}" data-name="{{name}}" value="{{value}}" />' +
        '</div>' +
        '<div class="rack-param-value rack-param-value-{{name}}"></div>' +
      '</li>' +
    '{{/params}}' +
  '</ul>' +
'</div>';

module.exports =
'<div class="rack-container rack-container-{{name}}">' +
  '<div class="rack-logo"></div>' +
  '<div class="rack-name">{{name}}</div>' +
  '<div class="rack-params">' +
    '{{#params}}' +
      '<div class="rack-param">' +
        '<div class="rack-param-name">{{name}}</div>' +
        '<div class="rack-param-control">' +
          '<div class="rack-param-control-{{type}}"></div>' +
        '</div>' +
        '<div class="rack-param-value">{{value}}</div>' +
      '</div>' +
    '{{/params}}' +
  '</div>' +
'</div>';

module.exports =
'<div class="rack-container rack-container-{{name}}">' +
  '<div class="rack-logo"></div>' +
  '<div class="rack-name">{{name}}</div>' +
  '<div class="rack-params">' +
    '{{#params}}' +
      '<div class="rack-param">' +
        '<div class="rack-param-name">{{name}}</div>' +
        '<div class="rack-param-control">' +
          '<input type="number" class="rack-param-input-{{name}}" ' +
            'data-type="{{type}}" data-name="{{name}}" />' +
        '</div>' +
        '<div class="rack-param-value rack-param-value-{{name}}">{{value}}</div>' +
      '</div>' +
    '{{/params}}' +
  '</div>' +
'</div>';

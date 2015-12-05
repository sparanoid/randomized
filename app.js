"use strict";

var getInputValue = function(el) {
  return document.getElementById(el).value;
}

var setInputValue = function(el) {
  return document.getElementById(el).value;
}

var setScheme = function(method, el) {
  var regex = /^([0-9a-f]{3}){1,2}$/i;
  var scheme = [
    getInputValue('code-color'),
    getInputValue('link-color'),
    getInputValue('bg-color')
  ];

  if (method === 'init') {
    console.log('hash');
    if (window.location.hash) {
      scheme = window.location.hash.replace(/^#/, '').split(',');
    }
  }

  if (method === 'present') {
    console.log('present');
    scheme = el.dataset.scheme.split(',');
  }

  if (method === 'picker') {
    // getInputValue('code-color', scheme[0]);
    // getInputValue('link-color', scheme[1]);
    // getInputValue('bg-color', scheme[2]);
  }

  // Set colors based on scheme
  var
    code = scheme[0],
    link = scheme[1],
    bg = scheme[2];

  // Validate and update scheme
  if (regex.test(code) && regex.test(link) && regex.test(bg) ) {
    less.modifyVars({
      '@code-color': '#' + code,
      '@link-color': '#' + link,
      '@bg-color': '#' + bg
    });
  } else {
    console.log('Scheme invalid');
  }

  // Set URL hash
  window.location.hash = '#' + code + ',' + link + ',' + bg;
}
setScheme('init');

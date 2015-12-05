var getInputValue = function(el) {
  return document.getElementById(el).value;
}

var setSchemeFromButton = function(el) {
  var scheme = el.dataset.scheme.split(',');
  var
    code = scheme[0],
    link = scheme[1],
    bg = scheme[2];

  setScheme(code, link, bg);
}

var setSchemeFromHash = function() {
  var scheme = window.location.hash.replace(/^#/, '').split(',');
  var regex = /^([0-9a-f]{3}){1,2}$/i;
  var
    code = scheme[0],
    link = scheme[1],
    bg = scheme[2];

  if (regex.test(code) && regex.test(link) && regex.test(bg) ) {
    setScheme(code, link, bg);
  } else {
    setScheme();
  }
}

var setScheme = function(code, link, bg) {
  var
    code = code || getInputValue('code-color'),
    link = link || getInputValue('link-color'),
    bg = bg || getInputValue('bg-color');

  less.modifyVars({
    '@code-color': '#' + code,
    '@link-color': '#' + link,
    '@bg-color': '#' + bg
  });

  window.location.hash = '#' + code + ',' + link + ',' + bg;
}

if (window.location.hash) {
  setSchemeFromHash();
} else {
  setScheme();
}

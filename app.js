// This app is powered by React and Reflux for a more immersive experience,
// just kidding.
var setScheme = (method, el) => {
  'use strict';

  // Helpers
  var getEl = (el) => {
    return document.getElementById(el) || document.querySelectorAll(el);
  };

  var isHex = (colors) => {
    return re.test(colors[0]) && re.test(colors[1]) && re.test(colors[2]);
  };

  var isScheme = (scheme) => {
    return re.test(scheme.code) && re.test(scheme.link) && re.test(scheme.bg);
  };

  var updateScheme = (scheme, arr) => {
    scheme.code = arr[0];
    scheme.link = arr[1];
    scheme.bg = arr[2];
  };

  var updateSchemeButtons = (scheme) => {
    getEl('code-color-btn').jscolor.fromString(scheme.code);
    getEl('link-color-btn').jscolor.fromString(scheme.link);
    getEl('bg-color-btn').jscolor.fromString(scheme.bg);
  };

  var updateSchemeInputs = (scheme) => {
    getEl('code-color').value = scheme.code;
    getEl('link-color').value = scheme.link;
    getEl('bg-color').value = scheme.bg;
  };

  var updateLess = (scheme) => {
    if (isScheme(scheme)) {
      less.modifyVars({
        '@code-color': `#${scheme.code}`,
        '@link-color': `#${scheme.link}`,
        '@bg-color': `#${scheme.bg}`
      });
    } else {
      console.log('Scheme invalid');
    }
  };

  var updateUrl = (scheme) => {
    window.location.hash = `#${scheme.code}-${scheme.link}-${scheme.bg}`;
  };

  var updateTitle = (scheme) => {
    document.title = `Randomized - #${scheme.code} #${scheme.link} #${scheme.bg} - Sparanoid`;
  };

  var updateSharerUrl = (scheme) => {
    var shares = getEl('.sharer');
    var title = `Randomized by Sparanoid: Erratic colors for machines and people #${scheme.code} #${scheme.link} #${scheme.bg}`;
    var url = window.location.href;
    for (let i = 0; i < shares.length; i++) {
      shares[i].setAttribute('data-title', title);
      shares[i].setAttribute('data-url', url);
    }
  };

  var updateLessToDom = () => {
    // https://regex101.com/r/SNWrBz/3
    var re = /\/\*!(?: BEGIN: app-only)[\s\S]*(?: END: app-only \*\/)/i;
    var lessDom = localStorage[`${window.location.origin}/app.less`];
    getEl('generated-styles').innerHTML = lessDom.replace(re, '');
  };

  var update = (scheme, colors, updateButtons = false) => {
    updateScheme(scheme, colors);
    updateSchemeInputs(scheme);

    // Button color and background cannot be triggered automatically when input
    // changes, need force update
    if (updateButtons) {
      updateSchemeButtons(scheme);
    }

    updateLess(scheme);
    updateUrl(scheme);
    updateTitle(scheme);
    updateSharerUrl(scheme);
    updateLessToDom();
    // window.setTimeout(updateLessToDom(), 2000);
  };

  // Variables
  const re = /^([0-9a-f]{3}){1,2}$/i;
  const defaultColors = ['00cc80', 'a212d1', 'ffffff'];
  const scheme = {
    code: getEl('code-color').value,
    link: getEl('link-color').value,
    bg: getEl('bg-color').value
  };
  var colors = [];

  var setColorsFromHash = () => {
    if (window.location.hash) {
      let hash = window.location.hash.replace(/^#/, '').split('-');
      if (isHex(hash)) {
        colors = hash;
      } else {
        colors = defaultColors;
      }
    } else {
      colors = defaultColors;
    }
  };

  // Init on page load
  if (method === 'init') {
    setColorsFromHash();
    update(scheme, colors);
  }

  // Get scheme from predefined colors
  if (method === 'present') {
    let colors = el.dataset.scheme.split('-');
    update(scheme, colors, true);
  }

  // Get scheme from color picker, fire immediately
  if (method === 'picker') {
    updateLess(scheme);
  }

  // Update URL hash and title when scheme changes via color picker
  if (method === 'post-picker') {
    updateUrl(scheme);
    updateTitle(scheme);
  }

  // Update scheme when URL hash changes
  if (('onhashchange' in window)) {
    window.onhashchange = () => {
      setColorsFromHash();
      update(scheme, colors, true);
    };
  }
};

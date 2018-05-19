'use strict';

var load = (function () {
  function _load(tag) {
    return function (url) {
      // This promise will be used by Promise.all to determine success or failure
      return new Promise(function (resolve, reject) {
        var element = document.createElement(tag);
        var parent = 'body';
        var attr = 'src';

        // Important success and error for the promise
        element.onload = function () {
          resolve(url);
        };
        element.onerror = function () {
          reject(url);
        };

        // Need to set different attributes depending on tag type
        switch (tag) {
          case 'script':
            element.async = true;
            element.charset = "UTF8";
            break;
          case 'link':
            element.type = 'text/css';
            element.rel = 'stylesheet';
            attr = 'href';
            parent = 'head';
        }

        // Inject into document to kick off loading
        element[attr] = url;
        document[parent].appendChild(element);
      });
    };
  }

  return {
    css: _load('link'),
    js: _load('script'),
    img: _load('img')
  };

})();

window._load = load;

var loadModulesList = [
  _load.js('.dist/vendors.bundle.js')
];

Promise.all(loadModulesList)
  .then(function () {
    Promise.all([
      _load.js('.dist/app.bundle.js')
    ])
      .then(function () {
        angular.element(document).ready(function () {
          angular.bootstrap(document.body, ['project']);
        });
      }).catch(function (err) {
        console.log('Oh no, epic failure 2!' + err);
      });
  }).catch(function (err) {
    console.log('Oh no, epic failure 1!' + err);
  });
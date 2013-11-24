define(['underscore', 'chaplin'], function(_, Chaplin) {
  'use strict';
  var utils;
  utils = Chaplin.utils.beget(Chaplin.utils);
  _(utils).extend({
    setCookie: function(key, value) {
      return console.debug("Setting cookie : " + key + " -> " + value);
    }
  });
  return utils;
});

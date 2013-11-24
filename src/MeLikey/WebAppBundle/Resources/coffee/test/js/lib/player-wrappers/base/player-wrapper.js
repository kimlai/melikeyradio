define(['underscore'], function(_) {
  'use strict';
  var PlayerWrapper;
  return PlayerWrapper = (function() {
    function PlayerWrapper(options) {
      if (options == null) {
        options = {};
      }
      _.extend(this, _.pick(options, ['autoplay', 'onError', 'onReady', 'onFinish', 'onCurrentTimeChange', 'onBufferChange', 'onDurationChange']));
      this;
    }

    PlayerWrapper.prototype.initialize = function(options) {
      if (options == null) {
        options = {};
      }
      return _.extend(this, _.pick(options, ['autoplay', 'onError', 'onReady', 'onFinish', 'onCurrentTimeChange', 'onBufferChange', 'onDurationChange']));
    };

    PlayerWrapper.prototype.onError = function() {};

    PlayerWrapper.prototype.onReady = function() {};

    PlayerWrapper.prototype.onFinish = function() {};

    PlayerWrapper.prototype.onCurrentTimeChange = function() {};

    PlayerWrapper.prototype.onBufferChange = function() {};

    PlayerWrapper.prototype.onDurationChange = function() {};

    return PlayerWrapper;

  })();
});

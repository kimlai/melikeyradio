var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['soundcloudSDK', 'lib/player-wrappers/base/player-wrapper'], function(SC, PlayerWrapper) {
  'use strict';
  var SoundcloudWrapper;
  return SoundcloudWrapper = (function(_super) {
    __extends(SoundcloudWrapper, _super);

    function SoundcloudWrapper(options) {
      if (options == null) {
        options = {};
      }
      this.whileloading = __bind(this.whileloading, this);
      this.whileplaying = __bind(this.whileplaying, this);
      SoundcloudWrapper.__super__.constructor.apply(this, arguments);
      _.extend(this, _.pick(options, ['soundcloudUrl']));
      this;
    }

    SoundcloudWrapper.prototype.initialize = function(options) {
      if (options == null) {
        options = {};
      }
      SoundcloudWrapper.__super__.initialize.apply(this, arguments);
      _.extend(this, _.pick(options, ['soundcloudUrl']));
      if (!this.soundcloudUrl) {
        throw new Error("initialize expects a soundcloudUrl option");
      }
    };

    SoundcloudWrapper.prototype.initializeEngine = function(callback) {
      var _this = this;
      console.debug("SoundcloudWrapper.initializeEngine");
      callback || (callback = function() {});
      return SC.get('https://api.soundcloud.com/resolve', {
        url: this.soundcloudUrl
      }, function(response, error) {
        var params;
        if (error == null) {
          console.debug("soundcloud api success");
          console.debug(response);
          params = {
            autoPlay: false,
            onfinish: _this.onFinish,
            whileplaying: _this.whileplaying,
            whileloading: _this.whileloading
          };
          return SC.stream(response.stream_url, params, function(sound) {
            _this.engine = sound;
            _this.onReady();
            return callback(null, _this);
          });
        } else {
          console.error(error);
          _this.onError("The track url could not be resolved :( That means 404...");
          return callback();
        }
      });
    };

    SoundcloudWrapper.prototype.play = function() {
      return this.engine.play();
    };

    SoundcloudWrapper.prototype.pause = function() {
      return this.engine.pause();
    };

    SoundcloudWrapper.prototype.seekTo = function(time) {
      return this.engine.setPosition(time);
    };

    SoundcloudWrapper.prototype.whileplaying = function() {
      this.onDurationChange(this.engine.durationEstimate);
      return this.onCurrentTimeChange(this.engine.position);
    };

    SoundcloudWrapper.prototype.whileloading = function() {
      return this.onBufferChange(this.engine.bytesLoaded / this.engine.bytesTotal);
    };

    SoundcloudWrapper.prototype.destroyEngine = function() {
      if (this.engine == null) {
        return;
      }
      this.engine.destruct();
      return delete this.engine;
    };

    return SoundcloudWrapper;

  })(PlayerWrapper);
});

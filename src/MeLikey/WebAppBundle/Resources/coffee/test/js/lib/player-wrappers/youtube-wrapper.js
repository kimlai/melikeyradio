var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['jquery', 'lib/player-wrappers/base/player-wrapper'], function($, PlayerWrapper) {
  'use strict';
  var YoutubeWrapper;
  return YoutubeWrapper = (function(_super) {
    __extends(YoutubeWrapper, _super);

    function YoutubeWrapper(options) {
      if (options == null) {
        options = {};
      }
      YoutubeWrapper.__super__.constructor.apply(this, arguments);
      _.extend(this, _.pick(options, ['youtubeID']));
      this;
    }

    YoutubeWrapper.prototype.initialize = function(options) {
      if (options == null) {
        options = {};
      }
      YoutubeWrapper.__super__.initialize.apply(this, arguments);
      _.extend(this, _.pick(options, ['youtubeID']));
      if (!this.youtubeID) {
        throw new Error("initialize expects a youtubeID option");
      }
    };

    YoutubeWrapper.prototype.initializeEngine = function(callback) {
      var iframeHolder, params, wrapper, ytPlayer;
      callback || (callback = function() {});
      iframeHolder = $('#youtube_melikey_' + this.youtubeID);
      if (!(iframeHolder.length > 0)) {
        $('<div />', {
          id: 'youtube_melikey_' + this.youtubeID
        }).appendTo('body');
      }
      params = {
        showinfo: 0,
        controls: 1,
        autoplay: 0
      };
      wrapper = this;
      ytPlayer = new YT.Player('youtube_melikey_' + this.youtubeID, {
        width: 300,
        height: 300,
        videoId: this.youtubeID,
        playerVars: params,
        events: {
          onReady: function() {
            return wrapper.onYoutubePlayerReady(callback);
          }
        }
      });
      return this.engine = ytPlayer;
    };

    YoutubeWrapper.prototype.play = function() {
      return this.engine.playVideo();
    };

    YoutubeWrapper.prototype.pause = function() {
      return this.engine.pauseVideo();
    };

    YoutubeWrapper.prototype.seekTo = function(time) {
      return this.engine.seekTo(time);
    };

    YoutubeWrapper.prototype.destroyEngine = function() {
      if (this.engine == null) {
        return;
      }
      clearInterval(this.intervalID);
      this.engine.destroy();
      return delete this.engine;
    };

    YoutubeWrapper.prototype.onYoutubePlayerReady = function(callback) {
      var _this = this;
      this.onDurationChange(this.engine.getDuration());
      this.engine.addEventListener('onError', this.onError);
      this.engine.addEventListener('onStateChange', function(event) {
        switch (event.data) {
          case 0:
            _this.onFinish();
            return clearInterval(_this.intervalID);
          case 1:
            _this.onCurrentTimeChange(_this.engine.getCurrentTime());
            _this.onBufferChange(_this.engine.getVideoLoadedFraction());
            clearInterval(_this.intervalID);
            return _this.intervalID = setInterval((function() {
              _this.onCurrentTimeChange(_this.engine.getCurrentTime());
              return _this.onBufferChange(_this.engine.getVideoLoadedFraction());
            }), 1000);
          case 2:
            return clearInterval(_this.intervalID);
          case 3:
            return clearInterval(_this.intervalID);
        }
      });
      this.onReady();
      return callback(null, this);
    };

    return YoutubeWrapper;

  })(PlayerWrapper);
});

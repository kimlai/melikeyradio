var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['models/player'], function(Player) {
  'use strict';
  var YoutubePlayer, _ref;

  return YoutubePlayer = (function(_super) {
    __extends(YoutubePlayer, _super);

    function YoutubePlayer() {
      this.pauseMethod = __bind(this.pauseMethod, this);      _ref = YoutubePlayer.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    YoutubePlayer.prototype.type = 'youtube';

    YoutubePlayer.prototype.initialize = function(params) {
      var iframeHolder, player, youtubeID, ytPlayer;

      YoutubePlayer.__super__.initialize.apply(this, arguments);
      player = this;
      youtubeID = params.youtubeID;
      this.youtubeID = youtubeID;
      iframeHolder = $('#youtube_melikey_' + youtubeID);
      if (!(iframeHolder.length > 0)) {
        $('<div />', {
          id: 'youtube_melikey_' + youtubeID
        }).appendTo('body');
      }
      params = {
        showinfo: 0,
        controls: 1,
        autoplay: 0
      };
      ytPlayer = new YT.Player('youtube_melikey_' + youtubeID, {
        width: 300,
        height: 300,
        videoId: youtubeID,
        playerVars: params,
        events: {
          onReady: function() {
            return player.onYoutubePlayerReady();
          },
          onError: function() {
            return player.onError();
          }
        }
      });
      return this.player = ytPlayer;
    };

    YoutubePlayer.prototype.dispose = function() {
      if (this.disposed) {
        return;
      }
      clearInterval(this.intervalID);
      this.player.destroy();
      $('#youtube_melikey_' + this.youtubeID).remove();
      return YoutubePlayer.__super__.dispose.apply(this, arguments);
    };

    YoutubePlayer.prototype.playMethod = function() {
      return this.player.playVideo();
    };

    YoutubePlayer.prototype.pauseMethod = function() {
      return this.player.pauseVideo();
    };

    YoutubePlayer.prototype.seekTo = function(time) {
      this.player.seekTo(time);
      return YoutubePlayer.__super__.seekTo.apply(this, arguments);
    };

    YoutubePlayer.prototype.onTrackFinish = function() {
      clearInterval(this.intervalID);
      return YoutubePlayer.__super__.onTrackFinish.apply(this, arguments);
    };

    YoutubePlayer.prototype.onYoutubePlayerReady = function() {
      var player,
        _this = this;

      player = this.player;
      this.onDurationSet(player.getDuration());
      player.addEventListener('onStateChange', function(event) {
        switch (event.data) {
          case 0:
            _this.onFinish();
            return clearInterval(_this.intervalID);
          case 1:
            _this.onCurrentTimeChange(player.getCurrentTime());
            clearInterval(_this.intervalID);
            return _this.intervalID = setInterval(function() {
              _this.onCurrentTimeChange((_this.get('currentTime')) + 2);
              return _this.onBufferChange(player.getVideoLoadedFraction());
            }, 2000);
          case 2:
            return clearInterval(_this.intervalID);
          case 3:
            return clearInterval(_this.intervalID);
        }
      });
      return this.onReady();
    };

    return YoutubePlayer;

  })(Player);
});

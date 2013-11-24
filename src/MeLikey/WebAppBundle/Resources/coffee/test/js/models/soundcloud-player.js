var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['models/player', 'soundcloudSDK'], function(Player, SC) {
  'use strict';
  var SoundcloudPlayer, _ref;

  return SoundcloudPlayer = (function(_super) {
    __extends(SoundcloudPlayer, _super);

    function SoundcloudPlayer() {
      _ref = SoundcloudPlayer.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    SoundcloudPlayer.prototype.type = 'soundcloud';

    SoundcloudPlayer.prototype.initialize = function(params, options) {
      var _this = this;

      SoundcloudPlayer.__super__.initialize.apply(this, arguments);
      return SC.get('/resolve', {
        url: params.url
      }, function(response) {
        var player;

        if (response.errors != null) {
          _this.onError();
          return console.error('Track could not be found.');
        } else {
          player = _this;
          player.onDurationSet(response.duration);
          params = {
            autoPlay: false,
            onfinish: function() {
              return player.onFinish();
            },
            whileplaying: function() {
              return player.onCurrentTimeChange(this.position);
            },
            whileloading: function() {
              return player.onBufferChange(this.bytesLoaded / this.bytesTotal);
            }
          };
          return SC.stream('/tracks/' + response.id, params, function(sound) {
            player.player = sound;
            return player.onReady();
          });
        }
      });
    };

    SoundcloudPlayer.prototype.dispose = function() {
      if (this.disposed) {
        return;
      }
      this.player.destruct();
      return SoundcloudPlayer.__super__.dispose.apply(this, arguments);
    };

    SoundcloudPlayer.prototype.playMethod = function() {
      return this.player.play();
    };

    SoundcloudPlayer.prototype.pauseMethod = function() {
      return this.player.pause();
    };

    SoundcloudPlayer.prototype.seekTo = function(time) {
      return this.player.setPosition(time);
    };

    return SoundcloudPlayer;

  })(Player);
});

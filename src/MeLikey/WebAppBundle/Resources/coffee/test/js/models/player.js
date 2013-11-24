var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['models/base/model', 'lib/player-wrappers/soundcloud-wrapper', 'lib/player-wrappers/youtube-wrapper', 'lib/player-wrappers/vimeo-wrapper'], function(Model, SoundcloudWrapper, YoutubeWrapper, VimeoWrapper) {
  'use strict';
  var Player, _ref;
  return Player = (function(_super) {
    __extends(Player, _super);

    function Player() {
      this.onDurationChange = __bind(this.onDurationChange, this);
      this.onBufferChange = __bind(this.onBufferChange, this);
      this.onCurrentTimeChange = __bind(this.onCurrentTimeChange, this);
      this.onError = __bind(this.onError, this);
      this.onFinish = __bind(this.onFinish, this);
      this.onReady = __bind(this.onReady, this);
      _ref = Player.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    Player.prototype.defaults = {
      duration: 0,
      loaded: 0,
      currentTime: 0,
      playing: false,
      ready: false
    };

    Player.prototype.autoplay = false;

    Player.prototype.playerWrapper = null;

    Player.prototype.initialize = function(attributes, options) {
      console.debug("Player.initialize");
      Player.__super__.initialize.apply(this, arguments);
      options || (options = {});
      _.extend(this, _.pick(options, 'autoplay', 'soundcloud', 'youtube', 'vimeo'));
      return this.initializePlayerWrapper();
    };

    Player.prototype.initializePlayerWrapper = function() {
      var params;
      console.debug("Player.initializePlayerWrapper");
      params = {
        autoplay: this.autoplay,
        onError: this.onError,
        onReady: this.onReady,
        onFinish: this.onFinish,
        onCurrentTimeChange: this.onCurrentTimeChange,
        onBufferChange: this.onBufferChange,
        onDurationChange: this.onDurationChange
      };
      if (this.soundcloud != null) {
        this.playerWrapper = new SoundcloudWrapper(_.extend(params, {
          soundcloudUrl: this.soundcloud
        }));
      } else if (this.youtube != null) {
        this.playerWrapper = new YoutubeWrapper(_.extend(params, {
          youtubeID: this.youtube
        }));
      } else if (this.vimeo != null) {
        this.playerWrapper = new VimeoWrapper(_.extend(params, {
          vimeoID: this.vimeo
        }));
      } else {
        throw new Error("Unknown Track type, no compatible player found...");
      }
      return this.playerWrapper.initializeEngine();
    };

    Player.prototype.onReady = function() {
      this.set('ready', true);
      if (this.autoplay) {
        return this.play();
      }
    };

    Player.prototype.play = function() {
      if (this.disposed || (this.get('playing')) || !this.get('ready')) {
        return;
      }
      this.playerWrapper.play();
      return this.set('playing', true);
    };

    Player.prototype.pause = function() {
      if (this.disposed || !(this.get('playing')) || !this.get('ready')) {
        return;
      }
      this.playerWrapper.pause();
      return this.set('playing', false);
    };

    Player.prototype.seekTo = function(time) {
      return this.playerWrapper.seekTo(time);
    };

    Player.prototype.onFinish = function() {
      return this.trigger('Player:end', this);
    };

    Player.prototype.onError = function() {
      return this.trigger('Player:error', this);
    };

    Player.prototype.onCurrentTimeChange = function(time) {
      return this.set('currentTime', time);
    };

    Player.prototype.onBufferChange = function(buffer) {
      return this.set('loaded', buffer);
    };

    Player.prototype.onDurationChange = function(duration) {
      return this.set('duration', duration);
    };

    Player.prototype.dispose = function() {
      if (this.disposed) {
        return;
      }
      if (this.playerWrapper != null) {
        this.playerWrapper.destroyEngine();
      }
      delete this.playerWrapper;
      return Player.__super__.dispose.apply(this, arguments);
    };

    return Player;

  })(Model);
});

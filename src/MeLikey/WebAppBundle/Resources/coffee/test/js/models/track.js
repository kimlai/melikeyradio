var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['models/base/model', 'models/player'], function(Model, Player) {
  'use strict';
  var Track;
  return Track = (function(_super) {
    __extends(Track, _super);

    Track.vault = {};

    Track.addToVault = function(track) {
      var _base, _name;
      return (_base = Track.vault)[_name = track.id] || (_base[_name] = track);
    };

    Track.removeFromVault = function(track) {
      return delete Track.vault[track.id];
    };

    Track.flushVault = function() {
      return Track.vault = {};
    };

    Track.prototype.autoplay = false;

    Track.prototype.player = null;

    Track.prototype.urlRoot = Routing.generate('melikey_api_get_tracks');

    function Track(attributes, options) {
      var id;
      id = attributes.id;
      if (Track.vault[id]) {
        return Track.vault[id];
      }
      options || (options = {});
      if (options.addToVault) {
        Track.vault[id] = this;
      }
      Track.__super__.constructor.apply(this, arguments);
    }

    Track.prototype.initialize = function(attributes, options) {
      Track.__super__.initialize.apply(this, arguments);
      options || (options = {});
      options = _.pick(options, 'autoplay');
      _.extend(this, options);
      this.initializePlayer();
      return this.once('change:soundcloud change:youtube change:vimeo', this.initializePlayer);
    };

    Track.prototype.dispose = function() {
      if (this.disposed) {
        return;
      }
      if (Track.vault[this.id] == null) {
        if (this.player != null) {
          this.player.dispose();
        }
        return Track.__super__.dispose.apply(this, arguments);
      }
    };

    Track.prototype.initializePlayer = function(options) {
      var player;
      console.debug("Track.initializePlayer");
      player = this.player;
      if (player == null) {
        this.player = new Player({}, _.extend(this.getAttributes(), {
          autoplay: this.autoplay
        }));
        this.listenTo(this.player, 'change:playing', this.onPlayerPlayStateChange);
        this.listenTo(this.player, 'change:ready', this.onPlayerReadyStateChange);
        this.listenTo(this.player, 'Player:end', this.onPlayerFinish);
        return this.listenTo(this.player, 'Player:error', this.onPlayerError);
      }
    };

    Track.prototype.play = function() {
      console.debug("Track.play");
      if (this.player.get('ready')) {
        return this.player.play();
      } else {
        return this.listenToOnce(this.player, 'change:ready', this.play);
      }
    };

    Track.prototype.onPlayerError = function() {
      return this.publishEvent('Track:error', this);
    };

    Track.prototype.onPlayerPlayStateChange = function() {
      if (this.player.get('playing')) {
        console.debug("coucou");
        return this.publishEvent('Track:play', this);
      }
    };

    Track.prototype.onPlayerFinish = function() {
      return this.publishEvent('Track:end', this);
    };

    Track.prototype.onPlayerReadyStateChange = function() {
      if (this.player.get('ready')) {
        return this.trigger('Track:playerReady', this.player);
      }
    };

    return Track;

  })(Model);
});

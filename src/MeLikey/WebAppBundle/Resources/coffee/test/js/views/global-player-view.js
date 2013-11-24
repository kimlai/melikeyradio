var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['models/track', 'models/tracks', 'views/track-view', 'views/player-controls-view', 'views/playlist-view', 'templates/global-player', 'lib/utils'], function(Track, Tracks, TrackView, PlayerControlsView, PlaylistView, template, utils) {
  'use strict';
  var GlobalPlayerView, _ref;
  return GlobalPlayerView = (function(_super) {
    __extends(GlobalPlayerView, _super);

    function GlobalPlayerView() {
      _ref = GlobalPlayerView.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    GlobalPlayerView.prototype.className = 'player';

    GlobalPlayerView.prototype.autoRender = false;

    GlobalPlayerView.prototype.containerMethod = 'prepend';

    GlobalPlayerView.prototype.template = template;

    template = null;

    GlobalPlayerView.prototype.controls = false;

    GlobalPlayerView.prototype.seekbar = true;

    GlobalPlayerView.prototype.initialize = function(options) {
      GlobalPlayerView.__super__.initialize.apply(this, arguments);
      this.delegate('click', '.next', function() {
        return this.publishEvent('GlobalPlayer:next', this.model);
      });
      this.delegate('click', '.prev', function() {
        return this.publishEvent('GlobalPlayer:prev', this.model);
      });
      this.delegate('click', '.toggle-playlist', this.togglePlaylist);
      this.subscribeEvent("Track:play", this.onTrackPlay, this);
      return this.subscribeEvent("Track:error", this.onTrackError);
    };

    GlobalPlayerView.prototype.onTrackPlay = function(track) {
      if (track === this.model) {
        return;
      }
      if ((this.model != null) && track !== this.model) {
        this.model.player.pause();
        this.stopListening(this.model, 'Track:playerReady');
      }
      Track.addToVault(track);
      this.model = track;
      return this.render();
    };

    GlobalPlayerView.prototype.render = function() {
      var playerControlsView;
      GlobalPlayerView.__super__.render.apply(this, arguments);
      if (!((this.model != null) && (this.model.player != null))) {
        return;
      }
      playerControlsView = new PlayerControlsView({
        model: this.model.player,
        container: this.$el.find('.prev'),
        containerMethod: 'after',
        autoRender: true
      });
      return this.subview('player-controls', playerControlsView);
    };

    GlobalPlayerView.prototype.togglePlaylist = function() {
      return $('#main-footer').toggleClass('expanded');
    };

    GlobalPlayerView.prototype.onTrackError = function(track) {};

    return GlobalPlayerView;

  })(TrackView);
});

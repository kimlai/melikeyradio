var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['controllers/base/controller', 'models/tracks', 'views/global-player-view'], function(Controller, Tracks, GlobalPlayerView) {
  'use strict';
  var RadioController, _ref;

  return RadioController = (function(_super) {
    __extends(RadioController, _super);

    function RadioController() {
      _ref = RadioController.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    RadioController.prototype.playlistID = 1;

    RadioController.prototype.initialize = function(playlistID) {
      this.playlistID = playlistID;
      this.playlist = new Tracks(null, {
        url: '/Developpement.Web/Radio/Chaplin/web/app_dev.php/radiotracks'
      });
      this.compose('globalPlayer', GlobalPlayerView, {
        region: 'global-player'
      });
      this.view = this.compose('globalPlayer');
      this.subscribeEvent('Radio:next', this.next);
      return this.subscribeEvent('Radio:prev', this.prev);
    };

    RadioController.prototype.next = function(track) {
      var nextTrack;

      this.position = this.position + 1;
      nextTrack = this.playlist.next(track);
      if (nextTrack != null) {
        return nextTrack.player.play();
      } else {
        return this.loadNewTracks();
      }
    };

    RadioController.prototype.prev = function(track) {
      var prevTrack;

      this.position = this.position + 1;
      prevTrack = this.playlist.prev(track);
      if (prevTrack != null) {
        return prevTrack.player.play();
      } else {
        return this.loadNewTracks();
      }
    };

    RadioController.prototype.loadNewTracks = function() {
      var _this = this;

      console.debug("GlobalPlayerView::loadNewTracks()");
      return this.playlist.fetch({
        reset: true,
        data: {
          playlistID: this.playlistID,
          position: this.position
        },
        success: function(response) {
          _this.playlist = response;
          return _this.view.onNewRadioTracks(response);
        }
      });
    };

    return RadioController;

  })(Controller);
});

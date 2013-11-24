define(['chaplin', 'models/track', 'models/tracks', 'models/playlist', 'lib/utils'], function(Chaplin, Track, Tracks, Playlist, utils) {
  'use strict';
  var RadioManager;
  return RadioManager = (function() {
    _(RadioManager.prototype).extend(Chaplin.EventBroker);

    RadioManager.prototype.playlistID = 25;

    RadioManager.prototype.position = 0;

    RadioManager.prototype.playlist = null;

    function RadioManager(options) {
      _(this).extend(_.pick(options, ['playlistID', 'position']));
      this.playlist = new Playlist(null, {
        id: this.playlistID
      });
      this.playlist.on('remove', function(track) {
        Track.removeFromVault(track);
        return track.dispose();
      });
      this.subscribeEvent('Track:play', this.onTrackPlay);
      this.fetchTracks();
    }

    RadioManager.prototype.onTrackPlay = function(track) {
      var position;
      position = this.playlist.indexOf(track);
      if (position >= 0) {
        this.currentTrack = track;
        this.position += position - 6;
        utils.setCookie(this.playlistID, this.position);
        return this.publishEvent('Radio:newTrackPlaying', track);
      }
    };

    RadioManager.prototype.fetchTracks = function() {
      var _this = this;
      this.isSyncing = true;
      return this.playlist.fetch({
        set: {
          merge: false
        },
        success: function() {
          _this.isSyncing = false;
          if (_this.currentTrack == null) {
            _this.currentTrack = _this.playlist.at(0);
            return _this.currentTrack.play();
          }
        }
      });
    };

    RadioManager.prototype.prev = function(currentTrack) {
      var prevTrack;
      if (this.isSyncing) {
        return;
      }
      prevTrack = this.playlist.prev(currentTrack);
      if (prevTrack != null) {
        prevTrack.player.play();
        return this.publishEvent('Radio:newTrackPlaying', prevTrack);
      }
    };

    RadioManager.prototype.next = function(currentTrack) {
      var nextTrack;
      if (this.isSyncing) {
        return;
      }
      nextTrack = this.playlist.next(currentTrack);
      if (nextTrack != null) {
        nextTrack.player.play();
        return this.publishEvent('Radio:newTrackPlaying', nextTrack);
      }
    };

    return RadioManager;

  })();
});

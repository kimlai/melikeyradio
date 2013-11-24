var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['controllers/site-controller', 'models/track', 'models/tracks', 'views/track-view', 'views/tracks-view', 'views/playlist-view', 'models/tag', 'models/tags', 'views/tags-view'], function(SiteController, Track, Tracks, TrackView, TracksView, PlaylistView, Tag, Tags, TagsView) {
  'use strict';
  var TracksController, _ref;
  return TracksController = (function(_super) {
    __extends(TracksController, _super);

    function TracksController() {
      _ref = TracksController.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    TracksController.prototype.index = function(params) {
      var jokerTag,
        _this = this;
      $('#main-loader').addClass('loading');
      this.tracks = new Tracks();
      this.tracks.fetch({
        merge: false,
        success: function() {
          _this.view.renderAllItems();
          $('#main-loader').removeClass('loading');
          return _this.compose('playlist', PlaylistView, {
            region: 'playlist',
            collection: _this.tracks
          });
        }
      });
      jokerTag = new Tag({
        id: '*',
        name: 'Latest'
      });
      this.tags = new Tags([jokerTag]);
      this.tags.fetch({
        remove: false
      });
      return this.view = new TracksView({
        collection: this.tracks,
        renderItems: false,
        tags: this.tags
      });
    };

    TracksController.prototype.show = function(params) {
      var options;
      this.model = new Track({
        id: params.id
      }, {
        autoplay: true
      });
      options = {
        model: this.model,
        region: 'main',
        className: 'track big',
        seekbar: false
      };
      if (!this.model.get('title')) {
        $('#main-loader').addClass('loading');
        _.extend(options, {
          autoRender: false
        });
        this.model.fetch({
          success: function(track) {
            return $('#main-loader').removeClass('loading');
          }
        });
      }
      return this.view = new TrackView(options);
    };

    TracksController.prototype.next = function(track) {
      var nextTrack;
      if (!this.tracks) {
        return TracksController.__super__.next.apply(this, arguments);
      }
      nextTrack = this.tracks.next(track);
      if (nextTrack != null) {
        return nextTrack.player.play();
      } else {
        return console.debug("We need to load more track in the collection !");
      }
    };

    TracksController.prototype.prev = function(track) {
      var prevTrack;
      if (!this.tracks) {
        return TracksController.__super__.prev.apply(this, arguments);
      }
      prevTrack = this.tracks.prev(track);
      if (prevTrack != null) {
        return prevTrack.player.play();
      }
    };

    return TracksController;

  })(SiteController);
});

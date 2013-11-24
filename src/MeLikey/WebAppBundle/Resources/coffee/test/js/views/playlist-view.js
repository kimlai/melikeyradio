var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['views/base/collection-view', 'views/playlist-item-view', 'scrollbar'], function(CollectionView, PlaylistItemView) {
  'use strict';
  var PlaylistView, _ref;
  return PlaylistView = (function(_super) {
    __extends(PlaylistView, _super);

    function PlaylistView() {
      _ref = PlaylistView.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    PlaylistView.prototype.itemView = PlaylistItemView;

    PlaylistView.prototype.tagName = 'section';

    PlaylistView.prototype.className = 'playlist';

    PlaylistView.prototype.initialize = function() {
      this.on('addedToDOM', function() {
        return this.$el.mCustomScrollbar({
          horizontalScroll: true,
          mouseWheel: true,
          mouseWheelPixels: 300
        });
      });
      this.subscribeEvent('Radio:newTrackPlaying', this.scrollToTrack);
      return this.listenTo(this.collection, 'add remove', _.debounce(this.render, 1000));
    };

    PlaylistView.prototype.updateScrollbar = function() {
      return this.$el.mCustomScrollbar({
        horizontalScroll: true,
        mouseWheel: true,
        mouseWheelPixels: 300
      });
    };

    PlaylistView.prototype.scrollToTrack = function(track) {
      /* This is no good.
      pos = @collection.indexOf(track)
      @$el.mCustomScrollbar 'scrollTo', @$el.width()*pos / @collection.length/2
      */

    };

    return PlaylistView;

  })(CollectionView);
});

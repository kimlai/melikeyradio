var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['views/base/collection-view', 'views/compact-track-view', 'views/tags-view', 'models/track'], function(CollectionView, CompactTrackView, TagsView, Track) {
  'use strict';
  var TracksView, _ref;
  return TracksView = (function(_super) {
    __extends(TracksView, _super);

    function TracksView() {
      this.scroll = __bind(this.scroll, this);
      _ref = TracksView.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    TracksView.prototype.itemView = CompactTrackView;

    TracksView.prototype.region = 'main';

    TracksView.prototype.tagName = 'section';

    TracksView.prototype.className = 'tracks-list';

    TracksView.prototype.initialModels = null;

    TracksView.prototype.initialize = function(options) {
      options || (options = {});
      TracksView.__super__.initialize.apply(this, arguments);
      _.extend(this, _.pick(options, 'tags'));
      this.loading = false;
      this.offset = 9999999;
      this.on('visibilityChange', function() {
        var lastTrack;
        lastTrack = this.$el.find('.track:last');
        if (lastTrack.length > 0) {
          return this.offset = lastTrack.offset().top;
        } else {
          return this.offset = 9999999;
        }
      });
      $(window).scroll(_.debounce(this.scroll, 300));
      if (this.tags != null) {
        this.tagsView = new TagsView({
          collection: this.tags,
          container: this.el,
          containerMethod: 'prepend'
        });
        return this.listenTo(this.tagsView, 'Tag:click', this.filterByTag);
      }
    };

    TracksView.prototype.dispose = function() {
      if (this.disposed) {
        return;
      }
      $(window).off('scroll');
      this.off('visibilityChange');
      return TracksView.__super__.dispose.apply(this, arguments);
    };

    TracksView.prototype.scroll = function() {
      var $window;
      $window = $(window);
      if (this.offset - $window.height() <= $window.scrollTop() && !this.loading) {
        return this.loadTracks();
      }
    };

    TracksView.prototype.loadTracks = function() {
      var data,
        _this = this;
      this.loading = true;
      data = {
        offset: this.collection.length
      };
      if (this.activeTag != null) {
        _.extend(data, {
          tags: this.activeTag.get('id')
        });
      }
      return this.collection.fetch({
        data: data,
        remove: false,
        merge: false,
        success: function() {
          _this.loading = false;
          return _this.renderAllItems();
        }
      });
    };

    TracksView.prototype.filterByTag = function(tag) {
      var filtered;
      if (this.initialModels == null) {
        this.initialModels = this.collection.models;
        _.each(this.initialModels, function(track) {
          return Track.addToVault(track);
        });
      }
      this.collection.set(this.initialModels, {
        merge: false
      });
      if (tag.id === '*') {
        return this.activeTag = null;
      } else {
        filtered = this.collection.filterByTag(tag);
        this.collection.reset(filtered);
        this.activeTag = tag;
        return this.loadTracks();
      }
    };

    return TracksView;

  })(CollectionView);
});

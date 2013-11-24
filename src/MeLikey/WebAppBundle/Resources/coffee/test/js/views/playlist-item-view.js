var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['models/track', 'views/base/view', 'templates/playlist-item'], function(Track, View, template) {
  'use strict';
  var PlaylistItemView, _ref;
  return PlaylistItemView = (function(_super) {
    __extends(PlaylistItemView, _super);

    function PlaylistItemView() {
      _ref = PlaylistItemView.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    PlaylistItemView.prototype.autoRender = true;

    PlaylistItemView.prototype.tagName = 'article';

    PlaylistItemView.prototype.className = 'playlist-item';

    PlaylistItemView.prototype.template = template;

    template = null;

    PlaylistItemView.prototype.initialize = function() {
      if (this.model != null) {
        this.togglePlaying();
      }
      this.delegate('click', function() {
        if ((this.model.player != null) && this.model.player.get('ready')) {
          return this.model.player.play();
        }
      });
      return this.listenTo(this.model.player, 'change:playing', this.togglePlaying);
    };

    PlaylistItemView.prototype.togglePlaying = function() {
      if (this.model.player.get('playing')) {
        return this.$el.addClass('playing');
      } else {
        return this.$el.removeClass('playing');
      }
    };

    PlaylistItemView.prototype.getTemplateData = function() {
      if (this.model == null) {
        return;
      }
      return {
        track: this.model.getAttributes()
      };
    };

    return PlaylistItemView;

  })(View);
});

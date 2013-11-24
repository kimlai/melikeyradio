var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['models/track', 'views/track-view', 'views/player-controls-view', 'views/seekbar-view', 'templates/track-compact'], function(Track, TrackView, PlayerControlsView, SeekbarView, template) {
  'use strict';
  var CompactTrackView, _ref;
  return CompactTrackView = (function(_super) {
    __extends(CompactTrackView, _super);

    function CompactTrackView() {
      _ref = CompactTrackView.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    CompactTrackView.prototype.className = 'track compact';

    CompactTrackView.prototype.template = template;

    template = null;

    CompactTrackView.prototype.initialize = function() {
      return this.delegate('click', '.toggle-infos', this.toggleInfo);
    };

    CompactTrackView.prototype.toggleInfo = function() {
      var extrainfo;
      extrainfo = this.$el.find('ul.extra-infos').toggleClass('expanded');
      if (extrainfo.hasClass('expanded')) {
        return extrainfo.slideDown(200);
      } else {
        return extrainfo.slideUp(200);
      }
    };

    CompactTrackView.prototype.createSubviews = function(player) {
      var options, playerControlsView, playerView;
      options = {
        model: player,
        container: this.$el.find('.artwork'),
        containerMethod: 'after'
      };
      if (this.controls) {
        playerControlsView = new PlayerControlsView(_.extend(options, this.playerOptions));
        this.subview('player-controls', playerControlsView);
      }
      if (this.seekbar) {
        playerView = new SeekbarView(options);
        return this.subview('player', playerView);
      }
    };

    return CompactTrackView;

  })(TrackView);
});

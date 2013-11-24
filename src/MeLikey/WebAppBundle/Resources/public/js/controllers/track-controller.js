var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['controllers/site-controller', 'models/track', 'views/track-view'], function(SiteController, Track, TrackView) {
  'use strict';
  var TrackController, _ref;
  return TrackController = (function(_super) {
    __extends(TrackController, _super);

    function TrackController() {
      _ref = TrackController.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    TrackController.prototype.show = function(params) {
      this.model = new Track({
        id: 54,
        title: 'Suburbs',
        artist: 'Mr Little Jeans',
        type: 'soundcloud',
        soundcloud: 'https://soundcloud.com/mrlittlejeans/suburbs'
      });
      return this.view = new TrackView({
        model: this.model,
        region: 'main'
      });
    };

    return TrackController;

  })(SiteController);
});

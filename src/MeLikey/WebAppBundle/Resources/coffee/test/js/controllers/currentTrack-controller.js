var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['controllers/base/controller', 'views/track-view'], function(Controller, TrackView) {
  'use strict';
  var CurrentTrackController, _ref;

  return CurrentTrackController = (function(_super) {
    __extends(CurrentTrackController, _super);

    function CurrentTrackController() {
      _ref = CurrentTrackController.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    CurrentTrackController.prototype.initialize = function() {
      console.debug("init currentTrackController");
      return this.subscribeEvent('Track:play', this.onTrackPlay);
    };

    CurrentTrackController.prototype.onTrackPlay = function(track) {
      console.debug("Setting current track");
      return new TrackView({
        model: track,
        container: 'currentTrack'
      });
    };

    return CurrentTrackController;

  })(Controller);
});

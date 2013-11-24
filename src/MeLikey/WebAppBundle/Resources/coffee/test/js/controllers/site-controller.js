var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['chaplin', 'controllers/base/controller', 'models/track', 'views/global-player-view', 'views/playlist-view', 'views/header-view'], function(Chaplin, Controller, Track, GlobalPlayerView, PlaylistView, HeaderView) {
  'use strict';
  var SiteController, _ref;
  return SiteController = (function(_super) {
    __extends(SiteController, _super);

    function SiteController() {
      _ref = SiteController.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    SiteController.prototype.beforeAction = function() {
      SiteController.__super__.beforeAction.apply(this, arguments);
      this.compose('header', HeaderView, {
        region: 'header'
      });
      this.compose('globalPlayer', GlobalPlayerView, {
        region: 'globalPlayer',
        model: Chaplin.mediator.radioManager.currentTrack
      });
      return this.compose('playlist', PlaylistView, {
        region: 'playlist',
        collection: Chaplin.mediator.radioManager.playlist
      });
    };

    SiteController.prototype.initialize = function() {
      this.subscribeEvent('GlobalPlayer:next', this.next);
      this.subscribeEvent('GlobalPlayer:prev', this.prev);
      return this.subscribeEvent('Track:end', this.next);
    };

    SiteController.prototype.next = function(track) {
      return Chaplin.mediator.radioManager.next(track);
    };

    SiteController.prototype.prev = function(track) {
      return Chaplin.mediator.radioManager.prev(track);
    };

    return SiteController;

  })(Controller);
});

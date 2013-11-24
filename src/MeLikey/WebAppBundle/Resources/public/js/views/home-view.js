var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['views/track-view'], function(TrackView) {
  'use strict';
  var HomeView, _ref;
  return HomeView = (function(_super) {
    __extends(HomeView, _super);

    function HomeView() {
      _ref = HomeView.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    HomeView.prototype.region = 'main';

    HomeView.prototype.controls = true;

    HomeView.prototype.seekbar = false;

    HomeView.prototype.className = 'track big';

    HomeView.prototype.initialize = function() {
      HomeView.__super__.initialize.apply(this, arguments);
      this.subscribeEvent('Radio:loadingNewTracks', function() {
        $('#main-loader').addClass('loading');
        return $('#main-container').addClass('loading');
      });
      return this.subscribeEvent('Radio:newTracksLoaded', function() {
        $('#main-loader').removeClass('loading');
        return $('#main-container').removeClass('loading');
      });
    };

    return HomeView;

  })(TrackView);
});

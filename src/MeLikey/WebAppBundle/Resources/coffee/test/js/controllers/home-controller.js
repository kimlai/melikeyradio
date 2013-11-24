var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['chaplin', 'controllers/site-controller', 'views/home-view'], function(Chaplin, SiteController, HomeView) {
  'use strict';
  var HomeController, _ref;
  return HomeController = (function(_super) {
    __extends(HomeController, _super);

    function HomeController() {
      _ref = HomeController.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    HomeController.prototype.show = function(params) {
      var options, rm, track;
      rm = Chaplin.mediator.radioManager;
      track = rm.currentTrack;
      if (track != null) {
        this.model = track;
      }
      options = {
        controls: true,
        seekbar: false,
        className: 'track big'
      };
      if (this.model != null) {
        this.view = new HomeView(_.extend(options, {
          model: this.model
        }));
      } else {
        $('#main-loader').addClass('loading');
        $('#main-container').addClass('loading');
      }
      return this.subscribeEvent('Radio:newTrackPlaying', function(track) {
        $('#main-loader').removeClass('loading');
        $('#main-container').removeClass('loading');
        if (this.view != null) {
          this.view.dispose();
        }
        return this.view = new HomeView(_.extend(options, {
          model: track
        }));
      });
    };

    return HomeController;

  })(SiteController);
});

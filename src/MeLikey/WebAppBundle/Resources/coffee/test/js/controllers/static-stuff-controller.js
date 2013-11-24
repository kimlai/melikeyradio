var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['controllers/site-controller', 'views/about-view', 'views/contact-view'], function(SiteController, AboutView, ContactView) {
  'use strict';
  var StaticStuffController, _ref;
  return StaticStuffController = (function(_super) {
    __extends(StaticStuffController, _super);

    function StaticStuffController() {
      _ref = StaticStuffController.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    StaticStuffController.prototype.about = function() {
      return this.view = new AboutView({
        region: 'main'
      });
    };

    StaticStuffController.prototype.contact = function() {
      return this.view = new ContactView({
        region: 'main'
      });
    };

    return StaticStuffController;

  })(SiteController);
});

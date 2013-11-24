var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['chaplin'], function(Chaplin) {
  'use scrict';
  var Layout, _ref;
  return Layout = (function(_super) {
    __extends(Layout, _super);

    function Layout() {
      _ref = Layout.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    Layout.prototype.hideOldView = function(controller) {
      return $('#main-container').addClass('loading');
    };

    Layout.prototype.showNewView = function(controller) {
      return $('#main-container').removeClass('loading');
    };

    return Layout;

  })(Chaplin.Layout);
});

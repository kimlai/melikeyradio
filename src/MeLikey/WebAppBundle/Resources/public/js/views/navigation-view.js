var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['views/base/view', 'templates/navigation'], function(View, template) {
  'use strict';
  var NavigationView, _ref;
  return NavigationView = (function(_super) {
    __extends(NavigationView, _super);

    function NavigationView() {
      _ref = NavigationView.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    NavigationView.prototype.tagName = 'ul';

    NavigationView.prototype.autoRender = true;

    NavigationView.prototype.template = template;

    template = null;

    NavigationView.prototype.initialize = function() {
      return this.delegate('click', 'a', function(event) {
        this.$el.find('li').removeClass('active');
        return $(event.target).closest('li').addClass('active');
      });
    };

    return NavigationView;

  })(View);
});

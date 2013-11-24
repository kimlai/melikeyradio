var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['twig', 'chaplin'], function(Twig, Chaplin) {
  'use strict';
  var View, _ref;
  return View = (function(_super) {
    __extends(View, _super);

    function View() {
      _ref = View.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    View.prototype.getTemplateFunction = function() {
      var _this = this;
      if (!this.template) {
        return;
      }
      return function(data) {
        return Twig.render(_this.template, data);
      };
    };

    return View;

  })(Chaplin.View);
});

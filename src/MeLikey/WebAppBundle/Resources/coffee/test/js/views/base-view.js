var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['views/base/view', 'twig'], function(View, Twig) {
  'use strict';
  var BaseView, _ref;
  return BaseView = (function(_super) {
    __extends(BaseView, _super);

    function BaseView() {
      _ref = BaseView.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    BaseView.prototype.getTemplateFunction = function() {
      var _this = this;
      return function(data) {
        return Twig.render(_this.template, data);
      };
    };

    return BaseView;

  })(View);
});

var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['views/base/view', 'templates/header'], function(View, template) {
  'use strict';
  var HeaderView, _ref;
  return HeaderView = (function(_super) {
    __extends(HeaderView, _super);

    function HeaderView() {
      _ref = HeaderView.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    HeaderView.prototype.tagName = 'header';

    HeaderView.prototype.autoRender = true;

    HeaderView.prototype.template = template;

    template = null;

    return HeaderView;

  })(View);
});

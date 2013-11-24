var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['views/base/view', 'templates/about'], function(View, template) {
  'use strict';
  var AboutView, _ref;
  return AboutView = (function(_super) {
    __extends(AboutView, _super);

    function AboutView() {
      _ref = AboutView.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    AboutView.prototype.tagName = 'article';

    AboutView.prototype.className = 'about';

    AboutView.prototype.autoRender = true;

    AboutView.prototype.template = template;

    template = null;

    return AboutView;

  })(View);
});

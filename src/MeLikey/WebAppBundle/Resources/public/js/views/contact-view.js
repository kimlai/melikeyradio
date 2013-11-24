var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['views/base/view', 'templates/contact'], function(View, template) {
  'use strict';
  var ContactView, _ref;
  return ContactView = (function(_super) {
    __extends(ContactView, _super);

    function ContactView() {
      _ref = ContactView.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    ContactView.prototype.tagName = 'article';

    ContactView.prototype.className = 'contact';

    ContactView.prototype.autoRender = true;

    ContactView.prototype.template = template;

    template = null;

    return ContactView;

  })(View);
});

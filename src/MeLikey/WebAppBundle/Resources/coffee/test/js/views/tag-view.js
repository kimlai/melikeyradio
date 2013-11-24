var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['models/tag', 'views/base/view', 'templates/tag'], function(Tag, View, template) {
  'use strict';
  var TagView, _ref;
  return TagView = (function(_super) {
    __extends(TagView, _super);

    function TagView() {
      _ref = TagView.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    TagView.prototype.autoRender = true;

    TagView.prototype.tagName = 'li';

    TagView.prototype.className = 'tag';

    TagView.prototype.template = template;

    template = null;

    TagView.prototype.initialize = function() {
      return this.delegate('click', function() {
        return this.trigger('TagView:click', this.model);
      });
    };

    TagView.prototype.getTemplateData = function() {
      return {
        tag: this.model.getAttributes()
      };
    };

    return TagView;

  })(View);
});

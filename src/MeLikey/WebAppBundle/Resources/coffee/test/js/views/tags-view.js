var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['views/base/collection-view', 'views/tag-view'], function(CollectionView, TagView) {
  'use strict';
  var TagsView, _ref;
  return TagsView = (function(_super) {
    __extends(TagsView, _super);

    function TagsView() {
      _ref = TagsView.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    TagsView.prototype.itemView = TagView;

    TagsView.prototype.region = 'main';

    TagsView.prototype.tagName = 'ul';

    TagsView.prototype.className = 'tags-list';

    TagsView.prototype.initItemView = function(model) {
      return TagsView.__super__.initItemView.apply(this, arguments).on('TagView:click', this.onTagViewClick, this);
    };

    TagsView.prototype.onTagViewClick = function(tag) {
      return this.trigger('Tag:click', tag);
    };

    return TagsView;

  })(CollectionView);
});

var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['models/base/collection', 'models/tag'], function(Collection, Tag) {
  'use strict';
  var Tags, _ref;
  return Tags = (function(_super) {
    __extends(Tags, _super);

    function Tags() {
      _ref = Tags.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    Tags.prototype.model = Tag;

    Tags.prototype.url = Routing.generate('melikey_api_get_tags');

    return Tags;

  })(Collection);
});

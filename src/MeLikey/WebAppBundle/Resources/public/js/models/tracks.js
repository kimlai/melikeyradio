var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['models/base/collection', 'models/track'], function(Collection, Track) {
  'use strict';
  var Tracks, _ref;
  return Tracks = (function(_super) {
    __extends(Tracks, _super);

    function Tracks() {
      _ref = Tracks.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    Tracks.prototype.model = Track;

    Tracks.prototype.url = Routing.generate('melikey_api_get_tracks');

    Tracks.prototype.initialize = function(models, options) {
      return this.on('remove', function(track) {
        return track.dispose();
      });
    };

    Tracks.prototype.comparator = function(t1, t2) {
      var d1, d2;
      d1 = new Date(t1.get('created'));
      d2 = new Date(t2.get('created'));
      if (d1 > d2) {
        return -1;
      }
      if (d1 < d2) {
        return 1;
      }
      return 0;
    };

    Tracks.prototype.dispose = function() {
      var track, _i, _len, _ref1;
      _ref1 = this.models;
      for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
        track = _ref1[_i];
        if (!track.disposed) {
          track.dispose();
        }
      }
      return Tracks.__super__.dispose.apply(this, arguments);
    };

    Tracks.prototype.next = function(track) {
      return this.at(this.indexOf(track) + 1);
    };

    Tracks.prototype.prev = function(track) {
      return this.at(this.indexOf(track) - 1);
    };

    Tracks.prototype.filterByTag = function(tag) {
      var filtered;
      if (tag.id === '*') {
        return this.models;
      }
      filtered = this.filter(function(track) {
        return (_(track.get('tags')).where(tag.attributes)).length;
      });
      return filtered;
    };

    return Tracks;

  })(Collection);
});

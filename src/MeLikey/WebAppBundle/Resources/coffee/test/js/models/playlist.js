var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['models/track', 'models/tracks'], function(Track, Tracks) {
  'use strict';
  var Playlist, _ref;
  return Playlist = (function(_super) {
    __extends(Playlist, _super);

    function Playlist() {
      _ref = Playlist.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    Playlist.prototype.url = function() {
      return Routing.generate('melikey_api_get_playlist', {
        id: this.id
      });
    };

    Playlist.prototype.initialize = function(attr, options) {
      return _(this).extend(_.pick(options, 'id'));
    };

    Playlist.prototype.model = function(attrs, options) {
      var t;
      t = new Track(attrs, _.extend(options, {
        addToVault: true
      }));
      t.position = attrs.position;
      return t;
    };

    Playlist.prototype.comparator = function(t) {
      return t.position;
    };

    Playlist.prototype.parse = function(response) {
      return _.map(response.playlist_items, function(item) {
        return item.track;
      });
    };

    return Playlist;

  })(Tracks);
});

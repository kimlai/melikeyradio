var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['models/track', 'views/base/view', 'views/player-controls-view', 'views/seekbar-view', 'templates/track-full'], function(Track, View, PlayerControlsView, SeekbarView, template, FB) {
  'use strict';
  var TrackView, _ref;
  return TrackView = (function(_super) {
    __extends(TrackView, _super);

    function TrackView() {
      _ref = TrackView.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    TrackView.prototype.autoRender = true;

    TrackView.prototype.tagName = 'article';

    TrackView.prototype.className = 'track';

    TrackView.prototype.template = template;

    template = null;

    TrackView.prototype.seekbar = true;

    TrackView.prototype.controls = true;

    TrackView.prototype.initialize = function(options) {
      TrackView.__super__.initialize.apply(this, arguments);
      options || (options = {});
      _(this).extend(_.pick(options, 'seekbar', 'controls'));
      if (this.model != null) {
        this.listenTo(this.model, 'change', this.render);
      }
      this.delegate('click', '.fb-share', this.fbShare);
      this.delegate('click', '.tw-share', this.twitterShare);
      return this.delegate('click', '.addLikey', this.toggleLikey);
    };

    TrackView.prototype.render = function() {
      TrackView.__super__.render.apply(this, arguments);
      if (this.model != null) {
        if ((this.model.player != null) && this.model.player.get('ready')) {
          return this.createSubviews(this.model.player);
        } else {
          return this.listenTo(this.model, 'Track:playerReady', function(player) {
            return this.createSubviews(player);
          });
        }
      }
    };

    TrackView.prototype.getTemplateData = function() {
      if (this.model == null) {
        return;
      }
      return {
        track: this.model.getAttributes()
      };
    };

    TrackView.prototype.createSubviews = function(player) {
      var options, playerControlsView, playerView;
      options = {
        model: player,
        container: this.el
      };
      if (this.controls) {
        playerControlsView = new PlayerControlsView(_.extend(options, this.playerOptions));
        this.subview('player-controls', playerControlsView);
      }
      if (this.seekbar) {
        playerView = new SeekbarView(options);
        return this.subview('player', playerView);
      }
    };

    TrackView.prototype.fbShare = function() {
      var obj;
      obj = {
        method: 'feed',
        link: Routing.generate('melikey_api_get_track', {
          id: this.model.id
        }, true)
      };
      return FB.ui(obj);
    };

    TrackView.prototype.twitterShare = function() {
      var left, params, top, url;
      top = screen.height / 2 - 225;
      left = screen.width / 2 - 275;
      params = {
        url: Routing.generate('me_likey_api_get_track', {
          id: this.model.id
        }, true),
        via: 'melikeyradio',
        text: this.model.get('artist') + ' - ' + this.model.get('title')
      };
      url = 'https://twitter.com/share?' + $.param(params);
      return window.open(url, '_blank', 'width=550,height=450,top=' + top + ',left=' + left);
    };

    TrackView.prototype.toggleLikey = function() {
      return this.publishEvent('login:displayWindow');
    };

    return TrackView;

  })(View);
});

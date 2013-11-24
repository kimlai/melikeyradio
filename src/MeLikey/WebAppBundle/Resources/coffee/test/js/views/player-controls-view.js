var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['models/player', 'views/base/view', 'templates/player-controls'], function(Track, View, template) {
  'use strict';
  var PlayerControlsView, _ref;
  return PlayerControlsView = (function(_super) {
    __extends(PlayerControlsView, _super);

    function PlayerControlsView() {
      _ref = PlayerControlsView.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    PlayerControlsView.prototype.autoRender = true;

    PlayerControlsView.prototype.tagName = 'section';

    PlayerControlsView.prototype.className = 'player-controls';

    PlayerControlsView.prototype.template = template;

    template = null;

    PlayerControlsView.prototype.initialize = function(options) {
      PlayerControlsView.__super__.initialize.apply(this, arguments);
      this.delegate('click', '.play', this.play);
      this.delegate('click', '.pause', this.pause);
      this.togglePlayPause();
      this.listenTo(this.model, 'change:playing', this.togglePlayPause);
      return this.listenTo(this.model, 'change:ready', this.toggleReadyState);
    };

    PlayerControlsView.prototype.togglePlayPause = function() {
      if (this.model == null) {
        return;
      }
      if (this.model.get('playing')) {
        this.displayBufferingIndicator();
        return this.$el.addClass('playing');
      } else {
        return this.$el.removeClass('playing');
      }
    };

    PlayerControlsView.prototype.toggleReadyState = function() {
      if (this.model == null) {
        return;
      }
      if (this.model.get('ready')) {
        return this.$el.addClass('ready');
      } else {
        return this.$el.removeClass('ready');
      }
    };

    PlayerControlsView.prototype.displayBufferingIndicator = function() {
      var timeout,
        _this = this;
      timeout = setTimeout((function() {
        if (_this.$el != null) {
          return _this.$el.addClass('buffering');
        }
      }), 200);
      return this.listenToOnce(this.model, 'change:currentTime', function() {
        clearTimeout(timeout);
        return this.$el.removeClass('buffering');
      });
    };

    PlayerControlsView.prototype.play = function() {
      debugger;
      return this.model.play();
    };

    PlayerControlsView.prototype.pause = function() {
      return this.model.pause();
    };

    return PlayerControlsView;

  })(View);
});

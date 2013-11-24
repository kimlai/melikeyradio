var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['models/player', 'views/base/view', 'views/seekbar-view', 'text!templates/player.hbs'], function(Track, View, SeekbarView, template) {
  'use strict';
  var PlayerView, _ref;

  return PlayerView = (function(_super) {
    __extends(PlayerView, _super);

    function PlayerView() {
      _ref = PlayerView.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    PlayerView.prototype.autoRender = true;

    PlayerView.prototype.tagName = 'div';

    PlayerView.prototype.className = 'player';

    PlayerView.prototype.template = template;

    template = null;

    PlayerView.prototype.initialize = function(options) {
      var _ref1;

      PlayerView.__super__.initialize.apply(this, arguments);
      this.seekbar = (_ref1 = options.seekbar) != null ? _ref1 : true;
      this.delegate('click', '.play', this.play);
      this.delegate('click', '.pause', this.pause);
      this.togglePlayPause();
      return this.listenTo(this.model, 'change:playing', this.togglePlayPause);
    };

    PlayerView.prototype.render = function() {
      var seekbarView;

      PlayerView.__super__.render.apply(this, arguments);
      if (this.seekbar) {
        seekbarView = new SeekbarView({
          model: this.model,
          container: this.el
        });
        return this.subview('seekbar', seekbarView);
      }
    };

    PlayerView.prototype.togglePlayPause = function() {
      if (this.model.get('playing')) {
        return this.$el.addClass('playing');
      } else {
        return this.$el.removeClass('playing');
      }
    };

    PlayerView.prototype.play = function() {
      return this.model.play();
    };

    PlayerView.prototype.pause = function() {
      return this.model.pause();
    };

    return PlayerView;

  })(View);
});

var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['views/base/view', 'templates/seekbar'], function(View, template) {
  'use strict';
  var SeekbarView, _ref;
  return SeekbarView = (function(_super) {
    __extends(SeekbarView, _super);

    function SeekbarView() {
      _ref = SeekbarView.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    SeekbarView.prototype.autoRender = true;

    SeekbarView.prototype.className = 'seekbar';

    SeekbarView.prototype.template = template;

    template = null;

    SeekbarView.prototype.initialize = function(options) {
      SeekbarView.__super__.initialize.apply(this, arguments);
      this.delegate('click', '.loaded', this.onSeek);
      this.delegate('click', '.played', this.onSeek);
      if (this.model != null) {
        return this.listenTo(this.model, 'change:currentTime change:loaded', this.update);
      }
    };

    SeekbarView.prototype.update = function() {
      if (this.model != null) {
        this.$el.find('.loaded').css('width', 100 * this.model.get('loaded') + '%');
        return this.$el.find('.played').css('width', 100 * this.model.get('currentTime') / this.model.get('duration') + '%');
      }
    };

    SeekbarView.prototype.onSeek = function(event) {
      var time;
      time = Math.floor((event.offsetX / this.$el.width()) * this.model.get('duration'));
      return this.model.seekTo(time);
    };

    return SeekbarView;

  })(View);
});

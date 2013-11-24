var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['chaplin', 'routes', 'views/layout', 'lib/radio-manager', 'lib/session-manager'], function(Chaplin, routes, Layout, RadioManager, SessionManager) {
  'use strict';
  var MeLikeyRadio, _ref;
  return MeLikeyRadio = (function(_super) {
    __extends(MeLikeyRadio, _super);

    function MeLikeyRadio() {
      _ref = MeLikeyRadio.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    MeLikeyRadio.prototype.title = 'MeLikeyRadio';

    MeLikeyRadio.prototype.initialize = function(playlistID) {
      this.initRouter(routes);
      this.initDispatcher({
        controllerSuffix: '-controller'
      });
      this.initLayout();
      this.initComposer();
      this.initMediator(playlistID);
      this.start();
      return typeof Object.freeze === "function" ? Object.freeze(this) : void 0;
    };

    MeLikeyRadio.prototype.initLayout = function() {
      return this.layout = new Layout({
        title: this.title
      });
    };

    MeLikeyRadio.prototype.initMediator = function() {
      Chaplin.mediator.radioManager = new RadioManager({
        playlistID: 25
      });
      Chaplin.mediator.sessionManager = new SessionManager();
      return Chaplin.mediator.seal();
    };

    return MeLikeyRadio;

  })(Chaplin.Application);
});

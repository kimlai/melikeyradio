define(['chaplin'], function(Chaplin) {
  'use strict';
  var SessionManager;
  return SessionManager = (function() {
    _(SessionManager.prototype).extend(Chaplin.EventBroker);

    SessionManager.prototype.user = null;

    SessionManager.prototype.loginWindow = null;

    function SessionManager(options) {
      this.subscribeEvent('login:displayWindow', this.displayLoginWindow);
    }

    SessionManager.prototype.displayLoginWindow = function() {
      if (this.loginWindow === null || this.loginWindow.closed) {
        return this.openLoginWindow();
      } else {
        return this.loginWindow.focus();
      }
    };

    SessionManager.prototype.openLoginWindow = function() {
      var left, top, url;
      top = screen.height / 2 - 225;
      left = screen.width / 2 - 275;
      url = Routing.generate('me_likey_music_lover_connect', true);
      return this.loginWindow = window.open(url, '_blank', 'width=550,height=450,top=' + top + ',left=' + left);
    };

    return SessionManager;

  })();
});

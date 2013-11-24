define(['lib/player-wrappers/base/player-wrapper'], function(PlayerWrapper) {
  'use strict';
  return describe('PlayerWrapper', function() {
    var pw;
    pw = null;
    beforeEach(function() {
      return pw = new PlayerWrapper;
    });
    afterEach(function() {
      return pw = null;
    });
    it("should accept a 'onError' callback", function() {
      pw.initialize({
        onError: function() {}
      });
      assert.property(pw, 'onError');
      return assert.isFunction(pw.onError);
    });
    it("should accept a 'onReady' callback", function() {
      pw.initialize({
        onReady: function() {}
      });
      assert.property(pw, 'onReady');
      return assert.isFunction(pw.onReady);
    });
    return it("should accept a 'onFinish' callback", function() {
      pw.initialize({
        onFinish: function() {}
      });
      assert.property(pw, 'onFinish');
      return assert.isFunction(pw.onFinish);
    });
  });
});

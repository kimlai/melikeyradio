define(['lib/player-wrappers/soundcloud-wrapper'], function(SoundcloudWrapper) {
  'use strict';
  return describe("SoundcloudWrapper", function() {
    var sw;
    sw = null;
    beforeEach(function() {
      return sw = new SoundcloudWrapper({
        soundcloudUrl: 'https://soundcloud.com/johnny_ripper/weasels-fist-stung-by-a-bee'
      });
    });
    afterEach(function() {
      sw.destroyEngine();
      return sw = null;
    });
    describe("destroyEngine", function() {
      return it("should clean up after itself", function(done) {
        return sw.initializeEngine(function() {
          assert.isDefined(sw.engine);
          sw.destroyEngine();
          assert.isUndefined(sw.engine);
          return done();
        });
      });
    });
    describe("initialization", function() {
      return it("should throw an error if it's initialized without a soundcloudUrl attribute", function() {
        sw.soundcloudUrl = null;
        assert.throws((function() {
          return sw.initialize();
        }), "initialize expects a soundcloudUrl option");
        return assert.doesNotThrow((function() {
          return sw.initialize({
            soundcloudUrl: 'http://soundcloud.com'
          });
        }), "initialize expects a soundcloudUrl option");
      });
    });
    describe("initializeEngine", function() {
      it("should call @onError if the url resolution fails", function(done) {
        sw.soundcloudUrl = '404';
        sw.onError = sinon.spy();
        return sw.initializeEngine(function() {
          assert.isTrue(sw.onError.calledOnce);
          assert.isTrue(sw.onError.calledWith("The track url could not be resolved :( That means 404..."));
          return done();
        });
      });
      it("should NOT call @onError if the track url resolution is a success", function(done) {
        sw.onError = sinon.spy();
        return sw.initializeEngine(function() {
          assert.isFalse(sw.onError.calledOnce);
          return done();
        });
      });
      it("should return a reference to the SoundcloudWrapper object itself", function(done) {
        return sw.initializeEngine(function(err, response) {
          assert.strictEqual(sw, response);
          return done();
        });
      });
      it("should put the wrapper into ready state", function(done) {
        sw.onReady = sinon.spy();
        assert.notProperty(sw, 'engine');
        return sw.initializeEngine(function() {
          assert.property(sw, 'engine');
          assert.isTrue(sw.onReady.calledOnce);
          return done();
        });
      });
      return it("should NOT set the engine property if the url resolution fails", function(done) {
        sw.soundcloudUrl = '404';
        assert.notProperty(sw, 'engine');
        return sw.initializeEngine(function() {
          assert.notProperty(sw, 'engine');
          return done();
        });
      });
    });
    return describe("play", function() {
      it("should be a function", function() {
        return assert.isFunction(sw.play);
      });
      it("should call onCurrentTimeChange when the engine is playing", function(done) {
        sw.onCurrentTimeChange = sinon.spy();
        return sw.initializeEngine(function() {
          assert.isFalse(sw.onCurrentTimeChange.called);
          sw.play();
          return setTimeout((function() {
            assert.isTrue(sw.onCurrentTimeChange.called);
            return done();
          }), 800);
        });
      });
      return it("should call onBufferChange when the engine is playing", function(done) {
        sw.onBufferChange = sinon.spy();
        return sw.initializeEngine(function() {
          assert.isFalse(sw.onBufferChange.called);
          sw.play();
          return setTimeout((function() {
            assert.isTrue(sw.onBufferChange.called);
            return done();
          }), 800);
        });
      });
    });
  });
});

define(['lib/player-wrappers/youtube-wrapper'], function(YoutubeWrapper) {
  'use strict';
  return describe("YoutubeWrapper", function() {
    var wrapper;
    wrapper = null;
    beforeEach(function() {
      return wrapper = new YoutubeWrapper({
        youtubeID: 'nWQXKJTlAQc'
      });
    });
    afterEach(function() {
      wrapper.destroyEngine();
      return wrapper = null;
    });
    describe("destroyEngine", function() {
      return it("should clean up after itself", function(done) {
        return wrapper.initializeEngine(function() {
          assert.isDefined(wrapper.engine);
          wrapper.destroyEngine();
          assert.isUndefined(wrapper.engine);
          return done();
        });
      });
    });
    describe("initialization", function() {
      return it("should throw an error if it's initialized without a youtubeID attribute", function() {
        wrapper.youtubeID = null;
        assert.throws((function() {
          return wrapper.initialize();
        }), "initialize expects a youtubeID option");
        return assert.doesNotThrow((function() {
          return wrapper.initialize({
            youtubeID: 'xxx'
          });
        }), "initialize expects a soundcloudUrl option");
      });
    });
    describe("initializeEngine", function() {
      it("should call @onError if the youtubeID is not good", function(done) {
        wrapper.youtubeID = '404';
        wrapper.onError = sinon.spy();
        return wrapper.initializeEngine(function() {
          wrapper.play();
          return setTimeout((function() {
            assert.isTrue(wrapper.onError.called);
            return done();
          }), 500);
        });
      });
      it("should NOT call @onError if the youtubeID is ok", function(done) {
        wrapper.onError = sinon.spy();
        return wrapper.initializeEngine(function() {
          wrapper.play();
          return setTimeout((function() {
            assert.isFalse(wrapper.onError.called);
            return done();
          }), 500);
        });
      });
      it("should return a reference to the YoutubeWrapper object itself", function(done) {
        return wrapper.initializeEngine(function(err, response) {
          assert.strictEqual(wrapper, response);
          return done();
        });
      });
      return it("should put the wrapper into ready state", function(done) {
        wrapper.onReady = sinon.spy();
        assert.notProperty(wrapper, 'engine');
        return wrapper.initializeEngine(function() {
          assert.property(wrapper, 'engine');
          assert.isTrue(wrapper.onReady.calledOnce);
          return done();
        });
      });
    });
    return describe("play", function() {
      it("should be a function", function() {
        return assert.isFunction(wrapper.play);
      });
      it("should call onCurrentTimeChange when the engine is playing", function(done) {
        wrapper.onCurrentTimeChange = sinon.spy();
        return wrapper.initializeEngine(function() {
          assert.isFalse(wrapper.onCurrentTimeChange.called);
          wrapper.play();
          return setTimeout((function() {
            assert.isTrue(wrapper.onCurrentTimeChange.called);
            return done();
          }), 3000);
        });
      });
      return it("should call onBufferChange when the engine is playing", function(done) {
        wrapper.onBufferChange = sinon.spy();
        return wrapper.initializeEngine(function() {
          assert.isFalse(wrapper.onBufferChange.called);
          wrapper.play();
          return setTimeout((function() {
            assert.isTrue(wrapper.onBufferChange.called);
            return done();
          }), 3000);
        });
      });
    });
  });
});

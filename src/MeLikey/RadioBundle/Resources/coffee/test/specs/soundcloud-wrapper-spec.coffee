define [
  'lib/player-wrappers/soundcloud-wrapper'
], (SoundcloudWrapper) ->
  'use strict'

  describe "SoundcloudWrapper", ->
      sw = null

      beforeEach ->
        sw = new SoundcloudWrapper {soundcloudUrl: 'https://soundcloud.com/johnny_ripper/weasels-fist-stung-by-a-bee'}

      afterEach ->
        sw.destroyEngine()
        sw = null

      describe "destroyEngine", ->
        it "should clean up after itself", (done) ->
          sw.initializeEngine ->
            assert.isDefined sw.engine
            sw.destroyEngine()
            assert.isUndefined sw.engine
            done()

      describe "initialization", ->
        it "should throw an error if it's initialized without a soundcloudUrl attribute", ->
          sw.soundcloudUrl = null
          assert.throws (-> sw.initialize()), "initialize expects a soundcloudUrl option"
          assert.doesNotThrow (-> sw.initialize({soundcloudUrl: 'http://soundcloud.com'})), "initialize expects a soundcloudUrl option"

      describe "initializeEngine", ->
        it "should call @onError if the url resolution fails", (done) ->
          sw.soundcloudUrl = '404'
          sw.onError = sinon.spy()
          sw.initializeEngine ->
            assert.isTrue sw.onError.calledOnce
            assert.isTrue sw.onError.calledWith "The track url could not be resolved :( That means 404..."
            done()
        it "should NOT call @onError if the track url resolution is a success", (done) ->
          sw.onError = sinon.spy()
          sw.initializeEngine  ->
            assert.isFalse sw.onError.calledOnce
            done()
        it "should return a reference to the SoundcloudWrapper object itself", (done) ->
          sw.initializeEngine (err, response) ->
            assert.strictEqual sw, response
            done()
        it "should put the wrapper into ready state", (done) ->
          sw.onReady = sinon.spy()
          assert.notProperty sw, 'engine'
          sw.initializeEngine ->
            assert.property sw, 'engine'
            assert.isTrue sw.onReady.calledOnce
            done()
        it "should NOT set the engine property if the url resolution fails", (done) ->
          sw.soundcloudUrl = '404'
          assert.notProperty sw, 'engine'
          sw.initializeEngine ->
            assert.notProperty sw, 'engine'
            done()

      describe "play", ->
        it "should be a function", ->
          assert.isFunction sw.play
        it "should call onCurrentTimeChange when the engine is playing", (done) ->
          sw.onCurrentTimeChange = sinon.spy()
          sw.initializeEngine ->
            assert.isFalse sw.onCurrentTimeChange.called
            sw.play()
            setTimeout (->
              assert.isTrue sw.onCurrentTimeChange.called
              done()
            ), 800
        it "should call onBufferChange when the engine is playing", (done) ->
          sw.onBufferChange = sinon.spy()
          sw.initializeEngine ->
            assert.isFalse sw.onBufferChange.called
            sw.play()
            setTimeout (->
              assert.isTrue sw.onBufferChange.called
              done()
            ), 800

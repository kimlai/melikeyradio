define [
  'lib/player-wrappers/youtube-wrapper'
], (YoutubeWrapper) ->
  'use strict'

  describe "YoutubeWrapper", ->
      wrapper = null

      beforeEach ->
        wrapper = new YoutubeWrapper {youtubeID: 'nWQXKJTlAQc'}

      afterEach ->
        wrapper.destroyEngine()
        wrapper = null

      describe "destroyEngine", ->
        it "should clean up after itself", (done) ->
          wrapper.initializeEngine ->
            assert.isDefined wrapper.engine
            wrapper.destroyEngine()
            assert.isUndefined wrapper.engine
            done()

      describe "initialization", ->
        it "should throw an error if it's initialized without a youtubeID attribute", ->
          wrapper.youtubeID = null
          assert.throws (-> wrapper.initialize()), "initialize expects a youtubeID option"
          assert.doesNotThrow (-> wrapper.initialize({youtubeID: 'xxx'})), "initialize expects a soundcloudUrl option"

      describe "initializeEngine", ->
        it "should call @onError if the youtubeID is not good", (done) ->
          wrapper.youtubeID = '404'
          wrapper.onError = sinon.spy()
          wrapper.initializeEngine ->
            wrapper.play()
            setTimeout (->
              assert.isTrue wrapper.onError.called
              done()
            ), 500
        it "should NOT call @onError if the youtubeID is ok", (done) ->
          wrapper.onError = sinon.spy()
          wrapper.initializeEngine  ->
            wrapper.play()
            setTimeout (->
              assert.isFalse wrapper.onError.called
              done()
            ), 500
        it "should return a reference to the YoutubeWrapper object itself", (done) ->
          wrapper.initializeEngine (err, response) ->
            assert.strictEqual wrapper, response
            done()
        it "should put the wrapper into ready state", (done) ->
          wrapper.onReady = sinon.spy()
          assert.notProperty wrapper, 'engine'
          wrapper.initializeEngine ->
            assert.property wrapper, 'engine'
            assert.isTrue wrapper.onReady.calledOnce
            done()

      describe "play", ->
        it "should be a function", ->
          assert.isFunction wrapper.play
        it "should call onCurrentTimeChange when the engine is playing", (done) ->
          wrapper.onCurrentTimeChange = sinon.spy()
          wrapper.initializeEngine ->
            assert.isFalse wrapper.onCurrentTimeChange.called
            wrapper.play()
            setTimeout (->
              assert.isTrue wrapper.onCurrentTimeChange.called
              done()
            ), 3000
        it "should call onBufferChange when the engine is playing", (done) ->
          wrapper.onBufferChange = sinon.spy()
          wrapper.initializeEngine ->
            assert.isFalse wrapper.onBufferChange.called
            wrapper.play()
            setTimeout (->
              assert.isTrue wrapper.onBufferChange.called
              done()
            ), 3000

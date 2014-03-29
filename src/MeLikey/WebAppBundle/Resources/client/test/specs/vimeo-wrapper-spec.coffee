define [
  'lib/player-wrappers/vimeo-wrapper'
], (VimeoWrapper) ->
  'use strict'

  describe "VimeoWrapper", ->
      vw = null

      beforeEach ->
        vw = new VimeoWrapper {vimeoID: '36103569'}

      afterEach ->
        vw.destroyEngine()
        vw = null

      describe "destroyEngine", ->
        it "should clean up after itself", (done) ->
          vw.initializeEngine ->
            assert.isDefined vw.engine
            vw.destroyEngine()
            assert.isUndefined vw.engine
            done()

      describe "initialization", ->
        it "should throw an error if it's initialized without a vimeoID attribute", ->
          vw.vimeoID = null
          assert.throws (-> vw.initialize()), "initialize expects a vimeoID option"
          assert.doesNotThrow (-> vw.initialize({vimeoID: 'vimeoid'})), "initialize expects a vimeoID option"

      describe "initializeEngine", ->
        it "should call @onError if the url resolution fails", (done) ->
          vw.soundcloudUrl = '404'
          vw.onError = sinon.spy()
          vw.initializeEngine ->
            assert.isTrue vw.onError.calledOnce
            assert.isTrue vw.onError.calledWith "The track url could not be resolved :( That means 404..."
            done()
        it "should NOT call @onError if the track url resolution is a success", (done) ->
          vw.onError = sinon.spy()
          vw.initializeEngine  ->
            assert.isFalse vw.onError.calledOnce
            done()
        it "should return a reference to the SoundcloudWrapper object itself", (done) ->
          vw.initializeEngine (err, response) ->
            assert.strictEqual vw, response
            done()
        it "should put the wrapper into ready state", (done) ->
          vw.onReady = sinon.spy()
          assert.notProperty vw, 'engine'
          vw.initializeEngine ->
            assert.property vw, 'engine'
            assert.isTrue vw.onReady.calledOnce
            done()
        it "should NOT set the engine property if the url resolution fails", (done) ->
          vw.soundcloudUrl = '404'
          assert.notProperty vw, 'engine'
          vw.initializeEngine ->
            assert.notProperty vw, 'engine'
            done()

      describe "play", ->
        it "should be a function", ->
          assert.isFunction vw.play
        it "should call onCurrentTimeChange when the engine is playing", (done) ->
          vw.onCurrentTimeChange = sinon.spy()
          vw.initializeEngine ->
            assert.isFalse vw.onCurrentTimeChange.called
            vw.play()
            setTimeout (->
              assert.isTrue vw.onCurrentTimeChange.called
              done()
            ), 800
        it "should call onBufferChange when the engine is playing", (done) ->
          vw.onBufferChange = sinon.spy()
          vw.initializeEngine ->
            assert.isFalse vw.onBufferChange.called
            vw.play()
            setTimeout (->
              assert.isTrue vw.onBufferChange.called
              done()
            ), 800


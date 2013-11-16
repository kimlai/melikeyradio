define [
  'lib/player-wrappers/base/player-wrapper'
], (PlayerWrapper) ->
  'use strict'

  describe 'PlayerWrapper', ->
      pw = null

      beforeEach ->
        pw = new PlayerWrapper

      afterEach ->
        pw = null

      it "should accept a 'onError' callback", ->
        pw.initialize {onError: ->}
        assert.property pw, 'onError'
        assert.isFunction pw.onError
      it "should accept a 'onReady' callback", ->
        pw.initialize {onReady: ->}
        assert.property pw, 'onReady'
        assert.isFunction pw.onReady
      it "should accept a 'onFinish' callback", ->
        pw.initialize {onFinish: ->}
        assert.property pw, 'onFinish'
        assert.isFunction pw.onFinish

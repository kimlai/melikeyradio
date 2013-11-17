define [
  'models/player'
], (Player) ->
  'use strict'

  describe 'Player model', ->

      it "should throw an error if there's no compatible playerWrapper", ->
        assert.throws (-> new Player()), "Unknown Track type, no compatible player found..."

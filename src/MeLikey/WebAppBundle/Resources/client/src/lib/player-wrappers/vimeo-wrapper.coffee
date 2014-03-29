define [
  'vimeo'
  'lib/player-wrappers/base/player-wrapper'
], (Vimeo, PlayerWrapper) ->
  'use strict'

  class VimeoWrapper extends PlayerWrapper

    constructor: (options = {}) ->
      super
      this

    initialize: (options = {}) ->
      super
      _.extend this, _.pick options, ['vimeoID']
      throw new Error "initialize expects a vimeoID option" if not @vimeoID

    initializeEngine: (callback) ->
      @onError "vimeo is not yet supported..."
      callback()

    play: ->

    pause: ->

    seekTo: (time) ->

    whileplaying: =>

    whileloading: =>

    destroyEngine: ->

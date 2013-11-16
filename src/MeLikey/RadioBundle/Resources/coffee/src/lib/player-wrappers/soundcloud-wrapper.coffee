define [
  'soundcloudSDK'
  'lib/player-wrappers/base/player-wrapper'
], (SC, PlayerWrapper) ->
  'use strict'

  class SoundcloudWrapper extends PlayerWrapper

    constructor: (options = {}) ->
      super
      _.extend this, _.pick options, ['soundcloudUrl']
      this

    initialize: (options = {}) ->
      super
      _.extend this, _.pick options, ['soundcloudUrl']
      throw new Error "initialize expects a soundcloudUrl option" if not @soundcloudUrl

    initializeEngine: (callback) ->
      callback or= ->
      SC.get '/resolve', url: @soundcloudUrl, (response, error) =>
        if not error?
          params =
            autoPlay: false
            onfinish: @onFinish
            whileplaying: @whileplaying
            whileloading: @whileloading
          SC.stream response.stream_url, params, (sound) =>
            # Apparently there is no way of reliably determining if a sound loaded succesfully...
            # We always get a sound Object (even if it'll 404 on play), and onLoad() returns false if we read from the cache.
            @engine = sound
            @onReady()
            callback null, this
        else
          @onError "The track url could not be resolved :( That means 404..."
          callback()

    play: ->
      @engine.play()

    pause: ->
      @engine.pause()

    seekTo: (time) ->
      @engine.setPosition time

    whileplaying: =>
      @onDurationChange @engine.durationEstimate
      @onCurrentTimeChange @engine.position

    whileloading: =>
      @onBufferChange @engine.bytesLoaded / @engine.bytesTotal

    destroyEngine: ->
      return if not @engine?
      @engine.destruct()
      delete @engine

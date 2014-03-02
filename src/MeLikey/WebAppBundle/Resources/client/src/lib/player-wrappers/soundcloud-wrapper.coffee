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
      console.debug "SoundcloudWrapper.initializeEngine"
      callback or= ->
      SC.get 'https://api.soundcloud.com/resolve', url: @soundcloudUrl, (response, error) =>
        if not error? and response.stream_url
          console.debug "soundcloud api success"
          console.debug response
          params =
            autoPlay: false
            onfinish: @onFinish
            whileplaying: @whileplaying
            whileloading: @whileloading
          SC.stream response.stream_url, params, (sound) =>
            @engine = sound
            @onReady()
            callback null, this
        else
          console.error error
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

define [
  'models/base/model'
  'lib/player-wrappers/soundcloud-wrapper'
  'lib/player-wrappers/youtube-wrapper'
  'lib/player-wrappers/vimeo-wrapper'
], (Model, SoundcloudWrapper, YoutubeWrapper, VimeoWrapper) ->
  'use strict'

  class Player extends Model
  
    defaults:
      duration: 0
      loaded: 0
      currentTime: 0
      playing: false
      ready: false

    autoplay: false
    playerWrapper: null

    initialize: (attributes, options) ->
      console.debug "Player.initialize"
      super
      options or= {}
      _.extend this, _.pick(options, 'autoplay', 'soundcloud', 'youtube', 'vimeo')
      @initializePlayerWrapper()

    initializePlayerWrapper: ->
      console.debug "Player.initializePlayerWrapper"
      params =
        autoplay: @autoplay
        onError: @onError
        onReady: @onReady
        onFinish: @onFinish
        onCurrentTimeChange: @onCurrentTimeChange
        onBufferChange: @onBufferChange
        onDurationChange: @onDurationChange
      if @soundcloud?
        @playerWrapper = new SoundcloudWrapper _.extend(params, {soundcloudUrl: @soundcloud})
      else if @youtube?
        @playerWrapper = new YoutubeWrapper _.extend(params, {youtubeID: @youtube})
      else if @vimeo?
        @playerWrapper = new VimeoWrapper _.extend(params, {vimeoID: @vimeo})
      else throw new Error "Unknown Track type, no compatible player found..."
      @playerWrapper.initializeEngine()

    onReady: =>
      @set 'ready', true
      if @autoplay then @play()

    play: ->
      return if @disposed or (@get 'playing') or !@get 'ready'
      @playerWrapper.play()
      @set 'playing', true

    pause: ->
      return if @disposed or !(@get 'playing') or !@get 'ready'
      @playerWrapper.pause()
      @set 'playing', false

    seekTo: (time) ->
      @playerWrapper.seekTo time

    onFinish: =>
      @trigger 'Player:end', this

    onError: =>
      @trigger 'Player:error', this

    onCurrentTimeChange: (time) =>
      @set 'currentTime', time

    onBufferChange: (buffer) =>
      @set 'loaded', buffer

    onDurationChange: (duration) =>
      @set 'duration', duration

    dispose: ->
      return if @disposed
      @playerWrapper.destroyEngine() if @playerWrapper?
      delete @playerWrapper
      super

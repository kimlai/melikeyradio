define [
  'jquery'
  'lib/player-wrappers/base/player-wrapper'
], ($, PlayerWrapper) ->
  'use strict'

  class YoutubeWrapper extends PlayerWrapper

    constructor: (options = {}) ->
      super
      _.extend this, _.pick options, ['youtubeID']
      this

    initialize: (options = {}) ->
      super
      _.extend this, _.pick options, ['youtubeID']
      throw new Error "initialize expects a youtubeID option" if not @youtubeID

    initializeEngine: (callback) ->
      callback or= ->
      #check if iframe already exists. 
      #TODO This could lead to iframe being irresponsive if multiple tracks with same youtubeID are on the page.
      # Possible solution : have the id be 'youtube_me_likey_[youtubeID]_[iframecount].
      iframeHolder = $('#youtube_melikey_'+@youtubeID)
      unless iframeHolder.length > 0
        $('<div />', {id: 'youtube_melikey_'+@youtubeID}).appendTo('body')
      params =
        showinfo: 0
        controls: 1
        autoplay: 0
      wrapper = this
      ytPlayer = new YT.Player('youtube_melikey_'+@youtubeID,
        width: 300
        height: 300
        videoId: @youtubeID,
        playerVars: params
        events:
          onReady: -> wrapper.onYoutubePlayerReady(callback)
      )
      @engine = ytPlayer

    play: ->
      @engine.playVideo()

    pause: ->
      @engine.pauseVideo()

    seekTo: (time) ->
      @engine.seekTo time

    destroyEngine: ->
      return if not @engine?
      clearInterval(@intervalID)
      @engine.destroy()
      delete @engine

    onYoutubePlayerReady: (callback) ->
      @onDurationChange @engine.getDuration()
      @engine.addEventListener 'onError', @onError
      @engine.addEventListener('onStateChange', (event) =>
        switch event.data
          when 0
            @onFinish()
            clearInterval(@intervalID)
          when 1
            @onCurrentTimeChange @engine.getCurrentTime()
            @onBufferChange  @engine.getVideoLoadedFraction()
            clearInterval(@intervalID)
            @intervalID = setInterval (=>
              @onCurrentTimeChange @engine.getCurrentTime()
              @onBufferChange  @engine.getVideoLoadedFraction()
            ), 1000
          when 2 then clearInterval(@intervalID)
          when 3 then clearInterval(@intervalID)
      )
      @onReady()
      callback null, this

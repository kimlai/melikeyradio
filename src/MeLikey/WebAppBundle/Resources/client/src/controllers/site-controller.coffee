define [
  'chaplin'
  'controllers/base/controller'
  'models/track'
  'views/global-player-view'
  'views/playlist-view'
  'views/header-view'
], (Chaplin, Controller, Track, GlobalPlayerView, PlaylistView, HeaderView) ->
  'use strict'

  class SiteController extends Controller

    beforeAction: ->
      super
      @reuse 'header', HeaderView, { region: 'header' }
      @reuse 'globalPlayer', GlobalPlayerView, { region: 'globalPlayer', model: Chaplin.mediator.radioManager.currentTrack }
      @reuse 'playlist', PlaylistView, { region: 'playlist', collection: Chaplin.mediator.radioManager.playlist }

    initialize: ->
      @subscribeEvent 'GlobalPlayer:next', @next
      @subscribeEvent 'GlobalPlayer:prev', @prev
      @subscribeEvent 'Track:end', @next
      @subscribeEvent 'Track:error', @next
      @subscribeEvent 'Track:play', @onTrackPlay

    onTrackPlay: (track) ->
      @publishEvent 'Radio:newTrackPlaying', track

    next: (track) ->
      Chaplin.mediator.radioManager.next track

    prev: (track) ->
      Chaplin.mediator.radioManager.prev track

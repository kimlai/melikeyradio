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

    beforeAction:
      '.*.': ->
        @compose 'globalPlayer', GlobalPlayerView, { region: 'globalPlayer' }
        @compose 'playlist', PlaylistView, { region: 'playlist', collection: Chaplin.mediator.radioManager.playlist }
        @compose 'header', HeaderView, { region: 'header' }

    initialize: ->
      @subscribeEvent 'GlobalPlayer:next', @next
      @subscribeEvent 'GlobalPlayer:prev', @prev
      @subscribeEvent 'Track:end', @next

    next: (track) ->
      Chaplin.mediator.radioManager.next track

    prev: (track) ->
      Chaplin.mediator.radioManager.prev track

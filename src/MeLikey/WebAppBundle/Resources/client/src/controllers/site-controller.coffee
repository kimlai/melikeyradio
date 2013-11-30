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
      @compose 'header', HeaderView, { region: 'header' }
      @compose 'globalPlayer', GlobalPlayerView, { region: 'globalPlayer', model: Chaplin.mediator.radioManager.currentTrack }
      @compose 'playlist', PlaylistView, { region: 'playlist', collection: Chaplin.mediator.radioManager.playlist }

    initialize: ->
      @subscribeEvent 'GlobalPlayer:next', @next
      @subscribeEvent 'GlobalPlayer:prev', @prev
      @subscribeEvent 'Track:end', @next

    next: (track) ->
      Chaplin.mediator.radioManager.next track

    prev: (track) ->
      Chaplin.mediator.radioManager.prev track

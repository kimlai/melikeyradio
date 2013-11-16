define [
  'views/track-view'
], (TrackView) ->
  'use strict'

  class HomeView extends TrackView
    
    region: 'main'
    controls: true
    seekbar: false
    className: 'track big'

    initialize: ->
      super
      @subscribeEvent 'Radio:loadingNewTracks', ->
        $('#main-loader').addClass('loading')
        $('#main-container').addClass('loading')
      @subscribeEvent 'Radio:newTracksLoaded', ->
        $('#main-loader').removeClass('loading')
        $('#main-container').removeClass('loading')

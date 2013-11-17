define [
  'controllers/site-controller'
  'models/track'
  'views/track-view'
], (SiteController, Track, TrackView) ->
  'use strict'

  class TrackController extends SiteController
    show: (params) ->
      @model = new Track
        id: 54
        title: 'Suburbs'
        artist: 'Mr Little Jeans'
        type: 'soundcloud'
        soundcloud: 'https://soundcloud.com/mrlittlejeans/suburbs'
      @view = new TrackView model: @model, region: 'main'

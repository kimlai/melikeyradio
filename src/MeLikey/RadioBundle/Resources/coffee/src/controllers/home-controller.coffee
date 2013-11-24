define [
  'chaplin'
  'controllers/site-controller'
  'views/home-view'
], (Chaplin, SiteController, HomeView) ->
  'use strict'

  class HomeController extends SiteController

    show: (params) ->
      rm = Chaplin.mediator.radioManager
      track = rm.currentTrack
      if track?
        @model = track
      options =
        controls: true
        seekbar: false
        className: 'track big'
      if @model?
        @view = new HomeView _.extend(options, model: @model)
      else
        $('#main-loader').addClass('loading')
        $('#main-container').addClass('loading')
      # TODO BUG: 
      # When the user is on a single Track page, then goes to "Radio", loads new tracks, and the new radio track is the one from the single page.
      # Then the 'Radio:newTrackPlaying' doesn't get fired since the track is already playing,
      # and the Controller never removes the loader and never instanciates the HomeView.....  The chance of that happening is not that big though.
      @subscribeEvent 'Radio:newTrackPlaying', (track) ->
        $('#main-loader').removeClass('loading')
        $('#main-container').removeClass('loading')
        @view.dispose() if @view?
        @view = new HomeView _.extend(options, model: track)

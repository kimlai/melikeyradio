define [
  'models/track'
  'views/track-view'
  'views/player-controls-view'
  'views/seekbar-view'
  'templates/track-compact'
], (Track, TrackView, PlayerControlsView, SeekbarView, template) ->
  'use strict'

  class CompactTrackView extends TrackView
    className: 'track compact'
    template: template
    template = null

    initialize: ->
      super
      @delegate 'click', '.toggle-infos', @toggleInfo

    toggleInfo: ->
      # Using classes gives the possibility to switch to css3 transitions instead of jQuery.
      extrainfo = @$el.find('ul.extra-infos').toggleClass('expanded')
      if extrainfo.hasClass 'expanded'
        extrainfo.slideDown(200)
      else
        extrainfo.slideUp(200)

    createSubviews: (player) ->
      options = {model: player, container: @$el.find('.artwork'), containerMethod: 'after'}
      if @controls
        playerControlsView = new PlayerControlsView(_.extend(options, @playerOptions))
        @subview 'player-controls', playerControlsView
      if @seekbar
        playerView = new SeekbarView(options)
        @subview 'player', playerView

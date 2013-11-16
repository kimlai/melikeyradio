define [
  'models/track'
  'models/tracks'
  'views/track-view'
  'views/player-controls-view'
  'views/playlist-view'
  'templates/global-player'
  'lib/utils'
], (Track, Tracks, TrackView, PlayerControlsView, PlaylistView, template, utils) ->
  'use strict'
  
  #
  # This is the global player that's at the bottom of every page.
  # It shows the currently playing track, and holds a playlist view that shows a fragment of the Radio's playlist,
  # as well as global controls (play, pause, next).
  #
  class GlobalPlayerView extends TrackView
    className: 'player'
    autoRender: false
    containerMethod: 'prepend'
    template: template
    template = null
    controls: false
    seekbar: true

    initialize: (options) ->
      super
      # when the 'next' and 'prev' buttons are clicked, a global event is published, which will be catched by the Controller currently running.
      @delegate 'click', '.next', -> @publishEvent 'GlobalPlayer:next', @model
      @delegate 'click', '.prev', -> @publishEvent 'GlobalPlayer:prev', @model
      @delegate 'click', '.toggle-playlist', @togglePlaylist
      @subscribeEvent "Track:play", @onTrackPlay, this
      @subscribeEvent "Track:error", @onTrackError

    # Syncs the view's model when a track starts playing (ie when a global "Track:play" event is fired).
    # If the new track isn't in @radioTracks, remove it from the vault for later disposal.
    onTrackPlay: (track) ->
      return if track is @model
      if @model? and track isnt @model # Current Track change (and not simply resume playback)
        @model.player.pause()
        @stopListening @model, 'Track:playerReady'
      Track.addToVault track # the Track is playing, so it needs to be protected from disposal.
      @model = track
      @render()

    render: ->
      super
      return unless @model? and @model.player?
      playerControlsView = new PlayerControlsView({model: @model.player, container: @$el.find('.prev'), containerMethod: 'after', autoRender: true})
      @subview 'player-controls', playerControlsView

    togglePlaylist: ->
      $('#main-footer').toggleClass('expanded')

    onTrackError: (track) ->

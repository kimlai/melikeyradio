define [
  'chaplin'
  'models/track'
  'models/tracks'
  'models/playlist'
  'lib/utils'
], (Chaplin, Track, Tracks, Playlist, utils) ->
  'use strict'

  #
  # This class is responsible for handling the Radio Tracks.
  # It fetches Radio playlist fragments when needed.
  # It plays and stops Radio Tracks when needed (either a Track has stopped playing, or the Next/Prev button was clicked).
  #
  class RadioManager

    _(@prototype).extend Chaplin.EventBroker # Grants Pub/Sub capabilities.
    playlistID: 25
    position: 0
    playlist: null

    constructor: (options) ->
      _(this).extend _.pick options, ['playlistID', 'position']
      @playlist = new Playlist null, { id: @playlistID }
      @playlist.on 'remove', (track) ->
        Track.removeFromVault track
        track.dispose()
      @subscribeEvent 'Track:play', @onTrackPlay
      @fetchTracks()

    onTrackPlay: (track) ->
      position = @playlist.indexOf track
      if position >= 0 # this is a radio track playing
        @currentTrack = track
        @position += position - 6 # load 6 tracks before the new track playing, and 6 tracks after it.
        utils.setCookie @playlistID, @position
        @publishEvent 'Radio:newTrackPlaying', track

    fetchTracks: ->
      @isSyncing = true
      @playlist.fetch {
        set:
          merge: false
        success: =>
          @isSyncing = false
          if not @currentTrack?
            @currentTrack = @playlist.at(0)
            @currentTrack.play()
      }

    prev: (currentTrack) ->
      return if @isSyncing
      prevTrack = @playlist.prev(currentTrack)
      if prevTrack?
        prevTrack.player.play()
        @publishEvent 'Radio:newTrackPlaying', prevTrack # For the HomeController to update its view.

    next: (currentTrack) ->
      return if @isSyncing
      nextTrack = @playlist.next(currentTrack)
      if nextTrack?
        nextTrack.player.play()
        @publishEvent 'Radio:newTrackPlaying', nextTrack # For the HomeController to update its view.

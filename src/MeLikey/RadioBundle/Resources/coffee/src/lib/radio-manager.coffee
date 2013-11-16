define [
  'chaplin'
  'models/track'
  'models/tracks'
  'lib/utils'
], (Chaplin, Track, Tracks, utils) ->
  'use strict'
  
  #
  # This class is responsible for handling the Radio Tracks. 
  # It fetches Radio playlist fragments when needed.
  # It plays and stops Radio Tracks when needed (either a Track has stopped playing, or the Next/Prev button was clicked).
  #
  class RadioManager

    _(@prototype).extend Chaplin.EventBroker # Grants Pub/Sub capabilities.
    playlistID: 1
    position: 0
    playlist: null

    constructor: (options) ->
      _(this).extend _.pick options, ['playlistID', 'position']
      @playlist = new Tracks null,
        url: Routing.generate('me_likey_radio_playlist_fragment')
        model : (attrs, options) ->
          t = new Track attrs.track, _.extend options, {addToVault: true} # models are automatically added to the vault
          t.position = attrs.position
          return t
        comparator: (t) -> t.position
      @playlist.on 'remove', (track) ->
        console.debug "removing an item from the playlist"
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
        @fetchTracks()

    fetchTracks: ->
      @isSyncing = true
      @playlist.fetch {
        set:
          merge: false
        data:
          playlistID: @playlistID
          position: @position
        success: =>
          @isSyncing = false
          if not @currentTrack?
            @currentTrack = @playlist.at(6)
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

define [
  'chaplin'
  'models/track'
  'models/tracks'
  'models/playlist'
  'cookiesjs'
], (Chaplin, Track, Tracks, Playlist, Cookie) ->
  'use strict'

  #
  # This class is responsible for handling the Radio Tracks.
  # It fetches the Radio playlist, and manages the playlist Cookie.
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
      @subscribeEvent 'Radio:newTrackPlaying', @onRadioTrackPlay
      @fetchTracks()

    onRadioTrackPlay: (track) ->
      @position = @playlist.indexOf track
      @currentTrack = track
      Cookie.set "playlist" + @playlistID, @position, { expires: 60*60*24*100 }

    fetchTracks: ->
      @isSyncing = true
      @playlist.fetch {
        set:
          merge: false
        success: =>
          @isSyncing = false
          position = Cookie.get "playlist" + @playlistID
          if position? then @position = (parseInt(position) + 1) % @playlist.length
          if not @currentTrack?
            @currentTrack = @playlist.at(@position)
            @currentTrack.play()
      }

    prev: ->
      return if @isSyncing
      @currentTrack  = @playlist.prev(@currentTrack)
      @currentTrack.play()

    next: ->
      return if @isSyncing
      @currentTrack = @playlist.next(@currentTrack)
      @currentTrack.play()

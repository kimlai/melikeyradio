define [
  'models/base/model'
  'models/player'
], (Model, Player) ->
  'use strict'

  class Track extends Model

    # Static property and methods. 
    # Tracks in the vault are cached, and can't be disposed.
    # The vault is kinda like a Store, but only for specific Tracks (those either currently playing, or in the radio playlist).
    @vault: {}
    @addToVault: (track) ->
      Track.vault[track.id] or= track
    @removeFromVault: (track) ->
      delete Track.vault[track.id] # Don't dispose, this will be done later by a Controller
    @flushVault: ->
      Track.vault = {}

    autoplay: false
    player: null
    urlRoot: Routing.generate('me_likey_radio_tracks')

    constructor: (attributes, options) ->
      id = attributes.id
      return Track.vault[id] if Track.vault[id]
      options or= {}
      if options.addToVault
        Track.vault[id] = this
      super

    initialize: (attributes, options) ->
      super
      options or= {}
      options = _.pick(options, 'autoplay')
      _.extend this, options
      @initializePlayer()
      @once 'change:soundcloud change:youtube change:vimeo', @initializePlayer
    
    dispose: ->
      return if @disposed
      unless Track.vault[@id]?
        @player.dispose() if @player?
        super

    initializePlayer: (options) ->
      console.debug "Track.initializePlayer"
      player = @player
      if not player?
        @player = new Player {}, _.extend(@getAttributes(), {autoplay: @autoplay})
        @listenTo @player, 'change:playing', @onPlayerPlayStateChange
        @listenTo @player, 'change:ready', @onPlayerReadyStateChange
        @listenTo @player, 'Player:end', @onPlayerFinish
        @listenTo @player, 'Player:error', @onPlayerError

    play: ->
      console.debug "Track.play"
      if @player.get 'ready'
        @player.play()
      else
        @listenToOnce @player, 'change:ready', @play

    onPlayerError: ->
      @publishEvent 'Track:error', this

    onPlayerPlayStateChange: ->
      if @player.get 'playing'
        console.debug "coucou"
        @publishEvent 'Track:play', this
        
    onPlayerFinish: ->
      @publishEvent 'Track:end', this
        
    onPlayerReadyStateChange : ->
      if @player.get 'ready'
        @trigger 'Track:playerReady', @player

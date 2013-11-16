define [
  'models/player'
  'views/base/view'
  'text!templates/player-controls.hbs'
], (Track, View, template) ->
  'use strict'

  class PlayerControlsView extends View
    autoRender: true
    tagName: 'section'
    className: 'player-controls'
    template: template
    template = null

    initialize: (options) ->
      super
      @delegate 'click', '.play', @play
      @delegate 'click', '.pause', @pause
      @togglePlayPause() # TODO hacky, forces to check model's playing status on init.
      @listenTo @model, 'change:playing', @togglePlayPause
      @listenTo @model, 'change:ready', @toggleReadyState

    togglePlayPause: ->
      return if not @model?
      if @model.get 'playing'
        @displayBufferingIndicator()
        @$el.addClass 'playing'
      else
        @$el.removeClass 'playing'

    toggleReadyState: ->
      return if not @model?
      if @model.get 'ready'
        @$el.addClass 'ready'
      else
        @$el.removeClass 'ready'

    displayBufferingIndicator: ->
      timeout = setTimeout (=>
        @$el.addClass 'buffering' if @$el?
      ), 200
      @listenToOnce @model, 'change:currentTime', ->
        clearTimeout timeout
        @$el.removeClass 'buffering'

    play: ->
      @model.play()

    pause: ->
      @model.pause()

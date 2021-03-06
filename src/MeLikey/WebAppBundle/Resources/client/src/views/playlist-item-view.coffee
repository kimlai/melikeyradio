define [
  'models/track'
  'views/base/view'
  'templates/playlist-item'
], (Track, View, template) ->
  'use strict'

  class PlaylistItemView extends View
    autoRender: true
    tagName: 'article'
    className: 'playlist-item'
    template: template
    template = null

    initialize: ->
      @togglePlaying() if @model?
      @delegate 'click', ->
        @model.play()
      @listenTo @model.player, 'change:playing', @togglePlaying

    togglePlaying: ->
      if @model.player.get 'playing'
        @$el.addClass 'playing'
      else
        @$el.removeClass 'playing'

    getTemplateData: ->
      return if not @model?
      track:
        @model.getAttributes()

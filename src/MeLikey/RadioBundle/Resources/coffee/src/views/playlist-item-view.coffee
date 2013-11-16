define [
  'models/track'
  'views/base-view'
  'templates/playlist-item'
], (Track, BaseView, template) ->
  'use strict'

  class PlaylistItemView extends BaseView
    autoRender: true
    tagName: 'article'
    className: 'playlist-item'
    template: template
    template = null

    initialize: ->
      @togglePlaying() if @model?
      @delegate 'click', ->
        @model.player.play() if @model.player? and @model.player.get 'ready'
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


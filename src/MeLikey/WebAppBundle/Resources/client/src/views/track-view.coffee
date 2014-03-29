define [
  'models/track'
  'views/base/view'
  'views/player-controls-view'
  'views/seekbar-view'
  'templates/track-full'
  #'facebookSDK'
], (Track, View, PlayerControlsView, SeekbarView, template, FB) ->
  'use strict'

  class TrackView extends View
    autoRender: true
    tagName: 'article'
    className: 'track'
    template: template
    template = null
    seekbar: true
    controls: true

    initialize: (options) ->
      super
      options or= {}
      _(this).extend _.pick(options, 'seekbar', 'controls')
      @listenTo @model, 'change', @render if @model?
      @delegate 'click', '.fb-share', @share
      @delegate 'click', '.tw-share', @share
      @delegate 'click', '.addLikey', @toggleLikey

    render: ->
      super
      if @model?
        @createSubviews(@model.player)

    getTemplateData: ->
      return if not @model?
      track:
        @model.getAttributes()

    createSubviews: (player) ->
      options = {model: player, container: @el}
      if @controls
        playerControlsView = new PlayerControlsView(_.extend(options, @playerOptions))
        @subview 'player-controls', playerControlsView
      if @seekbar
        playerView = new SeekbarView(options)
        @subview 'player', playerView

    share: (e) ->
      top = screen.height/2 - 225
      left = screen.width/2 - 275
      url = e.target.href
      window.open url, '_blank', 'width=550,height=450,top='+top+',left='+left

    toggleLikey: ->
      @publishEvent 'login:displayWindow'

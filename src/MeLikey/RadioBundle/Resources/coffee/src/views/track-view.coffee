define [
  'models/track'
  'views/base-view'
  'views/player-controls-view'
  'views/seekbar-view'
  'templates/track-full'
  'facebookSDK'
], (Track, BaseView, PlayerControlsView, SeekbarView, template, FB) ->
  'use strict'

  class TrackView extends BaseView
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
      @delegate 'click', '.fb-share', @fbShare
      @delegate 'click', '.tw-share', @twitterShare
      @delegate 'click', '.addLikey', @toggleLikey

    render: ->
      super
      if @model?
        if @model.player? and @model.player.get 'ready'
          @createSubviews(@model.player)
        else
          @listenTo @model, 'Track:playerReady', (player) ->
            @createSubviews(player)

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

    fbShare: ->
      obj =
        method: 'feed',
        link: Routing.generate 'me_likey_radio_single_track', {id: @model.id}, true
      FB.ui obj

    twitterShare: ->
      top = screen.height/2 - 225
      left = screen.width/2 - 275
      params =
        url: Routing.generate 'me_likey_radio_single_track', {id: @model.id}, true
        via: 'melikeyradio'
        text: @model.get('artist') + ' - ' + @model.get('title')
      url = 'https://twitter.com/share?' + $.param params
      console.debug url
      window.open url, '_blank', 'width=550,height=450,top='+top+',left='+left

    toggleLikey: ->
      @publishEvent 'login:displayWindow'

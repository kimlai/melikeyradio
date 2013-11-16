define [
  'views/base/view'
  'text!templates/seekbar.hbs'
], (View, template) ->
  'use strict'

  class SeekbarView extends View
    # Automatically render after initialize.
    autoRender: true
    className: 'seekbar'

    # Save the template string in a prototype property.
    # This is overwritten with the compiled template function.
    # In the end you might want to used precompiled templates.
    template: template
    template = null

    initialize: (options) ->
      super
      @delegate 'click', '.loaded', @onSeek
      @delegate 'click', '.played', @onSeek
      if @model?
        @listenTo @model, 'change:currentTime change:loaded', @update

    update: ->
      if @model?
        @$el.find('.loaded').css('width', 100*@model.get('loaded') + '%')
        @$el.find('.played').css('width', 100*@model.get('currentTime')/@model.get('duration') + '%')

    onSeek: (event) ->
      time = Math.floor (event.offsetX / @$el.width()) * @model.get 'duration'
      @model.seekTo time

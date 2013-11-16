define [
  'views/base-view'
  'templates/header'
], (BaseView, template) ->
  'use strict'

  class HeaderView extends BaseView
    tagName: 'header'
    autoRender: true
    template: template
    template = null

    initialize: ->

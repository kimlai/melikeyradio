define [
  'views/base/view'
  'templates/header'
], (View, template) ->
  'use strict'

  class HeaderView extends View
    tagName: 'header'
    autoRender: true
    template: template
    template = null

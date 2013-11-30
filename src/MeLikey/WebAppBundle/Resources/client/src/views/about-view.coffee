define [
  'views/base/view'
  'templates/about'
], (View, template) ->
  'use strict'

  class AboutView extends View
    tagName: 'article'
    className: 'about'
    autoRender: true
    template: template
    template = null

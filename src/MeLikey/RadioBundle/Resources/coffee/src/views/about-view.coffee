define [
  'views/base-view'
  'templates/about'
], (BaseView, template) ->
  'use strict'

  class AboutView extends BaseView
    tagName: 'article'
    className: 'about'
    autoRender: true
    template: template
    template = null

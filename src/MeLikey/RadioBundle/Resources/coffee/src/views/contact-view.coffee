define [
  'views/base-view'
  'templates/contact'
], (BaseView, template) ->
  'use strict'

  class ContactView extends BaseView
    tagName: 'article'
    className: 'contact'
    autoRender: true
    template: template
    template = null

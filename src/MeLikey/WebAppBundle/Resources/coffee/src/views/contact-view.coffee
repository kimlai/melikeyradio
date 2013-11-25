define [
  'views/base/view'
  'templates/contact'
], (View, template) ->
  'use strict'

  class ContactView extends View
    tagName: 'article'
    className: 'contact'
    autoRender: true
    template: template
    template = null

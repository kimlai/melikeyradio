define [
  'views/base/view'
  'templates/navigation'
], (View, template) ->
  'use strict'

  class NavigationView extends View
    tagName: 'ul'
    autoRender: true
    template: template
    template = null

    initialize: ->
      @delegate 'click', 'a', (event) ->
        @$el.find('li').removeClass 'active'
        $(event.target).closest('li').addClass 'active'

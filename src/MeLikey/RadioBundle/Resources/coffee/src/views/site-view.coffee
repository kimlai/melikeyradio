define [
  'views/base/view'
  'templates/site'
], (View, template) ->
  'use strict'

  class SiteView extends View
    container: 'body'
    id: 'site-container'
    regions:
      'main': '#main-container'
      'header': '#main-header'
      'globalPlayer': '#global-player'
      'playlist': '#global-playlist'
    template: template
    template = null

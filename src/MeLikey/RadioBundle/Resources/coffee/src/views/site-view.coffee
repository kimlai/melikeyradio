define [
  'views/base/view'
  'text!templates/site.hbs'
], (View, template) ->
  'use strict'

  class SiteView extends View
    container: 'body'
    id: 'site-container'
    regions:
      '#main-container': 'main'
      '#main-header': 'header'
      '#global-player': 'globalPlayer'
      '#global-playlist': 'playlist'
    template: template
    template = null

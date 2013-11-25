define [
  'controllers/site-controller'
  'views/about-view'
  'views/contact-view'
], (SiteController, AboutView, ContactView) ->
  'use strict'

  class StaticStuffController extends SiteController

    about: ->
      @view = new AboutView region: 'main'

    contact: ->
      @view = new ContactView region: 'main'

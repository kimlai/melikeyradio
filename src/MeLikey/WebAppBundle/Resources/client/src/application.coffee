define [
  'chaplin'
  'routes'
  'views/layout'
  'lib/radio-manager'
  'lib/session-manager'
], (Chaplin, routes, Layout, RadioManager, SessionManager) ->
  'use strict'

  # The application object
  # Choose a meaningful name for your application
  class MeLikeyRadio extends Chaplin.Application
    # Set your application name here so the document title is set to
    # “Controller title – Site title” (see Chaplin.Layout#adjustTitle)
    title: 'MeLikeyRadio'

    initialize: (options) ->

      # Initialize core components.
      # ---------------------------

      # Register all routes.
      # You might pass Router/History options as the second parameter.
      # Chaplin enables pushState per default and Backbone uses / as
      # the root per default. You might change that in the options
      # if necessary:
      # @initRouter routes, pushState: false, root: '/subdir/'
      @initRouter routes

      # Dispatcher listens for routing events and initialises controllers.
      @initDispatcher controllerSuffix: '-controller'

      # Layout listens for click events & delegates internal links to router.
      @initLayout()

      # Composer grants the ability for views and stuff to be persisted.
      @initComposer()

      # Mediator is a global message broker which implements pub / sub pattern.
      @initMediator(options.playlistID)

      # Actually start routing.
      @start()

      # Freeze the application instance to prevent further changes.
      Object.freeze? this

    # Start our own custom Layout
    # It only toggles the class 'loading' on the #main-container when hiding/showing a new View.
    # ------------------------------------------------------------------------------------------
    initLayout: ->
      @layout = new Layout {@title}

    # Create additional mediator properties
    # -------------------------------------
    initMediator: (playlistID) ->
      # Add additional application-specific properties and methods
      # e.g. Chaplin.mediator.prop = null
      Chaplin.mediator.radioManager = new RadioManager {playlistID: playlistID}
      Chaplin.mediator.sessionManager = new SessionManager()

      # Seal the mediator.
      Chaplin.mediator.seal()

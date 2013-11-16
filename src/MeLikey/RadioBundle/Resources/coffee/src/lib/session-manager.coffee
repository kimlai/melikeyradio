define [
  'chaplin'
], (Chaplin) ->
  'use strict'
  
  #
  # This class is responsible for displaying the login/registration window, and holding the logged-in User reference.
  # It will trigger a global event when the User data is fetched.
  #
  class SessionManager

    _(@prototype).extend Chaplin.EventBroker # Grants Pub/Sub capabilities.
    user: null
    loginWindow: null

    constructor: (options) ->
      @subscribeEvent 'login:displayWindow', @displayLoginWindow

    displayLoginWindow:  ->
      if @loginWindow is null or @loginWindow.closed
        @openLoginWindow()
      else
        @loginWindow.focus()

    openLoginWindow: ->
      top = screen.height/2 - 225
      left = screen.width/2 - 275
      url = Routing.generate 'me_likey_music_lover_connect', true
      @loginWindow = window.open url, '_blank', 'width=550,height=450,top='+top+',left='+left

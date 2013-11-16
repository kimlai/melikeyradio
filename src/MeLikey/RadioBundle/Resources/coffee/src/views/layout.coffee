define [
  'chaplin'
], (Chaplin) ->
  'use scrict'

  class Layout extends Chaplin.Layout

    hideOldView: (controller) ->
      $('#main-container').addClass('loading')

    showNewView: (controller) ->
      $('#main-container').removeClass('loading')

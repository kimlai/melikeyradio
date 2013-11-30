define [
  'twig'
  'chaplin'
], (Twig, Chaplin) ->
  'use strict'

  class View extends Chaplin.View
    getTemplateFunction: ->
      return if not @template
      (data) =>
        Twig.render @template, data

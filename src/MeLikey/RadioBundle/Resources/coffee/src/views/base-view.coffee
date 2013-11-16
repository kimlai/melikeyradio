define [
  'views/base/view'
  'twig'
], (View, Twig) ->
  'use strict'

  # No-op class that overrides getTemplateFunction() to work with Twig-js
  class BaseView extends View

    getTemplateFunction: ->
      (data) =>
        Twig.render @template, data

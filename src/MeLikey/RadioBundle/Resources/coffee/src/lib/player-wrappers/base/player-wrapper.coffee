define [
  'underscore'
], (_)->
  'use strict'

  # This is a no-op class.
  # It is a layer between third-party players and our Player model.
  class PlayerWrapper

    constructor: (options = {}) ->
      _.extend this, _.pick options, ['autoplay', 'onError', 'onReady', 'onFinish', 'onCurrentTimeChange', 'onBufferChange', 'onDurationChange']
      this

    initialize: (options = {}) ->
      _.extend this, _.pick options, ['autoplay', 'onError', 'onReady', 'onFinish', 'onCurrentTimeChange', 'onBufferChange', 'onDurationChange']

    onError: ->
    onReady: ->
    onFinish: ->
    onCurrentTimeChange: ->
    onBufferChange: ->
    onDurationChange: ->

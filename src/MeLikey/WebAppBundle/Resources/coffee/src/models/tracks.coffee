define [
  'models/base/collection'
  'models/track'
], (Collection, Track) ->
  'use strict'

  class Tracks extends Collection
    model: Track
    url: Routing.generate('melikey_api_get_tracks')

    initialize: (models, options) ->
      @on 'remove', (track) ->
        track.dispose()

    comparator: (t1, t2) ->
      d1 = new Date t1.get 'created'
      d2 = new Date t2.get 'created'
      return -1 if d1 > d2
      return 1 if d1 < d2
      return 0

    dispose: ->
      for track in @models
        track.dispose() unless track.disposed
      super

    next: (track) ->
      return @at(@indexOf(track) + 1)

    prev: (track) ->
      return @at(@indexOf(track) - 1)

    # TODO is this messy ?
    filterByTag: (tag) ->
      return @models if tag.id is '*'
      filtered = this.filter (track) ->
        (_(track.get 'tags').where tag.attributes).length
      return filtered

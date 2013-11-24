define [
  'models/track'
  'models/tracks'
], (Track, Tracks) ->
  'use strict'

  class Playlist extends Tracks

    url: ->
      Routing.generate 'melikey_api_get_playlist', { id: @id }

    initialize: (attr, options) ->
      _(this).extend _.pick options, 'id'

    model : (attrs, options) ->
      t = new Track attrs, _.extend options, {addToVault: true} # models are automatically added to the vault
      t.position = attrs.position
      return t

    comparator: (t) -> t.position

    parse: (response) ->
      _.map response.playlist_items, (item) ->
        item.track

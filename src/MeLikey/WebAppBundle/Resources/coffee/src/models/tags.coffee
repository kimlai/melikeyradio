define [
  'models/base/collection'
  'models/tag'
], (Collection, Tag) ->
  'use strict'

  class Tags extends Collection
    model: Tag
    url: Routing.generate('me_likey_radio_tags')

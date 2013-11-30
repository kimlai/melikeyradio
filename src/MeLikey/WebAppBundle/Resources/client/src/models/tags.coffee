define [
  'models/base/collection'
  'models/tag'
], (Collection, Tag) ->
  'use strict'

  class Tags extends Collection
    model: Tag
    url: Routing.generate('melikey_api_get_tags')

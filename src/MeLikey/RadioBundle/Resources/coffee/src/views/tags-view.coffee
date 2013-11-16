define [
  'views/base/collection-view'
  'views/tag-view'
], (CollectionView, TagView) ->
  'use strict'

  class TagsView extends CollectionView
    itemView: TagView
    region: 'main'
    tagName: 'ul'
    className: 'tags-list'

    initItemView: (model) ->
      super.on 'TagView:click', @onTagViewClick, this # Bubbling up the click event on tagViews.

    onTagViewClick: (tag) ->
      @trigger 'Tag:click', tag

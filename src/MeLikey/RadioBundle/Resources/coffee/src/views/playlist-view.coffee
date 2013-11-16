define [
  'views/base/collection-view'
  'views/playlist-item-view'
  'scrollbar'
], (CollectionView, PlaylistItemView) ->
  'use strict'

  class PlaylistView extends CollectionView
    itemView: PlaylistItemView
    tagName: 'section'
    className: 'playlist'

    initialize: ->
      @on 'addedToDOM', ->
        @$el.mCustomScrollbar {horizontalScroll: true, mouseWheel: true, mouseWheelPixels: 300}
      @subscribeEvent 'Radio:newTrackPlaying', @scrollToTrack
      @listenTo @collection, 'add remove', _.debounce @render, 1000

    updateScrollbar: ->
      @$el.mCustomScrollbar {horizontalScroll: true, mouseWheel: true, mouseWheelPixels: 300}

    scrollToTrack: (track) ->
      ### This is no good.
      pos = @collection.indexOf(track)
      @$el.mCustomScrollbar 'scrollTo', @$el.width()*pos / @collection.length/2
      ###

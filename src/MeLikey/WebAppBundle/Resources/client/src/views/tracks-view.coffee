define [
  'views/base/collection-view'
  'views/compact-track-view'
  'views/tags-view'
  'models/track'
], (CollectionView, CompactTrackView, TagsView, Track) ->
  'use strict'

  class TracksView extends CollectionView
    itemView: CompactTrackView
    region: 'main'
    tagName: 'section'
    className: 'tracks-list'
    initialModels: null

    initialize: (options) ->
      options or= {}
      super
      _.extend this, _.pick options, 'tags'
      #used for endless scroll
      @loading = false
      @offset = 9999999 #so @loadTracks isn't called at at startup. Feels hacky though.
      @on 'visibilityChange', ->
        lastTrack = @$el.find('.track:last')
        if lastTrack.length > 0
          @offset = lastTrack.offset().top
        else @offset = 9999999
      # debouncing the scroll event prevents useless comptuations.
      $(window).scroll _.debounce(@scroll, 300)
      if @tags?
        @tagsView = new TagsView collection: @tags, container: @el, containerMethod: 'prepend'
        @listenTo @tagsView, 'Tag:click', @filterByTag

    dispose: ->
      return if @disposed
      $(window).off 'scroll'
      @off 'visibilityChange'
      super

    scroll: =>
      $window = $(window)
      if @offset - $window.height() <= $window.scrollTop() and not @loading
        @loadTracks()

    # TODO Find a something so we can bootstrap the collection with playing tracks (held by the GlobalPLayerView for now).
    loadTracks: ->
      return if @reachedTheEnd
      @loading = true
      data = {offset: @collection.length}
      if @activeTag?
        _.extend data, {tags: @activeTag.get 'id'}
      @collection.fetch {
        data: data
        remove: false
        merge: false
        success: (tracks) =>
          @loading = false
          @reachedTheEnd = tracks.length == data.offset
      }

    filterByTag: (tag) ->
      if not @initialModels?
        @initialModels = @collection.models
        _.each @initialModels, (track) ->
          Track.addToVault track
      @collection.set @initialModels, {merge: false}
      if tag.id is '*'
        @activeTag = null
      else
        filtered = @collection.filterByTag tag
        @collection.reset filtered
        @activeTag = tag
        @loadTracks()

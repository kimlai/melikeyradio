define [
  'controllers/site-controller'
  'models/track'
  'models/tracks'
  'views/track-view'
  'views/tracks-view'
  'views/playlist-view'
  'models/tag'
  'models/tags'
  'views/tags-view'
], (SiteController, Track, Tracks, TrackView, TracksView, PlaylistView, Tag, Tags, TagsView) ->
  'use strict'

  class TracksController extends SiteController

    index: (params) ->
      $('#main-loader').addClass('loading')
      @tracks = new Tracks()
      @tracks.fetch {
        merge: false
        success: =>
          @view.renderAllItems()
          $('#main-loader').removeClass('loading')
          @compose 'playlist', PlaylistView, { region: 'playlist', collection: @tracks }
      }
      jokerTag = new Tag {id: '*', name: 'Latest'}
      @tags = new Tags [jokerTag]
      @tags.fetch {remove: false}
      @view = new TracksView collection: @tracks, renderItems: false, tags: @tags

    # Nedds optimization (don't fetch all the time etc.)
    show: (params) ->
      @model = new Track {id: params.id}, {autoplay: true}
      options = {model: @model, region: 'main', className: 'track big', seekbar: false}
      if not @model.get 'title'
        $('#main-loader').addClass('loading')
        _.extend options, autoRender: false
        @model.fetch success: (track) ->
          $('#main-loader').removeClass('loading')
      @view = new TrackView options

    # Override default behaviour on click on the Global player Next button.
    next: (track) ->
      return super if not @tracks
      nextTrack = @tracks.next(track)
      if nextTrack?
        nextTrack.player.play()
      else
        console.debug "We need to load more track in the collection !"

    prev: (track) ->
      return super if not @tracks
      prevTrack = @tracks.prev(track)
      if prevTrack?
        prevTrack.player.play()

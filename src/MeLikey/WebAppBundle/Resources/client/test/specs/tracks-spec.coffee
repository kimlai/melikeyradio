define [
  'models/track'
  'models/tracks'
], (Track, Tracks) ->
  'use strict'

  describe "Tracks", ->
      tracks = null
      t1 = null
      t2 = null

      beforeEach ->
        t1 = new Track {
          id: 1
          created: '2012-05-14T09:25:18+0200'
          soundcloud: '404'
          tags: [
            {id: 'hip-hop', name: 'Hip Hop'}
            {id: 'electro', name: 'Electro'}
          ]
        }
        t2 = new Track {
          id: 2
          soundcloud: '404'
          created: '2013-05-09T07:59:17+0200'
          tags: [
            {id: 'electro', name: 'Electro'}
            {id: 'folk', name: 'Folk'}
          ]
        }
        tracks = new Tracks [t1, t2]

      afterEach ->
        tracks.dispose()
        tracks = null

      it "should be filterable", ->
        electro = tracks.filter {id: 'electro', name: 'Electro'}
        folk = tracks.filter {id: 'folk', name: 'Folk'}
        hipHop = tracks.filter {id: 'hip-hop', name: 'Hip Hop'}
        techno = tracks.filter {id: 'techno', name: 'Techno'}
        assert.deepEqual electro, tracks.models
        assert.deepEqual folk, [t2]
        assert.deepEqual hipHop , [t1]
        assert.deepEqual techno, []

      it.only "should be sortable", ->
        assert.equal tracks.at(0), t2
        assert.equal tracks.at(1), t1

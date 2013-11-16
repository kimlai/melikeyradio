define [
  'models/track'
], (Track, Tracks) ->
  'use strict'

  describe.only "Track", ->
      t1 = null
      t2 = null

      beforeEach ->
        track = new Track {
          id: 1
          created: '2013-05-14T09:25:18+0200'
        }
        t2 = new Track {
          id: 2
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
        console.debug t2
        electro = tracks.filter {id: 'electro', name: 'Electro'}
        folk = tracks.filter {id: 'folk', name: 'Folk'}
        hipHop = tracks.filter {id: 'hip-hop', name: 'Hip Hop'}
        techno = tracks.filter {id: 'techno', name: 'Techno'}
        assert.deepEqual electro, tracks.models
        assert.deepEqual folk, [t2]
        assert.deepEqual hipHop , [t1]
        assert.deepEqual techno, []

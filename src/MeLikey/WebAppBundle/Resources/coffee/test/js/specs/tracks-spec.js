define(['models/track', 'models/tracks'], function(Track, Tracks) {
  'use strict';
  return describe("Tracks", function() {
    var t1, t2, tracks;
    tracks = null;
    t1 = null;
    t2 = null;
    beforeEach(function() {
      t1 = new Track({
        id: 1,
        created: '2012-05-14T09:25:18+0200',
        soundcloud: '404',
        tags: [
          {
            id: 'hip-hop',
            name: 'Hip Hop'
          }, {
            id: 'electro',
            name: 'Electro'
          }
        ]
      });
      t2 = new Track({
        id: 2,
        soundcloud: '404',
        created: '2013-05-09T07:59:17+0200',
        tags: [
          {
            id: 'electro',
            name: 'Electro'
          }, {
            id: 'folk',
            name: 'Folk'
          }
        ]
      });
      return tracks = new Tracks([t1, t2]);
    });
    afterEach(function() {
      tracks.dispose();
      return tracks = null;
    });
    it("should be filterable", function() {
      var electro, folk, hipHop, techno;
      electro = tracks.filter({
        id: 'electro',
        name: 'Electro'
      });
      folk = tracks.filter({
        id: 'folk',
        name: 'Folk'
      });
      hipHop = tracks.filter({
        id: 'hip-hop',
        name: 'Hip Hop'
      });
      techno = tracks.filter({
        id: 'techno',
        name: 'Techno'
      });
      assert.deepEqual(electro, tracks.models);
      assert.deepEqual(folk, [t2]);
      assert.deepEqual(hipHop, [t1]);
      return assert.deepEqual(techno, []);
    });
    return it.only("should be sortable", function() {
      assert.equal(tracks.at(0), t2);
      return assert.equal(tracks.at(1), t1);
    });
  });
});

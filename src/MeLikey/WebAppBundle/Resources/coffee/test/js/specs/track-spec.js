define(['models/track'], function(Track, Tracks) {
  'use strict';
  return describe.only("Track", function() {
    var t1, t2;
    t1 = null;
    t2 = null;
    beforeEach(function() {
      var track, tracks;
      track = new Track({
        id: 1,
        created: '2013-05-14T09:25:18+0200'
      });
      t2 = new Track({
        id: 2,
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
      var tracks;
      tracks.dispose();
      return tracks = null;
    });
    return it("should be filterable", function() {
      var electro, folk, hipHop, techno;
      console.debug(t2);
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
  });
});

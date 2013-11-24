define(['models/player'], function(Player) {
  'use strict';
  return describe('Player model', function() {
    return it("should throw an error if there's no compatible playerWrapper", function() {
      return assert.throws((function() {
        return new Player();
      }), "Unknown Track type, no compatible player found...");
    });
  });
});

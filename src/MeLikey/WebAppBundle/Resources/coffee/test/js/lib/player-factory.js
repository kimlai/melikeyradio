define(['models/soundcloud-player', 'models/youtube-player'], function(SoundcloudPlayer, YoutubePlayer) {
  'use strict';
  var PlayerFactory;

  return PlayerFactory = (function() {
    var PrivateClass, instance;

    function PlayerFactory() {}

    instance = null;

    PrivateClass = (function() {
      function PrivateClass() {}

      PrivateClass.prototype.createPlayer = function(attributes, options) {
        if (attributes.soundcloud != null) {
          return new SoundcloudPlayer({
            url: attributes.soundcloud
          }, options);
        }
        if (attributes.youtube != null) {
          return new YoutubePlayer({
            youtubeID: attributes.youtube
          }, options);
        }
      };

      return PrivateClass;

    })();

    PlayerFactory.getInstance = function() {
      return instance != null ? instance : instance = new PrivateClass();
    };

    return PlayerFactory;

  })();
});

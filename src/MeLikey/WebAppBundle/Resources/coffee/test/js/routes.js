define(function() {
  'use strict';
  return function(match) {
    match('', 'home#show');
    match('tracks/:id', 'tracks#show');
    match('latest', 'tracks#index');
    match('about', 'static-stuff#about');
    return match('contact', 'static-stuff#contact');
  };
});

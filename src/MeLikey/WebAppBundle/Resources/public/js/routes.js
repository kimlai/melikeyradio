define(function() {
  'use strict';
  return function(match) {
    match('', 'home#show');
    match('track/:id', 'tracks#show');
    match('latest', 'tracks#index');
    match('about', 'static-stuff#about');
    return match('contact', 'static-stuff#contact');
  };
});

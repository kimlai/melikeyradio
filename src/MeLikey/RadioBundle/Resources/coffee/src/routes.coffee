define ->
  'use strict'

  # The routes for the application. This module returns a function.
  # `match` is match method of the Router
  (match) ->
    match '', 'home#show'
    match 'tracks/:id', 'tracks#show'
    match 'tracks', 'tracks#index'
    match 'about', 'static-stuff#about'
    match 'contact', 'static-stuff#contact'

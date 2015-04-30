'use strict'

let routes = ($stateProvider, $urlRouterProvider) => {
  $stateProvider.state('home', {
    url: '/',
    templateUrl: '/shared/index.html'
  })

  $stateProvider.state('angular-and-beyond', {
    url: '/angular-and-beyond/*slide',
    templateUrl: '/talks/angular-and-beyond/deck.html',
    controller: 'AngularAndBeyond'
  })

  $stateProvider.state('heroku-an-introduction', {
    url: '/heroku-an-introduction/*slide',
    templateUrl: '/talks/heroku-an-introduction/deck.html',
    controller: 'HerokuAnIntroduction'
  })

  $stateProvider.state('hitchhikers-heroku', {
    url: '/hitchhikers-heroku/*slide',
    templateUrl: '/talks/hitchhikers-heroku/deck.html',
    controller: 'HitchhikersHeroku'
  })

  $stateProvider.state('appsworld', {
    url: '/appsworld/*slide',
    templateUrl: '/talks/ruby-pre-roll/deck.html',
    controller: 'RubyPreRoll'
  })

  $urlRouterProvider.otherwise('/')
}

routes.$inject = ['$stateProvider', '$urlRouterProvider']

export default routes

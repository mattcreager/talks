'use strict'

let routes = ($stateProvider, $urlRouterProvider) => {
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

  $urlRouterProvider.otherwise('/')
}

routes.$inject = ['$stateProvider', '$urlRouterProvider']

export default routes

'use strict'

let routes = ($stateProvider, $urlRouterProvider) => {
  $stateProvider.state('angular-and-beyond', {
    url: '/angular-and-beyond/*slide',
    templateUrl: '/talks/angular-and-beyond/deck.html',
    controller: 'AngularAndBeyond'
  })

  $urlRouterProvider.otherwise('/')
}

routes.$inject = ['$stateProvider', '$urlRouterProvider']

export default routes

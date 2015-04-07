'use strict'

import angular from 'angular'
import uiRouter from 'angular-ui-router'
import Reveal from './shared/reveal'
import routes from './routes'
import config from './config'

const TalkTrack = 'TalkTrack'

angular
  .module(TalkTrack, [uiRouter])
  .controller('AngularAndBeyond', ($scope, $state, config) => {
    $scope.title = 'Angular & Beyond'

    let reveal = new Reveal(config.reveal)

    reveal.setCurrentSlide($state.params.slide)
    reveal.addEventListener('slidechanged', (event) => {
      $state.go('angular-and-beyond', { slide: event.indexh }, { notify: false })
    })
  })
  .config(routes)
  .constant('config', config)

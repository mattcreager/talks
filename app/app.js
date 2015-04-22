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
  .controller('HerokuAnIntroduction', ($scope, $state, config) => {
    $scope.title = 'Heroku an Introduction'

    let reveal = new Reveal(config.reveal)

    reveal.setCurrentSlide($state.params.slide)
    reveal.addEventListener('slidechanged', (event) => {
      $state.go('heroku-an-introduction', { slide: event.indexh }, { notify: false })
    })
  })
  .controller('RubyPreRoll', ($scope, $state, config) => {
    $scope.title = 'Heroku an Introduction'

    let reveal = new Reveal(config.reveal)

    reveal.setCurrentSlide($state.params.slide)
    reveal.addEventListener('slidechanged', (event) => {
      if (reveal.isLastSlide()) {
        console.log('last slide')
        setTimeout(function() {
          console.log('setting current')
          reveal.setCurrentSlide(0)
        }, 8000)

        return
      } 

      $state.go('ruby-pre-roll', { slide: event.indexh }, { notify: false })
    })
  })
  .config(routes)
  .constant('config', config)

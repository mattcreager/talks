'use strict'

import angular from 'angular'
import uiRouter from 'angular-ui-router'
import Reveal from './shared/reveal'
import routes from './routes'
import config from './config'

const TalkTrack = 'TalkTrack'

angular
  .module(TalkTrack, [uiRouter])
  .controller('AngularAndBeyond', function ($state, $stateParams, config) {
    let reveal = new Reveal(config.reveal)
  })
  .config(routes)
  .constant('config', config)
'use strict'

/**
 * @fileOverview
 * Set global watching var to true
 */

var gulp = require('gulp')

gulp.task('setWatch', function () {
  global.isWatching = true
})

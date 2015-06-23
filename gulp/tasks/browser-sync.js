'use strict'

/**
 * @fileOverview
 * Browser Sync Task
 * Live-reload & cross-device synchronization
 */

var browserSync = require('browser-sync')
var gulp = require('gulp')

gulp.task('browserSync', ['build'], function () {
  browserSync({
    files: [
      './app/**/*.html',
      './app/bundle.css',
      './app/bundle.js'
    ],
    proxy: 'localhost:4302/'
  })
})

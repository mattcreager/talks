'use strict'

/**
 * @fileOverview
 * Browserify Task
 * Bundle javascript with Browserify. If watch task is running,
 * use Watchify instead.
 */

var gulp = require('gulp')
var browserify = require('browserify')
var watchify = require('watchify')
var babelify = require('babelify')
var source = require('vinyl-source-stream')
var path = require('path')

var bundleLogger = require('../util/bundle-logger')
var handleErrors = require('../util/error-handler')

gulp.task('browserify', function () {
  var bundler = browserify({
    // shim: {
    //   angular: {
    //       path: '/node_modules/angular/angular.js',
    //       exports: 'angular'
    //   },
    //   reveal: {
    //       path: '/node_modules/reveal.js/js/reveal.js',
    //       exports: 'Reveal'
    //   }
    // },
    entries: path.resolve(__dirname, '../..', 'app/app.js'),
    basedir: __dirname,
    debug: true,
    cache: {},        // required for watchify
    packageCache: {}, // required for watchify
    fullPaths: true,  // required for watchify
    globals: false
  })

  if (global.isWatching) {
    bundler = watchify(bundler)
  }

  bundler.transform(babelify)

  var bundle = function () {
    // Log when bundling starts
    bundleLogger.start()

    return bundler
      .bundle()
      .on('error', handleErrors)
      // Use vinyl-source-stream to make the stream gulp compatible
      .pipe(source('bundle.js'))
      .pipe(gulp.dest('./app'))
      // Log when bundling completes!
      .on('end', bundleLogger.end)
  }

  if (global.isWatching) {
    // Rebundle with watchify on changes.
    bundler.on('update', bundle)
  }

  return bundle()
})

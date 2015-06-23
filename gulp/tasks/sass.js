'use strict'

/**
 * @fileOverview
 * Less Task
 * Compiles less files
 */

var gulp = require('gulp')
var sass = require('gulp-sass')
var rename = require('gulp-rename')
var neat = require('node-neat')

var handleErrors = require('../util/error-handler')

gulp.task('sass', function () {
  gulp.src('./app/app.scss')
    .pipe(sass({
      outputStyle: 'expanded',
      errLogToConsole: true,
      includePaths: neat.includePaths
    }))
    .pipe(rename('bundle.css'))
    .pipe(gulp.dest('./app'))
    .on('error', handleErrors)
})

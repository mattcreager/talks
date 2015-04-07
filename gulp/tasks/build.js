'use strict'

/**
 * @fileOverview
 * Build Task
 * Run browserify & less tasks, and copy fonts to public directory
 */

var gulp = require('gulp')

gulp.task('build', ['browserify'])

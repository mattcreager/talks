module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    'bower-install': {
      target: {
        src: ['public/index.html']
      }
    }
  });

};
/* jshint browser:true */
/* global angular, Reveal */

'use strict';

(function($, Reveal) {
  Reveal.addEventListener('slidechanged', function(e) {
    var slideNumber = Reveal.getIndices().h;

    if (slideNumber === 29) {
      setInterval(itBeRainbowTime, 200);
    }

    var previousTitle = null;

    if (e.previousSlide) {
      previousTitle = $(e.previousSlide).data('title');
    }

    var currentTitle = $(e.currentSlide).data('title');

    if (!currentTitle) {
      $('.df-frame').hide();
      return;
    }
    if (previousTitle === currentTitle) return;

    $('.df-frame').show();
    $('#section-title').text(currentTitle);
  });

  function itBeRainbowTime() {
    $('.df-bar').css('background-color', getRandomColor());
    $('#section-title').css('color', getRandomColor());
  }

  function getRandomColor() {
      var letters = '0123456789ABCDEF'.split('');
      var color = '#';
      for (var i = 0; i < 6; i++ ) {
          color += letters[Math.round(Math.random() * 15)];
      }
      return color;
  }
})(jQuery, Reveal);



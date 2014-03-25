/* jshint browser:true */
/* global Reveal, jQuery */

(function($, Reveal) {
  'use strict';

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

    if (previousTitle === currentTitle) return;

    if (!currentTitle) {
      $('.df-frame').hide();
      return;
    }

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



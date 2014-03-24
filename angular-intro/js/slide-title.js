(function($, Reveal) {
  Reveal.addEventListener('slidechanged', function(e) {
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
    $('#section-title h2').text(currentTitle);
  });
})(jQuery, Reveal);

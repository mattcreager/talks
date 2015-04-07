import Reveal from 'reveal.js'

class RevealCustom {
  constructor(opts) {
    Reveal.initialize()

    Reveal.addEventListener( 'slidechanged', function( event ) {
      // event.previousSlide, event.currentSlide, event.indexh, event.indexv
      var currentSlide = event.indexh
      $state.go('angular-and-beyond', { slide: currentSlide })
      console.log(currentSlide)
    })
  }
}

export default RevealCustom
import Reveal from 'reveal.js'

class RevealCustom {
  constructor (opts) {
    Reveal.initialize()
  }

  addEventListener (event, cb) {
    Reveal.addEventListener(event, cb)
  }

  setCurrentSlide (slide) {
    if (Reveal.getIndices().h !== +slide) Reveal.slide(slide)
  }
}

export default RevealCustom

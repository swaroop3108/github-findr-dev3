import ICOAppend from './ico_minpulate.js'


const icoContainer = document.querySelectorAll("[data-svg-item]")
// cheap hack cuz i am lazy
const a = new ICOAppend(icoContainer[0], "data-svg-item", "tick")

icoContainer.forEach(el => {
  const ICOAPPEND = new ICOAppend(el, "data-svg-item")
  ICOAPPEND._go()
});

let observer = new MutationObserver(function (mutations) {
  mutations.forEach(function (mutation) {
    if (mutation.type == "attributes") {
      const ICOAPPEND = new ICOAppend(mutation.target, "data-svg-item")
      ICOAPPEND._go()

      console.log(mutation.target)
    }
  });
});

icoContainer.forEach(e => {
  observer.observe(e, {
    attributes: true
  });
})
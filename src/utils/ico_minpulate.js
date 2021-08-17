import data from "../svg.js";

export default class ICOAppend {
  constructor(el, attr, item) {
    this.el = el
    this.attr = attr
    this.item = item
  }

  _go () {
    const icoNamea = this.el.getAttribute(this.attr)
    const icos = { ...data }

    if (this.item) {
      this.el.innerHTML = icos[this.item.toLowerCase()]
    } else {
      this.el.innerHTML = icos[icoNamea.toLowerCase()]
    }
  }
}
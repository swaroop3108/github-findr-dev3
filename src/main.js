"use strict";
import "./utils/icons.js";
import "./utils/filter.js";
import ICOAppend from "./utils/ico_minpulate.js";
import data from "./svg.js"
import "./utils/load_check.js"

window.addEventListener("DOMContentLoaded", () => {
  document.querySelector("#search-ta_065ra").setAttribute("placeholder", "Search for users!")
  const icos = { ...data }
  document.querySelector(".search_filter_cate .dl_012x_item_c_i").innerHTML = icos["tick"]
  document.querySelector(".search_filter_cate").classList.add("dl_active")
  // window.history.pushState({}, "", `?users`)
  OverlayScrollbars(document.querySelectorAll("#cuntent"), {
    className: "os-theme-light",
    sizeAutoCapable: true,
    paddingAbsolute: true,
    scrollbars: {
      visibility: "auto",
      autoHide: "s",
      autoHideDelay: 1500,
      dragScrolling: true,
      clickScrolling: true,
      touchSupport: true,
      snapHandle: false
    },
  });

  setTimeout(() => {
    if (window.location.search !== "" && getParameterByName("users") !== "" && getParameterByName("organizations") !== "" && getParameterByName("user") !== "") {
      maximize()
    } else {
      const ser_area = document.querySelector(".search_arena");
      ser_area.classList.remove("minimized")
    }
  }, 350);
})

function getParameterByName (name, url = window.location.href) {
  name = name.replace(/[\[\]]/g, '\\$&');
  var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

document.querySelectorAll("*").forEach(e => {
  e.addEventListener("dragstart", el => el.preventDefault())
  e.addEventListener("contextmenu", el => el.preventDefault())
})
document.querySelector("form").addEventListener("submit", () => maximize())

const form = document.querySelector("#search")
form.addEventListener("submit", e => e.preventDefault())

const filter_cate = document.querySelectorAll(".search_filter_cate")
let arr = [...filter_cate]

filter_cate.forEach(el => {
  el.addEventListener("mousedown", (e) => {
    document.querySelector("#search-ta_065ra").setAttribute("placeholder", `Search for ${el.getAttribute("search-type").toLowerCase()}!`)
    const ICOAPPEND = new ICOAppend(el.childNodes[1], "data-svg-item", "tick")
    arr.splice(arr.indexOf(el), 1)
    ICOAPPEND._go()

    el.classList.add("dl_active")
    window.history.pushState({}, "", `?${el.getAttribute("search-type").toLowerCase()}`)

    arr.forEach(el => {
      const ICOAPPEND = new ICOAppend(el.childNodes[1], "data-svg-item")
      ICOAPPEND._go()
      el.classList.remove("dl_active")
    })
    arr = [...filter_cate]
  })
});

const win_drag_area = document.querySelector(".window_results");
const min_arr = document.querySelector(".min_arrow");
const ser_area = document.querySelector(".search_arena");
let isDragging = false,
  startPos = 0,
  curPos = 0

win_drag_area.addEventListener('mousedown', (e) => touchStart(e), false)
min_arr.addEventListener('mousedown', (e) => touchStart(e, "arr"), false)


function touchStart (e, c) {

  if (c == "arr") {
    maximize()
    return;
  }

  if (isDragging || !isDragging && win_drag_area.classList.contains("minimized")) {
    maximize()

    return false;
  } else if (!win_drag_area.classList.contains("minimized")) {
    win_drag_area.setAttribute("style", `transition: all 550ms cubic-bezier(0, 1, 0, 1); top: 40px`)
    startPos = e.offsetY;
    curPos = e.clientY
    isDragging = true;
    win_drag_area.addEventListener('mousemove', touchMove)
    win_drag_area.addEventListener('mouseleave', touchEnd)
    win_drag_area.addEventListener('mouseup', touchEnd)

    return false;
  }
}

function touchMove (e) {
  if (isDragging && win_drag_area.offsetTop <= window.innerHeight / 3 && !win_drag_area.classList.contains("minimized")) {
    const clY = e.clientY;
    win_drag_area.style.transition = "none"

    if (clY - curPos + 40 >= 40) {
      win_drag_area.setAttribute("style", `top: ${clY - curPos + 40}px`)
    } else {
      return
    }
    if (win_drag_area.offsetTop >= window.innerHeight / 3) {
      minimize()
    }
  }
}

function touchEnd () {
  isDragging = false
  win_drag_area.removeEventListener('mousemove', touchMove)
  win_drag_area.removeEventListener('mouseleave', touchEnd)
  win_drag_area.removeEventListener('mouseup', touchEnd)

  if (win_drag_area.classList.contains("minimized")) {
    minimize()
    return false;
  } else if (!win_drag_area.classList.contains("minimized")) {
    maximize()
  }
}

function maximize () {
  win_drag_area.classList.remove("minimized")
  win_drag_area.classList.remove("disabled")
  win_drag_area.setAttribute("style", `transition: all 550ms cubic-bezier(0, 1, 0, 1); top: 40px`)
  min_arr.classList.remove("minimized")
  ser_area.classList.add("minimized")
}

function minimize () {
  win_drag_area.removeAttribute("style")
  win_drag_area.classList.add("minimized")
  ser_area.classList.remove("minimized")

  //! detect device type: mobile/desktop
  const dvcConDestop = navigator.userAgent.toLowerCase().indexOf("windows") !== -1 || navigator.userAgent.toLowerCase().indexOf("macintosh") !== -1 || navigator.userAgent.toLowerCase().indexOf("linux") !== -1;

  if (dvcConDestop) {
    min_arr.classList.add("minimized")
  }
}
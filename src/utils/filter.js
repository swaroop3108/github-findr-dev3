const filter_dlTrigger = document.querySelector("#filter-trigger");
const triggered_dl = document.querySelectorAll("#filter-options");

filter_dlTrigger.addEventListener("focus", () => {
  triggered_dl.forEach(el => el.classList.add("dl_012x-triggered"))
  filter_dlTrigger.classList.add("flipped")
})
filter_dlTrigger.addEventListener("blur", () => {
  triggered_dl.forEach(el => el.classList.remove("dl_012x-triggered"))
  filter_dlTrigger.classList.remove("flipped")
})
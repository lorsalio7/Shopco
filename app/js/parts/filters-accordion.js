let filtersAccordion = document.querySelectorAll(".filters-accordion");

if(filtersAccordion) {
  let filtersAccordionButtons = document.querySelectorAll(".filters-accordion__button");
  let filterAccordionPannels = document.querySelectorAll(".filters-accordion__panel");

  filtersAccordionButtons.forEach((button, index) => {
    button.addEventListener("click", (e) => {
      let expandButton = e.target.getAttribute("aria-expanded");

      e.target.classList.toggle("filters-accordion__button--active");
      if(expandButton === "true") {
        e.target.setAttribute("aria-expanded", "false");
      } else {
        e.target.setAttribute("aria-expanded", "true");
      }


      if(!filterAccordionPannels[index].classList.contains("filters-accordion__panel--hidden")) {
        filterAccordionPannels[index].classList.add("filters-accordion__panel--hidden");
        filterAccordionPannels[index].setAttribute("aria-hidden", "true");
      } else {
        filterAccordionPannels[index].classList.remove("filters-accordion__panel--hidden");
        filterAccordionPannels[index].setAttribute("aria-hidden", "false");
      }

    })
  })
}

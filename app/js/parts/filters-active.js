let filtersActiveButton = document.querySelector(".catalog-cards__filters-button");

if(filtersActiveButton) {
  let bigWidthScreen = window.matchMedia("(min-width: 1025px)");
  let catalogFilters = document.querySelector(".catalog__filters");
  let filtersCloseButton = document.querySelector(".catalog-filters__close-button")
  filtersActiveButton.addEventListener("click", openCatalogFilters);

  function openCatalogFilters() {
    scrollController.disabledScroll(".fixed-element");
    document.querySelector(".overlay").classList.add("overlay--active");
    filtersCloseButton.focus();
    catalogFilters.classList.add("catalog__filters--active");

    document.addEventListener("click", closeCatalogFilters);
    window.addEventListener("keydown", closeCatalogFilters);
  }

  function closeCatalogFilters(e, width) {
    if(e && e.keyCode === 27 || e && e.target === filtersCloseButton || e && e.target.classList.contains("overlay") || width) {
      document.querySelector(".overlay").classList.remove("overlay--active");
      catalogFilters.classList.remove("catalog__filters--active");
      setTimeout(() => {
        scrollController.enabledScroll(".fixed-element");
      }, 300);

      document.removeEventListener("click", closeCatalogFilters);
      window.removeEventListener("click", closeCatalogFilters);
    }
  }


  function changeView(width) {
    if(width) {
      closeCatalogFilters(null, width);
    }
  }

  bigWidthScreen.onchange = (e) => {
    changeView(e.matches);
  }
}

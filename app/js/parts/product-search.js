let openProductSearchButton = document.querySelector(".user-navigation__open-search-button");

if(openProductSearchButton) {
  let bigWidthScreen = window.matchMedia("(min-width: 1025px)");
  let productSearchWindow = document.querySelector(".site-header__product-search");
  let closeProductSearchButton = productSearchWindow.querySelector(".product-search__close-button");
  openProductSearchButton.addEventListener("click", openProductSearch);

  closeProductSearchButton.addEventListener("click", closeProductSearch);

  function openProductSearch() {
    productSearchWindow.style.display = "block";
    setTimeout(() => {
      productSearchWindow.classList.add("site-header__product-search--active");
    }, 10);
    scrollController.disabledScroll(".fixed-element");

    window.addEventListener("keydown", (e) => {
      if(e.keyCode === 27 && productSearchWindow.classList.contains("site-header__product-search--active")) {
        closeProductSearch();
      };
    })
  }

  function closeProductSearch(event) {
    productSearchWindow.classList.remove("site-header__product-search--active");
    setTimeout(() => {
      productSearchWindow.removeAttribute("style");
      scrollController.enabledScroll(".fixed-element");
    }, 300);

    window.removeEventListener("keydown", closeProductSearch);
  }

  bigWidthScreen.onchange = (e) => {
    changeView(e.matches, closeProductSearch());
  }
}

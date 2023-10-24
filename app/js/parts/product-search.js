let openProductSearchButton = document.querySelector(".user-navigation__open-search-button");

if(openProductSearchButton) {
  let productSearchWindow = document.querySelector(".site-header__product-search");
  let productSearchInput = productSearchWindow.querySelector(".product-search__input");
  let closeProductSearchButton = productSearchWindow.querySelector(".product-search__close-button");
  openProductSearchButton.addEventListener("click", openProductSearch);

  closeProductSearchButton.addEventListener("click", closeProductSearch);

  function openProductSearch() {
    productSearchWindow.classList.add("site-header__product-search--active");
    productSearchInput.focus();
  }

  function closeProductSearch() {
    productSearchWindow.classList.remove("site-header__product-search--active");
    productSearchInput.blur();
  }
}

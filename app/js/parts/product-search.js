let openProductSearchButton = document.querySelector(".user-navigation__open-search-button");

if(openProductSearchButton) {
  let productSearchWindow = document.querySelector(".site-header__product-search");
  let closeProductSearchButton = productSearchWindow.querySelector(".product-search__close-button");
  openProductSearchButton.addEventListener("click", openProductSearch);

  closeProductSearchButton.addEventListener("click", closeProductSearch);

  function openProductSearch() {
    productSearchWindow.classList.add("site-header__product-search--active");
  }

  function closeProductSearch() {
    productSearchWindow.classList.remove("site-header__product-search--active");
  }
}

"use strict";

var burgerButton = document.querySelector(".burger-button");
if (burgerButton) {
  var openSiteMenu = function openSiteMenu() {
    document.querySelector(".overlay").classList.add("overlay--active");
    siteNavigation.classList.add("site-header__site-navigation--active");
  };
  var closeSiteMenu = function closeSiteMenu() {
    document.querySelector(".overlay").classList.remove("overlay--active");
    siteNavigation.classList.remove("site-header__site-navigation--active");
  };
  var siteNavigation = document.querySelector(".site-header__site-navigation");
  var closeSiteNavButton = siteNavigation.querySelector(".site-navigation__close-button");
  burgerButton.addEventListener("click", openSiteMenu);
  closeSiteNavButton.addEventListener("click", closeSiteMenu);
}
;
var openProductSearchButton = document.querySelector(".user-navigation__open-search-button");
if (openProductSearchButton) {
  var openProductSearch = function openProductSearch() {
    productSearchWindow.classList.add("site-header__product-search--active");
  };
  var closeProductSearch = function closeProductSearch() {
    productSearchWindow.classList.remove("site-header__product-search--active");
  };
  var productSearchWindow = document.querySelector(".site-header__product-search");
  var closeProductSearchButton = productSearchWindow.querySelector(".product-search__close-button");
  openProductSearchButton.addEventListener("click", openProductSearch);
  closeProductSearchButton.addEventListener("click", closeProductSearch);
}
;
var b = "var";
;
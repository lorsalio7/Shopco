let burgerButton = document.querySelector(".burger-button");

if(burgerButton) {
  let siteNavigation = document.querySelector(".site-header__site-navigation");
  let closeSiteNavButton = siteNavigation.querySelector(".site-navigation__close-button");
  burgerButton.addEventListener("click", openSiteMenu);
  closeSiteNavButton.addEventListener("click", closeSiteMenu);

  function openSiteMenu() {
    document.querySelector(".site-header__overlay").classList.add("site-header__overlay--active");
    siteNavigation.classList.add("site-header__site-navigation--active");
  }

  function closeSiteMenu() {
    document.querySelector(".site-header__overlay").classList.remove("site-header__overlay--active");
    siteNavigation.classList.remove("site-header__site-navigation--active");
  }
}

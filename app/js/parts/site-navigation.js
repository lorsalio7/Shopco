let burgerButton = document.querySelector(".burger-button");

if (burgerButton) {
  let siteNavigation = document.querySelector(".site-header__site-navigation");
  let changeViewWidth = window.matchMedia("(min-width: 769px)");
  let closeSiteNavButton = siteNavigation.querySelector(".site-navigation__close-button");
  burgerButton.addEventListener("click", openSiteMenu);
  closeSiteNavButton.addEventListener("click", closeSiteMenu);

  function openSiteMenu() {
    siteNavigation.style.display = "block";
    setTimeout(() => {
      siteNavigation.classList.add("site-header__site-navigation--active");
      document.querySelector(".site-header__overlay").classList.add("site-header__overlay--active");
    }, 10);
    scrollController.disabledScroll(".fixed-element");

    window.addEventListener("keydown", (e) => {
      if (e.keyCode === 27 && siteNavigation.classList.contains("site-header__site-navigation--active")) {
        closeSiteMenu();
      }
    });
    document.querySelector(".site-header__overlay").addEventListener("click", closeSiteMenu);
  }

  function closeSiteMenu(event) {
    siteNavigation.classList.remove("site-header__site-navigation--active");
    document.querySelector(".site-header__overlay").classList.remove("site-header__overlay--active");
    setTimeout(() => {
      siteNavigation.removeAttribute("style");
      scrollController.enabledScroll(".fixed-element");
    }, 300);

    window.removeEventListener("keydown", closeSiteMenu);
    document.querySelector(".site-header__overlay").removeEventListener("click", closeSiteMenu);
  }


  changeViewWidth.onchange = (e) => {
    changeView(e.matches, closeSiteMenu);
  }
}

let siteHeader = document.querySelector(".site-header");
let siteMain = document.querySelector(".main");
let quickRegistrationButton = siteHeader.querySelector(".quick-registration__close-button");


if (quickRegistrationButton) {
  let quickRegistration = document.querySelector(".quick-registration");
  quickRegistrationButton.addEventListener("click", () => {
    quickRegistration.style.display = "none";
  })
}


window.addEventListener("scroll", debounce(addShadow, 150));

function addShadow() {

  let offsetTop;
  if (document.documentElement.classList.contains("no-scroll")) {
    // Используем сохраненную позицию во время no-scroll, чтобы обойти обнуление
    offsetTop = scrollController.scrollPosition;
  } else {
    // Обычный режим: используем реальную прокрутку
    offsetTop = window.pageYOffset || window.scrollY;
  }

  if (offsetTop > 0) {
    siteHeader.classList.add("site-header--drop-shadow");
  } else {
    siteHeader.classList.remove("site-header--drop-shadow");
  }
}

addShadow();

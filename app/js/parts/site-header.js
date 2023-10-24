let siteHeader = document.querySelector(".site-header");
let siteMain = document.querySelector(".main");
let quickRegistrationButton = siteHeader.querySelector(".quick-registration__close-button");

function updateMarginTop() {
  siteMain.style.marginTop = siteHeader.offsetHeight + "px";
}

window.addEventListener("load", updateMarginTop);

window.addEventListener("resize", debounce(() => {
    updateMarginTop();
  }, 200)
);

window.addEventListener("scroll", debounce(addShadow, 150));

function addShadow() {
  let offsetTop = window.pageYOffset;

  if(offsetTop > 0) {
    siteHeader.style.boxShadow = "0 2px 6px rgba(0,0,0,0.2)";
  } else {
    siteHeader.style.boxShadow = "0 2px 6px rgba(0,0,0,0)";
  }
}

if(quickRegistrationButton) {
  let quickRegistration = document.querySelector(".quick-registration");
  quickRegistrationButton.addEventListener("click", () => {
    quickRegistration.style.display = "none";
    updateMarginTop();
  })
}

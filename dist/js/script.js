"use strict";

function throttle(func, delay) {
  var wait = false;
  return function () {
    if (wait) {
      return;
    }
    func.apply(void 0, arguments);
    wait = true;
    setTimeout(function () {
      wait = false;
    }, delay);
  };
}
function debounce(func, delay) {
  var timeout;
  return function () {
    var context = this;
    var args = arguments;
    clearTimeout(timeout);
    timeout = setTimeout(function () {
      return func.apply(context, args);
    }, delay);
  };
}
;
var siteHeader = document.querySelector(".site-header");
var siteMain = document.querySelector(".main");
var quickRegistrationButton = siteHeader.querySelector(".quick-registration__close-button");
function updateMarginTop() {
  siteMain.style.marginTop = siteHeader.offsetHeight + "px";
}
window.addEventListener("load", updateMarginTop);
window.addEventListener("resize", debounce(function () {
  updateMarginTop();
}, 200));
window.addEventListener("scroll", debounce(addShadow, 150));
function addShadow() {
  var offsetTop = window.pageYOffset;
  if (offsetTop > 0) {
    siteHeader.style.boxShadow = "0 2px 6px rgba(0,0,0,0.2)";
  } else {
    siteHeader.style.boxShadow = "0 2px 6px rgba(0,0,0,0)";
  }
}
if (quickRegistrationButton) {
  var quickRegistration = document.querySelector(".quick-registration");
  quickRegistrationButton.addEventListener("click", function () {
    quickRegistration.style.display = "none";
    updateMarginTop();
  });
}
;
var burgerButton = document.querySelector(".burger-button");
if (burgerButton) {
  var openSiteMenu = function openSiteMenu() {
    document.querySelector(".site-header__overlay").classList.add("site-header__overlay--active");
    siteNavigation.classList.add("site-header__site-navigation--active");
  };
  var closeSiteMenu = function closeSiteMenu() {
    document.querySelector(".site-header__overlay").classList.remove("site-header__overlay--active");
    siteNavigation.classList.remove("site-header__site-navigation--active");
  };
  var siteNavigation = document.querySelector(".site-header__site-navigation");
  var closeSiteNavButton = siteNavigation.querySelector(".site-navigation__close-button");
  burgerButton.addEventListener("click", openSiteMenu);
  closeSiteNavButton.addEventListener("click", closeSiteMenu);
}
;
var dropdown = document.querySelectorAll("dropdown");
if (dropdown) {
  var dropdownButtons = document.querySelectorAll(".dropdown__toggle");
  dropdownButtons.forEach(function (button) {
    button.addEventListener("click", function (e) {
      if (e.target.classList.contains("dropdown__toggle")) {
        e.target.classList.toggle("dropdown__toggle--active");
        e.target.nextElementSibling.classList.toggle("dropdown__list--active");
      }
    });
  });
}
;
var openProductSearchButton = document.querySelector(".user-navigation__open-search-button");
if (openProductSearchButton) {
  var openProductSearch = function openProductSearch() {
    productSearchWindow.classList.add("site-header__product-search--active");
    productSearchInput.focus();
  };
  var closeProductSearch = function closeProductSearch() {
    productSearchWindow.classList.remove("site-header__product-search--active");
    productSearchInput.blur();
  };
  var productSearchWindow = document.querySelector(".site-header__product-search");
  var productSearchInput = productSearchWindow.querySelector(".product-search__input");
  var closeProductSearchButton = productSearchWindow.querySelector(".product-search__close-button");
  openProductSearchButton.addEventListener("click", openProductSearch);
  closeProductSearchButton.addEventListener("click", closeProductSearch);
}
;
var advantagesList = document.querySelector(".advantages-list");
if (advantagesList) {
  var removeBorderRight = function removeBorderRight() {
    var advantagesItems = Array.from(advantagesList.querySelectorAll(".advantages-list__item"));
    advantagesItems.reduce(function (prev, curr) {
      if (prev && prev.offsetLeft > curr.offsetLeft) {
        curr.classList.add("advantages-list__item--without-border");
      } else if (prev) {
        prev.classList.remove("advantages-list__item--without-border");
        curr.classList.add("advantages-list__item--without-border");
      }
      return curr;
    }, null);
  };
  var advantagesListCheckWidth = function advantagesListCheckWidth(width) {
    window.removeEventListener("resize", putin);
    if (!width) {
      return;
    } else if (width) {
      window.addEventListener("resize", putin);
      removeBorderRight();
    }
  };
  var advantagesWidth = window.matchMedia("(min-width: 390px)");
  var putin = debounce(function () {
    removeBorderRight();
  }, 200);
  advantagesListCheckWidth(advantagesWidth.matches);
  advantagesWidth.onchange = function (e) {
    advantagesListCheckWidth(e.matches);
  };
}
;
var brands = document.querySelector(".brands");
if (brands) {
  var copyBrandsLine = brands.querySelector(".brands__line").cloneNode(true);
  brands.querySelector(".brands__ticker").appendChild(copyBrandsLine);
}
;
document.addEventListener('DOMContentLoaded', function () {
  var newArrivalsSlider = document.querySelector(".new-arrivals-slider");
  var topSellingSlider = document.querySelector(".top-selling-slider");
  var storeReviewsSlider = document.querySelector(".store-reviews-slider");
  var productCardSlider = document.querySelector(".card-big-slider");
  var productCardSliderThumbs = document.querySelector(".card-thumbs-slider");
  var seeAlsoSlider = document.querySelector(".see-also-slider");
  if (newArrivalsSlider) {
    new Splide(newArrivalsSlider, {
      perMove: 1,
      padding: {
        right: 120
      },
      gap: 16,
      mediaQuery: 'min',
      arrows: false,
      pagination: false,
      breakpoints: {
        390: {
          padding: {
            right: 158
          }
        },
        550: {
          perPage: 2,
          padding: {
            right: 70
          }
        },
        769: {
          perPage: 2,
          padding: {
            right: 350
          }
        },
        1025: {
          destroy: true
        }
      }
    }).mount();
  }
  if (topSellingSlider) {
    new Splide(topSellingSlider, {
      perMove: 1,
      padding: {
        right: 120
      },
      gap: 16,
      mediaQuery: 'min',
      arrows: false,
      pagination: false,
      breakpoints: {
        390: {
          padding: {
            right: 158
          }
        },
        550: {
          perPage: 2,
          padding: {
            right: 70
          }
        },
        769: {
          perPage: 2,
          padding: {
            right: 350
          }
        },
        1025: {
          destroy: true
        }
      }
    }).mount();
  }
  if (storeReviewsSlider) {
    var storeReviewsSliderPrevButton = document.querySelector(".store-reviews__left-button");
    var storeReviewsSliderNextButton = document.querySelector(".store-reviews__right-button");
    storeReviewsSlider = new Splide(storeReviewsSlider, {
      arrows: false,
      pagination: false,
      gap: 15,
      type: "loop"
    }).mount();
    storeReviewsSliderPrevButton.addEventListener("click", function (e) {
      storeReviewsSlider.go("-1");
    });
    storeReviewsSliderNextButton.addEventListener("click", function (e) {
      storeReviewsSlider.go("+1");
    });
  }
  if (productCardSlider) {
    productCardSlider = new Splide(productCardSlider, {
      gap: 30,
      arrows: false,
      pagination: false
    }).mount();
    productCardSliderThumbs = new Splide(productCardSliderThumbs, {
      mediaQuery: 'min',
      gap: 12,
      perPage: 3,
      arrows: false,
      pagination: false,
      isNavigation: true
    }).mount();
    productCardSlider.sync(productCardSliderThumbs);
  }
  if (seeAlsoSlider) {
    new Splide(seeAlsoSlider, {
      perMove: 1,
      padding: {
        right: 120
      },
      gap: 16,
      mediaQuery: 'min',
      arrows: false,
      pagination: false,
      breakpoints: {
        390: {
          padding: {
            right: 158
          }
        }
      }
    }).mount();
  }
});
;
var rangeSlider = document.querySelector(".price-range");
if (rangeSlider) {
  var minPriceInput = document.querySelector("#minimal-price");
  var maxPriceInput = document.querySelector("#maximum-price");
  var formatForSliders = {
    from: function from(formattedValue) {
      return Number(formattedValue);
    },
    to: function to(numericValue) {
      return Math.round(numericValue);
    }
  };
  noUiSlider.create(rangeSlider, {
    start: [50, 200],
    format: formatForSliders,
    connect: true,
    tooltips: {
      to: function to(numericValue) {
        return numericValue.toFixed(0);
      }
    },
    range: {
      'min': [0],
      'max': [250]
    }
  });
  var formatValues = [minPriceInput, maxPriceInput];
  rangeSlider.noUiSlider.on('update', function (values, handle) {
    formatValues[handle].value = values[handle];
  });
}
;
var filtersAccordion = document.querySelectorAll(".filters-accordion");
if (filtersAccordion) {
  var filtersAccordionButtons = document.querySelectorAll(".filters-accordion__button");
  var filterAccordionPannels = document.querySelectorAll(".filters-accordion__panel");
  filtersAccordionButtons.forEach(function (button, index) {
    button.addEventListener("click", function (e) {
      var expandButton = e.target.getAttribute("aria-expanded");
      e.target.classList.toggle("filters-accordion__button--active");
      if (expandButton === "true") {
        e.target.setAttribute("aria-expanded", "false");
      } else {
        e.target.setAttribute("aria-expanded", "true");
      }
      if (!filterAccordionPannels[index].classList.contains("filters-accordion__panel--hidden")) {
        filterAccordionPannels[index].classList.add("filters-accordion__panel--hidden");
      } else {
        filterAccordionPannels[index].classList.remove("filters-accordion__panel--hidden");
      }
    });
  });
}
;
var filtersActiveButton = document.querySelector(".catalog-cards__filters-button");
if (filtersActiveButton) {
  var openCatalogFilters = function openCatalogFilters() {
    document.querySelector(".overlay").classList.add("overlay--active");
    catalogFilters.classList.add("catalog__filters--active");
  };
  var closeCatalogFilters = function closeCatalogFilters() {
    document.querySelector(".overlay").classList.remove("overlay--active");
    catalogFilters.classList.remove("catalog__filters--active");
  };
  var catalogFilters = document.querySelector(".catalog__filters");
  var filtersCloseButton = document.querySelector(".catalog-filters__close-button");
  filtersActiveButton.addEventListener("click", openCatalogFilters);
  filtersCloseButton.addEventListener("click", closeCatalogFilters);
}
;
var quantities = document.querySelectorAll(".quantity");
if (quantities) {
  quantities.forEach(function (el) {
    var quantityInput = el.querySelector(".quantity__input");
    var quantityPlusButton = el.querySelector(".quantity__button--plus");
    var quantityMinusButton = el.querySelector(".quantity__button--minus");
    var productCount = 1;
    quantityPlusButton.addEventListener("click", plusProduct);
    quantityMinusButton.addEventListener("click", minusProduct);
    function plusProduct() {
      productCount++;
      quantityInput.value = productCount;
    }
    function minusProduct() {
      if (productCount < 2) {
        return;
      } else {
        productCount--;
        quantityInput.value = productCount;
      }
    }
  });
}
;
var cardTabs = document.querySelector(".card-tabs");
if (cardTabs) {
  var highlightTab = function highlightTab() {
    for (var j = 0; j < tabButtons.length; j++) {
      if (tabButtons[j].classList.contains("card-tabs__button--active")) {
        var buttonWidth = tabButtons[j].offsetWidth;
        var buttonOffsetLeft = tabButtons[j].offsetLeft;
        line.style.width = "".concat(buttonWidth, "px");
        line.style.left = "".concat(buttonOffsetLeft, "px");
      }
    }
  };
  var removeActiveClass = function removeActiveClass(elements, class_name) {
    for (var i = 0; i < elements.length; i++) {
      elements[i].classList.remove(class_name);
    }
  };
  var tabButtons = cardTabs.querySelectorAll(".card-tabs__button");
  var tabPanels = cardTabs.querySelectorAll(".card-tabs__panel");
  var line = cardTabs.querySelector(".card-tabs__line");
  tabButtons.forEach(function (button, index) {
    button.addEventListener("click", function (e) {
      removeActiveClass(tabButtons, "card-tabs__button--active");
      e.preventDefault();
      button.classList.add("card-tabs__button--active");
      highlightTab();
      removeActiveClass(tabPanels, "card-tabs__panel--active");
      tabPanels[index].classList.add("card-tabs__panel--active");
    });
  });
  highlightTab();
  window.addEventListener("resize", debounce(function () {
    highlightTab();
  }, 200));
}
;
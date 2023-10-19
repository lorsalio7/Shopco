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
var quantity = document.querySelector(".quantity");
if (quantity) {
  var plusProduct = function plusProduct() {
    productCount++;
    quantityInput.value = productCount;
  };
  var minusProduct = function minusProduct() {
    if (productCount < 2) {
      return;
    } else {
      productCount--;
      quantityInput.value = productCount;
    }
  };
  var quantityInput = quantity.querySelector(".quantity__input");
  var quantityPlusButton = quantity.querySelector(".quantity__button--plus");
  var quantityMinusButton = quantity.querySelector(".quantity__button--minus");
  var productCount = 1;
  quantityPlusButton.addEventListener("click", plusProduct);
  quantityMinusButton.addEventListener("click", minusProduct);
}
;
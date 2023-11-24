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

// Проверка на десктоп сафари

var isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
var isDesktopSafari = isSafari && !navigator.userAgent.match(/Mobile/);

// =========================== Фикс скачка браузерного скролла и плавной прокрутки ==========================================

var scrollController = {
  scrollPosition: 0,
  disabledScroll: function disabledScroll(fixedElement) {
    if (isDesktopSafari) {
      scrollController.scrollPosition = window.scrollY;
      document.body.style.cssText = "\n        overflow-y: scroll;\n        position: fixed;\n        top: -".concat(scrollController.scrollPosition, "px;\n        left: 0;\n        height: 100vh;\n        width: 100vw;\n        padding-right: ").concat(parseInt(window.innerWidth - document.body.offsetWidth), "px;\n      ");
      document.documentElement.style.scrollBehavior = "unset";
    } else {
      if (fixedElement) {
        var fixedElements = document.querySelectorAll(fixedElement);
        fixedElements.forEach(function (element) {
          element.style.paddingRight = "".concat(parseInt(window.innerWidth - document.body.offsetWidth), "px");
        });
      }
      scrollController.scrollPosition = window.scrollY;
      document.body.style.cssText = "\n        overflow: hidden;\n        position: fixed;\n        top: -".concat(scrollController.scrollPosition, "px;\n        left: 0;\n        height: 100vh;\n        width: 100vw;\n        padding-right: ").concat(parseInt(window.innerWidth - document.body.offsetWidth), "px;\n      ");
      document.documentElement.style.scrollBehavior = "unset";
    }
  },
  enabledScroll: function enabledScroll(fixedElement) {
    if (isDesktopSafari) {
      document.body.style.cssText = "";
      window.scroll({
        top: scrollController.scrollPosition
      });
      document.documentElement.style.scrollBehavior = "";
    } else {
      if (fixedElement) {
        var fixedElements = document.querySelectorAll(fixedElement);
        fixedElements.forEach(function (element) {
          element.style.paddingRight = "0";
        });
      }
      document.body.style.cssText = "";
      window.scroll({
        top: scrollController.scrollPosition
      });
      document.documentElement.style.scrollBehavior = "";
    }
  }
};

//=========================== Функции fadeIn fadeOut ======================

function fadeIn(element, display) {
  var duration = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1000;
  var el = element;
  var elStyles = window.getComputedStyle(el);
  if (elStyles.display === "none") {
    var animate = function animate(currentTime) {
      var elapsedTime = currentTime - startTime;
      var progress = elapsedTime / duration;
      element.style.opacity = progress;
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        element.style.cssText = "display: ".concat(display, ";");
      }
    };
    element.style.display = display;
    element.style.opacity = 0;
    var startTime = performance.now();
    requestAnimationFrame(animate);
  } else {
    return;
  }
}
function fadeOut(element) {
  var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1000;
  var el = element;
  var elStyles = window.getComputedStyle(el);
  if (elStyles.display !== "none") {
    var animate = function animate(currentTime) {
      var elapsedTime = currentTime - startTime;
      var progress = 1 - elapsedTime / duration;
      element.style.opacity = progress;
      if (progress > 0) {
        requestAnimationFrame(animate);
      } else {
        element.style.cssText = "display: none;";
      }
    };
    element.style.opacity = 1;
    var startTime = performance.now();
    requestAnimationFrame(animate);
  } else {
    return;
  }
}

// =========== Запуск функции на определенной ширине =====================

function changeView(width, function_name) {
  if (!width) {
    function_name;
  }
}
;
var addMaximumScaleToMetaViewport = function addMaximumScaleToMetaViewport() {
  var el = document.querySelector('meta[name=viewport]');
  if (el !== null) {
    var content = el.getAttribute('content');
    var re = /maximum\-scale=[0-9\.]+/g;
    if (re.test(content)) {
      content = content.replace(re, 'maximum-scale=1.0');
    } else {
      content = [content, 'maximum-scale=1.0'].join(', ');
    }
    el.setAttribute('content', content);
  }
};
var disableIosTextFieldZoom = addMaximumScaleToMetaViewport;

// https://stackoverflow.com/questions/9038625/detect-if-device-is-ios/9039885#9039885
var checkIsIOS = function checkIsIOS() {
  return /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
};
if (checkIsIOS()) {
  disableIosTextFieldZoom();
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
    siteNavigation.style.display = "block";
    setTimeout(function () {
      siteNavigation.classList.add("site-header__site-navigation--active");
      document.querySelector(".site-header__overlay").classList.add("site-header__overlay--active");
    }, 10);
    scrollController.disabledScroll(".fixed-element");
    window.addEventListener("keydown", function (e) {
      if (e.keyCode === 27 && siteNavigation.classList.contains("site-header__site-navigation--active")) {
        closeSiteMenu();
      }
    });
    document.querySelector(".site-header__overlay").addEventListener("click", closeSiteMenu);
  };
  var closeSiteMenu = function closeSiteMenu(event) {
    siteNavigation.classList.remove("site-header__site-navigation--active");
    document.querySelector(".site-header__overlay").classList.remove("site-header__overlay--active");
    setTimeout(function () {
      siteNavigation.removeAttribute("style");
      scrollController.enabledScroll(".fixed-element");
    }, 300);
    window.removeEventListener("keydown", closeSiteMenu);
    document.querySelector(".site-header__overlay").removeEventListener("click", closeSiteMenu);
  };
  var siteNavigation = document.querySelector(".site-header__site-navigation");
  var changeViewWidth = window.matchMedia("(min-width: 769px)");
  var closeSiteNavButton = siteNavigation.querySelector(".site-navigation__close-button");
  burgerButton.addEventListener("click", openSiteMenu);
  closeSiteNavButton.addEventListener("click", closeSiteMenu);
  changeViewWidth.onchange = function (e) {
    changeView(e.matches, closeSiteMenu());
  };
}
;
var dropdowns = document.querySelectorAll(".dropdown__toggle");
if (dropdowns) {
  var closeAllDropdowns = function closeAllDropdowns(e) {
    if (!e.target.closest(".site-navigation__list") || e.keyCode === 27) {
      for (var i = 0; i < dropdowns.length; i++) {
        dropdowns[i].classList.remove("dropdown__toggle--active");
        dropdownContents[i].classList.remove("dropdown__list--active");
      }
      document.removeEventListener("click", closeAllDropdowns);
      window.removeEventListener("keydown", closeAllDropdowns);
    }
  };
  var dropdownContents = document.querySelectorAll(".dropdown__list");
  dropdowns.forEach(function (dropdownButton) {
    dropdownButton.addEventListener("click", function (e) {
      var currentButton = e.target;
      var currentDropdownContent = currentButton.nextElementSibling;
      dropdowns.forEach(function (el) {
        if (el !== currentButton) {
          el.classList.remove("dropdown__toggle--active");
        }
      });
      dropdownContents.forEach(function (el) {
        if (el !== currentDropdownContent) {
          el.classList.remove("dropdown__list--active");
        }
      });
      currentButton.classList.toggle("dropdown__toggle--active");
      currentDropdownContent.classList.toggle("dropdown__list--active");
      document.addEventListener("click", closeAllDropdowns);
      window.addEventListener("keydown", closeAllDropdowns);
    });
  });
}
;
var openProductSearchButton = document.querySelector(".user-navigation__open-search-button");
if (openProductSearchButton) {
  var openProductSearch = function openProductSearch() {
    productSearchWindow.style.display = "block";
    setTimeout(function () {
      productSearchWindow.classList.add("site-header__product-search--active");
    }, 10);
    scrollController.disabledScroll(".fixed-element");
    window.addEventListener("keydown", function (e) {
      if (e.keyCode === 27 && productSearchWindow.classList.contains("site-header__product-search--active")) {
        closeProductSearch();
      }
      ;
    });
  };
  var closeProductSearch = function closeProductSearch(event) {
    productSearchWindow.classList.remove("site-header__product-search--active");
    setTimeout(function () {
      productSearchWindow.removeAttribute("style");
      scrollController.enabledScroll(".fixed-element");
    }, 300);
    window.removeEventListener("keydown", closeProductSearch);
  };
  var bigWidthScreen = window.matchMedia("(min-width: 1025px)");
  var productSearchWindow = document.querySelector(".site-header__product-search");
  var closeProductSearchButton = productSearchWindow.querySelector(".product-search__close-button");
  openProductSearchButton.addEventListener("click", openProductSearch);
  closeProductSearchButton.addEventListener("click", closeProductSearch);
  bigWidthScreen.onchange = function (e) {
    changeView(e.matches, closeProductSearch());
  };
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
var brands = document.querySelector(".brands-slider");
if (brands) {
  new Splide(brands, {
    type: "loop",
    arrows: false,
    pagination: false,
    mediaQuery: 'min',
    perPage: 3,
    gap: 34,
    autoWidth: true,
    breakpoints: {
      550: {
        perPage: 4,
        gap: 50
      },
      769: {
        gap: 70
      },
      1025: {
        perPage: 5,
        gap: 106
      }
    },
    autoScroll: {
      speed: 2
    }
  }).mount(window.splide.Extensions);
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
      mediaQuery: 'min',
      type: "loop",
      breakpoints: {
        769: {
          gap: 20,
          perPage: 2,
          padding: {
            right: 0
          }
        },
        1025: {
          perPage: 3
        }
      }
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
      mediaQuery: 'min',
      gap: 30,
      arrows: false,
      pagination: false,
      breakpoints: {
        1025: {
          gap: 40
        }
      }
    }).mount();
    productCardSliderThumbs = new Splide(productCardSliderThumbs, {
      mediaQuery: 'min',
      gap: 12,
      perPage: 3,
      arrows: false,
      pagination: false,
      isNavigation: true,
      breakpoints: {
        550: {
          gap: 14,
          height: 400,
          direction: 'ttb'
        },
        769: {
          height: 150,
          direction: 'ttr'
        },
        1025: {
          height: 490,
          direction: 'ttb'
        },
        1200: {
          height: 530
        }
      }
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
});
;
var rangeSlider = document.querySelector(".price-range");
if (rangeSlider) {
  var minPriceInput = document.querySelector("#minimal-price");
  var maxPriceInput = document.querySelector("#maximum-price");
  var minPrice = parseInt(rangeSlider.dataset.minPrice);
  var maxPrice = parseInt(rangeSlider.dataset.maxPrice);
  var formatForSliders = {
    from: function from(formattedValue) {
      return Number(formattedValue.replace(',-', ''));
    },
    to: function to(numericValue) {
      return Math.abs(Math.round(numericValue));
    }
  };
  noUiSlider.create(rangeSlider, {
    start: [50, 200],
    padding: [20, 20],
    format: formatForSliders,
    connect: true,
    tooltips: {
      to: function to(numericValue) {
        return Math.abs(numericValue.toFixed(0));
      }
    },
    range: {
      'min': [minPrice - 20],
      'max': [maxPrice + 20]
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
        filterAccordionPannels[index].setAttribute("aria-hidden", "true");
      } else {
        filterAccordionPannels[index].classList.remove("filters-accordion__panel--hidden");
        filterAccordionPannels[index].setAttribute("aria-hidden", "false");
      }
    });
  });
}
;
var filtersActiveButton = document.querySelector(".catalog-cards__filters-button");
if (filtersActiveButton) {
  var openCatalogFilters = function openCatalogFilters() {
    scrollController.disabledScroll(".fixed-element");
    document.querySelector(".overlay").classList.add("overlay--active");
    filtersCloseButton.focus();
    catalogFilters.classList.add("catalog__filters--active");
    document.addEventListener("click", closeCatalogFilters);
    window.addEventListener("keydown", closeCatalogFilters);
  };
  var closeCatalogFilters = function closeCatalogFilters(e, width) {
    if (e && e.keyCode === 27 || e && e.target === document.querySelector(".overlay") || e && e.target === filtersCloseButton || width) {
      document.querySelector(".overlay").classList.remove("overlay--active");
      catalogFilters.classList.remove("catalog__filters--active");
      setTimeout(function () {
        scrollController.enabledScroll(".fixed-element");
      }, 300);
      document.removeEventListener("click", closeCatalogFilters);
      window.removeEventListener("click", closeCatalogFilters);
    }
  };
  var _changeView = function _changeView(width) {
    if (width) {
      closeCatalogFilters(null, width);
    }
  };
  var _bigWidthScreen = window.matchMedia("(min-width: 1025px)");
  var catalogFilters = document.querySelector(".catalog__filters");
  var filtersCloseButton = document.querySelector(".catalog-filters__close-button");
  filtersActiveButton.addEventListener("click", openCatalogFilters);
  _bigWidthScreen.onchange = function (e) {
    _changeView(e.matches);
  };
}
;
var quantities = document.querySelectorAll(".quantity");
if (quantities) {
  quantities.forEach(function (el) {
    var quantityInput = el.querySelector(".quantity__input");
    var quantityPlusButton = el.querySelector(".quantity__button--plus");
    var quantityMinusButton = el.querySelector(".quantity__button--minus");
    var productCount = +quantityInput.value;
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
      elements[i].removeAttribute("style");
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
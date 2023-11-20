document.addEventListener( 'DOMContentLoaded', function() {
  let newArrivalsSlider = document.querySelector(".new-arrivals-slider");
  let topSellingSlider = document.querySelector(".top-selling-slider");
  let storeReviewsSlider = document.querySelector(".store-reviews-slider");
  let productCardSlider = document.querySelector(".card-big-slider");
  let productCardSliderThumbs = document.querySelector(".card-thumbs-slider");
  let seeAlsoSlider = document.querySelector(".see-also-slider");

  if(newArrivalsSlider) {
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

  if(topSellingSlider) {
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

  if(storeReviewsSlider) {
    let storeReviewsSliderPrevButton = document.querySelector(".store-reviews__left-button");
    let storeReviewsSliderNextButton = document.querySelector(".store-reviews__right-button");
    storeReviewsSlider = new Splide(storeReviewsSlider, {
      arrows: false,
      pagination: false,
      gap: 15,
      mediaQuery: 'min',
      type: "loop",
      breakpoints: {
        550: {
          padding: {
            right: 100
          }
        },
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

    storeReviewsSliderPrevButton.addEventListener("click", (e) => {
      storeReviewsSlider.go("-1");
    });

    storeReviewsSliderNextButton.addEventListener("click", (e) => {
      storeReviewsSlider.go("+1");
    });
  }

  if(productCardSlider) {
    productCardSlider = new Splide(productCardSlider, {
      mediaQuery: 'min',
      gap: 30,
      arrows: false,
      pagination: false,
      breakpoints: {
        1025: {
          gap: 40,
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

  if(seeAlsoSlider) {
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

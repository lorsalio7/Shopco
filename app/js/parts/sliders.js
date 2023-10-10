document.addEventListener( 'DOMContentLoaded', function() {
  let newArrivalsSlider = document.querySelector(".new-arrivals-slider");
  let topSellingSlider = document.querySelector(".top-selling-slider");
  let storeReviewsSlider = document.querySelector(".store-reviews-slider");

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
      type: "loop"
    }).mount();

    storeReviewsSliderPrevButton.addEventListener("click", (e) => {
      storeReviewsSlider.go("-1");
    });

    storeReviewsSliderNextButton.addEventListener("click", (e) => {
      storeReviewsSlider.go("+1");
    });
  }
});

let rangeSlider = document.querySelector(".price-range");

if(rangeSlider) {

  let minPriceInput = document.querySelector("#minimal-price");
  let maxPriceInput = document.querySelector("#maximum-price");
  let minPrice = parseInt(rangeSlider.dataset.minPrice);
  let maxPrice = parseInt(rangeSlider.dataset.maxPrice);

  let formatForSliders = {
    from: function(formattedValue) {
      return Number(formattedValue.replace(',-', ''));
    },
    to: function(numericValue) {
      return Math.abs(Math.round(numericValue));
    }
  }

  noUiSlider.create(rangeSlider, {
    start: [50, 200],
    padding: [20, 20],
    format: formatForSliders,
    connect: true,
    tooltips: {
      to: function(numericValue) {
        return Math.abs(numericValue.toFixed(0));
      }
    },
    range: {
      'min': [minPrice - 20],
      'max': [maxPrice + 20]
    }
  });

  let formatValues = [minPriceInput, maxPriceInput];

  rangeSlider.noUiSlider.on('update', function (values, handle) {
    formatValues[handle].value = values[handle];
  });
}

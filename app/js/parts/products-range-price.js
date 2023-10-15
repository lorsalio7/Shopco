let rangeSlider = document.querySelector(".price-range");

if(rangeSlider) {
  let minPriceInput = document.querySelector("#minimal-price");
  let maxPriceInput = document.querySelector("#maximum-price");

  let formatForSliders = {
    from: function(formattedValue) {
      return Number(formattedValue);
    },
    to: function(numericValue) {
      return Math.round(numericValue);
    }
  }

  noUiSlider.create(rangeSlider, {
    start: [50, 200],
    format: formatForSliders,
    connect: true,
    tooltips: {
      to: function(numericValue) {
        return numericValue.toFixed(0);
      }
    },
    range: {
        'min': [0],
        'max': [250]
    }
  });

  let formatValues = [minPriceInput, maxPriceInput]

  rangeSlider.noUiSlider.on('update', function (values, handle) {
    formatValues[handle].value = values[handle];
  });
}

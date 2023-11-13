let quantities = document.querySelectorAll(".quantity");

if(quantities) {
  quantities.forEach(el => {
    let quantityInput = el.querySelector(".quantity__input");
    let quantityPlusButton = el.querySelector(".quantity__button--plus");
    let quantityMinusButton = el.querySelector(".quantity__button--minus");

    let productCount = +quantityInput.value;

    quantityPlusButton.addEventListener("click", plusProduct);

    quantityMinusButton.addEventListener("click", minusProduct);

    function plusProduct() {
      productCount++;
      quantityInput.value = productCount;
    }

    function minusProduct() {
      if(productCount < 2) {
        return
      } else {
        productCount--;
        quantityInput.value = productCount;
      }
    }
  });
}

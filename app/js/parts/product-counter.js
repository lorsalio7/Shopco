let quantity = document.querySelector(".quantity");

if(quantity) {
  let quantityInput = quantity.querySelector(".quantity__input");
  let quantityPlusButton = quantity.querySelector(".quantity__button--plus");
  let quantityMinusButton = quantity.querySelector(".quantity__button--minus");

  let productCount = 1;

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
}

let dropdowns = document.querySelectorAll(".dropdown__toggle");

if(dropdowns) {
  let dropdownContents = document.querySelectorAll(".dropdown__list");
  dropdowns.forEach(dropdownButton => {
    dropdownButton.addEventListener("click", (e) => {
      const currentButton = e.target;
      const currentDropdownContent = currentButton.nextElementSibling;

      dropdowns.forEach(el => {
        if(el !== currentButton) {
          el.classList.remove("dropdown__toggle--active");
        }
      });

      dropdownContents.forEach(el => {
        if(el !== currentDropdownContent) {
          el.classList.remove("dropdown__list--active");
        }
      });


      currentButton.classList.toggle("dropdown__toggle--active");
      currentDropdownContent.classList.toggle("dropdown__list--active");


      document.addEventListener("click", closeAllDropdowns);
      window.addEventListener("keydown", closeAllDropdowns);
    });
  });

  function closeAllDropdowns(e) {
    if(!e.target.closest(".site-navigation__list") || e.keyCode === 27) {
      for(let i = 0; i < dropdowns.length; i++) {
        dropdowns[i].classList.remove("dropdown__toggle--active");
        dropdownContents[i].classList.remove("dropdown__list--active");
      }

      document.removeEventListener("click", closeAllDropdowns);
      window.removeEventListener("keydown", closeAllDropdowns);
    }
  }
}

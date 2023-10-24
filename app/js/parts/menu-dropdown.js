let dropdown = document.querySelectorAll("dropdown");

if(dropdown) {
  let dropdownButtons = document.querySelectorAll(".dropdown__toggle");

  dropdownButtons.forEach(button => {
    button.addEventListener("click", (e) => {
      if(e.target.classList.contains("dropdown__toggle")) {
        e.target.classList.toggle("dropdown__toggle--active");
        e.target.nextElementSibling.classList.toggle("dropdown__list--active");
      }
    })
  })
}

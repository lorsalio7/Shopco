let dropdowns = document.querySelectorAll(".dropdown");

if(dropdowns) {
  dropdowns.forEach((dropdown) => {
    dropdown.addEventListener("click", (e) => {
      const currentButton = e.target.closest(".dropdown__toggle");
      if (!currentButton) return;

      const dropdownContent = currentButton.nextElementSibling;

      closeAllDropdowns();

      currentButton.classList.toggle("dropdown__toggle--active");
      dropdownContent.classList.toggle("dropdown__list--active");

      document.addEventListener("click", closeAllDropdowns);
      window.addEventListener("keydown", closeAllDropdowns);
    });
  });

  function closeAllDropdowns(e) {
    if (e && e.type === "click" && e.target.closest(".site-navigation__list")) return;

    const activeButtons = document.querySelectorAll(".dropdown__toggle--active");
    const activeContents = document.querySelectorAll(".dropdown__list--active");

    activeButtons.forEach((button) => button.classList.remove("dropdown__toggle--active"));
    activeContents.forEach((content) => content.classList.remove("dropdown__list--active"));

    document.removeEventListener("click", closeAllDropdowns);
    window.removeEventListener("keydown", closeAllDropdowns);
  }
}

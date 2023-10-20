let cardTabs = document.querySelector(".card-tabs");

if(cardTabs) {
  let tabButtons = cardTabs.querySelectorAll(".card-tabs__button");
  let tabPanels = cardTabs.querySelectorAll(".card-tabs__panel");
  let line = cardTabs.querySelector(".card-tabs__line");

  tabButtons.forEach((button, index) => {
    button.addEventListener("click", (e) => {
      removeActiveClass(tabButtons, "card-tabs__button--active");
      e.preventDefault();
      button.classList.add("card-tabs__button--active");
      highlightTab();
      removeActiveClass(tabPanels, "card-tabs__panel--active")
      tabPanels[index].classList.add("card-tabs__panel--active");
    });
  });

  function highlightTab() {
    for(let j = 0; j < tabButtons.length; j++) {
      if(tabButtons[j].classList.contains("card-tabs__button--active")) {
        let buttonWidth = tabButtons[j].offsetWidth;
        let buttonOffsetLeft = tabButtons[j].offsetLeft;
        line.style.width = `${buttonWidth}px`;
        line.style.left = `${buttonOffsetLeft}px`;
      }
    }
  }

  function removeActiveClass(elements, class_name) {
    for(let i = 0; i < elements.length; i++) {
      elements[i].classList.remove(class_name);
    }
  }

  highlightTab();

  window.addEventListener("resize", debounce(() => {
    highlightTab();
  }, 200));
}

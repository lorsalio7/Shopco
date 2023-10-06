let advantagesList = document.querySelector(".advantages-list");

if(advantagesList) {
  let advantagesWidth = window.matchMedia("(min-width: 390px)");

  function removeBorderRight() {

    let advantagesItems = Array.from(advantagesList.querySelectorAll(".advantages-list__item"));

    advantagesItems.reduce((prev, curr) => {
      if(prev && prev.offsetLeft > curr.offsetLeft) {
        curr.classList.add("advantages-list__item--without-border");
      } else if(prev) {
        prev.classList.remove("advantages-list__item--without-border");
        curr.classList.add("advantages-list__item--without-border");
      }
      return curr;
    }, null);
  }

  const putin = debounce(() => {
    removeBorderRight();
  }, 200);

  function advantagesListCheckWidth(width) {
    window.removeEventListener("resize", putin);
    if(!width) {
      return;
    } else if(width) {
      window.addEventListener("resize", putin);
      removeBorderRight();
    }
  }

  advantagesListCheckWidth(advantagesWidth.matches);

  advantagesWidth.onchange = (e) => {
    advantagesListCheckWidth(e.matches);
  }
}

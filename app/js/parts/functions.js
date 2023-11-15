function throttle(func, delay) {
  let wait = false;

  return (...args) => {
    if (wait) {
        return;
    }

    func(...args);
    wait = true;
    setTimeout(() => {
      wait = false;
    }, delay);
  }
}

function debounce(func, delay) {
  let timeout;
  return function() {
    const context = this;
    const args = arguments;
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(context, args), delay);
  };
}

// =========================== Фикс скачка браузерного скролла и плавной прокрутки ==========================================

const scrollController = {
  scrollPosition: 0,
  disabledScroll(fixedElement) {

    if(fixedElement) {
      let fixedElements = document.querySelectorAll(fixedElement);
      fixedElements.forEach(element => {
        element.style.paddingRight = `${parseInt(window.innerWidth - document.body.offsetWidth)}px`;
      });
    }

    scrollController.scrollPosition = window.scrollY;
    document.body.style.cssText = `
      overflow: hidden;
      position: fixed;
      top: -${scrollController.scrollPosition}px;
      left: 0;
      height: 100vh;
      width: 100vw;
      padding-right: ${parseInt(window.innerWidth - document.body.offsetWidth)}px;
    `;
    document.documentElement.style.scrollBehavior = "unset";
  },
  enabledScroll(fixedElement) {
    document.body.style.cssText = "";
    window.scroll({top: scrollController.scrollPosition});
    document.documentElement.style.scrollBehavior = "";

    if(fixedElement) {
      let fixedElements = document.querySelectorAll(fixedElement);
      fixedElements.forEach(element => {
        element.style.paddingRight = "0";
      });
    }
  }
}


//=========================== Функции fadeIn fadeOut ======================

function fadeIn(element, display, duration = 1000) {
  let el = element;
  let elStyles = window.getComputedStyle(el);

  if(elStyles.display === "none") {
    element.style.display = display;
    element.style.opacity = 0;

    let startTime = performance.now();

    function animate(currentTime) {
      let elapsedTime = currentTime - startTime;
      let progress = elapsedTime / duration;
      element.style.opacity = progress;
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        element.style.cssText = `display: ${display};`;
      }
    }
    requestAnimationFrame(animate);
  } else {
    return;
  }
}

function fadeOut(element, duration = 1000) {
  let el = element;
  let elStyles = window.getComputedStyle(el);

  if(elStyles.display !== "none") {
  element.style.opacity = 1;
    let startTime = performance.now();

    function animate(currentTime) {
      let elapsedTime = currentTime - startTime;
      let progress = 1 - (elapsedTime / duration);
      element.style.opacity = progress;
      if (progress > 0) {
        requestAnimationFrame(animate);
      } else {
        element.style.cssText = "display: none;";
      }
    }
    requestAnimationFrame(animate);
  } else {
    return;
  }
}

// =========== Запуск функции на определенной ширине =====================

function changeView(width, function_name) {
  if(!width) {
    function_name;
  }
}

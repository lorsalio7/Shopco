// ===========================   Фикс скачка браузерного скролла и плавной прокрутки   ==========================================

let isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
let isDesktopSafari = isSafari && !navigator.userAgent.match(/Mobile/);


const scrollController = {
  scrollPosition: 0,
  disabledScroll(fixedElement) {
    const scrollBarWidth = window.innerWidth - document.body.offsetWidth;

    // записываем в html css-переменную
    document.documentElement.style.setProperty("--scroll-width", `${scrollBarWidth}px`);
    if (isDesktopSafari) {

      scrollController.scrollPosition = window.scrollY;


      document.body.style.cssText = `
        overflow-y: scroll;
        position: fixed;
        top: -${scrollController.scrollPosition}px;
        left: 0;
        height: 100vh;
        width: 100vw;
        padding-right: ${scrollBarWidth}px;
      `;
      document.documentElement.classList.add("no-scroll");
      document.documentElement.style.scrollBehavior = "unset";
    } else {

      if (fixedElement) {
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
        padding-right: ${scrollBarWidth}px;
      `;
      document.documentElement.classList.add("no-scroll");
      document.documentElement.style.scrollBehavior = "unset";
    }
  },
  enabledScroll(fixedElement) {
    // убираем переменную, если не нужна
    document.documentElement.style.removeProperty("--scroll-width");
    if (isDesktopSafari) {
      document.body.style.cssText = "";
      window.scroll({ top: scrollController.scrollPosition });
      document.documentElement.style.scrollBehavior = "";
    } else {

      if (fixedElement) {
        let fixedElements = document.querySelectorAll(fixedElement);
        fixedElements.forEach(element => {
          // element.style.paddingRight = "0";
          element.removeAttribute("style");
        });
      }

      document.body.style.cssText = "";
      window.scroll({ top: scrollController.scrollPosition });
      document.documentElement.classList.remove("no-scroll");
      document.documentElement.style.scrollBehavior = "";
    }
  }
}

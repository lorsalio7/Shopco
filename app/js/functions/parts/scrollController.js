// =========================== Фикс скачка браузерного скролла и плавной прокрутки обязательно подключить isSafari.js ==========================================

const scrollController = {
  scrollPosition: 0,
  disabledScroll(fixedElement) {

    if(isDesktopSafari) {

      scrollController.scrollPosition = window.scrollY;

      document.body.style.cssText = `
        overflow-y: scroll;
        position: fixed;
        top: -${scrollController.scrollPosition}px;
        left: 0;
        height: 100vh;
        width: 100vw;
        padding-right: ${parseInt(window.innerWidth - document.body.offsetWidth)}px;
      `;
      document.documentElement.style.scrollBehavior = "unset";
    } else {

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
    }
  },
  enabledScroll(fixedElement) {
    if(isDesktopSafari) {
      document.body.style.cssText = "";
      window.scroll({top: scrollController.scrollPosition});
      document.documentElement.style.scrollBehavior = "";
    } else {

      if(fixedElement) {
        let fixedElements = document.querySelectorAll(fixedElement);
        fixedElements.forEach(element => {
          element.style.paddingRight = "0";
        });
      }

      document.body.style.cssText = "";
      window.scroll({top: scrollController.scrollPosition});
      document.documentElement.style.scrollBehavior = "";
    }
  }
}

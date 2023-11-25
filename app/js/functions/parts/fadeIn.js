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

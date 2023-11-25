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

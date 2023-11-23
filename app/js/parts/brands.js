let brands = document.querySelector(".brands-slider");

if(brands) {
  new Splide(brands, {
    type: "loop",
    arrows: false,
    pagination: false,
    mediaQuery: 'min',
    perPage: 3,
    gap: 34,
    autoWidth: true,
    breakpoints: {
      550: {
        perPage: 4,
        gap: 50
      },
      769: {
        gap: 70
      },
      1025: {
        perPage: 5,
        gap: 106
      }
    },
    autoScroll: {
      speed: 2,
    }
  }).mount(window.splide.Extensions);
}

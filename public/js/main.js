$(document).ready(function () {
  $("#owl-demo").owlCarousel({
    loop: true,
    items: 5, //10 items above 1000px browser width
    itemsDesktop: [1000, 4], //5 items between 1000px and 901px
    itemsDesktopSmall: [900, 2], // betweem 900px and 601px
    itemsTablet: [600, 2], //2 items between 600 and 0;
    itemsMobile: false, // itemsMobile disabled - inherit from itemsTablet option
    responsiveClass: true,
    responsive: {
      0: {
        items: 2,
        nav: true,
      },
      600: {
        items: 3,
        nav: false,
      },
      1000: {
        items: 3,
        nav: false,
        loop: true,
      },
    },
  });
});

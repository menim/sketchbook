'use strict';

// const mySwiper = new Swiper('.swiper-container', {

//   // If we need pagination
//   pagination: {
//     el: '.swiper-pagination',
//   },

//   // Navigation arrows
//   navigation: {
//     nextEl: '',
//     prevEl: '',
//   },

//   // And if we need scrollbar
//   scrollbar: {
//     el: '',
//   },
// });

document.querySelectorAll('.swiper-container').forEach(function (item) {
  new Swiper(item, {
    // If we need pagination
    pagination: {
      el: '.swiper-pagination'
    },

    // Navigation arrows
    navigation: {
      nextEl: '',
      prevEl: ''
    },

    // And if we need scrollbar
    scrollbar: {
      el: ''
    }
  });
});
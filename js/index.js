'use strict';

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

var videoEl = document.querySelector('.video');
var sketchEl = document.querySelector('.wht-sketch');
var descriptCont = document.querySelector('.description');

var descriptContYPos = Math.round(descriptCont.getBoundingClientRect().top);

function debounce(func) {
  var wait = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 10;
  var immediate = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

  var timeout = void 0;
  return function () {
    var context = this,
        args = arguments;
    var later = function later() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
};

function checkPosition() {
  var windowY = window.scrollY;
  if (windowY >= descriptContYPos) {
    videoEl.classList.add('is-visible');
    sketchEl.classList.add('is-visible');
    videoEl.classList.remove('is-hidden');
    sketchEl.classList.remove('is-hidden');
  }
}

window.addEventListener('scroll', debounce(checkPosition));
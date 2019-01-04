document.querySelectorAll('.swiper-container').forEach(item => {
  new Swiper(item, {
    // If we need pagination
    pagination: {
      el: '.swiper-pagination',
    },

    // Navigation arrows
    navigation: {
      nextEl: '',
      prevEl: '',
    },

    // And if we need scrollbar
    scrollbar: {
      el: '',
    },
  });
});

const videoEl = document.querySelector('.video');
const sketchEl = document.querySelector('.wht-sketch');
const descriptCont = document.querySelector('.description');

let descriptContYPos = Math.round(descriptCont.getBoundingClientRect().top);

function debounce(func, wait = 10, immediate = true) {
  let timeout;
  return function () {
    let context = this, args = arguments;
    let later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    let callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
};

function checkPosition() {
  let windowY = window.scrollY;
  if(windowY >= descriptContYPos) {
    videoEl.classList.add('is-visible');
    sketchEl.classList.add('is-visible');
    videoEl.classList.remove('is-hidden');
    sketchEl.classList.remove('is-hidden');
  }
}

window.addEventListener('scroll', debounce(checkPosition));
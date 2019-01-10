document.querySelectorAll('.swiper-container').forEach(item => {
  // eslint-disable-next-line no-new
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
const viewHeight = window.innerHeight || document.documentElement.clientHeight;

function checkPosition() {
  const descriptContYPos = descriptCont.getBoundingClientRect().top;
  if (viewHeight >= descriptContYPos) {
    videoEl.classList.add('is-visible');
    sketchEl.classList.add('is-visible');
    videoEl.classList.remove('is-hidden');
    sketchEl.classList.remove('is-hidden');
    window.removeEventListener('scroll', checkPosition);
  }
}

window.addEventListener('scroll', checkPosition);

'use strict';

document.querySelectorAll('.swiper-container').forEach(function (item) {
  // eslint-disable-next-line no-new
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
var viewHeight = window.innerHeight || document.documentElement.clientHeight;

function checkPosition() {
  var descriptContYPos = descriptCont.getBoundingClientRect().top;
  if (viewHeight >= descriptContYPos) {
    videoEl.classList.add('is-visible');
    sketchEl.classList.add('is-visible');
    videoEl.classList.remove('is-hidden');
    sketchEl.classList.remove('is-hidden');
    window.removeEventListener('scroll', checkPosition);
  }
}
window.addEventListener('scroll', checkPosition);

function findVideo() {
  var video = document.querySelector('.video');
  setupVideo(video);
}

function setupVideo(video) {
  var link = video.querySelector('.video__link');
  var media = video.querySelector('.video__media');
  var button = video.querySelector('.video__button');
  var id = parseMediaURL(media);

  video.addEventListener('click', function () {
    var iframe = createIframe(id);

    link.remove();
    button.remove();
    video.appendChild(iframe);
  });

  link.removeAttribute('href');
  video.classList.add('video--enabled');
}

function parseMediaURL(media) {
  var regexp = /https:\/\/i\.ytimg\.com\/vi\/([a-zA-Z0-9_-]+)\/sddefault\.jpg/i;
  var url = media.src;
  var match = url.match(regexp);

  return match[1];
}

function createIframe(id) {
  var iframe = document.createElement('iframe');

  iframe.setAttribute('allowfullscreen', '');
  iframe.setAttribute('allow', 'autoplay');
  iframe.setAttribute('src', generateURL(id));
  iframe.classList.add('video__media');

  return iframe;
}

function generateURL(id) {
  var query = '?rel=0&modestbranding=1&autohide=1&showinfo=0&autoplay=1';

  return 'https://www.youtube.com/embed/' + id + query;
}

findVideo();
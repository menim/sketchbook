document.querySelectorAll('.slider-container').forEach(sliderItem => {
  let slider = tns({
    container: sliderItem,
    gutter: 25,
    //edgePadding: 15,
    slideBy: 1,
    items: 1,
    controls: false,
    navPosition: 'bottom',
    mouseDrag: true
  });
});

let rellax = new Rellax('.rellax');

const videoEl = document.querySelector('.video');
const sketchEl = document.querySelector('.wht-sketch');
const viewHeight = window.innerHeight || document.documentElement.clientHeight;

function checkPosition() {
  const descriptContYPos = sketchEl.getBoundingClientRect().bottom;
  if (viewHeight >= descriptContYPos) {
    videoEl.classList.add('is-visible');
    sketchEl.classList.add('is-visible');
    videoEl.classList.remove('is-hidden-down');
    sketchEl.classList.remove('is-hidden-up');
    window.removeEventListener('scroll', checkPosition);
  }
}
window.addEventListener('scroll', checkPosition);

function findVideo() {
  let video = document.querySelector('.video');
    setupVideo(video);
}

function setupVideo(video) {
  let link = video.querySelector('.video__link');
  let media = video.querySelector('.video__media');
  let button = video.querySelector('.video__button');
  let id = parseMediaURL(media);

  video.addEventListener('click', () => {
    let iframe = createIframe(id);

    link.remove();
    button.remove();
    video.appendChild(iframe);
  });

  link.removeAttribute('href');
  video.classList.add('video--enabled');
}

function parseMediaURL(media) {
  let regexp = /https:\/\/i\.ytimg\.com\/vi\/([a-zA-Z0-9_-]+)\/sddefault\.jpg/i;
  let url = media.src;
  let match = url.match(regexp);

  return match[1];
}

function createIframe(id) {
  let iframe = document.createElement('iframe');

  iframe.setAttribute('allowfullscreen', '');
  iframe.setAttribute('allow', 'autoplay');
  iframe.setAttribute('src', generateURL(id));
  iframe.classList.add('video__media');

  return iframe;
}

function generateURL(id) {
  let query = '?rel=0&modestbranding=1&autohide=1&showinfo=0&autoplay=1';

  return 'https://www.youtube.com/embed/' + id + query;
}

findVideo();
function createSlideWithImage(imageUrl) {
  const slide = document.createElement('div');
  slide.className = 'carousel-slide';

  const img = document.createElement('img');
  img.src = imageUrl;
  img.alt = 'Carousel Image';

  slide.appendChild(img);
  return slide;
}

function createIndicator(index) {
  const indicator = document.createElement('div');
  indicator.className = 'carousel-indicator';
  if (index === 0) indicator.classList.add('active');
  indicator.addEventListener('click', () => goto(index));
  return indicator;
}

function initCarousel(imageUrls) {
  const carouselSlides = document.querySelector('.carousel-slides');
  const indicatorsContainer = document.querySelector('.carousel-indicators');

  carouselSlides.innerHTML = '';
  indicatorsContainer.innerHTML = '';

  imageUrls.forEach((url, index) => {
    const slide = createSlideWithImage(url);
    carouselSlides.appendChild(slide);

    const indicator = createIndicator(index);
    indicatorsContainer.appendChild(indicator);
  });

  /* carousel 초기화 재실행 : 새로운 Slides 적용 */
  init();
}

const prevBtn = document.querySelector("div.prev-arrow");
const nextBtn = document.querySelector("div.next-arrow");
let slides = [];
let indicators = [];

function render() {
  let offset = 0;
  slides.forEach((slide, index) => {
    if (index < currIdx) {
      offset += slide.offsetWidth;
    }
  });

  document.querySelector("div.carousel-slides").style.transform = `translateX(-${offset}px)`;
  indicators.forEach((dot, index) => {
    index === currIdx
      ? dot.classList.add("active")
      : dot.classList.remove("active");
  });
}

function prev() {
  if (currIdx <= 0) return;
  currIdx -= 1;
  render();
}

function next() {
  if (currIdx >= slides.length - 1) return;
  currIdx += 1;
  render();
}

function goto(newIndex) {
  if (newIndex < 0 || newIndex >= slides.length) return;
  currIdx = newIndex;
  render();
}

let currIdx = 0;

function init() {
  slides = Array.from(document.querySelectorAll("div.carousel-slides > .carousel-slide"));
  indicators = Array.from(document.querySelectorAll(".carousel-indicator"));

  prevBtn.addEventListener('click', prev);
  nextBtn.addEventListener('click', next);

  render();
}
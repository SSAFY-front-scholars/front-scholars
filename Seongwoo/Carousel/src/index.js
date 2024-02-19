let currIdx = 0;
let slides = [];
let indicators = [];
let autoSlideInterval;
let options = {};
const DEFAULT_AUTOSLIDE_DURATION = DEFAULT_AUTOSLIDE_DURATION

function createSlideWithImage(imageUrl, isClone = false) {
  const slide = document.createElement('div');
  slide.className = 'carousel-slide' + (isClone ? ' clone' : '');
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
  indicator.addEventListener('click', () => goto(index + 1)); 
  return indicator;
}

function createIndicators(count) {
  const indicatorsContainer = document.querySelector('.carousel-indicators');
  indicatorsContainer.innerHTML = ''; 
  for (let i = 0; i < count; i++) {
    indicatorsContainer.appendChild(createIndicator(i));
  }
  indicators = Array.from(document.querySelectorAll('.carousel-indicator'));
}

function initCarousel(imageUrls, userOptions = {}) {
  options = userOptions;
  const carouselContainer = document.querySelector('.carousel-slides');
  carouselContainer.innerHTML = ''; 


  const lastSlideClone = createSlideWithImage(imageUrls[imageUrls.length - 1], true);
  carouselContainer.appendChild(lastSlideClone);


  imageUrls.forEach((url, index) => {
    const slide = createSlideWithImage(url);
    carouselContainer.appendChild(slide);
  });

  const firstSlideClone = createSlideWithImage(imageUrls[0], true);
  carouselContainer.appendChild(firstSlideClone);

  slides = Array.from(document.querySelectorAll('.carousel-slide'));
  currIdx = 1; 
  updateCarouselPosition(true); 

  createIndicators(imageUrls.length);

  document.querySelector('.prev-arrow').addEventListener('click', prev);
  document.querySelector('.next-arrow').addEventListener('click', next);

  if (options.autoLoop) startAutoSlide(options.slideDuration || DEFAULT_AUTOSLIDE_DURATION);
}



function updateCarouselPosition(instant = false) {
  const carouselContainer = document.querySelector('.carousel-slides');
  const offset = slides[currIdx].offsetLeft - slides[0].offsetLeft;
  carouselContainer.style.transform = `translateX(-${offset}px)`;
  carouselContainer.style.transition = instant ? 'none' : 'transform 0.5s ease';

  indicators.forEach((ind, index) => {
    ind.classList.toggle('active', index === currIdx - 1);
  });

  if (autoSlideInterval && (currIdx === 0 || currIdx === slides.length - 1)) {
    setTimeout(() => {
      currIdx = currIdx === 0 ? slides.length - 2 : 1;
      updateCarouselPosition(true);
    }, 500);
  }
}

function prev() {
  if (autoSlideInterval) resetAutoSlide();
  currIdx = currIdx <= 1 ? slides.length - 2 : currIdx - 1;
  updateCarouselPosition();
}

function next() {
  if (autoSlideInterval) resetAutoSlide();
  currIdx = currIdx >= slides.length - 2 ? 1 : currIdx + 1;
  updateCarouselPosition();
}

function goto(index) {
  currIdx = index;
  updateCarouselPosition();
}

function resetAutoSlide() {
  clearInterval(autoSlideInterval);
  startAutoSlide(options.slideDuration || DEFAULT_AUTOSLIDE_DURATION);
}

function startAutoSlide(duration) {
  clearInterval(autoSlideInterval);
  autoSlideInterval = setInterval(next, duration);
}

document.addEventListener('DOMContentLoaded', () => {
});
const slides = document.querySelector(".carousel-slide");
const indicators = document.querySelectorAll(".indicator");
const prevButton = document.querySelector(".prev");
const nextButton = document.querySelector(".next");
let currentIndex = 0;
let intervalId;

// Set initial active indicator
indicators[currentIndex].classList.add("active");

// Event listener for prev button
prevButton.addEventListener("click", () => {
  currentIndex =
    (currentIndex - 1 + slides.children.length) % slides.children.length;
  updateCarousel();
  resetInterval();
});

// Event listener for next button
nextButton.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % slides.children.length;
  updateCarousel();
  resetInterval();
});

// Event listeners for indicators
indicators.forEach((indicator, index) => {
  indicator.addEventListener("click", () => {
    currentIndex = index;
    updateCarousel();
    resetInterval();
  });
});

// Auto slide every 3 seconds
startInterval();

function startInterval() {
  intervalId = setInterval(() => {
    currentIndex = (currentIndex + 1) % slides.children.length;
    updateCarousel();
  }, 3000);
}

function resetInterval() {
  clearInterval(intervalId);
  startInterval();
}

// Update carousel slide based on currentIndex
function updateCarousel() {
  slides.style.transform = `translateX(-${currentIndex * 100}%)`;
  indicators.forEach((indicator, index) => {
    if (index === currentIndex) {
      indicator.classList.add("active");
    } else {
      indicator.classList.remove("active");
    }
  });
}

/**
 * slides : 슬라이드들
 * indicators : 인디케이터들
 * prevBtn : 이전 버튼
 * nextBtn : 다음 버튼
 */
const slides = document.querySelector(".carousel-slide");
const indicators = document.querySelectorAll(".indicator");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");

/**
 * curIdx : 현재 슬라이드 index
 * intervalId : 자동 슬라이드 id
 */
let curIdx = 0;
let intervalId;

/**
 * startInteval : 자동 슬라이딩 시작
 * restartInterval : 자동 슬라이딩 초기화
 * updateCarousel : carousel 슬라이드 최신화
 */
const startInterval = () => {
  intervalId = setInterval(() => {
    curIdx = (curIdx + 1) % slides.children.length;
    updateCarousel();
  }, 3000);
};

const restartInterval = () => {
  clearInterval(intervalId);
  startInterval();
};

const updateCarousel = () => {
  slides.style.transform = `translateX(-${curIdx * 100}%)`;
  indicators.forEach((indicator, index) => {
    if (index === curIdx) indicator.classList.add("active");
    else indicator.classList.remove("active");
  });
};

// 이미지 자동슬라이드 시작
startInterval();

// 시작 슬라이드 0번으로
indicators[curIdx].classList.add("active");

// 이전 버튼
prevBtn.addEventListener("click", () => {
  curIdx = (curIdx - 1 + slides.children.length) % slides.children.length;
  updateCarousel();
  restartInterval();
});

// 다음 버튼
nextBtn.addEventListener("click", () => {
  curIdx = (curIdx + 1) % slides.children.length;
  updateCarousel();
  restartInterval();
});

// 인디케이터 클릭하면 해당 이미지로
indicators.forEach((indicator, idx) => {
  indicator.addEventListener("click", () => {
    curIdx = idx;
    updateCarousel();
    restartInterval();
  });
});

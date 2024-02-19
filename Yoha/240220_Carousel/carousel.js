/**
 * slides : 슬라이드들
 * indicators : 인디케이터들
 * prevBtn : 이전 버튼
 * nextBtn : 다음 버튼
 * controllerBtn : 자동 슬라이딩 제어 버튼
 * currentSlide : 현재 슬라이드 index
 * progressBar : 진행바
 */
const slides = document.querySelector(".carousel-slide");
const indicators = document.querySelectorAll(".indicator");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");
const controllerBtn = document.querySelector(".controller");
const currentSlide = document.querySelector(".current-slide");
const progressBar = document.querySelector(".progress-bar");

/**
 * curIdx : 현재 슬라이드 index
 * intervalId : 자동 슬라이드 id
 * state : 현재 자동 슬라이딩 재생 상태
 */
let curIdx = 0;
let intervalId;
let state = "resume";

/**
 * startInteval : 자동 슬라이딩 시작
 * restartInterval : 자동 슬라이딩 초기화 후 재시작
 * pauseInterval : 자동 슬라이딩 멈춤
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

const pauseInterval = () => {
  clearInterval(intervalId);
};

const updateCarousel = () => {
  slides.style.transform = `translateX(-${curIdx * 100}%)`;
  indicators.forEach((indicator, index) => {
    if (index === curIdx) indicator.classList.add("active");
    else indicator.classList.remove("active");
  });
  currentSlide.textContent = `0${curIdx + 1}`;

  progressBar.style.transitionDuration = "0s";
  progressBar.style.width = "0";
  if (state === "resume") {
    setTimeout(() => {
      progressBar.style.transitionDuration = "3s";
      progressBar.style.width = "100%";
    }, 10);
  }
};

// 이미지 자동슬라이드 시작
startInterval();

// 시작 슬라이드 0번으로
indicators[curIdx].classList.add("active");

// 이전 버튼
prevBtn.addEventListener("click", () => {
  curIdx = (curIdx - 1 + slides.children.length) % slides.children.length;
  updateCarousel();
  if (state === "resume") restartInterval();
});

// 다음 버튼
nextBtn.addEventListener("click", () => {
  curIdx = (curIdx + 1) % slides.children.length;
  updateCarousel();
  if (state === "resume") restartInterval();
});

// 인디케이터 클릭하면 해당 이미지로
indicators.forEach((indicator, idx) => {
  indicator.addEventListener("click", () => {
    curIdx = idx;
    updateCarousel();
    restartInterval();
  });
});

// 자동 슬라이딩 멈춤/재개
controllerBtn.addEventListener("click", () => {
  if (state === "resume") {
    // 재생 상태였다면
    state = "pause";
    pauseInterval(); // 멈춤
    controllerBtn.innerHTML = "&#10062;";
  } else {
    // 멈춤 상태였다면
    state = "resume";
    startInterval(); // 재개
    controllerBtn.innerHTML = "&#9989;";
  }
});

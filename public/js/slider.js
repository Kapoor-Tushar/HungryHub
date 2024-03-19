// Selecting Elements
const sliderBtnLeft = document.querySelector(".slider__btn--left");
const sliderBtnRight = document.querySelector(".slider__btn--right");
const slides = document.querySelectorAll(".slide");

const sliderBtnLeftTRl = document.querySelector(".slider__btn--left_trl");
const sliderBtnRightTRl = document.querySelector(".slider__btn--right_trl");
const slidesRes = document.querySelectorAll(".top-restaurant-slide");
const numSLidesTopRes = document.querySelectorAll(
  ".top-restaurant-template-card"
);
const sliderBtnLeftYLR = document.querySelector(".slider__btn--left_ryl");
const sliderBtnRightYLR = document.querySelector(".slider__btn--right_ryl");
const slidesResYLR = document.querySelectorAll(
  ".your-location-restaurant-slide"
);
const numSlidesYLR = document.querySelectorAll(
  ".your-location-restaurant-template-card"
);

// Creating function to implement slider
let curSlide = 0;
let maxSlide = 2;

const goToSlide = function (sl) {
  slides.forEach(function (slide, i) {
    slide.style.transform = `translateX(${100 * -sl}%)`;
  });
};
goToSlide(0);

const nextSlide = function () {
  if (curSlide === maxSlide) {
    curSlide = 0;
  } else {
    curSlide++;
  }
  goToSlide(curSlide);
};

const prevSlide = function () {
  if (curSlide == 0) {
    curSlide = maxSlide;
  } else {
    curSlide--;
  }
  goToSlide(curSlide);
};
if (sliderBtnRight) {
  sliderBtnRight.addEventListener("click", nextSlide);
}
if (sliderBtnLeft) {
  sliderBtnLeft.addEventListener("click", prevSlide);
}

// Enabling top-restaurants sliding functionality
let curSlideTrs = 0;
let maxSlideTrs;
if (numSLidesTopRes.length % 4 == 0) {
  maxSlideTrs = numSLidesTopRes.length / 4;
} else {
  maxSlideTrs = numSLidesTopRes.length % 4;
}

const goToSlideTRS = function (sl) {
  slidesRes.forEach(function (slide, i) {
    slide.style.transform = `translateX(${320 * -sl}px)`;
  });
};
goToSlideTRS(0);
const nextSlideTRS = function () {
  if (curSlideTrs === maxSlideTrs) {
    curSlideTrs = 0;
  } else {
    curSlideTrs++;
  }
  goToSlideTRS(curSlideTrs);
};

const prevSlideTRS = function () {
  if (curSlideTrs == 0) {
    curSlideTrs = curSlideTrs;
  } else {
    curSlideTrs--;
  }
  goToSlideTRS(curSlideTrs);
};
if (sliderBtnRightTRl) {
  sliderBtnRightTRl.addEventListener("click", nextSlideTRS);
}
if (sliderBtnLeftTRl) {
  sliderBtnLeftTRl.addEventListener("click", prevSlideTRS);
}

// Enabling restaurants in your location sliding functionality
let curSlideYLR = 0;
let maxSlideYLR;
if (numSlidesYLR.length % 4 == 0) {
  maxSlideYLR = numSlidesYLR.length / 4;
} else {
  maxSlideYLR = numSlidesYLR.length % 4;
}

const goToSlideYLR = function (sl) {
  slidesResYLR.forEach(function (slide, i) {
    slide.style.transform = `translateX(${320 * -sl}px)`;
  });
};
goToSlideYLR(0);
const nextSlideYLR = function () {
  if (curSlideYLR === maxSlideYLR) {
    curSlideYLR = 0;
  } else {
    curSlideYLR++;
  }
  goToSlideYLR(curSlideYLR);
};

const prevSlideYLR = function () {
  if (curSlideYLR == 0) {
    curSlideYLR = curSlideYLR;
  } else {
    curSlideYLR--;
  }
  goToSlideYLR(curSlideYLR);
};
if (sliderBtnRightYLR) {
  sliderBtnRightYLR.addEventListener("click", nextSlideYLR);
}
if (sliderBtnLeftYLR) {
  sliderBtnLeftYLR.addEventListener("click", prevSlideYLR);
}

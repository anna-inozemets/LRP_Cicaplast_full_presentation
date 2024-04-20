// main variables that used in code
const slideContainer = document.querySelector('.slide__container')
const rotateBlock = document.querySelector('.rotate__block');
const agreementButton = document.querySelector('.agree');
const nextSlideButton = document.querySelector('.arrow--next');
const prevSlideButton = document.querySelector('.arrow--prev');

// additional variables for timeout Ids
let nextButtonTimeout;
let prevButtonTimeout;
let lastSlideActionTimeout;

// additional variables for arrows
const hiddenArrowClass = 'hidden';
let nextArrowDelay = 1;

// additional varibles for slides
const totalSlideAmount = 19;
const pathNames = Array.from(
  { length: totalSlideAmount }, (_, i) => ({ count: i + 1, pathName:`./slides/slide--${i + 1}.html` })
);

// additional function for detecting correct font-size
function heightDetect(percent) {
  const height = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

  return (percent * (height - 6)) / 100;
}
function widthDetect(percent) {
  const width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);

  return (percent * width) / 100;
}
function setResponsiveFontSize() {
  $('.slide__container').css({
    'font-size': `clamp(1px, ${heightDetect(0.925925)}px,${widthDetect(0.520833)}px)`
  });
  $('.arrows').css({
    'font-size': `clamp(1px, ${heightDetect(0.925925)}px,${widthDetect(0.520833)}px)`
  });
}

// function for action after last slide
function lastSlideAction() {
  let id = $('#presentation', window.parent.document).attr('data-id');
  let $url = "https://www.dermaclub.com.ua/courses/send/presa";
  let href = $('#presentation', window.parent.document).attr('data-href');
  let $token = $('meta[name="csrf-token"]', window.parent.document).attr('content');
  $.ajaxSetup({
    headers: {
      'X-CSRF-TOKEN': $token
    }
  });
  $.ajax({
    type: "POST",
    url: $url,
    data: {"id": id},
    success: function (data) {
      if (data !== false) {
        parent.location.href = href;
      }
    },
    error: function (data) {
      console.log(data);
    }
  });
}

// function that animate number from 0 to correct num
function animateNumber(delay) {
  const allElements = document.querySelectorAll('[data-number]');

  allElements.forEach(el => {
    const targetNumber = Number(el.getAttribute('data-number'));

    gsap.to(el, {
      duration: 2.5,
      innerHTML: targetNumber,
      delay,
      onUpdate: () => {
        el.innerHTML = Math.round(el.innerHTML);
      },
      onComplete: () => {
        el.innerHTML = targetNumber;
      }
    });
  });
}

// object that store manipulations with slides
const slideActions = {
  1: () => {
    nextArrowDelay = 1;
  },
  2: () => {
    $(nextSlideButton).removeClass('arrow--white');
    $(prevSlideButton).removeClass('arrow--white');
    gsap.from('.slide--2__block.first', { opacity: 0, duration: 0.75, delay: 1, x: 30 });
    gsap.from('.slide--2__block.second', { opacity: 0, duration: 0.75, delay: 1.75, x: 30 });
    gsap.from('.slide--2__block.third', { opacity: 0, duration: 0.75, delay: 2.5, x: 30 });
    nextArrowDelay = 3.5;
  },
  3: () => {
    $(nextSlideButton).addClass('arrow--white');
    $(prevSlideButton).addClass('arrow--white');
    nextArrowDelay = 1;
  },
  4: () => {
    $(nextSlideButton).removeClass('arrow--white');
    $(prevSlideButton).removeClass('arrow--white');
    gsap.from('.slide--4-block.top h4', { opacity: 0, duration: 0.75, delay: 1, x: -20 });
    gsap.from('.slide--4-block.top h4 + .arrow', { opacity: 0, duration: 0.75, delay: 1 });
    gsap.from('.slide--4-block.top h5', { opacity: 0, duration: 0.75, delay: 1.75, x: -20 });
    gsap.from('.slide--4-block.top h5 + .arrow', { opacity: 0, duration: 0.75, delay: 1.75 });
    gsap.from('.slide--4-block.top p', { opacity: 0, duration: 0.75, delay: 2.5, x: -20 });
    gsap.from('.slide--4-block.top p + img', { opacity: 0, duration: 0.75, delay: 2.5, x: -20 });
    gsap.from('.slide--4-block.bottom h4', { opacity: 0, duration: 0.75, delay: 3.25, x: -20 });
    gsap.from('.slide--4-block.bottom h4 + .arrow', { opacity: 0, duration: 0.75, delay: 3.25 });
    gsap.from('.slide--4-block.bottom h5', { opacity: 0, duration: 0.75, delay: 4, x: -20 });
    gsap.from('.slide--4-block.bottom h5 + .arrow', { opacity: 0, duration: 0.75, delay: 4 });
    gsap.from('.slide--4-block.bottom p', { opacity: 0, duration: 0.75, delay: 4.75, x: -20 });
    gsap.from('.slide--4-block.bottom p + img', { opacity: 0, duration: 0.75, delay: 4.75, x: -20 });
    nextArrowDelay = 5.75;
  },
  5: () => {
    gsap.from('.slide--5__left .slide--5__icon:nth-child(1)', { opacity: 0, duration: 0.75, delay: 1, x: 30 });
    gsap.from('.slide--5__left .slide--5__icon:nth-child(2)', { opacity: 0, duration: 0.75, delay: 1.75, x: 30 });
    gsap.from('.slide--5__left .slide--5__icon:nth-child(3)', { opacity: 0, duration: 0.75, delay: 2.5, x: 30 });
    gsap.from('.slide--5__right .slide--5__icon:nth-child(1)', { opacity: 0, duration: 0.75, delay: 3.25, x: 30 });
    gsap.from('.slide--5__right .slide--5__icon:nth-child(2)', { opacity: 0, duration: 0.75, delay: 4, x: 30 });
    nextArrowDelay = 5;
  },
  6: () => {
    $(nextSlideButton).removeClass('arrow--more-left');
    $(nextSlideButton).removeClass('arrow--white');
    gsap.from('.slide--6__block:nth-child(1)', { opacity: 0, duration: 0.75, delay: 1, x: 30 });
    gsap.from('.slide--6__block:nth-child(2)', { opacity: 0, duration: 0.75, delay: 1.75, x: 30 });
    gsap.from('.slide--6__block:nth-child(3)', { opacity: 0, duration: 0.75, delay: 2.5, x: 30 });
    gsap.from('.slide--6__block:nth-child(4)', { opacity: 0, duration: 0.75, delay: 3.25, x: 30 });
    gsap.from('.slide--6__block:nth-child(5)', { opacity: 0, duration: 0.75, delay: 4, x: 30 });
    nextArrowDelay = 5;
  },
  7: () => {
    $(nextSlideButton).addClass('arrow--more-left');
    $(nextSlideButton).addClass('arrow--white');
    gsap.from('.slide--7__right li.first', { opacity: 0, duration: 0.75, delay: 1, y: 15 });
    gsap.from('.slide--7__right li.second', { opacity: 0, duration: 0.75, delay: 1.75, y: 15 });
    gsap.from('.slide--7__right li.third', { opacity: 0, duration: 0.75, delay: 2.5, y: 15 });
    gsap.from('.slide--7__right li.fourth', { opacity: 0, duration: 0.75, delay: 3.25, y: 15 });
    gsap.from('.slide--7__right li.fifth', { opacity: 0, duration: 0.75, delay: 4, y: 15 });
    nextArrowDelay = 5;
  },
  8: () => {
    $(nextSlideButton).addClass('arrow--white');
    $(nextSlideButton).removeClass('arrow--more-left');
    gsap.from('.slide--8__right .up-wrapper .text', { opacity: 0, duration: 0.75, delay: 1 });
    gsap.from('.slide--8__right .up-wrapper .number-wrapper', { opacity: 0, duration: 0.75, delay: 1 });
    gsap.from('.slide--8__right .up-wrapper .conclude', { opacity: 0, duration: 0.75, delay: 1 });
    nextArrowDelay = 2;
  },
  9: () => {
    $(nextSlideButton).removeClass('arrow--white');
    animateNumber(1);
    nextArrowDelay = 3.5;
  },
  10: () => {
    animateNumber(1);
    nextArrowDelay = 3.5;
  },
  11: () => {
    gsap.from('.slide--11__list-block.first h3', { opacity: 0, duration: 0.75, delay: 1, y: 15 });
    gsap.from('.slide--11__list-block.first li:nth-child(1)', { opacity: 0, duration: 0.75, delay: 1.75, y: 15 });
    gsap.from('.slide--11__list-block.first li:nth-child(2)', { opacity: 0, duration: 0.75, delay: 2.5, y: 15 });
    gsap.from('.slide--11__list-block.second h3', { opacity: 0, duration: 0.75, delay: 3.25, y: 15 });
    gsap.from('.slide--11__list-block.second li:nth-child(1)', { opacity: 0, duration: 0.75, delay: 4, y: 15 });
    gsap.from('.slide--11__list-block.second li:nth-child(2)', { opacity: 0, duration: 0.75, delay: 4.75, y: 15 });
    gsap.from('.slide--11__list-block.second li:nth-child(3)', { opacity: 0, duration: 0.75, delay: 5.5, y: 15 });
    nextArrowDelay = 6.5;
  },
  12: () => {
    gsap.from('.slide--12__block.first', { opacity: 0, duration: 0.75, delay: 1, x: 30 });
    gsap.from('.slide--12__block.second', { opacity: 0, duration: 0.75, delay: 1.75, x: 30 });
    gsap.from('.slide--12__block.third', { opacity: 0, duration: 0.75, delay: 2.5, x: 30 });
    nextArrowDelay = 3.5;
  },
  13: () => {
    gsap.from('.slide--13__spray', { opacity: 0, duration: 0.75, delay: 1, x: -30 });
    gsap.from('.slide--13__cream', { opacity: 0, duration: 0.75, delay: 1, x: 30 });
    nextArrowDelay = 2;
  },
  14: () => {
    gsap.from('.slide--14__right > img', { opacity: 0, duration: 0.75, delay: 1 });
    gsap.from('.slide--14__left .slide--14__icon:nth-child(1)', { opacity: 0, duration: 0.75, delay: 1.75, x: 30 });
    gsap.from('.slide--14__left .slide--14__icon:nth-child(2)', { opacity: 0, duration: 0.75, delay: 2.5, x: 30 });
    gsap.from('.slide--14__left .slide--14__icon:nth-child(3)', { opacity: 0, duration: 0.75, delay: 3.25, x: 30 });
    gsap.from('.slide--14__left .slide--14__icon:nth-child(4)', { opacity: 0, duration: 0.75, delay: 4, x: 30 });
    nextArrowDelay = 5;
  },
  15: () => {
    gsap.from('.slide--15__block.first', { opacity: 0, duration: 0.75, delay: 1, x: 30 });
    gsap.from('.slide--15__block.second', { opacity: 0, duration: 0.75, delay: 1.75, x: 30 });
    gsap.from('.slide--15__block.third', { opacity: 0, duration: 0.75, delay: 2.5, x: 30 });
    nextArrowDelay = 3.5;
  },
  16: () => {
    gsap.from('.slide--16__block.first', { opacity: 0, duration: 0.75, delay: 1, x: 30 });
    gsap.from('.slide--16__block.second', { opacity: 0, duration: 0.75, delay: 1.75, x: 30 });
    gsap.from('.slide--16__block.third', { opacity: 0, duration: 0.75, delay: 2.5, x: 30 });
    gsap.from('.slide--16__block.fourth', { opacity: 0, duration: 0.75, delay: 3.25, x: 30 });
    gsap.from('.slide--16__block.fifth', { opacity: 0, duration: 0.75, delay: 4, x: 30 });
    nextArrowDelay = 5;
  },
  17: () => {
    $(nextSlideButton).addClass('arrow--white');
    gsap.from('.slide--17__block.first', { opacity: 0, duration: 0.75, delay: 1, x: 30 });
    gsap.from('.slide--17__block.second', { opacity: 0, duration: 0.75, delay: 1.75, x: 30 });
    gsap.from('.slide--17__block.third', { opacity: 0, duration: 0.75, delay: 2.5, x: 30 });
    nextArrowDelay = 3.5;
  },
  18: () => {
    clearTimeout(lastSlideActionTimeout);
    gsap.from('.slide--18__block.first', { opacity: 0, duration: 0.75, delay: 1, x: 30 });
    gsap.from('.slide--18__block.second', { opacity: 0, duration: 0.75, delay: 1.75, x: 30 });
    gsap.from('.slide--18__right img.bottle', { opacity: 0, duration: 0.75, delay: 2.5, y: 15 });
    nextArrowDelay = 3.5;
  },
  19: () => {
    // lastSlideActionTimeout = setTimeout(() => {
    //   lastSlideAction();
    // }, 5 * 1000);
  },
}
// function that add animation for element
function animateSlide(slideNum = 1) {
  gsap.from('.slide', { opacity: 0, duration: 0.75 });

  slideActions[slideNum]();
}
// function that detect oriental of device
function updateRotateBlockVisibility() {
  const isPortrait = window.matchMedia('(orientation: portrait)').matches;

  $(rotateBlock).toggleClass('visible', isPortrait);
}
// function that load slide without reloading page
async function loadComponent(componentPathName, slideNum) {
  const response = await fetch(componentPathName);
  const data = await response.text();

  slideContainer.innerHTML = data;
  animateSlide(slideNum);
}
// function that update info about prev/next button
function updateNavigationButtons(currentSlide) {
  clearTimeout(nextButtonTimeout);
  clearTimeout(prevButtonTimeout);
  $(nextSlideButton).addClass(hiddenArrowClass);
  $(prevSlideButton).addClass(hiddenArrowClass);

  if (currentSlide === 0 || currentSlide === 1) {
    $(prevSlideButton).addClass(hiddenArrowClass);
  } else {
    prevButtonTimeout = setTimeout(() => {
      $(prevSlideButton).removeClass(hiddenArrowClass);
    }, nextArrowDelay * 1000);
  }

  if (currentSlide === 0 || currentSlide === totalSlideAmount) {
    $(nextSlideButton).addClass(hiddenArrowClass);
  } else {
    nextButtonTimeout = setTimeout(() => {
      $(nextSlideButton).removeClass(hiddenArrowClass);
      $(prevSlideButton).removeClass(hiddenArrowClass);
    }, nextArrowDelay * 1000);
  }
}
// function that change slide on the screen
async function changeSlide(direction) {
  const currentSlideNum = slideContainer.getAttribute('data-current-slide');

  let newSlideNum;

  if (direction === 'next') {
    newSlideNum = Number(currentSlideNum) + 1;
  } else if (direction === 'prev') {
    newSlideNum = Number(currentSlideNum) - 1;
  }

  const { pathName } = pathNames.find(pathNameInfo => pathNameInfo.count === +newSlideNum);

  await loadComponent(pathName, newSlideNum);

  slideContainer.setAttribute('data-current-slide', newSlideNum);
  updateNavigationButtons(newSlideNum);
}

//window and document listeners
$(document).ready(function () {
  setResponsiveFontSize();
  updateRotateBlockVisibility();
});
$(window).on('resize', function () {
  setResponsiveFontSize();
  updateRotateBlockVisibility();
});
$(window).on('orientationchange', function () {
  updateRotateBlockVisibility();
});

// button listeners
$(agreementButton).on('click', () => {
  loadComponent(pathNames[0].pathName);
  slideContainer.setAttribute('data-current-slide', 1);
  updateNavigationButtons(1);
});
$(nextSlideButton).on('click', () => {
  changeSlide('next')
})
$(prevSlideButton).on('click', () => {
  changeSlide('prev')
});

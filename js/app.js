import '../styles/style.scss';
import gsap from 'gsap';
import SmoothScroll from 'smooth-scroll';

const app = {};

app.hamburger = () => {
  const hamburger = document.querySelector('.hamburger');
  const nav = document.querySelector('.nav_items');

  hamburger.addEventListener('click', function() {
    this.classList.toggle('active');
    nav.classList.toggle('show');
  });

  const anchors = document.querySelectorAll('.nav_items a');

  anchors.forEach(anchor => {
    anchor.addEventListener('click', function() {
      nav.classList.toggle('show');
      hamburger.classList.remove('active');
      nav.classList.toggle('d-none');
    });
  });
};

app.svgAnimation = () => {
  const svgPaths = document.querySelectorAll('header path');

  svgPaths.forEach(path => {
    const length = path.getTotalLength();

    gsap.set(path, { strokeDasharray: length });
    gsap.fromTo(path, 5, { strokeDashoffset: length }, { strokeDashoffset: 0 });
  });
};

app.shadowAnimation = () => {
  setTimeout(() => {
    const headerContainer = document.querySelector('.header_main-content');
    headerContainer.classList.add('shadow-pop-br');
  }, 2000);
};

app.smoothScroll = () => {
  const scroll = new SmoothScroll('a[href*="#"]', {
    speed: 500,
    speedAsDuration: true,
    easing: 'swing',
  });
};

function debounce(func, wait = 20, immediate = true) {
  let timeout;
  return function() {
    const context = this;
    const args = arguments;
    const later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

const sliderImages = document.querySelectorAll('.slide-in');

function checkSlide() {
  sliderImages.forEach(sliderImage => {
    // half way through the image
    const slideInAt =
      window.scrollY + window.innerHeight - sliderImage.height / 2;
    // bottom of the image
    const imageBottom = sliderImage.offsetTop + sliderImage.height;
    const isHalfShown = slideInAt > sliderImage.offsetTop;
    const isNotScrolledPast = window.scrollY < imageBottom;
    if (isHalfShown && isNotScrolledPast) {
      console.log('true');
      sliderImage.classList.add('active');
    } else {
      console.log('false');
      sliderImage.classList.remove('active');
    }
  });
}

window.addEventListener('scroll', debounce(checkSlide));

app.init = () => {
  app.svgAnimation();
  app.shadowAnimation();
  app.hamburger();
  app.smoothScroll();
  // app.slideImages();
};

app.init();

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
  const svgPaths = document.querySelectorAll('path');

  svgPaths.forEach(path => {
    const length = path.getTotalLength();

    gsap.set(path, { strokeDasharray: length });
    gsap.fromTo(path, 5, { strokeDashoffset: length }, { strokeDashoffset: 0 });
  });
};

app.smoothScroll = () => {
  const scroll = new SmoothScroll('a[href*="#"]', {
    speed: 500,
    speedAsDuration: true,
    easing: 'swing',
  });
};

app.init = () => {
  app.svgAnimation();
  app.hamburger();
  app.smoothScroll();

  const svgPaths = document.querySelectorAll('path');
};

app.init();

import "../styles/style.scss";
import gsap from "gsap";
import SmoothScroll from "smooth-scroll";

const app = {};

app.hamburger = () => {
  const hamburger = document.querySelector(".hamburger");
  const nav = document.querySelector(".nav_items");

  hamburger.addEventListener("click", function() {
    this.classList.toggle("active");
    nav.classList.toggle("show");
  });

  const anchors = document.querySelectorAll(".nav_items a");

  anchors.forEach(anchor => {
    anchor.addEventListener("click", function() {
      nav.classList.toggle("show");
      hamburger.classList.remove("active");
      nav.classList.toggle("d-none");
    });
  });
};

app.shadowAnimation = () => {
  setTimeout(() => {
    const headerContainer = document.querySelector(".header_main-content");
    headerContainer.classList.add("shadow-pop-br");
  }, 2000);
};

app.scrollAnimation = () => {
  setTimeout(() => {
    const scrollIcon = document.querySelector(".scroll-icon-container");
    scrollIcon.classList.remove("d-none");
  }, 3000);
};

app.smoothScroll = () => {
  const scroll = new SmoothScroll('a[href*="#"]', {
    speed: 500,
    speedAsDuration: true,
    easing: "swing"
  });
};

app.debounce = (func, wait = 20, immediate = true) => {
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
};

app.isElementShown = () => {
  const sliderImages = document.querySelectorAll(".draw-svg");

  sliderImages.forEach(sliderImage => {
    // get dimensions of element
    const offsetTop = app.getOffsetTop(sliderImage);
    const height = app.getElementHeight(sliderImage);

    // half way through the image
    const slideInAt = window.scrollY + window.innerHeight - height / 2;

    // bottom of the image
    const imageBottom = offsetTop + height;
    const isHalfShown = slideInAt > offsetTop;
    const isNotScrolledPast = window.scrollY < imageBottom;

    if (isHalfShown) {
      sliderImage.classList.add("show");
      const svgPaths = sliderImage.querySelectorAll("svg path");
      app.drawSVG(svgPaths);
    } else {
      // sliderImage.classList.remove('active');
    }
  });
};

app.drawSVG = paths => {
  paths.forEach(path => {
    if (!path.classList.contains("active")) {
      const length = path.getTotalLength();
      path.classList.add("active");
      gsap.set(path, { strokeDasharray: length });
      gsap.fromTo(path, 5, { strokeDashoffset: length }, { strokeDashoffset: 0 });
    }
  });
};

app.getElementHeight = element => {
  const rect = element.getBoundingClientRect();
  return rect.height;
};

app.getOffsetTop = element => {
  let offsetTop = 0;
  while (element) {
    offsetTop += element.offsetTop;
    element = element.offsetParent;
  }
  return offsetTop;
};

app.init = () => {
  app.shadowAnimation();
  app.scrollAnimation();
  app.hamburger();
  app.smoothScroll();

  const headerSvgPaths = document.querySelectorAll("header path");
  app.drawSVG(headerSvgPaths);

  window.addEventListener("scroll", app.debounce(app.isElementShown));
};

app.init();

import '../styles/style.scss';
import gsap from 'gsap';

const pathArray = document.querySelectorAll('path');

// gsap.set(path, { strokeDasharray: 400, strokeDashoffset: 205 });

// gsap.fromTo(path, 3, { strokeDashoffset: 205 }, { strokeDashoffset: 0 });

// TweenMax.set(path, { strokeDasharray: l });
// TweenMax.fromTo(path, 3, { strokeDashoffset: l }, { strokeDashoffset: 0 });
pathArray.forEach(path => {
  console.log(path);
  const l = path.getTotalLength();

  gsap.set(path, { strokeDasharray: l });

  gsap.fromTo(path, 10, { strokeDashoffset: l }, { strokeDashoffset: 0 });
});

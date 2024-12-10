import {bindScrollToLinks} from './scroll.js';
import {setupMobileMenu} from './mobileMenu.js';

bindScrollToLinks();
setupMobileMenu();

document.querySelectorAll('.form__agree-figure').forEach((figure) => {
  figure.addEventListener('click', () => {
    if (figure.classList.contains('active')) {
      figure.classList.remove('active');
      figure.classList.add('error');
    } else if (figure.classList.contains('error')) {
      figure.classList.remove('error');
      figure.classList.add('active');
    }
  });
});

const slider = document.querySelector('.steps__list');
let isDown = false;
let startX;
let scrollLeft;

const deactivate = () => {
  isDown = false;
  slider.classList.remove('active');
};

slider.addEventListener('mousedown', (e) => {
  isDown = true;
  slider.classList.add('active');
  startX = e.pageX - slider.offsetLeft;
  scrollLeft = slider.scrollLeft;
});

slider.addEventListener('mouseleave', deactivate);
slider.addEventListener('mouseup', deactivate);

slider.addEventListener('mousemove', (e) => {
  if (!isDown) return;
  e.preventDefault();
  const x = e.pageX - slider.offsetLeft;
  const walk = (x - startX);
  slider.scrollLeft = scrollLeft - walk;
});
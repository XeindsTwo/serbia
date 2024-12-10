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
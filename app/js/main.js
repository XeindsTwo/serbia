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

document.querySelector('.form__form').addEventListener('submit', function (event) {
  event.preventDefault();

  const formData = new FormData(this);

  fetch('php/form.php', {
    method: 'POST',
    body: formData
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Сетевая ошибка');
      }
      return response.json();
    })
    .then(data => {
      if (data.success) {
        document.cookie = "redirected=true; path=/; max-age=3600";
        window.location.href = '/thanks';
      } else {
        document.getElementById('responseMessage').innerText = 'Произошла ошибка при отправке заявки.';
      }
    })
    .catch(error => {
      document.getElementById('responseMessage').innerText = 'Произошла ошибка: ' + error.message;
    });
});

const modal = document.querySelector('.modal');
modal.addEventListener('click', function (event) {
  if (
    event.target.classList.contains('modal__close') ||
    event.target.classList.contains('modal__btn')
  ) {
    closeModal(modal);
  }
});

document.addEventListener('keydown', function handleEsc(event) {
  if (event.key === 'Escape') {
    closeModal(modal);
  }
});

function closeModal(modal) {
  modal.classList.remove('active');
  document.body.classList.remove('active');
  document.documentElement.classList.remove('active');

  const focusableElements = document.querySelectorAll('[tabindex]');
  focusableElements.forEach(element => {
    element.removeAttribute('tabindex');
  });
}

window.addEventListener('DOMContentLoaded', () => {
  const button = document.querySelector('.info__btn');
  const list = document.querySelector('.info__list');

  const randomTime = Math.random() * (15000 - 10000) + 10000;

  setTimeout(() => {
    button.classList.add('active');
  }, randomTime);

  button.addEventListener('click', () => {
    if (button.classList.contains('active')) {
      list.classList.toggle('active');
    }
  });

  document.addEventListener('click', (event) => {
    if (!list.contains(event.target) && !button.contains(event.target)) {
      list.classList.remove('active');
    }
  });
});

new Swiper('.layout__swiper', {
  slidesPerView: 1,
  slidesPerGroup: 1,
  speed: 800,
  spaceBetween: 30,
  autoHeight: true,
  navigation: {
    prevEl: '.layout__btn--prev',
    nextEl: '.layout__btn--next'
  }
});

Fancybox.bind('[data-fancybox="gallery-1"]');
Fancybox.bind('[data-fancybox="gallery-2"]');
Fancybox.bind('[data-fancybox="gallery-3"]');
Fancybox.bind('[data-fancybox="gallery-4"]');
Fancybox.bind('[data-fancybox="gallery-5"]');
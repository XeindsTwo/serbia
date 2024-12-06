import {bindScrollToLinks} from './scroll.js';
import {setupMobileMenu} from './mobileMenu.js';

bindScrollToLinks();
setupMobileMenu();

document.addEventListener('DOMContentLoaded', function() {
  const serviceButtons = document.querySelectorAll('[data-service-btn]');
  const serviceBodies = document.querySelectorAll('.services__body');

  serviceBodies.forEach(serviceBody => {
    if (serviceBody.classList.contains('services__body--active')) {
      updateTabIndexes(serviceBody, false);
      serviceBody.style.maxHeight = serviceBody.scrollHeight + 'px';
    } else {
      updateTabIndexes(serviceBody, true);
    }
  });

  serviceButtons.forEach(button => {
    button.addEventListener('click', function() {
      const serviceBody = this.nextElementSibling;

      document.querySelectorAll('.services__body').forEach((body, index) => {
        const relatedButton = serviceButtons[index];
        if (body !== serviceBody) {
          body.style.maxHeight = '0px';
          body.classList.remove('services__body--active');
          updateTabIndexes(body, true);
          if (relatedButton) {
            relatedButton.classList.remove('active');
          }
        }
      });

      if (serviceBody.classList.contains('services__body--active')) {
        serviceBody.style.maxHeight = '0px';
        serviceBody.classList.remove('services__body--active');
        updateTabIndexes(serviceBody, true);
        this.classList.remove('active');
      } else {
        serviceBody.style.maxHeight = serviceBody.scrollHeight + 'px';
        serviceBody.classList.add('services__body--active');
        updateTabIndexes(serviceBody, false);
        this.classList.add('active');
      }
    });
  });

  function updateTabIndexes(container, isHidden) {
    const focusableElements = container.querySelectorAll('a, button, input, [tabindex]');
    focusableElements.forEach(el => {
      if (isHidden) {
        el.setAttribute('tabindex', '-1');
      } else {
        el.removeAttribute('tabindex');
      }
    });
  }
});

document.addEventListener('DOMContentLoaded', function() {
  const serviceButtons = document.querySelectorAll('[data-price-btn]');
  const serviceBodies = document.querySelectorAll('.prices__body');

  serviceBodies.forEach(serviceBody => {
    if (serviceBody.classList.contains('prices__body--active')) {
      updateTabIndexes(serviceBody, false);
      serviceBody.style.maxHeight = serviceBody.scrollHeight + 'px';
    } else {
      updateTabIndexes(serviceBody, true);
    }
  });

  serviceButtons.forEach(button => {
    button.addEventListener('click', function() {
      const serviceBody = this.nextElementSibling;

      document.querySelectorAll('.prices__body').forEach((body, index) => {
        const relatedButton = serviceButtons[index];
        if (body !== serviceBody) {
          body.style.maxHeight = '0px';
          body.classList.remove('prices__body--active');
          updateTabIndexes(body, true);
          if (relatedButton) {
            relatedButton.classList.remove('active');
          }
        }
      });

      if (serviceBody.classList.contains('prices__body--active')) {
        serviceBody.style.maxHeight = '0px';
        serviceBody.classList.remove('prices__body--active');
        updateTabIndexes(serviceBody, true);
        this.classList.remove('active');
      } else {
        serviceBody.style.maxHeight = serviceBody.scrollHeight + 'px';
        serviceBody.classList.add('prices__body--active');
        updateTabIndexes(serviceBody, false);
        this.classList.add('active');
      }
    });
  });

  function updateTabIndexes(container, isHidden) {
    const focusableElements = container.querySelectorAll('a, button, input, [tabindex]');
    focusableElements.forEach(el => {
      if (isHidden) {
        el.setAttribute('tabindex', '-1');
      } else {
        el.removeAttribute('tabindex');
      }
    });
  }
});

new Swiper('.swiper', {
  speed: 600,
  autoHeight: true,
  pagination: {
    el: '.swiper-pagination',
    type: 'bullets',
  },
  navigation: {
    prevEl: '.reviews__btn--prev',
    nextEl: '.reviews__btn--next'
  },
  keyboard: {
    enabled: true
  },
  breakpoints: {
    1210: {
      slidesPerView: 3,
      slidesPerGroup: 1,
      spaceBetween: 23,
    },
    712: {
      slidesPerView: 2,
      slidesPerGroup: 1,
      spaceBetween: 12
    },
    310: {
      slidesPerView: 1,
      slidesPerGroup: 1,
      spaceBetween: 12
    },
  }
})

document.querySelector('.contacts__form').addEventListener('submit', function (event) {
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

Fancybox.bind("[data-fancybox]", {});
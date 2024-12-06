export function scrollToSection(event) {
  event.preventDefault();
  const targetId = event.target.getAttribute('href').slice(1);
  const targetElement = document.getElementById(targetId);

  let targetOffset;

  if (targetId === 'indicators' || targetId === 'guarantees') {
    targetOffset = targetElement.offsetTop;
  } else {
    targetOffset = targetElement.offsetTop - 30;
  }

  window.scrollTo({ top: targetOffset, behavior: 'smooth' });
}

export function bindScrollToLinks() {
  const menuLinks = document.querySelectorAll('.desktop');

  menuLinks.forEach((menuLink) => {
    menuLink.addEventListener('click', scrollToSection);
  });
}
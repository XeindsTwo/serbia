export function scrollToSection(event) {
  event.preventDefault();
  const targetId = event.currentTarget.getAttribute('href').slice(1);
  const targetElement = document.getElementById(targetId);

  if (!targetElement) return;

  let targetOffset = targetId === 'serbia' ? targetElement.offsetTop : targetElement.offsetTop - 30;

  window.scrollTo({ top: targetOffset, behavior: 'smooth' });
}

export function bindScrollToLinks() {
  const menuLinks = document.querySelectorAll('.desktop');

  menuLinks.forEach((menuLink) => {
    menuLink.addEventListener('click', scrollToSection);
  });
}
export function setupMobileMenu() {
  const html = document.documentElement;
  const body = document.body;
  const menuBtn = document.querySelector('.menu-btn');
  const headerMobile = document.querySelector('.header__mobile');
  const headerInner = document.querySelector('.header__inner');
  const anchors = document.querySelectorAll('a.mobile');
  const allInteractiveElements = document.querySelectorAll('a, button, input, select, textarea');

  function updateTabIndex(isMenuActive) {
    for (const element of allInteractiveElements) {
      if (headerMobile.contains(element) || headerInner.contains(element)) {
        element.tabIndex = isMenuActive ? 1 : 0;
      } else {
        element.tabIndex = isMenuActive ? -1 : 0;
      }
    }
  }

  menuBtn.addEventListener('click', () => {
    menuBtn.blur();
    const isMenuActive = !html.classList.contains('active');
    html.classList.toggle('active', isMenuActive);
    body.classList.toggle('active', isMenuActive);
    menuBtn.classList.toggle('active', isMenuActive);
    headerMobile.classList.toggle('active', isMenuActive);
    updateTabIndex(isMenuActive);
  });

  function scrollToTarget(targetId) {
    const targetSection = document.querySelector(targetId);
    if (targetSection) {
      html.classList.remove('active');
      body.classList.remove('active');
      headerMobile.classList.remove('active');
      menuBtn.classList.remove('active');
      updateTabIndex(false);

      setTimeout(() => {
        let targetOffset;

        if (targetId === '#serbia') {
          targetOffset = targetSection.getBoundingClientRect().top + window.pageYOffset;
        } else {
          targetOffset = targetSection.offsetTop - 34;
        }

        window.scrollTo({ top: targetOffset, behavior: 'smooth' });
      }, 700);
    }
  }

  function handleAnchorClick(event) {
    event.preventDefault();
    const href = this.getAttribute('href');
    const hrefParts = href.split('#');
    if (hrefParts.length === 2) {
      const targetId = '#' + hrefParts[1];
      scrollToTarget(targetId);
    }
  }

  for (const anchor of anchors) {
    anchor.addEventListener('click', handleAnchorClick);
    anchor.addEventListener('touchstart', handleAnchorClick, {passive: true});
  }
}
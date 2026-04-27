const nav = document.getElementById('main-nav');
const hamburger = nav.querySelector('.nav-hamburger');

// 모바일 메뉴 DOM 생성
const mobileMenu = document.createElement('ul');
mobileMenu.className = 'nav-mobile-menu';
const links = nav.querySelectorAll('.nav-links a');
links.forEach(link => {
  const li = document.createElement('li');
  li.innerHTML = `<a href="${link.href}">${link.textContent}</a>`;
  li.querySelector('a').addEventListener('click', closeMenu);
  mobileMenu.appendChild(li);
});
nav.appendChild(mobileMenu);

// 스크롤 시 nav 스타일 전환
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 50);
});

// 햄버거 토글
hamburger.addEventListener('click', () => {
  const isOpen = mobileMenu.classList.toggle('open');
  hamburger.classList.toggle('open', isOpen);
  hamburger.setAttribute('aria-expanded', isOpen);
});

function closeMenu() {
  mobileMenu.classList.remove('open');
  hamburger.classList.remove('open');
  hamburger.setAttribute('aria-expanded', false);
}

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

// CONFIG로 contact 섹션 채우기
document.getElementById('contact-phone').href = `tel:${CONFIG.phone.replace(/-/g, '')}`;
document.getElementById('contact-phone').textContent = CONFIG.phone;

// 카카오 채널: URL 있을 때만 카드 표시
const kakaoCard = document.getElementById('kakao-card');
if (CONFIG.kakaoChannelUrl) {
  document.getElementById('kakao-link').href = CONFIG.kakaoChannelUrl;
} else {
  kakaoCard.style.display = 'none';
}

// 인스타그램: URL 있을 때만 갤러리 더보기 버튼 표시
const instaBtn = document.querySelector('.btn-instagram');
if (instaBtn) {
  if (CONFIG.instagramUrl) {
    instaBtn.href = CONFIG.instagramUrl;
  } else {
    instaBtn.style.display = 'none';
  }
}

// 영업시간 테이블 렌더링
const hoursTable = document.getElementById('hours-table');
hoursTable.innerHTML = CONFIG.hours.map(h => `
  <tr>
    <td>${h.day}</td>
    <td>${h.time}${h.note ? `<br><small>${h.note}</small>` : ''}</td>
  </tr>
`).join('');

document.querySelector('.copy-address')?.addEventListener('click', function() {
  navigator.clipboard.writeText(this.dataset.address).then(() => {
    this.textContent = '복사됨 ✓';
    this.classList.add('copied');
    setTimeout(() => {
      this.textContent = '주소 복사';
      this.classList.remove('copied');
    }, 2000);
  });
});

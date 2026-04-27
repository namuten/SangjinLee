# 가오본갈비 홈페이지 구현 계획서

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 대전 가오본갈비의 반응형 싱글 페이지 공식 홈페이지를 구현한다.

**Architecture:** 순수 HTML/CSS/JS 정적 사이트. 6개의 풀스크린/섹션 구조로 스크롤 시 앵커 이동. 모바일 우선(Mobile First) 반응형으로 768px/1024px 브레이크포인트를 기준으로 레이아웃이 전환된다.

**Tech Stack:** HTML5, CSS3 (Custom Properties + Grid + Flexbox), Vanilla JS (Intersection Observer), 카카오맵 SDK, Google Fonts (Noto Serif KR + Noto Sans KR)

---

## 이미지 소스

블로그 스크린샷 3장을 크롭해서 사용한다. 원본 파일 위치: `blogContent/`

| 용도 | 크롭 대상 | 저장 경로 |
|------|-----------|-----------|
| Hero 배경 | 세 블로그 중 가장 선명한 갈비 클로즈업 사진 | `assets/images/hero.jpg` |
| 스토리 섹션 | 인테리어/홀 전경 사진 | `assets/images/story.jpg` |
| 메뉴 카드 - 본갈비 | 갈비 그릴 사진 | `assets/images/menu-galbi.jpg` |
| 메뉴 카드 - 냉면 | 냉면 사진 | `assets/images/menu-naengmyeon.jpg` |
| 갤러리 1~6 | 음식·인테리어 사진 순서대로 | `assets/images/gallery-1.jpg` ~ `gallery-6.jpg` |

크롭 방법: macOS 미리보기 앱에서 열어 원하는 영역 선택 → 도구 → 자르기 → 저장.
이미지가 저해상도인 경우 `object-fit: cover`로 자동 처리되므로 크기는 무관.

---

## 나중에 수정할 항목 (CONFIG)

`js/config.js` 파일 하나에 모아서 관리. 나중에 이 파일만 열어서 수정하면 된다.

```js
// js/config.js — 나중에 수정할 항목만 모아놓은 파일
const CONFIG = {
  phone: '0507-1465-3581',

  // 카카오톡 채널 개설 후 URL 입력 (현재 비활성)
  kakaoChannelUrl: '',

  // 인스타그램 계정 개설 후 URL 입력 (현재 비활성)
  instagramUrl: '',
};
```

카카오/인스타 URL이 비어있으면 해당 버튼을 자동으로 숨기고, 입력되면 자동으로 표시된다.

---

## 파일 구조

```
gaobon-galbi/
├── index.html
├── js/
│   ├── config.js          # ★ 나중에 수정할 항목만 모아놓은 설정 파일
│   ├── nav.js
│   ├── animation.js
│   └── menu-tab.js
├── css/
│   ├── reset.css          # CSS 리셋
│   ├── variables.css      # 디자인 토큰 (색상, 폰트, 간격)
│   ├── layout.css         # 섹션 공통 레이아웃
│   ├── nav.css            # 네비게이션 + 햄버거 메뉴
│   ├── hero.css           # Hero 섹션
│   ├── story.css          # 스토리 섹션
│   ├── menu.css           # 메뉴 섹션
│   ├── gallery.css        # 갤러리 섹션
│   ├── contact.css        # 예약/문의 섹션
│   ├── map.css            # 오시는 길 섹션
│   ├── footer.css         # 푸터
│   └── responsive.css     # 미디어쿼리 모음
├── js/
│   ├── nav.js             # 모바일 햄버거 메뉴, 스크롤 시 nav 스타일 변경
│   ├── animation.js       # Intersection Observer 스크롤 페이드인
│   └── menu-tab.js        # 메뉴 카테고리 탭 전환
├── data/
│   └── menu.json          # 메뉴 데이터
└── assets/
    └── images/            # 음식·인테리어 사진 (사장님 제공)
```

---

## Task 0: CONFIG 파일 생성

**Files:**
- Create: `js/config.js`
- Modify: `data/menu.json`

이 파일들만 수정하면 사이트 전체 내용이 바뀐다. 코드를 몰라도 된다.

- [ ] **Step 1: js/config.js 작성**

```js
// ============================================================
// CONFIG.js — 나중에 수정할 내용은 여기서만 바꾸면 됩니다
// ============================================================

const CONFIG = {
  // ── 기본 정보 ──────────────────────────────────────────
  restaurantName: '가오본갈비',
  phone: '0507-1465-3581',
  address: '대전 동구 대전로448번길 52-4 1층',
  addressJibun: '대전 동구 가오동 590',

  // ── 영업시간 ──────────────────────────────────────────
  hours: [
    { day: '평일', time: '11:30 — 22:00', note: '' },
    { day: '주말', time: '11:30 — 22:00', note: '브레이크 15:00 — 17:00' },
    { day: '라스트오더', time: '21:30', note: '' },
  ],

  // ── SNS / 예약 ─────────────────────────────────────────
  // 카카오톡 채널 개설 후 URL 입력. 비워두면 버튼이 자동으로 숨겨짐.
  kakaoChannelUrl: '',

  // 인스타그램 계정 URL 입력. 비워두면 버튼이 자동으로 숨겨짐.
  instagramUrl: '',

  // ── 지도 ───────────────────────────────────────────────
  mapAddress: '대전광역시 동구 대전로448번길 52-4',

  // ── 기타 ───────────────────────────────────────────────
  slogan: '제대로 된 한 점,\n일부러 찾아오게 되는 맛',
  heroSubLabel: '대전 동구 가오동',
};
```

- [ ] **Step 2: config.js를 index.html에서 제일 먼저 로드**

`index.html` `</body>` 직전 스크립트 순서:

```html
  <script src="js/config.js"></script>  <!-- 반드시 첫 번째 -->
  <script src="js/nav.js"></script>
  <script src="js/animation.js"></script>
  <script src="js/menu-tab.js"></script>
```

- [ ] **Step 3: data/menu.json 작성 — 메뉴 수정 가이드 주석 포함**

```json
{
  "_guide": "메뉴 추가/수정은 items 배열에서 합니다. price가 비어있으면 '가격 문의'로 표시됩니다.",
  "categories": [
    { "id": "galbi",  "label": "갈비류" },
    { "id": "side",   "label": "추가메뉴" },
    { "id": "drink",  "label": "주류" }
  ],
  "items": [
    {
      "category": "galbi",
      "name": "수제 본갈비",
      "desc": "두툼하게 손질한 대표 갈비. 육즙이 살아있는 한 점.",
      "price": "16,000",
      "unit": "1인분",
      "image": "assets/images/menu-galbi.jpg",
      "featured": true
    },
    {
      "category": "side",
      "name": "냉면",
      "desc": "식사 마무리용 시원한 냉면.",
      "price": "",
      "unit": "",
      "image": "assets/images/menu-naengmyeon.jpg",
      "featured": false
    },
    {
      "category": "side",
      "name": "공기밥",
      "desc": "",
      "price": "",
      "unit": "",
      "image": "",
      "featured": false
    }
  ]
}
```

- [ ] **Step 4: 커밋**

```bash
git add js/config.js data/menu.json
git commit -m "chore: config file and menu data"
```

---

## Task 1: 프로젝트 초기 세팅 + 디자인 토큰

**Files:**
- Create: `index.html`
- Create: `css/reset.css`
- Create: `css/variables.css`

- [ ] **Step 1: index.html 기본 뼈대 작성**

```html
<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>가오본갈비 | 대전 갈비 맛집</title>
  <meta name="description" content="대전 동구 가오동 대표 갈비집, 가오본갈비. 두툼한 수제 본갈비와 특별한 공간에서 특별한 한 끼를." />

  <!-- OG 태그 -->
  <meta property="og:title" content="가오본갈비 | 대전 갈비 맛집" />
  <meta property="og:description" content="대전 동구 가오동 대표 갈비집, 가오본갈비." />
  <meta property="og:image" content="assets/images/og-thumbnail.jpg" />
  <meta property="og:type" content="restaurant" />

  <!-- 폰트 -->
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link href="https://fonts.googleapis.com/css2?family=Noto+Serif+KR:wght@400;700&family=Noto+Sans+KR:wght@300;400;500&display=swap" rel="stylesheet" />

  <!-- CSS -->
  <link rel="stylesheet" href="css/reset.css" />
  <link rel="stylesheet" href="css/variables.css" />
  <link rel="stylesheet" href="css/layout.css" />
  <link rel="stylesheet" href="css/nav.css" />
  <link rel="stylesheet" href="css/hero.css" />
  <link rel="stylesheet" href="css/story.css" />
  <link rel="stylesheet" href="css/menu.css" />
  <link rel="stylesheet" href="css/gallery.css" />
  <link rel="stylesheet" href="css/contact.css" />
  <link rel="stylesheet" href="css/map.css" />
  <link rel="stylesheet" href="css/footer.css" />
  <link rel="stylesheet" href="css/responsive.css" />
</head>
<body>
  <!-- 네비게이션 -->
  <nav id="main-nav"><!-- Task 2 --></nav>

  <!-- 섹션 1: Hero -->
  <section id="hero"><!-- Task 3 --></section>

  <!-- 섹션 2: 스토리 -->
  <section id="story"><!-- Task 4 --></section>

  <!-- 섹션 3: 메뉴 -->
  <section id="menu"><!-- Task 5 --></section>

  <!-- 섹션 4: 갤러리 -->
  <section id="gallery"><!-- Task 6 --></section>

  <!-- 섹션 5: 예약/문의 -->
  <section id="contact"><!-- Task 7 --></section>

  <!-- 섹션 6: 오시는 길 -->
  <section id="map-section"><!-- Task 8 --></section>

  <!-- 푸터 -->
  <footer id="footer"><!-- Task 9 --></footer>

  <!-- JS -->
  <script src="js/nav.js"></script>
  <script src="js/animation.js"></script>
  <script src="js/menu-tab.js"></script>
</body>
</html>
```

- [ ] **Step 2: reset.css 작성**

```css
*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  scroll-behavior: smooth;
  font-size: 16px;
}

body {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

img {
  max-width: 100%;
  display: block;
}

a {
  text-decoration: none;
  color: inherit;
}

ul, ol {
  list-style: none;
}

button {
  cursor: pointer;
  border: none;
  background: none;
  font-family: inherit;
}
```

- [ ] **Step 3: variables.css — 디자인 토큰 정의**

```css
:root {
  /* 색상 */
  --color-bg: #FFFFFF;
  --color-text-primary: #1A1A1A;
  --color-text-secondary: #555555;
  --color-text-light: #888888;
  --color-accent: #C8922A;       /* 앰버/골드 — 갈비 색감 */
  --color-accent-dark: #A6741E;
  --color-hero-overlay: rgba(0, 0, 0, 0.45);
  --color-section-alt: #F8F6F3;  /* 짝수 섹션 배경 — 아이보리 */
  --color-border: #E8E4DE;
  --color-nav-bg: rgba(255, 255, 255, 0.95);

  /* 폰트 */
  --font-serif: 'Noto Serif KR', serif;
  --font-sans: 'Noto Sans KR', sans-serif;

  /* 간격 */
  --space-xs: 0.5rem;
  --space-sm: 1rem;
  --space-md: 2rem;
  --space-lg: 4rem;
  --space-xl: 6rem;

  /* 섹션 패딩 */
  --section-padding: 5rem 1.5rem;
  --section-padding-mobile: 3.5rem 1.25rem;

  /* 최대 너비 */
  --max-width: 1100px;

  /* 전환 */
  --transition: 0.3s ease;

  /* 그림자 */
  --shadow-card: 0 4px 20px rgba(0, 0, 0, 0.08);
  --shadow-card-hover: 0 8px 32px rgba(0, 0, 0, 0.14);
}
```

- [ ] **Step 4: layout.css — 공통 레이아웃 유틸리티**

```css
.container {
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 0 1.5rem;
}

section {
  padding: var(--section-padding);
}

.section-label {
  font-family: var(--font-sans);
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--color-accent);
  margin-bottom: 0.75rem;
}

.section-title {
  font-family: var(--font-serif);
  font-size: clamp(1.75rem, 4vw, 2.5rem);
  font-weight: 700;
  color: var(--color-text-primary);
  line-height: 1.3;
  margin-bottom: 1.25rem;
}

.section-desc {
  font-family: var(--font-sans);
  font-size: 1rem;
  font-weight: 300;
  color: var(--color-text-secondary);
  line-height: 1.8;
  max-width: 540px;
}

/* 스크롤 페이드인 초기 상태 */
.fade-in {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.7s ease, transform 0.7s ease;
}

.fade-in.visible {
  opacity: 1;
  transform: translateY(0);
}
```

- [ ] **Step 5: 브라우저에서 index.html 열어 폰트·기본 레이아웃 확인**

기대: 빈 흰 화면에 구글 폰트가 로드되고 콘솔 에러 없음.

- [ ] **Step 6: 커밋**

```bash
git add index.html css/reset.css css/variables.css css/layout.css
git commit -m "chore: project scaffold and design tokens"
```

---

## Task 2: 네비게이션 바

**Files:**
- Modify: `index.html` — `<nav>` 섹션 채우기
- Create: `css/nav.css`
- Create: `js/nav.js`

- [ ] **Step 1: nav HTML 작성**

`index.html`의 `<nav id="main-nav">` 를 아래로 교체:

```html
<nav id="main-nav">
  <div class="nav-container">
    <a href="#hero" class="nav-logo">가오본갈비</a>
    <ul class="nav-links">
      <li><a href="#menu">메뉴</a></li>
      <li><a href="#story">스토리</a></li>
      <li><a href="#gallery">갤러리</a></li>
      <li><a href="#contact">예약문의</a></li>
      <li><a href="#map-section">오시는길</a></li>
    </ul>
    <button class="nav-hamburger" aria-label="메뉴 열기" aria-expanded="false">
      <span></span>
      <span></span>
      <span></span>
    </button>
  </div>
</nav>
```

- [ ] **Step 2: nav.css 작성**

```css
#main-nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: transparent;
  transition: background var(--transition), box-shadow var(--transition);
}

#main-nav.scrolled {
  background: var(--color-nav-bg);
  box-shadow: 0 1px 12px rgba(0,0,0,0.08);
  backdrop-filter: blur(8px);
}

.nav-container {
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 0 1.5rem;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.nav-logo {
  font-family: var(--font-serif);
  font-size: 1.2rem;
  font-weight: 700;
  color: #fff;
  transition: color var(--transition);
}

#main-nav.scrolled .nav-logo {
  color: var(--color-text-primary);
}

.nav-links {
  display: flex;
  gap: 2rem;
}

.nav-links a {
  font-family: var(--font-sans);
  font-size: 0.9rem;
  font-weight: 400;
  color: rgba(255,255,255,0.9);
  transition: color var(--transition);
  position: relative;
}

.nav-links a::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 0;
  width: 0;
  height: 1px;
  background: var(--color-accent);
  transition: width var(--transition);
}

.nav-links a:hover::after {
  width: 100%;
}

#main-nav.scrolled .nav-links a {
  color: var(--color-text-primary);
}

/* 햄버거 버튼 — 모바일에서만 보임 */
.nav-hamburger {
  display: none;
  flex-direction: column;
  gap: 5px;
  padding: 4px;
}

.nav-hamburger span {
  display: block;
  width: 24px;
  height: 2px;
  background: #fff;
  transition: transform var(--transition), opacity var(--transition);
}

#main-nav.scrolled .nav-hamburger span {
  background: var(--color-text-primary);
}

.nav-hamburger.open span:nth-child(1) {
  transform: translateY(7px) rotate(45deg);
}
.nav-hamburger.open span:nth-child(2) {
  opacity: 0;
}
.nav-hamburger.open span:nth-child(3) {
  transform: translateY(-7px) rotate(-45deg);
}

/* 모바일 드롭다운 */
.nav-mobile-menu {
  display: none;
  position: absolute;
  top: 64px;
  left: 0;
  right: 0;
  background: var(--color-nav-bg);
  backdrop-filter: blur(8px);
  padding: 1rem 1.5rem 1.5rem;
  box-shadow: 0 8px 24px rgba(0,0,0,0.1);
}

.nav-mobile-menu.open {
  display: block;
}

.nav-mobile-menu li {
  border-bottom: 1px solid var(--color-border);
}

.nav-mobile-menu a {
  display: block;
  padding: 0.9rem 0;
  font-family: var(--font-sans);
  font-size: 1rem;
  color: var(--color-text-primary);
}
```

- [ ] **Step 3: nav.js 작성**

```js
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
```

- [ ] **Step 4: 브라우저에서 네비게이션 확인**

확인 항목:
- 상단에 투명 nav 노출
- 스크롤 50px 이상 시 흰 배경으로 전환
- 모바일 너비(375px)에서 햄버거 버튼 노출, 클릭 시 메뉴 열림
- 각 링크 클릭 시 해당 섹션으로 스크롤 이동

- [ ] **Step 5: 커밋**

```bash
git add index.html css/nav.css js/nav.js
git commit -m "feat: sticky navigation with mobile hamburger menu"
```

---

## Task 3: Hero 섹션

**Files:**
- Modify: `index.html` — `<section id="hero">` 채우기
- Create: `css/hero.css`

**디자인 의도:** 풀스크린 고기 사진 위에 다크 오버레이, 중앙에 식당명과 슬로건, 하단에 CTA 버튼. 스크롤 힌트 애니메이션 포함.

- [ ] **Step 1: Hero HTML 작성**

`index.html`의 `<section id="hero">` 를 아래로 교체:

```html
<section id="hero">
  <div class="hero-bg">
    <img src="assets/images/hero.jpg" alt="가오본갈비 대표 갈비 사진" />
  </div>
  <div class="hero-overlay"></div>
  <div class="hero-content">
    <p class="hero-label">대전 동구 가오동</p>
    <h1 class="hero-title">가오본갈비</h1>
    <p class="hero-slogan">제대로 된 한 점,<br />일부러 찾아오게 되는 맛</p>
    <div class="hero-actions">
      <a href="tel:05071465381" class="btn btn-primary">전화 예약</a>
      <a href="#menu" class="btn btn-outline">메뉴 보기</a>
    </div>
  </div>
  <div class="hero-scroll-hint">
    <span>스크롤</span>
    <div class="scroll-line"></div>
  </div>
</section>
```

- [ ] **Step 2: hero.css 작성**

```css
#hero {
  position: relative;
  width: 100%;
  height: 100svh;
  min-height: 600px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  padding: 0;
}

.hero-bg {
  position: absolute;
  inset: 0;
  z-index: 0;
}

.hero-bg img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  transform: scale(1.05);
  transition: transform 8s ease;
}

#hero.loaded .hero-bg img {
  transform: scale(1);
}

.hero-overlay {
  position: absolute;
  inset: 0;
  background: var(--color-hero-overlay);
  z-index: 1;
}

.hero-content {
  position: relative;
  z-index: 2;
  text-align: center;
  color: #fff;
  padding: 0 1.5rem;
}

.hero-label {
  font-family: var(--font-sans);
  font-size: 0.8rem;
  font-weight: 400;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--color-accent);
  margin-bottom: 1rem;
}

.hero-title {
  font-family: var(--font-serif);
  font-size: clamp(2.5rem, 8vw, 5.5rem);
  font-weight: 700;
  letter-spacing: -0.01em;
  line-height: 1.1;
  margin-bottom: 1.25rem;
}

.hero-slogan {
  font-family: var(--font-sans);
  font-size: clamp(1rem, 2.5vw, 1.25rem);
  font-weight: 300;
  line-height: 1.8;
  color: rgba(255,255,255,0.85);
  margin-bottom: 2.5rem;
}

.hero-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

/* 버튼 공통 */
.btn {
  font-family: var(--font-sans);
  font-size: 0.9rem;
  font-weight: 500;
  letter-spacing: 0.05em;
  padding: 0.85rem 2rem;
  border-radius: 2px;
  transition: all var(--transition);
  display: inline-block;
}

.btn-primary {
  background: var(--color-accent);
  color: #fff;
}

.btn-primary:hover {
  background: var(--color-accent-dark);
  transform: translateY(-2px);
}

.btn-outline {
  border: 1px solid rgba(255,255,255,0.7);
  color: #fff;
}

.btn-outline:hover {
  background: rgba(255,255,255,0.1);
  transform: translateY(-2px);
}

/* 스크롤 힌트 */
.hero-scroll-hint {
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  color: rgba(255,255,255,0.6);
  font-family: var(--font-sans);
  font-size: 0.7rem;
  letter-spacing: 0.1em;
}

.scroll-line {
  width: 1px;
  height: 40px;
  background: rgba(255,255,255,0.4);
  animation: scrollDown 1.5s ease infinite;
}

@keyframes scrollDown {
  0% { transform: scaleY(0); transform-origin: top; }
  50% { transform: scaleY(1); transform-origin: top; }
  51% { transform: scaleY(1); transform-origin: bottom; }
  100% { transform: scaleY(0); transform-origin: bottom; }
}
```

- [ ] **Step 3: animation.js에 Hero 로딩 효과 추가**

```js
// js/animation.js
window.addEventListener('load', () => {
  document.getElementById('hero').classList.add('loaded');
});

// 스크롤 페이드인 (Intersection Observer)
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
```

- [ ] **Step 4: 브라우저에서 Hero 확인**

확인 항목:
- 풀스크린으로 사진이 꽉 채워짐
- 다크 오버레이 위로 텍스트가 선명하게 보임
- 페이지 로드 시 이미지 줌인 → 줌아웃 애니메이션
- 스크롤 힌트 위아래 애니메이션
- 모바일에서 버튼이 세로로 쌓이지 않고 wrap

> **이미지 없을 경우:** `assets/images/hero.jpg` 대신 CSS로 그라데이션 배경 임시 적용
> ```css
> .hero-bg { background: linear-gradient(135deg, #2C1810 0%, #8B4513 100%); }
> ```

- [ ] **Step 5: 커밋**

```bash
git add index.html css/hero.css js/animation.js
git commit -m "feat: fullscreen hero section with scroll animation"
```

---

## Task 4: 스토리 섹션

**Files:**
- Modify: `index.html` — `<section id="story">` 채우기
- Create: `css/story.css`

- [ ] **Step 1: Story HTML 작성**

```html
<section id="story">
  <div class="container">
    <div class="story-grid">
      <div class="story-text fade-in">
        <p class="section-label">Our Story</p>
        <h2 class="section-title">고기 본연의 맛,<br />가오본갈비</h2>
        <p class="section-desc">
          대전 가오동에서 시작한 가오본갈비는 고기 품질에 대한 고집 하나로
          손님들이 먼저 찾아오는 갈비집이 되었습니다.
          엄선한 부위, 수제로 손질한 갈비, 그리고 넉넉한 반찬—
          특별한 날의 기억이 되는 한 끼를 대접합니다.
        </p>
        <div class="story-highlights">
          <div class="highlight-item">
            <span class="highlight-num">100<small>%</small></span>
            <span class="highlight-label">국내산 고기</span>
          </div>
          <div class="highlight-item">
            <span class="highlight-num">수제</span>
            <span class="highlight-label">직접 손질한 갈비</span>
          </div>
          <div class="highlight-item">
            <span class="highlight-num">넉넉</span>
            <span class="highlight-label">풍성한 기본 반찬</span>
          </div>
        </div>
      </div>
      <div class="story-image fade-in">
        <img src="assets/images/story.jpg" alt="가오본갈비 내부 공간" />
      </div>
    </div>
  </div>
</section>
```

- [ ] **Step 2: story.css 작성**

```css
#story {
  background: var(--color-bg);
}

.story-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 5rem;
  align-items: center;
}

.story-text .section-desc {
  margin-bottom: 2.5rem;
}

.story-highlights {
  display: flex;
  gap: 2rem;
}

.highlight-item {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.highlight-num {
  font-family: var(--font-serif);
  font-size: 1.75rem;
  font-weight: 700;
  color: var(--color-accent);
  line-height: 1;
}

.highlight-num small {
  font-size: 1rem;
}

.highlight-label {
  font-family: var(--font-sans);
  font-size: 0.8rem;
  color: var(--color-text-light);
  white-space: nowrap;
}

.story-image {
  position: relative;
  aspect-ratio: 4/5;
  overflow: hidden;
  border-radius: 2px;
}

.story-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s ease;
}

.story-image:hover img {
  transform: scale(1.03);
}

/* 이미지 장식선 */
.story-image::before {
  content: '';
  position: absolute;
  top: -12px;
  right: -12px;
  width: 60%;
  height: 60%;
  border-top: 2px solid var(--color-accent);
  border-right: 2px solid var(--color-accent);
  z-index: 1;
  pointer-events: none;
}
```

- [ ] **Step 3: 브라우저에서 확인**

확인 항목:
- 좌우 2분할 레이아웃 (텍스트 왼쪽, 이미지 오른쪽)
- 이미지 우상단 골드 장식선
- 스크롤 시 fade-in 동작
- 모바일에서는 세로 1열로 전환 (responsive.css에서 처리)

- [ ] **Step 4: 커밋**

```bash
git add index.html css/story.css
git commit -m "feat: story section with highlights"
```

---

## Task 5: 메뉴 섹션

**Files:**
- Create: `data/menu.json`
- Modify: `index.html` — `<section id="menu">` 채우기
- Create: `css/menu.css`
- Create: `js/menu-tab.js`

- [ ] **Step 1: menu.json 작성**

```json
{
  "categories": [
    {
      "id": "galbi",
      "label": "갈비류"
    },
    {
      "id": "side",
      "label": "추가메뉴"
    },
    {
      "id": "drink",
      "label": "주류"
    }
  ],
  "items": [
    {
      "category": "galbi",
      "name": "수제 본갈비",
      "desc": "두툼하게 손질한 대표 갈비. 육즙이 살아있는 한 점.",
      "price": "16,000",
      "unit": "1인분",
      "image": "assets/images/menu-galbi.jpg",
      "featured": true
    },
    {
      "category": "side",
      "name": "냉면",
      "desc": "식사 마무리용 시원한 냉면.",
      "price": "미정",
      "unit": "",
      "image": "assets/images/menu-naengmyeon.jpg",
      "featured": false
    },
    {
      "category": "side",
      "name": "공기밥",
      "desc": "",
      "price": "미정",
      "unit": "",
      "image": "",
      "featured": false
    }
  ]
}
```

> 메뉴 추가 시 이 JSON에만 항목 추가하면 됨. 가격 확정 후 "미정" → 실제 가격으로 교체.

- [ ] **Step 2: Menu HTML 작성**

```html
<section id="menu">
  <div class="container">
    <div class="section-header fade-in">
      <p class="section-label">Menu</p>
      <h2 class="section-title">메뉴</h2>
    </div>
    <div class="menu-tabs fade-in">
      <button class="tab-btn active" data-category="galbi">갈비류</button>
      <button class="tab-btn" data-category="side">추가메뉴</button>
      <button class="tab-btn" data-category="drink">주류</button>
    </div>
    <div class="menu-grid" id="menu-grid">
      <!-- JS로 렌더링 -->
    </div>
  </div>
</section>
```

- [ ] **Step 3: menu.css 작성**

```css
#menu {
  background: var(--color-section-alt);
}

.section-header {
  text-align: center;
  margin-bottom: 2.5rem;
}

.section-header .section-desc {
  margin: 0 auto;
}

.menu-tabs {
  display: flex;
  gap: 0;
  justify-content: center;
  margin-bottom: 3rem;
  border-bottom: 1px solid var(--color-border);
}

.tab-btn {
  font-family: var(--font-sans);
  font-size: 0.9rem;
  font-weight: 400;
  color: var(--color-text-light);
  padding: 0.75rem 1.75rem;
  border-bottom: 2px solid transparent;
  margin-bottom: -1px;
  transition: all var(--transition);
}

.tab-btn.active,
.tab-btn:hover {
  color: var(--color-text-primary);
  border-bottom-color: var(--color-accent);
}

.menu-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
}

.menu-card {
  background: var(--color-bg);
  border-radius: 4px;
  overflow: hidden;
  box-shadow: var(--shadow-card);
  transition: transform var(--transition), box-shadow var(--transition);
}

.menu-card:hover {
  transform: translateY(-6px);
  box-shadow: var(--shadow-card-hover);
}

.menu-card-image {
  aspect-ratio: 4/3;
  overflow: hidden;
  background: #f0ece6;
}

.menu-card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.menu-card:hover .menu-card-image img {
  transform: scale(1.06);
}

.menu-card-body {
  padding: 1.25rem;
}

.menu-card-name {
  font-family: var(--font-serif);
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--color-text-primary);
  margin-bottom: 0.4rem;
}

.menu-card-desc {
  font-family: var(--font-sans);
  font-size: 0.85rem;
  font-weight: 300;
  color: var(--color-text-light);
  line-height: 1.6;
  margin-bottom: 0.75rem;
  min-height: 2.6em;
}

.menu-card-price {
  font-family: var(--font-sans);
  font-size: 1rem;
  font-weight: 500;
  color: var(--color-accent);
}

.menu-card-price small {
  font-size: 0.8rem;
  font-weight: 300;
  color: var(--color-text-light);
  margin-left: 0.25rem;
}

.menu-card.featured {
  grid-column: span 1;
  border-top: 3px solid var(--color-accent);
}
```

- [ ] **Step 4: menu-tab.js 작성**

```js
fetch('data/menu.json')
  .then(res => res.json())
  .then(data => {
    const grid = document.getElementById('menu-grid');
    const tabs = document.querySelectorAll('.tab-btn');
    let currentCategory = 'galbi';

    function renderMenu(category) {
      const items = data.items.filter(item => item.category === category);
      grid.innerHTML = items.map(item => `
        <div class="menu-card${item.featured ? ' featured' : ''}">
          <div class="menu-card-image">
            ${item.image
              ? `<img src="${item.image}" alt="${item.name}" loading="lazy" />`
              : `<div style="width:100%;height:100%;background:#e8e3dc;"></div>`
            }
          </div>
          <div class="menu-card-body">
            <p class="menu-card-name">${item.name}</p>
            ${item.desc ? `<p class="menu-card-desc">${item.desc}</p>` : ''}
            <p class="menu-card-price">
              ${item.price
                ? `${item.price}<small>${item.unit ? ' / ' + item.unit : ''}</small>`
                : '<span class="price-tbd">가격 문의</span>'
              }
            </p>
          </div>
        </div>
      `).join('');
    }

    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        currentCategory = tab.dataset.category;
        renderMenu(currentCategory);
      });
    });

    renderMenu(currentCategory);
  });
```

> **주의:** `fetch()`는 로컬 파일 프로토콜(`file://`)에서 동작하지 않음. `npx serve .` 또는 VS Code Live Server로 실행.

- [ ] **Step 5: 로컬 서버로 메뉴 카드 렌더링 확인**

```bash
npx serve .
```

확인 항목:
- 탭 클릭 시 해당 카테고리 카드만 표시
- 카드 hover 시 위로 이동 + 이미지 줌인
- 3열 그리드 정상 표시

- [ ] **Step 6: 커밋**

```bash
git add index.html css/menu.css js/menu-tab.js data/menu.json
git commit -m "feat: menu section with category tabs"
```

---

## Task 6: 갤러리 섹션

**Files:**
- Modify: `index.html` — `<section id="gallery">` 채우기
- Create: `css/gallery.css`

- [ ] **Step 1: Gallery HTML 작성**

```html
<section id="gallery">
  <div class="container">
    <div class="section-header fade-in">
      <p class="section-label">Gallery</p>
      <h2 class="section-title">갤러리</h2>
    </div>
    <div class="gallery-grid fade-in">
      <!-- 인스타그램 사진 또는 정적 이미지 (6~9장) -->
      <div class="gallery-item">
        <img src="assets/images/gallery-1.jpg" alt="가오본갈비 갈비 사진 1" loading="lazy" />
      </div>
      <div class="gallery-item">
        <img src="assets/images/gallery-2.jpg" alt="가오본갈비 갈비 사진 2" loading="lazy" />
      </div>
      <div class="gallery-item">
        <img src="assets/images/gallery-3.jpg" alt="가오본갈비 인테리어" loading="lazy" />
      </div>
      <div class="gallery-item">
        <img src="assets/images/gallery-4.jpg" alt="가오본갈비 갈비 사진 4" loading="lazy" />
      </div>
      <div class="gallery-item">
        <img src="assets/images/gallery-5.jpg" alt="가오본갈비 반찬" loading="lazy" />
      </div>
      <div class="gallery-item">
        <img src="assets/images/gallery-6.jpg" alt="가오본갈비 냉면" loading="lazy" />
      </div>
    </div>
    <div class="gallery-cta fade-in">
      <a href="https://www.instagram.com/" target="_blank" rel="noopener" class="btn-instagram">
        인스타그램에서 더 보기 →
      </a>
    </div>
  </div>
</section>
```

- [ ] **Step 2: gallery.css 작성**

```css
#gallery {
  background: var(--color-bg);
}

.gallery-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.75rem;
  margin-bottom: 2.5rem;
}

.gallery-item {
  aspect-ratio: 1/1;
  overflow: hidden;
  background: #f0ece6;
  cursor: pointer;
}

.gallery-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease, filter 0.5s ease;
}

.gallery-item:hover img {
  transform: scale(1.08);
  filter: brightness(0.85);
}

.gallery-cta {
  text-align: center;
}

.btn-instagram {
  font-family: var(--font-sans);
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--color-accent);
  letter-spacing: 0.03em;
  border-bottom: 1px solid var(--color-accent);
  padding-bottom: 2px;
  transition: color var(--transition), border-color var(--transition);
}

.btn-instagram:hover {
  color: var(--color-accent-dark);
  border-color: var(--color-accent-dark);
}
```

- [ ] **Step 3: 이미지 없을 때 플레이스홀더 처리**

이미지가 아직 없는 경우, `gallery-item`에 배경색으로 임시 처리:

```css
.gallery-item img[src=""] {
  display: none;
}
```

- [ ] **Step 4: 브라우저에서 갤러리 확인**

확인 항목:
- 3열 정사각형 그리드
- hover 시 이미지 줌인 + 어두워짐
- 인스타그램 링크 버튼 표시

- [ ] **Step 5: 커밋**

```bash
git add index.html css/gallery.css
git commit -m "feat: gallery section with 3-column grid"
```

---

## Task 7: 예약/문의 섹션

**Files:**
- Modify: `index.html` — `<section id="contact">` 채우기
- Create: `css/contact.css`

- [ ] **Step 1: Contact HTML 작성**

```html
<section id="contact">
  <div class="container">
    <div class="section-header fade-in">
      <p class="section-label">Reservation</p>
      <h2 class="section-title">예약 & 문의</h2>
    </div>
    <div class="contact-grid fade-in">
      <div class="contact-card">
        <div class="contact-icon">📞</div>
        <h3 class="contact-card-title">전화 예약</h3>
        <a id="contact-phone" href="" class="contact-phone"></a>
        <p class="contact-note">전화 연결 즉시 예약 가능</p>
      </div>
      <!-- 카카오 카드: config.js의 kakaoChannelUrl이 비어있으면 JS가 숨김 -->
      <div class="contact-card" id="kakao-card">
        <div class="contact-icon">💬</div>
        <h3 class="contact-card-title">카카오톡 문의</h3>
        <a id="kakao-link" href="" target="_blank" rel="noopener" class="btn btn-kakao">
          카카오톡 채널 문의
        </a>
      </div>
      <div class="contact-card">
        <div class="contact-icon">🕐</div>
        <h3 class="contact-card-title">영업시간</h3>
        <table class="hours-table" id="hours-table"></table>
      </div>
    </div>
  </div>
</section>
```

- [ ] **Step 2: nav.js 하단에 contact 렌더링 코드 추가**

```js
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
```

- [ ] **Step 3: contact.css 작성**

```css
#contact {
  background: var(--color-section-alt);
}

.contact-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
}

.contact-card {
  background: var(--color-bg);
  padding: 2.5rem 2rem;
  border-radius: 4px;
  text-align: center;
  box-shadow: var(--shadow-card);
}

.contact-icon {
  font-size: 2rem;
  margin-bottom: 1rem;
}

.contact-card-title {
  font-family: var(--font-serif);
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--color-text-primary);
  margin-bottom: 1rem;
}

.contact-phone {
  display: block;
  font-family: var(--font-sans);
  font-size: 1.3rem;
  font-weight: 500;
  color: var(--color-accent);
  margin-bottom: 0.5rem;
  transition: color var(--transition);
}

.contact-phone:hover {
  color: var(--color-accent-dark);
}

.contact-note {
  font-family: var(--font-sans);
  font-size: 0.8rem;
  color: var(--color-text-light);
}

.btn-kakao {
  display: inline-block;
  background: #FEE500;
  color: #191919;
  font-family: var(--font-sans);
  font-size: 0.9rem;
  font-weight: 500;
  padding: 0.75rem 1.5rem;
  border-radius: 2px;
  margin-bottom: 0.75rem;
  transition: background var(--transition);
}

.btn-kakao:hover {
  background: #FFDA00;
}

.hours-table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
}

.hours-table td {
  padding: 0.4rem 0.25rem;
  font-family: var(--font-sans);
  font-size: 0.85rem;
  color: var(--color-text-secondary);
  vertical-align: top;
}

.hours-table td:first-child {
  font-weight: 500;
  color: var(--color-text-primary);
  white-space: nowrap;
  width: 90px;
}

.hours-table small {
  font-size: 0.75rem;
  color: var(--color-text-light);
}
```

- [ ] **Step 4: 카카오 / 인스타 추가 방법 안내 주석 확인**

나중에 추가할 때는 `js/config.js` 만 열어서:
- `kakaoChannelUrl: ''` → `kakaoChannelUrl: 'https://pf.kakao.com/...'`
- `instagramUrl: ''` → `instagramUrl: 'https://www.instagram.com/...'`

로 바꾸면 버튼이 자동으로 나타남.

- [ ] **Step 4: 커밋**

```bash
git add index.html css/contact.css
git commit -m "feat: contact section with phone, kakao, hours"
```

---

## Task 8: 오시는 길 섹션

**Files:**
- Modify: `index.html` — `<section id="map-section">` 채우기
- Create: `css/map.css`

- [ ] **Step 1: Map HTML 작성**

```html
<section id="map-section">
  <div class="map-embed">
    <iframe
      src="https://map.kakao.com/link/embed?address=대전광역시 동구 대전로448번길 52-4&level=3"
      title="가오본갈비 위치"
      loading="lazy"
      allowfullscreen>
    </iframe>
  </div>
  <div class="container">
    <div class="map-info fade-in">
      <div class="map-info-block">
        <p class="section-label">Location</p>
        <h2 class="section-title" style="font-size:1.75rem;">오시는 길</h2>
        <div class="address-block">
          <p class="address-primary">대전 동구 대전로448번길 52-4 1층</p>
          <p class="address-secondary">가오동 590 · 우편번호 34692</p>
          <button class="copy-address" data-address="대전 동구 대전로448번길 52-4 1층">
            주소 복사
          </button>
        </div>
      </div>
      <div class="map-info-block">
        <h3 class="map-info-title">주차 안내</h3>
        <p class="map-info-text">건물 앞 주차 가능 (추가 정보 입력 필요)</p>
      </div>
      <div class="map-info-block">
        <h3 class="map-info-title">전화</h3>
        <a href="tel:05071465381" class="map-phone">0507-1465-3581</a>
      </div>
    </div>
  </div>
</section>
```

- [ ] **Step 2: map.css 작성**

```css
#map-section {
  padding: 0;
  background: var(--color-bg);
}

.map-embed {
  width: 100%;
  height: 420px;
  background: #e8e4de;
}

.map-embed iframe {
  width: 100%;
  height: 100%;
  border: none;
  display: block;
}

#map-section .container {
  padding-top: 3rem;
  padding-bottom: 3.5rem;
}

.map-info {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  gap: 3rem;
  align-items: start;
}

.map-info-block {}

.address-primary {
  font-family: var(--font-sans);
  font-size: 1rem;
  font-weight: 500;
  color: var(--color-text-primary);
  margin-bottom: 0.3rem;
}

.address-secondary {
  font-family: var(--font-sans);
  font-size: 0.85rem;
  color: var(--color-text-light);
  margin-bottom: 1rem;
}

.copy-address {
  font-family: var(--font-sans);
  font-size: 0.8rem;
  color: var(--color-accent);
  border: 1px solid var(--color-accent);
  padding: 0.35rem 0.85rem;
  border-radius: 2px;
  transition: all var(--transition);
  cursor: pointer;
  background: transparent;
}

.copy-address:hover,
.copy-address.copied {
  background: var(--color-accent);
  color: #fff;
}

.map-info-title {
  font-family: var(--font-sans);
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--color-text-light);
  margin-bottom: 0.5rem;
}

.map-info-text {
  font-family: var(--font-sans);
  font-size: 0.9rem;
  color: var(--color-text-secondary);
  line-height: 1.6;
}

.map-phone {
  font-family: var(--font-sans);
  font-size: 1rem;
  font-weight: 500;
  color: var(--color-accent);
  transition: color var(--transition);
}

.map-phone:hover {
  color: var(--color-accent-dark);
}
```

- [ ] **Step 3: nav.js에 주소 복사 기능 추가**

`js/nav.js` 하단에 추가:

```js
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
```

- [ ] **Step 4: 커밋**

```bash
git add index.html css/map.css js/nav.js
git commit -m "feat: map section with kakao embed and address copy"
```

---

## Task 9: 푸터 + 반응형

**Files:**
- Modify: `index.html` — `<footer>` 채우기
- Create: `css/footer.css`
- Create: `css/responsive.css`

- [ ] **Step 1: Footer HTML 작성**

```html
<footer id="footer">
  <div class="container">
    <div class="footer-inner">
      <div class="footer-brand">
        <p class="footer-logo">가오본갈비</p>
        <p class="footer-address">대전 동구 대전로448번길 52-4 1층</p>
        <p class="footer-tel">0507-1465-3581</p>
      </div>
      <div class="footer-links">
        <a href="#menu">메뉴</a>
        <a href="#story">스토리</a>
        <a href="#gallery">갤러리</a>
        <a href="#contact">예약문의</a>
        <a href="#map-section">오시는길</a>
      </div>
    </div>
    <div class="footer-bottom">
      <p class="footer-copy">© 2026 가오본갈비. All rights reserved.</p>
    </div>
  </div>
</footer>
```

- [ ] **Step 2: footer.css 작성**

```css
#footer {
  background: var(--color-text-primary);
  padding: 3rem 0 2rem;
}

.footer-inner {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 2.5rem;
}

.footer-logo {
  font-family: var(--font-serif);
  font-size: 1.3rem;
  font-weight: 700;
  color: #fff;
  margin-bottom: 0.5rem;
}

.footer-address,
.footer-tel {
  font-family: var(--font-sans);
  font-size: 0.85rem;
  color: rgba(255,255,255,0.5);
  line-height: 1.8;
}

.footer-links {
  display: flex;
  gap: 1.5rem;
}

.footer-links a {
  font-family: var(--font-sans);
  font-size: 0.85rem;
  color: rgba(255,255,255,0.5);
  transition: color var(--transition);
}

.footer-links a:hover {
  color: #fff;
}

.footer-bottom {
  border-top: 1px solid rgba(255,255,255,0.1);
  padding-top: 1.5rem;
}

.footer-copy {
  font-family: var(--font-sans);
  font-size: 0.75rem;
  color: rgba(255,255,255,0.3);
  text-align: center;
}
```

- [ ] **Step 3: responsive.css 작성**

```css
/* ── 태블릿 (768px 이하) ─────────────────────── */
@media (max-width: 768px) {
  :root {
    --section-padding: var(--section-padding-mobile);
  }

  /* 네비게이션 */
  .nav-links { display: none; }
  .nav-hamburger { display: flex; }

  /* Hero */
  .hero-slogan { font-size: 1rem; }

  /* 스토리 */
  .story-grid {
    grid-template-columns: 1fr;
    gap: 2.5rem;
  }
  .story-image { order: -1; aspect-ratio: 16/9; }
  .story-image::before { display: none; }

  /* 메뉴 */
  .menu-grid { grid-template-columns: 1fr; }

  /* 갤러리 */
  .gallery-grid { grid-template-columns: repeat(2, 1fr); }

  /* 예약/문의 */
  .contact-grid { grid-template-columns: 1fr; }

  /* 오시는길 */
  .map-info {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  .map-embed { height: 280px; }

  /* 푸터 */
  .footer-inner {
    flex-direction: column;
    gap: 1.5rem;
  }
  .footer-links { flex-wrap: wrap; gap: 1rem; }
}

/* ── 모바일 소형 (480px 이하) ───────────────── */
@media (max-width: 480px) {
  .gallery-grid { grid-template-columns: 1fr; }
  .hero-actions { flex-direction: column; align-items: center; }
  .story-highlights { flex-direction: column; gap: 1rem; }
}
```

- [ ] **Step 4: 전체 반응형 최종 확인**

브라우저 DevTools에서 아래 너비로 전환하며 확인:

| 너비 | 확인 항목 |
|------|-----------|
| 375px (iPhone) | 햄버거 메뉴, 1열 레이아웃 |
| 768px (태블릿) | 2열 갤러리, 세로 스토리 |
| 1280px (PC) | 전체 3열 그리드, 수평 nav |

- [ ] **Step 5: 최종 커밋**

```bash
git add index.html css/footer.css css/responsive.css
git commit -m "feat: footer and full responsive layout"
```

---

## Task 10: 배포

- [ ] **Step 1: Vercel CLI로 배포**

```bash
npm i -g vercel
vercel --prod
```

또는 Netlify 드래그 앤 드롭: netlify.com → Sites → 폴더 드래그

- [ ] **Step 2: 배포 후 체크리스트**

- [ ] 모바일 실기기(아이폰/갤럭시)에서 전체 섹션 확인
- [ ] 전화 링크 (`tel:`) 클릭 시 전화 연결 확인
- [ ] 주소 복사 버튼 동작 확인
- [ ] 카카오맵 iframe 로딩 확인
- [ ] og:image 썸네일 확인 (카카오톡 링크 공유)
- [ ] Google PageSpeed Insights 모바일 점수 확인 (목표: 85+)

- [ ] **Step 3: 커밋 및 태그**

```bash
git tag v1.0.0
git push && git push --tags
```

---

## 나중에 수정하는 방법 (코드 몰라도 됨)

| 수정 항목 | 파일 | 방법 |
|-----------|------|------|
| 전화번호 | `js/config.js` | `phone` 값 변경 |
| 카카오톡 채널 추가 | `js/config.js` | `kakaoChannelUrl` 에 URL 입력 → 버튼 자동 표시 |
| 인스타그램 추가 | `js/config.js` | `instagramUrl` 에 URL 입력 → 버튼 자동 표시 |
| 영업시간 변경 | `js/config.js` | `hours` 배열 수정 |
| 메뉴 추가/수정 | `data/menu.json` | `items` 배열에 항목 추가 또는 `price` 수정 |
| 메뉴 가격 입력 | `data/menu.json` | `"price": ""` → `"price": "12,000"` |
| 사진 교체 | `assets/images/` | 같은 파일명으로 덮어쓰기 |
| 슬로건 변경 | `js/config.js` | `slogan` 값 변경 |

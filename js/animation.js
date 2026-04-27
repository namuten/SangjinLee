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

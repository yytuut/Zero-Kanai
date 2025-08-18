// 모바일 메뉴 토글
function toggleMenu() {
  const menu = document.getElementById('dropdown-menu');
  menu.classList.toggle('show');
}

// 스크롤 애니메이션
document.addEventListener('DOMContentLoaded', function () {
  const elements = document.querySelectorAll('.scroll-fade-in');
  function checkScroll() {
    elements.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight - 100) {
        el.classList.add('visible');
      }
    });
  }
  window.addEventListener('scroll', checkScroll);
  checkScroll(); // 초기 로딩 시 체크
});

// ✅ 슬라이더 공통 초기화 함수
function initializeSlider(sliderSelector) {
  const slider = document.querySelector(sliderSelector);
  if (!slider) return;

  const slides = slider.querySelector('.slides');
  const images = slider.querySelectorAll('.slides img');
  const dots = slider.querySelectorAll('.dot');
  const prev = slider.querySelector('.prev');
  const next = slider.querySelector('.next');

  const totalSlides = dots.length;
  let index = 1;
  let slideWidth = slider.offsetWidth;

  function setSlidePosition() {
    slideWidth = slider.offsetWidth;
    slides.style.transition = 'none';
    slides.style.transform = `translateX(-${slideWidth * index}px)`;
  }

  window.addEventListener('load', setSlidePosition);
  window.addEventListener('resize', setSlidePosition);

  function updateDots(i) {
    dots.forEach(dot => dot.classList.remove('active'));
    const dotIndex = (i - 1 + totalSlides) % totalSlides;
    if (dots[dotIndex]) dots[dotIndex].classList.add('active');
  }

  function moveToSlide(i) {
    slides.style.transition = 'transform 0.5s ease-in-out';
    slides.style.transform = `translateX(-${slideWidth * i}px)`;
    updateDots(i);
  }

  function nextSlide() {
    index++;
    moveToSlide(index);
    if (index === totalSlides + 1) {
      setTimeout(() => {
        slides.style.transition = 'none';
        index = 1;
        setSlidePosition();
        updateDots(index);
      }, 500);
    }
  }

  function prevSlide() {
    index--;
    moveToSlide(index);
    if (index === 0) {
      setTimeout(() => {
        slides.style.transition = 'none';
        index = totalSlides;
        setSlidePosition();
        updateDots(index);
      }, 500);
    }
  }

  if (next) next.addEventListener('click', nextSlide);
  if (prev) prev.addEventListener('click', prevSlide);

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      index = i + 1;
      moveToSlide(index);
    });
  });

  setInterval(nextSlide, 4000);
  updateDots(index);
}

// DOM이 로드되면 슬라이더 초기화
document.addEventListener('DOMContentLoaded', () => {
  initializeSlider('#cheong .slider');   // 첫 번째 슬라이더
  initializeSlider('#cheong1 .slider');  // 두 번째 슬라이더
  initializeSlider('#cheong2 .slider');  // 세 번째 슬라이더
});

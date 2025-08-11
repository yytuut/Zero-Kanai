// 모바일 메뉴 토글
  function toggleMenu() {
    const menu = document.getElementById('dropdown-menu');
    menu.classList.toggle('show');
  }

  // 모든 기능은 DOM이 로드된 후 실행
  document.addEventListener('DOMContentLoaded', function () {
    // 스크롤 애니메이션
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
    checkScroll(); // 초기 로딩 시에도 체크

    // 슬라이더 기능
    const slider = document.querySelector('.slider');
    const slides = document.querySelector('.slides');
    const slideImages = document.querySelectorAll('.slides img');
    const dots = document.querySelectorAll('.dot');
    const prev = document.querySelector('.prev');
    const next = document.querySelector('.next');

    const totalSlides = dots.length;
    let index = 1; // 첫 번째 실제 이미지부터 시작
    let slideWidth = slider.offsetWidth;

    // 이미지 로딩 후 슬라이드 초기 위치 설정
    window.addEventListener('load', () => {
      slideWidth = slider.offsetWidth;
      slides.style.transition = 'none';
      slides.style.transform = `translateX(-${slideWidth * index}px)`;
    });

    // 창 크기 변경 시 슬라이드 너비 재계산
    window.addEventListener('resize', () => {
      slideWidth = slider.offsetWidth;
      slides.style.transition = 'none';
      slides.style.transform = `translateX(-${slideWidth * index}px)`;
    });

    function updateDots(i) {
        dots.forEach(dot => dot.classList.remove('active'));
        const dotIndex = (i - 1 + totalSlides) % totalSlides;
        dots[dotIndex].classList.add('active');
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
          slides.style.transform = `translateX(-${slideWidth * index}px)`;
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
          slides.style.transform = `translateX(-${slideWidth * index}px)`;
          updateDots(index);
        }, 500);
      }
    }

    next.addEventListener('click', nextSlide);
    prev.addEventListener('click', prevSlide);

    dots.forEach((dot, i) => {
      dot.addEventListener('click', () => {
        index = i + 1;
        moveToSlide(index);
      });
    });

    // 자동 슬라이드
    setInterval(nextSlide, 4000);

    // 초기화
    updateDots(index);
  });
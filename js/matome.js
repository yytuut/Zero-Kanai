function toggleMenu() {
    const menu = document.getElementById('dropdown-menu');
    menu.classList.toggle('show');
  }
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
    checkScroll(); // 초기 로딩 시에도 체크
  });

//팝업
const popupOverlay = document.getElementById('popup-overlay');
const popupImage = document.getElementById('popup-image');
const popupName = document.getElementById('popup-name');
const popupDesc = document.getElementById('popup-desc');
const popupClose = document.querySelector('.popup-close');

// 흐림 효과를 줄 대상들
const backgroundTargets = document.querySelectorAll('header, main, footer');

// 팝업 열기
document.querySelectorAll('.popup-trigger').forEach(img => {
  img.addEventListener('click', () => {
    const popupSrc = img.dataset.popup || img.src;
    popupImage.src = popupSrc;
    popupName.textContent = img.dataset.name || '';
    popupDesc.textContent = img.dataset.desc || '';

    // 애니메이션 재실행
    popupImage.style.animation = 'none';
    void popupImage.offsetWidth;
    popupImage.style.animation = 'zoomIn 0.4s ease forwards';

    popupOverlay.style.display = 'flex';

    // 흐림 효과 적용
    backgroundTargets.forEach(el => el.classList.add('blur-background'));
  });
});

// 팝업 닫기 (공통 처리)
function closePopup() {
  popupOverlay.style.display = 'none';
  backgroundTargets.forEach(el => el.classList.remove('blur-background'));
}

popupClose.addEventListener('click', closePopup);
popupOverlay.addEventListener('click', (e) => {
  if (e.target === popupOverlay) closePopup();
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closePopup();
});

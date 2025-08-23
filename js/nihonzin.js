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
  //배경 아래 화살표
document.getElementById('scroll-arrow').addEventListener('click', function() {
    // 본문 영역의 시작 위치로 부드럽게 스크롤 (예: content-wrapper)
    const content = document.querySelector('.content-wrapper');
    content.scrollIntoView({ behavior: 'smooth' });
});

// 지도 모달 관련 JavaScript
    function openMapModal() {
      const modal = document.getElementById('mapModal');
      modal.style.display = 'block';
      
      // 모달 내용을 맨 위로 스크롤
      setTimeout(() => {
        const modalContent = modal.querySelector('.map-modal-content');
        if (modalContent) {
          modalContent.scrollTop = 0;
        }
      }, 100);
    }

    function closeMapModal() {
      document.getElementById('mapModal').style.display = 'none';
    }

    // 모달 외부 클릭시 닫기
    window.onclick = function(event) {
      const modal = document.getElementById('mapModal');
      if (event.target == modal) {
        closeMapModal();
      }
    }

    // ESC 키로 모달 닫기
    document.addEventListener('keydown', function(event) {
      if (event.key === 'Escape') {
        closeMapModal();
      }
    });
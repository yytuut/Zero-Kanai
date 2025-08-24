function toggleMenu() {
    const menu = document.getElementById('dropdown-menu');
    menu.classList.toggle('show');
  }
  function toggleAnswer(element) {
    const wrapper = element.nextElementSibling;
    const icon = element.querySelector('.icon');

    wrapper.classList.toggle('open');

    // 아이콘 변경
    if (wrapper.classList.contains('open')) {
      icon.textContent = '▼';
    } 
    else {
      icon.textContent = '▶';
    }
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

// QR코드
    function openQRModal() {
    const overlay = document.getElementById('qrModalOverlay');
    const modalContent = overlay.querySelector('.qr-modal-content');
    const qrButton = document.querySelector('.qr-code-btn');
    
    // QR 버튼의 정확한 위치 계산
    const buttonRect = qrButton.getBoundingClientRect();
    const buttonCenterX = buttonRect.left + buttonRect.width / 2;
    const buttonCenterY = buttonRect.top + buttonRect.height / 2;
    
    // 화면 중앙 계산
    const screenCenterX = window.innerWidth / 2;
    const screenCenterY = window.innerHeight / 2;
    
    // 초기 위치를 QR 버튼 중앙으로 설정
    modalContent.style.left = buttonCenterX + 'px';
    modalContent.style.top = buttonCenterY + 'px';
    modalContent.style.transform = 'translate(-50%, -50%) scale(0.1)';
    modalContent.style.opacity = '0';
    
    // 모달 표시
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // 약간의 딜레이 후 중앙으로 애니메이션
    setTimeout(() => {
        modalContent.style.left = '50%';
        modalContent.style.top = '50%';
        modalContent.style.transform = 'translate(-50%, -50%) scale(1)';
        modalContent.style.opacity = '1';
    }, 50);
}

function closeQRModal(event) {
    // 모달 내부 클릭시에는 닫지 않음
    if (event && event.target !== event.currentTarget && event.type === 'click') {
        return;
    }
    
    const overlay = document.getElementById('qrModalOverlay');
    const modalContent = overlay.querySelector('.qr-modal-content');
    const qrButton = document.querySelector('.qr-code-btn');
    
    // QR 버튼 위치 다시 계산 (스크롤 등으로 위치가 바뀔 수 있음)
    const buttonRect = qrButton.getBoundingClientRect();
    const buttonCenterX = buttonRect.left + buttonRect.width / 2;
    const buttonCenterY = buttonRect.top + buttonRect.height / 2;
    
    // QR 버튼 위치로 축소하면서 사라지기
    modalContent.style.left = buttonCenterX + 'px';
    modalContent.style.top = buttonCenterY + 'px';
    modalContent.style.transform = 'translate(-50%, -50%) scale(0.1)';
    modalContent.style.opacity = '0';
    
    // 애니메이션 완료 후 모달 숨기기
    setTimeout(() => {
        overlay.classList.remove('active');
        document.body.style.overflow = 'auto';
    }, 600); // transition 시간과 맞춤
}

// ESC 키로 모달 닫기
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeQRModal();
    }
});

// 모바일 Aside 토글 함수
function toggleMobileAside() {
    const dropdown = document.getElementById('mobile-aside-dropdown');
    dropdown.classList.toggle('show');
}

// 모바일 Aside 닫기 함수
function closeMobileAside() {
    const dropdown = document.getElementById('mobile-aside-dropdown');
    dropdown.classList.remove('show');
}

// 외부 클릭시 모바일 aside 닫기
document.addEventListener('click', function(event) {
    const dropdown = document.getElementById('mobile-aside-dropdown');
    const button = document.querySelector('.mobile-aside-btn');
    
    if (!dropdown.contains(event.target) && !button.contains(event.target)) {
        dropdown.classList.remove('show');
    }
});

// 스크롤 함수들
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

function scrollToBottom() {
    window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth'
    });
}
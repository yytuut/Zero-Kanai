document.addEventListener("DOMContentLoaded", () => {
  const el = document.querySelector(".wave-text");
  if (!el) return;

  const rawHTML = el.innerHTML.trim();
  const parts = rawHTML.split(/(<br\s*\/?>)/i); // <br> 태그 분리

  el.innerHTML = ""; // 기존 내용 초기화

  let charIndex = 0; // 전체 글자 인덱스 (delay 계산용)

  parts.forEach(part => {
    if (part.match(/<br\s*\/?>/i)) {
      el.appendChild(document.createElement("br"));
    } else {
      [...part].forEach(char => {
        const span = document.createElement("span");
        span.textContent = char;
        span.style.animationDelay = `${charIndex * 0.1}s`;
        el.appendChild(span);
        charIndex++;
      });
    }
  });
});

// 페이지 전환 애니메이션
document.querySelector(".button")?.addEventListener("click", function (e) {
  e.preventDefault();
  document.body.classList.add("fade-out");
  setTimeout(() => {
    window.location.href = this.getAttribute("href");
  }, 1000);
});
function toggleMenu() {
      const menu = document.getElementById('dropdown-menu');
      menu.classList.toggle('show');
    }
    

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
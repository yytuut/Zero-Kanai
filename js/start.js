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
    
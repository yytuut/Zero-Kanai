 document.addEventListener("DOMContentLoaded", () => {
      const el = document.querySelector(".wave-text");
      const text = el.textContent.trim();
      el.textContent = "";

      [...text].forEach((char, i) => {
        const span = document.createElement("span");
        span.textContent = char;
        span.style.animationDelay = `${i * 0.1}s`;
        el.appendChild(span);
      });
    });
    document.querySelector(".button").addEventListener("click", function (e) {
    e.preventDefault(); // 기본 링크 동작 막기

    // body에 fade-out 클래스 추가
    document.body.classList.add("fade-out");

    // 애니메이션이 끝난 후 페이지 이동
    setTimeout(() => {
      window.location.href = this.getAttribute("href");
    }, 1000); // 1초 후 이동 (transition 시간과 맞추기)
  });
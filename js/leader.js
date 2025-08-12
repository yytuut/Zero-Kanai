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
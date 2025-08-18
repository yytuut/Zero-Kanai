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
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

// 팝업 관련 요소
const popupOverlay = document.getElementById('popup-overlay');
const popupImage = document.getElementById('popup-image');
const popupName = document.getElementById('popup-name');
const popupDesc = document.getElementById('popup-desc');
const popupComment = document.getElementById('popup-comment');
const popupClose = document.querySelector('.popup-close');
const arrowLeft = document.querySelector('.popup-arrow-left');
const arrowRight = document.querySelector('.popup-arrow-right');
const popupPageWrapper = document.getElementById('popup-page-wrapper');

// 흐림 효과 대상
const backgroundTargets = document.querySelectorAll('header, main, footer');

// 새 내용 보여줄 요소 (팝업에 추가한다고 가정)
let popupExtraContent = document.getElementById('popup-extra-content');
if (!popupExtraContent) {
  // 없다면 동적으로 만들기 (popupComment 다음에 추가)
  popupExtraContent = document.createElement('div');
  popupExtraContent.id = 'popup-extra-content';
  popupExtraContent.style.display = 'none';
  popupComment.parentNode.insertBefore(popupExtraContent, popupComment.nextSibling);
}

// 팀 멤버 데이터 (여러 페이지 포함)
const teamMembers = [
  {
    popup: "images/Kwondaehwan.jpg",
    name: "グォン・デファン",
    pages: [
      { desc: "日本語融合学部　日本IT専攻" }, // 첫 페이지
      { desc: "好きなアニメ: スパイファミリー", comment: "もっと旅行したい！" },
      { extraContent: "<h4>追加情報</h4><p>新しい内容をここに自由に記載できます。</p>" }
    ]
  },
  {
    popup: "images/Leejunyong.jpg",
    name: "イ・ジュンヨン",
    pages: [
      { desc: "日本語融合学部　日本IT専攻" },
      { 
        desc: "<h3>プロフィール</h3>", 
        comment: `
        <p><strong>生年月日：</strong>2000年9月20日</p>
        <p><strong>出身地：</strong>淸州市</p>
        <p><strong>MBTI：</strong>ISTJ</p>
        <p><strong>趣味：</strong>荷物整理</p>
        <p><strong>E-mail：</strong>rnlcksgdmsdldirl8421@gmail.com</p>
        <p><strong>一言：</strong>質素な生活</p>
      `
     },
      { extraContent: "<h3>感想</h3><p>大変</p>" }
    ]
  },
  {
    popup: "images/ChoiYunJeong.jpg",
    name: "チェ・ユンジョン",
    pages: [
      { desc: "中国学部　中国語専攻" },
      { desc: "好きな食べ物はラーメン", comment: "また来年も会いたい！" },
      { extraContent: "<h4>ラーメンについて</h4><p>特に豚骨ラーメンが好きです。</p>" }
    ]
  }
];

let currentIndex = 0;
let currentPage = 0;
let slideDirection = 'right';  // 기본 방향
let isInitialOpen = true;       // 팝업 처음 열림 여부

// 팝업 열기 함수
function openPopup(index) {
  currentIndex = index;
  currentPage = 0;
  isInitialOpen = true;  // 처음 열기 상태

  const member = teamMembers[index];
  popupImage.src = member.popup;
  popupName.textContent = member.name;

  popupOverlay.style.display = 'flex';

  // 흐림 효과
  backgroundTargets.forEach(el => el.classList.add('blur-background'));

  // 이미지 애니메이션
  popupImage.style.animation = 'none';
  void popupImage.offsetWidth;
  popupImage.style.animation = 'zoomIn 0.4s ease forwards';

  updatePopupPage();
  // 팝업 열고 나서 애니메이션 적용 가능하게 false로 변경
  isInitialOpen = false;
}

// 팝업 닫기 함수
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

// 페이지 전환 (화살표로 내용만 업데이트)
function updatePopupPage() {
  const member = teamMembers[currentIndex];
  const page = member.pages[currentPage];

  
  if (isInitialOpen) {
    // 처음 열 때는 슬라이드 효과 없이 바로 내용 표시
    popupPageWrapper.classList.remove('slide-left', 'slide-right');

    if (currentPage === 0) {
      popupImage.style.display = 'block';
      popupName.style.display = 'block';
      popupDesc.style.display = 'block';
      popupComment.style.display = 'none';
      popupExtraContent.style.display = 'none';
      popupDesc.textContent = page.desc || '';
      popupComment.innerHTML = '';
    } else if (page.extraContent) {
      popupImage.style.display = 'none';
      popupName.style.display = 'none';
      popupDesc.style.display = 'none';
      popupComment.style.display = 'none';
      popupExtraContent.style.display = 'block';
      popupExtraContent.innerHTML = page.extraContent || '';
    } else {
      popupImage.style.display = 'none';
      popupName.style.display = 'none';
      popupDesc.style.display = 'block';
      popupComment.style.display = 'block';
      popupExtraContent.style.display = 'none';
      popupDesc.innerHTML = page.desc || '';
      popupComment.innerHTML = page.comment || '';
    }

    updateArrowVisibility();
    return;
  }

  // 페이지 넘길 때만 슬라이드 효과 적용
  popupPageWrapper.classList.remove('slide-left', 'slide-right');
  popupPageWrapper.classList.add(slideDirection === 'right' ? 'slide-right' : 'slide-left');

  setTimeout(() => {
    if (currentPage === 0) {
      popupImage.style.display = 'block';
      popupName.style.display = 'block';
      popupDesc.style.display = 'block';
      popupComment.style.display = 'none';
      popupExtraContent.style.display = 'none';
      popupDesc.textContent = page.desc || '';
      popupComment.innerHTML = '';
    } else if (page.extraContent) {
      popupImage.style.display = 'none';
      popupName.style.display = 'none';
      popupDesc.style.display = 'none';
      popupComment.style.display = 'none';
      popupExtraContent.style.display = 'block';
      popupExtraContent.innerHTML = page.extraContent || '';
    } else {
      popupImage.style.display = 'none';
      popupName.style.display = 'none';
      popupDesc.style.display = 'block';
      popupComment.style.display = 'block';
      popupExtraContent.style.display = 'none';
      popupDesc.innerHTML = page.desc || '';
      popupComment.innerHTML = page.comment || '';
    }

    updateArrowVisibility();

    // 애니메이션 끝나면 클래스 제거
    setTimeout(() => {
      popupPageWrapper.classList.remove('slide-left', 'slide-right');
    }, 400); // 애니메이션 시간에 맞춰서 조절
  }, 100); // 약간 딜레이 줘서 자연스럽게
}

// 화살표 표시/숨김 업데이트
function updateArrowVisibility() {
  const pages = teamMembers[currentIndex].pages;

  if (currentPage === 0) {
    arrowLeft.style.display = 'none';
  } else {
    arrowLeft.style.display = 'block';
  }

  if (currentPage === pages.length - 1) {
    arrowRight.style.display = 'none';
  } else {
    arrowRight.style.display = 'block';
  }
}

// 이미지 클릭 → 팝업 열기
document.querySelectorAll('.popup-trigger').forEach((img, index) => {
  img.addEventListener('click', () => {
    openPopup(index);
  });
});

// 화살표 클릭 이벤트
arrowLeft.addEventListener('click', () => {
  const pages = teamMembers[currentIndex].pages;
  if (currentPage > 0) {
    slideDirection = 'left'; // ← 방향
    currentPage--;
    updatePopupPage();
  }
});

arrowRight.addEventListener('click', () => {
  const pages = teamMembers[currentIndex].pages;
  if (currentPage < pages.length - 1) {
    slideDirection = 'right'; // → 방향
    currentPage++;
    updatePopupPage();
  }
});

// 키보드 방향키 이벤트
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closePopup();
  else if (e.key === 'ArrowLeft') {
    arrowLeft.click();
  } else if (e.key === 'ArrowRight') {
    arrowRight.click();
  }
});

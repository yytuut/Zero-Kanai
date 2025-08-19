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
      { desc: "<h3>プロフィール</h3>", 
        comment: `
        <p><strong>生年月日：</strong>2001年9月5日</p>
        <p><strong>出身地：</strong>仁川広域市</p>
        <p><strong>MBTI：</strong>ENFJ</p>
        <p><strong>趣味：</strong>サッカー観戦、カラオケ🎤</p>
        <p><strong>E-mail：</strong>hahohaho1342@gmail.com</p>
        <p><strong>一言：</strong>アーメン</p>
      `
     },
      { 
        desc: "<h3>感想</h3>",
        extraContent: `
        <p>今回のプロジェクトは、私にとってすべてが初めての経験でした。インタビューもホームページ作りも初めてで大変でしたが、チームメンバーのおかげで最後までやりきることができました。

        この経験を通して、新しいことに挑戦する勇気や、問題を解決する力を学びました。また、仲間と協力する大切さを知り、自分に自信を持つことができました。さらに、金井さんのリーダーとしての姿から多く学び、私の成長にもつながりました。この学びは、今後の社会生活でも必ず役立つと思います。

        これからも今回の経験をいかして、新しい挑戦に積極的に取り組んでいきたいと思います</p>
        ` }
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
        <p><strong>趣味：</strong>荷物整理、バイト💰</p>
        <p><strong>E-mail：</strong>rnlcksgdmsdldirl8421@gmail.com</p>
        <p><strong>一言：</strong>質素な生活!!</p>
      `
     },
      { 
        desc: "<h3>感想</h3>",
        extraContent: `
        <p>ゼロから始めたこのプロジェクトは、<br>文字通りITの知識がゼロだったため、<br>
        最初は多くの困難がありました。しかし、チームメンバーと<br>プロジェクトを進める中で、
        多くのコミュニケーションを<br>通じてお互いの不足している点を補い合い、<br>
        克服することができました。これらの経験から、<br>協力の重要性を改めて実感する機会になったと思います。<br>それに加えて、これまで一度も使ったことのなかった<br>JavaScriptを使うことができて、良い経験になったと思い、<br>ITの知識を積む上でも役に立ちました。</p>
        ` }
    ]
  },
  {
    popup: "images/ChoiYunJeong.jpg",
    name: "チェ・ユンジョン",
    pages: [
      { desc: "中国学部　中国語専攻" },
      { desc: "<h3>プロフィール</h3>", 
        comment: `
        <p><strong>生年月日：</strong>2003年2月6日</p>
        <p><strong>出身地：</strong>釜山広域市</p>
        <p><strong>MBTI：</strong>ISFP</p>
        <p><strong>趣味：</strong>読書📖、歌🎶、有酸素運動🏃</p>
        <p><strong>E-mail：</strong>hiri1229@office.bufs.ac.kr</p>
        <p><strong>一言：</strong>当たって砕けろ</p>
      `
     },
      { 
        desc: "<h3>感想</h3>",
        extraContent: `
        <p>金井氏とインタビューしたこと、その内容を整理したこと、仲間と協力しながらWEBページを作ったこと等。活動のすべての瞬間が忘られないでしょう。金井氏をインタビューすることで、新しい情報も得られ、金井氏のことを知ることで人を接するときの視野、世界を見る視野も広げたと思います。特に、金井氏のリーダーを任されら時の経験は金井氏の哲学を感じられて、勉強になりました。 どう言うべきかちょっと曖昧ですけれども(笑)、金井氏のリーダーとしての哲学を聞いて、リーダーに関する考えが変えました。大袈裟かも知れませんが、リーダーとは、私とは物凄く距離がある役割で、選ばれた人間(?)にしかできないことだと思っていました。ですが、金井氏の経験を聞いて、リーダーの形は人間の数だけ様々かもしれない。また、リーダーに必要なものは私が考えているものではないかもしれないと感じました。これをきっかけに、リーダーとは何か、私がリーダーになるとしたら、どんなリーダーになりたいのだろうと考えることができました。できればの話ですが、いつか金井氏ごときみんなに信頼される素敵なリーダーになりたいですね。いろいろ考え直しながら、過去を繰り返す大事な機会だったと思います。久々のチーム活動で、開発活動だったのでいろいろ緊張したり、心配したりしましたが、いい仲間たちと活動することができ想像以外に楽しくてたまらなかったです。本当に今の仲間たちで幸いです。一緒に活動してくれたチーム「ゼロから始まる夏休み」の仲間たちと、インタビューに応じてくださった金井太一様に誠に感謝します。ありがとうございました！</p>
        ` }
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
    // 처음 열 때 애니메이션 없이 바로 보여주기
    popupPageWrapper.classList.remove('slide-left', 'slide-right');

    if (currentPage === 0) {
      // 1번째 페이지: 이미지, 이름, desc만 표시
      popupImage.style.display = 'block';
      popupName.style.display = 'block';
      popupDesc.style.display = 'block';
      popupComment.style.display = 'none';
      popupExtraContent.style.display = 'none';

      popupDesc.textContent = page.desc || '';
      popupComment.innerHTML = '';
      popupExtraContent.innerHTML = '';
    } else if (currentPage === 1) {
      // 2번째 페이지: desc + comment 표시
      popupImage.style.display = 'none';
      popupName.style.display = 'none';
      popupDesc.style.display = 'block';
      popupComment.style.display = 'block';
      popupExtraContent.style.display = 'none';

      popupDesc.innerHTML = page.desc || '';
      popupComment.innerHTML = page.comment || '';
      popupExtraContent.innerHTML = '';
    } else if (currentPage === 2) {
      // 3번째 페이지: desc + extraContent 둘 다 표시
      popupImage.style.display = 'none';
      popupName.style.display = 'none';
      popupDesc.style.display = 'block';       // desc 보이도록
      popupComment.style.display = 'none';
      popupExtraContent.style.display = 'block';

      popupDesc.innerHTML = page.desc || '';
      popupExtraContent.innerHTML = page.extraContent || '';
    }

    updateArrowVisibility();
    return;
  }

  // 페이지 전환 시 애니메이션 처리
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
      popupExtraContent.innerHTML = '';
    } else if (currentPage === 1) {
      popupImage.style.display = 'none';
      popupName.style.display = 'none';
      popupDesc.style.display = 'block';
      popupComment.style.display = 'block';
      popupExtraContent.style.display = 'none';

      popupDesc.innerHTML = page.desc || '';
      popupComment.innerHTML = page.comment || '';
      popupExtraContent.innerHTML = '';
    } else if (currentPage === 2) {
      popupImage.style.display = 'none';
      popupName.style.display = 'none';
      popupDesc.style.display = 'block';       // desc도 보여줌
      popupComment.style.display = 'none';
      popupExtraContent.style.display = 'block';

      popupDesc.innerHTML = page.desc || '';
      popupExtraContent.innerHTML = page.extraContent || '';
    }

    updateArrowVisibility();

    setTimeout(() => {
      popupPageWrapper.classList.remove('slide-left', 'slide-right');
    }, 400);
  }, 100);
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
//배경 아래 화살표
document.getElementById('scroll-arrow').addEventListener('click', function() {
    // 본문 영역의 시작 위치로 부드럽게 스크롤 (예: content-wrapper)
    const content = document.querySelector('.content-wrapper');
    content.scrollIntoView({ behavior: 'smooth' });
});
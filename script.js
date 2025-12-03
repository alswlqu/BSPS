/* ---------- DOM 준비 ---------- */
document.addEventListener("DOMContentLoaded", () => {

  /* 1. 각 사진별 설명을 적는 곳 */
  /*
    - key: HTML에서 img의 alt 값 (예: "3-1", "5-10", "10-23")
    - value: 화면에 띄우고 싶은 설명 문자열

    👉 예시
    "3-1": "3월 1일, 통영으로 떠났던 첫 현지조사 <예시 설명>",
  */
  const imageDescriptions = {
    // === 3월 예시 ===
    "3-1": "동기들과 카페에 갔는데 너무나도 눈에 띄는 포스트잇을 발견했다.",
    "3-2": "첫 현지조사와 문화유산반 단체 식사",
    "3-3" : "현지조사 총평 끝나고 경철쌤과 건이와 ^^*",
    "3-4": "현지조사 2일차, 광란의 밤 with 문인25",
    "3-5": "삼도수군통제영에서 (3박 4일 중 제일 재밌었음)",
    // 필요한 만큼 계속 추가하면 돼요.
    // "3-3": "3월 3번 사진 설명 ...",
    // ...

    // === 4월 예시 ===
    "4-1": "찬란 회식!!",
    "4-2": "청춘찬란",
    "4-3": "찬란의 문인들 ㅎㅎ (만취한 성빈이)",
    "4-4": "무슨 팟이었지?? 그래도 재밌었둠",
    "4-5": "헤헤",
    "4-6": "알바 유니폼 받았다!",
    "4-7": "찐 문인이 된 느낌",
    "4-8": "귀엽다 문인들",
    "4-9": "송쌤과 함께 ㅎㅎㅎ",
    // "4-1": "4월 1번 사진 설명 ...",

    // === 5월 예시 ===
    "5-1": "25학번 MT 끝나고 다같이!",
    "5-2": "고양이를 귀여워하는 애들을 귀여워하는 나",
    "5-3": "집 오는 지하철에서ㅎㅎ",
    "5-4": "기획국!!!!",
    "5-5": "대부도 가서 김치전 먹음",
    "5-6": "대부도 가서 칼국수 먹음",
    "5-7": "오랜만에 애들이랑 ㅎㅎ",
    "5-8": "너무너무 재밌었다",
    "5-9": "7.77초 맞추기 (8명 중에 아무도 못 함)",
    "5-10": "술 사주는 친구",
    "5-11": "재밌었다~~",
    "5-12": "찬란 LT 주루마블....",
    "5-13": "광기 어린 레크레이션 시간",
    "5-14": "찬란 미녀들",
    "5-15": "난.장.판.",
    "5-16": "유경언니가 그려주신 기획국 ㅎㅎ",
    "5-17": "문인 제일 수고 했다",
    "5-18": "유치! 찬란!",
    "5-19": "옷이 너무 귀여워서ㅎㅎ",
    "5-20": "유민이랑💖",
    "5-21": "작품명 <22일 8시>",
    "5-22": "교양 팀플인데, 팀 잘 만난 것 같다요~",
    "5-23": "모임이름 : 크될사 (크게 될 사람들)",
    "5-24": "유진이랑😍💞",
    "5-25": "쩐유진 ><",
    
    // === 6월
    "6-1": "들무새와 민속촌 나들이",
    "6-2": "들무새와 민속촌 나들이2",
    "6-3": "들무새와 민속촌 나들이3",
    "6-4": "너무 좋다, 믓찌다!!",
    "6-5": "귀요미들",
    "6-6": "들무새 알라부",
    "6-7": "넘 귀엽고",
    "6-8": "넘 멋지고",
    "6-9": "공연 잘 마무리 하자!",
    "6-10": "인초 마지막 수업 ㅠ",

    // === 7월
    "7-1": "민경이랑 심야데이뚜",
    "7-2": "오랜만에 만난 309",
    "7-3": "뚜레쥬르 알바생의 뚜쥬르 마을 방문기",
    "7-4": "비와서 아쉬웠음 ㅠ",
    "7-5": "명란소금빵 뚜레쥬르에서도 팔아줘!!",
    "7-6": "이게 진짜 개맛있음.",

    // === 8월
    "8-1": "윤희쓰, 나영쓰랑😍",
    "8-2": "오랜만에 서울랜드 갔듬!",
    "8-3": "귀욥",
    "8-4": "놀이공원 필수코스 = 회전목마 앞에서 사진찍기",
    "8-5": "레전드 구조조정",
    "8-6": "새로 나온 빵인데 넘 귀여움 but 맛은 잘...",
    "8-7": "민경이랑 일산 나들이",
    "8-8": "뀨",
    "8-9": "생일 꽃 받았따",
    
    // === 9월
    "9-1": "건, 유진과 세븐틴하츠페스티벌",
    "9-2": "귀욥징",
    "9-3": "너무 마음에 든다 ㅎㅎ",
    "9-4": "교반 짝사랑녀",
    "9-5": "교반무새",
    "9-6": "이렇게 먹고도 안 취함!",
    "9-7": "한강 처음 가봄😁👍",
    "9-8": "한강 + 치맥 = ❤️",
    "9-9": "날씨 너~~무 좋고",
    "9-10": "아빈쓰와💕",
    "9-11": "날이 너무 좋아서,",
    "9-12": "거리도 예쁘고,",
    "9-13": "모든게 완벽하다.",
    "9-14": "야고 너무 재밌구요~ // 개뿌듯함",
    "9-15": "김희재와 함께하는 현지조사",
    "9-17": "재밌게 다녀오겠습니다~",
    "9-18": "고창 도착",
    "9-19": "전통 의복 체험",
    "9-20": "읍성 너무 멋있따...",
    "9-21": "의복 체험 함께 해줘서 고마워요",
    "9-22": "떵쏘편 ('떵빈이가 쏘는 편의점'이란 뜻)",
    "9-23": "넘 조타",
    "9-24": "내가 사랑하는 나의 동기들 ^^*",
    "9-25": "문화반 단체사진",
    "9-26": "찬란 귀요미 부원들 회식~",
    "9-27": "개취함",
    
    // === 10월
    "10-1": "문과인의 밤 준비과정",
    "10-2": "주점팀 수고하셨습니다~",
    "10-3": "이거 개맛있었음 / 집에서 해먹을 정도",
    "10-4": "문과인의 밤 끝~!!",
    "10-5": "쭈영이랑💙",
    "10-6": "박상준, 박성은, 박은찬, 권민지, 권민경",
    "10-7": "최후의 만찬",
    "10-8": "민경이랑",
    "10-9": "쌍도 행님들 끝장냈다^^ (사실 내가 끝장남)",
    "10-10": "찡긋",
    "10-11": "민경아 꼭 에리카 와라.",
    "10-12": "시험기간 밤샘",
    "10-13": "넘 귀엽다",
    "10-14": "넘 귀엽다2",
    "10-15": "술 안 좋아하는 애들이랑 ㅎㅎ",
    "10-16": "재밌네 ㅎㅎ",
    "10-17": "짧고 굴게 잘 놀았따",
    "10-18": ">.<",
    "10-19": "건아 징이랑 잘 어울린다",
    "10-20": "무새들",
    "10-21": "건한영과",
    "10-22": "꽃보다 남자...?들",
    "10-23": "생각보다 재밌었다. 막 그렇게 안 무서움",
    "10-24": "오랜만에 뚜빈, 정히랑💗",
    "10-25": "김치볶음밥 맛있었듬",
    "10-26": "이거 소스가 진짜 개맛도리",
    "10-27": "전유진이 닮았다고 보여줌 ㅡㅡ",
    "10-28": "전유진 조아~",
    "10-29": "교반 짝사랑녀",
    "10-30": "갑분 동탄",
    "10-31": "근데 예쁨",
    "10-32": "동탄드라이브팟",
    "10-33": "떵빈쓰",
    "10-34": "떵빈쓰22",
    "10-35": "에리카에 온 걸 환영해 얘들아",
    "10-36": "키힣",
    "10-37": "놀랍게도 술 한 모금도 안 먹음.",
    "10-38": "내가 제일 사랑하는 치킨😍",
    "10-39": "기획 체고 ㅎㅎㅎ",
    "10-40": "준성쓰, 성빈쓰",
    "10-41": "찬유야 잘 다녀와 ㅋ",
  };
  /* 
    ※ 설명을 넣고 싶은 사진의 alt 값을 확인해서
       위 객체에 "alt값": "설명" 형식으로 추가해 주세요.
       (설명이 없는 사진은 기본 문구가 자동으로 뜹니다.)
  */

  const header = document.querySelector("header.site-header");
  const cover = document.getElementById("cover");
  const startBtn = document.getElementById("startBtn");
  const gridSection = document.getElementById("gridSection");
  const monthCards = document.querySelectorAll(".month-card");
  const galleries = document.querySelectorAll(".month-gallery");
  const logoBtn = document.getElementById("logoBtn");

  /* start 버튼 클릭 -> 커버 숨기고 그리드 보이기 */
  if (startBtn) {
    startBtn.addEventListener("click", () => {
      cover.classList.add("hidden");
      gridSection.classList.remove("hidden");
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* 로고(복세편살) 클릭 -> 처음 화면으로 돌아가기 */
  if (logoBtn) {
    logoBtn.addEventListener("click", () => {
      closeActiveGallery(); // 열려 있는 갤러리 닫기
      cover.classList.remove("hidden");
      gridSection.classList.add("hidden");
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* 스크롤 시 헤더 스타일 변경 */
  window.addEventListener("scroll", () => {
    if (window.scrollY > 20) header.classList.add("scrolled");
    else header.classList.remove("scrolled");
  });

  /* 현재 열려 있는 갤러리 관리 */
  let activeGallery = null;

  function openGallery(month) {
    closeActiveGallery();

    const gallery = document.getElementById(`gallery-${month}`);
    if (!gallery) {
      console.warn("해당 월 갤러리가 없습니다:", month);
      return;
    }

    gallery.classList.remove("hidden");
    gallery.setAttribute("aria-hidden", "false");
    activeGallery = gallery;

    const viewer = gallery.querySelector(".image-viewer");
    const viewerImg = viewer ? viewer.querySelector("img") : null;
    const desc = gallery.querySelector(".image-desc");

    if (viewer && viewerImg) {
      viewerImg.src = "";
      viewer.classList.add("hidden");
    }
    if (desc) {
      desc.textContent = "이미지를 클릭하면 설명이 나옵니다.";
      desc.classList.add("hidden");
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function closeActiveGallery() {
    if (!activeGallery) return;

    const viewer = activeGallery.querySelector(".image-viewer");
    const viewerImg = viewer ? viewer.querySelector("img") : null;
    const desc = activeGallery.querySelector(".image-desc");

    if (viewer && viewerImg) {
      viewerImg.src = "";
      viewer.classList.add("hidden");
    }
    if (desc) {
      desc.textContent = "이미지를 클릭하면 설명이 나옵니다.";
      desc.classList.add("hidden");
    }

    activeGallery.classList.add("hidden");
    activeGallery.setAttribute("aria-hidden", "true");
    activeGallery = null;
  }

  /* 각 갤러리에 썸네일 그리드 + 큰 이미지 뷰어 + 설명 만들기 */
  galleries.forEach(gallery => {
    const slides = gallery.querySelector(".slides");
    const slideImgs = slides ? slides.querySelectorAll("img") : [];

    // 기존 슬라이더는 데이터용으로만 사용 → 화면에서는 숨김
    const slider = gallery.querySelector(".slider");
    if (slider) {
      slider.classList.add("hidden");
    }

    const month = gallery.dataset.month || "";

    // 큰 이미지 뷰어
    const viewer = document.createElement("div");
    viewer.className = "image-viewer hidden";

    const viewerImg = document.createElement("img");
    viewerImg.alt = "선택된 사진 크게 보기";
    viewer.appendChild(viewerImg);

    // 한 줄 설명
    const desc = document.createElement("div");
    desc.className = "image-desc hidden";
    desc.textContent = "이미지를 클릭하면 설명이 나옵니다.";

    // 썸네일 그리드
    const grid = document.createElement("div");
    grid.className = "image-grid";

    slideImgs.forEach((img, index) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "thumb-item";

      const thumbImg = img.cloneNode();
      thumbImg.removeAttribute("style");
      btn.appendChild(thumbImg);

      // 썸네일 클릭 시 -> 큰 이미지 + 설명 표시
      btn.addEventListener("click", () => {
        const altText = img.alt || "";
        const key = altText || `${month}-${index + 1}`;

        viewerImg.src = img.src;
        viewerImg.alt = altText || `사진 ${index + 1}`;
        viewer.classList.remove("hidden");

        const customDesc = imageDescriptions[key];

        if (customDesc) {
          // imageDescriptions에 정의된 설명
          desc.textContent = customDesc;
        } else {
          // 설명이 아직 없을 때 뜨는 기본 문구
          desc.textContent = `${key} 사진의 설명을 script.js의 imageDescriptions 객체에 추가해 주세요. <예시 설명>`;
        }
        desc.classList.remove("hidden");
      });

      grid.appendChild(btn);
    });

    // LP + 유튜브 영역 위치 기준으로 요소 배치
    const videoWrapper = gallery.querySelector(".video-lp");

    if (videoWrapper) {
      // viewer, desc는 LP 영역 위에
      gallery.insertBefore(viewer, videoWrapper);
      gallery.insertBefore(desc, videoWrapper);

      // 썸네일 그리드는 LP 영역 아래에
      if (videoWrapper.nextSibling) {
        gallery.insertBefore(grid, videoWrapper.nextSibling);
      } else {
        gallery.appendChild(grid);
      }
    } else {
      // 영상 박스가 없는 갤러리는 그냥 순서대로 추가
      gallery.appendChild(viewer);
      gallery.appendChild(desc);
      gallery.appendChild(grid);
    }
  });

  /* 월 카드 클릭 시 해당 월 갤러리 열기 */
  monthCards.forEach(card => {
    card.addEventListener("click", () => {
      const month = card.getAttribute("data-month");
      openGallery(month);
    });

    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        card.click();
      }
    });
  });

  /* 각 갤러리의 닫기버튼 + 바깥 클릭 시 닫기 */
  galleries.forEach(g => {
    const closeBtn = g.querySelector(".close-gallery");
    if (closeBtn) {
      closeBtn.addEventListener("click", closeActiveGallery);
    }

    g.addEventListener("click", (e) => {
      if (e.target === g) {
        closeActiveGallery();
      }
    });
  });

  /* ESC 키로 갤러리 닫기 */
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeActiveGallery();
    }
  });

});

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
    "3-1": "3월 1번 사진에 대한 설명을 여기에 적어 주세요. <예시 설명>",
    "3-2": "3월 2번 사진에 대한 설명을 여기에 적어 주세요. <예시 설명>",
    "3-2": "3월 2번 사진에 대한 설명을 여기에 적어 주세요. <예시 설명>",
    "3-2": "3월 2번 사진에 대한 설명을 여기에 적어 주세요. <예시 설명>",
    "3-2": "3월 2번 사진에 대한 설명을 여기에 적어 주세요. <예시 설명>",
    "3-2": "3월 2번 사진에 대한 설명을 여기에 적어 주세요. <예시 설명>",
    // 필요한 만큼 계속 추가하면 돼요.
    // "3-3": "3월 3번 사진 설명 ...",
    // ...

    // === 4월 예시 ===
    "4-1": "3월 2번 사진에 대한 설명을 여기에 적어 주세요. <예시 설명>",
    // "4-1": "4월 1번 사진 설명 ...",

    // === 5월 예시 ===
    // "5-1": "5월 1번 사진 설명 ...",

    // === 9월, 10월처럼 사진이 많은 달도 alt값 기준으로 자유롭게 추가 ===
    // "9-15": "9월 15번 사진 설명 ...",
    // "10-23": "10월 23번 사진 설명 ...",
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

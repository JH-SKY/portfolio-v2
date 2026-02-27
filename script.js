// ====== 스크롤 클릭 ======
const scrollIndicator = document.querySelector(".scroll-indicator");
if (scrollIndicator)
  scrollIndicator.addEventListener("click", () => {
    document.querySelector("#about").scrollIntoView({ behavior: "smooth" });
  });

// ====== 타이핑 로직 ======
const texts = [
  "안녕하세요! 반갑습니다.",
  "함께 일하고 싶은 동료가 되고 싶습니다!",
  "잘 부탁드립니다!",
];

const dynamicText = document.getElementById("dynamic-text");

let textIndex = 0;
let charIndex = 0;
let typingStarted = false;

function typeText() {
  if (!dynamicText) return;

  if (charIndex < texts[textIndex].length) {
    dynamicText.textContent += texts[textIndex].charAt(charIndex);
    charIndex++;
    setTimeout(typeText, 42);
  } else {
    setTimeout(eraseText, 1300);
  }
}

function eraseText() {
  if (!dynamicText) return;

  if (charIndex > 0) {
    dynamicText.textContent = texts[textIndex].substring(0, charIndex - 1);
    charIndex--;
    setTimeout(eraseText, 18);
  } else {
    textIndex = (textIndex + 1) % texts.length;
    setTimeout(typeText, 450);
  }
}

// ====== 히어로 로드 애니메이션 (왼쪽 -> 타이핑 순서) ======
window.addEventListener("load", () => {
  // 왼쪽 reveal
  document
    .querySelectorAll(".reveal, .reveal-line")
    .forEach((el) => el.classList.add("active"));

  // 타이핑 박스 등장
  setTimeout(() => {
    const typingWrap = document.querySelector(".reveal-typing");
    if (typingWrap) typingWrap.classList.add("active");
  }, 1700);

  // 타이핑 시작
  setTimeout(() => {
    typingStarted = true;
    typeText();
  }, 2600);
});

// ====== About 섹션 스크롤 등장 ======
const fadeElements = document.querySelectorAll(".fade-up");
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add("active");
    });
  },
  { threshold: 0.2 },
);

fadeElements.forEach((el) => observer.observe(el));

// ====== 패럴랙스 (미세하게, 고급스럽게) ======
const hero = document.querySelector(".hero");
const heroMain = document.querySelector(".hero-main");
const heroTyping = document.querySelector(".hero-typing");

let ticking = false;

function onScroll() {
  if (!hero || !heroMain) return;

  const y = window.scrollY || 0;
  const max = Math.min(y, window.innerHeight); // 과도한 이동 방지

  // 아주 미세한 이동만 (티 안 나게)
  const mainShift = max * 0.06; // 타이틀 블록
  const typingShift = max * 0.09; // 타이핑 박스는 조금 더

  heroMain.style.transform = `translateY(${mainShift}px)`;
  if (heroTyping) heroTyping.style.transform = `translateY(${typingShift}px)`;

  ticking = false;
}

window.addEventListener(
  "scroll",
  () => {
    if (!ticking) {
      window.requestAnimationFrame(onScroll);
      ticking = true;
    }
  },
  { passive: true },
);

// ====== 마우스 글로우 추적 ======
const glow = document.querySelector(".mouse-glow");

window.addEventListener("mousemove", (e) => {
  glow.style.left = e.clientX + "px";
  glow.style.top = e.clientY + "px";
});

document.addEventListener("DOMContentLoaded", () => {
  const faqItems = document.querySelectorAll(".faq-item");

  // 초기화: 열림 상태(is-open)와 높이만 리셋 (active는 건드리지 않음)
  faqItems.forEach(item => {
    item.classList.remove("is-open"); 
    const ans = item.querySelector(".faq-answer");
    if (ans) ans.style.height = "0";
  });

  faqItems.forEach((item) => {
    const question = item.querySelector(".faq-question");
    const answer = item.querySelector(".faq-answer");

    question.addEventListener("click", () => {
      const isOpen = item.classList.contains("is-open");

      // 모든 문항 닫기
      faqItems.forEach((el) => {
        el.classList.remove("is-open");
        el.querySelector(".faq-answer").style.height = "0";
      });

      // 클릭한 것만 열기
      if (!isOpen) {
        item.classList.add("is-open");
        const scrollH = answer.querySelector("div").scrollHeight;
        answer.style.height = scrollH + "px";
      }
    });
  });
});

// ===== SUPREME NAV FIXED =====
document.addEventListener("DOMContentLoaded", () => {
  const nav = document.querySelector(".supreme-nav");
  const items = document.querySelectorAll(".supreme-nav li");
  const sections = document.querySelectorAll("section");

  if (!nav) return;

  // 네비 등장 로직
  window.addEventListener("scroll", () => {
    const heroHeight = window.innerHeight * 0.6;
    if (window.scrollY > heroHeight) {
      nav.classList.add("show");
    } else {
      nav.classList.remove("show");
    }
  });

  // 섹션 감지 (IntersectionObserver 사용)
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;

          items.forEach(item => {
            item.classList.remove("active");
            if (item.dataset.target === id) {
              item.classList.add("active");
            }
          });
        }
      });
    },
    {
      threshold: 0.6 // 화면의 60% 이상 보이면 활성화
    }
  );

  sections.forEach(section => observer.observe(section));

  // 클릭 이동
  items.forEach(item => {
    item.addEventListener("click", () => {
      const target = document.getElementById(item.dataset.target);
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    });
  });
});
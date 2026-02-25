// ====== 스크롤 클릭 ======
const scrollIndicator = document.querySelector(".scroll-indicator");
if (scrollIndicator) scrollIndicator.addEventListener("click", () => {
  document.querySelector("#about").scrollIntoView({ behavior: "smooth" });
});

// ====== 타이핑 로직 ======
const texts = [
  "사용자 경험을 최우선으로 설계합니다.",
  "백엔드와 프론트를 연결하는 개발자입니다.",
  "문제를 구조로 풀어내는 것을 좋아합니다."
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
  document.querySelectorAll(".reveal, .reveal-line").forEach(el => el.classList.add("active"));

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
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add("active");
  });
}, { threshold: 0.2 });

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
  const mainShift = max * 0.06;   // 타이틀 블록
  const typingShift = max * 0.09; // 타이핑 박스는 조금 더

  heroMain.style.transform = `translateY(${mainShift}px)`;
  if (heroTyping) heroTyping.style.transform = `translateY(${typingShift}px)`;

  ticking = false;
}

window.addEventListener("scroll", () => {
  if (!ticking) {
    window.requestAnimationFrame(onScroll);
    ticking = true;
  }
}, { passive: true });

// ====== 마우스 글로우 추적 ======
const glow = document.querySelector(".mouse-glow");

window.addEventListener("mousemove", (e) => {
  glow.style.left = e.clientX + "px";
  glow.style.top = e.clientY + "px";
});
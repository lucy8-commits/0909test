// 실제 이메일 주소를 입력하면 Contact 버튼이 자동으로 활성화됩니다.
const CONTACT_EMAIL = "";

const header = document.querySelector(".site-header");
const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".primary-nav");
const navLinks = [...document.querySelectorAll('.primary-nav a[href^="#"]')];
const sectionElements = [...document.querySelectorAll("[data-section]")];
const progressBar = document.querySelector(".reading-progress span");
const emailButton = document.querySelector("#email-button");
const emailText = document.querySelector("#contact-email");

const closeMenu = () => {
  navigation.classList.remove("open");
  menuButton.setAttribute("aria-expanded", "false");
  menuButton.setAttribute("aria-label", "메뉴 열기");
  document.body.classList.remove("menu-open");
};

menuButton.addEventListener("click", () => {
  const isOpen = menuButton.getAttribute("aria-expanded") === "true";
  if (isOpen) {
    closeMenu();
    return;
  }
  navigation.classList.add("open");
  menuButton.setAttribute("aria-expanded", "true");
  menuButton.setAttribute("aria-label", "메뉴 닫기");
  document.body.classList.add("menu-open");
});

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    const target = document.querySelector(link.getAttribute("href"));
    if (!target) return;
    event.preventDefault();
    closeMenu();
    const headerOffset = header.offsetHeight;
    const targetTop = target.getBoundingClientRect().top + window.scrollY - headerOffset;
    window.scrollTo({ top: targetTop, behavior: "smooth" });
  });
});

const sectionObserver = new IntersectionObserver(
  (entries) => {
    const visible = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
    if (!visible) return;
    const currentId = visible.target.dataset.section;
    navLinks.forEach((link) => {
      const isCurrent = link.getAttribute("href") === `#${currentId}`;
      link.classList.toggle("active", isCurrent);
      if (isCurrent) link.setAttribute("aria-current", "page");
      else link.removeAttribute("aria-current");
    });
  },
  { rootMargin: "-28% 0px -60%", threshold: [0.05, 0.2, 0.5] }
);

sectionElements.forEach((section) => sectionObserver.observe(section));

const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));

const updateScrollProgress = () => {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const progress = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
  progressBar.style.width = `${Math.min(100, Math.max(0, progress))}%`;
};

window.addEventListener("scroll", updateScrollProgress, { passive: true });
window.addEventListener("resize", () => {
  if (window.innerWidth > 1060) closeMenu();
  updateScrollProgress();
});

if (CONTACT_EMAIL) {
  emailText.textContent = CONTACT_EMAIL;
  emailButton.disabled = false;
  emailButton.addEventListener("click", () => {
    window.location.href = `mailto:${CONTACT_EMAIL}`;
  });
}

document.querySelector("#current-year").textContent = new Date().getFullYear();
updateScrollProgress();

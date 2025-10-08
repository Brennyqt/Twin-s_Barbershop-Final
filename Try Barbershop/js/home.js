// ===== FADE-IN EFFECT =====
const animatedElements = document.querySelectorAll(".fade-in");
const appearOptions = { threshold: 0.2 };

const appearOnScroll = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add("visible");
    observer.unobserve(entry.target);
  });
}, appearOptions);

animatedElements.forEach(el => appearOnScroll.observe(el));

// ===== LOGO SLIDER AUTO-LOOP =====
const logoImages = document.querySelectorAll(".logo-slider img");
let currentLogo = 0;

function changeLogo() {
  logoImages[currentLogo].classList.remove("active");
  currentLogo = (currentLogo + 1) % logoImages.length;
  logoImages[currentLogo].classList.add("active");
}

setInterval(changeLogo, 5000);

// ===== SERVICES SLIDER AUTO-LOOP =====
const serviceSlides = document.querySelectorAll(".service-slide");
let currentService = 0;

function showServiceSlide(index) {
  serviceSlides.forEach((slide, i) => {
    slide.style.transform = `translateX(${100 * (i - index)}%)`;
  });
  currentService = index;
}

showServiceSlide(0);

setInterval(() => {
  let next = (currentService + 1) % serviceSlides.length;
  showServiceSlide(next);
}, 5000);

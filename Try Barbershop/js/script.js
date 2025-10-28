// DI NA TO KASAMA SA WEBSITE PERO ANDITO SYA SA LOOB NG FILE

const slides = document.querySelectorAll(".promo-slide");
const indicators = document.querySelectorAll("#promo-indicators span");

let currentIndex = 0;
let slideInterval = setInterval(nextSlide, 3000);

function nextSlide() {
  slides[currentIndex].classList.remove("active");
  indicators[currentIndex].classList.remove("active");
  currentIndex = (currentIndex + 1) % slides.length;
  slides[currentIndex].classList.add("active");
  indicators[currentIndex].classList.add("active");
}

indicators.forEach((indicator, index) => {
  indicator.addEventListener("click", () => {
    clearInterval(slideInterval);
    slides[currentIndex].classList.remove("active");
    indicators[currentIndex].classList.remove("active");
    currentIndex = index;
    slides[currentIndex].classList.add("active");
    indicators[currentIndex].classList.add("active");
    slideInterval = setInterval(nextSlide, 3000);
  });
});

const fadeEls = document.querySelectorAll(".fade-in");
window.addEventListener("scroll", () => {
  fadeEls.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 50) {
      el.classList.add("visible");
    }
  });
});

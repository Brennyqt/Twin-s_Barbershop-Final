// === Scroll animations (fade-in) ===
const animatedElements = document.querySelectorAll(".fade-in");

const appearOptions = { threshold: 0.2 };

const appearOnScroll = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add("visible");
    observer.unobserve(entry.target);
  });
}, appearOptions);

animatedElements.forEach((el) => {
  appearOnScroll.observe(el);
});

// === Promo Slider ===
const slides = document.querySelectorAll(".promo-slide");
const dotsContainer = document.getElementById("promo-indicators");
const slider = document.getElementById("promo-slider");
let currentSlide = 0;
let startX = 0;
let currentX = 0;
let isDragging = false;
let autoSlideInterval;

// Create dots
slides.forEach((_, i) => {
  const dot = document.createElement("span");
  if (i === 0) dot.classList.add("active");
  dotsContainer.appendChild(dot);
});

const dots = dotsContainer.querySelectorAll("span");

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.style.transform = `translateX(${100 * (i - index)}%)`;
    slide.style.transition = "transform 0.45s ease";
  });

  dots.forEach((dot) => dot.classList.remove("active"));
  dots[index].classList.add("active");
  currentSlide = index;
}

function startAutoSlide() {
  autoSlideInterval = setInterval(() => {
    let next = (currentSlide + 1) % slides.length;
    showSlide(next);
  }, 4000);
}

function resetAutoSlide() {
  clearInterval(autoSlideInterval);
  startAutoSlide();
}

// Init
showSlide(0);
startAutoSlide();

// Dots click
dots.forEach((dot, i) => {
  dot.addEventListener("click", () => {
    showSlide(i);
    resetAutoSlide();
  });
});

// Drag & Swipe
slider.addEventListener("mousedown", (e) => {
  isDragging = true;
  startX = e.pageX;
  clearInterval(autoSlideInterval);
});

slider.addEventListener("mousemove", (e) => {
  if (!isDragging) return;
  currentX = e.pageX;
  let diff = currentX - startX;

  slides.forEach((slide, i) => {
    slide.style.transition = "none";
    slide.style.transform = `translateX(${100 * (i - currentSlide) + (diff / slider.offsetWidth) * 100}%)`;
  });
});

slider.addEventListener("mouseup", (e) => {
  if (!isDragging) return;
  isDragging = false;
  let diff = e.pageX - startX;

  if (diff > 50 && currentSlide > 0) {
    showSlide(currentSlide - 1);
  } else if (diff < -50 && currentSlide < slides.length - 1) {
    showSlide(currentSlide + 1);
  } else {
    showSlide(currentSlide);
  }
  resetAutoSlide();
});

// Touch support
slider.addEventListener("touchstart", (e) => {
  isDragging = true;
  startX = e.touches[0].clientX;
  clearInterval(autoSlideInterval);
});

slider.addEventListener("touchmove", (e) => {
  if (!isDragging) return;
  currentX = e.touches[0].clientX;
  let diff = currentX - startX;

  slides.forEach((slide, i) => {
    slide.style.transition = "none";
    slide.style.transform = `translateX(${100 * (i - currentSlide) + (diff / slider.offsetWidth) * 100}%)`;
  });
});

slider.addEventListener("touchend", (e) => {
  if (!isDragging) return;
  isDragging = false;
  let diff = e.changedTouches[0].clientX - startX;

  if (diff > 50 && currentSlide > 0) {
    showSlide(currentSlide - 1);
  } else if (diff < -50 && currentSlide < slides.length - 1) {
    showSlide(currentSlide + 1);
  } else {
    showSlide(currentSlide);
  }
  resetAutoSlide();
});

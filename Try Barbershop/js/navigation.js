function showPage(pageId) {
  document.querySelectorAll(".page").forEach(p => p.classList.add("hidden"));
  document.getElementById(pageId).classList.remove("hidden");
}

function goToServices(event) {
  if (event) event.preventDefault();
  showPage("servicesPage");
}

function goToAbout(event) {
  if (event) event.preventDefault();
  showPage("aboutPage");
}

function goToPricing(event) {
  if (event) event.preventDefault();
  showPage("pricingPage");
}

function goBack(toPage) {
  showPage(toPage);
}

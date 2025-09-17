function showPricingSample(service) {
  const sampleDiv = document.getElementById('pricingSample');
  const samples = serviceSamples[service] || [];

  if (samples.length === 0) {
    sampleDiv.innerHTML = "<p>No samples available.</p>";
    return;
  }

function viewSample(service) {
    // hide all other sample images first
    document.querySelectorAll('.sample-image').forEach(div => div.style.display = 'none');

    // show selected service sample
    const sampleDiv = document.getElementById(service + '-sample');

    // set background image for each service
    let imgUrl = '';
    switch(service){
        case 'Haircut': imgUrl = 'cl1.1.jpg'; break;
        case 'Rebond': imgUrl = 'assets/images/rebond.jpg'; break;
        case 'Massage': imgUrl = 'assets/images/massage.jpg'; break;
        case 'Tattoo': imgUrl = 'assets/images/tattoo.jpg'; break;
    }

    sampleDiv.style.backgroundImage = `url('${imgUrl}')`;
    sampleDiv.style.display = 'block';
}

  sampleDiv.innerHTML = samples.map(sample => `
    <div class="sample-item">
      <img src="${sample.url}" alt="${sample.label}">
      <p>${sample.label}</p>
    </div>
  `).join("");

  selectedService = service;
  const reserveBtn = document.getElementById('reserveFromPricing');
  reserveBtn.classList.remove('hidden');
  reserveBtn.textContent = `Reserve ${service}`;
}

function reserveFromPricing() {
  showPage('servicesPage');
  chooseService(selectedService);
  document.getElementById('servicesPage').scrollIntoView({ behavior: 'smooth' });
}

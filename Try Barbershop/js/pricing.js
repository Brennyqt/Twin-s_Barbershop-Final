const serviceSamples = {
  haircut: [
    { url: '../cl1.1.jpg', label: 'Classic Haircut' },
    { url: '../cl2.jpg', label: 'Modern Haircut' },
    { url: '../cl3.jpg', label: 'Layered Haircut' },
    { url: '../vcut.jpg', label: 'Burst Fade' }
  ],
  rebond: [
    { url: '../reb1.jpg', label: 'Straight Rebond' },
    { url: '../reb2.jpg', label: 'Smooth Rebond' }
  ],
  massage: [
    { url: '../msg1.jpg', label: 'Relaxing Massage' }
  ],
  tattoo: [
    { url: '../tats1.jpg', label: 'Small Tattoo' },
    { url: '../tats2.jpg', label: 'Medium Tattoo' },
    { url: '../tats3.jpg', label: 'Large Tattoo' }
  ]
};



function viewSample(service) {
  const sampleDiv = document.getElementById(service + "-sample");
  const samples = serviceSamples[service] || [];

  // toggle
  if (sampleDiv.classList.contains("active")) {
    sampleDiv.innerHTML = "";
    sampleDiv.classList.remove("active");
    return;
  }

  sampleDiv.innerHTML = "";

  if (samples.length > 0) {
    samples.forEach(sample => {
      const img = document.createElement("img");
      img.src = sample.url;
      img.alt = sample.label;
      img.title = sample.label;
      img.style.width = "120px";
      img.style.borderRadius = "8px";
      img.style.boxShadow = "0 2px 6px rgba(0,0,0,0.3)";
      sampleDiv.appendChild(img);
    });
    sampleDiv.classList.add("active");
  } else {
    sampleDiv.innerHTML = `<p>No samples available</p>`;
    sampleDiv.classList.add("active");
  }
  
}

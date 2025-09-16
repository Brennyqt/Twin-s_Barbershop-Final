let selectedService = "";
let loggedInUser = "";

// PAGE SWITCH
function showPage(pageId) {
  document.querySelectorAll(".page").forEach(p => p.classList.add("hidden"));
  document.getElementById(pageId).classList.remove("hidden");
}

// LOGIN 
function login() {
  let email = document.getElementById("loginEmail").value.trim();
  if(!email.endsWith("@gmail.com")) { alert("Only Gmail accounts are allowed."); return; }
  loggedInUser = email;
  document.getElementById("welcomeUser").innerText = "Welcome, " + loggedInUser;
  document.getElementById("topNav").classList.remove("hidden");
  showPage("dashboardPage");
  
  
}

// LOGOUT
function logout(event) {
  if(event) event.preventDefault();
  loggedInUser = "";
  document.getElementById("topNav").classList.add("hidden");
  showPage("loginPage");
  
}

// NAVIGATION 
function goToServices(event) { 
  if(event) event.preventDefault(); showPage("servicesPage"); 
}
function goToAbout(event) {
   if(event) event.preventDefault(); showPage("aboutPage"); 
}
function goBack(toPage) { showPage(toPage); } 
function goToPricing(event) {
  if(event) event.preventDefault(); showPage("pricingPage");
}

// SERVICE SAMPLES 
const serviceSamples = {
  Haircut: [
    { url:'cl1.1.jpg', label:'Classic Haircut' },
    { url:'cl2.jpg', label:'Modern Haircut' },
    { url:'cl1.jpg', label:'Layered Haircut' },
    { url:'vcut.jpg', label:'burst fade pa rin to ya?' }
  ],
  Rebond: [
    { url:'reb1.jpg', label:'Straight Rebond' },
    { url:'reb2.jpg', label:'Smooth Rebond' }
  ],
  Massage: [
    { url:'msg.1.jpg', label:'Relaxing Massage' }
  ],
  Tattoo: [
    { url:'tats1.jpg', label:'Small Tattoo' },
    { url:'tats2.jpg', label:'Medium Tattoo' },
    { url:'tats3.jpg', label:'Large Tattoo' }
  ]
};

// PRICING PAGE: SHOW SAMPLES 
function showPricingSample(service) {
  const sampleDiv = document.getElementById('pricingSample');
  const samples = serviceSamples[service] || [];

  if(samples.length === 0){
    sampleDiv.innerHTML = "<p>No samples available.</p>";
    return;
  }

  let content = '';
  samples.forEach(sample => {
    content += `
      <div class="sample-item">
        <img src="${sample.url}" alt="${sample.label}">
        <p>${sample.label}</p>
      </div>
    `;
  });

  sampleDiv.innerHTML = content;

  // Show Reserve button
  selectedService = service;
  const reserveBtn = document.getElementById('reserveFromPricing');
  reserveBtn.classList.remove('hidden');
  reserveBtn.textContent = `Reserve ${service}`;
}

// PRICING PAGE: RESERVE BUTTON 
function reserveFromPricing() {
  showPage('servicesPage');
  chooseService(selectedService); // automatically selects service on Services page
  // Scroll to Services card for better UX
  document.getElementById('servicesPage').scrollIntoView({ behavior: 'smooth' });
}

// SERVICE RESERVATION 
function chooseService(service) {
  selectedService = service;
  document.getElementById("chosenService").innerText = "Service: " + selectedService;
  document.getElementById("resDate").value = "";
  document.getElementById("resTime").value = "";
  document.getElementById("paymentMethod").value = "";
  hidePaymentDetails();
  showPage("reservationPage");
}

// PAYMENT 
function showPaymentDetails() {
  const method = document.getElementById("paymentMethod").value;
  const details = document.getElementById("paymentDetails");
  const number = document.getElementById("paymentNumber");
  const qr = document.getElementById("qrCode");

  if(method === "GCash") {
    details.classList.remove("hidden");
    number.innerHTML = "GCash Number: 0992 010 5004<br>Enter the reference number here: <input type='text' id='refNumber'>";
    qr.src = "qr.jpg"; 
    qr.classList.remove("hidden");
  } else if(method === "Maya") {
    details.classList.remove("hidden");
    number.innerHTML = "Maya Number: 09876543210<br>Enter the reference number here: <input type='text' id='refNumber'>";
    qr.src = "qrr.jpg";
    qr.classList.add("hidden");
  } else {
    hidePaymentDetails();
  }
}

function hidePaymentDetails() {
  document.getElementById("paymentDetails").classList.add("hidden");
  document.getElementById("paymentNumber").innerHTML = "";
  document.getElementById("qrCode").classList.add("hidden");
}

// RESERVATION
function registerReservation() {
  const date = document.getElementById("resDate").value;
  const time = document.getElementById("resTime").value;
  const payment = document.getElementById("paymentMethod").value;

  if(!date || !time || !payment){ alert("Please fill all fields."); return; }

  const selectedDateTime = new Date(date + "T" + time);
  const now = new Date();

  if(selectedDateTime < now){
    alert("You cannot book for past dates or past time.");
    return;
  }

  const hour = selectedDateTime.getHours();
  const minutes = selectedDateTime.getMinutes();
  if(hour < 9 || hour > 22 || (hour === 22 && minutes > 59)){
    alert("Shop is open from 9:00 AM to 11:00 PM only.");
    return;
  }

  let ref = document.getElementById("refNumber") ? document.getElementById("refNumber").value : "";
  if((payment === "GCash" || payment === "Maya") && !ref){ alert("Please enter the reference number for your payment."); return; }

  const confirmationText = `
Name: ${loggedInUser}
Service: ${selectedService}
Date: ${date}
Time: ${time}
Payment Method: ${payment}
Reference Number: ${ref}
  `;

  document.getElementById("confirmDetails").innerText = confirmationText;
  showPage("confirmationPage");
}

// RESTART 
function restart() { showPage("dashboardPage"); }

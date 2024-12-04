/* script.js */

let currentIndex = parseInt(localStorage.getItem('currentIndex')) || 0;

function rotateContent() {
  const iframe = document.getElementById('content-frame');
  iframe.src = config.urls[currentIndex];

  currentIndex = (currentIndex + 1) % config.urls.length;
  localStorage.setItem('currentIndex', currentIndex);
}

function updateTime() {
  const timeElement = document.getElementById('current-time');
  const now = new Date();

  // Get hours, minutes, and seconds
  let hours = now.getHours(); // 0-23
  let minutes = now.getMinutes();
  let seconds = now.getSeconds();

  // Pad with leading zeros if needed
  hours = hours < 10 ? '0' + hours : hours;
  minutes = minutes < 10 ? '0' + minutes : minutes;
  seconds = seconds < 10 ? '0' + seconds : seconds;

  // Construct the military time string
  const militaryTime = `${hours}:${minutes}:${seconds}`;

  timeElement.textContent = militaryTime;
}

// Initialize Vanta.js effect
let vantaEffect;

function initVanta() {
  vantaEffect = VANTA.NET({
    el: "#vanta-bg",
    mouseControls: true,
    touchControls: true,
    gyroControls: false,
    minHeight: 0.00,
    minWidth: 0.00,
    scale: 1.00,
    scaleMobile: 1.00,
    points: 20.00,
    maxDistance: 25.00,
    spacing: 15.00,
    color: 0x687656,       // Line color matching lime green
    backgroundColor: 0x0C241F, // Background color matching teal green
  });
}

window.onload = () => {
  rotateContent();
  setInterval(rotateContent, config.rotationInterval);

  updateTime();
  setInterval(updateTime, 1000);

  initVanta();

  // Automatically refresh the page every 60 seconds
  setInterval(() => {
    location.reload();
  }, 60000); // 60000 milliseconds = 60 seconds
};

// Clean up Vanta.js on window unload
window.onbeforeunload = () => {
  if (vantaEffect) vantaEffect.destroy();
};

// Handle window resize
window.addEventListener('resize', () => {
  if (vantaEffect) {
    vantaEffect.resize();
  }
});
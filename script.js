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
  const options = {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  };
  timeElement.textContent = now.toLocaleTimeString([], options);
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
    points: 14.00,
    maxDistance: 22.00,
    spacing: 18.00,
    color: 0x89964e,       // Line color matching lime green
    backgroundColor: 0x002222, // Background color matching teal green
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
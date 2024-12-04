let currentIndex = 0;

function rotateContent() {
  const iframe = document.getElementById('content-frame');
  iframe.src = config.urls[currentIndex];

  currentIndex = (currentIndex + 1) % config.urls.length;
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
  vantaEffect = VANTA.TOPOLOGY({
    el: "#header-bar",
    color: 0x89964e,        // Line color matching lime green
    backgroundColor: 0x2222, // Background color matching teal green
    mouseControls: true,
    touchControls: true,
    gyroControls: false,
    minHeight: 200.00,
    minWidth: 200.00,
    scale: 1.00,
    scaleMobile: 1.00,
    // Additional customization options
    points: 15.0,           // Number of points
    spacing: 20.0,          // Spacing between points
    showDots: true,         // Display dots at points
    showLines: true,        // Display lines between points
  });
}

window.onload = () => {
  rotateContent();
  setInterval(rotateContent, config.rotationInterval);

  updateTime();
  setInterval(updateTime, 1000);

  initVanta();
};

// Clean up Vanta.js on window unload
window.onunload = () => {
  if (vantaEffect) vantaEffect.destroy();
};

// Automatically refresh the page every 60 seconds
setInterval(() => {
  location.reload();
}, 60000); 
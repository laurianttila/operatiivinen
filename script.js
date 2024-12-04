/* script.js */

let currentIndex = parseInt(localStorage.getItem('currentIndex')) || 0;
let rotationIntervalId;
let progressIntervalId;
let rotationDuration = config.rotationInterval; // in milliseconds
let progressStartTime;

// Function to rotate content
function rotateContent() {
  const iframe = document.getElementById('content-frame');
  const urls = config.urls;
  const url = urls[currentIndex];

  // Update the progress indicator
  updateProgressIndicator(currentIndex, urls.length);

  iframe.style.display = 'block';
  iframe.src = url;

  currentIndex = (currentIndex + 1) % urls.length;
  localStorage.setItem('currentIndex', currentIndex);

  // Restart progress bar
  resetProgressBar();
}

// Function to update the progress indicator text
function updateProgressIndicator(index, total) {
  const progressIndicator = document.getElementById('progress-indicator');
  const currentItem = index + 1; // Convert zero-based index to one-based
  progressIndicator.textContent = `Näkymä ${currentItem} / ${total}`;
}

// Function to update the time display
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

  // Construct the military time string with seconds in a span
  const militaryTime = `${hours}${minutes}<span class="seconds">${seconds}</span>`;

  // Update the time element's HTML
  timeElement.innerHTML = militaryTime;
}

// Function to initialize the Vanta.js effect
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
    color: 0x687656,            // Line color matching lime green
    backgroundColor: 0x0C241F, // Background color matching teal green
  });
}

// Function to start the progress bar animation
function startProgressBar() {
  const progressBar = document.getElementById('progress-bar');
  progressBar.style.transition = 'none';
  progressBar.style.width = '0%';

  // Force reflow to apply the width reset
  void progressBar.offsetWidth;

  // Start the transition
  progressBar.style.transition = `width ${rotationDuration}ms linear`;
  progressBar.style.width = '100%';
}

// Function to reset the progress bar
function resetProgressBar() {
  startProgressBar();
}

// Initialize Vanta.js effect and start content rotation and progress bar
function initialize() {
  rotateContent();
  rotationIntervalId = setInterval(rotateContent, rotationDuration);

  updateTime();
  setInterval(updateTime, 1000);

  initVanta();

  // Initialize the progress bar
  startProgressBar();

  // Automatically refresh the page every 180 seconds (3 minutes)
  setInterval(() => {
    location.reload();
  }, 180000); // 180000 milliseconds = 3 minutes
}

window.onload = initialize;

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
/* script.js */

// Retrieve the current index from localStorage to maintain state across page reloads.
// If no index is stored, default to 0.
let currentIndex = parseInt(localStorage.getItem('currentIndex')) || 0;

// Declare variables to store interval IDs for content rotation and progress bar.
// These are used to control the timing of content changes and progress bar animations.
let rotationIntervalId;
let progressIntervalId;

// Retrieve the rotation duration from the config object.
// This determines how long each content item is displayed before rotating.
let rotationDuration = config.rotationInterval; // in milliseconds

/**
 * Function: rotateContent
 * -----------------------
 * Rotates the displayed content by updating the iframe's source to the next URL.
 * Also updates the progress indicator and resets the progress bar animation.
 */
function rotateContent() {
  // Get the iframe element where external content is displayed.
  const iframe = document.getElementById('content-frame');

  // Retrieve the array of URLs from the config object.
  const urls = config.urls;

  // Get the current URL based on the currentIndex.
  const url = urls[currentIndex];

  // Update the progress indicator to reflect the current position in the rotation.
  updateProgressIndicator(currentIndex, urls.length);

  // Display the iframe and set its source to the current URL.
  iframe.style.display = 'block';
  iframe.src = url;

  // Increment the currentIndex to point to the next URL.
  // Use modulo to loop back to the start if at the end of the array.
  currentIndex = (currentIndex + 1) % urls.length;

  // Store the updated currentIndex in localStorage for persistence.
  localStorage.setItem('currentIndex', currentIndex);

  // Restart the progress bar animation to synchronize with the new content.
  resetProgressBar();
}

/**
 * Function: updateProgressIndicator
 * ---------------------------------
 * Updates the text content of the progress indicator to show the current
 * module number out of the total number of modules.
 *
 * @param {number} index - The current index in the rotation.
 * @param {number} total - The total number of URLs/modules.
 */
function updateProgressIndicator(index, total) {
  // Get the progress indicator element from the DOM.
  const progressIndicator = document.getElementById('progress-indicator');

  // Calculate the current item number (1-based index for user-friendly display).
  const currentItem = index + 1; // Convert zero-based index to one-based

  // Update the text content of the progress indicator.
  progressIndicator.textContent = `Moduuli ${currentItem} / ${total}`;
}

/**
 * Function: updateTime
 * --------------------
 * Updates the displayed current time every second, formatting it in military time.
 * Seconds are displayed in a smaller, superscripted font for stylistic purposes.
 */
function updateTime() {
  // Get the time display element from the DOM.
  const timeElement = document.getElementById('current-time');

  // Create a new Date object representing the current date and time.
  const now = new Date();

  // Extract hours, minutes, and seconds from the current time.
  let hours = now.getHours(); // 0-23
  let minutes = now.getMinutes();
  let seconds = now.getSeconds();

  // Add leading zeros to hours, minutes, and seconds if they are less than 10.
  hours = hours < 10 ? '0' + hours : hours;
  minutes = minutes < 10 ? '0' + minutes : minutes;
  seconds = seconds < 10 ? '0' + seconds : seconds;

  // Construct the military time string with seconds wrapped in a span for styling.
  const militaryTime = `${hours}${minutes}<span class="seconds">${seconds}</span>`;

  // Update the inner HTML of the time display element with the formatted time.
  timeElement.innerHTML = militaryTime;
}

/**
 * Function: initVanta
 * -------------------
 * Initializes the Vanta.js background effect using the NET animation.
 * Configures various parameters such as color, points, and responsiveness.
 */
function initVanta() {
  vantaEffect = VANTA.NET({
    el: "#vanta-bg",             // The DOM element to apply the effect to.
    mouseControls: true,         // Enable mouse interaction.
    touchControls: true,         // Enable touch interaction.
    gyroControls: false,         // Disable gyroscope controls.
    minHeight: 0.00,             // Minimum height of the effect.
    minWidth: 0.00,              // Minimum width of the effect.
    scale: 1.00,                 // Scale factor for desktop.
    scaleMobile: 1.00,           // Scale factor for mobile devices.
    points: 20.00,               // Number of points in the net.
    maxDistance: 25.00,          // Maximum distance between points.
    spacing: 15.00,              // Spacing between points.
    color: 0x687656,             // Line color in hexadecimal (lime green).
    backgroundColor: 0x0C241F,   // Background color in hexadecimal (teal green).
  });
}


/**
 * Function: startProgressBar
 * --------------------------
 * Initiates the animation of the progress bar by resetting
 * its positions and then transitioning it to 100% over the duration specified by rotationDuration.
 */
function startProgressBar() {
  // Get the progress bar and progress marker elements from the DOM.
  const progressBar = document.getElementById('progress-bar');

  // Reset the progress bar's width to 0% instantly by removing transitions.
  progressBar.style.transition = 'none';
  progressBar.style.width = '0%';

  // Force a reflow to ensure the width and position resets take effect immediately.
  void progressBar.offsetWidth;

  // Apply a linear transition to the progress bar's width, animating it to 100% over rotationDuration.
  progressBar.style.transition = `width ${rotationDuration}ms linear`;
  progressBar.style.width = '100%';

}

/**
 * Function: resetProgressBar
 * --------------------------
 * Resets and restarts the progress bar animation to synchronize with the content rotation.
 */
function resetProgressBar() {
  startProgressBar();
}

/**
 * Function: initialize
 * ---------------------
 * Sets up the initial state of the application by rotating the first content item,
 * starting the intervals for content rotation and time updates, initializing the
 * Vanta.js background effect, and starting the progress bar animation.
 * Also sets up an automatic page refresh after 3 minutes.
 */
function initialize() {
  // Display the initial content.
  rotateContent();

  // Set up an interval to rotate content every rotationDuration milliseconds.
  rotationIntervalId = setInterval(rotateContent, rotationDuration);

  // Update the current time immediately.
  updateTime();

  // Set up an interval to update the time every second.
  setInterval(updateTime, 1000);

  // Initialize the Vanta.js background effect.
  initVanta();

  // Start the progress bar animation.
  startProgressBar();

  // Automatically refresh the page every 180 seconds (3 minutes) to ensure fresh content.
  setInterval(() => {
    location.reload();
  }, 180000); // 180000 milliseconds = 3 minutes
}

// Execute the initialize function once the window has fully loaded.
window.onload = initialize;

// Event listener to clean up the Vanta.js effect when the window is about to unload.
// This helps in preventing memory leaks.
window.onbeforeunload = () => {
  if (vantaEffect) vantaEffect.destroy();
};

// Event listener to handle window resize events.
// It ensures that the Vanta.js effect resizes appropriately to fit the new window dimensions.
window.addEventListener('resize', () => {
  if (vantaEffect) {
    vantaEffect.resize();
  }
});
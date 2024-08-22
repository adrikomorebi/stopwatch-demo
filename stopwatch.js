// stopwatch.js
let timer;
let isRunning = false;
let elapsedTime = 0;
const START_SLIDE_ID = "start-slide"; // Replace with the actual slide ID or URL
const END_SLIDE_ID = "end-slide";     // Replace with the actual slide ID or URL

document.addEventListener('DOMContentLoaded', () => {
    const slideId = getCurrentSlideId(); // Implement this function to get the current slide ID

    if (slideId === START_SLIDE_ID) {
        resetStopwatch();
    } else if (slideId !== END_SLIDE_ID && isRunning) {
        startStopwatch();
    }
});

function formatTime(ms) {
    const totalSeconds = Math.floor(ms / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function startStopwatch() {
    if (!isRunning) {
        isRunning = true;
        const startTime = Date.now() - elapsedTime;
        timer = setInterval(() => {
            elapsedTime = Date.now() - startTime;
            localStorage.setItem('elapsedTime', elapsedTime);
            document.getElementById('display').textContent = formatTime(elapsedTime);
        }, 1000);
    }
}

function stopStopwatch() {
    clearInterval(timer);
    isRunning = false;
}

function resetStopwatch() {
    clearInterval(timer);
    isRunning = false;
    elapsedTime = 0;
    document.getElementById('display').textContent = '00:00:00';
    localStorage.removeItem('elapsedTime');
}

function getCurrentSlideId() {
    // Placeholder function to get current slide ID or URL.
    // Implement this based on how Genially provides slide identifiers.
    return window.location.hash.substring(1) || "default-slide-id";
}

// Update current slide in localStorage
function updateSlideState(slideName) {
    localStorage.setItem('currentSlide', slideName);
}


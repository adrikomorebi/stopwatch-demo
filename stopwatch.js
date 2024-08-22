// Stopwatch variables
let timer;
let startTime;
let elapsedTime = 0;
let isRunning = false;

// Function to format time as HH:MM:SS
function formatTime(ms) {
    const totalSeconds = Math.floor(ms / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

// Start the stopwatch
function startStopwatch() {
    if (!isRunning) {
        isRunning = true;
        startTime = Date.now() - elapsedTime;
        timer = setInterval(() => {
            elapsedTime = Date.now() - startTime;
            localStorage.setItem('elapsedTime', elapsedTime);
            document.getElementById('display').textContent = formatTime(elapsedTime);
        }, 1000);
    }
}

// Stop the stopwatch
function stopStopwatch() {
    clearInterval(timer);
    isRunning = false;
}

// Reset the stopwatch
function resetStopwatch() {
    clearInterval(timer);
    isRunning = false;
    elapsedTime = 0;
    localStorage.setItem('elapsedTime', elapsedTime);
    document.getElementById('display').textContent = '00:00:00';
}

// Load the elapsed time from localStorage
function loadStopwatch() {
    const storedElapsedTime = parseInt(localStorage.getItem('elapsedTime'), 10);
    elapsedTime = isNaN(storedElapsedTime) ? 0 : storedElapsedTime;
    document.getElementById('display').textContent = formatTime(elapsedTime);
}

// Check and reset the stopwatch if needed
function checkAndReset() {
    const currentSlide = localStorage.getItem('currentSlide');
    if (currentSlide === 'start') {
        resetStopwatch();
    }
    loadStopwatch();
}

// Initialize the stopwatch when the page loads
window.onload = function() {
    checkAndReset();
    startStopwatch();
};

// Update current slide in localStorage
function updateSlideState(slideName) {
    localStorage.setItem('currentSlide', slideName);
}


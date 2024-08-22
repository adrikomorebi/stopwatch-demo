let startTime;
let elapsedTime = 0;
let stopwatchInterval;
let gameStarted = false;
let currentSlide = 1;

function startStopwatch() {
    startTime = Date.now() - elapsedTime; // Start or resume from the elapsed time
    stopwatchInterval = setInterval(() => {
        elapsedTime = Date.now() - startTime;
        console.log("Elapsed Time: " + (elapsedTime / 1000).toFixed(2) + " seconds");
    }, 100); // Update every 100ms
}

function stopStopwatch() {
    clearInterval(stopwatchInterval);
}

function resetStopwatch() {
    clearInterval(stopwatchInterval);
    elapsedTime = 0;
    console.log("Stopwatch reset.");
}

function checkSlideAndUpdateStopwatch(slideNumber) {
    // Check if game starts at slide 3
    if (slideNumber === 3 && !gameStarted) {
        console.log("Game started at slide 3.");
        resetStopwatch(); // Reset stopwatch at the start of the game
        startStopwatch(); // Start the stopwatch
        gameStarted = true;
    } 
    
    // Stop the game and stopwatch at slide 9
    if (slideNumber === 9 && gameStarted) {
        console.log("Game ended at slide 9.");
        stopStopwatch(); // Stop the stopwatch
        gameStarted = false; // Reset game state
    }
    
    // If the user goes back to slide 3, reset the game and stopwatch
    if (slideNumber < 3 && gameStarted) {
        console.log("User went back before slide 3. Resetting game.");
        resetStopwatch(); // Reset the stopwatch
        gameStarted = false; // Reset game state
    }
}

// Assume the slides are part of a container element and slide change updates the class or other attribute
let slideContainer = document.querySelector('.slide-container'); // Adjust this selector to match your DOM

// Observe changes in the slide container to detect when the slide changes
const observer = new MutationObserver(() => {
    // Determine the current slide (this assumes there's a way to track it, such as through a class or data attribute)
    let activeSlide = document.querySelector('.active-slide'); // Adjust selector to match active slide class

    if (activeSlide) {
        let slideNumber = parseInt(activeSlide.getAttribute('data-slide-number'), 10); // Assuming slides have data-slide-number attribute

        // Update current slide and check if we need to update the stopwatch
        if (slideNumber !== currentSlide) {
            currentSlide = slideNumber;
            checkSlideAndUpdateStopwatch(slideNumber);
        }
    }
});

// Start observing the container for changes
observer.observe(slideContainer, { childList: true, subtree: true, attributes: true });

// Initial check if the user is already on a specific slide
let initialSlide = document.querySelector('.active-slide');
if (initialSlide) {
    currentSlide = parseInt(initialSlide.getAttribute('data-slide-number'), 10);
    checkSlideAndUpdateStopwatch(currentSlide);
}


// Function to reset the stopwatch
function resetStopwatch() {
    const iframe = document.querySelector('iframe'); // Adjust the selector if needed
    if (iframe) {
        iframe.contentWindow.postMessage('resetStopwatch', '*');
    }
}

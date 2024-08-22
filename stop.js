function stopStopwatch() {
    // Send a message to the iframe to stop the stopwatch
    parent.postMessage('stopStopwatch', '*');
}

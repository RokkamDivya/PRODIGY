let timer;
let startTime = 0;
let elapsedTime = 0;
let isRunning = false;
let lapTimes = [];

const startPauseBtn = document.getElementById('start-pause-btn');
const resetBtn = document.getElementById('reset-btn');
const lapBtn = document.getElementById('lap-btn');
const timeDisplay = document.getElementById('time-display');
const lapList = document.getElementById('lap-list');

startPauseBtn.addEventListener('click', startPause);
resetBtn.addEventListener('click', reset);
lapBtn.addEventListener('click', recordLap);

function startPause() {
    if (isRunning) {
        clearInterval(timer);
        isRunning = false;
        startPauseBtn.textContent = 'Start';
        lapBtn.disabled = true;
        resetBtn.disabled = false;
    } else {
        startTime = Date.now() - elapsedTime; // Continue from the current elapsed time
        timer = setInterval(updateTime, 100); // Update every 100 milliseconds
        isRunning = true;
        startPauseBtn.textContent = 'Pause';
        lapBtn.disabled = false;
        resetBtn.disabled = false;
    }
}

function reset() {
    clearInterval(timer); // Stop the timer
    isRunning = false;
    elapsedTime = 0; // Reset elapsed time
    startTime = Date.now(); // Reset start time for the next start
    startPauseBtn.textContent = 'Start';
    lapBtn.disabled = true;
    resetBtn.disabled = true;
    lapTimes = []; // Clear lap times array
    updateTime(); // Update display to 00:00:00.0
    updateLapTimes(); // Clear lap times from display
}

function recordLap() {
    if (isRunning) {
        lapTimes.push(elapsedTime);
        updateLapTimes();
    }
}

function updateTime() {
    elapsedTime = Date.now() - startTime;
    const hours = Math.floor(elapsedTime / (1000 * 60 * 60));
    const minutes = Math.floor((elapsedTime % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((elapsedTime % (1000 * 60)) / 1000);
    const milliseconds = Math.floor((elapsedTime % 1000) / 100);

    const formattedHours = String(hours).padStart(2, '0');
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(seconds).padStart(2, '0');
    const formattedMilliseconds = String(milliseconds).padStart(1, '0');

    timeDisplay.textContent = `${formattedHours}:${formattedMinutes}:${formattedSeconds}.${formattedMilliseconds}`;
}

function updateLapTimes() {
    lapList.innerHTML = '';
    lapTimes.forEach((time, index) => {
        const hours = Math.floor(time / (1000 * 60 * 60));
        const minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((time % (1000 * 60)) / 1000);
        const milliseconds = Math.floor((time % 1000) / 100);

        const formattedHours = String(hours).padStart(2, '0');
        const formattedMinutes = String(minutes).padStart(2, '0');
        const formattedSeconds = String(seconds).padStart(2, '0');
        const formattedMilliseconds = String(milliseconds).padStart(1, '0');

        const lapItem = document.createElement('li');
        lapItem.textContent = `Lap ${index + 1}: ${formattedHours}:${formattedMinutes}:${formattedSeconds}.${formattedMilliseconds}`;
        lapList.appendChild(lapItem);
    });
}

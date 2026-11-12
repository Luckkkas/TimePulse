const timeEl = document.querySelector('.timer');
const marksList = document.querySelector('.marks-list');
const powerButton = document.querySelector('.power');
const resetButton = document.querySelector('.reset');
const markButton = document.querySelector('.mark');

let elapsed = 0;
let startedAt = 0;
let intervalId = null;
let isRunning = false;

const formatTime = (milliseconds) => {
    const centiseconds = Math.floor(milliseconds / 10);
    const hours = Math.floor(centiseconds / 360000);
    const minutes = Math.floor((centiseconds % 360000) / 6000);
    const seconds = Math.floor((centiseconds % 6000) / 100);
    const hundredths = centiseconds % 100;

    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}:${String(hundredths).padStart(2, '0')}`;
};

const getElapsed = () =>
    elapsed + (isRunning ? performance.now() - startedAt : 0);

const updateDisplay = () => {
    timeEl.textContent = formatTime(getElapsed());
};

const updatePowerButton = () => {
    powerButton.setAttribute('action', isRunning ? 'pause' : 'start');

    const icon = powerButton.querySelector('i');
    icon.classList.toggle('fa-play', !isRunning);
    icon.classList.toggle('fa-pause', isRunning);
};

const toggleTimer = () => {
    if (isRunning) {
        elapsed += performance.now() - startedAt;
        clearInterval(intervalId);
        intervalId = null;
        isRunning = false;
    } else {
        startedAt = performance.now();
        isRunning = true;
        intervalId = setInterval(updateDisplay, 10);
    }

    updateDisplay();
    updatePowerButton();
};

const resetTimer = () => {
    clearInterval(intervalId);
    intervalId = null;
    elapsed = 0;
    isRunning = false;
    marksList.textContent = '';

    updateDisplay();
    updatePowerButton();
};

const addMark = () => {
    const mark = document.createElement('p');
    mark.textContent = `Marca ${marksList.children.length + 1}: ${formatTime(getElapsed())}`;
    marksList.appendChild(mark);
};

powerButton.addEventListener('click', toggleTimer);
resetButton.addEventListener('click', resetTimer);
markButton.addEventListener('click', addMark);

updateDisplay();

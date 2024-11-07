// DOM Elements
const elements = {
    playPauseBtn: document.getElementById('playPause'),
    audio: document.getElementById('audio'),
    progressBar: document.getElementById('progressBar'),
    passedTime: document.getElementById('passed'),
    leftTime: document.getElementById('left'),
    forwardBtn: document.getElementById('forward'),
    backwardBtn: document.getElementById('backward'),
    menuToggle: document.getElementById('menu-toggle'),
    menu: document.getElementById('menu')
};

let isPlaying = false;
const SKIP_TIME = 5; // Seconds to skip forward/backward

// Audio Controls
function skipAudio(seconds) {
    elements.audio.currentTime += seconds;
}

function togglePlay() {
    isPlaying = !isPlaying;
    elements.playPauseBtn.src = `assets/images/${isPlaying ? 'pause' : 'play'}.png`;
    isPlaying ? elements.audio.play() : elements.audio.pause();
}

function formatTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toLocaleString('en-US', {
        minimumIntegerDigits: 2,
        useGrouping: false
    })}`;
}

function updateProgress() {
    const duration = elements.audio.duration;
    const currentTime = elements.audio.currentTime;
    const progress = (currentTime / duration) * 100;

    elements.progressBar.style.width = `${progress}%`;
    elements.passedTime.innerText = formatTime(currentTime);
    elements.leftTime.innerText = formatTime(duration - currentTime);

    if (currentTime === duration) {
        togglePlay();
        elements.progressBar.style.width = 0;
        elements.passedTime.innerText = '0:00';
    }
}

// Menu Controls
function toggleMenu() {
    const isExpanded = elements.menuToggle.getAttribute('aria-expanded') === 'true';
    elements.menuToggle.setAttribute('aria-expanded', !isExpanded);
    elements.menu.classList.toggle('hidden');

    const bars = elements.menuToggle.querySelectorAll('div');
    bars.forEach((bar, index) => {
        if (isExpanded) {
            bar.classList.remove(...getBarClasses(index));
        } else {
            bar.classList.add(...getBarClasses(index));
        }
    });
}

function getBarClasses(index) {
    const classes = [
        ['rotate-45', 'translate-y-2'],
        ['opacity-0'],
        ['-rotate-45', '-translate-y-2']
    ];
    return classes[index] || [];
}

function handleClickOutside(event) {
    if (!elements.menuToggle.contains(event.target) && !elements.menu.contains(event.target)) {
        elements.menu.classList.add('hidden');
        elements.menuToggle.setAttribute('aria-expanded', 'false');
        const bars = elements.menuToggle.querySelectorAll('span');
        bars.forEach(bar => {
            bar.style.transform = 'none';
            bar.style.opacity = '1';
        });
    }
}

// Event Listeners
function initializeEventListeners() {
    elements.forwardBtn.addEventListener('click', () => skipAudio(SKIP_TIME));
    elements.backwardBtn.addEventListener('click', () => skipAudio(-SKIP_TIME));
    elements.playPauseBtn.addEventListener('click', togglePlay);
    elements.audio.addEventListener('timeupdate', updateProgress);
    elements.menuToggle.addEventListener('click', toggleMenu);
    document.addEventListener('click', handleClickOutside);
}

// Initialize
document.addEventListener('DOMContentLoaded', initializeEventListeners);
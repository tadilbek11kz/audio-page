// DOM Elements
const elements = {
    playPauseBtn: document.getElementById('playPause'),
    audio: document.getElementById('audio'),
    progressBar: document.getElementById('progressBar'),
    passedTime: document.getElementById('passed'),
    leftTime: document.getElementById('left'),
    nextBtn: document.getElementById('next'),
    prevBtn: document.getElementById('prev'),
    totalTime: document.getElementById('total'),
    audioName: document.getElementById('name'),
    menuToggle: document.getElementById('menu-toggle'),
    menu: document.getElementById('menu')
};

// Audio playlist
const audioList = [
    'Daily Life (Behind The Scenes)',
    'Funny Tequila (Behind The Scenes)',
    'Random (Behind The Scenes)',
    'Red and Green Flags (Behind The Scenes)',
];

const durationList = [
    '4:09',
    '3:08',
    '0:20',
    '2:44'
];

let isPlaying = false;

// Audio Controls
function handleNextTrack() {
    const currentIndex = audioList.indexOf(elements.audioName.innerText);
    const nextIndex = (currentIndex + 1) % audioList.length;
    updateTrack(nextIndex);
}

function handlePrevTrack() {
    const currentIndex = audioList.indexOf(elements.audioName.innerText);
    const prevIndex = (currentIndex - 1 + audioList.length) % audioList.length;
    updateTrack(prevIndex);
}

function updateTrack(index) {
    elements.audio.src = `assets/audio/${audioList[index]}.mp3`;
    elements.audioName.innerText = audioList[index];
    elements.totalTime.innerText = durationList[index];
    elements.leftTime.innerText = durationList[index];
    isPlaying = false;
    togglePlay();
}

function togglePlay() {
    if (isPlaying) {
        elements.audio.pause();
        elements.playPauseBtn.src = 'assets/images/play.png';
    } else {
        elements.audio.play();
        elements.playPauseBtn.src = 'assets/images/pause.png';
    }
    isPlaying = !isPlaying;
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
    if (duration) elements.leftTime.innerText = formatTime(duration - currentTime);

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
document.addEventListener('DOMContentLoaded', () => {
    elements.nextBtn.addEventListener('click', handleNextTrack);
    elements.prevBtn.addEventListener('click', handlePrevTrack);
    elements.playPauseBtn.addEventListener('click', togglePlay);
    elements.audio.addEventListener('timeupdate', updateProgress);
    elements.menuToggle.addEventListener('click', toggleMenu);
    document.addEventListener('click', handleClickOutside);
});
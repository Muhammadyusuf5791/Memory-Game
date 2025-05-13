// Elementlar
const images = document.querySelectorAll('.animal img');
const cards = document.querySelectorAll('.animal');
const menu = document.getElementById('menu');
const resume = document.getElementById('resume');
const btn_1 = document.getElementById('btn-1');
const btn_2 = document.getElementById('btn-2');
const loop = document.getElementById('loop');
const muted = document.getElementById('muted');
const audio = document.getElementById('audio');
const winModal = document.getElementById('winModal');
const loading = document.getElementById('loading');
const container = document.getElementById('container');
const navbar = document.getElementById('navbar');
const btn_3 = document.getElementById('btn-3');
const btn_4 = document.getElementById('btn-4');
const home = document.getElementById('home');
const card2 = document.getElementById('card2');
const timerDisplay = document.getElementById('timer');
const restartBtn = document.getElementById('restartBtn');
const falseModal = document.getElementById('falseModal');
const homeBtn = document.getElementById('homeBtn');
const newPage = document.getElementById('newPage');

// O'yin holatlari
let selectedImages = [];
let matchedPairs = new Set();
let availableImages = ['img2.png', 'img3.png', 'img4.png', 'img5.png', 'img6.png', 'img7.png', 'img8.png', 'img9.png', 'img10.png', 'img11.png'];
let baseImages = [...availableImages];
let gameImages = [];
let startTime;
let elapsedTime = 0;
let timerInterval;
let isChecking = false;
let isPaused = false;

// Shuffle funksiyasi
function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

// Sahifa yuklanganda
function onPageLoad() {
    resume.style.display = 'none';
    menu.style.display = 'block';
}

// Loading
function kutish() {
    setTimeout(() => {
        loading.style.display = 'flex';
    }, 4000);
}
kutish();

function kutish1(callback) {
    setTimeout(() => {
        navbar.style.display = 'none';
        callback();
    }, 12000);
}
function xabar1() {
    home.style.display = 'flex';
}
kutish1(xabar1);

// Timerni to‘xtatish
function pauseTimer() {
    if (!isPaused) {
        elapsedTime += Date.now() - startTime;
        clearInterval(timerInterval);
        isPaused = true;
    }
}

// Timerni davom ettirish
function resumeTimer() {
    if (isPaused) {
        startTime = Date.now();
        timerInterval = setInterval(updateTime, 1000);
        isPaused = false;
    }
}

// Faqat game reset
function resetGameOnly() {
    matchedPairs.clear();
    selectedImages = [];
    gameImages = shuffle([...baseImages, ...baseImages]);

    cards.forEach((card, index) => {
        const img = card.querySelector('img');
        img.src = 'assets1/img1.png';
        img.dataset.image = gameImages[index];
    });

    audio.currentTime = 0;
}

// Restart o'yin
function restartGame(preserveAudioMuted = true) {
    const wasMuted = audio.muted;

    matchedPairs.clear();
    selectedImages = [];
    gameImages = shuffle([...baseImages, ...baseImages]);

    container.style.display = 'flex';
    card2.style.display = 'flex';
    home.style.display = 'none';
    menu.style.display = 'block';
    resume.style.display = 'none';

    cards.forEach((card, index) => {
        const img = card.querySelector('img');
        img.src = 'assets1/img1.png';
        img.dataset.image = gameImages[index];
    });

    audio.currentTime = 0;
    if (!preserveAudioMuted) {
        audio.muted = false;
        loop.style.display = 'block';
        muted.style.display = 'none';
    } else {
        if (wasMuted) {
            audio.muted = true;
            loop.style.display = 'none';
            muted.style.display = 'block';
        } else {
            audio.muted = false;
            loop.style.display = 'block';
            muted.style.display = 'none';
        }
    }

    elapsedTime = 0;
    startTime = Date.now();
    clearInterval(timerInterval);
    timerInterval = setInterval(updateTime, 1000);
    isPaused = false;
}

// Kartaga bosilganda
function handleClick(event) {
    if (isChecking) return;

    let clickedImg = event.target.tagName === 'IMG' ? event.target : event.target.querySelector('img');

    if (matchedPairs.has(clickedImg.dataset.image)) return;
    if (selectedImages.length >= 2) return;
    if (selectedImages.some(item => item.element === clickedImg)) return;

    selectedImages.push({ element: clickedImg, src: clickedImg.dataset.image });
    clickedImg.setAttribute('src', `assets/${clickedImg.dataset.image}`);

    if (selectedImages.length === 2) {
        isChecking = true;
        setTimeout(checkMatch, 300);
    }
}

function checkMatch() {
    const [img1, img2] = selectedImages;

    if (img1.src === img2.src) {
        matchedPairs.add(img1.element.dataset.image);
        selectedImages = [];

        if (matchedPairs.size === availableImages.length) {
            clearInterval(timerInterval);
            setTimeout(showWinModal, 1000);
        }

        isChecking = false;
    } else {
        setTimeout(() => {
            resetImages();
            isChecking = false;
        }, 600);
    }
}

function resetImages() {
    selectedImages.forEach(item => {
        if (!matchedPairs.has(item.element.dataset.image)) {
            item.element.setAttribute('src', 'assets1/img1.png');
        }
    });
    selectedImages = [];
}

function showWinModal() {
    winModal.style.display = "flex";
}

function showFalseModal() {
    falseModal.style.display = 'flex';
}

function updateTime() {
    let timeElapsed = Date.now() - startTime + elapsedTime;
    let remainingTime = 60 - Math.floor(timeElapsed / 1000);

    timerDisplay.textContent = remainingTime;

    if (remainingTime <= 0) {
        clearInterval(timerInterval);
        showFalseModal();
    }
}

// Tugmalar — restart
newPage.addEventListener('click', function () {
    winModal.style.display = 'none';
    restartGame(true);
});

restartBtn.addEventListener('click', function () {
    falseModal.style.display = 'none';
    restartGame(true);
});

homeBtn.addEventListener('click', function () {
    falseModal.style.display = 'none';
    home.style.display = 'flex';
    container.style.display = 'none';
    audio.muted = true;
});

// O'yinni boshlash
btn_3.addEventListener('click', function () {
    container.style.display = 'flex';
    home.style.display = 'none';
    menu.style.display = 'block';
    resume.style.display = 'none';

    audio.play();
    resetGameOnly();
    audio.muted = false;
    loop.style.display = 'block';
    muted.style.display = 'none';

    elapsedTime = 0;
    startTime = Date.now();
    clearInterval(timerInterval);
    timerInterval = setInterval(updateTime, 1000);
    isPaused = false;
});

// O'yindan chiqish
btn_4.addEventListener('click', function () {
    home.style.display = 'flex';
    resume.style.display = 'none';
    menu.style.display = 'none';
    audio.muted = true;
    container.style.display = 'none';
    pauseTimer(); // vaqtni pauzaga olish
});

// Menyudan restart
btn_2.addEventListener('click', function () {
    menu.style.display = 'none';
    restartGame(true);
});

// Audio boshqarish
loop.addEventListener('click', function () {
    loop.style.display = 'none';
    muted.style.display = 'block';
    audio.muted = true;
});

muted.addEventListener('click', function () {
    loop.style.display = 'block';
    muted.style.display = 'none';
    audio.muted = false;
});

// Kartalarni bosish
cards.forEach(card => {
    card.addEventListener('click', handleClick);
});

// Menuga bosilganda pauza
menu.addEventListener('click', function () {
    menu.style.display = 'none';
    resume.style.display = 'flex';
    pauseTimer(); // 🛑 vaqtni to‘xtatish
});

// Davom ettirish tugmasi
btn_1.addEventListener('click', function () {
    resume.style.display = 'none';
    menu.style.display = 'block';
    resumeTimer(); // ▶️ vaqtni davom ettirish
});

// Sahifa yuklanganda
window.onload = function () {
    onPageLoad();
};

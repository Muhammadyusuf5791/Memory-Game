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

let selectedImages = [];
let matchedPairs = new Set();
let availableImages = ['img2.png', 'img3.png', 'img4.png', 'img5.png', 'img6.png', 'img7.png', 'img8.png', 'img9.png', 'img10.png', 'img11.png'];
let baseImages = [...availableImages];
let gameImages = [];
let startTime;
let elapsedTime = 0; // Vaqtni hisoblash uchun qo'shimcha o'zgaruvchi
let timerInterval;
let isPaused = false;  // Pauza holatini aniqlovchi flag

function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

// Sahifa yuklanganda
function onPageLoad() {
    resume.style.display = 'none';
    menu.style.display = 'block';
}

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

// O'yinni qayta tiklash
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

// O'yinni qayta boshlash
function restartGame() {
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
    audio.muted = false;
    loop.style.display = 'block';
    muted.style.display = 'none';

    // Taymerni qayta boshlash
    elapsedTime = 0;  // Vaqtni qayta hisoblash
    startTime = Date.now();
    clearInterval(timerInterval);
    timerInterval = setInterval(updateTime, 1000);
}

// Kartani bosish
function handleClick(event) {
    let clickedImg = event.target.tagName === 'IMG' ? event.target : event.target.querySelector('img');

    if (matchedPairs.has(clickedImg.dataset.image)) return;
    if (selectedImages.length >= 2) resetImages();

    selectedImages.push({ element: clickedImg, src: clickedImg.dataset.image });

    clickedImg.setAttribute('src', `assets/${clickedImg.dataset.image}`);

    if (selectedImages.length === 2) {
        setTimeout(checkMatch, 100);
    }
}

// Ikki tasvirni taqqoslash
function checkMatch() {
    const [img1, img2] = selectedImages;

    if (img1.src === img2.src) {
        matchedPairs.add(img1.element.dataset.image);
        selectedImages = [];

        if (matchedPairs.size === availableImages.length) {
            clearInterval(timerInterval); // g‘alaba bo‘lsa taymerni to‘xtatish
            setTimeout(showWinModal, 1000);
        }
    } else {
        setTimeout(resetImages, 600);
    }
}

// Tanlangan kartalarni qayta tiklash
function resetImages() {
    selectedImages.forEach(item => {
        if (!matchedPairs.has(item.element.dataset.image)) {
            item.element.setAttribute('src', 'assets1/img1.png');
        }
    });
    selectedImages = [];
}

// G‘alaba modalini ko‘rsatish
function showWinModal() {
    winModal.style.display = "flex";
}

// Yutqazish modalini ko‘rsatish
function showFalseModal() {
    falseModal.style.display = 'flex';
}

// Taymerni yangilash
function updateTime() {
    let timeElapsed = Date.now() - startTime + elapsedTime; // Taymerni davom ettirish uchun
    let remainingTime = 50 - Math.floor(timeElapsed / 1000);

    timerDisplay.textContent = remainingTime;

    if (remainingTime <= 0) {
        clearInterval(timerInterval);
        showFalseModal(); // Yutqazish modalini ko‘rsatish
    }
}

// Restart tugmasi
newPage.addEventListener('click', function() {
    winModal.style.display = 'none';
    restartGame();
});

restartBtn.addEventListener('click', function() {
    falseModal.style.display = 'none';
    restartGame();
});

homeBtn.addEventListener('click', function() {
    falseModal.style.display = 'none';
    home.style.display = 'flex';
});

// O'yinni boshlash
btn_3.addEventListener('click', function () {
    container.style.display = 'flex';
    home.style.display = 'none';
    menu.style.display = 'block';  // Menu ko'rsatiladi
    resume.style.display = 'none';

    audio.play();
    resetGameOnly();
    audio.muted = false;
    loop.style.display = 'block';
    muted.style.display = 'none';

    // Taymerni boshlash
    elapsedTime = 0;  // Vaqtni qayta hisoblash
    startTime = Date.now();
    clearInterval(timerInterval);
    timerInterval = setInterval(updateTime, 1000);
});

// O'yindan chiqish
btn_4.addEventListener('click', function () {
    home.style.display = 'flex';
    resume.style.display = 'none';
    menu.style.display = 'none';  // Menu yashiriladi
    audio.muted = true;
});

// Restart tugmasi
btn_2.addEventListener('click', function() {
    menu.style.display = 'none';  // Menu yashiriladi
    restartGame();
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

// Menuga bosilganda pauza qilish
menu.addEventListener('click', function () {
    if (!isPaused) {
        // Pauza holatiga o'tish
        clearInterval(timerInterval); // Taymerni to'xtatish
        elapsedTime += Date.now() - startTime; // Taymerni to'xtatgan vaqtdan saqlash
        isPaused = true;  // Pauza holatini yoqish
        menu.style.display = 'none';
        resume.style.display = 'flex';
    }
});

// btn_1 tugmasi bosilganda o'yinni davom ettirish
btn_1.addEventListener('click', function () {
    if (isPaused) {
        // Pauzani olib tashlash va taymerni qayta boshlash
        isPaused = false;
        resume.style.display = 'none';
        menu.style.display = 'block';
        startTime = Date.now();  // Qayta boshlash uchun startTime ni yangilash
        timerInterval = setInterval(updateTime, 1000);  // Taymerni qayta ishga tushirish
    }
});

// Sahifa yuklanganda
window.onload = function () {
    onPageLoad();
};

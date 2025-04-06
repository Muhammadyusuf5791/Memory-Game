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
const restartButton = document.getElementById('restartButton');
const loading = document.getElementById('loading');
const container = document.getElementById('container');
const navbar = document.getElementById('navbar');
const btn_3 = document.getElementById('btn-3');
const btn_4 = document.getElementById('btn-4');
const home = document.getElementById('home');

let selectedImages = [];
let matchedPairs = new Set();
let availableImages = ['img2.png', 'img3.png', 'img4.png', 'img5.png', 'img6.png', 'img7.png', 'img8.png', 'img9.png', 'img10.png', 'img11.png'];
let baseImages = [...availableImages]; // Asl rasm ro'yxati
let gameImages = []; // Hozirgi o‘yin uchun aralashtirilgan rasm ro‘yxati

// Shuffle funksiyasi
function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

// Sahifa yuklanganda ishlaydigan funksiya
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

// 🟩 O'yinni faqat container ichida yangilash
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

// 🔄 faqat container sahifani yangilash
function restartGame() {
    matchedPairs.clear();
    selectedImages = [];
    availableImages = [...baseImages]; // mavjud rasm ro‘yxatini tiklash
    gameImages = shuffle([...baseImages, ...baseImages]);

    // container sahifasini ko‘rsatish (agar yashirin bo‘lsa)
    container.style.display = 'flex';
    home.style.display = 'none';
    menu.style.display = 'block';
    resume.style.display = 'none';

    // barcha kartalarni qayta tiklash
    cards.forEach((card, index) => {
        const img = card.querySelector('img');
        img.src = 'assets1/img1.png';
        img.dataset.image = gameImages[index];
    });

    // audio-ni to‘xtatib, boshiga olish
    audio.currentTime = 0;
    audio.muted = false;
    loop.style.display = 'block';
    muted.style.display = 'none';
}

// Kartani bosganda ishlovchi funksiya
function handleClick(event) {
    let clickedImg = event.target.tagName === 'IMG' ? event.target : event.target.querySelector('img');

    if (matchedPairs.has(clickedImg.dataset.image)) return;
    if (selectedImages.length >= 2) resetImages();

    selectedImages.push({ element: clickedImg, src: clickedImg.dataset.image });

    clickedImg.setAttribute('src', `assets/${clickedImg.dataset.image}`);

    if (selectedImages.length === 2) {
        setTimeout(checkMatch, 500);
    }
}

function checkMatch() {
    const [img1, img2] = selectedImages;

    if (img1.src === img2.src) {
        matchedPairs.add(img1.element.dataset.image);
        availableImages = availableImages.filter(img => img !== img1.element.dataset.image);
        selectedImages = [];

        if (matchedPairs.size === 10) {
            setTimeout(showWinModal, 1000);
        }
    } else {
        setTimeout(resetImages, 600);
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

function hideWinModal() {
    winModal.style.display = "none";
}

// ▶️ O'yinni boshlash
btn_3.addEventListener('click', function () {
    container.style.display = 'flex';
    home.style.display = 'none';
    menu.style.display = 'block'
    resume.style.display = 'none'
    audio.play();
    resetGameOnly();
    audio.muted = false;
    loop.style.display = 'block';
    muted.style.display = 'none';
});

// ⬅️ O'yindan chiqish (home page)
btn_4.addEventListener('click', function () {
    home.style.display = 'flex';
    resume.style.display = 'none'
    menu.style.display = 'block'
    audio.muted = true;
});

// 🔊 Ovozni boshqarish
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

// 🧠 Kartani bosish
cards.forEach(card => {
    card.addEventListener('click', handleClick);
});

// 🎵 Menuga bosilganda audio
menu.addEventListener('click', function () {
    menu.style.display = 'none';
    resume.style.display = 'flex';
});

// 🔁 Restart tugmalari
btn_1.addEventListener('click', function () {
    menu.style.display = 'block';
    resume.style.display = 'none';
});

btn_2.addEventListener('click', restartGame);

restartButton.addEventListener('click', function () {
    hideWinModal();
    restartGame();
});

// 🌐 Sahifa yuklanganda
window.onload = function () {
    onPageLoad();
};

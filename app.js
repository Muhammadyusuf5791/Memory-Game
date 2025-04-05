const images = document.querySelectorAll('.animal img');
const cards = document.querySelectorAll('.animal');
const menu = document.getElementById('menu')
const resume = document.getElementById('resume')
const btn_1 = document.getElementById('btn-1')
const btn_2 = document.getElementById('btn-2')
const loop = document.getElementById('loop')
const muted = document.getElementById('muted')
const audio = document.getElementById('audio')

let selectedImages = [];
let matchedPairs = new Set();
let availableImages = ['img2.png', 'img3.png', 'img4.png', 'img5.png', 'img6.png', 'img7.png',
    'img8.png', 'img9.png', 'img10.png', 'img11.png'];

// Sahifa yuklanganda yoki qayta yuklanganda ishlaydigan funksiyani yaratdik
function onPageLoad() {
    resume.style.display = 'none'; // Resume menyusini yashirish
    menu.style.display = 'block'; // Menu menyusini ko‘rsatish
}

// Restart tugmasi bosilganda, bu funksiya menyuni qayta sozlaydi
function restartGame() {
    resume.style.display = 'none'; // Resume menyusini yashirish
    menu.style.display = 'block'; // Menu menyusini ko‘rsatish
    location.reload(); // Sahifani qayta yuklash
}

function handleClick(event) {
    let clickedImg = event.target.tagName === 'IMG' ? event.target : event.target.querySelector('img');

    if (matchedPairs.has(clickedImg.dataset.image)) return;
    if (selectedImages.length >= 2) {
        resetImages();
    }

    let randomIndex = Math.floor(Math.random() * availableImages.length);
    let randomImage = `assets/${availableImages[randomIndex]}`;

    selectedImages.push({ element: clickedImg, src: randomImage });

    clickedImg.setAttribute('src', randomImage);
    clickedImg.dataset.image = availableImages[randomIndex];

    if (selectedImages.length === 2) {
        setTimeout(checkMatch, 300);
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
            item.element.setAttribute('src', 'img1.png');
            item.element.dataset.image = "";
        }
    });
    selectedImages = [];
}

function showWinModal() {
    document.getElementById("winModal").style.display = "flex";
}

cards.forEach(card => {
    card.addEventListener('click', handleClick);
});

menu.addEventListener('click', function () {
    menu.style.display = 'none';
    resume.style.display = 'flex';
})

btn_1.addEventListener('click', function () {
    menu.style.display = 'block';
    resume.style.display = 'none';
})

// loop tugmasi bosilganda:
loop.addEventListener('click', function () {
    loop.style.display = 'none';       // loop tugmasini yashirish
    muted.style.display = 'block';     // muted tugmasini ko‘rsatish
    audio.muted = true;                // audio-ni ovozsiz qilish
});

// muted tugmasi bosilganda:
muted.addEventListener('click', function () {
    loop.style.display = 'block';      // loop tugmasini ko‘rsatish
    muted.style.display = 'none';      // muted tugmasini yashirish
    audio.muted = false;               // audio-ni ovozli qilish
});

// Sahifa yuklanganda yoki qayta yuklanganda, resume menyusini yashirib, menu menyusini ko‘rsatish
window.onload = onPageLoad;

// Restart tugmasi ishlashi uchun
btn_2.addEventListener('click', restartGame);

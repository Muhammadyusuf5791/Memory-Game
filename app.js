const images = document.querySelectorAll('.animal img');
const cards = document.querySelectorAll('.animal');

let selectedImages = [];
let matchedPairs = new Set();
let availableImages = ['img2.png', 'img3.png', 'img4.png', 'img5.png', 'img6.png', 'img7.png',
    'img8.png', 'img9.png', 'img10.png', 'img11.png'];

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
            setTimeout(showWinModal, 500);
        }
    } else {
        setTimeout(resetImages, 300);
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

function restartGame() {
    location.reload();
}

cards.forEach(card => {
    card.addEventListener('click', handleClick);
});

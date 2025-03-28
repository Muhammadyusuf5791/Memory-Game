const images = document.querySelectorAll('.animal img'); // Barcha img elementlarini olish
const cards = document.querySelectorAll('.animal'); // Kartalarni olish

let selectedImages = []; // Tanlangan rasmlar
let matchedPairs = new Set(); // To‘g‘ri topilgan rasmlar (bu rasmlar boshqa kartalarda chiqmaydi)
let availableImages = ['img2.png', 'img3.png', 'img4.png', 'img5.png', 'img6.png', 'img7.png',
    'img8.png', 'img9.png', 'img10.png', 'img11.png']; // Faqat assets ichidagi rasmlar

function handleClick(event) {
    let clickedImg = event.target.tagName === 'IMG' ? event.target : event.target.querySelector('img');

    // Agar bu rasm allaqachon to‘g‘ri topilgan bo‘lsa, o‘zgarmasin
    if (matchedPairs.has(clickedImg.dataset.image)) return;

    // Agar 2 ta tanlangan bo‘lsa, avvalgi tanlovni tozalaymiz
    if (selectedImages.length >= 2) {
        resetImages();
    }

    // Tasodifiy rasm tanlash (faqat hali mos kelmagan rasmlardan)
    let randomIndex = Math.floor(Math.random() * availableImages.length);
    let randomImage = `assets/${availableImages[randomIndex]}`;

    // Tanlangan rasmni massivga qo‘shish
    selectedImages.push({ element: clickedImg, src: randomImage });

    // Rasmni almashtirish
    clickedImg.setAttribute('src', randomImage);
    clickedImg.dataset.image = availableImages[randomIndex]; // Rasm nomini saqlash

    // Agar 2 ta rasm tanlangan bo‘lsa, tekshirish
    if (selectedImages.length === 2) {
        setTimeout(checkMatch, 300);
    }
}

function checkMatch() {
    const [img1, img2] = selectedImages; // 2 ta tanlangan rasm

    if (img1.src === img2.src) {
        // Agar ikkita rasm bir xil bo‘lsa, bu juftlikni saqlaymiz
        matchedPairs.add(img1.element.dataset.image);
        availableImages = availableImages.filter(img => img !== img1.element.dataset.image);

        selectedImages = [];

        // Barcha juftliklar topildimi?
        if (matchedPairs.size === 10) { 
            setTimeout(() => {
                alert("🎉 Siz yutdingiz! 🎉"); // Yutganini ko‘rsatish
                location.reload(); // O‘yinni qayta boshlash
            }, 500);
        }
    } else {
        // Agar rasmlar har xil bo‘lsa, ularni eski holatiga qaytaramiz
        setTimeout(resetImages, 300);
    }
}

function resetImages() {
    selectedImages.forEach(item => {
        if (!matchedPairs.has(item.element.dataset.image)) {
            item.element.setAttribute('src', 'img1.png'); // Asl holatga qaytarish
            item.element.dataset.image = ""; // Oldingi tanlovni o‘chirish
        }
    });
    selectedImages = []; // Ro‘yxatni tozalash
}

// Barcha kartalarga event qo‘shish (rasm yoki kartani bosganda ishlaydi)
cards.forEach(card => {
    card.addEventListener('click', handleClick);
});

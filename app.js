// Elementlar
const images = document.querySelectorAll(".animal img");
const cards = document.querySelectorAll(".animal");
const round1Cards = document.querySelectorAll('.round1-animal');
const menu = document.getElementById("menu");
const resume = document.getElementById("resume");
const btn_1 = document.getElementById("btn-1");
const btn_2 = document.getElementById("btn-2");
const loop = document.getElementById("loop");
const muted = document.getElementById("muted");
const audio = document.getElementById("audio");
const audio1 = document.getElementById("audio1");
const audio2 = document.getElementById("audio2");
const winModal = document.getElementById("winModal"); // 2-bosqich g'alabasi
const winModal1 = document.getElementById("winModal1"); // 1-bosqich g'alabasi
const loading = document.getElementById("loading");
const container = document.getElementById("container");
const navbar = document.getElementById("navbar");
const btn_3 = document.getElementById("btn-3");
const btn_4 = document.getElementById("btn-4");
const home = document.getElementById("home");
const card2 = document.getElementById("card2");
const round1_card = document.querySelector('.round1-card');
const timerDisplay = document.getElementById("timer");
const restartBtn = document.getElementById("restartBtn");
const falseModal = document.getElementById("falseModal");
const homeBtn = document.getElementById("homeBtn");
const newPage = document.getElementById("newPage"); // 2-bosqich next
const newPage1 = document.getElementById("newPage1"); // 1-bosqich next
const close = document.querySelector(".bx-x");
const btn_5 = document.getElementById("btn-5");
const bx_music = document.querySelector(".bx-music");
const music_name = document.querySelector(".music-name");
const m_name1 = document.getElementById("m-name1");
const m_name2 = document.getElementById("m-name2");
const m_name3 = document.getElementById("m-name3");

// O'yin holatlari
let selectedImages = [];
let matchedPairs = new Set();
let round1Images = ["img12.png", "img13.png"]; // 1-bosqich uchun 2 juft
let round2Images = [
  "img2.png", "img3.png", "img4.png", "img5.png", "img6.png", 
  "img7.png", "img8.png", "img9.png", "img10.png", "img11.png"
]; // 2-bosqich uchun 10 juft
let currentRound = 1;
let availableImages = [...round1Images];
let baseImages = [...availableImages];
let gameImages = [];
let startTime;
let elapsedTime = 0;
let timerInterval;
let isChecking = false;
let isPaused = false;
let roundTimeLimits = {1: 10, 2: 60}; // Bosqichlar uchun vaqt chegaralari

// Kartalarni aralashtirish
function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

// Musiqalarni boshqarish
function playAudio(audioToPlay) {
  [audio, audio1, audio2].forEach((aud) => {
    if (aud === audioToPlay) {
      aud.style.display = "block";
      aud.play();
    } else {
      aud.pause();
      aud.currentTime = 0;
      aud.style.display = "none";
    }
  });
}

// Musiqa tanlash
m_name1.addEventListener("click", function() {
  playAudio(audio);
  m_name1.style.cssText = 'background-color: white; color: #568e02;';
  m_name2.style.cssText = 'background-color: #568e02; color: white;';
  m_name3.style.cssText = 'background-color: #568e02; color: white;';
});

m_name2.addEventListener("click", function() {
  playAudio(audio1);
  m_name2.style.cssText = 'background-color: white; color: #568e02;';
  m_name1.style.cssText = 'background-color: #568e02; color: white;';
  m_name3.style.cssText = 'background-color: #568e02; color: white;';
});

m_name3.addEventListener("click", function() {
  playAudio(audio2);
  m_name3.style.cssText = 'background-color: white; color: #568e02;';
  m_name2.style.cssText = 'background-color: #568e02; color: white;';
  m_name1.style.cssText = 'background-color: #568e02; color: white;';
});

// Musiqa menyusi
bx_music.addEventListener("click", function() {
  music_name.style.display = music_name.style.display === "block" ? "none" : "block";
});

// O'yindan chiqish
btn_5.addEventListener("click", function() {
  window.close();
});

// Sahifa yuklanganda
function onPageLoad() {
  resume.style.display = "none";
  menu.style.display = "block";
}

// Resume sahifasini yopish
close.addEventListener("click", function() {
  resume.style.display = "none";
  menu.style.display = "block";
  resumeTimer();
  music_name.style.display = 'none';
});

// Loading animatsiyasi
function kutish() {
  setTimeout(() => {
    loading.style.display = "flex";
  }, 4000);
}
kutish();

function kutish1(callback) {
  setTimeout(() => {
    navbar.style.display = "none";
    callback();
  }, 12000);
}

function xabar1() {
  home.style.display = "flex";
}
kutish1(xabar1);

// Vaqtni to'xtatish
function pauseTimer() {
  if (!isPaused) {
    elapsedTime += Date.now() - startTime;
    clearInterval(timerInterval);
    isPaused = true;
  }
}

// Vaqtni davom ettirish
function resumeTimer() {
  if (isPaused) {
    startTime = Date.now();
    timerInterval = setInterval(updateTime, 1000);
    isPaused = false;
  }
}

// O'yinni qayta boshlash (faqat kartalar)
function resetGameOnly() {
  matchedPairs.clear();
  selectedImages = [];
  
  if (currentRound === 1) {
    gameImages = shuffle([...round1Images, ...round1Images]);
    round1Cards.forEach((card, index) => {
      const img = card.querySelector("img");
      img.src = "assets1/img1.png"; // Barcha kartalarni yopiq holatga keltiramiz
      img.dataset.image = gameImages[index];
      card.classList.remove('flipped'); // Qo'shimcha: flipped klassini olib tashlaymiz
    });
  } else {
    gameImages = shuffle([...round2Images, ...round2Images]);
    cards.forEach((card, index) => {
      const img = card.querySelector("img");
      img.src = "assets1/img1.png"; // Barcha kartalarni yopiq holatga keltiramiz
      img.dataset.image = gameImages[index];
      card.classList.remove('flipped'); // Qo'shimcha: flipped klassini olib tashlaymiz
    });
  }

  // Barcha audiolarni to'xtatamiz
  [audio, audio1, audio2].forEach(aud => {
    aud.pause();
    aud.currentTime = 0;
  });
}

// To'liq qayta boshlash
function restartGame(preserveAudioMuted = true) {
  const wasMuted = audio.muted;

  matchedPairs.clear();
  selectedImages = [];
  currentRound = 1;
  availableImages = [...round1Images];
  gameImages = shuffle([...round1Images, ...round1Images]);

  // 1-bosqichni ko'rsatish
  round1_card.style.display = "flex";
  card2.style.display = "none";
  container.style.display = "flex";
  home.style.display = "none";
  menu.style.display = "block";
  resume.style.display = "none";

  // Kartalarni sozlash
  round1Cards.forEach((card, index) => {
    const img = card.querySelector("img");
    img.src = "assets1/img1.png";
    img.dataset.image = gameImages[index];
  });

  // Musiqani sozlash
  if (!audio.paused) {
    audio.currentTime = 0;
    audio.play();
  } else {
    audio.pause();
  }

  if (!audio1.paused) {
    audio1.currentTime = 0;
    audio1.play();
  } else {
    audio1.pause();
  }

  if (!audio2.paused) {
    audio2.currentTime = 0;
    audio2.play();
  } else {
    audio2.pause();
  }

  // Ovozni sozlash
  if (!preserveAudioMuted) {
    audio.muted = false;
    audio1.muted = false;
    audio2.muted = false;
    loop.style.display = "block";
    muted.style.display = "none";
  } else {
    if (wasMuted) {
      audio.muted = true;
      audio1.muted = true;
      audio2.muted = true;
      loop.style.display = "none";
      muted.style.display = "block";
    } else {
      audio.muted = false;
      audio1.muted = false;
      audio2.muted = false;
      loop.style.display = "block";
      muted.style.display = "none";
    }
  }

  // Taymerni sozlash
  elapsedTime = 0;
  startTime = Date.now();
  clearInterval(timerInterval);
  timerInterval = setInterval(updateTime, 1000);
  isPaused = false;
}

// Keyingi bosqichga o'tish
function nextRound() {
  currentRound = 2;
  availableImages = [...round2Images];
  matchedPairs.clear();
  selectedImages = [];
  
  // 2-bosqich elementlarini ko'rsatish
  round1_card.style.display = "none";
  card2.style.display = "flex";
  
  // Kartalarni sozlash
  gameImages = shuffle([...round2Images, ...round2Images]);
  cards.forEach((card, index) => {
    const img = card.querySelector("img");
    img.src = "assets1/img1.png";
    img.dataset.image = gameImages[index];
  });
  
  // Taymerni qayta boshlash
  elapsedTime = 0;
  startTime = Date.now();
  clearInterval(timerInterval);
  timerInterval = setInterval(updateTime, 1000);
}

// Karta bosilganda
function handleClick(event) {
  if (isChecking) return;

  let clickedImg = event.target.tagName === "IMG" ? event.target : event.target.querySelector("img");

  if (!clickedImg || matchedPairs.has(clickedImg.dataset.image)) return;
  if (selectedImages.length >= 2) return;
  if (selectedImages.some((item) => item.element === clickedImg)) return;

  selectedImages.push({ element: clickedImg, src: clickedImg.dataset.image });
  clickedImg.setAttribute("src", `assets/${clickedImg.dataset.image}`);

  if (selectedImages.length === 2) {
    isChecking = true;
    setTimeout(checkMatch, 300);
  }
}

// Juftlikni tekshirish
function checkMatch() {
  const [img1, img2] = selectedImages;

  if (img1.src === img2.src) {
    matchedPairs.add(img1.element.dataset.image);
    selectedImages = [];

    // G'alaba sharti
    const neededMatches = currentRound === 1 ? round1Images.length : round2Images.length;
    if (matchedPairs.size === neededMatches) {
      clearInterval(timerInterval);
      if (currentRound === 1) {
        setTimeout(showWinModal1, 1000); // 1-bosqich g'alabasi
      } else {
        setTimeout(showWinModal, 1000); // 2-bosqich g'alabasi
      }
    }

    isChecking = false;
  } else {
    setTimeout(() => {
      resetImages();
      isChecking = false;
    }, 600);
  }
}

// Noto'g'ri juftlikni yopish
function resetImages() {
  selectedImages.forEach((item) => {
    if (!matchedPairs.has(item.element.dataset.image)) {
      item.element.setAttribute("src", "assets1/img1.png");
    }
  });
  selectedImages = [];
}

// 1-bosqich g'alaba modali
function showWinModal1() {
  winModal1.style.display = "flex";
}

// 2-bosqich g'alaba modali
function showWinModal() {
  winModal.style.display = "flex";
}

// Vaqt tugashi modali
function showFalseModal() {
  falseModal.style.display = "flex";
}

// Vaqtni yangilash
function updateTime() {
  let timeElapsed = Date.now() - startTime + elapsedTime;
  let remainingTime = roundTimeLimits[currentRound] - Math.floor(timeElapsed / 1000);

  timerDisplay.textContent = remainingTime;

  if (remainingTime <= 0) {
    clearInterval(timerInterval);
    showFalseModal();
  }
}

// 1-bosqich g'alabasi tugmasi (keyingi bosqichga o'tish)
newPage1.addEventListener("click", function() {
  winModal1.style.display = "none";
  nextRound();
});

// 2-bosqich g'alabasi tugmasi (qayta boshlash)
newPage.addEventListener("click", function() {
  winModal.style.display = "none";
  restartGame(true); // 1-bosqichdan qayta boshlash
});

// Qayta boshlash tugmasi
restartBtn.addEventListener("click", function() {
  falseModal.style.display = "none";
  restartGame(true);
});

// Bosh menyuga qaytish
homeBtn.addEventListener("click", function() {
  falseModal.style.display = "none";
  home.style.display = "flex";
  container.style.display = "none";
  audio.muted = true;
  audio1.muted = true;
  audio2.muted = true;
});

// O'yinni boshlash (1-bosqich)
btn_3.addEventListener("click", function() {
  container.style.display = "flex";
  round1_card.style.display = "flex";
  card2.style.display = "none";
  home.style.display = "none";
  menu.style.display = "block";
  resume.style.display = "none";

  // O'yinni to'liq qayta boshlash (faqat resetGameOnly emas)
  currentRound = 1;
  availableImages = [...round1Images];
  matchedPairs.clear();
  selectedImages = [];
  
  // Kartalarni to'liq qayta yuklash
  gameImages = shuffle([...round1Images, ...round1Images]);
  round1Cards.forEach((card, index) => {
    const img = card.querySelector("img");
    img.src = "assets1/img1.png";
    img.dataset.image = gameImages[index];
    card.classList.remove('flipped');
  });

  // Musiqalarni tozalash va standart musiqani boshlash
  [audio, audio1, audio2].forEach(aud => {
    aud.pause();
    aud.currentTime = 0;
    aud.style.display = "none";
  });
  
  audio.style.display = "block";
  audio.play();
  
  // UI ni yangilash
  m_name1.style.cssText = 'background-color: white; color: #568e02;';
  m_name2.style.cssText = 'background-color: #568e02; color: white;';
  m_name3.style.cssText = 'background-color: #568e02; color: white;';

  // Ovozni yoqish
  audio.muted = false;
  audio1.muted = false;
  audio2.muted = false;
  loop.style.display = "block";
  muted.style.display = "none";

  // Taymerni boshlash
  elapsedTime = 0;
  startTime = Date.now();
  clearInterval(timerInterval);
  timerInterval = setInterval(updateTime, 1000);
  isPaused = false;
});

// O'yindan chiqish
btn_4.addEventListener("click", function() {
  home.style.display = "flex";
  resume.style.display = "none";
  menu.style.display = "none";
  
  // Barcha audiolarni to'xtatamiz va ovozni o'chiramiz
  [audio, audio1, audio2].forEach(aud => {
    aud.pause();
    aud.currentTime = 0;
    aud.muted = true;
  });
  
  container.style.display = "none";
  pauseTimer();
  music_name.style.display = 'none';
  
  // Kartalarni yopiq holatga keltiramiz
  if (currentRound === 1) {
    round1Cards.forEach(card => {
      const img = card.querySelector("img");
      img.src = "assets1/img1.png";
      card.classList.remove('flipped');
    });
  } else {
    cards.forEach(card => {
      const img = card.querySelector("img");
      img.src = "assets1/img1.png";
      card.classList.remove('flipped');
    });
  }
});

// Menyudan qayta boshlash
btn_2.addEventListener("click", function() {
  menu.style.display = "none";
  restartGame(true);
  music_name.style.display = 'none';
});

// Ovozni o'chirish/yoqish
loop.addEventListener("click", function() {
  loop.style.display = "none";
  muted.style.display = "block";
  audio.muted = true;
  audio1.muted = true;
  audio2.muted = true;
});

muted.addEventListener("click", function() {
  loop.style.display = "block";
  muted.style.display = "none";
  audio.muted = false;
  audio1.muted = false;
  audio2.muted = false;
});

// Kartalarga hodisalar qo'shish
round1Cards.forEach((card) => {
  card.addEventListener("click", handleClick);
});

cards.forEach((card) => {
  card.addEventListener("click", handleClick);
});

// Menyuni ko'rsatish
menu.addEventListener("click", function() {
  menu.style.display = "none";
  resume.style.display = "flex";
  pauseTimer();
});

// Davom ettirish
btn_1.addEventListener("click", function() {
  resume.style.display = "none";
  menu.style.display = "block";
  resumeTimer();
  music_name.style.display = 'none';
});

// Sahifa yuklanganda
window.onload = function() {
  onPageLoad();
};
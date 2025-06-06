// Elements
const images = document.querySelectorAll(".animal img");
const cards = document.querySelectorAll(".animal");
const round1Cards = document.querySelectorAll(".round1-animal");
const round2Cards = document.querySelectorAll(".round2-animal");
const round3Cards = document.querySelectorAll(".round3-animal");
const round4Cards = document.querySelectorAll(".round4-animal");
const menu = document.getElementById("menu");
const resume = document.getElementById("resume");
const btn_1 = document.getElementById("btn-1");
const btn_2 = document.getElementById("btn-2");
const loop = document.getElementById("loop");
const muted = document.getElementById("muted");
const audio = document.getElementById("audio");
const audio1 = document.getElementById("audio1");
const audio2 = document.getElementById("audio2");
const audio3 = document.getElementById("audio3");
const winModal = document.getElementById("winModal");
const winModal1 = document.getElementById("winModal1");
const winModal2 = document.getElementById("winModal2");
const winModal3 = document.getElementById("winModal3");
const winModal4 = document.getElementById("winModal4");
const loading = document.getElementById("loading");
const container = document.getElementById("container");
const navbar = document.getElementById("navbar");
const btn_3 = document.getElementById("btn-3");
const btn_4 = document.getElementById("btn-4");
const home = document.getElementById("home");
const card2 = document.getElementById("card2");
const round1_card = document.querySelector(".round1-card");
const round2_card = document.querySelector(".round2-card");
const round3_card = document.querySelector(".round3-card");
const round4_card = document.querySelector(".round4-card");
const timerDisplay = document.getElementById("timer");
const restartBtn = document.getElementById("restartBtn");
const falseModal = document.getElementById("falseModal");
const homeBtn = document.getElementById("homeBtn");
const newPage = document.getElementById("newPage");
const newPage1 = document.getElementById("newPage1");
const newPage2 = document.getElementById("newPage2");
const newPage3 = document.getElementById("newPage3");
const newPage4 = document.getElementById("newPage4");
const close = document.querySelector(".bx-x");
const btn_5 = document.getElementById("btn-5");
const bx_music = document.querySelector(".bx-music");
const music_name = document.querySelector(".music-name");
const m_name1 = document.getElementById("m-name1");
const m_name2 = document.getElementById("m-name2");
const m_name3 = document.getElementById("m-name3");
const m_name4 = document.getElementById("m-name4");
const menu_audio = document.getElementById("menu-audio");
const win_audio = document.getElementById("win-audio");
const false_audio = document.getElementById("false-audio");

// Initialize localStorage values
if (!localStorage.getItem("selectedAudio")) {
  localStorage.setItem("selectedAudio", "audio"); // Default to audio
}
if (!localStorage.getItem("isMuted")) {
  localStorage.setItem("isMuted", "false"); // Default to not muted
}

// Game states
let selectedImages = [];
let matchedPairs = new Set();
let round1Images = ["img12.png", "img13.png"];
let round2Images = ["img14.png", "img15.png", "img16.png", "img17.png"];
let round3Images = [
  "img18.png",
  "img19.png",
  "img20.png",
  "img21.png",
  "img22.png",
  "img23.png",
];
let round4Images = [
  "img24.png",
  "img25.png",
  "img26.png",
  "img27.png",
  "img28.png",
  "img29.png",
  "img30.png",
  "img31.png",
];
let finalRoundImages = [
  "img2.png",
  "img3.png",
  "img4.png",
  "img5.png",
  "img6.png",
  "img7.png",
  "img8.png",
  "img9.png",
  "img10.png",
  "img11.png",
];
let currentRound = 1;
let availableImages = [...round1Images];
let gameImages = [];
let startTime;
let elapsedTime = 0;
let timerInterval;
let isChecking = false;
let isPaused = false;
let roundTimeLimits = { 1: 10, 2: 15, 3: 25, 4: 30, 5: 35 };

// Initialize modals
winModal.style.display = "none";
winModal1.style.display = "none";
winModal2.style.display = "none";
winModal3.style.display = "none";
winModal4.style.display = "none";
falseModal.style.display = "none";

// Shuffle function
function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

// Audio control with forcePlay parameter
function playAudio(audioToPlay, forcePlay = false) {
  [audio, audio1, audio2, audio3].forEach((aud) => {
    if (aud === audioToPlay) {
      aud.style.display = "block";
      if (forcePlay || !aud.paused) {
        aud.play();
      }
    } else {
      aud.pause();
      aud.currentTime = 0;
      aud.style.display = "none";
    }
  });
}

// Restore audio settings with forcePlay parameter
function restoreAudioSettings(forcePlay = false) {
  const selectedAudio = localStorage.getItem("selectedAudio");
  const isMuted = localStorage.getItem("isMuted") === "true";

  // Set mute state for all audio elements
  [audio, audio1, audio2, audio3, menu_audio, win_audio, false_audio].forEach(aud => {
    aud.muted = isMuted;
  });

  // Audio selection
  if (selectedAudio === "audio1") {
    playAudio(audio1, forcePlay);
    m_name2.style.cssText = "background-color: white; color: #568e02;";
    m_name1.style.cssText = "background-color: #568e02; color: white;";
    m_name4.style.cssText = "background-color: #568e02; color: white;";
    m_name3.style.cssText = "background-color: #568e02; color: white;";
  } else if (selectedAudio === "audio2") {
    playAudio(audio2, forcePlay);
    m_name3.style.cssText = "background-color: white; color: #568e02;";
    m_name2.style.cssText = "background-color: #568e02; color: white;";
    m_name4.style.cssText = "background-color: #568e02; color: white;";
    m_name1.style.cssText = "background-color: #568e02; color: white;";
  } else if (selectedAudio === "audio3") {
    playAudio(audio3, forcePlay);
    m_name4.style.cssText = "background-color: white; color: #568e02;";
    m_name2.style.cssText = "background-color: #568e02; color: white;";
    m_name1.style.cssText = "background-color: #568e02; color: white;";
    m_name3.style.cssText = "background-color: #568e02; color: white;";
  } else {
    playAudio(audio, forcePlay);
    m_name1.style.cssText = "background-color: white; color: #568e02;";
    m_name2.style.cssText = "background-color: #568e02; color: white;";
    m_name3.style.cssText = "background-color: #568e02; color: white;";
    m_name4.style.cssText = "background-color: #568e02; color: white;";
  }

  // Mute state UI
  if (isMuted) {
    loop.style.display = "none";
    muted.style.display = "block";
  } else {
    loop.style.display = "block";
    muted.style.display = "none";
  }
}

// Music selection
m_name1.addEventListener("click", function () {
  localStorage.setItem("selectedAudio", "audio");
  playAudio(audio);
  m_name1.style.cssText = "background-color: white; color: #568e02;";
  m_name2.style.cssText = "background-color: #568e02; color: white;";
  m_name3.style.cssText = "background-color: #568e02; color: white;";
  m_name4.style.cssText = "background-color: #568e02; color: white;";
});

m_name2.addEventListener("click", function () {
  localStorage.setItem("selectedAudio", "audio1");
  playAudio(audio1);
  m_name2.style.cssText = "background-color: white; color: #568e02;";
  m_name1.style.cssText = "background-color: #568e02; color: white;";
  m_name3.style.cssText = "background-color: #568e02; color: white;";
  m_name4.style.cssText = "background-color: #568e02; color: white;";
});

m_name3.addEventListener("click", function () {
  localStorage.setItem("selectedAudio", "audio2");
  playAudio(audio2);
  m_name3.style.cssText = "background-color: white; color: #568e02;";
  m_name2.style.cssText = "background-color: #568e02; color: white;";
  m_name1.style.cssText = "background-color: #568e02; color: white;";
  m_name4.style.cssText = "background-color: #568e02; color: white;";
});

m_name4.addEventListener("click", function () {
  localStorage.setItem("selectedAudio", "audio3");
  playAudio(audio3);
  m_name4.style.cssText = "background-color: white; color: #568e02;";
  m_name2.style.cssText = "background-color: #568e02; color: white;";
  m_name1.style.cssText = "background-color: #568e02; color: white;";
  m_name3.style.cssText = "background-color: #568e02; color: white;";
});

// Music menu toggle
bx_music.addEventListener("click", function () {
  music_name.style.display =
    music_name.style.display === "block" ? "none" : "block";
});

// Exit game
btn_5.addEventListener("click", function () {
  window.close();
});

// Page load
function onPageLoad() {
  resume.style.display = "none";
  menu.style.display = "block";
  restoreAudioSettings();
}

// Close resume
close.addEventListener("click", function () {
  resume.style.display = "none";
  menu.style.display = "block";
  resumeTimer();
  music_name.style.display = "none";
  restoreAudioSettings(true);
});

// Loading animation
function kutish() {
  setTimeout(() => {
    loading.style.display = "flex";
  }, 4000);
}
kutish();

function kutish1(callback) {
  setTimeout(() => {
    navbar.style.display = "none";
    menu_audio.setAttribute("src", "assets1/menu-audio.mp3");
    callback();
  }, 12000);
}

function xabar1() {
  home.style.display = "flex";
}
kutish1(xabar1);

// Timer control
function pauseTimer() {
  if (!isPaused) {
    elapsedTime += Date.now() - startTime;
    clearInterval(timerInterval);
    isPaused = true;
  }
}

function resumeTimer() {
  if (isPaused) {
    startTime = Date.now();
    timerInterval = setInterval(updateTime, 1000);
    isPaused = false;
  }
}

// Reset game (cards only)
function resetGameOnly() {
  matchedPairs.clear();
  selectedImages = [];

  if (currentRound === 1) {
    gameImages = shuffle([...round1Images, ...round1Images]);
    round1Cards.forEach((card, index) => {
      const img = card.querySelector("img");
      img.src = "assets1/img1.png";
      img.dataset.image = gameImages[index];
    });
  } else if (currentRound === 2) {
    gameImages = shuffle([...round2Images, ...round2Images]);
    round2Cards.forEach((card, index) => {
      const img = card.querySelector("img");
      img.src = "assets1/img1.png";
      img.dataset.image = gameImages[index];
    });
  } else if (currentRound === 3) {
    gameImages = shuffle([...round3Images, ...round3Images]);
    round3Cards.forEach((card, index) => {
      const img = card.querySelector("img");
      img.src = "assets1/img1.png";
      img.dataset.image = gameImages[index];
    });
  } else if (currentRound === 4) {
    gameImages = shuffle([...round4Images, ...round4Images]);
    round4Cards.forEach((card, index) => {
      const img = card.querySelector("img");
      img.src = "assets1/img1.png";
      img.dataset.image = gameImages[index];
    });
  } else {
    gameImages = shuffle([...finalRoundImages, ...finalRoundImages]);
    cards.forEach((card, index) => {
      const img = card.querySelector("img");
      img.src = "assets1/img1.png";
      img.dataset.image = gameImages[index];
    });
  }

  [audio, audio1, audio2, audio3].forEach((aud) => {
    aud.pause();
    aud.currentTime = 0;
  });
}

// Full restart
function restartGame(preserveAudioMuted = true) {
  matchedPairs.clear();
  selectedImages = [];
  currentRound = 1;
  availableImages = [...round1Images];
  gameImages = shuffle([...round1Images, ...round1Images]);

  // Show round 1
  round1_card.style.display = "flex";
  round2_card.style.display = "none";
  round3_card.style.display = "none";
  round4_card.style.display = "none";
  card2.style.display = "none";
  container.style.display = "flex";
  home.style.display = "none";
  menu.style.display = "block";
  resume.style.display = "none";

  // Setup cards
  round1Cards.forEach((card, index) => {
    const img = card.querySelector("img");
    img.src = "assets1/img1.png";
    img.dataset.image = gameImages[index];
  });

  // Initialize timer
  timerDisplay.textContent = roundTimeLimits[currentRound];

  // Restore audio settings
  restoreAudioSettings(true);

  // Timer setup
  elapsedTime = 0;
  startTime = Date.now();
  clearInterval(timerInterval);
  timerInterval = setInterval(updateTime, 1000);
  isPaused = false;
}

// Round transitions
function nextRoundTo2() {
  currentRound = 2;
  availableImages = [...round2Images];
  matchedPairs.clear();
  selectedImages = [];

  round1_card.style.display = "none";
  round2_card.style.display = "flex";
  round3_card.style.display = "none";
  round4_card.style.display = "none";
  card2.style.display = "none";

  gameImages = shuffle([...round2Images, ...round2Images]);
  round2Cards.forEach((card, index) => {
    const img = card.querySelector("img");
    img.src = "assets1/img1.png";
    img.dataset.image = gameImages[index];
  });

  elapsedTime = 0;
  startTime = Date.now();
  clearInterval(timerInterval);
  timerInterval = setInterval(updateTime, 1000);
  timerDisplay.textContent = roundTimeLimits[currentRound];
}

function nextRoundTo3() {
  currentRound = 3;
  availableImages = [...round3Images];
  matchedPairs.clear();
  selectedImages = [];

  round1_card.style.display = "none";
  round2_card.style.display = "none";
  round3_card.style.display = "flex";
  round4_card.style.display = "none";
  card2.style.display = "none";

  gameImages = shuffle([...round3Images, ...round3Images]);
  round3Cards.forEach((card, index) => {
    const img = card.querySelector("img");
    img.src = "assets1/img1.png";
    img.dataset.image = gameImages[index];
  });

  elapsedTime = 0;
  startTime = Date.now();
  clearInterval(timerInterval);
  timerInterval = setInterval(updateTime, 1000);
  timerDisplay.textContent = roundTimeLimits[currentRound];
}

function nextRoundTo4() {
  currentRound = 4;
  availableImages = [...round4Images];
  matchedPairs.clear();
  selectedImages = [];

  round1_card.style.display = "none";
  round2_card.style.display = "none";
  round3_card.style.display = "none";
  round4_card.style.display = "flex";
  card2.style.display = "none";

  gameImages = shuffle([...round4Images, ...round4Images]);
  round4Cards.forEach((card, index) => {
    const img = card.querySelector("img");
    img.src = "assets1/img1.png";
    img.dataset.image = gameImages[index];
  });

  elapsedTime = 0;
  startTime = Date.now();
  clearInterval(timerInterval);
  timerInterval = setInterval(updateTime, 1000);
  timerDisplay.textContent = roundTimeLimits[currentRound];
}

function nextRoundFinal() {
  currentRound = 5;
  availableImages = [...finalRoundImages];
  matchedPairs.clear();
  selectedImages = [];

  round1_card.style.display = "none";
  round2_card.style.display = "none";
  round3_card.style.display = "none";
  round4_card.style.display = "none";
  card2.style.display = "flex";

  gameImages = shuffle([...finalRoundImages, ...finalRoundImages]);
  cards.forEach((card, index) => {
    const img = card.querySelector("img");
    img.src = "assets1/img1.png";
    img.dataset.image = gameImages[index];
  });

  elapsedTime = 0;
  startTime = Date.now();
  clearInterval(timerInterval);
  timerInterval = setInterval(updateTime, 1000);
  timerDisplay.textContent = roundTimeLimits[currentRound];
}

// Card click handler
function handleClick(event) {
  if (isChecking || isPaused) return;

  let clickedImg =
    event.target.tagName === "IMG"
      ? event.target
      : event.target.querySelector("img");

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

// Check for match
function checkMatch() {
  if (selectedImages.length < 2) return;

  const [img1, img2] = selectedImages;

  if (img1.element.dataset.image === img2.element.dataset.image) {
    matchedPairs.add(img1.element.dataset.image);
    selectedImages = [];

    const neededMatches =
      currentRound === 1
        ? round1Images.length
        : currentRound === 2
        ? round2Images.length
        : currentRound === 3
        ? round3Images.length
        : currentRound === 4
        ? round4Images.length
        : finalRoundImages.length;

    if (matchedPairs.size === neededMatches) {
      clearInterval(timerInterval);
      setTimeout(() => {
        if (currentRound === 1) {
          showWinModal1();
          win_audio.setAttribute("src", "assets1/win-audio.mp3");
          win_audio.play();
          [audio, audio1, audio2, audio3].forEach((aud) => {
            aud.pause();
          });
        } else if (currentRound === 2) {
          showWinModal2();
          [audio, audio1, audio2, audio3].forEach((aud) => {
            aud.pause();
          });
          win_audio.setAttribute("src", "assets1/win-audio.mp3");
          win_audio.play();
        } else if (currentRound === 3) {
          showWinModal3();
          [audio, audio1, audio2, audio3].forEach((aud) => {
            aud.pause();
          });
          win_audio.setAttribute("src", "assets1/win-audio.mp3");
          win_audio.play();
        } else if (currentRound === 4) {
          showWinModal4();
          [audio, audio1, audio2, audio3].forEach((aud) => {
            aud.pause();
          });
          win_audio.setAttribute("src", "assets1/win-audio.mp3");
          win_audio.play();
        } else {
          showWinModal();
          [audio, audio1, audio2, audio3].forEach((aud) => {
            aud.pause();
          });
          win_audio.setAttribute("src", "assets1/win-audio.mp3");
          win_audio.play();
        }
      }, 500);
    }
    isChecking = false;
  } else {
    setTimeout(() => {
      img1.element.src = "assets1/img1.png";
      img2.element.src = "assets1/img1.png";
      selectedImages = [];
      isChecking = false;
    }, 600);
  }
}

// Win modals
function showWinModal1() {
  pauseTimer();
  winModal1.style.display = "flex";
  winModal2.style.display = "none";
  winModal3.style.display = "none";
  winModal4.style.display = "none";
  winModal.style.display = "none";
  falseModal.style.display = "none";
}

function showWinModal2() {
  pauseTimer();
  winModal2.style.display = "flex";
  winModal1.style.display = "none";
  winModal3.style.display = "none";
  winModal4.style.display = "none";
  winModal.style.display = "none";
  falseModal.style.display = "none";
}

function showWinModal3() {
  pauseTimer();
  winModal3.style.display = "flex";
  winModal1.style.display = "none";
  winModal4.style.display = "none";
  winModal2.style.display = "none";
  winModal.style.display = "none";
  falseModal.style.display = "none";
}

function showWinModal4() {
  pauseTimer();
  winModal4.style.display = "flex";
  winModal3.style.display = "none";
  winModal1.style.display = "none";
  winModal2.style.display = "none";
  winModal.style.display = "none";
  falseModal.style.display = "none";
}

function showWinModal() {
  pauseTimer();
  winModal.style.display = "flex";
  winModal1.style.display = "none";
  winModal2.style.display = "none";
  winModal3.style.display = "none";
  winModal4.style.display = "none";
  falseModal.style.display = "none";
}

// Time's up modal
function showFalseModal() {
  pauseTimer();
  falseModal.style.display = "flex";
  winModal1.style.display = "none";
  winModal2.style.display = "none";
  winModal3.style.display = "none";
  winModal4.style.display = "none";
  winModal.style.display = "none";
  false_audio.setAttribute("src", "assets1/false-audio.mp3");
  false_audio.play();
}

// Update timer
function updateTime() {
  if (isPaused) return;

  let timeElapsed = Date.now() - startTime + elapsedTime;
  let remainingTime =
    roundTimeLimits[currentRound] - Math.floor(timeElapsed / 1000);

  remainingTime = Math.max(0, remainingTime);
  timerDisplay.textContent = remainingTime;

  if (remainingTime <= 0) {
    clearInterval(timerInterval);
    setTimeout(() => {
      // Flip all cards back before showing modal
      if (currentRound === 1) {
        round1Cards.forEach((card) => {
          const img = card.querySelector("img");
          img.src = "assets1/img1.png";
        });
      } else if (currentRound === 2) {
        round2Cards.forEach((card) => {
          const img = card.querySelector("img");
          img.src = "assets1/img1.png";
        });
      } else if (currentRound === 3) {
        round3Cards.forEach((card) => {
          const img = card.querySelector("img");
          img.src = "assets1/img1.png";
        });
      } else if (currentRound === 4) {
        round4Cards.forEach((card) => {
          const img = card.querySelector("img");
          img.src = "assets1/img1.png";
        });
      } else {
        cards.forEach((card) => {
          const img = card.querySelector("img");
          img.src = "assets1/img1.png";
        });
      }
      showFalseModal();
      [audio, audio1, audio2, audio3].forEach((aud) => {
        aud.pause();
      });
    }, 500);
  }
}

// Next buttons
newPage1.addEventListener("click", function () {
  winModal1.style.display = "none";
  win_audio.pause();
  nextRoundTo2();
  resumeTimer();
  restoreAudioSettings(true);
});

newPage2.addEventListener("click", function () {
  winModal2.style.display = "none";
  win_audio.pause();
  nextRoundTo3();
  resumeTimer();
  restoreAudioSettings(true);
});

newPage3.addEventListener("click", function () {
  winModal3.style.display = "none";
  win_audio.pause();
  nextRoundTo4();
  resumeTimer();
  restoreAudioSettings(true);
});

newPage4.addEventListener("click", function () {
  winModal4.style.display = "none";
  win_audio.pause();
  nextRoundFinal();
  resumeTimer();
  restoreAudioSettings(true);
});

newPage.addEventListener("click", function () {
  winModal.style.display = "none";
  win_audio.pause();
  restartGame(true);
  restoreAudioSettings(true);
});

// Restart button
restartBtn.addEventListener("click", function () {
  falseModal.style.display = "none";
  restartGame(true);
});

// Home button
homeBtn.addEventListener("click", function() {
  falseModal.style.display = "none";
  home.style.display = "flex";
  container.style.display = "none";
  
  // Barcha audio elementlarini to'xtatish va menu audio'ni ishga tushirish
  [audio, audio1, audio2, audio3, win_audio, false_audio].forEach((aud) => {
    aud.pause();
    aud.currentTime = 0;
  });
  menu_audio.play();
});


// Start game (round 1)
btn_3.addEventListener("click", function () {
  container.style.display = "flex";
  round1_card.style.display = "flex";
  round2_card.style.display = "none";
  round3_card.style.display = "none";
  card2.style.display = "none";
  home.style.display = "none";
  menu.style.display = "block";
  resume.style.display = "none";
  menu_audio.pause();

  currentRound = 1;
  availableImages = [...round1Images];
  matchedPairs.clear();
  selectedImages = [];

  gameImages = shuffle([...round1Images, ...round1Images]);
  round1Cards.forEach((card, index) => {
    const img = card.querySelector("img");
    img.src = "assets1/img1.png";
    img.dataset.image = gameImages[index];
  });

  // Restore audio settings with force play
  restoreAudioSettings(true);

  elapsedTime = 0;
  startTime = Date.now();
  clearInterval(timerInterval);
  timerInterval = setInterval(updateTime, 1000);
  isPaused = false;
  timerDisplay.textContent = roundTimeLimits[currentRound];
});

// Exit to menu
btn_4.addEventListener("click", function () {
  home.style.display = "flex";
  resume.style.display = "none";
  menu.style.display = "none";

  [audio, audio1, audio2, audio3, win_audio, false_audio].forEach((aud) => {
    aud.pause();
    aud.currentTime = 0;
  });

  menu_audio.play();
  container.style.display = "none";
  pauseTimer();
  music_name.style.display = "none";

  if (currentRound === 1) {
    round1Cards.forEach((card) => {
      const img = card.querySelector("img");
      img.src = "assets1/img1.png";
    });
  } else if (currentRound === 2) {
    round2Cards.forEach((card) => {
      const img = card.querySelector("img");
      img.src = "assets1/img1.png";
    });
  } else if (currentRound === 3) {
    round3Cards.forEach((card) => {
      const img = card.querySelector("img");
      img.src = "assets1/img1.png";
    });
  } else if (currentRound === 4) {
    round4Cards.forEach((card) => {
      const img = card.querySelector("img");
      img.src = "assets1/img1.png";
    });
  } else {
    cards.forEach((card) => {
      const img = card.querySelector("img");
      img.src = "assets1/img1.png";
    });
  }
});

// Restart from menu
btn_2.addEventListener("click", function () {
  menu.style.display = "none";
  restartGame(true);
  music_name.style.display = "none";
});

// Sound toggle
loop.addEventListener("click", function () {
  loop.style.display = "none";
  muted.style.display = "block";
  localStorage.setItem("isMuted", "true");
  restoreAudioSettings();
});

muted.addEventListener("click", function () {
  loop.style.display = "block";
  muted.style.display = "none";
  localStorage.setItem("isMuted", "false");
  restoreAudioSettings();
});

// Event listeners for cards
round1Cards.forEach((card) => {
  card.addEventListener("click", handleClick);
});

round2Cards.forEach((card) => {
  card.addEventListener("click", handleClick);
});

round3Cards.forEach((card) => {
  card.addEventListener("click", handleClick);
});

round4Cards.forEach((card) => {
  card.addEventListener("click", handleClick);
});

cards.forEach((card) => {
  card.addEventListener("click", handleClick);
});

// Show menu
menu.addEventListener("click", function () {
  menu.style.display = "none";
  resume.style.display = "flex";
  pauseTimer();
  // Pause all audio without stopping
  [audio, audio1, audio2, audio3].forEach((aud) => aud.pause());
});

// Resume game
btn_1.addEventListener("click", function () {
  resume.style.display = "none";
  menu.style.display = "block";
  resumeTimer();
  music_name.style.display = "none";
  // Resume selected audio
  restoreAudioSettings(true);
});

// Page load
window.onload = function () {
  onPageLoad();
};
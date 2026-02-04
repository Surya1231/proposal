// DOM Elements
const landingScreen = document.getElementById('landing-screen');
const introScreen = document.getElementById('intro-screen');
const galleryScreen = document.getElementById('gallery-screen');
const proposalScreen = document.getElementById('proposal-screen');
const celebrationScreen = document.getElementById('celebration-screen');
const bgMusic = document.getElementById('bg-music');

const nextSlideBtn = document.getElementById('next-slide-btn');
const slides = document.querySelectorAll('.slide');
const yesBtn = document.getElementById('yes-btn');
const noBtn = document.getElementById('no-btn');

let currentSlide = 0;

// 1. Start Experience (Audio + Screen Transition)
landingScreen.addEventListener('click', () => {
  // Attempt play music
  bgMusic.play().catch(e => {
    console.log("Audio play failed (user interaction needed or file missing):", e);
  });

  // Fade out landing, fade in intro
  gsap.to(landingScreen, {
    opacity: 0, duration: 1, onComplete: () => {
      landingScreen.classList.add('hidden');
      introScreen.classList.remove('hidden');
      runIntro();
    }
  });
});

// Background Hearts Generator
function createHeart() {
  const heart = document.createElement('div');
  heart.classList.add('floating-heart');
  heart.innerHTML = '❤️';
  heart.style.left = Math.random() * 100 + 'vw';
  heart.style.fontSize = Math.random() * 20 + 10 + 'px';
  heart.style.animationDuration = Math.random() * 5 + 5 + 's';

  document.body.appendChild(heart);

  setTimeout(() => {
    heart.remove();
  }, 10000);
}
setInterval(createHeart, 500);

// 2. Intro Animation (Typewriter)
function runIntro() {
  const text1 = "Every love story is beautiful...";
  const text2 = "But ours is my favorite.";
  const line1 = document.getElementById('line1');
  const line2 = document.getElementById('line2');

  line1.style.opacity = 1;
  typeWriter(line1, text1, 0, () => {
    setTimeout(() => {
      line2.style.opacity = 1;
      typeWriter(line2, text2, 0, () => {
        setTimeout(() => {
          transitionToScreen(introScreen, galleryScreen);
        }, 2000);
      });
    }, 500);
  });
}

function typeWriter(element, text, i, callback) {
  if (i < text.length) {
    element.innerHTML += text.charAt(i);
    setTimeout(() => typeWriter(element, text, i + 1, callback), 80);
  } else {
    if (callback) callback();
  }
}

function transitionToScreen(from, to) {
  gsap.to(from, {
    opacity: 0, duration: 1, onComplete: () => {
      from.classList.add('hidden');
      to.classList.remove('hidden');
      gsap.fromTo(to, { opacity: 0 }, { opacity: 1, duration: 1 });
    }
  });
}

// ... existing gallery logic ...

// "No" Button Playful Text
const noTexts = [
  "Are you sure?",
  "Think again!",
  "Don't do not!",
  "Have a heart!",
  "Last chance!",
  "I'll cry!",
  "Really?",
  "Catch me!"
];

function moveNoButton(e) {
  if (e) e.preventDefault(); // Stop default action (especially on touch/click)

  // Change Text Check
  const randomText = noTexts[Math.floor(Math.random() * noTexts.length)];
  noBtn.innerText = randomText;

  // 1. Reveal Yes Button if hidden (Same as before)
  if (yesBtn.classList.contains('hidden-btn')) {
    yesBtn.classList.remove('hidden-btn');
    gsap.fromTo(yesBtn,
      { opacity: 0, scale: 0.5, rotation: -10 },
      { opacity: 1, scale: 1, rotation: 0, duration: 0.6, ease: "elastic.out(1, 0.5)" }
    );
    noBtn.style.position = 'fixed';
    noBtn.style.zIndex = '1000';
  }

  // 2. Calculate Runaway Coordinates
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;
  const btnWidth = noBtn.offsetWidth;
  const btnHeight = noBtn.offsetHeight;

  const padding = 50;
  const maxLeft = viewportWidth - btnWidth - padding;
  const maxTop = viewportHeight - btnHeight - padding;

  let newLeft = Math.random() * maxLeft;
  let newTop = Math.random() * maxTop;

  // Clamp min values
  newLeft = Math.max(padding, newLeft);
  newTop = Math.max(padding, newTop);

  // 3. Creative Animation
  gsap.to(noBtn, {
    left: newLeft,
    top: newTop,
    rotation: Math.random() * 40 - 20,
    scale: 0.9 + Math.random() * 0.2,
    duration: 0.3,
    ease: "power2.out",
    overwrite: true
  });
}

// 3. Gallery Logic
nextSlideBtn.addEventListener('click', () => {
  slides[currentSlide].classList.remove('active-slide');
  currentSlide++;

  if (currentSlide < slides.length) {
    slides[currentSlide].classList.add('active-slide');
  } else {
    // End of gallery, go to proposal
    transitionToScreen(galleryScreen, proposalScreen);
    initProposal();
  }
});

// 4. Proposal Logic
function initProposal() {
  // Make sure 'No' button is positioned relatively correctly first if needed
  // But we are using absolute for run-away, so let's set initial state logic if needed
}

// "No" Button Runaway Logic
noBtn.addEventListener('mouseover', moveNoButton);
noBtn.addEventListener('touchstart', moveNoButton);
noBtn.addEventListener('click', moveNoButton); // Handle clicks too if they are fast!

function moveNoButton(e) {
  if (e) e.preventDefault(); // Stop default action (especially on touch/click)

  // 1. Reveal Yes Button if hidden
  if (yesBtn.classList.contains('hidden-btn')) {
    yesBtn.classList.remove('hidden-btn');
    // Animate Yes in with a pop
    gsap.fromTo(yesBtn,
      { opacity: 0, scale: 0.5, rotation: -10 },
      { opacity: 1, scale: 1, rotation: 0, duration: 0.6, ease: "elastic.out(1, 0.5)" }
    );

    // Switch No to fixed to run freely on screen
    noBtn.style.position = 'fixed';
    noBtn.style.zIndex = '1000';
  }

  // 2. Calculate Runaway Coordinates
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;
  const btnWidth = noBtn.offsetWidth;
  const btnHeight = noBtn.offsetHeight;

  // Safety buffer to keep it well inside
  const padding = 50;
  const maxLeft = viewportWidth - btnWidth - padding;
  const maxTop = viewportHeight - btnHeight - padding;

  let newLeft = Math.random() * maxLeft;
  let newTop = Math.random() * maxTop;

  // Clamp min values
  newLeft = Math.max(padding, newLeft);
  newTop = Math.max(padding, newTop);

  // 3. Creative Animation (Run away with rotation/scale)
  gsap.to(noBtn, {
    left: newLeft,
    top: newTop,
    rotation: Math.random() * 40 - 20, // Random tilt
    scale: 0.9 + Math.random() * 0.2, // Tiny scale jitter
    duration: 0.3,
    ease: "power2.out", // Smooth but quick escape
    overwrite: true // Ensure we interrupt any previous move
  });
}

// 5. Celebration
yesBtn.addEventListener('click', () => {
  // Launch Confetti
  launchConfetti();

  // Play happy sound or swell music (handled by bgMusic loop essentially)

  // Transition
  transitionToScreen(proposalScreen, celebrationScreen);
});

function launchConfetti() {
  const duration = 5 * 1000;
  const animationEnd = Date.now() + duration;
  const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

  function randomInOut(min, max) {
    return Math.random() * (max - min) + min;
  }

  const interval = setInterval(function () {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      return clearInterval(interval);
    }

    const particleCount = 50 * (timeLeft / duration);
    // since particles fall down, start a bit higher than random
    confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInOut(0.1, 0.3), y: Math.random() - 0.2 } }));
    confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInOut(0.7, 0.9), y: Math.random() - 0.2 } }));
  }, 250);
}

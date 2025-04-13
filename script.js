const toggleBtn = document.getElementById("toggle-btn");
const muteBtn = document.getElementById("mute-btn");
const body = document.body;
const audio = document.getElementById("bravo-audio");
const overlay = document.getElementById("overlay");
const typedText = document.getElementById("typed-text");

const words = ["Bravo", "Six", "Going", "Dark"];
let isMuted = false;
let typingInterval;

function typeWords(words, index = 0) {
  typedText.textContent = "";
  if (index >= words.length) return;

  let word = words[index];
  let charIndex = 0;

  typingInterval = setInterval(() => {
    if (charIndex < word.length) {
      typedText.textContent += word[charIndex++];
    } else {
      clearInterval(typingInterval);
      setTimeout(() => {
        typeWords(words, index + 1);
        typedText.textContent = "";
      }, 400);
    }
  }, 120);
}

toggleBtn.addEventListener("click", () => {
  const isDark = body.classList.contains("dark-mode");

  if (!isDark) {
    overlay.classList.remove("hidden");
    overlay.classList.add("show");

    typedText.textContent = "";
    typeWords(words);

    if (!isMuted) {
      audio.currentTime = 0;
      audio.play();
    }

    setTimeout(() => {
      overlay.classList.remove("show");
      overlay.classList.add("exit");
      body.classList.add("dark-mode");

      setTimeout(() => {
        overlay.classList.add("hidden");
        overlay.classList.remove("exit");
      }, 1000);
    }, 4000);
  } else {
    overlay.classList.remove("hidden");
    overlay.classList.add("show");

    typedText.textContent = "Going Light...";

    setTimeout(() => {
      body.classList.remove("dark-mode");
      overlay.classList.remove("show");
      overlay.classList.add("exit");

      setTimeout(() => {
        overlay.classList.add("hidden");
        overlay.classList.remove("exit");
      }, 1000);
    }, 2000);
  }
});

muteBtn.addEventListener("click", () => {
  isMuted = !isMuted;
  muteBtn.textContent = isMuted ? "🔇" : "🔊";
});

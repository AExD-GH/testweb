const toggleBtn = document.getElementById("toggle-btn");
const body = document.body;
const audio = document.getElementById("bravo-audio");
const overlay = document.getElementById("overlay");
const morphText = document.getElementById("morph-text");

const words = ["Bravo", "Six", "Going", "Dark"];
let morphIndex = 0;
let morphInterval;

toggleBtn.addEventListener("click", () => {
  const isDarkMode = body.classList.contains("dark-mode");

  if (!isDarkMode) {
    // Reset morph index
    morphIndex = 0;
    morphText.textContent = words[morphIndex];

    // Show overlay and play audio
    overlay.classList.remove("hidden");
    overlay.classList.add("show");
    audio.currentTime = 0;
    audio.play();

    // Start morphing words every 600ms
    morphInterval = setInterval(() => {
      morphIndex++;
      if (morphIndex < words.length) {
        morphText.textContent = words[morphIndex];
      }
    }, 600);

    // After ~3s, apply dark mode and remove overlay
    setTimeout(() => {
      overlay.classList.remove("show");
      body.classList.add("dark-mode");
      clearInterval(morphInterval);

      setTimeout(() => {
        overlay.classList.add("hidden");
      }, 1000);
    }, 3000);
  } else {
    body.classList.remove("dark-mode");
  }
});

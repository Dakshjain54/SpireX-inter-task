const paragraphs = {
  general: {
    easy: [
      "The quick brown fox jumps over the lazy dog.",
      "Practice makes your typing faster and more accurate.",
      "A journey of a thousand miles begins with a single step."
    ],
    medium: [
      "Success is not final, failure is not fatal: it is the courage to continue that counts. Small steps taken every single day lead to great accomplishments.",
      "Reading daily expands your knowledge, sharpens your mind, and helps you communicate clearly in everyday life."
    ],
    hard: [
      "In the modern information age, the ability to synthesize complex ideas into concise, actionable insights is an invaluable skill for professionals and students alike."
    ]
  },
  technology: {
    easy: [
      "Computers process data very fast.",
      "The internet connects millions of devices around the world."
    ],
    medium: [
      "Artificial intelligence and machine learning are revolutionizing modern software engineering and automation in industry.",
      "Cloud computing provides scalable infrastructure, allowing applications to serve users globally with minimal downtime."
    ],
    hard: [
      "Cybersecurity protocols must continually evolve to safeguard sensitive cryptographic keys and distributed network infrastructure from sophisticated threat vectors."
    ]
  },
  programming: {
    easy: [
      "JavaScript makes web pages interactive.",
      "Functions take inputs, perform operations, and return outputs."
    ],
    medium: [
      "Object-oriented programming helps structure code into reusable classes, while functional programming emphasizes immutability and pure functions.",
      "Version control systems like Git allow developers to track changes, collaborate seamlessly, and manage code branches."
    ],
    hard: [
      "Asynchronous event loops in single-threaded environments delegate non-blocking input and output tasks to operating system kernels efficiently."
    ]
  }
};

// DOM Elements
const paragraphBox = document.getElementById("paragraphBox");
const typingArea = document.getElementById("typingArea");
const wpmDisplay = document.getElementById("wpm");
const accuracyDisplay = document.getElementById("accuracy");
const mistakesDisplay = document.getElementById("mistakes");
const timerDisplay = document.getElementById("timer");
const bestWpmDisplay = document.getElementById("bestWpmDisplay");

const categorySelect = document.getElementById("categorySelect");
const difficultySelect = document.getElementById("difficultySelect");
const timeSelect = document.getElementById("timeSelect");

const progressFill = document.getElementById("progressFill");
const progressText = document.getElementById("progressText");
const restartBtn = document.getElementById("restartBtn");

const resultModal = document.getElementById("resultModal");
const modalRestartBtn = document.getElementById("modalRestartBtn");
const feedbackMsg = document.getElementById("feedbackMsg");
const finalWpm = document.getElementById("finalWpm");
const finalAccuracy = document.getElementById("finalAccuracy");
const finalMistakes = document.getElementById("finalMistakes");
const finalTime = document.getElementById("finalTime");
const finalChars = document.getElementById("finalChars");
const finalBestWpm = document.getElementById("finalBestWpm");

// State Variables
let currentParagraph = "";
let timer = null;
let maxTime = 60;
let timeLeft = 60;
let isTyping = false;
let bestWpm = localStorage.getItem("bestWpm") ? parseInt(localStorage.getItem("bestWpm")) : 0;

function init() {
  bestWpmDisplay.innerText = bestWpm;
  resetTest();

  typingArea.addEventListener("input", handleTyping);
  restartBtn.addEventListener("click", resetTest);
  modalRestartBtn.addEventListener("click", resetTest);

  categorySelect.addEventListener("change", resetTest);
  difficultySelect.addEventListener("change", resetTest);
  timeSelect.addEventListener("change", resetTest);
}

function loadParagraph() {
  const category = categorySelect.value;
  const difficulty = difficultySelect.value;
  const list = paragraphs[category][difficulty];
  const randomIndex = Math.floor(Math.random() * list.length);
  
  currentParagraph = list[randomIndex];

  paragraphBox.innerHTML = "";
  currentParagraph.split("").forEach((char, index) => {
    const span = document.createElement("span");
    span.classList.add("char");
    if (index === 0) span.classList.add("current");
    span.innerText = char;
    paragraphBox.appendChild(span);
  });
}

function startTimer() {
  timer = setInterval(() => {
    if (timeLeft > 0) {
      timeLeft--;
      updateTimerDisplay();
      updateLiveStats();
    } else {
      finishTest();
    }
  }, 1000);
}

function updateTimerDisplay() {
  const mins = Math.floor(timeLeft / 60);
  const secs = timeLeft % 60;
  const formattedMins = mins < 10 ? `0${mins}` : mins;
  const formattedSecs = secs < 10 ? `0${secs}` : secs;
  timerDisplay.innerText = `${formattedMins}:${formattedSecs}`;
}

// Single centralized metric calculation helper
function calculateMetrics(typedText, timeElapsedInSeconds) {
  let correctCount = 0;
  let mistakeCount = 0;

  for (let i = 0; i < typedText.length; i++) {
    if (typedText[i] === currentParagraph[i]) {
      correctCount++;
    } else {
      mistakeCount++;
    }
  }

  const timeInMinutes = timeElapsedInSeconds / 60;
  const wpm = timeInMinutes > 0 ? Math.round((typedText.length / 5) / timeInMinutes) : 0;
  const accuracy = typedText.length > 0 ? ((correctCount / typedText.length) * 100).toFixed(1) : 100;

  return { wpm, accuracy, correctCount, mistakeCount, totalTyped: typedText.length };
}

// Highlight character spans green/red/current cursor
function updateCharacterFeedback(typedText) {
  const charSpans = paragraphBox.querySelectorAll(".char");

  charSpans.forEach((span, index) => {
    const typedChar = typedText[index];

    if (typedChar == null) {
      span.className = "char";
      if (index === typedText.length) {
        span.classList.add("current");
      }
    } else if (typedChar === span.innerText) {
      span.className = "char correct";
    } else {
      span.className = "char incorrect";
    }
  });
}

// Update progress bar percentage
function updateProgressBar(typedLength) {
  const progress = Math.min(100, Math.round((typedLength / currentParagraph.length) * 100));
  progressFill.style.width = `${progress}%`;
  progressText.innerText = `${progress}%`;
}

// Live stats update
function updateLiveStats() {
  const timeElapsed = maxTime - timeLeft;
  const metrics = calculateMetrics(typingArea.value, timeElapsed);

  wpmDisplay.innerText = metrics.wpm;
  accuracyDisplay.innerText = `${metrics.accuracy}%`;
  mistakesDisplay.innerText = metrics.mistakeCount;
}

// Main event handler split into clear focused tasks
function handleTyping() {
  const typedText = typingArea.value;

  if (!isTyping && typedText.length > 0) {
    isTyping = true;
    startTimer();
  }

  updateCharacterFeedback(typedText);
  updateProgressBar(typedText.length);
  updateLiveStats();

  if (typedText.length >= currentParagraph.length) {
    finishTest();
  }
}

function finishTest() {
  clearInterval(timer);
  typingArea.disabled = true;

  const timeElapsed = maxTime - timeLeft;
  const metrics = calculateMetrics(typingArea.value, timeElapsed);

  // Update Best WPM
  if (metrics.wpm > bestWpm) {
    bestWpm = metrics.wpm;
    localStorage.setItem("bestWpm", bestWpm);
    bestWpmDisplay.innerText = bestWpm;
  }

  // Populate Result Modal
  finalWpm.innerText = `${metrics.wpm} WPM`;
  finalAccuracy.innerText = `${metrics.accuracy}%`;
  finalMistakes.innerText = metrics.mistakeCount;
  finalTime.innerText = formatTime(timeElapsed);
  finalChars.innerText = metrics.totalTyped;
  finalBestWpm.innerText = `${bestWpm} WPM`;

  feedbackMsg.innerText = getPerformanceMessage(metrics.wpm, parseFloat(metrics.accuracy));
  resultModal.classList.add("active");
}

function getPerformanceMessage(wpm, accuracy) {
  if (wpm >= 60 && accuracy >= 95) return "🔥 Outstanding Typing Performance!";
  if (wpm >= 40) return "🚀 Great job! Excellent speed and accuracy.";
  if (wpm >= 25) return "👍 Good work! Keep practicing daily.";
  return "💪 Keep practicing! Practice makes perfect.";
}

function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  const formattedMins = mins < 10 ? `0${mins}` : mins;
  const formattedSecs = secs < 10 ? `0${secs}` : secs;
  return `${formattedMins}:${formattedSecs}`;
}

function resetTest() {
  clearInterval(timer);
  timer = null;

  maxTime = parseInt(timeSelect.value);
  timeLeft = maxTime;
  isTyping = false;

  typingArea.value = "";
  typingArea.disabled = false;
  
  progressFill.style.width = "0%";
  progressText.innerText = "0%";

  wpmDisplay.innerText = "0";
  accuracyDisplay.innerText = "100%";
  mistakesDisplay.innerText = "0";
  updateTimerDisplay();

  resultModal.classList.remove("active");
  loadParagraph();
  typingArea.focus();
}

document.addEventListener("DOMContentLoaded", init);

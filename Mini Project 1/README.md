# 🪨📄✂️ Rock Paper Scissors - Premium Mini Game

A modern, vibrant, interactive, and feature-packed **Rock Paper Scissors** web game built using pure **HTML5, CSS3, and Vanilla JavaScript**. Designed with modern glassmorphism aesthetics, dynamic sound effects, confetti celebrations, and a Dark/Light theme toggle.

![Rock Paper Scissors Game Preview](https://img.shields.shields.io/badge/Status-Complete-success?style=for-the-badge)
![Tech Stack](https://img.shields.shields.io/badge/Stack-HTML5%20%7C%20CSS3%20%7C%20Vanilla%20JS-blue?style=for-the-badge)
![License](https://img.shields.shields.io/badge/License-MIT-purple?style=for-the-badge)

---

## ✨ Features

- 🎮 **Player vs Computer Gameplay**: Fast-paced rounds with randomized computer choices and instant result evaluation.
- 🏁 **First to 5 Points Match**: Live score tracking with a match victory condition at 5 points.
- 🌙 / ☀️ **Dark & Light Mode Toggle**: Smoothly switch between Dark Glassmorphism and Frosted Light themes with preference saved in `localStorage`.
- 🎵 **Web Audio API Sound Effects**: Synthesized audio feedback for button clicks, victory chords, and defeat tones (no external audio files required).
- 🎉 **Confetti Celebration**: Custom DOM particle confetti animation on match victory.
- 🏆 **Bouncing Trophy Modal**: Celebratory popup modal with score summary and a one-click "Play Again" reset system.
- ✨ **Glassmorphism & Neon Glow**: Beautiful translucent UI container with glowing scoreboard cards and hover animations.
- 💫 **Floating Background Icons**: Faded, floating Rock, Paper, and Scissors watermark icons.
- 📱 **100vh Responsive Layout**: Fits perfectly on desktop, tablet, and mobile screens without page scrolling.
- ⚡ **Zero Dependencies**: Built strictly using standard web technologies — no React, Bootstrap, Tailwind, or jQuery needed!

---

## 🛠️ Tech Stack

| Technology | Usage |
| :--- | :--- |
| **HTML5** | Semantic structure, accessibility labels (`aria`), and modal popups. |
| **CSS3** | Glassmorphism (`backdrop-filter`), CSS variables, animations, flexbox/grid layout, and Dark/Light themes. |
| **Vanilla JavaScript** | Web Audio API synthesizer, score tracking, random AI move selection, DOM particle confetti, and `localStorage` state persistence. |

---

## 📁 File Structure

```text
Mini Project 1/
│
├── index.html        # Main HTML structure, scoreboard, showcase, and modal
├── style.css         # Glassmorphism design system, themes, and keyframe animations
├── script.js         # Game state logic, audio synthesizer, confetti, and theme toggle
└── README.md         # Project documentation for GitHub
```

---

## 🚀 How to Run Locally

Since this project uses pure HTML, CSS, and Vanilla JavaScript, no installation or build steps are required!

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/rock-paper-scissors.git
   ```
2. **Navigate to the project folder**:
   ```bash
   cd rock-paper-scissors
   ```
3. **Open `index.html` in your browser**:
   - Double-click `index.html` file, or
   - Right-click and select **Open with Browser** (Chrome, Firefox, Edge, Safari, etc.).

---

## 🎮 Game Rules

| Choice | Beats |
| :--- | :--- |
| 🪨 **Rock** | ✂️ Scissors (Crushes) |
| 📄 **Paper** | 🪨 Rock (Covers) |
| ✂️ **Scissors** | 📄 Paper (Cuts) |

- Each round victory awards **1 Point**.
- The first participant (Player or Computer) to reach **5 Points** wins the entire match!

---

## 📜 License

This project is licensed under the **MIT License**. Feel free to customize and use it for learning or portfolio projects!

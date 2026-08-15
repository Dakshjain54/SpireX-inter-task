# ⌨️ Typing Speed Test

A simple, modern, and responsive **Typing Speed Test** web application built with pure HTML5, CSS3, and Vanilla JavaScript. Designed for high performance, clean aesthetics, and ease of explanation in college project presentations.

---

## 🎯 Features

- **Live Paragraph Rendering**: Dynamic character-by-character color feedback (Green for correct, Red for incorrect, Underline cursor for current character).
- **Automatic Timer**: Starts automatically when the user begins typing and updates every second until completion.
- **Real-Time Statistics**:
  - **WPM (Words Per Minute)** based on standard character formula.
  - **Accuracy (%)** based on correct character entries.
  - **Time Elapsed (MM:SS)**.
  - **Total Characters Typed**.
- **Final Result Card**: Clean popup modal summarizing final performance statistics upon completing the paragraph.
- **Try Again Button**: Quickly reset the timer, clear input, and start a fresh test with a new random paragraph.
- **Responsive Layout**: Modern card-based UI that scales smoothly across desktop and mobile devices.

---

## 🛠️ Technology Stack

- **HTML5**: Semantic layout structure.
- **CSS3**: Custom properties (variables), Flexbox, CSS Grid, clean typography, and subtle transitions.
- **Vanilla JavaScript (ES6)**: DOM manipulation, `setInterval`/`clearInterval`, string indexing, and mathematical calculations.

---

## 📁 Project Structure

```text
typing-speed-test/
│
├── index.html       # Application HTML structure
├── style.css        # Custom CSS styling and responsive layout
├── script.js        # Core logic, timer, and DOM manipulation
└── README.md        # Documentation and presentation guide
```

---

## 🧮 Mathematical Formulas Used

### 1. Words Per Minute (WPM)
The standard typing test metric evaluates 1 word as 5 characters:
$$\text{WPM} = \frac{\text{Characters Typed} / 5}{\text{Time in Minutes}}$$

```javascript
const timeInMinutes = elapsedSeconds / 60;
const wpm = Math.round((totalTyped / 5) / timeInMinutes);
```

### 2. Accuracy (%)
Calculated as the ratio of correctly typed characters to total characters entered:
$$\text{Accuracy (\%)} = \frac{\text{Correct Characters}}{\text{Total Characters Typed}} \times 100$$

```javascript
const accuracy = ((correctChars / totalTyped) * 100).toFixed(1);
```

---

## 🚀 How to Run the Project

1. Clone or download the project files.
2. Open `index.html` directly in any standard web browser (Google Chrome, Mozilla Firefox, Microsoft Edge, Safari).
3. Start typing in the text area to initiate the speed test!

---

## 🧠 Key JavaScript Functions Explained

| Function Name | Purpose |
| :--- | :--- |
| `loadParagraph()` | Selects a random paragraph and wraps every letter in a `<span>` element for real-time styling. |
| `startTimer()` | Launches an interval timer via `setInterval()` updating `elapsedSeconds` every 1000ms. |
| `handleInput()` | Evaluates input in real-time, updates character highlights (`correct` / `incorrect`), and triggers completion check. |
| `updateStats()` | Recalculates live WPM and Accuracy metrics. |
| `finishTest()` | Stops the timer, disables textarea input, and displays the summary modal. |
| `resetTest()` | Resets all state variables, clears inputs, hides modal, and loads a new test. |

---

## 🎨 Design Philosophy

- **Minimalist & Professional**: Styled with modern slate and indigo accents, avoiding heavy glassmorphism or distracting animations.
- **No External Libraries**: 100% dependency-free vanilla code.

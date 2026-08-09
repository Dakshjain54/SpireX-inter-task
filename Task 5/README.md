# ColorCraft — Premium Color Palette Generator

> Create, lock, customize, inspect, and export stunning color schemes instantly with pure Vanilla JavaScript, CSS3, and HTML5.

![ColorCraft Banner](https://img.shields.io/badge/Stack-HTML5%20%7C%20CSS3%20%7C%20Vanilla%20JS-blueviolet) ![Zero Dependencies](https://img.shields.io/badge/Dependencies-Zero-brightgreen) ![License](https://img.shields.io/badge/License-MIT-blue)

---

## 🎨 Overview

**ColorCraft** is a modern, responsive, portfolio-grade **Color Palette Generator** web application. Designed for designers, developers, and creators, it provides a sleek glassmorphic dark theme interface with intuitive interactions, dynamic HSL color theory math, color contrast accessibility checks, and local persistence.

---

## ✨ Features

### 🌈 1. Dynamic Palette Engine
* **5 Interactive Color Cards**: Displays real-time HEX code, RGB values, HSL values, and closest friendly Color Name.
* **10 Color Harmony Modes**:
  * 🎲 **Random (Cohesive)**: Smart randomized hues with balanced saturation and lightness.
  * 🌈 **Analogous**: Adjacent hues on the color wheel for natural harmony.
  * 🌓 **Monochromatic**: Varied lightness and saturation of a single core hue.
  * ☯️ **Complementary**: High-contrast opposite hues.
  * 🔺 **Triadic**: 120-degree balanced color triangle.
  * 📐 **Split-Complementary**: Base hue combined with adjacent complement hues.
  * 🌸 **Soft Pastels**: Gentle, desaturated high-lightness tones.
  * ⚡ **Vibrant & Bold**: High-saturation, high-energy palettes.
  * 🌙 **Dark & Moody**: Rich, deep, low-lightness tones.
  * ✨ **Neon Cyber**: Bright, high-intensity fluorescent colors.

### 🔒 2. Locking System
* Individual color cards can be locked (`🔒`) or unlocked (`🔓`).
* Regenerating the palette updates **only unlocked colors**, preserving locked choices.

### ♿ 3. Accessibility & Smart Contrast
* Automatically calculates WCAG 2.1 relative luminance for every color.
* Adjusts text and button elements dynamically (Dark `#0f172a` text vs Light `#ffffff` text) to ensure 100% legibility.
* Displays **AA** and **AAA** contrast quality badges on each color card.

### 🏷️ 4. Color Naming Engine
* Includes a built-in Euclidean color distance lookup algorithm comparing generated colors against a curated dictionary of ~150 standard color names (e.g., *Royal Blue*, *Coral Pink*, *Emerald Green*, *Teal Turquoise*, *Warm Amber*).

### 📋 5. Clipboard & Toast System
* Click any HEX code or Copy button to instantly copy to the clipboard.
* **Copy All Colors**: One-click copying of all 5 HEX values separated by newlines.
* Modern animated floating toast notifications provide immediate feedback.

### 💾 6. Save & LocalStorage Persistence
* Store favorite palettes to `localStorage`.
* Renders miniature 5-swatch palette bars in the **Saved Palettes** section.
* Load saved palettes back to the main canvas or delete them anytime.

### ↓ 7. Export Palette
* Export palette in multiple formats:
  * **Plain Text (.txt)**: `#6C63FF\n#FF6584...`
  * **CSS Variables (.css)**: `:root { --color-1: #6C63FF; ... }`
  * **JSON Array (.json)**: Array of color objects with HEX, RGB, and Names.
* One-click download button saves `.txt`, `.css`, or `.json` file directly.

### 🎛️ 8. Shades & Tints Inspector
* Click **Shades** on any color card to open a modal generating 10 calculated tints and shades (10% to 90% lightness).
* Click any shade tile to copy its code instantly.

### ⌨️ 9. Keyboard Shortcuts
* <kbd>Space</kbd> : Generate new color palette
* <kbd>1</kbd> – <kbd>5</kbd> : Toggle lock on color card 1 to 5
* <kbd>S</kbd> : Save current palette to favorites
* <kbd>C</kbd> : Copy all 5 HEX codes to clipboard
* <kbd>Ctrl</kbd> + <kbd>Z</kbd> / <kbd>Cmd</kbd> + <kbd>Z</kbd> : Undo previous palette change
* <kbd>Ctrl</kbd> + <kbd>Y</kbd> / <kbd>Cmd</kbd> + <kbd>Y</kbd> : Redo next palette change

---

## 📁 Project Structure

```text
color-palette-generator/
│
├── index.html       # HTML5 structure with semantic layout and modal elements
├── style.css        # Custom CSS design system, glassmorphism, glowing ambient orbs, animations
├── script.js        # Modular Vanilla JS (color math, DOM engine, storage, export, toasts)
└── README.md        # Documentation and feature guide
```

---

## 🚀 How to Run

1. Clone or download the project repository.
2. Open `color-palette-generator/index.html` directly in any standard modern web browser (Google Chrome, Mozilla Firefox, Microsoft Edge, Apple Safari).
3. No build tools, Node.js, or external frameworks required!

---

## 🛠️ Technology Stack

* **HTML5**: Semantic markup, ARIA accessibility attributes, inline crisp SVGs.
* **CSS3**: CSS Custom Properties (variables), Glassmorphism, Dynamic Text Contrast, Keyframe Micro-animations, Flexbox & CSS Grid.
* **Vanilla JavaScript (ES6+)**: DOM manipulation, Canvas-free Color Converters (RGB/HSL/HEX), Clipboard API, LocalStorage API, Keyboard Event Listeners.

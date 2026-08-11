# 🌀 Task 7 — Premium 3D Circular Image Gallery

An interactive, full-screen **3D Circular Wildlife Photography Gallery** created exclusively using **HTML5, CSS3, and Vanilla JavaScript**. No React, Tailwind, Three.js, GSAP, or third-party libraries used.

---

## ✨ Key Features

- 🌀 **3D Cylindrical Geometry**: 10 high-resolution animal photography cards arranged in a 360-degree cylindrical orbit using CSS 3D transforms (`transform-style: preserve-3d`, `rotateY`, `translateZ`).
- 🔄 **Dual Rotation Engine**:
  - **Scroll / Wheel Rotation**: Mouse wheel and touch drag directly drive smooth gallery rotation angles.
  - **Auto Rotation**: Continuous idle rotation loop (`requestAnimationFrame`) running at a smooth 60fps.
  - **Smart Pause/Resume**: Auto-rotation pauses seamlessly during user scroll or drag and resumes automatically after 250ms of inactivity.
- 🌌 **Depth & Lighting Attenuation**: Dynamic distance-based calculations darken, blur, and fade back-facing cards (`opacity: 0.3`, `brightness: 0.35`, `blur: 2.5px`) while emphasizing front-facing cards (`opacity: 1.0`, `brightness: 1.05`).
- 🖱️ **Mouse Parallax Pitch Tilt**: Subtle mouse movements add 3D perspective pitch tilt (`rotateX`) to the gallery stage.
- ⌨️ **Keyboard Controls**:
  - `<Left Arrow>` / `<Right Arrow>`: Step-rotate one card position (36°).
  - `<Space>`: Toggle manual auto-rotation Pause/Play state.
- 📱 **Fluid Responsive Breakpoints**:
  - **Desktop (≥1025px)**: Card 300×400px, 3D Radius 600px
  - **Tablet (641px–1024px)**: Card 240×320px, 3D Radius 450px
  - **Mobile (≤640px)**: Card 190×280px, 3D Radius 300px

---

## 📁 Project Structure

```text
image-gallery/
├── index.html   # Full-screen 3D scene stage, header, and footer markup
├── style.css    # 3D perspective, cylindrical transforms, dark glassmorphism styling
├── script.js    # 3D math engine, Lerp rotation loop, depth lighting calculation, event handlers
└── README.md    # Documentation & setup guide
```

---

## 🚀 How to Run

1. Open `index.html` directly in any web browser (Google Chrome, Firefox, Edge, Safari).
2. Alternatively, serve via any static web server (e.g. `npx serve` or Python `python -m http.server 8080`).

---

## 🎨 3D Math Logic

Each card is positioned around a 360° circular orbit:

$$\text{Angle Step} = \frac{360^\circ}{\text{Total Cards}} = 36^\circ$$

$$\text{Card Transform} = \text{rotateY}(\text{index} \times 36^\circ) \quad \text{translateZ}(R)$$

Card distance normalized angle relative to the front viewer ($0^\circ$):

$$\text{Normalized Angle} = \min(|\text{Angle}_{\text{rel}}|, 360^\circ - |\text{Angle}_{\text{rel}}|)$$

$$\text{Opacity} = \max(0.3,\, 1 - \frac{\text{Normalized Angle}}{180^\circ} \times 0.7)$$

---

## 📜 License

Created for Internship Task 7. Open for educational and portfolio demonstration.

const galleryData = [
  {
    name: "Lion",
    scientific: "Panthera leo",
    photographer: "Clément Roy",
    description: "Lion couple resting on a majestic savanna rock.",
    image: "https://images.unsplash.com/photo-1534188753412-3e26d0d618d6?auto=format&fit=crop&w=1000&q=80"
  },
  {
    name: "Elephant",
    scientific: "Elephas maximus",
    photographer: "Alex Azabache",
    description: "Elephants walking near a serene riverbank.",
    image: "https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?auto=format&fit=crop&w=1000&q=80"
  },
  {
    name: "Polar Bear",
    scientific: "Ursus maritimus",
    photographer: "Hans-Jurgen Mager",
    description: "Polar bear navigating an Arctic ice floe.",
    image: "https://images.unsplash.com/photo-1589656966895-2f33e7653819?auto=format&fit=crop&w=1000&q=80"
  },
  {
    name: "Panda",
    scientific: "Ailuropoda melanoleuca",
    photographer: "Sid Balachandran",
    description: "Giant panda enjoying fresh bamboo in the forest.",
    image: "https://images.unsplash.com/photo-1564349683136-77e08dba1ef9?auto=format&fit=crop&w=1000&q=80"
  },
  {
    name: "Cheetah",
    scientific: "Acinonyx jubatus",
    photographer: "David Clode",
    description: "Cheetah resting gracefully in golden grass.",
    image: "https://images.unsplash.com/photo-1534177616072-ef7dc120449d?auto=format&fit=crop&w=1000&q=80"
  },
  {
    name: "Zebra",
    scientific: "Equus quagga",
    photographer: "Harshil Gudka",
    description: "Zebras grazing on golden African plains.",
    image: "https://images.unsplash.com/photo-1501705388883-4ed8a543392c?auto=format&fit=crop&w=1000&q=80"
  },
  {
    name: "Penguin",
    scientific: "Aptenodytes forsteri",
    photographer: "Derek Oyen",
    description: "Emperor penguins on snowy Antarctic ice.",
    image: "https://images.unsplash.com/photo-1598439210625-5067c578f3f6?auto=format&fit=crop&w=1000&q=80"
  },
  {
    name: "Red Panda",
    scientific: "Ailurus fulgens",
    photographer: "Joshua J. Cotten",
    description: "Red panda resting among vibrant autumn leaves.",
    image: "https://images.unsplash.com/photo-1546182990-dffeafbe841d?auto=format&fit=crop&w=1000&q=80"
  },
  {
    name: "Camel",
    scientific: "Camelus dromedarius",
    photographer: "Wolfgang Hasselmann",
    description: "Dromedary camel traversing desert dunes at dusk.",
    image: "https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&w=1000&q=80"
  },
  {
    name: "Tiger",
    scientific: "Panthera tigris",
    photographer: "Frida Larios",
    description: "Bengal tiger in lush jungle water reflection.",
    image: "https://images.unsplash.com/photo-1561731216-c3a4d99437d5?auto=format&fit=crop&w=1000&q=80"
  }
];
// Application State Variables
let currentRotation = 0;
let targetRotation = 0;
let isAutoRotating = true;
let userPausedManually = false;
let autoRotateSpeed = 0.08; // degrees per frame
let idleTimer = null;

// Mouse / Touch Drag Tracking
let isDragging = false;
let startX = 0;
let startRotation = 0;

// Mouse Parallax Pitch Tilt
let targetTiltX = 0;
let currentTiltX = 0;

// Dynamic 3D Radius based on screen width
let radius = 600;
const totalCards = galleryData.length;
const angleStep = 360 / totalCards;
// DOM Elements
const galleryTrack = document.getElementById('galleryTrack');
const scene3d = document.getElementById('scene3d');
const statusDot = document.getElementById('statusDot');
const statusText = document.getElementById('statusText');

// Array of created card DOM elements
const cardElements = [];
// Initialization
document.addEventListener('DOMContentLoaded', () => {
  calculateRadius();
  createGallery();
  setupEventListeners();
  requestAnimationFrame(animationLoop);
});

/**
 * Calculate 3D radius based on viewport width
 */
function calculateRadius() {
  const width = window.innerWidth;
  if (width <= 640) {
    radius = 300;
  } else if (width <= 1024) {
    radius = 450;
  } else {
    radius = 600;
  }
}

/**
 * Generate 3D card elements and position them in a circle
 */
function createGallery() {
  galleryTrack.innerHTML = '';
  cardElements.length = 0;

  galleryData.forEach((data) => {
    const card = document.createElement('article');
    card.className = 'card-3d';
    card.setAttribute('role', 'region');
    card.setAttribute('aria-label', `${data.name} card`);

    card.innerHTML = `
      <div class="card-img-wrapper">
        <img src="${data.image}" alt="${data.description}" class="card-img" loading="lazy">
      </div>
      <div class="card-overlay">
        <h2 class="card-title">${data.name}</h2>
        <p class="card-scientific">${data.scientific}</p>
        <p class="card-photographer">Photo by ${data.photographer}</p>
      </div>
    `;

    galleryTrack.appendChild(card);
    cardElements.push(card);
  });

  positionCards();
}

/**
 * Position cards around 3D cylinder
 */
function positionCards() {
  cardElements.forEach((card, index) => {
    const rotationDeg = index * angleStep;
    card.style.transform = `rotateY(${rotationDeg}deg) translateZ(${radius}px)`;
  });
}
// Animation Loop & 3D Depth Calculation
function animationLoop() {
  // 1. Auto rotation logic
  if (isAutoRotating && !isDragging) {
    targetRotation += autoRotateSpeed;
  }

  // 2. Smooth Lerp interpolation for rotation and tilt
  currentRotation += (targetRotation - currentRotation) * 0.08;
  currentTiltX += (targetTiltX - currentTiltX) * 0.08;

  // 3. Apply 3D matrix transform to gallery track
  galleryTrack.style.transform = `rotateX(${currentTiltX.toFixed(2)}deg) rotateY(${currentRotation.toFixed(2)}deg)`;

  // 4. Update Depth, Opacity and Brightness for back-facing cards
  updateDepth();

  requestAnimationFrame(animationLoop);
}

/**
 * Calculate dynamic opacity and brightness attenuation based on card angle relative to front
 */
function updateDepth() {
  cardElements.forEach((card, index) => {
    const baseAngle = index * angleStep;
    // Calculate effective angle relative to front viewer (0 deg)
    let relAngle = (baseAngle + currentRotation) % 360;
    if (relAngle < 0) relAngle += 360;

    // Distance from front (0 deg)
    const normalizedAngle = Math.abs(relAngle > 180 ? 360 - relAngle : relAngle);

    // Front card (0 deg) -> opacity 1.0, brightness 1.05
    // Back card (180 deg) -> opacity ~0.3, brightness ~0.35, blur 2.5px
    const opacity = Math.max(0.3, 1 - (normalizedAngle / 180) * 0.7);
    const brightness = Math.max(0.35, 1.05 - (normalizedAngle / 180) * 0.7);
    const blur = (normalizedAngle / 180) * 2.5;

    card.style.opacity = opacity.toFixed(2);
    card.style.filter = `brightness(${brightness.toFixed(2)}) blur(${blur.toFixed(1)}px)`;
  });
}
// Interaction Handlers (Scroll, Drag, Keyboard)
function setupEventListeners() {
  // 1. Page Scroll Progress Listener
  window.addEventListener('scroll', () => {
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    if (maxScroll > 0) {
      const progress = window.scrollY / maxScroll;
      targetRotation = progress * 720; // 2 full revolutions over scroll length
      pauseAutoRotateTemporarily();
    }
  }, { passive: true });

  // 2. Wheel Event on Scene
  scene3d.addEventListener('wheel', (e) => {
    targetRotation += e.deltaY * 0.2;
    pauseAutoRotateTemporarily();
  }, { passive: true });

  // Touch & Mouse Drag on Scene
  scene3d.addEventListener('pointerdown', (e) => {
    isDragging = true;
    startX = e.clientX;
    startRotation = targetRotation;
    pauseAutoRotateTemporarily();
    scene3d.setPointerCapture(e.pointerId);
  });

  scene3d.addEventListener('pointermove', (e) => {
    // Mouse Pitch Tilt Effect
    const centerY = window.innerHeight / 2;
    const offsetY = (e.clientY - centerY) / centerY;
    targetTiltX = -offsetY * 8; // pitch -8 to +8 deg

    if (!isDragging) return;
    const deltaX = e.clientX - startX;
    targetRotation = startRotation + deltaX * 0.4;
  });

  const stopDrag = (e) => {
    if (isDragging) {
      isDragging = false;
      try {
        scene3d.releasePointerCapture(e.pointerId);
      } catch (err) {}
      resetIdleTimer();
    }
  };

  scene3d.addEventListener('pointerup', stopDrag);
  scene3d.addEventListener('pointercancel', stopDrag);

  // 3. Keyboard Navigation
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') {
      targetRotation += angleStep;
      pauseAutoRotateTemporarily();
      resetIdleTimer();
    } else if (e.key === 'ArrowLeft') {
      targetRotation -= angleStep;
      pauseAutoRotateTemporarily();
      resetIdleTimer();
    } else if (e.key === ' ' || e.code === 'Space') {
      e.preventDefault();
      userPausedManually = !userPausedManually;
      if (userPausedManually) {
        stopAutoRotate();
      } else {
        startAutoRotate();
      }
    }
  });

  // 4. Responsive Resize Listener
  window.addEventListener('resize', () => {
    calculateRadius();
    positionCards();
  });
}

function pauseAutoRotateTemporarily() {
  if (userPausedManually) return;
  stopAutoRotate();
  resetIdleTimer();
}

function resetIdleTimer() {
  if (userPausedManually) return;
  clearTimeout(idleTimer);
  idleTimer = setTimeout(() => {
    startAutoRotate();
  }, 250);
}

function startAutoRotate() {
  isAutoRotating = true;
  statusDot.classList.remove('paused');
  statusText.textContent = 'Auto-rotating';
}

function stopAutoRotate() {
  isAutoRotating = false;
  statusDot.classList.add('paused');
  statusText.textContent = userPausedManually ? 'Paused (Space)' : 'Interactive';
}

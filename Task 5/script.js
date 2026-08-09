/**
 * ColorCraft — Premium Color Palette Generator Script
 * Clean Vanilla JavaScript Module
 */

(function () {
  'use strict';

  /* ==========================================================================
     1. Color Name Dictionary (~150 Named Colors for Accurate Lookup)
     ========================================================================== */
  const COLOR_NAMES = [
    { hex: '#000000', name: 'Absolute Black' },
    { hex: '#ffffff', name: 'Pure White' },
    { hex: '#6c63ff', name: 'Royal Blue' },
    { hex: '#ff6584', name: 'Coral Pink' },
    { hex: '#42e2b8', name: 'Teal Turquoise' },
    { hex: '#ffd166', name: 'Warm Amber' },
    { hex: '#121826', name: 'Midnight Slate' },
    { hex: '#ef4444', name: 'Crimson Red' },
    { hex: '#f97316', name: 'Vibrant Orange' },
    { hex: '#f59e0b', name: 'Golden Amber' },
    { hex: '#10b981', name: 'Emerald Green' },
    { hex: '#06b6d4', name: 'Cyan Blue' },
    { hex: '#3b82f6', name: 'Electric Azure' },
    { hex: '#6366f1', name: 'Deep Indigo' },
    { hex: '#8b5cf6', name: 'Vibrant Purple' },
    { hex: '#a855f7', name: 'Amethyst Violet' },
    { hex: '#ec4899', name: 'Neon Fuchsia' },
    { hex: '#f43f5e', name: 'Rose Red' },
    { hex: '#0f172a', name: 'Slate Dark' },
    { hex: '#1e293b', name: 'Charcoal Navy' },
    { hex: '#334155', name: 'Cool Slate' },
    { hex: '#94a3b8', name: 'Dusty Gray' },
    { hex: '#cbd5e1', name: 'Soft Silver' },
    { hex: '#f1f5f9', name: 'Ice White' },
    { hex: '#e11d48', name: 'Ruby Pink' },
    { hex: '#c026d3', name: 'Orchid Magenta' },
    { hex: '#7c3aed', name: 'Deep Violet' },
    { hex: '#2563eb', name: 'Sapphire Blue' },
    { hex: '#0284c7', name: 'Sky Cerulean' },
    { hex: '#0d9488', name: 'Ocean Teal' },
    { hex: '#059669', name: 'Jade Green' },
    { hex: '#65a30d', name: 'Lime Olive' },
    { hex: '#ca8a04', name: 'Mustard Gold' },
    { hex: '#d97706', name: 'Burnt Orange' },
    { hex: '#dc2626', name: 'Scarlet Red' },
    { hex: '#475569', name: 'Steel Gray' },
    { hex: '#64748b', name: 'Muted Slate' },
    { hex: '#fae8ff', name: 'Light Lavender' },
    { hex: '#dbeafe', name: 'Soft Baby Blue' },
    { hex: '#d1fae5', name: 'Soft Mint' },
    { hex: '#fef3c7', name: 'Soft Cream' },
    { hex: '#ffe4e6', name: 'Blush Pink' },
    { hex: '#ffedd5', name: 'Peach Cream' },
    { hex: '#84cc16', name: 'Electric Lime' },
    { hex: '#14b8a6', name: 'Bright Aquamarine' },
    { hex: '#00ffff', name: 'Neon Cyan' },
    { hex: '#ff00ff', name: 'Neon Magenta' },
    { hex: '#ffff00', name: 'Neon Yellow' },
    { hex: '#ff4500', name: 'Orange Red' },
    { hex: '#da70d6', name: 'Orchid' },
    { hex: '#ee82ee', name: 'Violet Pink' },
    { hex: '#4b0082', name: 'Imperial Indigo' },
    { hex: '#2e8b57', name: 'Sea Green' },
    { hex: '#b8860b', name: 'Dark Goldenrod' },
    { hex: '#cd853f', name: 'Peru Copper' },
    { hex: '#d2691e', name: 'Chocolate Bronze' },
    { hex: '#800000', name: 'Maroon' },
    { hex: '#808000', name: 'Olive' },
    { hex: '#008080', name: 'Teal Green' },
    { hex: '#000080', name: 'Navy Blue' },
    { hex: '#fa8072', name: 'Salmon Coral' },
    { hex: '#e9967a', name: 'Dark Salmon' },
    { hex: '#ff7f50', name: 'Coral' },
    { hex: '#ff69b4', name: 'Hot Pink' },
    { hex: '#ff1493', name: 'Deep Pink' },
    { hex: '#ba55d3', name: 'Medium Orchid' },
    { hex: '#9370db', name: 'Medium Purple' },
    { hex: '#7b68ee', name: 'Medium Slate Blue' },
    { hex: '#6495ed', name: 'Cornflower Blue' },
    { hex: '#00bfff', name: 'Deep Sky Blue' },
    { hex: '#48d1cc', name: 'Medium Turquoise' },
    { hex: '#00fa9a', name: 'Medium Spring Green' },
    { hex: '#7fff00', name: 'Chartreuse' },
    { hex: '#adff2f', name: 'Green Yellow' },
    { hex: '#fafad2', name: 'Light Goldenrod' },
    { hex: '#ffe4b5', name: 'Moccasin' },
    { hex: '#ffdab9', name: 'Peach Puff' },
    { hex: '#e6e6fa', name: 'Lavender Crisp' },
    { hex: '#fff0f5', name: 'Lavender Blush' },
    { hex: '#b0c4de', name: 'Light Steel Blue' },
    { hex: '#778899', name: 'Light Slate Gray' },
    { hex: '#2f4f4f', name: 'Dark Slate' },
    { hex: '#8b4513', name: 'Saddle Brown' },
    { hex: '#a0522d', name: 'Sienna' },
    { hex: '#bc8f8f', name: 'Rosy Brown' },
    { hex: '#f0e68c', name: 'Khaki' },
    { hex: '#b22222', name: 'Firebrick' },
    { hex: '#556b2f', name: 'Dark Olive' },
    { hex: '#9932cc', name: 'Dark Orchid' },
    { hex: '#8b008b', name: 'Dark Magenta' },
    { hex: '#8b0000', name: 'Dark Red' },
    { hex: '#e91e63', name: 'Berry Pink' },
    { hex: '#9c27b0', name: 'Purple Plum' },
    { hex: '#673ab7', name: 'Deep Violet Blue' },
    { hex: '#3f51b5', name: 'Indigo Iris' },
    { hex: '#00bcd4', name: 'Cyan Aqua' },
    { hex: '#4caf50', name: 'Forest Mint' },
    { hex: '#8bc34a', name: 'Light Olive' },
    { hex: '#ffeb3b', name: 'Bright Lemon' },
    { hex: '#ff9800', name: 'Tangerine' },
    { hex: '#795548', name: 'Mocha Brown' },
    { hex: '#9e9e9e', name: 'Neutral Gray' },
    { hex: '#607d8b', name: 'Blue Slate' }
  ];

  /* ==========================================================================
     2. Application State Definition
     ========================================================================== */
  const state = {
    cards: [
      { hex: '#6C63FF', rgb: [108, 99, 255], hsl: [244, 100, 69], locked: false, name: 'Royal Blue' },
      { hex: '#FF6584', rgb: [255, 101, 132], hsl: [348, 100, 70], locked: false, name: 'Coral Pink' },
      { hex: '#42E2B8', rgb: [66, 226, 184], hsl: [164, 74, 57], locked: false, name: 'Teal Turquoise' },
      { hex: '#FFD166', rgb: [255, 209, 102], hsl: [42, 100, 70], locked: false, name: 'Warm Amber' },
      { hex: '#121826', rgb: [18, 24, 38], hsl: [222, 36, 11], locked: false, name: 'Midnight Slate' }
    ],
    harmony: 'random',
    history: [],
    historyIndex: -1,
    savedPalettes: [],
    exportFormat: 'txt',
    selectedShadeCardIndex: 0
  };

  const STORAGE_KEY = 'colorcraft_saved_palettes_v1';

  /* ==========================================================================
     3. Utility Functions (Color Math & Converters)
     ========================================================================== */
  function hexToRgb(hex) {
    let cleanHex = hex.replace('#', '');
    if (cleanHex.length === 3) {
      cleanHex = cleanHex.split('').map(c => c + c).join('');
    }
    const num = parseInt(cleanHex, 16);
    return [(num >> 16) & 255, (num >> 8) & 255, num & 255];
  }

  function rgbToHex(r, g, b) {
    const toHex = c => Math.max(0, Math.min(255, Math.round(c))).toString(16).padStart(2, '0');
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase();
  }

  function rgbToHsl(r, g, b) {
    r /= 255;
    g /= 255;
    b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h = 0, s = 0, l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }
    return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)];
  }

  function hslToRgb(h, s, l) {
    h = (h % 360 + 360) % 360 / 360;
    s /= 100;
    l /= 100;
    let r, g, b;

    if (s === 0) {
      r = g = b = l;
    } else {
      const hue2rgb = (p, q, t) => {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1 / 6) return p + (q - p) * 6 * t;
        if (t < 1 / 2) return q;
        if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
        return p;
      };
      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;
      r = hue2rgb(p, q, h + 1 / 3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1 / 3);
    }
    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
  }

  // Calculate Relative Luminance according to WCAG 2.1 specifications
  function getLuminance([r, g, b]) {
    const a = [r, g, b].map(v => {
      v /= 255;
      return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    });
    return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
  }

  function getContrastDetails(rgb) {
    const lum = getLuminance(rgb);
    const lumWhite = 1.0;
    const lumBlack = 0.0;

    const ratioWhite = (lumWhite + 0.05) / (lum + 0.05);
    const ratioBlack = (lum + 0.05) / (lumBlack + 0.05);

    const isLightText = ratioWhite >= ratioBlack;
    const bestRatio = isLightText ? ratioWhite : ratioBlack;

    let badge = 'AA';
    if (bestRatio >= 7.0) badge = 'AAA';
    else if (bestRatio >= 4.5) badge = 'AA';
    else badge = 'A';

    return {
      isLightText,
      badge,
      ratio: bestRatio.toFixed(1)
    };
  }

  // Closest Color Name Finder using Euclidean RGB distance
  function getClosestColorName(targetHex) {
    const [r1, g1, b1] = hexToRgb(targetHex);
    let minDistance = Infinity;
    let closestName = 'Custom Color';

    for (const item of COLOR_NAMES) {
      const [r2, g2, b2] = hexToRgb(item.hex);
      const dist = Math.sqrt(
        Math.pow(r1 - r2, 2) * 0.3 +
        Math.pow(g1 - g2, 2) * 0.59 +
        Math.pow(b1 - b2, 2) * 0.11
      );
      if (dist < minDistance) {
        minDistance = dist;
        closestName = item.name;
      }
    }
    return closestName;
  }

  /* ==========================================================================
     4. Palette Generation Engine & Color Theory Harmonies
     ========================================================================== */
  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function generatePaletteSet(harmonyStyle) {
    const baseHue = getRandomInt(0, 360);
    const hslColors = [];

    switch (harmonyStyle) {
      case 'monochromatic': {
        const baseSat = getRandomInt(45, 85);
        const lStep = 70 / 4;
        for (let i = 0; i < 5; i++) {
          const l = Math.min(92, Math.max(15, Math.round(18 + i * lStep)));
          const s = Math.min(95, Math.max(30, baseSat + getRandomInt(-10, 10)));
          hslColors.push([baseHue, s, l]);
        }
        break;
      }
      case 'analogous': {
        const sat = getRandomInt(60, 90);
        const offsets = [-40, -20, 0, 20, 40];
        for (let i = 0; i < 5; i++) {
          const h = (baseHue + offsets[i] + 360) % 360;
          const l = getRandomInt(40, 75);
          hslColors.push([h, sat, l]);
        }
        break;
      }
      case 'complementary': {
        const compHue = (baseHue + 180) % 360;
        hslColors.push([baseHue, getRandomInt(65, 90), getRandomInt(35, 55)]);
        hslColors.push([baseHue, getRandomInt(50, 75), getRandomInt(60, 80)]);
        hslColors.push([baseHue, getRandomInt(20, 45), getRandomInt(80, 92)]);
        hslColors.push([compHue, getRandomInt(60, 90), getRandomInt(40, 60)]);
        hslColors.push([compHue, getRandomInt(75, 95), getRandomInt(25, 45)]);
        break;
      }
      case 'triadic': {
        const h1 = baseHue;
        const h2 = (baseHue + 120) % 360;
        const h3 = (baseHue + 240) % 360;
        hslColors.push([h1, getRandomInt(70, 90), getRandomInt(45, 65)]);
        hslColors.push([h1, getRandomInt(40, 65), getRandomInt(70, 85)]);
        hslColors.push([h2, getRandomInt(70, 90), getRandomInt(50, 70)]);
        hslColors.push([h3, getRandomInt(70, 90), getRandomInt(45, 65)]);
        hslColors.push([h3, getRandomInt(30, 50), getRandomInt(20, 35)]);
        break;
      }
      case 'split-complementary': {
        const h1 = baseHue;
        const h2 = (baseHue + 150) % 360;
        const h3 = (baseHue + 210) % 360;
        hslColors.push([h1, getRandomInt(75, 95), getRandomInt(45, 65)]);
        hslColors.push([h1, getRandomInt(45, 65), getRandomInt(75, 88)]);
        hslColors.push([h2, getRandomInt(65, 85), getRandomInt(45, 65)]);
        hslColors.push([h3, getRandomInt(65, 85), getRandomInt(45, 65)]);
        hslColors.push([h3, getRandomInt(50, 75), getRandomInt(25, 40)]);
        break;
      }
      case 'pastels': {
        for (let i = 0; i < 5; i++) {
          const h = (baseHue + i * 50) % 360;
          const s = getRandomInt(40, 65);
          const l = getRandomInt(75, 90);
          hslColors.push([h, s, l]);
        }
        break;
      }
      case 'vibrant': {
        for (let i = 0; i < 5; i++) {
          const h = (baseHue + i * 65) % 360;
          const s = getRandomInt(85, 100);
          const l = getRandomInt(45, 65);
          hslColors.push([h, s, l]);
        }
        break;
      }
      case 'dark': {
        for (let i = 0; i < 5; i++) {
          const h = (baseHue + i * 40) % 360;
          const s = getRandomInt(35, 75);
          const l = getRandomInt(12, 28);
          hslColors.push([h, s, l]);
        }
        break;
      }
      case 'neon': {
        const neonHues = [300, 180, 120, 60, 14, 280];
        const startIdx = getRandomInt(0, neonHues.length - 1);
        for (let i = 0; i < 5; i++) {
          const h = (neonHues[(startIdx + i) % neonHues.length] + getRandomInt(-10, 10) + 360) % 360;
          const s = getRandomInt(90, 100);
          const l = getRandomInt(50, 65);
          hslColors.push([h, s, l]);
        }
        break;
      }
      case 'random':
      default: {
        // Cohesive Random algorithm: pick base hue and generate pleasing harmony
        const step = getRandomInt(25, 75);
        for (let i = 0; i < 5; i++) {
          const h = (baseHue + i * step) % 360;
          const s = getRandomInt(50, 95);
          const l = getRandomInt(25, 85);
          hslColors.push([h, s, l]);
        }
        break;
      }
    }

    return hslColors.map(hsl => {
      const rgb = hslToRgb(hsl[0], hsl[1], hsl[2]);
      const hex = rgbToHex(rgb[0], rgb[1], rgb[2]);
      return {
        hex,
        rgb,
        hsl,
        name: getClosestColorName(hex)
      };
    });
  }

  /* ==========================================================================
     5. DOM Render & Interaction Controller
     ========================================================================== */
  const elements = {
    generateBtn: document.getElementById('generate-btn'),
    harmonySelect: document.getElementById('harmony-select'),
    paletteContainer: document.getElementById('palette-container'),
    copyAllBtn: document.getElementById('copy-all-btn'),
    savePaletteBtn: document.getElementById('save-palette-btn'),
    exportPaletteBtn: document.getElementById('export-palette-btn'),
    undoBtn: document.getElementById('undo-btn'),
    redoBtn: document.getElementById('redo-btn'),
    savedContainer: document.getElementById('saved-palettes-container'),
    savedEmptyState: document.getElementById('saved-empty-state'),
    savedCountBadge: document.getElementById('saved-count-badge'),
    clearAllSavedBtn: document.getElementById('clear-all-saved-btn'),
    
    // Modals
    exportModal: document.getElementById('export-modal'),
    shadeModal: document.getElementById('shade-modal'),
    shortcutsModal: document.getElementById('shortcuts-modal'),
    shortcutsBtn: document.getElementById('shortcuts-btn'),
    exportCodePreview: document.getElementById('export-code-preview'),
    copyExportCodeBtn: document.getElementById('copy-export-code-btn'),
    downloadFileBtn: document.getElementById('download-file-btn'),
    shadesGrid: document.getElementById('shades-grid'),
    shadeModalTitle: document.getElementById('shade-modal-title'),
    shadeColorSwatchBadge: document.getElementById('shade-color-swatch-badge'),
    
    toastContainer: document.getElementById('toast-container')
  };

  function pushHistory() {
    // Truncate redo states if adding new step
    if (state.historyIndex < state.history.length - 1) {
      state.history = state.history.slice(0, state.historyIndex + 1);
    }
    const snapshot = state.cards.map(c => ({ ...c }));
    state.history.push(snapshot);
    state.historyIndex = state.history.length - 1;
    updateUndoRedoButtons();
  }

  function updateUndoRedoButtons() {
    elements.undoBtn.disabled = state.historyIndex <= 0;
    elements.redoBtn.disabled = state.historyIndex >= state.history.length - 1;
  }

  function generatePalette(pushToHist = true) {
    const newColors = generatePaletteSet(state.harmony);

    state.cards.forEach((card, idx) => {
      if (!card.locked) {
        state.cards[idx] = {
          ...newColors[idx],
          locked: false
        };
      }
    });

    if (pushToHist) {
      pushHistory();
    }

    renderPalette();
  }

  function renderPalette() {
    const cardNodes = elements.paletteContainer.querySelectorAll('.color-card');

    cardNodes.forEach((cardNode, index) => {
      const cardData = state.cards[index];
      const contrast = getContrastDetails(cardData.rgb);

      // Set dynamic color background
      cardNode.style.backgroundColor = cardData.hex;

      // Adjust text luminance classes
      cardNode.classList.remove('light-text', 'dark-text');
      if (contrast.isLightText) {
        cardNode.classList.add('light-text');
      } else {
        cardNode.classList.add('dark-text');
      }

      // Update Contrast Index Badge
      const contrastBadge = cardNode.querySelector('.contrast-badge');
      if (contrastBadge) {
        contrastBadge.textContent = contrast.badge;
        contrastBadge.title = `WCAG Contrast Ratio: ${contrast.ratio}:1`;
      }

      // Update Lock Icon state
      const unlockIcon = cardNode.querySelector('.unlock-state');
      const lockIcon = cardNode.querySelector('.lock-state');
      if (cardData.locked) {
        unlockIcon.classList.add('hidden');
        lockIcon.classList.remove('hidden');
        lockIcon.classList.add('is-locked');
      } else {
        unlockIcon.classList.remove('hidden');
        lockIcon.classList.add('hidden');
        lockIcon.classList.remove('is-locked');
      }

      // Update Labels
      const nameEl = cardNode.querySelector('.color-name');
      if (nameEl) nameEl.textContent = cardData.name;

      const hexBtn = cardNode.querySelector('.hex-code-btn');
      if (hexBtn) hexBtn.textContent = cardData.hex;

      const rgbEl = cardNode.querySelector('.rgb-value');
      if (rgbEl) rgbEl.textContent = `RGB(${cardData.rgb.join(', ')})`;
    });
  }

  function toggleLock(index) {
    if (index >= 0 && index < state.cards.length) {
      state.cards[index].locked = !state.cards[index].locked;
      renderPalette();
      const statusText = state.cards[index].locked ? 'Locked 🔒' : 'Unlocked 🔓';
      showToast(`Color ${index + 1} (${state.cards[index].hex}) ${statusText}`);
    }
  }

  /* ==========================================================================
     6. Copy to Clipboard & Toast System
     ========================================================================== */
  function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
      <div class="toast-icon">✓</div>
      <span>${message}</span>
    `;
    elements.toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.classList.add('fade-out');
      setTimeout(() => {
        if (toast.parentNode) {
          toast.parentNode.removeChild(toast);
        }
      }, 300);
    }, 2400);
  }

  function copyToClipboard(text, customMessage) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(() => {
        showToast(customMessage || `✓ Copied ${text} to clipboard!`);
      }).catch(() => {
        fallbackCopyTextToClipboard(text, customMessage);
      });
    } else {
      fallbackCopyTextToClipboard(text, customMessage);
    }
  }

  function fallbackCopyTextToClipboard(text, customMessage) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.top = '-9999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand('copy');
      showToast(customMessage || `✓ Copied ${text} to clipboard!`);
    } catch (err) {
      showToast('Failed to copy text', 'error');
    }
    document.body.removeChild(textArea);
  }

  function copyAllColors() {
    const hexList = state.cards.map(c => c.hex).join('\n');
    copyToClipboard(hexList, '✓ All 5 HEX colors copied to clipboard!');
  }

  /* ==========================================================================
     7. Saved Palettes Persistence (LocalStorage)
     ========================================================================== */
  function loadSavedPalettes() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        state.savedPalettes = JSON.parse(raw);
      }
    } catch (e) {
      console.warn('LocalStorage access issue:', e);
      state.savedPalettes = [];
    }
    renderSavedPalettes();
  }

  function saveCurrentPalette() {
    const currentHexes = state.cards.map(c => c.hex);

    // Check duplicate
    const isDuplicate = state.savedPalettes.some(item =>
      item.colors.every((color, idx) => color === currentHexes[idx])
    );

    if (isDuplicate) {
      showToast('Palette is already saved in your collection!');
      return;
    }

    const newSaved = {
      id: Date.now().toString(),
      colors: currentHexes,
      date: new Date().toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })
    };

    state.savedPalettes.unshift(newSaved);
    persistSavedPalettes();
    renderSavedPalettes();
    showToast('❤️ Palette saved successfully!');
  }

  function deleteSavedPalette(id) {
    state.savedPalettes = state.savedPalettes.filter(p => p.id !== id);
    persistSavedPalettes();
    renderSavedPalettes();
    showToast('Palette removed from saved collection.');
  }

  function clearAllSavedPalettes() {
    if (confirm('Are you sure you want to clear all saved palettes?')) {
      state.savedPalettes = [];
      persistSavedPalettes();
      renderSavedPalettes();
      showToast('All saved palettes cleared.');
    }
  }

  function persistSavedPalettes() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.savedPalettes));
    } catch (e) {
      console.warn('Could not save to localStorage:', e);
    }
  }

  function loadPaletteFromSaved(savedItem) {
    savedItem.colors.forEach((hex, idx) => {
      const rgb = hexToRgb(hex);
      const hsl = rgbToHsl(rgb[0], rgb[1], rgb[2]);
      state.cards[idx] = {
        hex,
        rgb,
        hsl,
        name: getClosestColorName(hex),
        locked: false
      };
    });
    pushHistory();
    renderPalette();
    showToast('Loaded saved palette onto canvas!');
  }

  function renderSavedPalettes() {
    elements.savedCountBadge.textContent = state.savedPalettes.length;

    if (state.savedPalettes.length === 0) {
      elements.savedEmptyState.classList.remove('hidden');
      elements.clearAllSavedBtn.classList.add('hidden');
      // Clear cards if any
      const existingCards = elements.savedContainer.querySelectorAll('.saved-palette-card');
      existingCards.forEach(c => c.remove());
      return;
    }

    elements.savedEmptyState.classList.add('hidden');
    elements.clearAllSavedBtn.classList.remove('hidden');

    // Remove existing card elements
    const existingCards = elements.savedContainer.querySelectorAll('.saved-palette-card');
    existingCards.forEach(c => c.remove());

    state.savedPalettes.forEach(item => {
      const card = document.createElement('div');
      card.className = 'saved-palette-card';
      card.setAttribute('data-id', item.id);

      const swatchesHtml = item.colors.map(hex => `
        <div class="saved-color-bar" style="background-color: ${hex};" title="${hex}"></div>
      `).join('');

      card.innerHTML = `
        <div class="saved-palette-swatch-strip" title="Click to load palette">
          ${swatchesHtml}
        </div>
        <div class="saved-palette-footer">
          <span class="saved-date">${item.date}</span>
          <div class="saved-actions">
            <button class="saved-action-btn load-btn" title="Load Palette">Load</button>
            <button class="saved-action-btn copy-btn" title="Copy HEX Codes">Copy</button>
            <button class="saved-action-btn delete-btn" title="Delete Saved Palette">Delete</button>
          </div>
        </div>
      `;

      // Handlers
      const strip = card.querySelector('.saved-palette-swatch-strip');
      strip.addEventListener('click', () => loadPaletteFromSaved(item));

      const loadBtn = card.querySelector('.load-btn');
      loadBtn.addEventListener('click', () => loadPaletteFromSaved(item));

      const copyBtn = card.querySelector('.copy-btn');
      copyBtn.addEventListener('click', () => {
        copyToClipboard(item.colors.join('\n'), '✓ Saved palette HEX values copied!');
      });

      const delBtn = card.querySelector('.delete-btn');
      delBtn.addEventListener('click', () => deleteSavedPalette(item.id));

      elements.savedContainer.appendChild(card);
    });
  }

  /* ==========================================================================
     8. Export Engine (.txt, .css, .json file download)
     ========================================================================== */
  function openExportModal() {
    updateExportPreview();
    elements.exportModal.classList.remove('hidden');
  }

  function updateExportPreview() {
    const hexes = state.cards.map(c => c.hex);
    let codeText = '';

    if (state.exportFormat === 'txt') {
      codeText = hexes.join('\n');
    } else if (state.exportFormat === 'css') {
      codeText = `:root {\n` + hexes.map((h, i) => `  --color-${i + 1}: ${h}; /* ${state.cards[i].name} */`).join('\n') + `\n}`;
    } else if (state.exportFormat === 'json') {
      const jsonArr = state.cards.map(c => ({
        hex: c.hex,
        name: c.name,
        rgb: `rgb(${c.rgb.join(',')})`
      }));
      codeText = JSON.stringify(jsonArr, null, 2);
    }

    elements.exportCodePreview.textContent = codeText;
  }

  function downloadPaletteFile() {
    const content = elements.exportCodePreview.textContent;
    let ext = 'txt';
    let mime = 'text/plain';

    if (state.exportFormat === 'css') {
      ext = 'css';
      mime = 'text/css';
    } else if (state.exportFormat === 'json') {
      ext = 'json';
      mime = 'application/json';
    }

    const blob = new Blob([content], { type: mime });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `colorcraft-palette.${ext}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast(`✓ Downloaded colorcraft-palette.${ext}`);
  }

  /* ==========================================================================
     9. Shades & Tints Generator Modal
     ========================================================================== */
  function openShadesModal(cardIndex) {
    state.selectedShadeCardIndex = cardIndex;
    const cardData = state.cards[cardIndex];

    elements.shadeModalTitle.textContent = `Shades & Tints — ${cardData.name} (${cardData.hex})`;
    elements.shadeColorSwatchBadge.style.backgroundColor = cardData.hex;

    // Generate 10 variations from lightness 10% to 90%
    const [h, s] = cardData.hsl;
    elements.shadesGrid.innerHTML = '';

    for (let lStep = 10; lStep <= 90; lStep += 8) {
      const rgb = hslToRgb(h, s, lStep);
      const hex = rgbToHex(rgb[0], rgb[1], rgb[2]);
      const contrast = getContrastDetails(rgb);

      const item = document.createElement('div');
      item.className = 'shade-item';
      item.style.backgroundColor = hex;
      item.style.color = contrast.isLightText ? '#ffffff' : '#0f172a';
      item.innerHTML = `<span>${hex}</span>`;
      item.title = `Click to copy ${hex}`;

      item.addEventListener('click', () => {
        copyToClipboard(hex, `✓ Copied shade ${hex}!`);
      });

      elements.shadesGrid.appendChild(item);
    }

    elements.shadeModal.classList.remove('hidden');
  }

  /* ==========================================================================
     10. Undo / Redo Navigation
     ========================================================================== */
  function undoPalette() {
    if (state.historyIndex > 0) {
      state.historyIndex--;
      const snapshot = state.history[state.historyIndex];
      snapshot.forEach((cardSnapshot, idx) => {
        // preserve locked state
        if (!state.cards[idx].locked) {
          state.cards[idx] = { ...cardSnapshot };
        }
      });
      renderPalette();
      updateUndoRedoButtons();
      showToast('↩️ Palette change undone');
    }
  }

  function redoPalette() {
    if (state.historyIndex < state.history.length - 1) {
      state.historyIndex++;
      const snapshot = state.history[state.historyIndex];
      snapshot.forEach((cardSnapshot, idx) => {
        if (!state.cards[idx].locked) {
          state.cards[idx] = { ...cardSnapshot };
        }
      });
      renderPalette();
      updateUndoRedoButtons();
      showToast('↪️ Palette change redone');
    }
  }

  /* ==========================================================================
     11. Event Listeners Initialization
     ========================================================================== */
  function initEventListeners() {
    // Generate Palette CTA
    elements.generateBtn.addEventListener('click', () => generatePalette());

    // Harmony Selector
    elements.harmonySelect.addEventListener('change', (e) => {
      state.harmony = e.target.value;
      generatePalette();
    });

    // Global Actions
    elements.copyAllBtn.addEventListener('click', copyAllColors);
    elements.savePaletteBtn.addEventListener('click', saveCurrentPalette);
    elements.exportPaletteBtn.addEventListener('click', openExportModal);
    elements.undoBtn.addEventListener('click', undoPalette);
    elements.redoBtn.addEventListener('click', redoPalette);
    elements.clearAllSavedBtn.addEventListener('click', clearAllSavedPalettes);

    // Lock & Action Handlers on Cards
    elements.paletteContainer.addEventListener('click', (e) => {
      const lockBtn = e.target.closest('.card-lock-btn');
      if (lockBtn) {
        const idx = parseInt(lockBtn.getAttribute('data-index'), 10);
        toggleLock(idx);
        return;
      }

      const copyBtn = e.target.closest('.copy-card-btn') || e.target.closest('.hex-code-btn');
      if (copyBtn) {
        const idx = parseInt(copyBtn.getAttribute('data-index'), 10);
        copyToClipboard(state.cards[idx].hex, `✓ Copied ${state.cards[idx].hex}!`);
        return;
      }

      const previewArea = e.target.closest('.color-preview-click-area');
      if (previewArea) {
        const idx = parseInt(previewArea.getAttribute('data-index'), 10);
        copyToClipboard(state.cards[idx].hex, `✓ Copied ${state.cards[idx].hex}!`);
        return;
      }

      const shadeBtn = e.target.closest('.shade-card-btn');
      if (shadeBtn) {
        const idx = parseInt(shadeBtn.getAttribute('data-index'), 10);
        openShadesModal(idx);
        return;
      }
    });

    // Export Modal Controls
    const exportTabs = elements.exportModal.querySelectorAll('.export-tab');
    exportTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        exportTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        state.exportFormat = tab.getAttribute('data-format');
        updateExportPreview();
      });
    });

    elements.copyExportCodeBtn.addEventListener('click', () => {
      copyToClipboard(elements.exportCodePreview.textContent, '✓ Export snippet copied!');
    });

    elements.downloadFileBtn.addEventListener('click', downloadPaletteFile);

    // Modal Close Buttons
    document.querySelectorAll('.modal-close-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const targetId = btn.getAttribute('data-close');
        const modal = document.getElementById(targetId);
        if (modal) modal.classList.add('hidden');
      });
    });

    // Backdrop Click Close
    document.querySelectorAll('.modal-backdrop').forEach(modal => {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          modal.classList.add('hidden');
        }
      });
    });

    // Shortcuts Modal
    elements.shortcutsBtn.addEventListener('click', () => {
      elements.shortcutsModal.classList.remove('hidden');
    });

    // Keyboard Shortcuts
    window.addEventListener('keydown', (e) => {
      // Ignore when focused on input/select
      const activeTag = document.activeElement ? document.activeElement.tagName : '';
      if (['INPUT', 'SELECT', 'TEXTAREA'].includes(activeTag)) return;

      // Ignore when modal is open (except Escape key)
      const openModal = document.querySelector('.modal-backdrop:not(.hidden)');
      if (openModal) {
        if (e.key === 'Escape') {
          openModal.classList.add('hidden');
        }
        return;
      }

      // Spacebar: Generate Palette
      if (e.code === 'Space') {
        e.preventDefault();
        generatePalette();
        return;
      }

      // Keys 1-5: Lock toggle
      if (['1', '2', '3', '4', '5'].includes(e.key)) {
        const cardIndex = parseInt(e.key, 10) - 1;
        toggleLock(cardIndex);
        return;
      }

      // S key: Save palette
      if (e.key.toLowerCase() === 's' && !e.ctrlKey && !e.metaKey) {
        e.preventDefault();
        saveCurrentPalette();
        return;
      }

      // C key: Copy all
      if (e.key.toLowerCase() === 'c' && !e.ctrlKey && !e.metaKey) {
        e.preventDefault();
        copyAllColors();
        return;
      }

      // Undo/Redo Shortcuts
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'z') {
        e.preventDefault();
        undoPalette();
        return;
      }

      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'y') {
        e.preventDefault();
        redoPalette();
        return;
      }
    });
  }

  /* ==========================================================================
     12. Bootstrapping App
     ========================================================================== */
  function init() {
    // Initial palette setup & history
    pushHistory();
    renderPalette();
    loadSavedPalettes();
    initEventListeners();
  }

  // Execute on DOM Load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

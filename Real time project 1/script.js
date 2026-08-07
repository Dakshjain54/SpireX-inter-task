const state = {
  isSimulating: true,
  theme: sessionStorage.getItem('ecobin-theme') || 'dark',
  bins: [
    { id: 1, name: 'Bin #01 (Central Market)', type: 'Bio / Organic', fill: 35, temp: 24, signal: 'excellent', mapX: 22, mapY: 28 },
    { id: 2, name: 'Bin #02 (Tech Plaza)', type: 'Plastic & Packaging', fill: 62, temp: 26, signal: 'good', mapX: 52, mapY: 48 },
    { id: 3, name: 'Bin #03 (Metro Station)', type: 'Paper & Cardboard', fill: 88, temp: 22, signal: 'weak', mapX: 78, mapY: 30 },
    { id: 4, name: 'Bin #04 (Industrial Hub)', type: 'E-Waste & Hazardous', fill: 94, temp: 31, signal: 'excellent', mapX: 42, mapY: 78 }
  ],
  fleet: {
    pendingPickups: 3,
    completedToday: 18,
    activeVehicles: 5,
    criticalAlerts: 2
  },
  recyclingEfficiency: 88.5,
  ecoScore: 94,
  co2Saved: 14.8,
  treesSaved: 342,
  weeklyData: {
    total: [12.4, 15.2, 11.8, 18.5, 21.0, 19.3, 14.2],
    recycled: [10.8, 13.5, 10.2, 16.1, 18.7, 17.0, 12.6],
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  },
  wasteDistribution: [
    { label: 'Plastic', percent: 32, color: '#06b6d4' },
    { label: 'Paper', percent: 28, color: '#3b82f6' },
    { label: 'Organic', percent: 25, color: '#22c55e' },
    { label: 'Metal', percent: 15, color: '#facc15' }
  ],
  notifications: [
    { id: 1, title: 'Bin #04 Exceeded 90%', time: '2 mins ago', type: 'urgent' },
    { id: 2, title: 'Truck EV-02 Dispatch Confirmed', time: '12 mins ago', type: 'info' },
    { id: 3, title: 'Recycling Plant A Logged 3.4T', time: '45 mins ago', type: 'info' }
  ],
  activities: [
    { time: '12:04:10', text: 'Bin #04 capacity reached 94% - Sensor alert sent', category: 'alerts', tag: 'Alert' },
    { time: '12:02:45', text: 'Collection Vehicle EV-03 completed Zone 2 route', category: 'fleet', tag: 'Fleet' },
    { time: '11:58:20', text: 'Bin #02 fill level increased to 62%', category: 'bins', tag: 'Bin' },
    { time: '11:45:00', text: 'Recycling Facility B completed plastic sorting batch #88', category: 'fleet', tag: 'Fleet' }
  ],
  activeChartTab: 'total',
  activeLogFilter: 'all',
  activeBinFilter: 'all'
};

let simInterval = null;
// Initialization
document.addEventListener('DOMContentLoaded', () => {
  applyTheme(state.theme);
  // Hide loading screen
  setTimeout(() => {
    const loader = document.getElementById('loading-screen');
    if (loader) loader.classList.add('fade-out');
  }, 800);
  // Live Clock
  updateLiveClock();
  setInterval(updateLiveClock, 1000);
  // Initial UI Render
  renderBins();
  updateTopMetrics(false);
  renderNotifications();
  renderActivities();
  renderMapPins();
  initCanvasCharts();
  animateEcoScore();
  // Setup Event Handlers
  setupEventListeners();
  // Start telemetry simulation
  startSimulation();
});
//Dark / Light Mode Toggle
function applyTheme(theme) {
  state.theme = theme;
  sessionStorage.setItem('ecobin-theme', theme);
  document.documentElement.setAttribute('data-theme', theme);

  const themeIcon = document.getElementById('theme-icon');
  const themeLabel = document.getElementById('theme-label');

  if (theme === 'light') {
    if (themeIcon) themeIcon.textContent = '☀️';
    if (themeLabel) themeLabel.textContent = 'Light';
  } else {
    if (themeIcon) themeIcon.textContent = '🌙';
    if (themeLabel) themeLabel.textContent = 'Dark';
  }

  // Redraw canvas charts for new theme color contrast
  setTimeout(() => {
    drawWeeklyBarChart();
    drawDonutChart();
    drawCircularGauge();
  }, 100);
}
// Event Listeners Setup
function setupEventListeners() {
  // Theme Toggle Button
  const themeBtn = document.getElementById('theme-toggle-btn');
  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      const nextTheme = state.theme === 'dark' ? 'light' : 'dark';
      applyTheme(nextTheme);
    });
  }

  // Simulation Toggle Button
  const simToggleBtn = document.getElementById('sim-toggle-btn');
  if (simToggleBtn) {
    simToggleBtn.addEventListener('click', () => {
      state.isSimulating = !state.isSimulating;
      const simIcon = document.getElementById('sim-icon');
      if (state.isSimulating) {
        simToggleBtn.style.borderColor = 'rgba(34, 197, 94, 0.4)';
        if (simIcon) simIcon.textContent = '⚡';
        startSimulation();
        addActivityLog('Real-time telemetry simulation resumed', 'fleet');
      } else {
        simToggleBtn.style.borderColor = 'rgba(239, 68, 68, 0.4)';
        if (simIcon) simIcon.textContent = '⏸️';
        stopSimulation();
        addActivityLog('Real-time telemetry simulation paused', 'alerts');
      }
    });
  }

  // Smart Bin Filter Buttons
  const binFilterBtns = document.querySelectorAll('.bin-filter-btn');
  binFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      binFilterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.activeBinFilter = btn.dataset.binFilter;
      filterBinsUI();
    });
  });

  // Notification Drawer Toggle
  const notifBtn = document.getElementById('notif-bell-btn');
  const notifDropdown = document.getElementById('notif-dropdown');
  if (notifBtn && notifDropdown) {
    notifBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      notifDropdown.classList.toggle('hidden');
    });
    document.addEventListener('click', (e) => {
      if (!notifDropdown.contains(e.target) && !notifBtn.contains(e.target)) {
        notifDropdown.classList.add('hidden');
      }
    });
  }

  // Clear Notifications
  const clearNotifBtn = document.getElementById('clear-notif-btn');
  if (clearNotifBtn) {
    clearNotifBtn.addEventListener('click', () => {
      state.notifications = [];
      renderNotifications();
    });
  }

  // Chart Toggle Tabs
  const chartTabs = document.querySelectorAll('.chart-tab');
  chartTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      chartTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      state.activeChartTab = tab.dataset.view;
      drawWeeklyBarChart();
    });
  });

  // Activity Log Filters
  const filterPills = document.querySelectorAll('.filter-pill');
  filterPills.forEach(pill => {
    pill.addEventListener('click', () => {
      filterPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      state.activeLogFilter = pill.dataset.filter;
      renderActivities();
    });
  });

  // Map Popover Close
  const closePopoverBtn = document.getElementById('close-popover-btn');
  if (closePopoverBtn) {
    closePopoverBtn.addEventListener('click', () => {
      const popover = document.getElementById('map-popover');
      if (popover) popover.classList.add('hidden');
    });
  }
}
// Live Clock & Timestamps
function updateLiveClock() {
  const now = new Date();
  const timeElem = document.getElementById('live-clock-time');
  const dateElem = document.getElementById('live-clock-date');

  if (timeElem) {
    timeElem.textContent = now.toLocaleTimeString('en-US', {
      hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true
    });
  }

  if (dateElem) {
    dateElem.textContent = now.toLocaleDateString('en-US', {
      weekday: 'short', month: 'short', day: 'numeric'
    });
  }
}
// IoT Telemetry Simulation Engine
function startSimulation() {
  stopSimulation();
  simInterval = setInterval(() => {
    if (state.isSimulating) {
      simulateBinTelemetryStep();
    }
  }, 4000);
}

function stopSimulation() {
  if (simInterval) clearInterval(simInterval);
}

function simulateBinTelemetryStep() {
  // Select a random bin to update fill
  const targetIndex = Math.floor(Math.random() * state.bins.length);
  const bin = state.bins[targetIndex];

  const delta = Math.floor(Math.random() * 6) + 1;
  const oldFill = bin.fill;
  bin.fill = Math.min(100, bin.fill + delta);
  bin.temp = 22 + Math.floor(Math.random() * 10);

  // Randomly update IoT Signal strength across all bins
  const signals = ['excellent', 'good', 'weak', 'excellent'];
  state.bins.forEach(b => {
    if (Math.random() > 0.6) {
      b.signal = signals[Math.floor(Math.random() * signals.length)];
    }
  });

  // Critical notification alert trigger
  if (bin.fill >= 90 && oldFill < 90) {
    addNotification(`${bin.name} reached Critical Capacity (${bin.fill}%)`, 'urgent');
    addActivityLog(`🚨 CRITICAL: ${bin.name} at ${bin.fill}% capacity!`, 'alerts');
  } else if (bin.fill % 15 === 0) {
    addActivityLog(`Telemetry update: ${bin.name} fill level at ${bin.fill}%`, 'bins');
  }

  // Render updates
  renderBins();
  updateTopMetrics(true);
  renderMapPins();
  drawCircularGauge();
}
// Smart Bins & Filtering
function renderBins() {
  state.bins.forEach(bin => {
    const fillEl = document.getElementById(`bin-fill-${bin.id}`);
    const barEl = document.getElementById(`bin-bar-${bin.id}`);
    const percentEl = document.getElementById(`bin-percent-${bin.id}`);
    const statusEl = document.getElementById(`bin-status-${bin.id}`);
    const tempEl = document.getElementById(`bin-temp-${bin.id}`);
    const cardEl = document.getElementById(`bin-card-${bin.id}`);
    const signalBox = document.getElementById(`iot-signal-${bin.id}`);
    const signalLabel = document.getElementById(`signal-label-${bin.id}`);

    if (fillEl) fillEl.style.height = `${bin.fill}%`;
    if (barEl) barEl.style.width = `${bin.fill}%`;
    if (percentEl) percentEl.textContent = `${bin.fill}%`;
    if (tempEl) tempEl.innerHTML = `🌡️ ${bin.temp}°C ${bin.fill >= 90 ? '⚠️' : ''}`;

    // Update Status Badge & Data state
    let fillState = 'empty';
    if (statusEl) {
      statusEl.className = 'status-badge';
      if (bin.fill < 40) {
        fillState = 'empty';
        statusEl.classList.add('badge-green');
        statusEl.innerHTML = `<span class="dot"></span> Empty`;
      } else if (bin.fill < 75) {
        fillState = 'half';
        statusEl.classList.add('badge-yellow');
        statusEl.innerHTML = `<span class="dot"></span> Half Full`;
      } else if (bin.fill < 90) {
        fillState = 'full';
        statusEl.classList.add('badge-orange');
        statusEl.innerHTML = `<span class="dot"></span> Full`;
      } else {
        fillState = 'full';
        statusEl.classList.add('badge-red', 'pulse-badge');
        statusEl.innerHTML = `<span class="dot"></span> CRITICAL`;
      }
    }

    if (cardEl) {
      cardEl.dataset.fillState = fillState;
      if (bin.fill >= 90) {
        cardEl.style.borderColor = 'rgba(239, 68, 68, 0.6)';
      } else {
        cardEl.style.borderColor = 'var(--glass-inset-border)';
      }
    }

    // 📶 Update IoT Signal Strength Bars
    if (signalBox) {
      signalBox.className = `iot-signal-box ${bin.signal}`;
      const bars = signalBox.querySelectorAll('.signal-bar');
      const barCounts = { excellent: 4, good: 3, weak: 2, offline: 1 };
      const activeCount = barCounts[bin.signal] || 4;

      bars.forEach((b, idx) => {
        if (idx < activeCount) b.classList.add('active');
        else b.classList.remove('active');
      });
    }

    if (signalLabel) {
      signalLabel.textContent = bin.signal.charAt(0).toUpperCase() + bin.signal.slice(1);
    }
  });

  filterBinsUI();
}

function filterBinsUI() {
  const cards = document.querySelectorAll('.bin-card');
  cards.forEach(card => {
    const fillState = card.dataset.fillState;
    if (state.activeBinFilter === 'all' || state.activeBinFilter === fillState) {
      card.classList.remove('hidden-filter');
    } else {
      card.classList.add('hidden-filter');
    }
  });
}

// Global dispatch handler
window.dispatchVehicle = function (binName, binId) {
  const bin = state.bins.find(b => b.id === binId);
  if (bin) {
    const oldFill = bin.fill;
    bin.fill = 12 + Math.floor(Math.random() * 6);
    renderBins();
    updateTopMetrics(true);
    renderMapPins();

    state.fleet.completedToday += 1;
    state.fleet.pendingPickups = Math.max(0, state.fleet.pendingPickups - 1);
    document.getElementById('completed-today-count').textContent = state.fleet.completedToday;
    document.getElementById('pending-pickups-count').textContent = state.fleet.pendingPickups;

    addActivityLog(`🚛 Vehicle EV-04 dispatched to clear ${binName} (Cleared ${oldFill}% -> ${bin.fill}%)`, 'fleet');
    addNotification(`Vehicle EV-04 en route to ${binName}`, 'info');

    // Close map popover if open
    const popover = document.getElementById('map-popover');
    if (popover) popover.classList.add('hidden');
  }
};
// Interactive City Map Pins & Popover
function renderMapPins() {
  const layer = document.getElementById('map-pins-layer');
  if (!layer) return;

  layer.innerHTML = '';
  state.bins.forEach(bin => {
    const pin = document.createElement('div');
    let colorClass = 'pin-green';
    if (bin.fill >= 75) colorClass = 'pin-red';
    else if (bin.fill >= 40) colorClass = 'pin-yellow';

    pin.className = `map-pin ${colorClass}`;
    pin.style.left = `${bin.mapX}%`;
    pin.style.top = `${bin.mapY}%`;
    pin.innerHTML = `🗑️`;

    pin.addEventListener('click', (e) => {
      e.stopPropagation();
      openMapPopover(bin);
    });

    layer.appendChild(pin);
  });
}

function openMapPopover(bin) {
  const popover = document.getElementById('map-popover');
  if (!popover) return;

  document.getElementById('popover-tag').textContent = bin.type;
  document.getElementById('popover-title').textContent = bin.name;
  document.getElementById('popover-fill').textContent = `${bin.fill}%`;
  document.getElementById('popover-signal').textContent = bin.signal.toUpperCase();
  document.getElementById('popover-temp').textContent = `${bin.temp}°C`;
  document.getElementById('popover-status').textContent = bin.fill >= 90 ? 'CRITICAL' : bin.fill >= 75 ? 'Full' : 'Normal';

  // Position popover near pin
  popover.style.left = `${Math.min(bin.mapX, 60)}%`;
  popover.style.top = `${Math.min(bin.mapY + 5, 55)}%`;
  popover.classList.remove('hidden');

  const dispatchBtn = document.getElementById('popover-dispatch-btn');
  if (dispatchBtn) {
    dispatchBtn.onclick = () => dispatchVehicle(bin.name, bin.id);
  }
}
// Metrics & Eco Score Count-Up
function updateTopMetrics(animate = false) {
  const filledCount = state.bins.filter(b => b.fill >= 75).length;
  const emptyCount = state.bins.filter(b => b.fill < 75).length;

  const filledElem = document.getElementById('filled-bins-val');
  const emptyElem = document.getElementById('empty-bins-val');
  const efficiencyElem = document.getElementById('efficiency-val');
  const gaugeText = document.getElementById('gauge-percent-text');
  const alertsCountElem = document.getElementById('alerts-count');

  if (filledElem) filledElem.textContent = filledCount;
  if (emptyElem) emptyElem.textContent = emptyCount;
  if (efficiencyElem) efficiencyElem.textContent = `${state.recyclingEfficiency.toFixed(1)}%`;
  if (gaugeText) gaugeText.textContent = `${state.recyclingEfficiency.toFixed(1)}%`;
  if (alertsCountElem) alertsCountElem.textContent = filledCount;
}

function animateEcoScore() {
  const scoreNum = document.getElementById('eco-score-num');
  if (!scoreNum) return;

  let current = 0;
  const target = state.ecoScore;
  const timer = setInterval(() => {
    current += 2;
    scoreNum.textContent = current;
    if (current >= target) {
      scoreNum.textContent = target;
      clearInterval(timer);
    }
  }, 30);
}
// Activity Log Stream & Notifications
function addNotification(title, type = 'info') {
  const now = new Date();
  const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  state.notifications.unshift({ id: Date.now(), title, time: timeStr, type });
  renderNotifications();
}

function renderNotifications() {
  const notifList = document.getElementById('notif-list');
  const badge = document.getElementById('notif-badge');

  if (badge) {
    badge.textContent = state.notifications.length;
    badge.style.display = state.notifications.length === 0 ? 'none' : 'inline-block';
  }

  if (notifList) {
    if (state.notifications.length === 0) {
      notifList.innerHTML = `<div style="padding:15px; text-align:center; color:var(--text-muted); font-size:0.8rem;">No active alerts</div>`;
      return;
    }
    notifList.innerHTML = state.notifications.map(item => `
      <div class="notif-item ${item.type === 'urgent' ? 'urgent' : ''}">
        <span>${item.type === 'urgent' ? '🚨' : '🔔'}</span>
        <div class="notif-item-text">
          <p>${item.title}</p>
          <span>${item.time}</span>
        </div>
      </div>
    `).join('');
  }
}

function addActivityLog(text, category = 'bins') {
  const now = new Date();
  const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  const tagMap = { alerts: 'Alert', fleet: 'Fleet', bins: 'Bin' };

  state.activities.unshift({ time: timeStr, text, category, tag: tagMap[category] || 'System' });
  if (state.activities.length > 25) state.activities.pop();
  renderActivities();
}

function renderActivities() {
  const listEl = document.getElementById('activity-log-list');
  if (!listEl) return;

  const filtered = state.activities.filter(act => {
    if (state.activeLogFilter === 'all') return true;
    return act.category === state.activeLogFilter;
  });

  listEl.innerHTML = filtered.map(act => `
    <li class="log-entry">
      <span class="log-time">[${act.time}]</span>
      <span class="log-tag tag-${act.category}">${act.tag}</span>
      <span class="log-text">${act.text}</span>
    </li>
  `).join('');
}
// Custom HTML5 Canvas Charts Engine
function initCanvasCharts() {
  drawWeeklyBarChart();
  drawDonutChart();
  drawCircularGauge();

  window.addEventListener('resize', () => {
    drawWeeklyBarChart();
    drawDonutChart();
    drawCircularGauge();
  });
}

function drawWeeklyBarChart() {
  const canvas = document.getElementById('weekly-bar-chart');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  const dpr = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();
  canvas.width = rect.width * dpr;
  canvas.height = rect.height * dpr;
  ctx.scale(dpr, dpr);

  const width = rect.width;
  const height = rect.height;
  ctx.clearRect(0, 0, width, height);

  const dataset = state.weeklyData[state.activeChartTab];
  const labels = state.weeklyData.labels;
  const maxVal = 25;

  const paddingLeft = 35;
  const paddingBottom = 25;
  const paddingTop = 20;
  const paddingRight = 15;

  const chartWidth = width - paddingLeft - paddingRight;
  const chartHeight = height - paddingTop - paddingBottom;

  ctx.strokeStyle = state.theme === 'light' ? 'rgba(0, 0, 0, 0.08)' : 'rgba(255, 255, 255, 0.08)';
  ctx.lineWidth = 1;
  ctx.fillStyle = state.theme === 'light' ? '#475569' : '#94a3b8';
  ctx.font = '10px Poppins, sans-serif';

  const gridSteps = 4;
  for (let i = 0; i <= gridSteps; i++) {
    const yVal = (maxVal / gridSteps) * i;
    const yPos = height - paddingBottom - (i / gridSteps) * chartHeight;
    ctx.beginPath();
    ctx.moveTo(paddingLeft, yPos);
    ctx.lineTo(width - paddingRight, yPos);
    ctx.stroke();

    ctx.fillText(`${yVal.toFixed(0)}t`, 6, yPos + 3);
  }

  const barWidth = Math.min(32, (chartWidth / dataset.length) * 0.5);
  const stepX = chartWidth / dataset.length;

  dataset.forEach((val, i) => {
    const xPos = paddingLeft + i * stepX + (stepX - barWidth) / 2;
    const barHeight = (val / maxVal) * chartHeight;
    const yPos = height - paddingBottom - barHeight;

    const grad = ctx.createLinearGradient(0, yPos, 0, height - paddingBottom);
    if (state.activeChartTab === 'total') {
      grad.addColorStop(0, '#22c55e');
      grad.addColorStop(1, '#06b6d4');
    } else {
      grad.addColorStop(0, '#3b82f6');
      grad.addColorStop(1, '#06b6d4');
    }

    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.roundRect(xPos, yPos, barWidth, barHeight, [6, 6, 0, 0]);
    ctx.fill();

    ctx.fillStyle = state.theme === 'light' ? '#0f172a' : '#f8fafc';
    ctx.font = '10px Poppins, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(val.toFixed(1), xPos + barWidth / 2, yPos - 6);

    ctx.fillStyle = state.theme === 'light' ? '#475569' : '#94a3b8';
    ctx.fillText(labels[i], xPos + barWidth / 2, height - 6);
  });
}

function drawDonutChart() {
  const canvas = document.getElementById('donut-chart');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  const dpr = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();
  canvas.width = rect.width * dpr;
  canvas.height = rect.height * dpr;
  ctx.scale(dpr, dpr);

  const width = rect.width;
  const height = rect.height;
  const centerX = width / 2;
  const centerY = height / 2;
  const outerRadius = Math.min(width, height) / 2 - 10;
  const innerRadius = outerRadius * 0.65;

  ctx.clearRect(0, 0, width, height);

  let startAngle = -Math.PI / 2;
  const total = state.wasteDistribution.reduce((acc, item) => acc + item.percent, 0);

  state.wasteDistribution.forEach((slice) => {
    const sliceAngle = (slice.percent / total) * Math.PI * 2;
    const endAngle = startAngle + sliceAngle;

    ctx.beginPath();
    ctx.arc(centerX, centerY, outerRadius, startAngle, endAngle);
    ctx.arc(centerX, centerY, innerRadius, endAngle, startAngle, true);
    ctx.closePath();

    ctx.fillStyle = slice.color;
    ctx.fill();
    startAngle = endAngle;
  });
}

function drawCircularGauge() {
  const canvas = document.getElementById('circular-gauge');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  const dpr = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();
  canvas.width = rect.width * dpr;
  canvas.height = rect.height * dpr;
  ctx.scale(dpr, dpr);

  const width = rect.width;
  const height = rect.height;
  const centerX = width / 2;
  const centerY = height / 2;
  const radius = Math.min(width, height) / 2 - 8;

  ctx.clearRect(0, 0, width, height);

  ctx.beginPath();
  ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
  ctx.strokeStyle = state.theme === 'light' ? 'rgba(0, 0, 0, 0.08)' : 'rgba(255, 255, 255, 0.08)';
  ctx.lineWidth = 8;
  ctx.stroke();

  const progressAngle = (state.recyclingEfficiency / 100) * Math.PI * 2;
  const startAngle = -Math.PI / 2;
  const endAngle = startAngle + progressAngle;

  const grad = ctx.createLinearGradient(0, 0, width, height);
  grad.addColorStop(0, '#22c55e');
  grad.addColorStop(1, '#06b6d4');

  ctx.beginPath();
  ctx.arc(centerX, centerY, radius, startAngle, endAngle);
  ctx.strokeStyle = grad;
  ctx.lineWidth = 8;
  ctx.lineCap = 'round';
  ctx.stroke();
}

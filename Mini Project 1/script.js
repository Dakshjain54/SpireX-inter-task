document.addEventListener('DOMContentLoaded', () => {
  // --- Game Data & Configuration ---
  const CHOICES = {
    rock: { name: 'Rock', icon: '🪨', beats: 'scissors', action: 'crushes' },
    paper: { name: 'Paper', icon: '📄', beats: 'rock', action: 'covers' },
    scissors: { name: 'Scissors', icon: '✂️', beats: 'paper', action: 'cuts' }
  };

  const WINNING_SCORE = 5;

  // --- Game State ---
  let playerScore = 0;
  let computerScore = 0;
  let isGameOver = false;

  // --- DOM Element References ---
  const playerScoreEl = document.getElementById('player-score');
  const computerScoreEl = document.getElementById('computer-score');
  const playerScoreCard = document.getElementById('player-score-card');
  const computerScoreCard = document.getElementById('computer-score-card');

  const playerCircleEl = document.getElementById('player-circle');
  const playerIconEl = document.getElementById('player-icon');
  const playerNameEl = document.getElementById('player-name');

  const computerCircleEl = document.getElementById('computer-circle');
  const computerIconEl = document.getElementById('computer-icon');
  const computerNameEl = document.getElementById('computer-name');

  const choiceBtns = document.querySelectorAll('.choice-btn');
  const resultMessageEl = document.getElementById('result-message');

  const confettiContainer = document.getElementById('confetti-container');
  const winnerModal = document.getElementById('winner-modal');
  const modalBadge = document.getElementById('modal-badge');
  const modalTitle = document.getElementById('modal-title');
  const modalSubtitle = document.getElementById('modal-subtitle');
  const modalFinalScore = document.getElementById('modal-final-score');
  const playAgainBtn = document.getElementById('play-again-btn');

  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  const themeIcon = document.getElementById('theme-icon');
  const themeText = document.getElementById('theme-text');

  // --- Dark / Light Theme Toggle Feature ---
  function initThemeMode() {
    const savedMode = localStorage.getItem('rps_theme_mode') || 'dark';
    applyThemeMode(savedMode);

    themeToggleBtn.addEventListener('click', () => {
      playClickSound();
      const currentMode = document.body.getAttribute('data-theme') || 'dark';
      const newMode = currentMode === 'dark' ? 'light' : 'dark';
      applyThemeMode(newMode);
    });
  }

  function applyThemeMode(mode) {
    document.body.setAttribute('data-theme', mode);
    localStorage.setItem('rps_theme_mode', mode);

    if (mode === 'dark') {
      themeIcon.textContent = '🌙';
      themeText.textContent = 'Dark';
    } else {
      themeIcon.textContent = '☀️';
      themeText.textContent = 'Light';
    }
  }

  initThemeMode();

  // --- Web Audio API Synthesizer ---
  let audioCtx = null;

  function initAudio() {
    if (!audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        audioCtx = new AudioContext();
      }
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
  }

  function playClickSound() {
    initAudio();
    if (!audioCtx) return;

    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(420, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(840, audioCtx.currentTime + 0.08);

    gain.gain.setValueAtTime(0.2, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.08);

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start();
    osc.stop(audioCtx.currentTime + 0.08);
  }

  function playVictorySound() {
    initAudio();
    if (!audioCtx) return;

    const now = audioCtx.currentTime;
    const notes = [440, 554.37, 659.25, 880];

    notes.forEach((freq, index) => {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now + index * 0.12);

      gain.gain.setValueAtTime(0.25, now + index * 0.12);
      gain.gain.exponentialRampToValueAtTime(0.001, now + index * 0.12 + 0.35);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start(now + index * 0.12);
      osc.stop(now + index * 0.12 + 0.35);
    });
  }

  function playDefeatSound() {
    initAudio();
    if (!audioCtx) return;

    const now = audioCtx.currentTime;
    const notes = [380, 310, 240];

    notes.forEach((freq, index) => {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(freq, now + index * 0.16);

      gain.gain.setValueAtTime(0.18, now + index * 0.16);
      gain.gain.exponentialRampToValueAtTime(0.001, now + index * 0.16 + 0.3);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start(now + index * 0.16);
      osc.stop(now + index * 0.16 + 0.3);
    });
  }

  // --- Confetti Generator ---
  function launchConfetti() {
    confettiContainer.innerHTML = '';
    const colors = ['#06B6D4', '#7C3AED', '#2563EB', '#22C55E', '#F59E0B', '#EC4899'];

    for (let i = 0; i < 65; i++) {
      const confetti = document.createElement('div');
      confetti.className = 'confetti-piece';
      confetti.style.left = Math.random() * 100 + '%';
      confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      confetti.style.width = (Math.random() * 8 + 6) + 'px';
      confetti.style.height = (Math.random() * 12 + 8) + 'px';
      confetti.style.animationDuration = (Math.random() * 2.5 + 2) + 's';
      confetti.style.animationDelay = (Math.random() * 0.5) + 's';
      confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
      confettiContainer.appendChild(confetti);
    }

    setTimeout(() => {
      confettiContainer.innerHTML = '';
    }, 4500);
  }

  // --- Event Listeners ---
  choiceBtns.forEach(button => {
    button.addEventListener('click', () => {
      const choice = button.getAttribute('data-choice');
      if (choice && !isGameOver) {
        playClickSound();
        handlePlayerChoice(choice);
      }
    });
  });

  playAgainBtn.addEventListener('click', () => {
    playClickSound();
    resetGame();
  });

  // --- Core Game Logic ---

  function getRandomComputerChoice() {
    const keys = Object.keys(CHOICES);
    const randomIndex = Math.floor(Math.random() * keys.length);
    return keys[randomIndex];
  }

  function handlePlayerChoice(playerChoiceKey) {
    const computerChoiceKey = getRandomComputerChoice();

    const playerChoice = CHOICES[playerChoiceKey];
    const computerChoice = CHOICES[computerChoiceKey];

    // Update Display Showcase
    updateShowcase(playerChoice, computerChoice);

    // Determine Outcome
    const outcome = evaluateRound(playerChoiceKey, computerChoiceKey);

    // Update Scores & Visual Styles
    applyRoundOutcome(outcome, playerChoice, computerChoice);

    // Check for Match Winner
    checkMatchWinner();
  }

  function updateShowcase(playerChoice, computerChoice) {
    playerIconEl.textContent = playerChoice.icon;
    playerNameEl.textContent = playerChoice.name;

    computerIconEl.textContent = computerChoice.icon;
    computerNameEl.textContent = computerChoice.name;
  }

  function evaluateRound(player, computer) {
    if (player === computer) {
      return 'tie';
    }
    if (CHOICES[player].beats === computer) {
      return 'player';
    }
    return 'computer';
  }

  function applyRoundOutcome(outcome, playerChoice, computerChoice) {
    playerCircleEl.classList.remove('winner-circle', 'loser-circle');
    computerCircleEl.classList.remove('winner-circle', 'loser-circle');

    resultMessageEl.className = 'result-message';

    if (outcome === 'tie') {
      resultMessageEl.textContent = `It's a tie! Both chose ${playerChoice.name}.`;
      resultMessageEl.classList.add('result-tie');
    } else if (outcome === 'player') {
      playerScore++;
      triggerScoreAnimation(playerScoreEl, playerScore);
      triggerCardGlow(playerScoreCard);

      playerCircleEl.classList.add('winner-circle');
      computerCircleEl.classList.add('loser-circle');

      resultMessageEl.textContent = `You win this round! ${playerChoice.name} ${playerChoice.action} ${computerChoice.name}.`;
      resultMessageEl.classList.add('result-win');
    } else {
      computerScore++;
      triggerScoreAnimation(computerScoreEl, computerScore);
      triggerCardGlow(computerScoreCard);

      computerCircleEl.classList.add('winner-circle');
      playerCircleEl.classList.add('loser-circle');

      resultMessageEl.textContent = `CPU wins this round! ${computerChoice.name} ${computerChoice.action} ${playerChoice.name}.`;
      resultMessageEl.classList.add('result-lose');
    }
  }

  function triggerScoreAnimation(element, newValue) {
    element.textContent = newValue;
    element.classList.remove('score-pop');
    void element.offsetWidth;
    element.classList.add('score-pop');
  }

  function triggerCardGlow(cardElement) {
    cardElement.classList.remove('score-glow-active');
    void cardElement.offsetWidth;
    cardElement.classList.add('score-glow-active');
  }

  function checkMatchWinner() {
    if (playerScore >= WINNING_SCORE || computerScore >= WINNING_SCORE) {
      isGameOver = true;
      disableChoiceButtons(true);

      const isUserWinner = playerScore >= WINNING_SCORE;

      if (isUserWinner) {
        playVictorySound();
        launchConfetti();
      } else {
        playDefeatSound();
      }

      setTimeout(() => {
        showWinnerModal(isUserWinner);
      }, 500);
    }
  }

  function disableChoiceButtons(disabled) {
    choiceBtns.forEach(btn => {
      btn.disabled = disabled;
    });
  }

  function showWinnerModal(isUserWinner) {
    if (isUserWinner) {
      modalBadge.textContent = '🏆';
      modalTitle.textContent = 'VICTORY!';
      modalSubtitle.textContent = '🏆 Congratulations! You Won!';
    } else {
      modalBadge.textContent = '💻';
      modalTitle.textContent = 'GAME OVER';
      modalSubtitle.textContent = '💻 Computer Wins!';
    }

    modalFinalScore.textContent = `${playerScore} - ${computerScore}`;
    winnerModal.classList.remove('hidden');
    winnerModal.setAttribute('aria-hidden', 'false');
  }

  function resetGame() {
    playerScore = 0;
    computerScore = 0;
    isGameOver = false;

    playerScoreEl.textContent = '0';
    computerScoreEl.textContent = '0';

    playerIconEl.textContent = '❓';
    playerNameEl.textContent = 'Your Move';

    computerIconEl.textContent = '❓';
    computerNameEl.textContent = 'CPU Move';

    playerCircleEl.classList.remove('winner-circle', 'loser-circle');
    computerCircleEl.classList.remove('winner-circle', 'loser-circle');

    resultMessageEl.className = 'result-message';
    resultMessageEl.textContent = 'Select 🪨 Rock, 📄 Paper, or ✂️ Scissors to begin!';

    disableChoiceButtons(false);

    winnerModal.classList.add('hidden');
    winnerModal.setAttribute('aria-hidden', 'true');
    confettiContainer.innerHTML = '';
  }
});

/*
  Whack-a-Mole — Diseño arcade (vanilla JS)
  - Tablero 3x3
  - Dificultad ajustable (Fácil/Normal/Difícil)
  - Delegación de eventos para clicks en topo (evita problemas de listeners)
  - Efecto visual al golpear: "¡PUM!" y animación de golpe
*/

(function() {
  // Elementos del DOM
  const board = document.getElementById('board');
  const holes = () => Array.from(document.querySelectorAll('.hole'));
  const scoreEl = document.getElementById('score');
  const timeEl = document.getElementById('time');
  const startBtn = document.getElementById('startBtn');
  const messageEl = document.getElementById('message');

  // Estado del juego
  let score = 0;
  let timeLeft = 30;           // segundos del juego (se ajusta por dificultad)
  let gameInterval = null;     // controla aparición periódica
  let timerInterval = null;    // cuenta regresiva cada 1s
  let isRunning = false;
  let lastIndex = -1;          // para evitar repetir el mismo hole consecutivo

  // Mapear dificultad a intervalo (ms) entre apariciones y duración total (s)
  function getSettingsByDifficulty() {
    const sel = document.getElementById('difficulty');
    const val = sel ? sel.value : 'normal';
    switch (val) {
      case 'easy':
        return { interval: 900, duration: 40 };
      case 'hard':
        return { interval: 450, duration: 20 };
      case 'normal':
      default:
        return { interval: 700, duration: 30 };
    }
  }

  // Elige un índice aleatorio distinto del anterior
  function pickRandomIndex() {
    const hs = holes();
    if (hs.length === 0) return 0;
    let idx;
    do {
      idx = Math.floor(Math.random() * hs.length);
    } while (idx === lastIndex && hs.length > 1);
    lastIndex = idx;
    return idx;
  }

  // Muestra un topo en un hole aleatorio; asegura que solo haya uno visible
  function showMoleOnce() {
    // Oculta cualquier topo visible antes de mostrar el siguiente
    holes().forEach(h => h.classList.remove('up'));

    const idx = pickRandomIndex();
    const hs = holes();
    const hole = hs[idx];
    hole.classList.add('up');

    // Marcamos que el topo no ha sido golpeado aún
    const mole = hole.querySelector('.mole');
    if (mole) mole.dataset.hit = 'false';
  }

  // Inicio del juego
  function startGame() {
    if (isRunning) return;
    // reset estado
    score = 0;
    scoreEl.textContent = score;
    messageEl.textContent = '';
    isRunning = true;
    startBtn.disabled = true;

    // Leer la dificultad seleccionada y aplicar ajustes (interval + duración)
    const settings = getSettingsByDifficulty();
    timeLeft = settings.duration;
    timeEl.textContent = timeLeft;

    // Bloquear la selección de dificultad durante la partida
    const diffSel = document.getElementById('difficulty');
    if (diffSel) diffSel.disabled = true;

    // Mostrar inmediatamente y luego cada intervalo según dificultad
    showMoleOnce();
    gameInterval = setInterval(showMoleOnce, settings.interval);

    // Contador de tiempo
    timerInterval = setInterval(() => {
      timeLeft -= 1;
      timeEl.textContent = timeLeft;
      if (timeLeft <= 0) {
        endGame();
      }
    }, 1000);
  }

  // Final del juego: limpiar timers y mostrar resultado
  function endGame() {
    isRunning = false;
    startBtn.disabled = false;
    clearInterval(gameInterval);
    clearInterval(timerInterval);
    gameInterval = null;
    timerInterval = null;

    // Ocultar cualquier topo visible
    holes().forEach(h => h.classList.remove('up'));
    // Desbloquear la selección para permitir nueva elección
    const diffSel = document.getElementById('difficulty');
    if (diffSel) diffSel.disabled = false;

    messageEl.textContent = `Juego terminado — Puntaje final: ${score}`;
  }

  // Manejo de click en el tablero (delegación)
  function handleBoardClick(e) {
    // Verificar si clic fue en la mole o dentro de ella
    const mole = e.target.closest('.mole');
    if (!mole) return;
    const hole = mole.parentElement;
    if (!hole) return;

    // Solo contar si el topo está visible y no ya golpeado
    if (!hole.classList.contains('up')) return;
    if (mole.dataset.hit === 'true') return;

    // Registrar golpe
    mole.dataset.hit = 'true';
    score += 1;
    scoreEl.textContent = score;

    // Animación de golpe y efecto visual
    mole.classList.add('hit');
    const boom = document.createElement('div');
    boom.className = 'boom';
    boom.textContent = '¡PUM!';
    hole.appendChild(boom);
    setTimeout(() => { if (boom.parentElement) boom.parentElement.removeChild(boom); }, 520);

    // Ocultar el topo inmediatamente tras el golpe
    hole.classList.remove('up');
    setTimeout(() => mole.classList.remove('hit'), 420);
  }

  // Asociar listeners
  function attachListeners() {
    if (board) board.addEventListener('click', handleBoardClick);
    if (startBtn) startBtn.addEventListener('click', startGame);

    // Tecla Space para iniciar
    document.addEventListener('keydown', (ev) => {
      if (ev.code === 'Space' && !isRunning) {
        ev.preventDefault();
        startGame();
      }
    });
  }

  // Inicialización
  attachListeners();
})();

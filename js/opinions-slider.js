document.addEventListener('DOMContentLoaded', () => {
  const viewport = document.querySelector('.slider-opinion'); // el "viewport" visible
  const track = document.querySelector('.cards');     // el track que movemos
  const cards = Array.from(track.querySelectorAll('.opinion'));
  const prevBtn = document.querySelector('.prev-op');
  const nextBtn = document.querySelector('.next-op');
  const dotsContainer = document.querySelector('.dots');

  if (!viewport || !track || cards.length === 0 || !prevBtn || !nextBtn || !dotsContainer) {
    console.error('Faltan elementos del slider en el DOM', { viewport, track, cardsLength: cards.length, prevBtn, nextBtn, dotsContainer });
    return;
  }

  let visibleCards = 3; // será dinámico
  let totalCards = cards.length;
  let maxIndex = 0;
  let currentIndex = 0;
  let autoSlideInterval = null;

  let cardWidth = 0;
  let gap = 0;

  function setupSizes() {
    // Definir visibleCards según el ancho de la ventana
    visibleCards = window.innerWidth <= 768 ? 1 : 3;

    const style = getComputedStyle(track);
    gap = parseFloat(style.gap) || 18;
    const vw = viewport.clientWidth;
    cardWidth = (vw - gap * (visibleCards - 1)) / visibleCards;

    cards.forEach(c => {
      c.style.minWidth = `${cardWidth}px`;
    });

    // Recalcular maxIndex
    maxIndex = Math.max(0, totalCards - visibleCards);

    // Volver a crear dots
    createDots();

    // Ir al slide actual sin animación
    goToSlide(currentIndex, false);
  }

  // dots
  function createDots() {
    dotsContainer.innerHTML = '';
    for (let i = 0; i <= maxIndex; i++) {
      const dot = document.createElement('span');
      dot.addEventListener('click', () => { goToSlide(i); resetAuto(); });
      dotsContainer.appendChild(dot);
    }
    updateDots();
  }

  function updateDots() {
    Array.from(dotsContainer.children).forEach((d, idx) => d.classList.toggle('active', idx === currentIndex));
  }

  function goToSlide(index, animate = true) {
    currentIndex = Math.max(0, Math.min(maxIndex, index));
    track.style.transition = animate ? 'transform 0.5s ease-in-out' : 'none';
    const x = - (cardWidth + gap) * currentIndex;
    track.style.transform = `translateX(${x}px)`;
    updateDots();
  }

  function nextSlide() { goToSlide(currentIndex >= maxIndex ? 0 : currentIndex + 1); }
  function prevSlide() { goToSlide(currentIndex <= 0 ? maxIndex : currentIndex - 1); }

  prevBtn.addEventListener('click', () => { prevSlide(); resetAuto(); });
  nextBtn.addEventListener('click', () => { nextSlide(); resetAuto(); });

  function resetAuto() {
    if (autoSlideInterval) clearInterval(autoSlideInterval);
    autoSlideInterval = setInterval(nextSlide, 5000);
  }

  // drag with pointer events (works mouse + touch)
  let isDragging = false;
  let startX = 0;

  viewport.addEventListener('pointerdown', (e) => {
    isDragging = true;
    startX = e.clientX;
    track.style.transition = 'none';
    viewport.setPointerCapture(e.pointerId);
    if (autoSlideInterval) clearInterval(autoSlideInterval);
  });

  viewport.addEventListener('pointermove', (e) => {
    if (!isDragging) return;
    const delta = e.clientX - startX;
    const x = - (cardWidth + gap) * currentIndex + delta;
    track.style.transform = `translateX(${x}px)`;
  });

  function endDrag(e) {
    if (!isDragging) return;
    isDragging = false;
    const delta = e.clientX - startX;
    const threshold = cardWidth / 4; // ajustar sensibilidad
    if (delta > threshold) prevSlide();
    else if (delta < -threshold) nextSlide();
    else goToSlide(currentIndex);
    resetAuto();
  }

  viewport.addEventListener('pointerup', endDrag);
  viewport.addEventListener('pointercancel', endDrag);
  viewport.addEventListener('pointerleave', endDrag);

  window.addEventListener('resize', setupSizes);

  // init
  setupSizes();
  resetAuto();
});
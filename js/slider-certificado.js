document.addEventListener('DOMContentLoaded', () => {
  const slider = document.querySelector('.certificados-slider');
  if (!slider) return;
  const slides = Array.from(slider.querySelectorAll('.slide-certificado'));
  if (slides.length === 0) return;

const prevBtn = document.querySelector('.slider-container-cert .prev');
const nextBtn = document.querySelector('.slider-container-cert .next');


  let index = 0;
  let totalSlides = slides.length;
  let slidesToShow = calcSlidesToShow();
  let slideWidth = slides[0].getBoundingClientRect().width;
  let maxIndex = Math.max(0, totalSlides - slidesToShow);
  let autoId = null;

  function calcSlidesToShow() {
    return window.innerWidth <= 480 ? 1 : window.innerWidth <= 768 ? 2 : 3;
  }

  function updateSizes() {
    slidesToShow = calcSlidesToShow();
    slideWidth = slides[0].getBoundingClientRect().width;
    totalSlides = slides.length;
    maxIndex = Math.max(0, totalSlides - slidesToShow);
    
    if (index > maxIndex) index = maxIndex;
    moveTo(index);
  }

  function moveTo(i) {
    
    slider.style.transform = `translateX(${-i * slideWidth}px)`;
  }

  function next() {
    index = (index >= maxIndex) ? 0 : index + 1;
    moveTo(index);
  }

  function prev() {
    index = (index <= 0) ? maxIndex : index - 1;
    moveTo(index);
  }


  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      next();
      restartAuto();
    });
  }
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      prev();
      restartAuto();
    });
  }

 
  function startAuto() {
    stopAuto();
    autoId = setInterval(next, 3500);
  }
  function stopAuto() {
    if (autoId) {
      clearInterval(autoId);
      autoId = null;
    }
  }
  function restartAuto() {
    stopAuto();
    startAuto();
  }

 
  window.addEventListener('resize', () => {
    
    clearTimeout(window._certResizeTimer);
    window._certResizeTimer = setTimeout(() => updateSizes(), 120);
  });

  
  updateSizes();
  startAuto();
});
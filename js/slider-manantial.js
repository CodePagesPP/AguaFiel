const slider = document.querySelector('.slider');
const slides = document.querySelectorAll('.slide');
const nextBtn = document.querySelector('.next');
const prevBtn = document.querySelector('.prev');

let index = 0;
let autoSlide;

function showSlide(i) {
    index = (i + slides.length) % slides.length;
    slider.style.transform = `translateX(${-index * 100}%)`;
}


function nextSlide() {
    showSlide(index + 1);
}

function prevSlide() {
    showSlide(index - 1);
}


nextBtn.addEventListener('click', () => {
    nextSlide();
    restartAutoSlide();
});
prevBtn.addEventListener('click', () => {
    prevSlide();
    restartAutoSlide();
});


function startAutoSlide() {
    autoSlide = setInterval(nextSlide, 4000);
}

function restartAutoSlide() {
    clearInterval(autoSlide);
    startAutoSlide();
}


startAutoSlide();
const images = document.querySelectorAll(".hero-image");
let currentIndex = 0;

function changeImage() {
  images[currentIndex].classList.remove("active");
  currentIndex = (currentIndex + 1) % images.length;
  images[currentIndex].classList.add("active");
}

setInterval(changeImage, 5000);
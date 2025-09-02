const images = document.querySelectorAll(".hero-image");
let currentIndex = 0;

if (window.innerWidth <= 768) {
  images[0].src = "./assets/portada-mobile-2.png";
  images[1].src = "./assets/portada-mobile-3.png";
  images[2].src = "./assets/portada-mobile-1.png";
}

function changeImage() {
  images[currentIndex].classList.remove("active");
  currentIndex = (currentIndex + 1) % images.length;
  images[currentIndex].classList.add("active");
}

setInterval(changeImage, 5000);
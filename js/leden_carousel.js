document.addEventListener("DOMContentLoaded", function () {
    const carousel = document.querySelector("#hoe_werkt .carousel");
    const slides = document.querySelectorAll("#hoe_werkt .slide");
    const dots = document.querySelectorAll("#indicator .dot");

    let index = 0;
    let touchStartX = 0;
    let touchEndX = 0;
    const swipeThreshold = 50; // Minimale swipe-afstand

    function updateCarousel() {
        carousel.style.transform = `translateX(-${index * 100}%)`;
        dots.forEach(dot => dot.classList.remove("active"));
        dots[index].classList.add("active");
    }

    function checkSwipe() {
        if (touchEndX < touchStartX - swipeThreshold && index < slides.length - 1) {
            index++; // Swipe naar links
        } else if (touchEndX > touchStartX + swipeThreshold && index > 0) {
            index--; // Swipe naar rechts
        }
        updateCarousel();
    }

    // Event listeners voor swipe
    carousel.addEventListener("touchstart", e => {
        touchStartX = e.touches[0].clientX;
    });

    carousel.addEventListener("touchend", e => {
        touchEndX = e.changedTouches[0].clientX;
        checkSwipe();
    });

    // Dots functionaliteit
    dots.forEach((dot, dotIndex) => {
        dot.addEventListener("click", () => {
            index = dotIndex;
            updateCarousel();
        });
    });

    updateCarousel();
});

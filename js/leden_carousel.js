document.addEventListener("DOMContentLoaded", function () {
    const carousel = document.querySelector("#hoe_werkt .carousel");
    const dots = document.querySelectorAll("#indicator .dot");
    const slides = document.querySelectorAll("#hoe_werkt .slide");
    const totalSlides = slides.length; // Aantal beschikbare slides
    let index = 0; // Huidige slide index

    // Functie om de carousel te updaten
    function updateCarousel() {
        carousel.style.transform = "translateX(-" + (index * 100) + "%)";
        dots.forEach(dot => dot.classList.remove("active"));
        dots[index].classList.add("active");
    }

    // EventListener voor de bolletjes (dots)
    dots.forEach((dot, dotIndex) => {
        dot.addEventListener("click", function () {
            index = dotIndex;
            updateCarousel();
        });
    });

    // Swipe functionaliteit (voor mobiel)
    let touchStartX = 0;
    let touchEndX = 0;
    const swipeThreshold = 50; // Minimale afstand voor een geldige swipe

    carousel.addEventListener("touchstart", function (event) {
        touchStartX = event.touches[0].clientX;
    });

    carousel.addEventListener("touchmove", function (event) {
        touchEndX = event.touches[0].clientX;
    });

    carousel.addEventListener("touchend", function () {
        let swipeDistance = touchEndX - touchStartX;

        if (Math.abs(swipeDistance) > swipeThreshold) {
            if (swipeDistance < 0 && index < totalSlides - 1) {
                // Swipe naar links (volgende slide)
                index++;
            } else if (swipeDistance > 0 && index > 0) {
                // Swipe naar rechts (vorige slide)
                index--;
            }
        }

        updateCarousel();
    });

    updateCarousel(); // Zorgt ervoor dat de eerste slide correct wordt weergegeven
});

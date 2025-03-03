document.addEventListener("DOMContentLoaded", function () {
    const carousel = document.querySelector("#leden_aanbrengen main section:first-of-type #hoe_werkt .carousel");
    const dots = document.querySelectorAll("#leden_aanbrengen main section:first-of-type #hoe_werkt #indicator .dot");
    const totalSlides = dots.length; // Aantal beschikbare slides
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
    if (window.innerWidth <= 768) {
        let touchStartX = 0;
        let touchEndX = 0;
        const swipeThreshold = 50; // Minimale afstand voor een geldige swipe

        carousel.addEventListener("touchstart", function (event) {
            touchStartX = event.touches[0].clientX;
        });

        carousel.addEventListener("touchend", function (event) {
            touchEndX = event.changedTouches[0].clientX;
            let swipeDistance = touchEndX - touchStartX;

            // Controleer of de swipe lang genoeg was
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
    }

    // Reset transform wanneer scherm breder wordt dan 768px
    window.addEventListener("resize", function () {
        if (window.innerWidth > 768) {
            carousel.style.transform = "translateX(0)"; // Reset carousel
        } else {
            updateCarousel(); // Zorgt ervoor dat de juiste slide getoond wordt
        }
    });

    updateCarousel(); // Zorgt ervoor dat de eerste slide correct wordt weergegeven
});


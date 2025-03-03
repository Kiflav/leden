document.addEventListener("DOMContentLoaded", function () {
    const carousel = document.querySelector("#leden_aanbrengen main section:first-of-type #hoe_werkt .carousel");
    const dots = document.querySelectorAll("#leden_aanbrengen main section:first-of-type #hoe_werkt #indicator .dot");
    let index = 0;
    let touchStartX = 0;
    let touchEndX = 0;

    // Functie carousel updaten
    function updateCarousel() {
        carousel.style.transform = "translateX(-" + (index * 100) + "%)";
        dots.forEach(dot => dot.classList.remove("active"));
        dots[index].classList.add("active");
    }

    // Functie voor de bolletjes
    dots.forEach((dot, dotIndex) => {
        dot.addEventListener("click", () => {
            index = dotIndex;
            updateCarousel();
        });
    });

    // Swipe functie
    if (window.innerWidth <= 768) {
        carousel.addEventListener("touchstart", event => {
            touchStartX = event.touches[0].clientX;
        });

        carousel.addEventListener("touchmove", event => {
            touchEndX = event.touches[0].clientX;
        });

        carousel.addEventListener("touchend", event => {
            // Bereken het verschil in bewegingen (drempelwaarde ingesteld op 30px)
            if (Math.abs(touchEndX - touchStartX) > 30) {
                // Swipe naar links (volgende slide)
                if (touchEndX < touchStartX) {
                    index = (index + 1) % dots.length;
                }
                // Swipe naar rechts (vorige slide)
                else if (touchEndX > touchStartX) {
                    index = (index - 1 + dots.length) % dots.length;
                }
                updateCarousel();
            }
            // Reset de waarden van touchstart en touchend om ervoor te zorgen dat het goed herkend wordt
            touchStartX = 0;
            touchEndX = 0;
        });
    }

    // Voeg een click-event toe voor desktop of als fallback bij mobiele devices (indien nodig)
    carousel.addEventListener("click", () => {
        // Als de gebruiker op de carousel klikt (voor desktop bijvoorbeeld) kan het ook werken
        index = (index + 1) % dots.length;
        updateCarousel();
    });

    // Reset carousel bij resize
    window.addEventListener("resize", function () {
        if (window.innerWidth > 768) {
            carousel.style.transform = "translateX(0)";
        } else {
            updateCarousel();
        }
    });

    updateCarousel(); // Start de carousel met de eerste slide
});

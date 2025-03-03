document.addEventListener("DOMContentLoaded", function () {
    const carousel = document.querySelector("#leden_aanbrengen main section:first-of-type #hoe_werkt .carousel");
    const dots = document.querySelectorAll("#leden_aanbrengen main section:first-of-type #hoe_werkt #indicator .dot");
    var index = 0;

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
        let touchStartX = 0;
        let touchEndX = 0;

        // Voorkom standaardacties bij touchstart
        carousel.addEventListener("touchstart", function (event) {
            touchStartX = event.touches[0].clientX;
            event.preventDefault(); // Voorkomt standaard browsergedrag (zoals scrollen)
        }, { passive: false });

        // Handle touchend met een vertraging om swipen soepeler te maken
        carousel.addEventListener("touchend", function (event) {
            touchEndX = event.changedTouches[0].clientX;

            // Voeg vertraging toe voordat de swipe actie wordt uitgevoerd
            setTimeout(() => {
                if (Math.abs(touchEndX - touchStartX) > 30) { // Alleen verwerken als swipe groot genoeg is
                    if (touchEndX < touchStartX) { // Swipe naar links (volgende slide)
                        index = (index + 1) % dots.length;
                    }
                    else if (touchEndX > touchStartX) { // Swipe naar rechts (vorige slide)
                        index = (index - 1 + dots.length) % dots.length;
                    }
                    updateCarousel();
                }
            }, 100); // 100ms vertraging
        });
    }

    // Reset transform bij het wijzigen van schermgrootte
    window.addEventListener("resize", function () {
        if (window.innerWidth > 768) {
            carousel.style.transform = "translateX(0)";
        } else {
            updateCarousel();
        }
    });

    // Initialiseer carousel bij laden van de pagina
    updateCarousel();
});

document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.querySelector("#leden_aanbrengen main section:first-of-type #hoe_werkt .carousel");
    const slides = document.querySelectorAll("#leden_aanbrengen main section:first-of-type #hoe_werkt .carousel .slide");
    const dots = document.querySelectorAll("#leden_aanbrengen main section:first-of-type #hoe_werkt #indicator .dot");
    let index = 0;
    let touchstartX = 0;
    let touchendX = 0;

    // Functie om de carousel bij te werken
    function updateCarousel() {
        carousel.style.transform = "translateX(-" + (index * 100) + "%)";
        dots.forEach(dot => dot.classList.remove("active"));
        dots[index].classList.add("active");
    }

    // Functie om de swipe richting te controleren
    function checkDirection() {
        if (touchendX < touchstartX) { // Swipe naar links
            index = (index + 1) % slides.length;
        } else if (touchendX > touchstartX) { // Swipe naar rechts
            index = (index - 1 + slides.length) % slides.length;
        }
        updateCarousel();
    }

    // Event listeners voor het swipen
    carousel.addEventListener('touchstart', function(e) {
        touchstartX = e.changedTouches[0].screenX; // Begin van de touch
    });

    carousel.addEventListener('touchend', function(e) {
        touchendX = e.changedTouches[0].screenX; // Eind van de touch
        checkDirection(); // Controleer de richting
    });

    // Event listeners voor het klikken op de bolletjes
    dots.forEach((dot, dotIndex) => {
        dot.addEventListener("click", () => {
            index = dotIndex;
            updateCarousel();
        });
    });

    // Zorg ervoor dat de carousel juist wordt weergegeven op laden
    updateCarousel();

    // Reset transform wanneer scherm breder wordt dan 768px
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            carousel.style.transform = "translateX(0)";
        } else {
            updateCarousel();
        }
    });
});

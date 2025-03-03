document.addEventListener('DOMContentLoaded', function () {
    const carousel = document.querySelector("#leden_aanbrengen main section:first-of-type #hoe_werkt .carousel");
    const slides = document.querySelectorAll("#leden_aanbrengen main section:first-of-type #hoe_werkt .carousel .slide");
    const dots = document.querySelectorAll("#leden_aanbrengen main section:first-of-type #hoe_werkt #indicator .dot");

    let index = 0;  // Huidige slide-index
    let touchstartX = 0;
    let touchendX = 0;

    // Update de carousel
    function updateCarousel() {
        carousel.style.transform = "translateX(-" + (index * 100) + "%)";
        dots.forEach(dot => dot.classList.remove("active"));
        dots[index].classList.add("active");
    }

    // Check de swipe richting en update de index
    function checkDirection() {
        if (touchendX < touchstartX) {
            index = (index + 1) % slides.length;  // Volgende slide
        } else if (touchendX > touchstartX) {
            index = (index - 1 + slides.length) % slides.length;  // Vorige slide
        }
        updateCarousel();
    }

    // Touchstart event
    carousel.addEventListener('touchstart', function (e) {
        touchstartX = e.changedTouches[0].screenX;
    });

    // Touchend event
    carousel.addEventListener('touchend', function (e) {
        touchendX = e.changedTouches[0].screenX;
        checkDirection();
    });

    // Klikken op de bolletjes
    dots.forEach((dot, dotIndex) => {
        dot.addEventListener("click", function () {
            index = dotIndex;
            updateCarousel();
        });
    });

    // Initialiseer de carousel (zorg ervoor dat deze correct start)
    updateCarousel();

    // Reset de carousel wanneer het scherm groter wordt dan 768px
    window.addEventListener('resize', function () {
        if (window.innerWidth > 768) {
            carousel.style.transform = "translateX(0)";
        } else {
            updateCarousel();
        }
    });
});

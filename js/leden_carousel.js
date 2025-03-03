document.addEventListener("DOMContentLoaded", function () {
    const carousel = document.querySelector("#leden_aanbrengen main section:first-of-type #hoe_werkt .carousel");
    const dots = document.querySelectorAll("#leden_aanbrengen main section:first-of-type #hoe_werkt #indicator .dot");
    let index = 0;
    let touchStartX = 0;
    let touchEndX = 0;

    // Functie om de carousel up te daten
    function updateCarousel() {
        carousel.style.transform = "translateX(-" + (index * 100) + "%)";
        setIndicator();
    }

    // Functie om de indicator bij te werken
    function setIndicator() {
        dots.forEach(dot => dot.classList.remove("active"));
        dots[index].classList.add("active");
    }

    // Functie om touchstart af te handelen
    function handleTouchStart(event) {
        touchStartX = event.touches[0].clientX;
    }

    // Functie om touchend af te handelen
    function handleTouchEnd(event) {
        touchEndX = event.changedTouches[0].clientX;

        // Check of de swipe genoeg verschuiving heeft
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
        // Reset de waarden van touchStart en touchEnd
        touchStartX = 0;
        touchEndX = 0;
    }

    // Functie om op een dot te klikken (om naar een specifieke slide te gaan)
    function handleDotClick(dotIndex) {
        index = dotIndex;
        updateCarousel();
    }

    // Functie om de swipe-functionaliteit in te stellen
    function initSwipe() {
        carousel.addEventListener("touchstart", handleTouchStart);
        carousel.addEventListener("touchend", handleTouchEnd);
    }

    // Functie om de klikfunctionaliteit in te stellen voor de dots
    function initDots() {
        dots.forEach((dot, dotIndex) => {
            dot.addEventListener("click", () => handleDotClick(dotIndex));
        });
    }

    // Functie om de carousel opnieuw in te stellen op grotere schermen
    function initResize() {
        window.addEventListener("resize", function () {
            if (window.innerWidth > 768) {
                carousel.style.transform = "translateX(0)";
            } else {
                updateCarousel();
            }
        });
    }

    // Functie om alles in te stellen bij het laden van de pagina
    function initCarousel() {
        updateCarousel();
        initSwipe();
        initDots();
        initResize();
    }

    // Start de carousel
    initCarousel();
});

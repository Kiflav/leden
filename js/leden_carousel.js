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

    // Functie om de bullets bij te werken
    function setIndicator() {
        dots.forEach(dot => dot.classList.remove("active"));
        dots[index].classList.add("active");
    }

    function handleTouchStart(event) {
        touchStartX = event.touches[0].clientX;
    }

    function handleTouchMove(event) {
        // Optioneel: voorkom scrollen of ander standaardgedrag
        event.preventDefault();
        touchEndX = event.touches[0].clientX;
    }

    function handleTouchEnd(event) {
        touchEndX = event.changedTouches[0].clientX;

        if (Math.abs(touchEndX - touchStartX) > 60) { 
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
        // Reset
        touchStartX = 0;
        touchEndX = 0;
    }

    // Dot klikken functie
    function handleDotClick(dotIndex) {
        index = dotIndex;
        updateCarousel();
    }

    // Swipe functie
    function initSwipe() {
        carousel.addEventListener("touchstart", handleTouchStart, { passive: false });
        carousel.addEventListener("touchmove", handleTouchMove, { passive: false });
        carousel.addEventListener("touchend", handleTouchEnd, { passive: false });
    }

    function initDots() {
        dots.forEach((dot, dotIndex) => {
            dot.addEventListener("click", () => handleDotClick(dotIndex));
        });
    }

    function initResize() {
        window.addEventListener("resize", function () {
            if (window.innerWidth > 768) {
                carousel.style.transform = "translateX(0)";
            } else {
                updateCarousel();
            }
        });
    }

    function initCarousel() {
        updateCarousel();
        initSwipe();
        initDots();
        initResize();
    }

    initCarousel();
});

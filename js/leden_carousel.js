document.addEventListener("DOMContentLoaded", function () {
    const carousel = document.querySelector("#leden_aanbrengen main section:first-of-type #hoe_werkt .carousel");
    const dots = document.querySelectorAll("#leden_aanbrengen main section:first-of-type #hoe_werkt #indicator .dot");
    let index = 0;
    let touchStartX = 0;
    let touchMoveX = 0;
    let touchEndX = 0;
    let isSwiping = false;

    // Functie om de carousel bij te werken
    function updateCarousel() {
        carousel.style.transition = "transform 0.4s ease-in-out";
        carousel.style.transform = `translateX(-${index * 100}%)`;
        updateIndicators();
    }

    // Functie om de actieve indicator te zetten
    function updateIndicators() {
        dots.forEach(dot => dot.classList.remove("active"));
        dots[index].classList.add("active");
    }

    // Start swipe (touchstart)
    function handleTouchStart(event) {
        touchStartX = event.touches[0].clientX;
        touchMoveX = touchStartX;
        isSwiping = true;
    }

    // Tijdens het swipen (touchmove)
    function handleTouchMove(event) {
        if (!isSwiping) return;
        touchMoveX = event.touches[0].clientX;
    }

    // Einde van swipe (touchend)
    function handleTouchEnd() {
        if (!isSwiping) return;
        touchEndX = touchMoveX;
        let swipeDistance = touchStartX - touchEndX;

        // Alleen swipen als de beweging minimaal 50px is
        if (Math.abs(swipeDistance) > 50) {
            if (swipeDistance > 0 && index < dots.length - 1) {
                // Swipe naar links (volgende slide)
                index++;
            } else if (swipeDistance < 0 && index > 0) {
                // Swipe naar rechts (vorige slide)
                index--;
            }
        }

        updateCarousel();
        isSwiping = false;
    }

    // Klik op de indicatoren
    function handleDotClick(dotIndex) {
        index = dotIndex;
        updateCarousel();
    }

    // Eventlisteners instellen
    function initEvents() {
        carousel.addEventListener("touchstart", handleTouchStart);
        carousel.addEventListener("touchmove", handleTouchMove);
        carousel.addEventListener("touchend", handleTouchEnd);

        dots.forEach((dot, dotIndex) => {
            dot.addEventListener("click", () => handleDotClick(dotIndex));
        });
    }

    // Init function
    function initCarousel() {
        updateCarousel();
        initEvents();
    }

    // Start de carousel
    initCarousel();
});

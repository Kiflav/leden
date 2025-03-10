
document.addEventListener("DOMContentLoaded", function () {
    const carousel = document.querySelector("#leden_aanbrengen main section:first-of-type #hoe_werkt .carousel");
    const dots = document.querySelectorAll("#leden_aanbrengen main section:first-of-type #hoe_werkt #indicator .dot");
    let index = 0;
    let touchStartX = 0;
    let touchEndX = 0;

    function updateCarousel() {
        carousel.style.transform = "translateX(-" + (index * 100) + "%)";
        setIndicator();
        carousel.offsetHeight; // Forceer reflow

    }

    function setIndicator() {
        dots.forEach(dot => dot.classList.remove("active"));
        dots[index].classList.add("active");
    }

    function handleTouchStart(event) {
        touchStartX = event.touches[0].clientX;

    }

    function handleTouchMove(event) {
        touchEndX = event.touches[0].clientX;
    }

    function handleTouchEnd(event) {
        touchEndX = event.changedTouches[0].clientX;
        const swipeDistance = touchEndX - touchStartX;


        if (Math.abs(swipeDistance) > 60) {
            if (swipeDistance < 0) {
                index = (index + 1) % dots.length;
            } else {
                index = (index - 1 + dots.length) % dots.length;
            }
            updateCarousel();
            // Herstart swipe-listeners na elke swipe
            removeSwipeListeners();
            initSwipe();
        }
        touchStartX = 0;
        touchEndX = 0;
    }

    function removeSwipeListeners() {
        carousel.removeEventListener("touchstart", handleTouchStart);
        carousel.removeEventListener("touchmove", handleTouchMove);
        carousel.removeEventListener("touchend", handleTouchEnd);
    }

    function initSwipe() {
        carousel.addEventListener("touchstart", handleTouchStart, { passive: false });
        carousel.addEventListener("touchmove", handleTouchMove, { passive: false });
        carousel.addEventListener("touchend", handleTouchEnd, { passive: false });
        console.log("Swipe listeners initialized");
    }

    function handleDotClick(dotIndex) {
        index = dotIndex;
        updateCarousel();
        removeSwipeListeners();
        initSwipe(); // Reset listeners na dot-klik
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

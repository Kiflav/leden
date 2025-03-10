document.addEventListener("DOMContentLoaded", function () {
    const carousel = document.querySelector("#leden_aanbrengen main section:first-of-type #hoe_werkt .carousel");
    const dots = document.querySelectorAll("#leden_aanbrengen main section:first-of-type #hoe_werkt #indicator .dot");
    let index = 0;
    let touchStartX = 0;
    let touchEndX = 0;

    function updateCarousel() {
        carousel.style.transform = `translateX(-${index * 100}%)`;
        setIndicator();
        // Forceer reflow op iOS
        carousel.offsetHeight; // Trigger reflow
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

        if (Math.abs(swipeDistance) > 50) {
            if (swipeDistance < 0) {
                // Swipe naar links
                index = (index + 1) % dots.length;
            } else {
                // Swipe naar rechts
                index = (index - 1 + dots.length) % dots.length;
            }
            updateCarousel();
        }
        touchStartX = 0;
        touchEndX = 0;
    }

    function handleDotClick(dotIndex) {
        index = dotIndex;
        updateCarousel();
    }

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

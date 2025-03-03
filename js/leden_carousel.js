document.addEventListener("DOMContentLoaded", function () {
    const carousel = document.querySelector("#leden_aanbrengen main section:first-of-type #hoe_werkt .carousel");
    const dots = document.querySelectorAll("#leden_aanbrengen main section:first-of-type #hoe_werkt #indicator .dot");
    var index = 0;
    let touchStartX = 0;
    let touchEndX = 0;

    // Functie om de carousel te updaten
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
            if (Math.abs(touchEndX - touchStartX) > 30) { // Drempel voor swipe
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
        });
    }

    // Reset carousel op resize
    window.addEventListener("resize", function () {
        if (window.innerWidth > 768) {
            carousel.style.transform = "translateX(0)";
        } else {
            updateCarousel();
        }
    });

    updateCarousel();
});

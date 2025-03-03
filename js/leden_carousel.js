document.addEventListener("DOMContentLoaded", function () {
    const carousel = document.querySelector("#hoe_werkt .carousel");
    const slides = document.querySelectorAll("#hoe_werkt .slide");
    const dots = document.querySelectorAll("#indicator .dot");
    
    let index = 0;
    let touchStartX = 0;
    let touchEndX = 0;

    // Update de carousel en activeer de juiste dot
    function updateCarousel() {
        carousel.style.transform = `translateX(-${index * 100}%)`;
        dots.forEach(dot => dot.classList.remove("active"));
        dots[index].classList.add("active");
    }

    // Swipe detectie
    function checkSwipe() {
        if (touchEndX < touchStartX - 50) { // Swipe naar links
            index = (index + 1) % slides.length;
        } else if (touchEndX > touchStartX + 50) { // Swipe naar rechts
            index = (index - 1 + slides.length) % slides.length;
        }
        updateCarousel();
    }

    // Event listener voor touch start (begin swipe)
    carousel.addEventListener("touchstart", function (e) {
        touchStartX = e.touches[0].clientX;
    });

    // Event listener voor touch move (blijft swipen)
    carousel.addEventListener("touchmove", function (e) {
        touchEndX = e.touches[0].clientX;
    });

    // Event listener voor touch end (swipe voltooid)
    carousel.addEventListener("touchend", function () {
        checkSwipe();
    });

    // Dots functionaliteit
    dots.forEach((dot, dotIndex) => {
        dot.addEventListener("click", function () {
            index = dotIndex;
            updateCarousel();
        });
    });

    // Initialiseer de carousel bij het laden
    updateCarousel();
});

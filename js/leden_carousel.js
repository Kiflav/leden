// VOOR MOBIEL CAROUSEL
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

    //functie voor de bolletjes
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

        carousel.addEventListener("touchstart", event => {
            touchStartX = event.touches[0].clientX;
        });

        carousel.addEventListener("touchend", event => {
            touchEndX = event.changedTouches[0].clientX;

            // Swipe naar links (volgende slide)
            if (touchEndX < touchStartX) {
                index = (index + 1) % dots.length; 
            }
            // Swipe naar rechts (vorige slide)
            else if (touchEndX > touchStartX) {
                index = (index - 1 + dots.length) % dots.length; 
            }

            updateCarousel();
        });
    }


   window.addEventListener("resize", function () {
       if (window.innerWidth > 768) {
           carousel.style.transform = "translateX(0)"; 
       } else {
           updateCarousel(); 
       }
   });

    updateCarousel(); 
});

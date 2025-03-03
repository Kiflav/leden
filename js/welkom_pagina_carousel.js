// VOOR DE CAROUSEL
document.addEventListener("DOMContentLoaded", function () {
    const prevBtn = document.querySelector(".prev");
    const nextBtn = document.querySelector(".next");
    const carousel = document.querySelector(".carousel");
    const cards = document.querySelectorAll(".flip-card");

    if (prevBtn && nextBtn && carousel && cards.length > 0) {
        let currentIndex = 0;
        const cardWidth = 249 + 22; 
        let visibleCards;

        function calculateVisibleCards() {
            // Bereken het aantal zichtbare kaarten op basis van schermbreedte
            const containerWidth = carousel.parentElement.offsetWidth;
            visibleCards = Math.floor(containerWidth / cardWidth);

            // Controleer of currentIndex nog geldig is
            if (currentIndex > cards.length - visibleCards) {
                currentIndex = cards.length - visibleCards;
            }

            updateCarousel();
        }

        function updateCarousel() {
            // Controle of er genoeg kaarten zijn om te scrollen
            if (cards.length <= visibleCards) {
                nextBtn.style.display = "none";
                prevBtn.style.display = "none";
                return;
            } else {
                nextBtn.style.display = "flex";
                prevBtn.style.display = currentIndex === 0 ? "none" : "flex";
            }

            const offset = -(currentIndex * cardWidth);
            carousel.style.transform = "translateX(" + offset + "px)";

            // Verberg de volgende knop als er geen volledige kaart meer past
            nextBtn.style.display = (currentIndex >= cards.length - visibleCards) ? "none" : "flex";
        }

        // Vorige knop
        prevBtn.addEventListener("click", function () {
            if (currentIndex > 0) {
                currentIndex--;
                updateCarousel();
            }
        });

        // Volgende knop
        nextBtn.addEventListener("click", function () {
            if (currentIndex < cards.length - visibleCards) {
                currentIndex++;
                updateCarousel();
            }
        });

        // Herbereken bij schermgrootte verandering
        window.addEventListener("resize", calculateVisibleCards);
        calculateVisibleCards();
    }
});

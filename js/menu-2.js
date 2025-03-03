// Code for making the menu smaller on mobile
document.addEventListener("DOMContentLoaded", function() {

    function makeMenuFixed() {
        const subnav = document.getElementById('subnav');
        const registerNavbar = document.getElementById('register-navbar');
        
        if (window.innerWidth <= 767) {
			registerNavbar.style.position = 'absolute';

            if (window.scrollY > 126) {
                subnav.classList.add('navbar-fixed');
            } else if (window.scrollY < 125) {
                subnav.classList.remove('navbar-fixed');
            }
        } else {
            subnav.classList.remove('navbar-fixed');
			registerNavbar.style.position = '';
        }
    }

    window.addEventListener("resize", makeMenuFixed);
    window.addEventListener("scroll", makeMenuFixed);

    // Call it initially to set the correct state on load
    makeMenuFixed();
});	


// OBSERVER code for the hamburger Animation
// Get the HTML element
const htmlElement = document.documentElement; // Alternatively, use `document.querySelector('html')`.

// Create an observer to monitor changes in the class attribute of the HTML element
const observer = new MutationObserver(() => {
    // Check if the HTML element has the 'nav-open' class
    if (htmlElement.classList.contains('nav-open')) {
        // Remove 'collapsed' class from button with class 'navbar-toggle'
        const toggleButton = document.querySelector('.navbar-toggle');
        if (toggleButton) {
            toggleButton.classList.remove('collapsed');
        }
    } else {
        // Add 'collapsed' class to button with class 'navbar-toggle'
        const toggleButton = document.querySelector('.navbar-toggle');
        if (toggleButton) {
            toggleButton.classList.add('collapsed');
        }
    }
});

// Observe the `class` attribute on the HTML element
observer.observe(htmlElement, {
    attributes: true,  // Look for attribute changes
    attributeFilter: ['class'] // Only monitor the `class` attribute
});
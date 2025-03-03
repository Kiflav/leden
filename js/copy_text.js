document.addEventListener("DOMContentLoaded", function () {
    var copyButtons = document.querySelectorAll(".copy-click");

    copyButtons.forEach(function (button) {
        button.addEventListener("click", function () {
			
            var linkText = document.querySelector("#unieke_link a").textContent;

            navigator.clipboard.writeText(linkText).then(function () {
                var feedback = document.createElement("span");
                feedback.className = "copy-feedback";
                feedback.textContent = "Gekopieerd!";
                
                document.body.appendChild(feedback); // feedback toevoegen aan pagina

                // Positie van feedback
                var buttonRect = button.getBoundingClientRect();
                feedback.style.position = "absolute";
                feedback.style.top = (window.scrollY + buttonRect.top - 40) + "px";
                feedback.style.left = (window.scrollX + buttonRect.left + (buttonRect.width - 90 )) + "px";
                feedback.style.opacity = "1"; 

                setTimeout(function () {
                    feedback.style.opacity = "0";
                    setTimeout(function () {
                        document.body.removeChild(feedback);
                    }, 300);
                }, 2000); 
            });
        });
    });
});
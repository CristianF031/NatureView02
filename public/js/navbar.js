document.addEventListener("DOMContentLoaded", function () {
    fetch("/components/navbar.html")
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.text();
        })
        .then(data => {
            document.getElementById("navbar-container").innerHTML = data;
            initializeNavbar();
        })
        .catch(error => {
            console.error("Error cargando el navbar:", error);
            
            fetch("components/navbar.html")
                .then(response => response.text())
                .then(data => {
                    document.getElementById("navbar-container").innerHTML = data;
                    initializeNavbar();
                })
                .catch(fallbackError => {
                    console.error("Error con ruta relativa:", fallbackError);
                });
        });

    function initializeNavbar() {
        const menuCheckbox = document.getElementById("menu");
        const navContainer = document.querySelector(".nav-container");
        
        if (menuCheckbox && navContainer) {
            menuCheckbox.addEventListener("change", function () {
                if (this.checked) {
                    navContainer.style.right = "0";
                } else {
                    navContainer.style.right = "-100%";
                }
            });
        }
        
        // Cerrar menú al hacer click en un enlace (para móviles)
        const navLinks = document.querySelectorAll('.navbar a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (menuCheckbox) {
                    menuCheckbox.checked = false;
                    if (navContainer) {
                        navContainer.style.right = "-100%";
                    }
                }
            });
        });
    }
});
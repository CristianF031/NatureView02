document.addEventListener("DOMContentLoaded", function () {
    fetch("/components/navbar.html")
        .then(response => response.text())
        .then(data => {
            document.getElementById("navbar-container").innerHTML = data;

            // Espera a que el contenido se cargue antes de añadir eventos
            setTimeout(() => {
                const menuCheckbox = document.getElementById("menu");
                const navContainer = document.querySelector(".nav-container");

                if (menuCheckbox) {
                    menuCheckbox.addEventListener("change", function () {
                        if (this.checked) {
                            navContainer.style.right = "0";
                        } else {
                            navContainer.style.right = "-100%";
                        }
                    });
                }
            }, 100); // Pequeño delay para asegurar que el DOM se actualice
        })
        .catch(error => console.error("Error cargando el navbar:", error));
});
// Archivo: js/admin.js (Responsabilidad ÚNICA: controlar el sidebar)

document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('menu-toggle');
    const sidebar = document.querySelector('.sidebar');
    const overlay = document.getElementById('overlay');

    // Se asegura de que los elementos existan antes de añadir eventos
    if (menuToggle && sidebar && overlay) {
        function toggleMenu() {
            sidebar.classList.toggle('is-visible');
            overlay.classList.toggle('is-visible');
        }

        menuToggle.addEventListener('click', toggleMenu);
        overlay.addEventListener('click', toggleMenu);
    }
});
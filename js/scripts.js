// Inicializar Lucide Icons
lucide.createIcons();

// Lógica para el menú móvil
const menuBtn = document.getElementById("menu-btn");
const mobileMenu = document.getElementById("mobile-menu");
menuBtn.addEventListener("click", () => {
  mobileMenu.classList.toggle("hidden");
});

// Cerrar menú móvil al hacer clic en un enlace
document.querySelectorAll("#mobile-menu a").forEach((link) => {
  link.addEventListener("click", () => {
    mobileMenu.classList.add("hidden");
  });
});

// Año actual en el footer
document.getElementById("current-year").textContent = new Date().getFullYear();

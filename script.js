// Target the menu and icon elements, toggle the .open CSS class
function toggleMenu() {
  // Grab the first instance of class '.menu-links'
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  menu.classList.toggle("open");
  icon.classList.toggle("open");
}

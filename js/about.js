// script.js - Hamburger menu functionality
document.addEventListener("DOMContentLoaded", function () {
  const hamburger = document.querySelector(".hamburger");
  const nav = document.getElementById("nav");

  if (hamburger && nav) {
    hamburger.addEventListener("click", function () {
      // Toggle nav visibility
      nav.classList.toggle("active");

      // Animate hamburger icon
      this.classList.toggle("open");

      // Prevent scrolling when menu is open
      document.body.style.overflow = nav.classList.contains("active")
        ? "hidden"
        : "";
    });
  } else {
    console.error("Could not find hamburger or nav elements!");
  }
});

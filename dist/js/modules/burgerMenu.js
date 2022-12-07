export default function burgerMenu() {
  const burgerBtn = document.querySelector(".burger-btn");
  const burgerMenu = document.querySelector(".menu-mobile");
  const overlay = document.querySelector(".menu__overlay");

  burgerBtn.addEventListener("click", toggleAccordion);
  overlay.addEventListener("click", closeAccordion);

  function toggleAccordion() {
    burgerMenu.classList.toggle("menu-mobile--active");
    burgerBtn.classList.toggle("burger-btn--active");
  }

  function closeAccordion() {
    burgerMenu.classList.remove("menu-mobile--active");
    burgerBtn.classList.remove("burger-btn--active");
  }
}

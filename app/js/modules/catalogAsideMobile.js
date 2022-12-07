export default function catalogAsideMobile() {
  const asideMenu = document.querySelector(".catalog__aside");
  const asideBtn = document.querySelector(".catalog__aside-btn");
  const overlay = document.querySelector(".catalog .menu__overlay");
  const closeBtnMobile = document.querySelector(".catalog__filter-mobile-btn");

  if (asideBtn) {
    asideBtn.addEventListener("click", openAside);
    overlay.addEventListener("click", closeAside);
    closeBtnMobile.addEventListener("click", closeAside);

    function openAside() {
      asideMenu.classList.add("catalog__aside--active");
    }

    function closeAside() {
      asideMenu.classList.remove("catalog__aside--active");
    }
  }
}

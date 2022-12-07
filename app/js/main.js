import tabsInit from "./modules/tabs/tabsInit.js";
import sliders from "./modules/sliders.js";
import mailForm from "../js/modules/mailForm.js";
import accordion from "../js/modules/accordion.js";
import rangeSlider from "../js/modules/rangeSlider.js";
import select from "../js/modules/select.js";
import searchForm from "../js/modules/searchForm.js";
import catalogCards from "../js/modules/catalogCards.js";
import { favoriteAdd } from "../js/modules/favorite.js";
import starRate from "../js/modules/starRate.js";
import bindLinks from "../js/modules/bindLinks.js";
import burgerMenu from "../js/modules/burgerMenu.js";
import catalogAsideMobile from "../js/modules/catalogAsideMobile.js";

window.addEventListener("DOMContentLoaded", () => {
  mailForm(".footer__form", ".footer__form-input");
  sliders();
  tabsInit();
  accordion({
    triggerSelector: ".aside__title-drop",
    activeClass: "aside__title--active",
  });
  accordion({
    triggerSelector: ".product-card__list-more",
    destroyTrigger: true,
    hideBtnSelector: ".product-card__list-more-hide",
  });
  accordion({
    triggerSelector: ".footer__accordion",
    activeClass: "acc-active",
  });
  accordion({
    triggerSelector: ".pickup__btn-more",
    destroyTrigger: true,
    hideBtnSelector: ".pickup__btn-hide",
  });
  select();
  searchForm();
  catalogCards();
  favoriteAdd("product-card__icon-favorite");
  starRate(".product-card__rate");
  bindLinks();
  rangeSlider();
  burgerMenu();
  catalogAsideMobile();
});

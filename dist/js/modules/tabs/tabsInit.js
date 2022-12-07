import Tabs from "./tabs.js";

export default function tabsInit() {
  const searchTabs = new Tabs(
    ".search__tabs",
    ".search__tabs-item",
    ".search__content-item",
    "search__tabs-item--active",
    1
  );
  searchTabs.init();

  // Табы в popular
  const popularTabs = new Tabs(
    ".popular .popular__tabs-wrapper",
    ".popular .popular__tab",
    ".popular .popular__tabs-content",
    "popular__tab--active"
  );
  popularTabs.init();

  // Табы в product-add
  const productAddTabs = new Tabs(
    ".product-add .popular__tabs-wrapper",
    ".product-add .popular__tab",
    ".product-add .popular__tabs-content",
    "popular__tab--active"
  );
  productAddTabs.init();

  // Табы в catalog__aside
  const catalogAsideTabs = new Tabs(
    ".catalog__aside-tabs",
    ".catalog__aside-tab",
    ".catalog__aside-content-item",
    "catalog__aside-tab--active"
  );
  catalogAsideTabs.init();

  // Табы в product-card__content
  const productCardTabs = new Tabs(
    ".product-card__tabs",
    ".product-card__tab",
    ".product-card__tabs-item",
    "product-card__tab--active"
  );
  productCardTabs.init();

  // Табы в product-info
  const productInfoTabs = new Tabs(
    ".product-info__tabs",
    ".product-info__tab",
    ".product-info__tab-item",
    "product-info__tab--active",
    3
  );
  productInfoTabs.init();

   // Табы в products-buy
   const productsBuyTabs = new Tabs(
    ".products-buy .popular__tabs-wrapper",
    ".products-buy .popular__tab",
    ".products-buy .popular__tabs-content",
    "popular__tab--active"
  );
  productsBuyTabs.init();
}

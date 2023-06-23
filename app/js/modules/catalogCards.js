import { getResource } from "../services/requests.js";
import { favoriteAdd, favoriteRemove } from "./favorite.js";
import { SERVER_URL } from "../const.js";

// Функция создает 2 массива: notAvailableArr (нет в наличии) и inStockArr (в наличии). После получения данных
// с сервера метод render() создает карту товара и помещает ее в один из массивов.
export default function catalogCards() {
  let notAvailableArr = [];
  let inStockArr = [];
  let cardsArr = [];
  let currentPage = 0;
  let cardsPerPage = 12;

  // Обьединяет массивы.
  function concatArr() {
    cardsArr = inStockArr.concat(notAvailableArr);
  }

  // Группирует товары на странице.
  function catalogGroup() {
    const btnGrid = document.querySelector(".catalog__filter-btngrid");
    const btnLine = document.querySelector(".catalog__filter-btnline");

    if (btnGrid !== null) {
      btnGrid.addEventListener("click", function () {
        btnGrid.classList.add("catalog__filter-btn-group--active");
        btnLine.classList.remove("catalog__filter-btn-group--active");
        cardsArr.forEach((item) => {
          item.classList.remove("popular__item-wrapper--list");
        });
      });
      btnLine.addEventListener("click", function () {
        btnLine.classList.add("catalog__filter-btn-group--active");
        btnGrid.classList.remove("catalog__filter-btn-group--active");
        cardsArr.forEach((item) => {
          item.classList.add("popular__item-wrapper--list");
        });
      });
    }
  }

  function sortProducts() {
    const sortByPriceToHightBtn = document.querySelector(
      '[data-value="expensive"]'
    );
    const sortByPriceToLowBtn = document.querySelector(
      '[data-value="cheapest"]'
    );

    if (sortByPriceToHightBtn) {
      sortByPriceToHightBtn.addEventListener("click", () =>
        sortByPrice("toHigth")
      );
      sortByPriceToLowBtn.addEventListener("click", () => sortByPrice("toLow"));

      function sortByPrice(dir) {
        getResource(`${SERVER_URL}/catalog-cards`).then((data) => {
          let arr = Array.from(data);

          if (dir === "toHigth") {
            arr.sort((a, b) => {
              return a.price - b.price;
            });
          }

          if (dir === "toLow") {
            arr.sort((a, b) => {
              return b.price - a.price;
            });
          }

          inStockArr = [];
          notAvailableArr = [];
          arr.forEach(({ img, title, price, classes }) => {
            new CatalogCard(img, title, price, classes).render();
          });
          currentPage = 0;
          concatArr();
          catalogRender(cardsArr, cardsPerPage, currentPage);
          pagination();
        });
      }
    }
  }

  sortProducts();

  // Рендерит определенный диапазон списка товаров. В конце вызывает 2 функции: favoriteRemove()
  //  и favoriteAdd(), первая удаляет обработчик клика с 'сердца' карты товара, вторая добавляет.
  // Без вызова favoriteRemove() кол-во обработчиков с каждым рендером страницы будет увеличиваться.
  function catalogRender(itemsArr, itemsPerPage, page, overwrite = true) {
    const catalogPage = document.querySelector(".catalog__list-wrapper");
    const start = itemsPerPage * page;
    const end = start + itemsPerPage;
    const paginatedData = itemsArr.slice(start, end);

    if (catalogPage !== null) {
      if (overwrite) {
        catalogPage.innerHTML = "";
      }
      paginatedData.forEach((item) => {
        catalogPage.append(item);
      });
      favoriteRemove();
      favoriteAdd("popular__item-favorite");
    }
  }

  // Создает кнопки пагинации.
  function pagination() {
    const paginationList = document.querySelector(".pagination-list");
    const pagesCount = Math.ceil(cardsArr.length / cardsPerPage);
    const pagesBeforeDots = 5;
    const btnMore = document.querySelector(".more-mobile");
    const prevBtn = document.createElement("button");
    const nextBtn = document.createElement("button");
    const prevImg = document.createElement("img");
    const nextImg = document.createElement("img");
    prevImg.setAttribute("src", "img/left.svg");
    nextImg.setAttribute("src", "img/right.svg");
    prevBtn.append(prevImg);
    nextBtn.append(nextImg);
    prevBtn.classList.add("pagination__item-prev");
    nextBtn.classList.add("pagination__item-next");
    const dotEl = document.createElement("span");
    dotEl.classList.add("pagination__item-dots");
    dotEl.textContent = "...";
    const dotElCopy = dotEl.cloneNode(true);

    function paginationInit() {
      if (paginationList !== null) {
        paginationList.innerHTML = "";
        if (currentPage < pagesBeforeDots - 1) {
          for (let i = 0; i < pagesBeforeDots; i++) {
            createPageBtn(i);
          }
          paginationList.append(dotEl);
          createPageBtn(pagesCount - 1);
        } else if (
          currentPage >= pagesBeforeDots - 1 &&
          currentPage < pagesCount - 4
        ) {
          createPageBtn(0);
          paginationList.append(dotEl);
          for (let i = currentPage - 1; i <= currentPage + 1; i++) {
            createPageBtn(i);
          }
          paginationList.append(dotElCopy);
          createPageBtn(pagesCount - 1);
        } else if (currentPage >= pagesCount - 4) {
          createPageBtn(0);
          paginationList.append(dotEl);
          for (let i = pagesCount - pagesBeforeDots; i <= pagesCount - 1; i++) {
            createPageBtn(i);
          }
        }

        paginationList.insertBefore(prevBtn, paginationList.firstChild);
        paginationList.append(nextBtn);

        prevBtn.removeEventListener("click", prevWrapper);
        nextBtn.removeEventListener("click", nextWrapper);

        prevBtn.addEventListener("click", prevWrapper);
        nextBtn.addEventListener("click", nextWrapper);

        // Скрываем prev/next
        if (currentPage == 0) {
          prevBtn.setAttribute("disabled", "");
          prevBtn.classList.add("btn-disabled");
          nextBtn.removeAttribute("disabled");
          nextBtn.classList.remove("btn-disabled");
        } else if (currentPage == pagesCount - 1) {
          nextBtn.setAttribute("disabled", "");
          nextBtn.classList.add("btn-disabled");
          prevBtn.removeAttribute("disabled");
          prevBtn.classList.remove("btn-disabled");
        } else {
          prevBtn.removeAttribute("disabled");
          prevBtn.classList.remove("btn-disabled");
          nextBtn.removeAttribute("disabled");
          nextBtn.classList.remove("btn-disabled");
        }

        if (currentPage === pagesCount - 1) {
          btnMore.setAttribute("disabled", "");
          btnMore.classList.add("more-mobile--disabled");
        } else {
          btnMore.removeAttribute("disabled");
          btnMore.classList.remove("more-mobile--disabled");
        }
      }
    }
    paginationInit();

    function showMoreBtnMobile() {
      if (btnMore) {
        btnMore.removeEventListener("click", showMoreBtnClick);
        btnMore.addEventListener("click", showMoreBtnClick);
      }

      function showMoreBtnClick(e) {
        e.preventDefault();
        currentPage++;
        catalogRender(cardsArr, cardsPerPage, currentPage, false);
        paginationInit();
      }
    }

    showMoreBtnMobile();

    function createPageBtn(i) {
      const liEl = document.createElement("li");
      liEl.classList.add("pagination-list__item");
      const aEl = document.createElement("a");
      aEl.setAttribute("href", "#");
      aEl.innerText = i + 1;
      liEl.append(aEl);
      if (currentPage === i) {
        liEl.classList.add("pagination-list__item--active");
      }

      liEl.addEventListener("click", (e) => pageClick(e, i));
      paginationList.append(liEl);
    }

    function pageClick(e, i) {
      currentPage = i;
      e.preventDefault();
      catalogRender(cardsArr, cardsPerPage, currentPage);
      paginationInit();
    }

    function prevWrapper() {
      prevNextBtns("-");
    }

    function nextWrapper() {
      prevNextBtns("+");
    }

    function prevNextBtns(x) {
      if (x == "-") {
        currentPage -= 1;
      } else if (x == "+") {
        currentPage += 1;
      }
      catalogRender(cardsArr, cardsPerPage, currentPage);
      const elems = document.querySelectorAll(".pagination-list__item");
      elems.forEach((el) => {
        el.classList.remove("pagination-list__item--active");
        if (+el.children[0].innerHTML - 1 === currentPage) {
          el.classList.add("pagination-list__item--active");
        }
      });

      paginationInit();
    }
  }

  class CatalogCard {
    constructor(img, title, price, ...classes) {
      this.img = img;
      this.title = title;
      this.price = price;
      this.classes = classes;
    }

    priceFormat(p) {
      const format = wNumb({ thousand: " " });
      return format.to(p);
    }

    render() {
      const card = document.createElement("div");

      card.classList.add("popular__item-wrapper");
      this.classes.forEach((item) => {
        if (item !== undefined) {
          card.classList.add(item);
        }
      });

      card.innerHTML = `
                  <button class="popular__item-favorite"></button>
                  <button class="popular__item-basket"></button>
                  <a class="popular__item-notify-link"
                    ><span>Сообщить о поступлении</span></a
                  >
                  <a class="popular__item" href="product.html">
                    <p class="popular__item-hover-text">посмотреть товар</p>
                    <img
                      class="popular__item-img"
                      src="${this.img}"
                      alt="hidro"
                    />
                    <h4 class="popular__item-title">
                      ${this.title}
                    </h4>
                    <p class="popular__item-price">${this.priceFormat(
                      this.price
                    )} ₴</p>
                    <p class="popular__item-notify-text">нет в наличии</p>
                  </a>`;

      if (card.classList.contains("popular__item-not-available")) {
        notAvailableArr.push(card);
      } else {
        inStockArr.push(card);
      }
    }
  }

  getResource(`${SERVER_URL}/catalog-cards`).then(
    (data) => {
      data.forEach(({ img, title, price, classes }) => {
        new CatalogCard(img, title, price, classes).render();
      });
      concatArr();
      catalogRender(cardsArr, cardsPerPage, currentPage);
      pagination();
      catalogGroup();
      favoriteAdd("popular__item-favorite");
    }
  );
}

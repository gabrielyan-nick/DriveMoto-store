// Для добавления звездного рейтинга на страницу необходимо добавить в верстку елемент-обертку "div",
// в него поместить елемент "button" с классом "star-box", в котором должен находиться один "svg"
// елемент звезды. Находящемуся внутри "svg" елементу "path" добавить класс "star-path".
// Кол-во звезд задается добавлением к елементу-обертке атрибута data-max="", оценка задается атрибутом
// data-rate=""
// Инициализируется вызовом функции starRate('.your_class')

/*
 <div class="your_class" data-max="5" data-rate="4">
    <button class="star-box">
      <svg width="23" height="21" viewBox="0 0 23 21" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path class="star-path"
          d="M11.5375 0L14.1278 7.9463H22.5103L15.7287 12.8574L18.3191 20.8037L11.5375 15.8926L4.75593 20.8037L7.34626 12.8574L0.564686 7.9463H8.94717L11.5375 0Z"
          fill="#C4C4C4"/>
      </svg>
    /button>
  </div>
*/

export default function starRate(selector) {
  const rateBox = document.querySelector(selector);
  if (rateBox !== null) {
    const starBox = rateBox.querySelector(".star-box");
    const maxStar = +rateBox.getAttribute("data-max");
    const rateStar = +rateBox.getAttribute("data-rate");
    const starElemPaths = document.getElementsByClassName("star-path");
    const normalColor = "#C4C4C4";
    const fullColor = "#1C62CD";
    const rateColor = "gold";

    function initStar() {
      const starBoxCopy = document.createElement("button");
      const starElemPath = rateBox.querySelector(".star-path");

      starBoxCopy.innerHTML = starBox.innerHTML;
      starBoxCopy.classList.add("star-box");
      starElemPath.setAttribute("fill", `${fullColor}`);

      for (let i = 0; i < maxStar - 1; i++) {
        const star = document.createElement("button");
        star.classList.add("star-box");

        if (i + 1 < rateStar) {
          star.innerHTML = starBox.innerHTML;
        } else {
          star.innerHTML = starBoxCopy.innerHTML;
        }
        rateBox.appendChild(star);
      }
    }
    initStar();

    function starListener() {
      const starBoxes = rateBox.querySelectorAll(".star-box");
      starBoxes.forEach((item) => {
        item.addEventListener("mouseover", StarRateMove);
        item.addEventListener("click", StarRateClick);
      });
      rateBox.addEventListener("mouseout", backToDefault);
    }
    starListener();

    function StarRateMove() {
      fillStar.call(this, fullColor);
    }

    function StarRateClick() {
      const starBoxes = rateBox.querySelectorAll(".star-box");
      let rate = [...this.parentElement.children].indexOf(this);
      console.log(rate + 1);
      fillStar.call(this, rateColor, true);
      rateBox.removeEventListener("mouseout", backToDefault);
      starBoxes.forEach((box) => {
        box.removeEventListener("mouseover", StarRateMove);
        box.setAttribute("disabled", "");
      });
      voteMessageAndRecover();
    }

    function fillStar(color, stroke = false) {
      const pathArr = Array.from(starElemPaths);
      let index = [...this.parentElement.children].indexOf(this);
      clearStar();
      pathArr.forEach((path, i) => {
        if (i <= index) {
          path.style.fill = color;
          if (stroke) {
            path.style.strokeWidth = "2px";
            path.style.stroke = fullColor;
          }
        }
      });
    }

    function voteMessageAndRecover() {
      const starBoxes = rateBox.querySelectorAll(".star-box");
      const message = document.createElement("p");
      message.classList.add("vote-message", "flipInX");
      message.textContent = "Спасибо за ваш голос";
      rateBox.appendChild(message);
      setTimeout(function () {
        message.classList.remove("flipInX");
        message.classList.add("flipOutX");
        setTimeout(() => message.remove(), 900);
        setTimeout(() => {
          backToDefault();
          starBoxes.forEach((item) => {
            item.addEventListener("mouseover", StarRateMove);
            item.removeEventListener("click", StarRateClick);
            item.removeAttribute("disabled");
          });
          rateBox.addEventListener("mouseout", backToDefault);
        }, 1000);
      }, 5000);
    }

    function backToDefault() {
      const pathArr = Array.from(starElemPaths);
      pathArr.forEach((item, i) => {
        if (i < rateStar) {
          item.style.fill = fullColor;
        } else {
          item.style.fill = normalColor;
        }
        item.style.strokeWidth = 0;
        item.style.stroke = "none";
      });
    }

    function clearStar() {
      for (let path of starElemPaths) {
        path.style.fill = `${normalColor}`;
      }
    }
  }
}

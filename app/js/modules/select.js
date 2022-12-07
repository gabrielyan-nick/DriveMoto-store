export default function select() {
  const box = document.querySelectorAll(".select__box");

  box.forEach((wrapper) => {
    const btn = wrapper.querySelector(".select__button");
    const list = wrapper.querySelector(".select__list");
    const listItems = list.querySelectorAll(".select__list-item");
    const input = wrapper.querySelector(".select__input-hidden");
    const startValue = btn.innerText;
    const resetBtns = document.querySelectorAll('[type="reset"]');

    btn.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      list.classList.toggle("select__list--visible");
      btn.classList.toggle("select__button--rotate");
      document.addEventListener("click", closeSelectClick, {once: true});
      document.addEventListener("keydown", closeSelectKeydown, {once: true});
    });

    listItems.forEach((item) => {
      item.addEventListener("click", function (e) {
        e.stopPropagation();
        btn.innerText = this.innerText;
        input.value = this.dataset.value;
        btn.focus();
        closeSelect();
      });
    });

    resetBtns.forEach((item) => {
      item.addEventListener("click", function () {
        if (item.closest("form") == btn.closest("form")) {
          btn.innerText = startValue;
        }
      });
    });

    function closeSelectClick(e) {
      if (e.target !== btn) {
        closeSelect();
      }
    }

    function closeSelectKeydown(e) {
      if (e.key == "Escape" || e.key == "Tab") {
        closeSelect();
      }
    }

    function closeSelect() {
      list.classList.remove("select__list--visible");
      btn.classList.remove("select__button--rotate");
    }
  });
}

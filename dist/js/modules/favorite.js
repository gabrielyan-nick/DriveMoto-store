export function favoriteAdd(selector) {
  const favElem = document.getElementsByClassName(selector);
  for (let el of favElem) {
    el.addEventListener("click", toggle);
  }
}

export function favoriteRemove() {
  const favElem = document.getElementsByClassName("popular__item-favorite");
  for (let el of favElem) {
    el.removeEventListener("click", toggle);
  }
}

function toggle() {
  this.classList.toggle("popular__item-favorite--active");
}

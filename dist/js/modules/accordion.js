export default function accordion({
  triggerSelector,
  destroyTrigger = false,
  activeClass = null,
  hideBtnSelector = null,
}) {
  const triggers = document.querySelectorAll(triggerSelector);
  const hideBtn = document.querySelector(hideBtnSelector);

  triggers.forEach((item) => {
    const content = item.nextElementSibling;
    const paddingTop = +window
      .getComputedStyle(content)
      .paddingTop.replace(/\D/g, "");

    item.addEventListener("click", function (e) {
      if (activeClass != null) {
        this.classList.toggle(activeClass);
      }
      if (
        content.style.height == "0px" ||
        window.getComputedStyle(content).height == "0px"
      ) {
        content.style.opacity = 1;
        content.style.paddingTop = `${paddingTop}px`;
        content.style.height = content.scrollHeight + "px";
        if (hideBtn != null) {
          hideBtn.classList.remove("hide");
        }
      } else {
        content.style.opacity = 0;
        content.style.height = "0px";
        content.style.paddingTop = "0px";
      }
      if (destroyTrigger) {
        this.style.display = "none";
      }
    });

    if (hideBtn != null) {
      hideBtn.addEventListener("click", function () {
        this.classList.add("hide");
        triggers.forEach((item) => {
          if (item.parentElement == this.parentElement) {
            item.style.display = "block";
            content.style.opacity = 0;
            content.style.height = "0px";
            content.style.paddingTop = "0px";
          }
        });
      });
    }
  });
}

export default function searchForm() {
  const inStockCb = document.querySelectorAll(".aside-filter__form-param .required-cb");
  const inStockCbForm2 = document.querySelectorAll(".aside-filter__form-mark .required-cb");
  const newRadio = document.querySelectorAll(".aside-filter__form-param .required-r");
  const btn = document.querySelector(".aside__form-submit");
  const btnForm2 = document.querySelector(".aside-filter__form-mark .aside__form-submit");
  const resetBtn = document.querySelector(".aside__form-reset");
  const resetBtnForm2 = document.querySelector(".aside-filter__form-mark .aside__form-reset");
  const formWrapper = document.querySelector('.catalog__aside-content'); 

  if (formWrapper !== null) {
  formWrapper.addEventListener("click", () => {
    // Для первой формы (поиск по параметрам)
    let cbChecked = false;
    inStockCb.forEach(cb => {
      if (cb.checked) {
        cbChecked = true;
      }
    });

    let radioChecked = false;
    newRadio.forEach(r => {
      if (r.checked) {
        radioChecked = true;
      }
    });

    if (cbChecked && radioChecked) {
      btn.disabled = false;
      btn.classList.add('aside__form-submit--active');
    } else {
      btn.disabled = true;
      btn.classList.remove('aside__form-submit--active');
    }

    resetBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      btn.disabled = true;
      btn.classList.remove('aside__form-submit--active');
    });

     // Для второй формы (поиск по марке)
    let cbCheckedForm2 = false;
    inStockCbForm2.forEach(item => {
      if (item.checked) {
        cbCheckedForm2 = true;
      }
    });

    if (cbCheckedForm2) {
      btnForm2.disabled = false;
      btnForm2.classList.add('aside__form-submit--active');
    } else {
      btnForm2.disabled = true;
      btnForm2.classList.remove('aside__form-submit--active');
    }
  });
  
  resetBtnForm2.addEventListener("click", (e) => {
    e.stopPropagation();
    btnForm2.disabled = true;
    btnForm2.classList.remove('aside__form-submit--active');
  });
}
}

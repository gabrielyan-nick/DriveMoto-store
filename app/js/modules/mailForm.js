import { SERVER_URL } from "../const.js";

export default function mailForm(formSelector, inputSelector) {
  const form = document.querySelectorAll(formSelector);
  const input = document.querySelectorAll(inputSelector);

  const postData = async (url, data) => {
    let res = await fetch(url, {
      method: "POST",
      body: data,
      headers: { "Content-type": "application/json" },
    });
    return await res.json();
  };

  function clearInputs() {
    input.forEach((item) => {
      item.value = "";
    });
  }

  form.forEach((item) => {
    item.addEventListener("submit", (event) => {
      event.preventDefault();
      event.stopPropagation();

      const formData = new FormData(item);

      const json = JSON.stringify(Object.fromEntries(formData.entries()));

      postData(`${SERVER_URL}/requests`, json)
        .then((res) => {
          console.log(res);
        })
        .catch((res) => {
          console.log(res);
        })
        .finally(clearInputs());
    });
  });
}

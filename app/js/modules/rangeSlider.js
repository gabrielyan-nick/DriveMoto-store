export default function rangeSlider() {
  const rangeSlider = document.querySelector(".aside__range-slider");
  const inputLow = document.querySelector(".range-slider__price-low");
  const inputHigh = document.querySelector(".range-slider__price-high");
  const inputs = [inputLow, inputHigh];

  if (rangeSlider !== null) {
    noUiSlider.create(rangeSlider, {
      start: [100000, 1500000],
      connect: true,
      step: 10000,
      range: {
        min: 0,
        max: 1500000,
      },
      format: wNumb({
        decimals: 0,
        thousand: " ",
      }),
    });

    rangeSlider.noUiSlider.on("update", function (values, handle) {
      inputs[handle].value = values[handle];
      inputs.forEach(function (input, handle) {
        input.addEventListener("change", function () {
          rangeSlider.noUiSlider.setHandle(handle, this.value);
        });
      });
    });
  }
}

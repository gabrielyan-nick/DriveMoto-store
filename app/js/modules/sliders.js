export default function sliders() {
  const sliders = Array.from(document.querySelectorAll(".popular__slider"));
  const bannerSlider = document.querySelector(".banner-slider__glide");
  
  if (bannerSlider != null) {
    new Glide(bannerSlider, {
      perView: 1,
    }).mount();
  }

  if (sliders !== null) {
    sliders.forEach((item) => {
      const popularSlider = new Glide(item, {
        type: "carousel",
        perView: 4,
        gap: 26,
        breakpoints: {
          1300: {
            gap: 16,
          },
          1120: {
            perView: 3,
            gap: 26,
          },
          800: {
            perView: 2,
            gap: 26,
          },
          550: {
            perView: 1,
          }
        }
      });
      popularSlider.mount();
    });
  }
}

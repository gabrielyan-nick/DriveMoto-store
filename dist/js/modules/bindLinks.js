export default function bindLinks() {
  const catalogLinks = [
    document.querySelectorAll(".menu-categories a"),
    document.querySelectorAll(".banner-section a"),
    document.querySelectorAll(".categories a"),
  ];

  catalogLinks.forEach((item) => {
    item.forEach((i) => {
      i.setAttribute("href", "catalog.html");
    });
  });
}

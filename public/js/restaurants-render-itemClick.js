const section1ItemContainer = document.querySelectorAll(
  ".section1-item-container"
);

section1ItemContainer.forEach(function (itemContainer) {
  itemContainer.addEventListener("click", function (e) {
    let item;
    if (e.target.classList.value === "Woym-img") {
      item = e.target.nextElementSibling.innerHTML;
    } else {
      item = e.target.innerHTML;
    }
    let location =
      window.location.href.split("/")[
        window.location.href.split("/").length - 1
      ];
    location = location[0].toUpperCase() + location.slice(1);
    window.location.href = `/collections/${location}/${item}`;
  });
});

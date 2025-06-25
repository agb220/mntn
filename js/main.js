"use strick";

//add header component

document.addEventListener("DOMContentLoaded", () => {
  fetch("/components/header.html")
    .then((res) => res.text())
    .then((data) => {
      document.getElementById("header").innerHTML = data;
    });
});

//add footer component

document.addEventListener("DOMContentLoaded", () => {
  fetch("/components/footer.html")
    .then((res) => res.text())
    .then((data) => {
      document.getElementById("footer").innerHTML = data;
    });
});

// add icons SVG-спрайт

fetch("icons/icons-sprite.svg")
  .then((res) => res.text())
  .then((data) => {
    const div = document.createElement("div");
    div.style.display = "none";
    div.innerHTML = data;
    document.body.prepend(div);
  });

// open menu-burger

document.addEventListener("click", documentActions);

function documentActions(e) {
  const targetElement = e.target;

  if (targetElement.closest(".icon-menu")) {
    document.body.classList.toggle("menu-open");
  }
}

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

// HERO PARALLAX //

window.onload = function () {
  const parallax = document.querySelector(".hero");

  if (parallax) {
    const content = document.querySelector(".hero__container");
    const clouds = document.querySelector(".images-parallax__clouds");
    const mountains = document.querySelector(".images-parallax__mountains");
    const man = document.querySelector(".images-parallax__man");

    const forClouds = 40;
    const forMountains = 20;
    const forMan = 10;

    //Sped animation
    const speed = 0.05;

    let positionX = 0,
      positionY = 0;
    let coordXprocent = 0,
      coordYprocent = 0;

    function setMouseParallaxStyle() {
      const distX = coordXprocent - positionX;
      const distY = coordYprocent - positionY;

      positionX = positionX + distX * speed;
      positionY = positionY + distY * speed;

      // transferring styles
      clouds.style.cssText = `transform: translate(${positionX / forClouds}%,${
        positionY / forClouds
      }%)`;
      mountains.style.cssText = `transform: translate(${
        positionX / forMountains
      }%,${positionY / forMountains}%)`;
      man.style.cssText = `transform: translate(${positionX / forMan}%,${
        positionY / forMan
      }%)`;

      requestAnimationFrame(setMouseParallaxStyle);
    }
    setMouseParallaxStyle();

    parallax.addEventListener("mousemove", function (e) {
      // getting the height and width of the block
      const parallaxWidth = parallax.offsetWidth;
      const parallaxHeight = parallax.offsetHeight;

      // centered zero
      const coordX = e.pageX - parallaxWidth / 2;
      const coordY = e.pageY - parallaxHeight / 2;

      // getting procent
      coordXprocent = (coordX / parallaxWidth) * 100;
      coordYprocent = (coordY / parallaxHeight) * 100;
    });

    // parallax on scrolling

    let thersholdSets = [];
    for (let i = 0; i <= 1.0; i += 0.005) {
      thersholdSets.push(i);
    }

    const callBack = function (entries, observer) {
      const scrollTopProcent =
        (window.pageYOffset / parallax.offsetHeight) * 100;
      setParallaxItemStyle(scrollTopProcent);
    };

    const observer = new IntersectionObserver(callBack, {
      threshold: thersholdSets,
    });

    observer.observe(document.querySelector(".content"));

    function setParallaxItemStyle(scrollTopProcent) {
      content.style.cssText = `transform: translate(0%,-${
        scrollTopProcent / 9
      }%);`;
      mountains.parentElement.style.cssText = `transform: translate(0%, -${
        scrollTopProcent / 6
      }%)`;
      man.parentElement.style.cssText = `transform: translate(0%, -${
        scrollTopProcent / 3
      }%)`;
    }
  }
};

document.querySelectorAll(
  "div.body"
)[0].style.backgroundImage = `linear-gradient(rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.2)),url("../images/background/${Math.floor(
  Math.random() * 5
)}.webp")`;

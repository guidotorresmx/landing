import anime from "animejs/lib/anime.es.js";
import { Howl, Howler } from "howler";

const wrapper = document.getElementById("tiles");

let toggled = false;

const getGridSize = () => {
  let columns = Math.floor(document.body.clientWidth / 50);
  let rows = Math.floor(document.body.clientHeight / 50);
  return [columns, rows];
};

const handleOnClick = (index) => {
  toggled = !toggled;
  let [columns, rows] = getGridSize();
  anime({
    targets: ".tile",
    opacity: toggled ? 0 : 0.95,
    scale: [
      { value: 0.1, easing: "easeOutSine", duration: 50 },
      { value: 1, easing: "easeInOutQuad", duration: 75 },
    ],
    delay: anime.stagger(50, {
      grid: [columns, rows],
      from: index,
    }),
  });
};

var sound = new Howl({
  src: ["./public/sound.wav"],
});
Howler.volume(0.2);
const handleOnHover = (index) => {
  sound.play();
};

const createTile = (index) => {
  let [columns, rows] = getGridSize();
  const tile = document.createElement("div");
  tile.classList.add("tile");
  tile.classList.add(`column-${index % columns}`);
  tile.classList.add(`row-${Math.floor(index / columns)}`);
  tile.onmouseenter = (e) => handleOnHover(index);
  tile.onclick = (e) => handleOnClick(index);
  return tile;
};

const createTiles = (quantity) => {
  Array.from(Array(quantity)).map((tile, index) => {
    wrapper.appendChild(createTile(index));
  });
};

const createGrid = () => {
  wrapper.innerHTML = "";
  let [columns, rows] = getGridSize();
  wrapper.style.setProperty("--columns", columns);
  wrapper.style.setProperty("--rows", rows);
  createTiles(columns * rows);
};

const handleOnLoad = () => {
  let [columns, rows] = getGridSize();
  anime({
    targets: ".tile",
    scale: [
      { value: 0.1, easing: "easeOutSine", duration: 50 },
      { value: 1, easing: "easeInOutQuad", duration: 75 },
    ],
    delay: anime.stagger(50, {
      grid: [columns, rows],
      from: "last",
    }),
  });
};

createGrid();
window.onresize = () => createGrid();
window.onload = () => handleOnLoad();

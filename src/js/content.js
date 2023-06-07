import anime from "animejs/lib/anime.es.js";
import { getGridSize } from "./utils/gridHandler";

const wrapper = document.getElementById("tiles");

const gridProps = {
  msSpeed: 50,
  pxSize: 50,
};

toggled = false;

const handleOnClick = (index) => {
  toggled = !toggled;
  let [columns, rows] = getGridSize(gridProps);
  anime({
    targets: ".tile",
    opacity: toggled ? 0 : 0.95,
    scale: [
      { value: 0.1, easing: "easeOutSine", duration: 50 },
      { value: 1, easing: "easeInOutQuad", duration: 75 },
    ],
    delay: anime.stagger(gridProps.msSpeed, {
      grid: [columns, rows],
      from: index,
    }),
  });
};

let sounds = [
  "./public/1.mp3",
  "./public/2.mp3",
  "./public/3.mp3",
  "./public/4.mp3",
  "./public/5.mp3",
  "./public/6.mp3",
  "./public/7.mp3",
];
let howls = {};
for (let i = 0; i < sounds.length; i++) {
  howls[i] = new Howl({
    src: [sounds[i]],
  });
}

Howler.volume(0.2);
const handleOnHover = (index) => {
  //howls[Math.floor(Math.random() * sounds.length)].play();
};

const createTile = (index) => {
  let [columns, rows] = getGridSize(gridProps);
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
  let [columns, rows] = getGridSize(gridProps);
  wrapper.style.setProperty("--columns", columns);
  wrapper.style.setProperty("--rows", rows);
  createTiles(columns * rows);
};

const handleOnLoad = () => {
  let [columns, rows] = getGridSize(gridProps);
  anime({
    targets: ".tile",
    scale: [
      { value: 0.1, easing: "easeOutSine", duration: 50 },
      { value: 1, easing: "easeInOutQuad", duration: 75 },
    ],
    delay: anime.stagger(gridProps.msSpeed, {
      grid: [columns, rows],
      from: "last",
    }),
  });
};

const cornerAnimation = () => {
  let [columns, rows] = getGridSize(gridProps);
  anime({
    targets: ".tile",
    translateX: anime.stagger(10, { grid: [14, 5], from: "center", axis: "x" }),
    translateY: anime.stagger(10, { grid: [14, 5], from: "center", axis: "y" }),
    rotateZ: anime.stagger([0, 90], {
      grid: [14, 5],
      from: "center",
      axis: "x",
    }),
    delay: anime.stagger(200, { grid: [14, 5], from: "center" }),
    easing: "easeInOutQuad",
  });
};

createGrid();
window.onresize = () => createGrid();
window.onload = () => handleOnLoad();

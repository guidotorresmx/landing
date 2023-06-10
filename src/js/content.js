import anime from "animejs/lib/anime.es.js";
import { getGridSize, createGrid, updateGrid } from "./utils/gridHandler";

const gridProps = {
  msSpeed: 50,
  pxSize: 50,
  toggled: false,
};

const handleOnClick = (index) => {
  gridProps.toggled = !gridProps.toggled;
  let [columns, rows] = getGridSize(gridProps);
  anime({
    targets: ".tile",
    opacity: gridProps.toggled ? 0 : 0.95,
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
      axis: last - columns + 1 || columns,
    }),
    delay: anime.stagger(200, { grid: [14, 5], from: "center" }),
    easing: "easeInOutQuad",
  });
};

updateGrid(gridProps, handleOnClick);
window.onresize = () => updateGrid(gridProps, handleOnClick);
window.onload = () => handleOnLoad();

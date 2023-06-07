const wrapper = document.getElementById("tiles");

function createTile(gridProps, index) {
  let [columns, rows] = getGridSize(gridProps);
  const tile = document.createElement("div");
  tile.classList.add("tile");
  tile.classList.add(`column-${index % columns}`);
  tile.classList.add(`row-${Math.floor(index / columns)}`);
  tile.id = index;
  return tile;
}

function createTiles(gridProps, quantity) {
  Array.from(Array(quantity)).map((tile, index) => {
    wrapper.appendChild(createTile(gridProps, index));
  });
}

export function getGridSize(gridProps) {
  let columns = Math.floor(document.body.clientWidth / gridProps.pxSize);
  let rows = Math.floor(document.body.clientHeight / gridProps.pxSize);
  return [columns, rows];
}

export function createGrid(gridProps) {
  wrapper.innerHTML = "";
  let [columns, rows] = getGridSize(gridProps);
  wrapper.style.setProperty("--columns", columns);
  wrapper.style.setProperty("--rows", rows);
  createTiles(gridProps, columns * rows);
}

export default { getGridSize, createGrid };

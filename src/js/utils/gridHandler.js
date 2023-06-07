export function getGridSize(gridProps) {
  let columns = Math.floor(document.body.clientWidth / gridProps.pxSize);
  let rows = Math.floor(document.body.clientHeight / gridProps.pxSize);
  return [columns, rows];
}
export function createGrid() {
  console.log("bar");
}

export default { getGridSize, createGrid };

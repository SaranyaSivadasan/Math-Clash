let colSize = 6;
let rowSize = 6;

const initBoard = () => {
  let board = document.getElementById("board");
  for (let i = 0; i < rowSize; i++) {
    let rowEl = document.createElement("div");
    rowEl.className = "row";
    for (let j = 0; j < colSize; j++) {
      let cellEl = document.createElement("div");
      cellEl.setAttribute("id", i.toString() + j.toString());
      cellEl.className = "cell";
      rowEl.appendChild(cellEl);
    }
    board.appendChild(rowEl);
  }
};
initBoard();

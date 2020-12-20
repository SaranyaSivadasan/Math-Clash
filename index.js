let rowSize = 6;
let columnSize = 6;
let elementsInserted = [];
let sum = 0;
let gameEnd = false;
let score = 0;

const setTarget = () => {
  let target = 10 + Math.ceil(Math.random() * 20);
  document.getElementById("target-box").innerHTML = `${target}`;
  return target;
};

let targetValue = setTarget();

const scoreUpdate = (value) => {
  score += value;
  document.getElementById("score-box").innerHTML = `SCORE :${score}`;
};

const makeGrids = () => {
  let element = document.getElementById("grid-box");
  console.log(element);

  let grids = document.createElement("div");
  grids.setAttribute("id", "grids");
  grids.className = "column center";

  for (let i = 0; i < rowSize; i++) {
    let rowList = document.createElement("div");
    rowList.className = "row";

    for (let j = 0; j < columnSize; j++) {
      let box = document.createElement("div");
      box.className = "box center";
      box.setAttribute("id", getId(i, j));
      box.addEventListener("click", () => boxOnClick(i, j));
      rowList.appendChild(box);
    }

    grids.appendChild(rowList);
  }

  element.appendChild(grids);
  return;
};

const shiftElements = (i, j) => {
  for (let k = i; k < elementsInserted.length; k++) {
    if (elementsInserted[k][j].value !== "") {
      let objValue = elementsInserted[k][j].value;
      let flag = elementsInserted[k][j].selected;

      elementsInserted[k][j].value = "";
      elementsInserted[k][j].selected = false;

      elementsInserted[i - 1][j].value = objValue;
      elementsInserted[i - 1][j].selected = flag;

      return;
    }
  }
};

const elementShiftUp = (i, j) => {
  for (let i = 0; i < elementsInserted.length; i++) {
    for (let j = 0; j < columnSize; j++) {
      if (
        elementsInserted[i][j].value === "" &&
        i < elementsInserted.length - 1
      ) {
        shiftElements(i + 1, j);
      }
    }
  }
};

const deselectAllSelected = () => {
  for (let i = 0; i < elementsInserted.length; i++) {
    for (let j = 0; j < columnSize; j++) {
      //let box = document.getElementById(getId(i,j));
      elementsInserted[i][j].selected = false;
      // if(box.classList.contains("selected")){

      //   box.classList.remove("selected");

      // }
    }
  }
  sumBoxUpdater(0);
  sum = 0;
  return;
};

const removeAllSelected = () => {
  let count = 0;
  for (let i = 0; i < elementsInserted.length; i++) {
    for (let j = 0; j < columnSize; j++) {
      if (elementsInserted[i][j].selected) {
        elementsInserted[i][j].value = "";
        elementsInserted[i][j].selected = false;
        count++;
      }
    }
  }
  sumBoxUpdater(0);
  sum = 0;

  targetValue = setTarget();

  return count;
};

const romoveELementFromGrid = () => {
  let i = elementsInserted.length - 1;
  let check = true;
  for (let j = 0; j < columnSize; j++) {
    if (elementsInserted[i][j].value !== "") {
      check = false;
    }
  }

  if (check) {
    elementsInserted.pop();
  }

  return;
};

const boxOnClick = (i, j) => {
  if (elementsInserted[i][j].value === "" || gameEnd === true) {
    return;
  }

  elementsInserted[i][j].selected = !elementsInserted[i][j].selected;

  if (elementsInserted[i][j].selected) {
    sum += parseInt(elementsInserted[i][j].value);
  } else {
    sum -= parseInt(elementsInserted[i][j].value);
  }
  sumBoxUpdater(sum);

  if (sum > targetValue) {
    deselectAllSelected();
  } else if (sum === targetValue) {
    let count = removeAllSelected();
    scoreUpdate(count);
  }

  displayNewElements();

  setTimeout(displayNewElements(), 500);
};

const makeEntriesOfGrides = () => {
  if (elementsInserted.length >= rowSize) {
    return;
  }
  let arr = [];
  for (let i = 0; i < columnSize; i++) {
    let obj = {};
    obj.value = `${Math.ceil(Math.random() * 9)}`;
    obj.selected = false;

    arr.push(obj);
  }

  elementsInserted.unshift(arr);

  console.log(elementsInserted);
  return;
};

const getId = (i, j) => {
  return i.toString() + j.toString();
};

const displayNewElements = () => {
  if (gameEnd) {
    return;
  }

  for (let i = 0; i < elementsInserted.length; i++) {
    for (let j = 0; j < columnSize; j++) {
      let box = document.getElementById(getId(i, j));
      //  if(elementsInserted === null){
      //    box.innerHTML = "";
      //  }
      //  else {
      // box.innerHTML = "";
      box.innerHTML = elementsInserted[i][j].value;
      //}

      if (elementsInserted[i][j].selected === true) {
        box.classList.add("selected");
      } else if (box.classList.contains("selected")) {
        box.classList.remove("selected");
      }
    }
  }

  elementShiftUp();
  romoveELementFromGrid();
};

const gameScreenRemove = () => {
  document.getElementById("display-body").classList.add("background-color");
  document.getElementById("game-screen").className = "diplay-remove";
  document.getElementById("popUp").classList.remove("diplay-remove");
};

const endGame = (timer) => {
  if (elementsInserted.length >= rowSize) {
    console.log("clearTimeout triggered");
    clearInterval(timer);
    setTimeout(() => {
      for (let i = 0; i < elementsInserted.length; i++) {
        for (let j = 0; j < columnSize; j++) {
          let box = document.getElementById(getId(i, j));
          elementsInserted[i][j].selected = false;
          if (box.classList.contains("selected")) {
            box.classList.remove("selected");
          }
        }
      }
      //if(!elementsInserted.length < rowSize){
      gameEnd = true;
      document.getElementById("popUp-text").innerHTML = `YOUR SCORE: ${score}`;
      gameScreenRemove();
      //alert(`game over \n your score is ${score}`);
      //}
      return;
    }, 500);
  }

  return;
};

const sumBoxUpdater = (sum) => {
  let el = document.getElementById("sum-box");
  el.innerHTML = `${sum}`;
};

makeGrids();

const startGame = () => {
  const timer = setInterval(() => {
    makeEntriesOfGrides();
    endGame(timer);
    displayNewElements();
    //endGame(timer);
  }, 5000);
};

startGame();

const restartGame = () => {
  elementsInserted = [];
  for (let i = 0; i < rowSize; i++) {
    for (let j = 0; j < columnSize; j++) {
      document.getElementById(getId(i, j)).innerHTML = "";
    }
  }

  startGame();
};

const restartButton = () => {
  gameEnd = false;
  score = 0;
  scoreUpdate(0);

  document.getElementById("popUp-text").innerHTML = "";
  document.getElementById("display-body").classList.remove("background-color");
  document.getElementById("game-screen").classList.remove("diplay-remove");
  document.getElementById("popUp").classList.add("diplay-remove");

  restartGame();
};

let button = document.getElementById("restart-button");
button.addEventListener("click", () => restartButton());

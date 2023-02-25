const gameBoardContainer = document.querySelector('.gameboard');
const startBtn = document.querySelector('.start');
const resetBtn = document.querySelector('.reset');
const addPlayer = document.querySelector('.add');
const modal = document.querySelector('.modal-contain');
const p1Avatar = document.querySelector('.player1');
const p2Avatar = document.querySelector('.player2');
const enterName = document.querySelector('label[for="Name"]');
let turn = 0;

/* create gameBoard array inside the gameBoard object */
const game = (function () {
  const gameBoard = [
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
  ];

  return {
    Gameboard: gameBoard,
  };
})();

/* create players factory function */
function Player(name, choice) {
  // private functions
  const getName = () => name;
  const getChoice = () => choice;

  // public functions
  const printName = () => getName();
  const printChoice = () => getChoice();
  return { printName, printChoice };
}

let p1 = Player('Bill', 'X');
let p2 = Player('Sam', 'O');

// function to loop over until 2 players have been created
// const createPlayers = () => {
//   const p1Name = document.getElementById('name').value;
//   const allRadioBtn = document.querySelectorAll('input[name="choice"]');
//   let p1Choice;
//   allRadioBtn.forEach((radio) => {
//     if (radio.checked) {
//       p1Choice = radio.value;
//     }
//   });
//   p1 = Player(p1Name, p1Choice);
//   const p1NamePara = document.createElement('p');
//   p1NamePara.innerText = p1.printName();
//   p1Avatar.appendChild(p1NamePara);
// };

// event listener that will add X to Array
function printChoice(i, j) {
  if (turn === 0) {
    game.Gameboard[i][j] = p1.printChoice();
    turn++;
  } else if (turn === 1) {
    game.Gameboard[i][j] = p2.printChoice();
    turn--;
  }
  gameBoardContainer.innerHTML = '';
  printGameBoard();
}

// clear the GameBoard array after the reset is pressed
function clearBoard() {
  for (let i = 0; i < game.Gameboard.length; i++) {
    for (let j = 0; j < game.Gameboard.length; j++) {
      game.Gameboard[i][j] = '';
      turn = 0;
    }
  }
}

// display the array content on webpage
function printGameBoard() {
  let count = 1;
  for (let i = 0; i < game.Gameboard.length; i++) {
    //accessing row and then columns
    for (let j = 0; j < game.Gameboard.length; j++) {
      const child = document.createElement('div');
      child.textContent = game.Gameboard[i][j];
      child.classList.add('child');
      child.classList.add(`child-${count}`);
      if (child.textContent.includes('X')) {
        child.style.color = 'var(--tic-clr)';
      } else if (child.textContent.includes('O')) {
        child.style.color = 'var(--tac-clr)';
      }
      child.addEventListener('click', () => {
        printChoice(i, j);
      });
      count++;
      gameBoardContainer.append(child);
    }
  }
}
printGameBoard();

// runs the create player
addPlayer.addEventListener('click', () => {
  modal.style.visibility = 'hidden';
  createPlayers();
});

startBtn.addEventListener('click', () => {
  modal.style.visibility = 'visible';
  printGameBoard();
});

resetBtn.addEventListener('click', () => {
  gameBoardContainer.innerHTML = '';
  clearBoard();
  printGameBoard();
});

const gameBoardContainer = document.querySelector('.gameboard');
const startBtn = document.querySelector('.start');
const resetBtn = document.querySelector('.reset');
const addPlayer = document.querySelector('.add');
const modal = document.querySelector('.modal-contain');
let p1;
let p2;

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
  const printName = () => `Nice to meet you ${getName()}`;
  const printChoice = () => `You chose ${getChoice()}`;
  return { printName, printChoice };
}

// function to loop over until 2 players have been created
const createPlayers = () => {
  const p1Name = document.getElementById('name').value;
  const allRadioBtn = document.querySelectorAll('input[name="choice"]');
  let p1Choice;
  allRadioBtn.forEach((radio) => {
    if (radio.checked) {
      p1Choice = radio.value;
    }
  });
  p1 = Player(p1Name, p1Choice);
};

// event listener that will add X to Array
function sayHello(i, j) {
  game.Gameboard[i][j] = 'X';
  gameBoardContainer.innerHTML = '';
  printGameBoard();
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
        sayHello(i, j);
      });
      count++;
      gameBoardContainer.append(child);
    }
  }
}
printGameBoard();

// runs the create player
addPlayer.addEventListener('click', () => {
  createPlayers();
  modal.style.visibility = 'hidden';
});

startBtn.addEventListener('click', () => {
  modal.style.visibility = 'visible';
});

// resetBtn.addEventListener('click', () => {
//   gameBoardContainer.innerHTML = '';
//   printGameBoard();
// });

const gameBoardContainer = document.querySelector('.gameboard');
const startBtn = document.querySelector('.start');
const resetBtn = document.querySelector('.reset');
let p1;
let p2;

/* create gameBoard array inside the gameBoard object */
const game = (function () {
  const gameBoard = [
    ['X', 'O', 'X'],
    ['O', 'X', 'O'],
    ['X', 'O', 'X'],
  ];

  return {
    Gameboard: gameBoard,
  };
})();

console.log(game.Gameboard);

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
  let playerCount = 1;
  while (playerCount <= 1) {
    let p1Name = prompt('Player 1 enter your name');
    let p1Choice = prompt('Choose X or O');
    p1 = Player(p1Name, p1Choice);
    if (p1Choice === 'X') {
      // what ever p1 one choses p2 will be left with the other option
      let p2Name = prompt('Player 2 enter your name');
      p2 = Player(p2Name, 'O');
    } else if (p1Choice === 'O') {
      let p2Name = prompt('Player 2 enter your name');
      p2 = Player(p2Name, 'X');
    }
    playerCount++;
  }
};
createPlayers();

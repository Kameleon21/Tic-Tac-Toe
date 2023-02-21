const gameBoardContainer = document.querySelector(".gameboard");

/* create gameBoard array inside the gameBoard object */

const game = (function () {
  let gameBoard = [
    ["X", "O", "X"],
    ["O", "X", "O"],
    ["X", "O", "X"],
  ];

  return {
    Gameboard: gameBoard,
  };
})();

/* create players factory function */

function Player(name, choice) {
  // private functions
  const _getName = () => name;
  const _getChoice = () => choice;

  // public functions 
  const printName = () => `Nice to meet you ${_getName()}`;
  const printChoice = () => `You chose ${_getChoice()}`;
  return {printName, printChoice };
}

const p1 = Player("Tom", "O");
const p2 = Player("Sally", "X");

console.log(p1.printName());
console.log(p1.printChoice());
console.log(p2.printName());
console.log(p2.printChoice());

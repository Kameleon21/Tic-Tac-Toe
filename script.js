const gameBoardContainer = document.querySelector('.gameboard');
const startBtn = document.querySelector('.start');
const resetBtn = document.querySelector('.reset');
const addPlayer = document.querySelector('.add');
const modal = document.querySelector('.modal-contain');
const p1Avatar = document.querySelector('.player1');
const p2Avatar = document.querySelector('.player2');
const enterName = document.querySelector('label[for="Name"]');
let turn = 0;
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
  const printName = () => getName();
  const printChoice = () => getChoice();
  return { printName, printChoice };
}

// create player 1 and assign values to the avatar card
function player1Choice(name, choice) {
  p1 = Player(name, choice);
  // create element
  const p1NamePara = document.createElement('p');
  const p1ChoiceDisplay = document.createElement('p');
  // assign value to it
  p1ChoiceDisplay.innerText = p1.printChoice();
  p1NamePara.innerText = p1.printName();
  // add class
  p1NamePara.classList.add('remove1');
  p1ChoiceDisplay.classList.add('remove1');
  // append to parent
  p1Avatar.appendChild(p1NamePara);
  p1Avatar.appendChild(p1ChoiceDisplay);
}

// create player and assign values to the avatar card
function player2Choice(choice) {
  let p2Name = document.getElementById('player2').value;
  if (choice.includes('X')) {
    p2 = Player(p2Name, 'O');
    // create element
    const p2ChoiceDisplay = document.createElement('p');
    const p2NamePara = document.createElement('p');
    // assign value to it
    p2NamePara.innerText = p2.printName();
    p2ChoiceDisplay.innerText = p2.printChoice();
    // add class
    p2NamePara.classList.add('remove2');
    p2ChoiceDisplay.classList.add('remove2');
    // append to parent
    p2Avatar.appendChild(p2NamePara);
    p2Avatar.appendChild(p2ChoiceDisplay);
  } else if (choice.includes('O')) {
    p2 = Player(p2Name, 'X');
    // create element
    const p2ChoiceDisplay = document.createElement('p');
    const p2NamePara = document.createElement('p');
    // assign value to it
    p2NamePara.innerText = p2.printName();
    p2ChoiceDisplay.innerText = p2.printChoice();
    // add class
    p2NamePara.classList.add('remove2');
    p2ChoiceDisplay.classList.add('remove2');
    // append to parent
    p2Avatar.appendChild(p2NamePara);
    p2Avatar.appendChild(p2ChoiceDisplay);
  }
}

// function to loop over until 2 players have been created
const createPlayers = () => {
  let p1Name = document.getElementById('name').value;
  const allRadioBtn = document.querySelectorAll('input[name="choice"]');
  let p1Choice;
  allRadioBtn.forEach((radio) => {
    if (radio.checked) {
      p1Choice = radio.value;
    }
  });
  player1Choice(p1Name, p1Choice);
  player2Choice(p1Choice);
  modal.style.visibility = 'hidden';
};

// event listener that will add X or O to Array
function printChoice(i, j) {
  if (turn === 0) {
    if (game.Gameboard[i][j].includes('X')) {
      game.Gameboard[i][j] = 'X';
    } else if (game.Gameboard[i][j].includes('O')) {
      game.Gameboard[i][j] = 'O';
    } else {
      game.Gameboard[i][j] = p1.printChoice();
      turn++;
    }
  } else if (turn === 1) {
    if (game.Gameboard[i][j].includes('X')) {
      game.Gameboard[i][j] = 'X';
    } else if (game.Gameboard[i][j].includes('O')) {
      game.Gameboard[i][j] = 'O';
    } else {
      game.Gameboard[i][j] = p2.printChoice();
      turn--;
    }
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

// function to prevent users from playing in already taken spots

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
      child.addEventListener('click', (e) => {
        printChoice(i, j);
      });
      count++;
      gameBoardContainer.append(child);
    }
  }
}

// clear modal results
function clearModal() {
  let p1Name = document.getElementById('name');
  const RadioBtn = (document.querySelector(
    'input[name="choice"]:checked'
  ).checked = false);
  let p2Name = document.getElementById('player2');
  p1Name.value = '';
  p2Name.value = '';
}

// clear player avatar and p1/p2 values
function clearPlayerAvatar() {
  const removeParas1 = document.querySelectorAll('.remove1');
  const removeParas2 = document.querySelectorAll('.remove2');
  removeParas1.forEach((para) => {
    p1Avatar.removeChild(para);
  });
  removeParas2.forEach((para) => {
    p2Avatar.removeChild(para);
  });
  p1 = undefined;
  p2 = undefined;
}

// runs the create player
addPlayer.addEventListener('click', () => {
  createPlayers();
});

startBtn.addEventListener('click', () => {
  modal.style.visibility = 'visible';
  printGameBoard();
});

resetBtn.addEventListener('click', () => {
  gameBoardContainer.innerHTML = '';
  clearBoard();
  clearModal();
  clearPlayerAvatar();
});

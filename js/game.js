'use strict';
var WALL = '*';
var FOOD = '🟢';
var EMPTY = ' ';
var SUPERFOOD = '💎'
var board = []
var CHERRY = '🍒'
var gBoard;
var gEmptyCells = []
var gCherryInt = null
var gGame = {
  score: 0,
  isOn: false
};


//After every food check all mat

function init() {
  gBoard = buildBoard();

  createPacman(gBoard);
  createGhosts(gBoard);
  gCherryInt = setInterval(addCherry, 15000)
  printMat(gBoard, '.board-container');
 
  gGame.isOn = true;

}

function buildBoard() {
  var SIZE = 10;
  board = [];
  for (var i = 0; i < SIZE; i++) {
    board.push([]);
    for (var j = 0; j < SIZE; j++) {
      board[i][j] = FOOD;

      if (i === 0 || i === SIZE - 1 ||
        j === 0 || j === SIZE - 1 ||
        (j === 3 && i > 4 && i < SIZE - 2)) {

        board[i][j] = WALL;
      }
    }
  }
  board[1][1] = SUPERFOOD
  board[1][8] = SUPERFOOD
  board[8][8] = SUPERFOOD
  board[8][1] = SUPERFOOD

  return board;

}






function updateScore(value) {

  gGame.score += value;
  document.querySelector('header h3 span').innerText = gGame.score;

}


function gameOver() {
  gGame.isOn = false;
  clearInterval(gIntervalGhosts);
  gIntervalGhosts = null;
  var elRestart = document.querySelector('.game-over')
  elRestart.classList.remove('hide')
}


function restart() {

  gGame = {
    score: 0,
    isOn: false
  };
  gEmptyCells = []
  document.querySelector('header h3 span').innerText = gGame.score;
  var elRestart = document.querySelector('.game-over')
  elRestart.classList.add('hide')
  var elBtn = document.querySelector('.game-over button')
  elBtn.innerText = 'Play Again'
  
  init()
}


function gameWin() {
  console.log('won');

  gGame.isOn = false;
  clearInterval(gIntervalGhosts);
  gIntervalGhosts = null;
  var elBtn = document.querySelector('.game-over button')
  elBtn.innerText = 'Play Again'
  var elRestart = document.querySelector('.game-over')
  elRestart.classList.remove('hide')
  document.querySelector('.game-over span').innerText = 'You Won!'

}


function addCherry() {
  var rndCherryLocation = {}
  gEmptyCells.sort(function (a, b) { return 0.5 - Math.random() });
  rndCherryLocation = gEmptyCells.pop()
  console.log(rndCherryLocation);

  gBoard[rndCherryLocation.i][rndCherryLocation.j] = CHERRY

  renderCell(rndCherryLocation, CHERRY)

}

function checkIfWin() {

  for (var i = 0; i < gBoard.length; i++) {

    for (var j = 0; j < gBoard[0].length; j++) {

      if (gBoard[i][j] === FOOD) {
        return false
      }
    }
  }
  return true
}

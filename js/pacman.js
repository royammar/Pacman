var gPacman;
// const PACMAN_src = 'src="img source>'
var PACMAN = '🤠';
'<img class="player '



function createPacman(board) {
  gPacman = {
    location: {
      i: 3,
      j: 5
    },
    isSuper: false
  };
  board[gPacman.location.i][gPacman.location.j] = PACMAN;
}

function movePacman(eventKeyboard) {
  if (!gGame.isOn) return;


  var nextLocation = getNextLocation(eventKeyboard);

  if (!nextLocation) return;

  var nextCell = gBoard[nextLocation.i][nextLocation.j];


  if (nextCell === WALL) return;


  if (nextCell === FOOD) {
   

    updateScore(1);
    if (!gEmptyCells.includes({ i: gPacman.location.i, j: gPacman.location.j }))
    gEmptyCells.push(({ i: gPacman.location.i, j: gPacman.location.j }))
  
  }
  else if (nextCell === CHERRY) {
    updateScore(10)
    
    gEmptyCells.push(({ i: gPacman.location.i, j: gPacman.location.j }))
  }
  else if (nextCell === GHOST) {
    if (gPacman.isSuper) {

      updateScore(1);
     
      removeGhost(nextLocation.i, nextLocation.j)
      gDeadGhostCounter++
      renderCell(gPacman.location, EMPTY)
    }
    else {
      renderCell(gPacman.location, EMPTY);
      gameOver()

      return;
    }
  }
  else if (nextCell === SUPERFOOD) {
    if (gPacman.isSuper) return
    else {
      updateScore(1);
      renderCell(gPacman.location, EMPTY);
      superMode()
    }

  }



  // Update the model to reflect movement
  gBoard[gPacman.location.i][gPacman.location.j] = EMPTY;
  // Update the DOM
  renderCell(gPacman.location, EMPTY);
  //debugger

  


  // Update the pacman MODEL to new location  
  gPacman.location = nextLocation;

  gBoard[gPacman.location.i][gPacman.location.j] = PACMAN;

  // Render updated model to the DOM
  renderCell(gPacman.location, PACMAN);

  var check = checkIfWin()
  
  if (check) {
    gameWin()
  }
  
}

function getNextLocation(keyboardEvent) {
  var nextLocation = {
    i: gPacman.location.i,
    j: gPacman.location.j
  };

  switch (keyboardEvent.code) {
    case 'ArrowUp':
      // PACMAN+='up' //'+PACMAN_src
      nextLocation.i--;
      break;
    case 'ArrowDown':
      nextLocation.i++;
      break;
    case 'ArrowLeft':
      nextLocation.j--;
      break;
    case 'ArrowRight':
      nextLocation.j++;
      break;
    default: return null;
  }

  return nextLocation;
}



function superMode() {
  gPacman.isSuper = true

  for (var i = 0; i < gGhosts.length; i++) {

    gGhosts[i].color = 'blue;';

  }

  setTimeout(function () {
    GhostLiveAgain(gDeadGhostCounter)
    gPacman.isSuper = false

  }, 5000);
  // setTimeout(gPacman.isSuper = false,5000)



}



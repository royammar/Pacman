var GHOST = '👻';
// var ghostStartinPtProp='🟢'
var gIntervalGhosts;
var gGhosts;
var gDeadGhostCounter = 0;

function createGhost(board, currCellContent = FOOD) {
    var ghost = {
        color: getRandomColor(),
        location: {
            i: 3,
            j: 3
        },
        currCellContent: currCellContent
    };
    gGhosts.push(ghost);
    console.log('new', ghost);

    board[ghost.location.i][ghost.location.j] = GHOST;
}


function createGhosts(board) {
    gGhosts = [];

    // empty the gGhosts array, create some ghosts
    createGhost(board)
    createGhost(board)
    createGhost(board)
    //  and run the interval to move them
    gIntervalGhosts = setInterval(moveGhosts, 1000)
}

function moveGhosts() {
    for (var i = 0; i < gGhosts.length; i++) {
        var ghost = gGhosts[i];

        // Create the moveDiff
        var moveDiff = getMoveDiff();
        var nextLocation = { i: ghost.location.i + moveDiff.i, j: ghost.location.j + moveDiff.j }
        // console.log('ghost.location', ghost.location, 'nextLocation', nextLocation, 'moveDiff', moveDiff)

        // if WALL return
        if (gBoard[nextLocation.i][nextLocation.j] === WALL) continue

        // if PACMAN - gameOver, return
        if (gBoard[nextLocation.i][nextLocation.j] === PACMAN && !gPacman.isSuper) {
            gameOver()
            return
        }
        // if GHOST - give up
        if (gBoard[nextLocation.i][nextLocation.j] === GHOST) {
            continue
        }

        // set back what we stepped on: update Model, DOM
        gBoard[ghost.location.i][ghost.location.j] = ghost.currCellContent
        renderCell(ghost.location, ghost.currCellContent)

        // move the ghost
        ghost.location = nextLocation

        // keep the contnet of the cell we are going to
        ghost.currCellContent = gBoard[nextLocation.i][nextLocation.j]

        // move the ghost and update model and dom
        gBoard[ghost.location.i][ghost.location.j] = GHOST
        renderCell(ghost.location, getGhostHTML(ghost))

    }
}
function getMoveDiff() {
    var randNum = getRandomIntInclusive(0, 100)
    if (randNum < 25) {
        return { i: 0, j: 1 }
    } else if (randNum < 50) {
        return { i: -1, j: 0 }
    } else if (randNum < 75) {
        return { i: 0, j: -1 }
    } else {
        return { i: 1, j: 0 }
    }
}


function getGhostHTML(ghost) {
    return `<span style ="background-color:${ghost.color}" >${GHOST}</span>`

}



function removeGhost(ghostLocI, ghostLocJ) {
    for (var i = 0; i < gGhosts.length; i++) {
        if (gGhosts[i].location.i === ghostLocI && gGhosts[i].location.j === ghostLocJ) {

            gGhosts.splice(i, 1)
            break
        }
    }
}


function GhostLiveAgain() {
    var currCellContent = (gBoard[3][3] === EMPTY) ? EMPTY : FOOD
    if (gBoard[3][3] === ' ')
        for (var i = 0; i < gDeadGhostCounter; i++) {
            createGhost(board, currCellContent)

        }
    for (var i = 0; i < gGhosts.length; i++) {
        gGhosts[i].color = getRandomColor()

    }
    gDeadGhostCounter = 0
}

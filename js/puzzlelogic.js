var puzzleSolvedState = [];
var puzzleCurrentState = [];
var puzzleHeight = 4;
/* Grid coordinates to check against 2D puzzle array */
/* TODO: Generate map programmatically based on variable puzzleHeight */
var rowColMap = [[0,0], [0,1], [0,2], [0,3], [1,0], [1,1], [1,2], [1,3],
        [2,0], [2,1], [2,2], [2,3], [3,0], [3,1], [3,2], [3,3]];

$(function() {
    
/* Initialize our puzzle */
    initPuzzle();

/* Process clicks */
    $(".puzzle-piece").click(function() { 
        var clickedLocation = Number(event.target.id.replace('td',''));
        
        if (puzzleCurrentState[clickedLocation] === ' ') { return;
        } else {
            if (blankInRow(clickedLocation)) {
                rearrangeRow(clickedLocation);
            } else if (blankInColumn(clickedLocation)) {
                rearrangeCol(clickedLocation);
            } 
            /* TODO: We probably don't need to update the whole page every time! */
            for (i = 0; i < puzzleCurrentState.length; i ++) {
                $ ("#td" + i).text(puzzleCurrentState[i]);
            }
            /* Did you win!? */
            if (_.isEqual(puzzleCurrentState, puzzleSolvedState)) {
                alert("You win!")
            }
        }
    });

});

function initPuzzle() {
    puzzleSolvedState = _.range(1, 16);
    puzzleSolvedState.push(' ');
    puzzleCurrentState = puzzleSolvedState.slice();
    /* This can lead to unsolvable puzzles:
    puzzleCurrentState = _.shuffle(puzzleSolvedState); */
    shufflePuzzle();
    $(".puzzle-piece").each(function(index) {
        $(this).text(puzzleCurrentState[index]);
    });
}

function shufflePuzzle() {
    /* 'Click' at random 100,000 times */
    for (j = 0; j < 10; j++) {
        var clickedLocation = Math.floor(Math.random() * (puzzleCurrentState.length));
        if (puzzleCurrentState[clickedLocation] !== ' ') {
            if (blankInRow(clickedLocation)) {
                rearrangeRow(clickedLocation);
            } else if (blankInColumn(clickedLocation)) {
                rearrangeCol(clickedLocation);
            }
        }
    }
}

function blankInRow(clickedLoc) {
    var blankSquare = puzzleCurrentState.indexOf(' ');
    if (rowColMap[blankSquare][0] === rowColMap[clickedLoc][0]) { return true; }
    else { return false; }
}

function blankInColumn(clickedLoc) {
    var blankSquare = puzzleCurrentState.indexOf(' ');
    if (rowColMap[blankSquare][1] === rowColMap[clickedLoc][1]) { return true; }
    else { return false; }
}

function rearrangeRow(clickedLocation) {
    puzzleCurrentState = _.without(puzzleCurrentState, ' ');
    puzzleCurrentState.splice(clickedLocation, 0, ' ');
}

function rearrangeCol(clickedLocation) {
    var currColumn = rowColMap[clickedLocation][1];
    var currRow = rowColMap[clickedLocation][0];
    /* Generate an array of the column in question */
    var colCurrentState = []
    for (i = 0; i < puzzleHeight; i++) {
        colCurrentState.push(puzzleCurrentState[currColumn+(puzzleHeight*i)]);
    }
    colCurrentState = _.without(colCurrentState, ' ');
    colCurrentState.splice(currRow, 0, ' ');
    for (i = 0; i < puzzleHeight; i++) {
        puzzleCurrentState[currColumn+(puzzleHeight*i)] = colCurrentState[i];
    }
}

var puzzleSolvedState = [];
var puzzleCurrentState = [];
var puzzleHeight = 4;
var clockRunning = false;
var rowColMap = [];

$(function() {
    
/* Initialize our puzzle */
    initPuzzle();

/* Set up the clock */
    $('#runner').runner();

/* Process clicks */
    $(".puzzle-piece").click(function() { 
        var clickedLocation = Number(event.target.id.replace('td',''));
        
        if (puzzleCurrentState[clickedLocation] === ' ') { return;
        } else {
            if (!clockRunning) {
                $('#runner').runner('start');
                clockRunning = true;
               }
            if (blankInRow(clickedLocation)) {
                rearrangeRow(clickedLocation);
            } else if (blankInColumn(clickedLocation)) {
                rearrangeCol(clickedLocation);
            } 
            /* TODO: We probably don't need to update the whole page every time! */
            for (i = 0; i < puzzleCurrentState.length; i ++) {
                $("#td" + i).text(puzzleCurrentState[i]);
                if (puzzleCurrentState[i] === puzzleSolvedState[i]) {
                    $("#td" + i).addClass("bg-success");
                } else { $("#td" + i).removeClass("bg-success"); }
            }
            /* Did you win!? */
            if (_.isEqual(puzzleCurrentState, puzzleSolvedState)) {
                $('#runner').runner('stop');
                clockRunning = false;
                $('#runner').text("You win!")
            }
        }
    });

});

function initPuzzle() {
    for (i = 0; i < puzzleHeight; i++) {
        for (j = 0; j < puzzleHeight; j++) {
            rowColMap.push([i, j]);
        }
    }

    puzzleSolvedState = _.range(1, Math.pow(puzzleHeight, 2));
    puzzleSolvedState.push(' ');
    puzzleCurrentState = puzzleSolvedState.slice();
    /* This can lead to unsolvable puzzles:
    puzzleCurrentState = _.shuffle(puzzleSolvedState); */
    shufflePuzzle();

    var tableHTML = '<table class="table table-bordered text-center">';
    for (i = 0; i < puzzleHeight; i++) {
        tableHTML += '<tr id="tr' + i + '">';
        for (j = 0; j < puzzleHeight; j++) {
            var currID = (i*puzzleHeight) + j;
            console.log(currID);
            tableHTML += '<td id="td' + currID + '" class="puzzle-piece"></td>';
        }
        tableHTML += '</tr>';
    }
    tableHTML += '</table>';

    $( "#puzzletable" ).append(tableHTML);

    $(".puzzle-piece").each(function(index) {
    $(this).text(puzzleCurrentState[index]);
    if (puzzleCurrentState[index] === puzzleSolvedState[index]) {
        $(this).addClass("bg-success"); }
    });
}

function shufflePuzzle() {
    /* 'Click' at random 100,000 times */
    for (j = 0; j < 100000; j++) {
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

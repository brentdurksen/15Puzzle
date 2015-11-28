var puzzleCurrentState = [];
/* Grid coordinates to check against 2D puzzle array */
/* TODO: Generate map programmatically based on variable grid size */
var rowColMap = [[0,0], [0,1], [0,2], [0,3], [1,0], [1,1], [1,2], [1,3],
        [2,0], [2,1], [2,2], [2,3], [3,0], [3,1], [3,2], [3,3]];

$(function() {
    
/* Initialize our puzzle */
    initPuzzle();

/* Add some pretty colors */ 
    $('td').hover(function() {
        $(this).addClass("active");
    },
     function() {
        $(this).removeClass("active");
    })
    
/* Process clicks */
    $(".puzzle-piece").click(function() { 
        var clickedLocation = Number(event.target.id.replace('td',''));
        var clickedNum = puzzleCurrentState[clickedLocation];
        
        if (clickedNum === ' ') { return; 
        } else {
            if (blankInRow(clickedLocation)) {
                
            } else if (blankInColumn(clickedLocation)) {
                
            } 
        }
        
    });
        
});

function initPuzzle() {
    puzzleCurrentState = generateRandomArray();
    $(".puzzle-piece").each(function(index) {
        $(this).text(puzzleCurrentState[index]);
        if (index + 1 === puzzleCurrentState[index]) {
            $(this).addClass("success");
        }
    });
}

function generateRandomArray() {
    var puzzleNumbers = _.range(1, 16);
    puzzleNumbers.push(' ');
    puzzleNumbers = _.shuffle(puzzleNumbers);
    return puzzleNumbers;
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
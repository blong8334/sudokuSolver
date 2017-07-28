const _ = require('lodash');

module.exports = {
    printPuzzleToConsole,
    weCanFillSquares,
    puzzleSolved,
    puzzleValid
};

function puzzleSolved(puzzle) {
    for (let row = 0; row < 9; row++)
        for (let col = 0; col < 9; col++)
            if (!puzzle[row][col]) return false;
    return true;
}

function puzzleValid(puzzle) {
    let boxesValid = checkBoxesAreValid(puzzle);
    if (!boxesValid) return false;
    let rowsValid = checkRowsAreValid(puzzle);
    if (!rowsValid) return false;
    return checkColsAreValid(puzzle);
}

function checkColsAreValid(puzzle) {
    for (let colIdx = 0; colIdx < 9; colIdx += 1) {
        let colValid = checkColIsValid(colIdx, puzzle);
        if (!colValid) return false;
    }
    return true;
}

function checkColIsValid(col, puzzle) {
    let boxNums = [];
    for (let row = 0; row < 9; row++) {
        let boxNum = puzzle[row][col];
        if (boxNum && ~_.indexOf(boxNums, boxNum)) return false;
        boxNums.push(boxNum);
    }
    return true;
}

function checkRowsAreValid(puzzle) {
    for (let rowIdx = 0; rowIdx < 9; rowIdx += 1) {
        let rowValid = checkrowIsValid(rowIdx, puzzle);
        if (!rowValid) return false;
    }
    return true;
}

function checkrowIsValid(row, puzzle) {
    let boxNums = [];
    for (let col = 0; col < 9; col++) {
        let boxNum = puzzle[row][col];
        if (boxNum && ~_.indexOf(boxNums, boxNum)) return false;
        boxNums.push(boxNum);
    }
    return true;
}

function checkBoxesAreValid(puzzle) {
    for (let sRow = 0; sRow < 9; sRow += 3)
        for (let sCol = 0; sCol < 9; sCol += 3) {
            let boxValid = checkBoxIsValid(sRow, sCol, puzzle);
            if (!boxValid) return false;
        }
    return true;
}

function checkBoxIsValid(sRow, sCol, puzzle) {
    let boxNums = [];
    for (let rIdx = 0; rIdx < 3; rIdx += 1) {
        let row = sRow + rIdx;
        for (let cIdx = 0; cIdx < 3; cIdx += 1) {
            let col = sCol + cIdx,
                boxNum = puzzle[row][col];
            if (boxNum && ~_.indexOf(boxNums, boxNum)) return false;
            boxNums.push(boxNum);
        }
    }
    return true;
}

function weCanFillSquares(possibleNumbers) {
    for (let row = 0; row < possibleNumbers.length; row++) {
        let currRow = possibleNumbers[row];
        for (let col = 0; col < currRow.length; col++)
            if (currRow[col].length === 1) return true;
    }
    return false;
}

function printPuzzleToConsole(puzzle) {
    for (let rowIdx = 0; rowIdx < 9; rowIdx++) {
        let rowStr = _.map(puzzle[rowIdx], el => el || '_').join(' ');
        console.log(rowStr);
    }
    console.log('\n');
}
const _ = require('lodash'),
    o = undefined,
    {iterateVerticalGroups} = require('./vertical'),
    {iterateHorizontalGroups} = require('./horizontal'),
    {iterateBoxes} = require('./boxes'),
    {fillSquares} = require('./fillSquares'),
    {
        printPuzzleToConsole,
        weCanFillSquares,
        puzzleSolved,
        puzzleValid
    } = require('./helpers'),
    {eliminateOptions} = require('./eliminateOptions'),
    {rowColBlockers} = require('./rowColBlockers');

/*[
    [o, o, o, o, o, o, o, o, o],
    [o, o, o, o, o, o, o, o, o],
    [o, o, o, o, o, o, o, o, o],
    [o, o, o, o, o, o, o, o, o],
    [o, o, o, o, o, o, o, o, o],
    [o, o, o, o, o, o, o, o, o],
    [o, o, o, o, o, o, o, o, o],
    [o, o, o, o, o, o, o, o, o],
    [o, o, o, o, o, o, o, o, o]
];*/

let puzzle = [
    [o, 9, o, o, o, o, o, 6, o],
    [o, o, o, 1, 2, o, o, 8, 7],
    [7, o, 8, o, o, o, 3, o, o],
    [o, o, 9, 8, o, o, o, 2, o],
    [6, o, 4, o, o, o, o, o, 3],
    [5, o, o, o, o, o, o, o, 8],
    [o, o, 3, 2, 9, o, o, o, o],
    [o, 7, o, o, o, 5, 4, o, o],
    [o, 6, o, o, 7, o, o, o, o]
],
iterations = 0;

sudokuSolver(puzzle);

function sudokuSolver(puzzle) {
    // Vertical possibilities
    // Horizontal possibilities
    // Square possibilities
    // Find possibility lengths of 1
    // Update puzzle with those.
    // Repeat until the puzzle is solved or there are not possibilities of 1 left.
    // If not solved, guess and redo.

    // The list of possible numbers for every box.
    let possibleNumbers = [],
        iterate = true;
    // printPuzzleToConsole(puzzle);

    while (iterate) {
        iterations++;
        iterate = false;
        iterator(possibleNumbers, puzzle);
        if (weCanFillSquares(possibleNumbers)) {
            fillSquares(possibleNumbers, puzzle);
            iterate = true;
        }
        printPuzzleToConsole(puzzle);
        if (!puzzleValid(puzzle)) {
            console.error('INVALID');
            return false;
        }
        if (puzzleSolved(puzzle)) {
            console.log('Iterations: ', iterations);
            return puzzle;
        }
    }
    return guessNums(puzzle, possibleNumbers);
}

function guessNums(puzzle, possibleNumbers) {
    let nums = possNumSorter(possibleNumbers);
    for (let i = 0; i < nums.length; i++) {
        let {row, col, possNums} = nums[i];
        for (let j = 0; j < possNums.length; j++) {
            let puzzleCopy = puzzle.slice(0);
            puzzleCopy[row][col] = possNums[j];
            let res = sudokuSolver(puzzleCopy);
            if (res) return res;
        }
    }
}

function possNumSorter(possibleNumbers) {
    let numsList = [];
    for (let row = 0; row < 9; row += 1)
        for (let col = 0; col < 9; col += 1) {
            let possNums = possibleNumbers[row][col];
            if (_.get(possNums, 'length'))
                numsList.push({row, col, possNums});
        }
    return _.sortBy(numsList, ({possNums}) => possNums.length);
}

function iterator(possibleNumbers, puzzle) {
    iterateVerticalGroups(possibleNumbers, puzzle);
    iterateHorizontalGroups(possibleNumbers, puzzle);
    iterateBoxes(possibleNumbers, puzzle);
    eliminateOptions(possibleNumbers);
    rowColBlockers(possibleNumbers);
}
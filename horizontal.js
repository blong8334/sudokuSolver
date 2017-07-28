const _ = require('lodash');

module.exports = {
    iterateHorizontalGroups
};

function iterateHorizontalGroups(possibleNumbers, puzzle) {
    for (let col = 0; col < 9; col += 3) {
        let currentCols = _.map([0, 1, 2], c => c += col);
        for (let row = 0; row < 9; row++) {
            // Do some function here with the currentRows
            horizontalNumRemover(currentCols, row, possibleNumbers, puzzle);
        }
    }
}

// Remove the numbers
function horizontalNumRemover(currentCols, row, possibleNumbers, puzzle) {
    // Get the column numbers for the current rows.
    let rowNums = getRowNums(currentCols, row, puzzle);

    // for each square in the current row, reove the colNums from their possible numbers.
    _.each(currentCols, col => {
        if (puzzle[row][col]) return;

        _.pull(possibleNumbers[row][col], ...rowNums);

    });
}

// Return an array of numbers in the column for the current rows.
function getRowNums(currentCols, row, puzzle) {
    // Get the numbers for the column.
    let rowNums = puzzle[row].slice(0);
    // Remove the numbers for the rows we are working on.
    rowNums.splice(currentCols[0], currentCols.length);
    // Return an array of only numbers.
    return _.compact(rowNums);
}
const _ = require('lodash');

module.exports = {
    iterateVerticalGroups
};

function iterateVerticalGroups(possibleNumbers, puzzle) {
    for (let row = 0; row < 9; row += 3) {
        let currentRows = _.map([0, 1, 2], r => r += row);
        for (let col = 0; col < 9; col++) {
            // Do some function here with the currentRows
            verticalNumRemover(currentRows, col, possibleNumbers, puzzle);
        }
    }
}

// Remove the numbers
function verticalNumRemover(currentRows, col, possibleNumbers, puzzle) {
    // Get the column numbers for the current rows.
    let colNums = getColNums(currentRows, col, puzzle);

    // for each square in the current row, reove the colNums from their possible numbers.
    _.each(currentRows, row => {
        // If the rowNums don't exist, initialize it.
        if (!possibleNumbers[row]) possibleNumbers[row] = [];
        // If this square is already filled in the puzzle, set the possibleNumbers
        // to empty and return.
        if (puzzle[row][col]) return (possibleNumbers[row][col] = []);
        // if the if the entry doesnt exist yet for the square, create it.
        if (!possibleNumbers[row][col]) possibleNumbers[row][col] = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        // remove the column numbers from the squares possible nums.
        _.pull(possibleNumbers[row][col], ...colNums);
        // console.log(`\nrow: ${row}, col: ${col}`);
        // console.log('possibleNumbers: ', possibleNumbers[row][col]);
    });
}

// Return an array of numbers in the column for the current rows.
function getColNums(currentRows, col, puzzle) {
    // Get the numbers for the column.
    let colNums = _.map(puzzle, row => row[col]);
    // Remove the numbers for the rows we are working on.
    colNums.splice(currentRows[0], currentRows.length);
    // Return an array of only numbers.
    return _.compact(colNums);
}
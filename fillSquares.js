// const _ = require('lodash');

module.exports = {fillSquares};

function fillSquares(possibleNumbers, puzzle) {
    /*
    For each square check the number of possible numbers
    If the num === 1, fill the box in.
     */

    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            let squarePossNums = possibleNumbers[row][col];
            if (squarePossNums.length === 1) {
                puzzle[row][col] = squarePossNums[0];
                squarePossNums = undefined;
            }
        }
    }
}

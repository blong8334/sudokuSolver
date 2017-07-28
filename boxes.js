const _ = require('lodash');

module.exports = {
    iterateBoxes
};

function iterateBoxes(possibleNumbers, puzzle) {
    // For each box get all the numbers inside
    // For each square in the box, pull those numbers from possibleNumbers.
    for (let row = 0; row < 9; row += 3) {

        for (let col = 0; col < 9; col += 3) {
            // We have the top left square for the box.
            // iterate the box and build a list of nums.
            let boxNums = getBoxNums(row, col, puzzle);
            // iterate the box and pull those nums.
            pullBoxNums(row, col, boxNums, possibleNumbers, puzzle);
        }

    }
}

function pullBoxNums(row, col, boxNums, possibleNumbers, puzzle) {
    for (let r = 0; r < 3; r++)
        for (let c = 0; c < 3; c++)
            !puzzle[row + r][col + c] &&
            _.pull(possibleNumbers[row + r][col + c], ...boxNums);
}

function getBoxNums(row, col, puzzle) {
    let boxNums = [];
    for (let r = 0; r < 3; r++)
        for (let c = 0; c < 3; c++)
            boxNums.push(puzzle[row + r][col + c]);
    return boxNums;
}
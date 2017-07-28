const _ = require('lodash');

module.exports = {eliminateOptions};

// iterate boxes.
// build a set of all numbers in the box.
// remove the numbers for the current square.
// pull the rest of the numbers from the possible nums.
// if there is only one possible left, you've got it
// fill it in.
function eliminateOptions(possibleNumbers) {
    // For each box get all the numbers inside
    // For each square in the box, pull those numbers from possibleNumbers.

    // Iterate the boxes.
    for (let row = 0; row < 9; row += 3) {

        for (let col = 0; col < 9; col += 3) {
            // for this box, build the set
            let boxSet = boxSetBuilder(row, col, possibleNumbers);
            iterateBoxSquares(row, col, boxSet, possibleNumbers)
        }
    }
}

function iterateBoxSquares(startRow, startCol, boxSet, possibleNumbers) {
    // then for each square in the box
    // pull that squares numbers from the possible.
    // then pull the options from that square.
    // if there is only one left at that point
    // then you have the number.
    for (let row = 0; row < 3; row += 1) {
        let r = startRow + row;
        for (let col = 0; col < 3; col += 1) {
            let c = startCol + col,
                possNums = possibleNumbers[r][c];
            if (_.get(possNums, 'length'))
                pullPossNums(r, c, possNums, boxSet, possibleNumbers);
        }
    }

}

function pullPossNums(r, c, possNums, boxSet, possibleNumbers) {
    // pull these nums from the set.
    let restOfBoxNums = findAndRemove(boxSet, possNums),
        boxPoss = findAndRemove(possNums, restOfBoxNums);
    if (_.get(boxPoss, 'length') === 1)
        possibleNumbers[r][c] = boxPoss;
}

function findAndRemove(arr, toRemove) {
    arr = arr.slice(0);
    _.each(toRemove, el => {
        let idx = _.indexOf(arr, el);
        if (~idx) arr.splice(idx, 1);
    });
    return arr;
}

function boxSetBuilder(startRow, startCol, possibleNumbers) {
    let set = [];
    for (let rowIdx = 0; rowIdx < 3; rowIdx++) {
        let r = startRow + rowIdx;
        for (let colIdx = 0; colIdx < 3; colIdx++) {
            let nums = possibleNumbers[r][startCol + colIdx];
            if (nums) set.push(...nums);
        }
    }
    return set;
}

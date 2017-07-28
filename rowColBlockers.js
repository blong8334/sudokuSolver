const _ = require('lodash');

module.exports = {rowColBlockers};


function rowColBlockers(possibleNumbers) {

    for (let row = 0; row < 9; row += 3)

        for (let col = 0; col < 9; col += 3)
            // For this box iterate the rows and cols.
            iterateRowsAndColumns(row, col, possibleNumbers);
}

function iterateRowsAndColumns(sRow, sCol, possibleNumbers) {
    iterateRows(sRow, sCol, possibleNumbers);
    // iterateCols(sRow, sCol, possibleNumbers);
}

function iterateRows(sRow, sCol, possibleNumbers) {
    let rows = getRows(sRow, sCol, possibleNumbers);
    for (let i = 0; i < 3; i++) {
        let currentRow = rows[i],
            otherNums = getOtherNums(rows, i);
        _.each(currentRow, num => {
            let pull = !~_.indexOf(otherNums, num);
            if (pull) {
                pullNumFromRow(sRow + i, sCol, num, possibleNumbers);
            }
        });
    }
}

/**
 * Removes the provided number from possibleNumbers for each square in a row
 * not in the current box.
 * @param sRow
 * @param sCol
 * @param num {Number} The number to remove.
 * @param possibleNumbers
 */
function pullNumFromRow(sRow, sCol, num, possibleNumbers) {
    for (let i = 0; i < 9; i++) {
        if (i < sCol || i > sCol + 2) {
            let nums = possibleNumbers[sRow][i];
            if (_.get(nums, 'length')) _.pull(possibleNumbers[sRow][i], num);
        }
    }
}

/**
 * For the current box, get a list of all numbers for the non-current rows.
 * @param rows {Array<Number>} 3-element array with a list of numbers that occur
 * in each row of the box.
 * @param currRow {Number} The current row.
 * @returns {Array<Number>} All numbers not in the current row.
 */
function getOtherNums(rows, currRow) {
    return _.reduce(rows, (otherNums, row, idx) => {
        if (idx !== currRow) otherNums.push(...row);
        return otherNums;
    }, []);
}

/**
 * For this box, make an array for each row of all the possible numbers.
 * @param sRow {Number} Top left starting idx row of the box.
 * @param sCol {Number} Top left starting idx col of the box.
 * @param possibleNumbers {Array<Array<Number>>} The possible numbers for each square.
 * @returns {Array<Number>} The possible numbers that appear in each row of this box.
 */
function getRows(sRow, sCol, possibleNumbers) {
    // Reduce over the row increment.
    return _.reduce([0, 1, 2], (rowNumbers, r) => {
        // Reduce over the col increment.
        let rowSet = _.reduce([0, 1, 2], (rowSet, c) => {
            let possNums = possibleNumbers[sRow + r][sCol + c];
            _.each(possNums, num => rowSet.add(num));
            return rowSet;
        }, new Set());

        rowNumbers[r] = Array.from(rowSet);
        return rowNumbers;

    }, []);
}
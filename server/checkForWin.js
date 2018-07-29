/**
 * This file holds all the logic for checking for the winning conditions of a bingo board.
 */

const _ = require('lodash')

const winningRows = [
  [0, 1, 2, 3, 4],
  [5, 6, 7, 8, 9],
  [10, 11, 12, 13, 14],
  [15, 16, 17, 18, 19],
  [20, 21, 22, 23, 24]
]

const winningColumns = _.times(5, i => {
  const winColumn = winningRows.map(row => row[i])
  return winColumn
})

const winningDiagonals = winningRows.reduce(
  (acc, row, i) => {
    const forward = row[i]
    const backward = row[row.length - i - 1]
    acc[0].push(forward)
    acc[1].push(backward)
    return acc
  },
  [[], []]
)

const allWinningConditions = winningRows
  .concat(winningColumns)
  .concat(winningDiagonals)

// winning boards are a row across, down, or diagonal
module.exports = function checkBoard(board) {
  return allWinningConditions.some(winCondition => {
    return winCondition.every(index => {
      return board[index] && board[index].called
    })
  })
}

import React from 'react'
import { chunk } from 'lodash'
import classNames from 'classnames'
import './style.css'

function BingoBoard({ boardNumbers }) {
  const bingoTableRows = chunk(boardNumbers, 5)
  return (
    <table className="bingo-board">
      <tbody>
        {bingoTableRows.map((row, i) => {
          return (
            <tr key={i}>
              {row.map(({ bingoNumber, called }, i) => {
                return (
                  <td
                    key={i}
                    className={classNames('bingo-board-cell', {
                      called
                    })}
                  >
                    {bingoNumber}
                  </td>
                )
              })}
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

export default BingoBoard

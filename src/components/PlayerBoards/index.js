import React, { Component } from 'react'
import { Button, Intent } from '@blueprintjs/core'
import BingoBoard from '../BingoBoard'

class PlayerBoards extends Component {
  claimBingo = bingoBoardNums => {
    this.props.claimBingo(bingoBoardNums)
  }

  render() {
    const { bingoBoards, gameOver } = this.props
    return (
      <div className="bingo-game-player-boards">
        {bingoBoards.map((bingoBoardNums, i) => {
          return (
            <div
              key={i}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
              }}
            >
              <BingoBoard boardNumbers={bingoBoardNums} />
              <Button
                style={{ maxWidth: 85 }}
                disabled={gameOver}
                intent={Intent.PRIMARY}
                onClick={() => this.claimBingo(bingoBoardNums)}
                text="BINGO!"
              />
            </div>
          )
        })}
      </div>
    )
  }
}

export default PlayerBoards

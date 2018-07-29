import React, { Component } from 'react'
import { times } from 'lodash'
import axios from 'axios'
import { FocusStyleManager, Button, Intent } from '@blueprintjs/core'
import { Position, Toaster } from '@blueprintjs/core'

import { generateBingoNumbers } from './utils'
import CalledNumbers from './components/CalledNumbers'
import PlayerBoards from './components/PlayerBoards'
import './App.css'

FocusStyleManager.onlyShowFocusOnTabs()

// number of bingo boards the player will have
const numBoards = 4
// how quickly numbers are drawn (in ms)
const drawTime = 2000

class App extends Component {
  state = {
    calledNumbers: [],
    // for win condition
    gameOver: false,
    // this will generate an array of random numbers numBoards times
    // by default 25, larger boards can be created by passing a larger number
    playerBoards: times(numBoards, () => generateBingoNumbers())
  }

  startGame = () => {
    this.getBingoNumber()
    this.resumeGame()
  }

  resumeGame = () => {
    this.setState({
      paused: false
    })
    this.gameInterval = setInterval(() => {
      !this.gettingNumber && this.getBingoNumber()
    }, drawTime)
  }

  pauseGame = () => {
    this.setState({
      paused: true
    })
    clearInterval(this.gameInterval)
  }

  restartGame = () => {
    clearInterval(this.gameInterval)
    this.setState(
      {
        calledNumbers: [],
        playerBoards: times(numBoards, () => generateBingoNumbers()),
        gameOver: false
      },
      () => {
        this.startGame()
      }
    )
  }

  componentDidMount() {
    this.startGame()
  }

  getBingoNumber = async () => {
    const { calledNumbers } = this.state
    // if for some reason the server is really slow to respond we don't want
    // to hit get number while a number is already being fetched
    this.gettingNumber = true
    // every number called
    if (calledNumbers.length === 100) {
      toast.show({
        intent: Intent.PRIMARY,
        message: 'All numbers have been called. You probably have bingo.'
      })
      clearInterval(this.gameInterval)
    }

    try {
      const {
        data: { gameOver, newBingoNumber }
      } = await axios.post('/bingo-number', calledNumbers)
      if (gameOver) {
        // should never get here. this means that something is out of sync
      } else if (newBingoNumber) {
        this.setState({
          calledNumbers: [...calledNumbers, newBingoNumber]
        })
      }
    } catch (error) {
      console.log('error:', error)
    }
    this.gettingNumber = false
  }

  claimBingo = async bingoBoard => {
    clearInterval(this.gameInterval)
    console.log('bingoBoard:', bingoBoard)
    try {
      const {
        data: { isWinningBoard }
      } = await axios.post('/claim-bingo', bingoBoard)
      console.log('isWinningBoard:', isWinningBoard)
      if (isWinningBoard) {
        this.setState({
          gameOver: true
        })
      } else {
        toast.show({
          intent: Intent.WARNING,
          message: 'Not a bingo. Resuming game...'
        })
        this.resumeGame()
      }
    } catch (error) {
      console.error('error:', error)
    }
  }

  render() {
    const { calledNumbers, playerBoards, gameOver, paused } = this.state
    const bingoBoards = playerBoards.map(numGroup => {
      return numGroup.map(num => {
        return {
          bingoNumber: num,
          called: calledNumbers.includes(num)
        }
      })
    })
    const restartButton = (
      <Button
        intent={Intent.WARNING}
        text="Restart"
        onClick={this.restartGame}
      />
    )
    return (
      <div>
        <h1>Bingo Game</h1>
        <Button
          intent={Intent.PRIMARY}
          icon={paused ? 'play' : 'pause'}
          onClick={paused ? this.resumeGame : this.pauseGame}
        />
        <span style={{ margin: 10 }} />
        {restartButton}
        <CalledNumbers calledNumbers={calledNumbers} />
        <PlayerBoards
          bingoBoards={bingoBoards}
          claimBingo={this.claimBingo}
          gameOver={gameOver}
        />
        {gameOver && (
          <div className="game-overlay">
            <h1 className="bingo-text">BINGO!</h1>
            {restartButton}
          </div>
        )}
      </div>
    )
  }
}

export default App

const toast = Toaster.create({
  position: Position.TOP
})

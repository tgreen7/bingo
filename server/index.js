const express = require('express')
const bodyParser = require('body-parser')
const checkForWin = require('./checkForWin')

const app = express()

app.use(bodyParser.json()) // handle json data
app.use(bodyParser.urlencoded({ extended: true })) // handle URL-encoded data

app.post('/bingo-number', function(req, res) {
  const calledNumbers = req.body || []
  if (calledNumbers.length >= 100) {
    res.status(200).send({
      gameOver: true
    })
  }
  let newBingoNumber = getNumber()
  while (calledNumbers.includes(newBingoNumber)) {
    newBingoNumber = getNumber()
  }
  res.status(200).send({
    newBingoNumber
  })
})


app.post('/claim-bingo', function(req, res) {
  const bingoBoard = req.body || {}
  if (Object.keys(bingoBoard).length !== 25) {
    res.status(500).send('Improper board')
  }
  const isWinningBoard = checkForWin(bingoBoard)
  console.log('isWinningBoard:', isWinningBoard)
  res.status(200).send({
    isWinningBoard
  })
})

function getNumber() {
  return Math.floor(Math.random() * 100) + 1
}

app.listen(process.env.PORT || 8080)

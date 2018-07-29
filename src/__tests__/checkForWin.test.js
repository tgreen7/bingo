const checkForWin = require('../../server/checkForWin')

const winAcross = [
  // row 1
  { called: true },
  { called: false },
  { called: false },
  { called: true },
  { called: false },
  // row 2
  { called: true },
  { called: false },
  { called: false },
  { called: true },
  { called: false },
  // row 3
  { called: true },
  { called: false },
  { called: false },
  { called: true },
  { called: false },
  // row 4
  { called: true },
  { called: true },
  { called: true },
  { called: true },
  { called: true },
  // row 5
  { called: true },
  { called: false },
  { called: false },
  { called: true },
  { called: false }
]

const winColumn = [
  // row 1
  { called: false },
  { called: false },
  { called: false },
  { called: true },
  { called: false },
  // row 2
  { called: false },
  { called: false },
  { called: false },
  { called: true },
  { called: false },
  // row 3
  { called: true },
  { called: false },
  { called: false },
  { called: true },
  { called: false },
  // row 4
  { called: false },
  { called: false },
  { called: false },
  { called: true },
  { called: false },
  // row 5
  { called: true },
  { called: false },
  { called: false },
  { called: true },
  { called: false }
]

const winDiagonal = [
  // row 1
  { called: true },
  { called: false },
  { called: false },
  { called: true },
  { called: false },
  // row 2
  { called: true },
  { called: true },
  { called: false },
  { called: true },
  { called: false },
  // row 3
  { called: true },
  { called: false },
  { called: true },
  { called: true },
  { called: false },
  // row 4
  { called: false },
  { called: true },
  { called: false },
  { called: true },
  { called: true },
  // row 5
  { called: false },
  { called: false },
  { called: false },
  { called: true },
  { called: true }
]

const notWin = [
  // row 1
  { called: true },
  { called: false },
  { called: false },
  { called: true },
  { called: false },
  // row 2
  { called: true },
  { called: false },
  { called: false },
  { called: true },
  { called: false },
  // row 3
  { called: true },
  { called: false },
  { called: false },
  { called: true },
  { called: false },
  // row 4
  { called: true },
  { called: false },
  { called: true },
  { called: false },
  { called: true },
  // row 5
  { called: false },
  { called: false },
  { called: false },
  { called: true },
  { called: false }
]

describe('check for win', () => {
  it('gets winning boards', () => {
    expect(checkForWin(winAcross)).toEqual(true)
    expect(checkForWin(winDiagonal)).toEqual(true)
    expect(checkForWin(winColumn)).toEqual(true)
  })

  it('gets losing boards', () => {
    expect(checkForWin(notWin)).toEqual(false)
  })
})

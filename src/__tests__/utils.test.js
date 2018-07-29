import { uniq } from 'lodash'
import { generateBingoNumbers } from '../utils'

describe('test utils', () => {
  it('generates random non-repeating numbers', () => {
    const bingoNumbers = generateBingoNumbers()
    expect(bingoNumbers.length).toEqual(25)
    expect(uniq(bingoNumbers).length).toEqual(25)
  })
})

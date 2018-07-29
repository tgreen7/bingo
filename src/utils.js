export function generateBingoNumbers(num = 25) {
  const arr = []
  while (arr.length < num) {
    const randomNumber = Math.floor(Math.random() * 100) + 1
    if (arr.includes(randomNumber)) continue
    arr.push(randomNumber)
  }
  return arr
}

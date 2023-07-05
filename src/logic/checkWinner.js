import { WINNER_COMBOS } from "../constanst"

export const checkWinner = (boardToCheck) => {
  for (let combos of WINNER_COMBOS) {

    const [a, b, c] = combos

    if (
      boardToCheck[a] && 
      boardToCheck[a] === boardToCheck[b] && 
      boardToCheck[b] === boardToCheck[c]
      ) {
        return boardToCheck[a]
      }
  }

  return null
}
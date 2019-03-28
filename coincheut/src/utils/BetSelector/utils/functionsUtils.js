import * as c from "../betSelectorConstants"

function checkBet(bet) {
  return bet >= 90;
}

export const getPossibleBets = (minBet) => {
  let default_bets = c.DEFAULT_VALUE_BETS
  let indexMin = default_bets.indexOf(minBet)
  let finalPossibleBets = default_bets.splice(indexMin, 9);
  return finalPossibleBets
}

import * as c from "../betSelectorConstants"

function checkBet(bet) {
  return bet >= 90;
}

export const getPossibleBets = (minBet) => {
  let default_bets = [80,90,100,110,120,130,140,150,160]

  let indexMin = default_bets.indexOf(minBet)

  if ( indexMin === -1 ) {
    return default_bets
  }

  let finalPossibleBets = default_bets.splice(indexMin + 1, 9);
  return finalPossibleBets
}

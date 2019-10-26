import * as c from "../gameConstants"

//MATHS
export function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max) +1);
}


/**  SENTINELLE SUR LE DISTRIBUTEUR
* @function getDealerPos
* @param {array} playersObj - array des joueurs
*/
export function getDealerPos(playersObj){
  let dealerPos = null
  for ( let i = 0 ; i < c.NB_PLAYER ; i++ ) {
    if ( playersObj[i].isDealer === true ) return i
  }
}

/**  SENTINELLE SUR LA LISTE DES JOUEURS
* @function getNextPlayer
* @param {number} currentPlayerNum - numéro du joueur
* @param {array} playersStatus - array des joueurs
*/
export function getNextPlayer(currentPlayerNum,playersStatus){
  let nextPlayerNum
  let nextPlayerIndex
  if(currentPlayerNum === 4 ) {
    nextPlayerNum = 1
    nextPlayerIndex = playersStatus.findIndex(x => x.playerNum === nextPlayerNum)
  }else{
    nextPlayerNum = playersStatus.find(x => x.playerNum === currentPlayerNum + 1).playerNum
    nextPlayerIndex = playersStatus.findIndex(x => x.playerNum === nextPlayerNum)
  }
  return [playersStatus[nextPlayerNum - 1], nextPlayerNum]
}

/**  SENTINELLE SUR LA LISTE DES JOUEURS
* @function getPrevPlayer
* @param {number} currentPlayerNum - numéro du joueur
* @param {array} playersStatus - array des joueurs
*/
export function getPrevPlayer(currentPlayerNum,playersStatus){
  let prevPlayerNum
  let prevPlayerIndex
  if(currentPlayerNum === 1 ) {
    prevPlayerNum = 4
    prevPlayerIndex = playersStatus.findIndex(x => x.playerNum === prevPlayerNum)
  }else{
    prevPlayerNum = playersStatus.find(x => x.playerNum === currentPlayerNum - 1).playerNum
    prevPlayerIndex = playersStatus.findIndex(x => x.playerNum === prevPlayerNum)
  }
  return [playersStatus[prevPlayerNum - 1], prevPlayerNum]
}

/**  RENVOIE L'ANNONCE LA PLUS FORTE ET LE NUMERO DU JOUEUR L'AYANT FAITE
* @function getBestBettor
* @param {array} playersBet - array des bets
*/
export function getBestBettor(playersBet){
  let bestBettor = [playersBet["bP1"].data,1]
  let bestBettorNum = "bP1"
  for ( let k in playersBet ) {
    let currentBet
    if ( playersBet[k].data.value_bet ) {
      currentBet = playersBet[k].data.value_bet
    }
    if ( parseInt(currentBet) > parseInt(bestBettor[0].value_bet) ) {
      bestBettorNum = k
      bestBettor = [playersBet[k].data,k.slice(-1)]
    }
  }
  return bestBettor
}

/**  RENVOIE L'ANNONCE LA PLUS FORTE ET LE NUMERO DU JOUEUR L'AYANT FAITE PAR EQUIPE
* @function getBestBettorOfTeam
* @param {array} playersBet - array des bets
* @param {array} playersStatus - array des status des joueurs
* @param {number} team - meilleur bet de la team a retourner
*/
export function getBestBettorOfTeam(playersBet, playersStatus, team){
  let playersInTeam
  let bestBettor
  if ( team == 1 ) {
    playersInTeam = [playersStatus[0],playersStatus[2]]
  }else{
    playersInTeam = [playersStatus[1],playersStatus[3]]
  }
  if ( parseInt(playersBet["bP" + playersInTeam[0].playerNum].data.value_bet) > parseInt(playersBet["bP" + playersInTeam[1].playerNum].data.value_bet) ) {
    bestBettor = [playersBet["bP" + playersInTeam[0].playerNum].data, playersInTeam[0].playerNum]
    return bestBettor
  }else{
    bestBettor = [playersBet["bP" + playersInTeam[1].playerNum].data, playersInTeam[1].playerNum]
    return bestBettor
  }
}



/* fonction d'initialisations */
export function definePosition(playersObj){
  let dealerPos = getDealerPos(playersObj)
  switch ( dealerPos ) {
    case 0:
      playersObj[0].playerNum = 4
      playersObj[1].playerNum = 1
      playersObj[1].isBetting = true
      playersObj[2].playerNum = 2
      playersObj[3].playerNum = 3
      return playersObj
    case 1:
      playersObj[0].playerNum = 3
      playersObj[1].playerNum = 4
      playersObj[2].playerNum = 1
      playersObj[2].isBetting = true
      playersObj[3].playerNum = 2
      return playersObj
    case 2:
      playersObj[0].playerNum = 2
      playersObj[1].playerNum = 3
      playersObj[2].playerNum = 4
      playersObj[3].playerNum = 1
      playersObj[3].isBetting = true
      return playersObj
    case 3:
      playersObj[0].playerNum = 1
      playersObj[0].isBetting = true
      playersObj[1].playerNum = 2
      playersObj[2].playerNum = 3
      playersObj[3].playerNum = 4
      return playersObj
    default:
      break
  }
}

export function initPlayersRoles(){
  let playersObj = []
  let dealerPos = getRandomInt(4)
  for ( let i = 0 ; i < c.NB_PLAYER ; i++ ) {
    let isDealer = false
    if(dealerPos === i+1){
      isDealer = true
    }
    if ( i === 0 ) {
      playersObj[i] = {
        isDealer: isDealer,
        isHuman: true,
        team: 1,
        playerNum: 0,
        isBetting: false,
        isPlaying: false
      }
    }else{
      if ( i === 2 ) {
        playersObj[i] = {
          isDealer: isDealer,
          isHuman: false,
          team: 1,
          playerNum: 0,
          isBetting: false,
          isPlaying: false
        }
      }else{
        playersObj[i] = {
          isDealer: isDealer,
          isHuman: false,
          team: 2,
          playerNum: 0,
          isBetting: false,
          isPlaying: false
        }
      }
    }
  }

  let toReturn = definePosition(playersObj)

  return toReturn
}

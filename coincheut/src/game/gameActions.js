import * as c from "./gameConstants"
import * as apiUtils from "../utils/apiUtils"
import * as f from "./utils/functionsUtils"
import { RSAA } from 'redux-api-middleware';


/*  STATUS OF GAME  */
const setStatusDisp = (s) => ({
  type: c.SET_GAME_STATUS,
  status: s
})

export const setStatus = (s) => {
  return dispatch => {
      dispatch(setStatusDisp(s))
  }
}

/* PLAYER ROLES AND TURNS */
const initPR = (playersStatus) => ({
  type: c.INIT_GAME,
  playersStatus: playersStatus
})

export const initPlayersRoles = () => {
  let playersStatus = f.initPlayersRoles()
  if(playersStatus){
    return dispatch => {
        dispatch(initPR(playersStatus))
        dispatch(setStatus("BETTING"))
    }
  }
}

export const setNextBettor = (playerNum, playersBet) => ({
  type: c.SET_NEXT_BETTOR,
  playerNum: playerNum,
  playersBet: playersBet
})



/* BETs */
export const getBet = (isHuman=false, playerNum, bet=null, hand=null, team_bet=null, opposant_bet=null, playersBet = null) => {
  let key = "bP" + playerNum.toString()
  if ( isHuman ) {
    let body = {
      isHuman: true,
      bet: bet,
      hand: hand,
      team_bet: team_bet,
      opposant_bet: opposant_bet
    }
    return dispatch => {
      dispatch(apiUtils.callJSONAPI(c.API_URL_GAME_BETS, key, "POST", body))
      dispatch(setNextBettor(playerNum, playersBet))
    }
  }else{
    let body = {
      isHuman: isHuman,
      hand: hand,
      team_bet: team_bet,
      opposant_bet: opposant_bet
    }
    return dispatch => {
      dispatch(apiUtils.callJSONAPI(c.API_URL_GAME_BETS, key, "POST", body))
      dispatch(setNextBettor(playerNum, playersBet))
    }
  }
}


export const checkBets = (playersBet, currentBettor) => {
  let finalBet = f.getBestBettor(playersBet)
  return dispatch => {
    dispatch({
      type: c.CHECK_BETS,
      playersBet: playersBet,
      currentBettor: currentBettor,
      status: "PLAYING",
      finalBet: finalBet
    })
  }
}

/* HANDS DISTRIBUTION */
export const getGameHands = (newGame,listLastGameCards=[]) => {
  let body={
    newGame: newGame,
    listLastGameCards: listLastGameCards
  }
  return apiUtils.callJSONAPI(c.API_URL_GAME_HANDS, c.API_KEY_GAME_HANDS, "POST", body)
}

export const removeCardFromGand = (cardName,playerNum,state) => {
  return dispatch => {
    dispatch({
      type: "apiUtils|GAME_HANDS|REMOVE",
      cardName: cardName,
      playerNum: playerNum,
      state: state
    })
  }
}


/* FOLD */
const addFold = (card) => ({
  type: c.ADD_TO_FOLD,
  card: card
})

export const addToFold = (card) => {
  return dispatch => {
    dispatch(addFold(card))
  }
}

export const setNewFold = () => {
  return dispatch => {
    dispatch({
      type: c.INIT_FOLD
    })
  }
}

export const getAiMove = (params) => {
  let body =  {
    cards_played: params.cards_played,
    atout: params.atout,
    opening_color: params.opening_color,
    remaining_cards: params.remaining_cards
  }
  return apiUtils.callJSONAPI(c.GET_PLAYED_MOVE_URL, c.GET_PLAYED_MOVE_KEY, "POST", body)
}


/*   CLEANING STATE   */
export const cleanGameState = () => {
  return dispatch => {
    dispatch({
      type: c.CLEAN_STATE
    })
  }
}

export const cleanHands = () => {
  return apiUtils.cleanJSONAPIState(c.API_KEY_GAME_HANDS)
}

export const cleanBets1 = () => {
  return apiUtils.cleanJSONAPIState(c.API_KEY_P1)
}
export const cleanBets2 = () => {
  return apiUtils.cleanJSONAPIState(c.API_KEY_P2)
}
export const cleanBets3 = () => {
  return apiUtils.cleanJSONAPIState(c.API_KEY_P3)
}
export const cleanBets4 = () => {
  return apiUtils.cleanJSONAPIState(c.API_KEY_P4)
}
export const cleanCardPlayed = () => {
  return apiUtils.cleanJSONAPIState(c.GET_PLAYED_MOVE_KEY)
}

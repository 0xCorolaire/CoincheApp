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



/* BETs */
export const getBet = (isHuman=false, playerNum, bet=null, hand=null, team_bet=null, opposant_bet=null) => {
  let key = "P" + playerNum.toString()
  if ( isHuman ) {
    let body = {
      isHuman: true,
      bet: bet,
      hand: hand,
      team_bet: team_bet,
      opposant_bet: opposant_bet
    }
    return apiUtils.callJSONAPI(c.API_URL_GAME_BETS, key, "POST", body)
  }else{
    let body = {
      hand: hand,
      team_bet: team_bet,
      opposant_bet: opposant_bet
    }
    return apiUtils.callJSONAPI(c.API_URL_GAME_BETS, key, "POST", body)
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

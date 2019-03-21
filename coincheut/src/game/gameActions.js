import * as c from "./gameConstants"
import * as apiUtils from "../utils/apiUtils"


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

/* HANDS DISTRIBUTION */
export const getGameHands = (newGame,listLastGameCards=[]) => {
  let body={
    firstGame: newGame,
    listLastGameCards: listLastGameCards
  }
  return apiUtils.callJSONAPI(c.API_URL_GAME_HANDS, c.API_KEY_GAME_HANDS, "POST", body)
}

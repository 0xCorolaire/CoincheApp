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

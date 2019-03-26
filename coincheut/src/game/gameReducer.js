import { combineReducers } from "redux"
import * as apiUtils from "../utils/apiUtils"
import * as c from "./gameConstants"

const initialState = {
    type:"",
    status: "NEW",
    playersStatus: null
}

function GAMEPLAY(state = initialState, action) {
   switch (action.type) {
      case c.SET_GAME_STATUS:
        return {
          ...state,
          status: action.status
        }
      case c.INIT_GAME:
        return {
          ...state,
          playersStatus: action.playersStatus
        }
      default:
        return  state
   }
}

const GAME_BETS = combineReducers({
  [c.API_KEY_P1]: apiUtils.apiReducer(c.API_KEY_P1,{data:{}}),
  [c.API_KEY_P2]: apiUtils.apiReducer(c.API_KEY_P2,{data:{}}),
  [c.API_KEY_P3]: apiUtils.apiReducer(c.API_KEY_P3,{data:{}}),
  [c.API_KEY_P4]: apiUtils.apiReducer(c.API_KEY_P4,{data:{}})
})

export const mainReducer = combineReducers({
  GAMEPLAY,
  [c.API_KEY_GAME_HANDS]: apiUtils.apiReducer(c.API_KEY_GAME_HANDS,{data:{}}),
  GAME_BETS
})

import { combineReducers } from "redux"
import * as c from "./gameConstants"

const initialState = {
    type:"",
    status: "NEW"
}

function GAMEPLAY(state = initialState, action) {
   switch (action.type) {
      case c.SET_GAME_STATUS:
        return {
          ...state,
          status: action.status
        }
       default:
           return  state
   }
}

export const mainReducer = combineReducers({
  GAMEPLAY,
})

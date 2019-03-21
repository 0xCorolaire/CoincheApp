import { combineReducers } from "redux"
import * as c from "./modalConstants"

let init = {
  isActive: false
}

function Modal(state = init, action){
  switch (action.type){
    case c.MODAL_ACTIVATION:
      return {
        ...state,
        isActive: action.isActive
      }
    default:
      return state;
  }
}




export const mainReducer = Modal

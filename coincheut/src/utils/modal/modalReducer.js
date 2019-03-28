import { combineReducers } from "redux"
import * as c from "./modalConstants"

let init = {
  isActive: false,
  type: null,
  value: null
}

function Modal(state = init, action){
  switch (action.type){
    case c.MODAL_ACTIVATION:
      if ( action.isActive === false ) {
        return {
          ...state,
          isActive: action.isActive,
          type: null,
          value: null
        }
      }
      return {
        ...state,
        isActive: action.isActive
      }

    case c.STORE_VALUE:
      return {
        ...state,
        value: action.val
      }
    case c.STORE_TYPE:
      return {
        ...state,
        type: action.t
      }
    default:
      return state;
  }
}




export const mainReducer = Modal

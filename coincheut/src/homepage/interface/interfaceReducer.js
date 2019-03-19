import { combineReducers } from "redux"

function Coinche(state = {}, action){

  return state
}

function Detector(state = {}, action){
  return state
}


export const mainReducer = combineReducers({
  Coinche,
  Detector
})

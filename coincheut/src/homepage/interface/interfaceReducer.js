import { combineReducers } from "redux"
import * as constants from "./interfaceConstants"
import * as apiUtils from "../../utils/apiUtils"

function Coinche(state = {}, action){

  return state
}

function Detector(state = {}, action){
  return state
}


export const mainReducer = combineReducers({
  Coinche,
  Detector,
  [constants.API_KEY_LIST_CARDS]: apiUtils.apiReducer(constants.API_KEY_LIST_CARDS, {data: {}}),
})

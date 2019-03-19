import { combineReducers } from "redux"
import interfaceApp from "./homepage/interface"
import rankingApp from "./homepage/ranking"

export default combineReducers ({
  ["Interface"]: interfaceApp.reducers.mainReducer,
  ["Ranking"]: rankingApp.reducers.mainReducer
})

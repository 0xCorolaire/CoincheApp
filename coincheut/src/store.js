import { combineReducers } from "redux"
import interfaceApp from "./homepage/interface"
import rankingApp from "./homepage/ranking"
import * as modal from "./utils/modal"
import {constants as routingConstants, reducer as routingReducer} from "./utils/routing"
import * as game from "./game"


export default combineReducers ({
  ["Interface"]: interfaceApp.reducers.mainReducer,
  ["Ranking"]: rankingApp.reducers.mainReducer,
  [modal.constants.NAME]: modal.reducers.mainReducer,
  [routingConstants.NAME]: routingReducer,
  [game.constants.NAME]: game.reducers.mainReducer
})

import * as actions from './routingActions'
import * as actionsTypes from './routingActionTypes'
import * as constants from './routingConstants'
import { Router, Route } from './routingComponents'
import reducer from './routingReducer'
import routeManager from './routeManager'
import * as utils from './routingUtils'

export { constants, actions, reducer, routeManager, Router, Route, actionsTypes, utils }
export default { constants, actions, reducer, routeManager, Router, Route, actionsTypes, utils }

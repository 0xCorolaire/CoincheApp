import * as types from './routingActionTypes'
const initialState = {
    pathname:"/",
    query:{}
}

export default function routingReducer(state = initialState, action) {
   switch (action.type) {
       case types.ROUTE_CHANGED:
           return Object.assign({}, state, action.route, {isBlocked: false, blockMessage: undefined})
       case types.ROUTE_WILL_BLOCK:
           return Object.assign({}, state, {isBlocked: true, blockMessage: action.blockMessage})
       case types.ROUTE_WILL_UNBLOCK:
           return Object.assign({}, state, {isBlocked: false, blockMessage: undefined})
       default:
           return  state
   }
}

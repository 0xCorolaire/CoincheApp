import { combineReducers } from "redux"

const initialState = {}

function PlayerHand(state = initialState) {
    return state
}

export const PlayerHandReducer = combineReducers({
    PlayerHand
})

export default PlayerHandReducer
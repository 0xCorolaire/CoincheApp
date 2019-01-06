import { combineReducers } from 'redux'
import {
    GET_POINTS_REQUEST,
    GET_POINTS_ERROR,
    GET_POINTS_SUCCESS,
    GET_LIST_CARDS_REQUEST,
    GET_LIST_CARDS_ERROR,
    GET_LIST_CARDS_SUCCESS,
    GET_RULES_REQUEST,
    GET_RULES_SUCCESS,
    GET_RULES_ERROR,
    SET_GAME_STATUS,
    GET_GAME_HANDS_REQUEST,
    GET_GAME_HANDS_SUCCESS,
    GET_GAME_HANDS_ERROR,
} from '../constants/constants'

function Detector(state = {}, action){
    switch(action.type){
        case GET_POINTS_REQUEST:
            return state

        case GET_POINTS_SUCCESS:
            console.log("reducer : GET_POINTS_SUCCESS")
            state = Object.assign({}, state,{
                nbPoints: action.nbPoints, //ici c'est les data de action donc le même nom
                resImage: action.resImage,
            })
            return state

        case GET_POINTS_ERROR:
            console.error('Erreur reducer')
            return state

        default:
            return state
    }

}

function Coinche(state = {}, action){
    switch(action.type){
        case GET_LIST_CARDS_REQUEST:
          return state;
        case GET_LIST_CARDS_ERROR:
          return state
        case GET_LIST_CARDS_SUCCESS:
          state = Object.assign({}, state,{
              ListCards: action.ListCards,
          })
          return state
        case GET_RULES_REQUEST:
          return state
        case GET_RULES_SUCCESS:
          state = Object.assign({}, state,{
              Rules: action.Rules,
          })
          return state
        case GET_RULES_ERROR:
          return state;
        case SET_GAME_STATUS:
          state = Object.assign({}, state,{
              gameStatus: action.gameStatus,
          })
          return state
        case GET_GAME_HANDS_REQUEST:
          return state;
        case GET_GAME_HANDS_ERROR:
          return state;
        case GET_GAME_HANDS_SUCCESS:
          state = Object.assign({}, state,{
              East_cards: action.East_cards,
              North_cards: action.North_cards,
              West_cards: action.West_cards,
              South_cards: action.South_cards,
              distributed: "yes",
              gameStatus: "started",
          })
          return state
        default:
          return state
    }

}

export default combineReducers({
    Detector,
    Coinche,
})

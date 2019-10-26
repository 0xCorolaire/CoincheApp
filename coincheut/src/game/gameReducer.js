import { combineReducers } from "redux"
import * as apiUtils from "../utils/apiUtils"
import * as c from "./gameConstants"
import * as f from "./utils/functionsUtils"

//init store
const initialState = {
    type:"",
    status: "NEW",
    playersStatus: null,
    finalBet: null,
    isCoinched: false
}

const initialeScoreState = {
  team1_score: 0,
  team2_score: 0,
  limit: 1500
}

const initialFoldState = {
  list_cards: [],
  list_fold_cards: [],
  foldStatus: "NEW"
}




function GAMEPLAY(state = initialState, action) {
   switch ( action.type ) {
      case c.SET_GAME_STATUS:
        return {
          ...state,
          status: action.status
        }
      case c.INIT_GAME:
        return {
          ...state,
          playersStatus: action.playersStatus
        }
      case c.SET_NEXT_BETTOR:
        let currentBettor = state.playersStatus.find(x => x.playerNum === action.playerNum).playerNum
        let nextBettor = f.getNextPlayer(currentBettor,state.playersStatus)
        let newPlayersStatus = []
        state.playersStatus.map((p,id) => {
          if ( p.playerNum === action.playerNum ) {
            p.isBetting = false
          }
          if ( p.playerNum === nextBettor[1] ){
            p.isBetting = true
          }
          newPlayersStatus.push(p)
        })
        return {
          ...state,
          playersStatus: newPlayersStatus
        }
      case c.CHECK_BETS:
        let finalBet = true
        let redistribute = true
        let currentBettorNum = "bP" + action.currentBettor
        for (let k in action.playersBet){
          if ( k !== currentBettorNum ) {
            if ( action.playersBet[k].data.type_bet !== "Pass" ) {
              finalBet = false
            }
          }
          if ( action.playersBet[k].status === "NEW" ) {
            return state
          }
          if ( action.playersBet[k].data.type_bet !== "Pass" ) {
            redistribute = false
          }
        }
        if ( redistribute ) {
          return {
            ...initialState,
            status: "REDISTRIBUTE"
          }
        }
        if ( finalBet ) {
          let newPlayersStatus = []
          state.playersStatus.map((p,id) => {
            p.isBetting = false,
            p.isPlaying = p.playerNum === 1 ? true : false,
            newPlayersStatus.push(p)
          })
          return {
            ...state,
            playersStatus: newPlayersStatus,
            status: action.status,
            finalBet: action.finalBet
          }
        }else{
          return state
        }
      case c.CLEAN_STATE:
        return initialState
      default:
        return  state
   }
}


function SCORE(state = initialeScoreState, action) {
  switch ( action.type ) {




    default:
      return state
  }
}


function CARDS_ORGA(state = initialFoldState, action) {
  switch ( action.type ) {
    case c.ADD_TO_FOLD:
      if ( state.status === "NEW" ) {
        return {
          ...state,
          list_fold_cards: status.list_fold_cards.push(action.card),
          foldStatus: "CURRENT"
        }
      }
      return {
        ...state,
        list_fold_cards: state.list_fold_cards.push(action.card)
      }

    case c.STORE_FOLD_PILE:
      return {
        ...state,
        statusFold: "NEW",
        list_cards: list_cards.concat(state.list_fold_cards),
        list_fold_cards: []
      }


    case c.INIT_FOLD:
      return initialFoldState

    default:
      return state
  }
}

const GAME_CARDS = combineReducers({
  CARDS_ORGA,
  [c.GET_PLAYED_MOVE_KEY]: apiUtils.apiReducer(c.GET_PLAYED_MOVE_KEY,{data:{}})
})


const GAME_BETS = combineReducers({
  [c.API_KEY_P1]: apiUtils.apiReducer(c.API_KEY_P1,{data:{"value_bet": "0", "type_bet": "", "has_ascend": "false"}}),
  [c.API_KEY_P2]: apiUtils.apiReducer(c.API_KEY_P2,{data:{"value_bet": "0", "type_bet": "", "has_ascend": "false"}}),
  [c.API_KEY_P3]: apiUtils.apiReducer(c.API_KEY_P3,{data:{"value_bet": "0", "type_bet": "", "has_ascend": "false"}}),
  [c.API_KEY_P4]: apiUtils.apiReducer(c.API_KEY_P4,{data:{"value_bet": "0", "type_bet": "", "has_ascend": "false"}})
})

export const mainReducer = combineReducers({
  GAMEPLAY,
  [c.API_KEY_GAME_HANDS]: apiUtils.apiReducer(c.API_KEY_GAME_HANDS,{data:{}}),
  GAME_BETS,
  [c.GAME_SCORE]: SCORE,
  GAME_CARDS
})

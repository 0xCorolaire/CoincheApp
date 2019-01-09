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
    STORE_PLAYER_BET,
    STORE_ENNEMY_BET,
    STORE_PARTNER_BET,
    GET_AI_BET_ERROR,
    GET_AI_BET_REQUEST,
    GET_AI_BET_SUCCESS,
    PLAY_CARD,
    GET_AI_MOVE_ERROR,
    GET_AI_MOVE_SUCCESS,
    GET_AI_MOVE_REQUEST,
    GET_CURRENT_FOLD_RESULT_SUCCESS,
    GET_CURRENT_FOLD_RESULT_REQUEST,
    GET_CURRENT_FOLD_RESULT_ERROR,
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
          if(action.first_tour=='True'){
            state = Object.assign({}, state,{
                East_cards: action.East_cards,
                North_cards: action.North_cards,
                West_cards: action.West_cards,
                South_cards: action.South_cards,
                distributed: "yes",
                gameStatus: "started",
                first_tour: 'False',
                next_player: "player",
                dealer:"ennemy2",
            })
          }else if(state.dealer=="ennemy2"){
            state = Object.assign({}, state,{
                East_cards: action.East_cards,
                North_cards: action.North_cards,
                West_cards: action.West_cards,
                South_cards: action.South_cards,
                distributed: "yes",
                gameStatus: "started",
                first_tour: 'False',
                next_player: "ennemy1",
                dealer:"player"
            })
          }else if(state.dealer=="player"){
            state = Object.assign({}, state,{
                East_cards: action.East_cards,
                North_cards: action.North_cards,
                West_cards: action.West_cards,
                South_cards: action.South_cards,
                distributed: "yes",
                gameStatus: "started",
                first_tour: 'False',
                next_player: "partner",
                dealer:"ennemy1"
            })
          }else if(state.dealer=="ennemy1"){
            state = Object.assign({}, state,{
                East_cards: action.East_cards,
                North_cards: action.North_cards,
                West_cards: action.West_cards,
                South_cards: action.South_cards,
                distributed: "yes",
                gameStatus: "started",
                first_tour: 'False',
                next_player: "ennemy2",
                dealer:"partner"
            })
          }else if(state.dealer=="partner"){
            state = Object.assign({}, state,{
                East_cards: action.East_cards,
                North_cards: action.North_cards,
                West_cards: action.West_cards,
                South_cards: action.South_cards,
                distributed: "yes",
                gameStatus: "started",
                first_tour: 'False',
                next_player: "player",
                dealer:"ennemy2"
            })
          }
          return state
        case STORE_PLAYER_BET:
          state = Object.assign({}, state,{
              player_bet: action.player_bet,
              last_bettor: "player",
              next_bettor: "ennemy1"
          })
          return state
        case STORE_ENNEMY_BET:
          state = Object.assign({}, state,{
              ennemy_bet: action.ennemy_bet,
              last_bettor: action.ennemy
          })
          return state
        case STORE_PARTNER_BET:
          state = Object.assign({}, state,{
              partner_bet: action.partner_bet,
              last_bettor: "partner",
              next_bettor: "ennemy2",
          })
          return state
        case GET_AI_BET_REQUEST:
          return state
        case GET_AI_BET_ERROR:
          return state
        case GET_AI_BET_SUCCESS:
          let lb = state.last_bettor;
          if(lb=="player"){
            state = Object.assign({}, state,{
                ennemy_bet: action.bet,
                last_bet: action.bet,
                last_bettor: "ennemy1",
                next_bettor: "partner"
            })
          }else if(lb=="ennemy1"){
            state = Object.assign({}, state,{
                partner_bet: action.bet,
                last_bet: action.bet,
                last_bettor: "partner",
                next_bettor: "ennemy2",
            })
          }else if(lb=="partner"){
            state = Object.assign({}, state,{
                ennemy_bet: action.bet,
                last_bet: action.bet,
                last_bettor: "ennemy2",
                next_bettor: "player",
            })
          }else if(lb=="ennemy2"){
            state = Object.assign({}, state,{
                player_bet: action.bet,
                last_bet: action.bet,
                last_bettor: "player",
                next_bettor: "ennemy1",
            })
          }
          return state
        case PLAY_CARD:
          const list_card = [...state.South_cards];
          const res = list_card.filter(item => item['card_name'] !== action.pileCard['card_name']);
          const addCard = action.pileCard
          let fold_template;
          if(action.atout.toLowerCase()==addCard['card_name'][addCard['card_name'].length -1]){
            fold_template = {
              "played_by": "South",
              "card_name" : addCard['card_name'].slice(0, -1),
              "card_color": addCard['card_name'][addCard['card_name'].length -1],
              "value": addCard['value_atout'],
              "is_atout": "True",
            }
          }else{
            fold_template = {
              "played_by": "South",
              "card_name" : addCard['card_name'].slice(0, -1),
              "card_color": addCard['card_name'][addCard['card_name'].length -1],
              "value": addCard['value_non_atout'],
              "is_atout": "False",
            }
          }
          let sum=state.sum_current+fold_template['value']
          let opc =""
          if(state.current_fold.length==0){
            opc=addCard['card_name'][addCard['card_name'].length -1];
          }else{
            opc=action.openi
          }
          return {
            ...state,
            South_cards: res,
            pileCard: [...state.pileCard, action.pileCard],
            last_player: action.last_player,
            next_player: action.next_player,
            cards_played: [...state.cards_played, action.pileCard],
            current_fold: [...state.current_fold, fold_template],
            opening_color: opc,
            sum_current: sum,
          };
        case GET_AI_MOVE_REQUEST:
          return {
            ...state,
            last_player: action.last_player,
            next_player: action.next_player,
          }
        case GET_AI_MOVE_ERROR:
          return state
        case GET_AI_MOVE_SUCCESS:
          if(state.last_player==="ennemy1"){
            const list_card = [...state.West_cards];
            const res = list_card.filter(item => item['card_name'] !== action.pileCard['card_name']);
            const addCard = action.pileCard
            let opc
            let fold_template
            if(action.atout.toLowerCase()==addCard['card_name'][addCard['card_name'].length -1]){
              fold_template = {
                "played_by": "West",
                "card_name" : addCard['card_name'].slice(0, -1),
                "card_color": addCard['card_name'][addCard['card_name'].length -1],
                "value": addCard['value_atout'],
                "is_atout": "True",
              }
            }else{
              fold_template = {
                "played_by": "West",
                "card_name" : addCard['card_name'].slice(0, -1),
                "card_color": addCard['card_name'][addCard['card_name'].length -1],
                "value": addCard['value_non_atout'],
                "is_atout": "False",
              }
            }
            let sum=state.sum_current+fold_template['value']
            if(state.current_fold.length==0){
              opc=addCard['card_name'][addCard['card_name'].length -1];
            }else{
              opc=action.openi
            }
            return {
              ...state,
              West_cards: res,
              pileCard: [...state.pileCard, action.pileCard],
              cards_played: [...state.cards_played, action.pileCard],
              current_fold: [...state.current_fold, fold_template],
              opening_color: opc,
              sum_current: sum,
            };
          }else if(state.next_player==="ennemy2" && action.next!=="player"){
            const list_card = [...state.North_cards];
            const res = list_card.filter(item => item['card_name'] !== action.pileCard['card_name']);
            const addCard = action.pileCard
            let opc
            let fold_template
            if(action.atout.toLowerCase()==addCard['card_name'][addCard['card_name'].length -1]){
              fold_template = {
                "played_by": "North",
                "card_name" : addCard['card_name'].slice(0, -1),
                "card_color": addCard['card_name'][addCard['card_name'].length -1],
                "value": addCard['value_atout'],
                "is_atout": "True",
              }
            }else{
              fold_template = {
                "played_by": "North",
                "card_name" : addCard['card_name'].slice(0, -1),
                "card_color": addCard['card_name'][addCard['card_name'].length -1],
                "value": addCard['value_non_atout'],
                "is_atout": "False",
              }
            }
            let sum=state.sum_current+fold_template['value']
            if(state.current_fold.length==0){
              opc=addCard['card_name'][addCard['card_name'].length -1];
            }else{
              opc=action.openi
            }
            return {
              ...state,
              North_cards: res,
              pileCard: [...state.pileCard, action.pileCard],
              cards_played: [...state.cards_played, action.pileCard],
              current_fold: [...state.current_fold, fold_template],
              opening_color: opc,
              sum_current: sum,
            };
          }else if(action.next==="player"){
            const list_card = [...state.East_cards];
            const res = list_card.filter(item => item['card_name'] !== action.pileCard['card_name']);
            const addCard = action.pileCard
            let opc
            if(action.atout.toLowerCase()==addCard['card_name'][addCard['card_name'].length -1]){
              fold_template = {
                "played_by": "East",
                "card_name" : addCard['card_name'].slice(0, -1),
                "card_color": addCard['card_name'][addCard['card_name'].length -1],
                "value": addCard['value_atout'],
                "is_atout": "True",
              }
            }else{
              fold_template = {
                "played_by": "East",
                "card_name" : addCard['card_name'].slice(0, -1),
                "card_color": addCard['card_name'][addCard['card_name'].length -1],
                "value": addCard['value_non_atout'],
                "is_atout": "False",
              }
            }
            let sum=state.sum_current+fold_template['value']
            if(state.current_fold.length==0){
              opc=addCard['card_name'][addCard['card_name'].length -1];
            }else{
              opc=action.openi
            }
            return {
              ...state,
              East_cards: res,
              pileCard: [...state.pileCard, action.pileCard],
              cards_played: [...state.cards_played, action.pileCard],
              current_fold: [...state.current_fold, fold_template],
              opening_color: opc,
              last_player: "ennemy2",
              sum_current: sum,
            };
          }
        case GET_CURRENT_FOLD_RESULT_REQUEST:
          return state
        case GET_CURRENT_FOLD_RESULT_ERROR:
          return state
        case GET_CURRENT_FOLD_RESULT_SUCCESS:
          //nb de points dans le pli
          const total = state.sum_current
          let curr_tot
          let next
          //on attribue a quelqun ce prix
          if(action.winner==="South"){
            curr_tot = {
              "player":total,
              "ennemy":0,
            }
            next="player"
          }else if(action.winner==="North"){
            curr_tot = {
              "player":total,
              "ennemy":0,
            }
            next="partner"
          }else if(action.winner==="East"){
            curr_tot = {
              "player":0,
              "ennemy":total,
            }
            next="ennemy2"
          }else if(action.winner==="West"){
            curr_tot = {
              "player":0,
              "ennemy":total,
            }
            next="ennemy1"
          }
          //Ajouter a la somme
          const score = {
            "player": state.game_points['player']+curr_tot['player'],
            "ennemy": state.game_points['ennemy']+curr_tot['ennemy'],
          }
          return {
            ...state,
            current_points: curr_tot,
            next_player: next,
            current_fold: [],
            cards_played: [],
            game_points: score,
            opening_color: "none",
            sum_current: 0,
          };
        default:
          return state
    }

}

export default combineReducers({
    Detector,
    Coinche,
})

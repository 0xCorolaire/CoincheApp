import {
    GET_POINTS_REQUEST,
    GET_POINTS_ERROR,
    GET_POINTS_SUCCESS,
    GET_LIST_CARDS_REQUEST,
    GET_LIST_CARDS_SUCCESS,
    GET_LIST_CARDS_ERROR,
    GET_RULES_REQUEST,
    GET_RULES_ERROR,
    GET_RULES_SUCCESS,
    SET_GAME_STATUS,
    GET_GAME_HANDS_REQUEST,
    GET_GAME_HANDS_SUCCESS,
    GET_GAME_HANDS_ERROR,
} from '../constants/constants'

import {
    getPointsFromCards,
    getListCards,
    getRules,
    getGameHands,
} from '../utils/apiCalls'

export function getPointsRequest(){
    console.log("action getPoints request")
    return {
        type: GET_POINTS_REQUEST,
    }
}

export function getPointsSuccess(data){
    console.log("action getPoinsSuccess")
    return {
        type: GET_POINTS_SUCCESS,
        nbPoints: data.userId,  //ici mettre les data reçues par l'api
        resImage: data.title,
    }
}

export function getPointsError(error){
    console.log("action getPointsError")
    return {
        type: GET_POINTS_ERROR,
        error,
    }
}

export function getPoints(image){
    console.log("action getPoints")
    return (dispatch) => {
        dispatch(getPointsRequest())
        getPointsFromCards((data) =>{
            dispatch(getPointsSuccess(data))
        },
        (error) => {
            dispatch(getPointsError(error))
        })
    }
}

//Liste des cartes
export function getListCardsRequest(){
    return {
        type: GET_LIST_CARDS_REQUEST,
    }
}

export function getListCardsSuccess(data){
    return {
        type: GET_LIST_CARDS_SUCCESS,
        ListCards: data,  //ici mettre les data reçues par l'api
    }
}

export function getListCardsError(error){
    return {
        type: GET_LIST_CARDS_ERROR,
        error,
    }
}

export function getListCardsCoinche(){
    return (dispatch) => {
        dispatch(getListCardsRequest())
        getListCards((data) =>{
            dispatch(getListCardsSuccess(data))
        },
        (error) => {
            dispatch(getListCardsError(error))
        })
    }
}

//Règles du jeu
export function getRulesRequest(){
    return {
        type: GET_RULES_REQUEST,
    }
}

export function getRulesSucess(data){
    return {
        type: GET_RULES_SUCCESS,
        Rules: data,  //ici mettre les data reçues par l'api
    }
}

export function getRulesError(error){
    return {
        type: GET_RULES_ERROR,
        error,
    }
}

export function getRulesCoinche(){
    return (dispatch) => {
        dispatch(getRulesRequest())
        getRules((data) =>{
            dispatch(getRulesSucess(data))
        },
        (error) => {
            dispatch(getRulesError(error))
        })
    }
}



//setGameMode
export function setGameStatus(value){
  return{
    type: SET_GAME_STATUS,
    gameStatus: value,
  }
}

//Création des mains pour les joueurs
export function getGameHandsRequest(){
    return {
        type: GET_GAME_HANDS_REQUEST,
    }
}

export function getGameHandsSuccess(data){
    return {
        type: GET_GAME_HANDS_SUCCESS,
        East_cards: data['East'],
        North_cards: data['North'],
        West_cards: data['West'],
        South_cards: data['South'],
    }
}

export function getGameHandsError(error){
    return {
        type: GET_GAME_HANDS_ERROR,
        error,
    }
}

export function getGameHandsCoinche(bool,list){
    return (dispatch) => {
        dispatch(getGameHandsRequest())
        getGameHands(bool,list,(data) =>{
            dispatch(getGameHandsSuccess(data))
        },
        (error) => {
            dispatch(getGameHandsError(error))
        })
    }
}

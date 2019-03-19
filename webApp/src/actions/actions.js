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
    STORE_PARTNER_BET,
    STORE_ENNEMY_BET,
    STORE_PLAYER_BET,
    STORE_ENNEMYB_BET,
    GET_AI_BET_REQUEST,
    GET_AI_BET_ERROR,
    GET_AI_BET_SUCCESS,
    PLAY_CARD,
    CAN_PLAY_ERROR,
    CAN_PLAY_REQUEST,
    CAN_PLAY_SUCCESS,
    GET_AI_MOVE_ERROR,
    GET_AI_MOVE_SUCCESS,
    GET_AI_MOVE_REQUEST,
    GET_CURRENT_FOLD_RESULT_SUCCESS,
    GET_CURRENT_FOLD_RESULT_REQUEST,
    GET_CURRENT_FOLD_RESULT_ERROR,
    SET_WINNER,
    SEND_GAME_RESULT_REQUEST,
    SEND_GAME_RESULT_SUCCESS,
    SEND_GAME_RESULT_ERROR,
} from '../constants/constants'

import {
    getPointsFromCards,
    getListCards,
    getRules,
    getGameHands,
    getAiBet,
    canPlay,
    getAiNormalMove,
    evaluateFold,
    sendResult,
} from '../utils/apiCalls'

export function getPointsRequest(){
    return {
        type: GET_POINTS_REQUEST,
    }
}

export function getPointsSuccess(data){
    return {
        type: GET_POINTS_SUCCESS,
        nbPoints: data.userId,  //ici mettre les data reçues par l'api
        resImage: data.title,
    }
}

export function getPointsError(error){
    return {
        type: GET_POINTS_ERROR,
        error,
    }
}

export function getPoints(image){
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

export function getGameHandsSuccess(data,bool){
    return {
        type: GET_GAME_HANDS_SUCCESS,
        East_cards: data['East'],
        North_cards: data['North'],
        West_cards: data['West'],
        South_cards: data['South'],
        first_tour: bool,
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
            dispatch(getGameHandsSuccess(data,bool))
        },
        (error) => {
            dispatch(getGameHandsError(error))
        })
    }
}


//Store des annonces
export function storePlayerBet(data){
  return{
    type: STORE_PLAYER_BET,
    player_bet: data,
  }
}
export function storeEnnemyBBet(data,n){
  return{
    type: STORE_ENNEMYB_BET,
    ennemyb_bet: data,
    ennemyb:n
  }
}

export function storeEnnemyBet(data,n){
  return{
    type: STORE_ENNEMY_BET,
    ennemy_bet: data,
    ennemy:n
  }
}
export function storePartnerBet(data){
  return{
    type: STORE_PARTNER_BET,
    partner_bet: data,
  }
}

//Get une annonce de l'ai
export function getAiBetRequest(){
    return {
        type: GET_AI_BET_REQUEST,
    }
}

export function getAiBetSuccess(data){
    return {
        type: GET_AI_BET_SUCCESS,
        bet:data
    }
}

export function getAiBetError(error){
    return {
        type: GET_AI_BET_ERROR,
        error,
    }
}

export function getAiBetCoinche(player_hand,partner_bet,ennemy_bet){
    return (dispatch) => {
        dispatch(getAiBetRequest())
        getAiBet(player_hand,partner_bet,ennemy_bet,(data) =>{
            dispatch(getAiBetSuccess(data))
        },
        (error) => {
            dispatch(getAiBetError(error))
        })
    }
}


//Playing a card
export function playCard(card,p,nextp,opening_color,atout){
  return{
    type: PLAY_CARD,
    pileCard: card,
    last_player: p,
    next_player: nextp,
    openi: opening_color,
    atout: atout,
  }
}

// retourne la liste de cartes que le joueur peut jouer
export function canPlayRequest(){
    return {
        type: CAN_PLAY_REQUEST,
    }
}

export function canPlaySuccess(data){
    return {
        type: CAN_PLAY_SUCCESS,
        list_card_playable:data
    }
}

export function canPlayError(error){
    return {
        type: CAN_PLAY_ERROR,
        error,
    }
}

export function canPlayCoinche(cards_played,atout,opening_color,remaining_cards){
    return (dispatch) => {
        dispatch(canPlayRequest())
        canPlay(cards_played,atout,opening_color,remaining_cards,(data) =>{
            dispatch(canPlaySuccess(data))
        },
        (error) => {
            dispatch(canPlayError(error))
        })
    }
}


//Fais jouer une carte à un AI
export function getAiMoveRequest(p1,nextp){
    return {
        type: GET_AI_MOVE_REQUEST,
        last_player: p1,
        next_player: nextp,
    }
}

export function getAiMoveSuccess(data,opening_color,atout,next){
    return {
        type: GET_AI_MOVE_SUCCESS,
        pileCard: data[0],
        openi: opening_color,
        atout: atout,
        next: next,
    }
}

export function getAiMoveError(error){
    return {
        type: GET_AI_MOVE_ERROR,
        error,
    }
}

export function getAiMoveCoinche(cards_played,atout,opening_color,remaining_cards,p1,nextp){
    return (dispatch) => {
        dispatch(getAiMoveRequest(p1,nextp))
        getAiNormalMove(cards_played,atout,opening_color,remaining_cards,(data) =>{
            dispatch(getAiMoveSuccess(data,opening_color,atout,nextp))
        },
        (error) => {
            dispatch(getAiMoveError(error))
        })
    }
}

// Evalue un pli
export function getCurrentFoldResultRequest(){
    return {
        type: GET_CURRENT_FOLD_RESULT_REQUEST,
    }
}

export function getCurrentFoldResultSuccess(data){
    return {
        type: GET_CURRENT_FOLD_RESULT_SUCCESS,
        winner: data['played_by']
    }
}

export function getCurrentFoldResulError(error){
    return {
        type: GET_CURRENT_FOLD_RESULT_ERROR,
        error,
    }
}

export function getCurrentFoldResult(atout,cards_in_fold){
    return (dispatch) => {
        dispatch(getCurrentFoldResultRequest())
        evaluateFold(atout,cards_in_fold,(data) =>{
            dispatch(getCurrentFoldResultSuccess(data))
        },
        (error) => {
            dispatch(getCurrentFoldResulError(error))
        })
    }
}

export function setWinner(w){
  return {
    type:SET_WINNER,
    winner: w,
  }
}
//Envoyer le resultat d'une game
export function sendGameResultRequest(){
    return {
        type: SEND_GAME_RESULT_REQUEST,
    }
}

export function sendGameResultSuccess(data){
    return {
        type: SEND_GAME_RESULT_SUCCESS,
        success: data
    }
}

export function sendGameResultError(error){
    return {
        type: SEND_GAME_RESULT_ERROR,
        error,
    }
}

export function sendGameResult(has_won,points_done,final_bettor,team_personnal,team_opponent,list_bet){
    return (dispatch) => {
        dispatch(sendGameResultRequest())
        sendResult(has_won,points_done,final_bettor,team_personnal,team_opponent,list_bet,(data) =>{
            dispatch(sendGameResultSuccess(data))
        },
        (error) => {
            dispatch(sendGameResultError(error))
        })
    }
}

export const NAME = "GAME"

//API CONSTANTS
export const API_URL = "http://vps631503.ovh.net:8000/"

//GET HANDS
export const API_KEY_GAME_HANDS = "GAME_HANDS"
export const API_URL_GAME_HANDS = API_URL + "getGameHands"

//GET GAME_BETS
export const API_KEY_P1 = "bP1"
export const API_KEY_P2 = "bP2"
export const API_KEY_P3 = "bP3"
export const API_KEY_P4 = "bP4"

export const API_URL_GAME_BETS = API_URL + "getAiBet"
export const API_KEY_GAME_BETS = "GAME_BETS"

//TYPES
export const SET_GAME_STATUS = "STATUS"
export const INIT_GAME = "GAME_PLAYERS"
export const SET_NEXT_BETTOR = "SET_NEXT_BETTOR"
export const CHECK_BETS = "CHECK_BETS"
export const INIT_FOLD = "INIT_FOLD"
export const GET_PLAYED_MOVE_KEY = "PLAYED_MOVE"
export const GET_PLAYED_MOVE_URL = API_URL + "getAiNormalMove"
export const ADD_TO_FOLD = "ADD_TO_FOLD"
export const STORE_FOLD_PILE = "STORE_FOLD_PILE"
export const EVALUATE_FOLD = "EVALUATE_FOLD"



export const CLEAN_STATE = "CLEAN_STATE"


//CST
export const NB_PLAYER = 4
export const NB_CARDS = 32
export const GAMEPLAY = "GAMEPLAY"
export const GAME_CARDS = "GAME_CARDS"
export const CARDS_ORGA = "CARDS_ORGA"
export const GAME_SCORE = "GAME_SCORE"
export const STATUS = "status"
export const finalBet = "finalBet"
export const playersStatus = "playersStatus"

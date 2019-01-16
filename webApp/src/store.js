import {applyMiddleware, createStore, compose} from 'redux'
import thunk from 'redux-thunk'
import SmartCards from './reducers/reducer'

const initialStore= {
    Detector: {
        resImage: null,
        nbPoints: null
    },
    Coinche: {
        nbPlayer: 4,
        nbCards:32,
        ListCards: [],
        Rules:[],
        gameStatus:"null",
        first_tour: "null",
        dealer: "null",
        East_cards: [],
        West_cards: [],
        North_cards: [],
        South_cards: [],
        distributed: "no",
        ennemy_bet: {"type_bet":null,"value_bet":"0"},
        ennemy_bet2: {"type_bet":null,"value_bet":"0"},
        partner_bet: {"type_bet":null,"value_bet":"0"},
        player_bet: {"type_bet":null,"value_bet":"0"},
        last_bet: {"type_bet":null,"value_bet":"0"},
        last_bettor: "none",
        next_bettor: "none",
        pileCard: [],
        list_card_playable: [],
        current_fold: [],
        cards_played:[],
        sum_current:0,
        last_player: "none",
        next_player: "none",
        opening_color: "null",
        //Game matching points
        game_points: {
          "player":0,
          "ennemy":0,
        },
        current_points: {
          "player":0,
          "ennemy":0,
        },
        gameWinner: "null",
        sended: "null",
    }
}




export const store = createStore(
    SmartCards,
    initialStore,
    compose(
      applyMiddleware(thunk),
      window.devToolsExtension ? window.devToolsExtension() : f => f))

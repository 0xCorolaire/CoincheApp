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
        East_cards: [],
        West_cards: [],
        North_cards: [],
        South_cards: [],
        distributed: "no",
    }
}




export const store = createStore(
    SmartCards,
    initialStore,
    compose(
      applyMiddleware(thunk),
      window.devToolsExtension ? window.devToolsExtension() : f => f))

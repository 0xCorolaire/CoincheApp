import { createHashHistory } from 'history'
import queryString from 'query-string'
import * as t from './routingActionTypes'
import * as constants from './routingConstants'
import * as actions from './routingActions'
import Path from 'path-parser'

class routeManager{
    constructor(){
        this.onRouteChanged = this.onRouteChanged.bind(this)
        this.handleRouteChanged = this.handleRouteChanged.bind(this)
    }

    onRouteChanged(route){
        return {
            type: t.ROUTE_CHANGED,
                route
        }
    }

    handleRouteChanged(route) {
        return (dispatch) => {
            dispatch(this.onRouteChanged(route))
            let url = route.pathname + route.search
            for (let h in this.handlersChanged) {
                let parser = new Path(h)
                if (parser.partialTest(url, 1)) {
                    dispatch(this.handlersChanged[h](route))
                }
            }
        }
    }

    getUserConfirmation(message, callback, store){
        if(window.confirm(message)){ //gets message from history.block
            store.dispatch(actions.onRouteWillUnBlock())
            callback(true)
        }else{



            window.location.hash = "#" + this.history.location.pathname + this.history.location.search
        }

    }

    setStore(store, history = createHashHistory({
            getUserConfirmation: (message, callback) => {this.getUserConfirmation(message, callback, store)}
        })){
        this.history = history;
        this.history.listen((route, action) => {
            if(action === "PUSH" || action === "POP" || action === "REPLACE")
            {
                route.query = queryString.parse(route.search)
                store.dispatch(this.handleRouteChanged(route))
            }
        })

        this.history.block(() => {
            let state = store.getState()
            if(state[constants.NAME].isBlocked){
                return state[constants.NAME].blockMessage
            }
        })

        store.dispatch(this.handleRouteChanged(Object.assign({}, history.location , {query:queryString.parse(history.location.search)})))
    }

    goTo(route){
        this.history.push(route)
    }

    goBack(){
        this.history.goBack()
    }

    SubscribeRouteChanged (subscribedPath, handler) {
        if (this.handlersChanged == null) this.handlersChanged = {}
        this.handlersChanged[subscribedPath] = handler
    }

    UnSubscribeRouteChanged (subscribedPath) {
        if(this.handlersChanged[subscribedPath] != null) delete this.handlersChanged[subscribedPath]
    }
}

export default new routeManager()

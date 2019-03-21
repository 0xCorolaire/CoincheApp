import React from "react"
import ReactDOM from "react-dom"
import App from "./app"
import {createStore, compose, applyMiddleware } from "redux"
import { apiMiddleware } from 'redux-api-middleware';
import {Provider} from "react-redux"
import thunk from "redux-thunk"
import rootReducer from './store'
import * as apiUtils from "./utils/apiUtils"
import routing from "./utils/routing"


let store





store = createStore(rootReducer, {}, applyMiddleware(thunk, apiUtils.apiMiddleware))

const routeManager = routing.routeManager

routeManager.setStore(store)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
  , document.getElementById('app')
);

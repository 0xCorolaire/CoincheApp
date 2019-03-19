import React from "react"
import ReactDOM from "react-dom"
import App from "./app"
import {createStore, compose, applyMiddleware} from "redux"
import {Provider} from "react-redux"
import thunk from "redux-thunk"
import globalReducer from './store'


let store

store = createStore(
    globalReducer,
    {},
    compose(
      applyMiddleware(thunk),
      window.devToolsExtension ? window.devToolsExtension() : f => f))


ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
  , document.getElementById('app')
);

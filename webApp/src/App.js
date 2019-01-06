import React, { Component } from 'react';
import './App.css';
import Menu from './containers/Menu/menu'
import Game from './containers/Game/game'

import {connect} from 'react-redux'
import { setGameStatus } from './actions/actions'


class App extends Component {
  render() {
    const { gameStatus, distributed } = this.props
    const { setGameStatus } = this.props
    let toShow;
    if(distributed=="yes"){
      toShow=(<Game></Game>)
    }else if(gameStatus=="null"||gameStatus=="starting"){
      toShow=(<Menu></Menu>)
    }
    return (
      toShow
    )
  }
}

let mapStateToProps = (state)=>{
  return{
    //mettre ce qu'on veut faire passer en props du composant
    gameStatus: state.Coinche.gameStatus || "null",
    distributed: state.Coinche.distributed || "no",
  };
}

let mapDispatchToProps = (dispatch)=>{
  return{
    //Fonctions ici
    setGameStatus: (st) => dispatch(setGameStatus(st)),
  }
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

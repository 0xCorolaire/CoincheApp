import React from "react"
import ReactDOM from "react-dom"
import { Link } from "react-router-dom"
import {connect} from "react-redux"
import routing from "../utils/routing"
import * as c from "./gameConstants"
import * as a from "./gameActions"

import { BetModal, actions } from "../utils/modal"

import { PlayerHand } from "./components"

import ApiStatus from "../utils/apiStatus"

class GameComponent extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount(){
    this.props.setStatus("STARTED")
    this.props.getGameHands("True")
    this.props.initPlayersRoles()
  }

  componentDidUpdate(){

  }

  _getBet(){
    let bet = {
      "value_bet": 80,
      "type_bet": "D"
    }
    this.props.getBet(true,2,bet,null,null,null)
  }

  render(){
    let status = this.props.handsdeal.status
    if(status === "LOADING"){
      return (<ApiStatus />)
    }

    let infoLabel = this.props.type === "solo" ? (<span className="label-solo"></span>) : <span className="label-online"></span>

    return (
      <div className="game fullHeight fullWidth">
        <div className="menu-info" onClick={() => {this._getBet()}}>
          {infoLabel}
        </div>
        <div className="player-hand fullHeight fullWidth">
            <PlayerHand/>
        </div>
        <BetModal className="modal" modalTitle={"BET"} modalComponent={(<div>TEST</div>)}/>
      </div>
    )
  }
};


const mapStateToProps = (state) => {
  return {
    routing: state[routing.constants.NAME],
    game: state[c.NAME],
    handsdeal: state[c.NAME][c.API_KEY_GAME_HANDS],
    initPlayersRoles: state[c.NAME][c.INIT_GAME]
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setStatus: (s) => dispatch(a.setStatus(s)),
    getGameHands: (newGame,lastListCards) => dispatch(a.getGameHands(newGame,lastListCards)),
    initPlayersRoles: () => dispatch(a.initPlayersRoles()),
    modalActivation: (sym) => dispatch(actions.modalActivation(sym)),
    getBet:  (isHuman, playerNum, bet, hand, team_bet, opposant_bet) => dispatch(a.getBet(isHuman, playerNum, bet, hand, team_bet, opposant_bet)),
  }
}

const GameContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(GameComponent)

export default GameContainer;

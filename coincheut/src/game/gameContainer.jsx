import React from "react"
import ReactDOM from "react-dom"
import {connect} from "react-redux"
import routing from "../utils/routing"
import * as c from "./gameConstants"
import * as a from "./gameActions"

import { BetModal, actions } from "../utils/modal"

import { PlayerHandContainer, GameMenuContainer } from "./components"

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
    let userIsBetting = this.props.playerStatus.find(x => x.isHuman===true).isBetting === true
    if(userIsBetting){
      let user = this.props.playerStatus.find(x => x.isHuman===true)
      let bet = {
        "value_bet": 80,
        "type_bet": "D"
      }
      console.log(user)
      this.props.getBet(true,user.playerNum,bet,null,null,null)
    }
  }

  render(){
    let status = this.props.handsdeal.status
    if(status === "LOADING"){
      return (<ApiStatus />)
    }

    let infoLabel = this.props.type === "solo" ? (<span className="label-solo"></span>) : <span className="label-online"></span>
    return (
      <div className="game fullHeight fullWidth">
        <div className="menu-solo"  onClick={() => {this._getBet()}}>
          <GameMenuContainer menuTitle={infoLabel} />
        </div>

        <div className="menu-info">
        </div>
        <div className="player-hand fullHeight fullWidth">
            <PlayerHandContainer/>
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
    playerStatus: state[c.NAME][c.GAMEPLAY][c.playersStatus]
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

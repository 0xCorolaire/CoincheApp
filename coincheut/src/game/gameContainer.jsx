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

  componentWillUnmount(){
    this.props.cleanGameState()
    this.props.cleanHands()
    this.props.cleanBets2()
    this.props.cleanBets1()
    this.props.cleanBets3()
    this.props.cleanBets4()
  }

  render(){
    let status = this.props.handsdeal.status
    let players = this.props.playersStatus
    if(status === "LOADING" || !players ){
      return (<ApiStatus />)
    }
    let infoLabel = this.props.type === "solo" ? (<span className="label-solo"></span>) : <span className="label-online"></span>
    return (
      <div className="game fullHeight fullWidth">
        <div className="menu-solo" >
          <GameMenuContainer menuTitle={infoLabel} />
        </div>
        <div className="players-hand fullHeight fullWidth">
            {
              players.map(( p , id ) => {
                let className = "hand-" + id
                return (<PlayerHandContainer key={id} handNum={p.playerNum} team={p.team} userHand={p.isHuman} className={className} isBetting={p.isBetting} getBet={this.props.getBet} playersBet={this.props.playersBet} activeModal={this.props.modalActivation}/>)
              })
            }
            <div className="fold">OKOKOKOK</div>
        </div>
        <BetModal className="modal" modalTitle={"ANNONCE"} modalComponent={(<div>TEST</div>)} getBet={this.props.getBet} playerNum={this.props.playersStatus.find(x => x.isHuman===true).playerNum} playersBet={this.props.playersBet}/>
      </div>
    )
  }
};


const mapStateToProps = (state) => {
  return {
    routing: state[routing.constants.NAME],
    game: state[c.NAME],
    handsdeal: state[c.NAME][c.API_KEY_GAME_HANDS],
    playersStatus: state[c.NAME][c.GAMEPLAY][c.playersStatus],
    playersBet: state[c.NAME][c.API_KEY_GAME_BETS]
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setStatus: (s) => dispatch(a.setStatus(s)),
    getGameHands: (newGame,lastListCards) => dispatch(a.getGameHands(newGame,lastListCards)),
    initPlayersRoles: () => dispatch(a.initPlayersRoles()),
    modalActivation: (sym) => dispatch(actions.modalActivation(sym)),
    getBet:  (isHuman, playerNum, bet, hand, team_bet, opposant_bet, lb) => dispatch(a.getBet(isHuman, playerNum, bet, hand, team_bet, opposant_bet, lb)),
    cleanGameState: () => dispatch(a.cleanGameState()),
    cleanHands: () => dispatch(a.cleanHands()),
    cleanBets1: () => dispatch(a.cleanBets1()),
    cleanBets2: () => dispatch(a.cleanBets2()),
    cleanBets3: () => dispatch(a.cleanBets3()),
    cleanBets4: () => dispatch(a.cleanBets4())

  }
}

const GameContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(GameComponent)

export default GameContainer;

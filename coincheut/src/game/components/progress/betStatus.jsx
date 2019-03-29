import React from 'react';
import NProgress from 'nprogress';
import {connect} from "react-redux"
import routing from "../../../utils/routing"
import * as c from "../../gameConstants"
import * as a from "../../gameActions"
import * as f from "../../utils/functionsUtils"


/* eslint-disable react/prefer-stateless-function */
class BetStatusComp extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      timer: null
    }
  }
  betStatusStart(){
    NProgress.start();
  };

  betStatusEnd(){
    clearTimeout(this.state.timer);
    this.state.timer = setTimeout(() => {
      NProgress.done();
      NProgress.remove();
      if(!this.props.isHuman && this.props.gamePhase.status === "BETTING"){
        let team_bet
        let opposant_bet
        if(this.props.playerTeam === 1 ) {
          team_bet = f.getBestBettorOfTeam(this.props.playersBet, this.props.playersStatus, this.props.playerTeam)[0]
          opposant_bet = f.getBestBettorOfTeam(this.props.playersBet, this.props.playersStatus, this.props.playerTeam + 1)[0]
        }else{
          team_bet = f.getBestBettorOfTeam(this.props.playersBet, this.props.playersStatus, this.props.playerTeam)[0]
          opposant_bet = f.getBestBettorOfTeam(this.props.playersBet, this.props.playersStatus, this.props.playerTeam - 1)[0]
        }
        this.props.getBet(false,this.props.playerNum,null,this.props.playerHand,team_bet,opposant_bet, this.props.playersBet)
      }
    }, this.props.stopDelayMs);
  };

  componentDidMount() {
    const { options } = this.props;
    if (options) {
      NProgress.configure(options);
    }
    //Wait for 2sec and set fire getBet
    this.betStatusStart()
    this.betStatusEnd()
  }

  componentWillUnmount(){
    //When the bet is done it unmount
    clearTimeout(this.state.timer);
  }

  render() {
    return (<div className="spinner" role="spinner"><div className="spinner-icon"></div></div>)
  }
}
const mapStateToProps = (state) => {
    return {
      handsdeal: state[c.NAME][c.API_KEY_GAME_HANDS],
      playersStatus: state[c.NAME][c.GAMEPLAY][c.playersStatus],
      playersBet: state[c.NAME][c.API_KEY_GAME_BETS],
      gamePhase: state[c.NAME][c.GAMEPLAY]
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
    }
}

const BetStatus = connect(
    mapStateToProps,
    mapDispatchToProps
)(BetStatusComp)

export default BetStatus;

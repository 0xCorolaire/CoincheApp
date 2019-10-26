import React from 'react';
import NProgress from 'nprogress';
import {connect} from "react-redux"
import routing from "../../../utils/routing"
import * as c from "../../gameConstants"
import * as a from "../../gameActions"
import * as f from "../../utils/functionsUtils"

/**
* @class PlayStatus
* @property {string/number} stopDelayMs
* @property {string} atout atout of the game
* @property {array} playerHand array of card of the curr player
* @property {boolean} isHuman if user is human
*/

class PlayStatusComp extends React.Component {
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
      let requestMove = {}
      if ( !this.props.isHuman ) {
        if ( this.props.gameOrga.foldStatus === "NEW" ) {
          requestMove.atout = this.props.atout
          requestMove.cards_played = this.props.gameOrga.list_fold_cards
          requestMove.remaining_cards = this.props.playerHand
          requestMove.opening_color = null
          this.props.getAiMove(requestMove)
        } else {
          requestMove.atout = this.props.atout
          requestMove.cards_played = this.props.gameOrga.list_fold_cards
          requestMove.remaining_cards = this.props.playerHand
          requestMove.opening_color = this.props.gameOrga.list_fold_cards[0].card_name.slice(-1)
          this.props.getAiMove(requestMove)
        }
      }
    }, this.props.stopDelayMs)

    this.state.timer = setTimeout(() => {
      NProgress.done();
      NProgress.remove();
      let requestMove = {}
      if ( !this.props.isHuman ) {
        console.log("ok")
      }
    }, this.props.stopDelayMs + 1000)
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
      gameOrga: state[c.NAME][c.GAME_CARDS][c.CARDS_ORGA]
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
      addToFold: (card) => dispatch(a.addToFold(card)),
      getAiMove: (params) => dispatch(a.getAiMove(params))
    }
}

const PlayStatus = connect(
    mapStateToProps,
    mapDispatchToProps
)(PlayStatusComp)

export default PlayStatus;

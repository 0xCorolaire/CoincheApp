import React from 'react';
import ReactDOM from "react-dom"
import {connect} from "react-redux"
import { modalActivation } from "./modalActions"
import { BetSelector } from "../BetSelector"
import * as c from "./modalConstants"

import "./modal.scss"

/**
* @class BetModal
* @property {string} modalTitle => title of modal with player to bet
* @property {component} modalComponent => component to render inside modal
* @property {function} getBet => send the call API of a bet
* @property {object} playerNum => user that is betting num
* @property {object} playerBet => array of bets
*/
class BetModalComp extends React.Component {

  _storeUserAction(){
    let bet = {
      "value_bet": this.props.modal.value,
      "type_bet": this.props.modal.type,
      "has_ascend": "false"
    }
    this.props.getBet(true, this.props.playerNum, bet, null, null, null, this.props.playersBet)
    this.props.modalActivation(false)
  }

  render(){
    return (
        <div className="bet-user">
            <div className="modal-wrapper"
                style={{
                    transform: this.props.modal.isActive ? 'translateY(0vh)' : 'translateY(-100vh)',
                    opacity: this.props.modal.isActive ? '1' : '0'
                }}>
                <div className="modal-header">
                    <h2>{this.props.modalTitle}</h2>
                </div>
                <div className="modal-body">
                    <div className="bet-component fullHeight fullWidth">
                      <div className="bet-value">
                        <BetSelector minBet={90} isActive={this.props.modal.isActive}/>
                      </div>
                    </div>
                </div>
                <div className="modal-footer">
                    <div className="btn-passe" onClick={() => {this._storeUserAction()}}>PASSE</div>
                    <div className="btn-bet" onClick={() => {this._storeUserAction()}}>VALIDER</div>
                </div>
            </div>
        </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    modal: state[c.NAME],
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    modalActivation: (sym) => dispatch(modalActivation(sym))
  }
}

const BetModal = connect(
  mapStateToProps,
  mapDispatchToProps
)(BetModalComp)

export default BetModal;

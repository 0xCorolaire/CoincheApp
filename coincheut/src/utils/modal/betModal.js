import React from 'react';
import ReactDOM from "react-dom"
import {connect} from "react-redux"
import { modalActivation, storeType } from "./modalActions"
import { BetSelector } from "../BetSelector"
import * as c from "./modalConstants"

import "./modal.scss"

/**
* @class BetModal
* @property {string} modalTitle => title of modal with player to bet
* @property {component} modalComponent => component to render inside modal
* @property {function} getBet => send the call API of a bet
* @property {object} playerNum => user that is betting num
* @property {object} playersBet => array of bets
* @property {number} minBet => Minimum Bet to send
* @property {string} status => status
*/
class BetModalComp extends React.Component {

  _storeType(type){
    this.props.storeType(type)
  }

  _storeUserAction(type){
    let bet = {
      "value_bet": this.props.modal.value,
      "type_bet": this.props.modal.type,
      "has_ascend": "false"
    }
    let passBet = {
      "value_bet": "0",
      "type_bet": "Pass",
      "has_ascend": "false"
    }
    if ( type === "PASS" ) {
      this.props.getBet(true, this.props.playerNum, passBet, null, null, null, this.props.playersBet)
      this.props.modalActivation(false)
    }else{
      if ( this.props.modal.type && this.props.modal.value ){
        this.props.getBet(true, this.props.playerNum, bet, null, null, null, this.props.playersBet)
        this.props.modalActivation(false)
      }
    }
  }

  componentDidUpdate() {
    if ( this.props.status === "PLAYING" && this.props.modal.isActive === true) {
      this.props.modalActivation(false)
    }
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
                        <BetSelector minBet={this.props.minBet} isActive={this.props.modal.isActive}/>
                      </div>
                      <div className="bet-type">
                        <div className="special-types">
                          <div key={"TA"} className={this.props.modal.type === "TA" ? "btn-type active" : "btn-type"} onClick={() => {this._storeType("TA")}}>
                            TOUT ATOUT
                          </div>
                          <div key={"SA"} className={this.props.modal.type === "SA" ? "btn-type active" : "btn-type"} onClick={() => {this._storeType("SA")}}>
                            SANS ATOUT
                          </div>
                        </div>
                        <div className="normal-types">
                          <div key={"C"} className={this.props.modal.type === "C" ? "btn-type c active" : "btn-type c"} onClick={() => {this._storeType("C")}}>
                          </div>
                          <div key={"H"} className={this.props.modal.type === "H" ? "btn-type h active" : "btn-type h"} onClick={() => {this._storeType("H")}}>
                          </div>
                          <div key={"S"} className={this.props.modal.type === "S" ? "btn-type s active" : "btn-type s"} onClick={() => {this._storeType("S")}}>
                          </div>
                          <div key={"D"} className={this.props.modal.type === "D" ? "btn-type d active" : "btn-type d"} onClick={() => {this._storeType("D")}}>
                          </div>
                        </div>
                      </div>
                    </div>
                </div>
                <div className="modal-footer">
                    <div className="btn-passe" onClick={() => {this._storeUserAction("PASS")}}>PASSE</div>
                    <div className="btn-bet" onClick={() => {this._storeUserAction("")}}>VALIDER</div>
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
    modalActivation: (sym) => dispatch(modalActivation(sym)),
    storeType: (t) => dispatch(storeType(t))
  }
}

const BetModal = connect(
  mapStateToProps,
  mapDispatchToProps
)(BetModalComp)

export default BetModal;

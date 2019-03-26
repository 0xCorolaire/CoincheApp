import React from 'react';
import ReactDOM from "react-dom"
import {connect} from "react-redux"
import { modalActivation } from "./modalActions"
import * as c from "./modalConstants"

import "./modal.scss"

/**
* @class BetModal
* @property {string} modalTitle => title of modal with player to bet
* @property {component} modalComponent => component to render inside modal
* @property {function} getBet => send the call API of a bet
* @property {object} playerNum => user that is betting num
*/
class BetModalComp extends React.Component {

  _storeUserAction(){

    let bet = {
      "value_bet": 80,
      "type_bet": "D"
    }
    this.props.getBet(true,this.props.playerNum,bet,null,null,null)
    this.props.modalActivation(false)
  }

  render(){
    return (
        <div>
            <div className="modal-wrapper"
                style={{
                    transform: this.props.isActive.isActive ? 'translateY(0vh)' : 'translateY(-100vh)',
                    opacity: this.props.isActive.isActive ? '1' : '0'
                }}>
                <div className="modal-header">
                    <h2>{this.props.modalTitle}</h2>
                </div>
                <div className="modal-body">
                    <div className="bet-component fullHeight fullWidth">
                      {this.props.modalComponent}
                    </div>
                </div>
                <div className="modal-footer">
                  <div className="actions">
                    <button className="btn-pass" onClick={() => {this._storeUserAction()}}>PASSE</button>
                    <button className="btn-bet" onClick={() => {this._storeUserAction()}}>VALIDER</button>
                  </div>
                </div>
            </div>
        </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    isActive: state[c.NAME]
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

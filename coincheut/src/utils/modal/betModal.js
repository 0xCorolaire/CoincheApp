import React from 'react';
import ReactDOM from "react-dom"
import {connect} from "react-redux"
import { modalActivation } from "./modalActions"
import * as c from "./modalConstants"

import "./modal.scss"

/**
* @class BetModal
* @property {string} modalTitle => title of modal with player to bet
* @property {component} modalComponent => compoentn to render inside modal
*/
class BetModalComp extends React.Component {

  _storeUserAction(){


    
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
                    {this.props.modalComponent}
                </div>
                <div className="modal-footer">
                    <button className="btn-bet" onClick={() => {this.props._storeUserAction()}}>BET</button>
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

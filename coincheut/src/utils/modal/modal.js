import React from 'react';
import ReactDOM from "react-dom"
import {connect} from "react-redux"
import { modalActivation } from "./modalActions"
import * as c from "./modalConstants"

import "./modal.scss"

/* PROPERTY
* modalTitle [string] => title of modal
* modalComponent [component] => compoentn to render inside modal
*
*/
class modalComp extends React.Component {

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
                    <span className="close-modal-btn" onClick={() => {this.props.modalActivation(false)}}>×</span>
                </div>
                <div className="modal-body">
                    {this.props.modalComponent}
                </div>
                <div className="modal-footer">
                    <button className="btn-cancel" onClick={() => {this.props.modalActivation(false)}}>CLOSE</button>
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

const Modal = connect(
  mapStateToProps,
  mapDispatchToProps
)(modalComp)

export default Modal;

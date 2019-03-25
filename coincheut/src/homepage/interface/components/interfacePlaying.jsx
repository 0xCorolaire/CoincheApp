import React from "react"
import ReactDOM from "react-dom"
import {connect} from "react-redux"
import routing from "../../../utils/routing"

import {Modal} from "../../../utils/modal"
import ReglesContainer from "./reglesContainer"

import * as mdl from "../../../utils/modal"


class InterfacePlayingComponent extends React.Component {

  _loadGame(type){
    let url = "/"+type+"game"
    this.props.routeChange(url)
  }

  render(){
    return (
      <div className="playingInterface fullHeight fullWidth">
        <div className="first-row-hexa">
            <div className="solo">
                <div className="label" onClick={() => {this._loadGame("solo")}}>
                </div>
                <div className="description" onClick={() => {this._loadGame("solo")}}>
                  Joues à la coinche pour t'entraîner ou pour faire passer le temps contre une Intelligence Artificielle !
                </div>
              <div className="rules" onClick={() => {this.props.modalActivation(true)}}>
              </div>
            </div>
          <div className="online">
            <div className="label" onClick={() => {this._loadGame("online")}}>
            </div>
            <div className="description" onClick={() => {this._loadGame("online")}}>
              Joues à la coinche en ligne contre d'autres joueurs et affrontes des joueurs de ton niveau !
            </div>
            <div className="rules" onClick={() => {this.props.modalActivation(true)}}>
            </div>
          </div>
        </div>
        <div className="second-row-hexa">
            <div className="add-score">
              <div className="label">
              </div>
            </div>
        </div>
        <Modal className="modal"
              modalTitle="Règles"
              modalComponent={<ReglesContainer/>}/>
      </div>
    )
  }
};


const mapStateToProps = (state) => {
  return {
    routing: state[routing.constants.NAME]

  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    modalActivation: (sym) => dispatch(mdl.actions.modalActivation(sym)),
    routeChange: (url) => dispatch(routing.actions.goTo(url))
  }
}

const InterfacePlayingContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(InterfacePlayingComponent)

export default InterfacePlayingContainer;

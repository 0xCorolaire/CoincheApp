import React from "react"
import ReactDOM from "react-dom"
import { Link } from "react-router-dom"

class InterfacePlayingContainer extends React.Component {
  render(){
    return (
      <div className="playingInterface fullHeight fullWidth">
        <div className="first-row-hexa">
          <div className="solo">
            <div className="label">
            </div>
            <div className="description">
              Joues à la coinche pour t'entraîner ou pour faire passer le temps contre une Intelligence Artificielle !
            </div>
            <div className="rules">
            </div>
          </div>
          <div className="online">
            <div className="label">
            </div>
            <div className="description">
              Joues à la coinche en ligne contre d'autres joueurs et affrontes des joueurs de ton niveau !
            </div>
            <div className="rules">
            </div>
          </div>
        </div>
        <div className="second-row-hexa">
            <div className="add-score">
              <div className="label">
              </div>
            </div>
        </div>
      </div>
    )
  }
};

export default InterfacePlayingContainer

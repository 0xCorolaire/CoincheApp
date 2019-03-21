import React from "react"
import ReactDOM from "react-dom"
import { Link } from "react-router-dom"
import {connect} from "react-redux"
import routing from "../utils/routing"
import * as c from "./gameConstants"
import * as a from "./gameActions"
import ApiStatus from "../utils/apiStatus"

class GameComponent extends React.Component {

  componentDidMount(){
    this.props.setStatus("STARTED")
    this.props.getGameHands("True")
  }

  render(){
    let status = this.props.handsdeal.status
    if(status !== "SUCCESS"){
      return (<ApiStatus />)
    }

    return (
      <div className="game fullHeight fullWidth">
        BRUH
      </div>
    )
  }
};


const mapStateToProps = (state) => {
  return {
    routing: state[routing.constants.NAME],
    game: state[c.NAME],
    handsdeal: state[c.NAME][c.API_KEY_GAME_HANDS]

  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setStatus: (s) => dispatch(a.setStatus(s)),
    getGameHands: (newGame,lastListCards) => dispatch(a.getGameHands(newGame,lastListCards)),
  }
}

const GameContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(GameComponent)

export default GameContainer;

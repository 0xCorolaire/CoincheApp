import React from "react"
import ReactDOM from "react-dom"
import { Link } from "react-router-dom"
import {connect} from "react-redux"
import routing from "../utils/routing"
import * as c from "./gameConstants"
import * as a from "./gameActions"




class GameComponent extends React.Component {

  componentDidMount(){
    this.props.setStatus("STARTED")
  }

  render(){
    console.log(this.props.game)

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
    game: state[c.NAME]

  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setStatus: (s) => dispatch(a.setStatus(s)),
  }
}

const GameContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(GameComponent)

export default GameContainer;

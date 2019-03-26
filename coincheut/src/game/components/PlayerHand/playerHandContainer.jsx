import React from "react"
import {connect} from "react-redux"
import routing from "../../../utils/routing"
import * as c from "../../gameConstants"
import * as a from "../../gameActions"

/**
* @class PlayerHandComponent
* @property {string} handNum - affiliate to playerNum to match hand
*/
class PlayerHandComponent extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount(){



  }

  componentDidUpdate(){

  }

  render(){
    return (
      <div>TEST LOL WAGOU</div>
    )
  }
}

const mapStateToProps = (state) => {
    return {
      routing: state[routing.constants.NAME],
      game: state[c.NAME],
      handsdeal: state[c.NAME][c.API_KEY_GAME_HANDS],
      playersStatus: state[c.NAME][c.GAMEPLAY][c.playersStatus]
    }
}

const mapDispatchToProps = (dispatch) => {
    return {

    }
}

const PlayerHandContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(PlayerHandComponent)

export default PlayerHandContainer

import React from "react"
import {connect} from "react-redux"

import "./ShowAnnounce.scss"

/**
* @class PlayerHandComponent
* @property {string} value_bet - value to display
* @property {string} type_bet - type to display
* @property {string} location - where to show announce
*/
class ShowAnnounceComponent extends React.Component {
  constructor(props) {
    super(props)

  }

  render() {
    let className = "show-announce " + this.props.location
    if ( this.props.type_bet === "Pass" ) {
      return(<div className={className}>
          <div className="value-passe fullWidth">Passe</div>
        </div>)
    }
    return(<div className={className}>
        <div className="value">{this.props.value_bet}</div><div className={this.props.type_bet}></div>
      </div>)
  }

}


const mapStateToProps = (state) => {
    return {

    }
}

const mapDispatchToProps = (dispatch) => {
    return {

    }
}

const ShowAnnounce = connect(
    mapStateToProps,
    mapDispatchToProps
)(ShowAnnounceComponent)

export default ShowAnnounce

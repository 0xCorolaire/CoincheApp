import React from "react"
import ReactDOM from "react-dom"
import {connect} from "react-redux"
import routing from "../../../utils/routing"
import * as c from "../../gameConstants"
import * as a from "../../gameActions"


class GameMenuComponent extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      showContent: false
    }
  }

  componentDidMount(){

  }

  _toggle(){
    this.setState({
      showContent: !this.state.showContent
    })
  }

  render(){
    let show = this.state.showContent
    let content
    if ( show ) {
      content = (
        <div className="menu-content-params">
          <div className="row-menu-content">
            <div className="row-menu-icon params"><div className="params fullWidth fullHeight"></div></div>
            <span className="row-menu-label">Paramètres</span>
          </div>
          <div className="row-menu-content">
            <div className="row-menu-icon"><div className="rejouer fullWidth fullHeight"></div></div>
            <span className="row-menu-label">Rejouer</span>
          </div>
          <div className="row-menu-content">
            <div className="row-menu-icon accueil"><div className="accueil fullWidth fullHeight"></div></div>
            <span className="row-menu-label">Accueil</span>
          </div>
        </div>
      )
    }else{
      content = null
    }

    return (
      <div className="menu-content fullWidth fullHeight">
          <div className="menu-content-title" onClick={() => {this._toggle()}}>
            {this.props.menuTitle}
            {
              show
                ?
                <span className="icon expanded"></span>
                :
                <span className="icon"></span>
            }
          </div>
          {show &&
            content
          }
      </div>
    )
  }
};


const mapStateToProps = (state) => {
  return {
    routing: state[routing.constants.NAME],
    game: state[c.NAME],
    playerStatus: state[c.NAME][c.INIT_GAME]
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

const GameMenuContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(GameMenuComponent)

export default GameMenuContainer

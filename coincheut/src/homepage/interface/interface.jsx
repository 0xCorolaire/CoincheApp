import React from "react"
import ReactDOM from "react-dom"
import { InterfacePlayingContainer } from "./components"
import {connect} from "react-redux"
import * as actions from "./interfaceActions"
import * as c from "./interfaceConstants"



class InterfaceComponent extends React.Component {

  componentDidMount(){
     this.props.fetchListCards()
  }

  render(){
    return (
      <div className="interface fullHeight fullWidth">
        <div className="container">
            <div className="headerInterface">
              <div className="headerEcriture">
              </div>
              <div className="headerIcone">
              </div>
            </div>
            <InterfacePlayingContainer/>
        </div>
      </div>
    )
  }
};

const mapStateToProps = (state) => {
  return {
    listCards: state[c.NAME][c.API_KEY_LIST_CARDS],
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchListCards: () => dispatch(actions.fetchListCards()),
  }
}

const InterfaceContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(InterfaceComponent)

export default InterfaceContainer

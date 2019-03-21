import React from "react"
import ReactDOM from "react-dom"
import { HomePageContainer } from "./homepage"
import { GameContainer } from "./game"
import { mainLayoutContainer } from "./mainLayoutContainer"

import {connect} from "react-redux"
import routing from "./utils/routing"


import "css/appStyles.scss"

const [Route, Router] = [routing.Route, routing.Router]
const soloProps = {
  type: "solo"
}

const onlineProps = {
  type: "online"
}

class AppComp extends React.Component {
  render(){
    return(
      <Router className="fullWidth fullHeight" currentRoute={this.props.routing}>
          <Route key="interface" path="/interface"  component={HomePageContainer} className="fullWidth fullHeight"/>
          <Route key="sologame" path="/sologame"  component={GameContainer} componentProps={soloProps} className="fullWidth fullHeight"/>
          <Route key="onlinegame" path="/onlinegame"  component={GameContainer} componentProps={onlineProps} className="fullWidth fullHeight"/>
      </Router>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    routing: state[routing.constants.NAME]
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

const App = connect(
  mapStateToProps,
  mapDispatchToProps
)(AppComp)

export default App;

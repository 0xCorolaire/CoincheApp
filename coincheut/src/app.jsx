import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom"
import { HomePageContainer } from "./homepage"

import "css/appStyles.scss"

class App extends React.Component {
  render(){

    return(
      <Router className="fullWidth fullHeight">
        <Switch className="fullWidth fullHeight">
          <Route path="/" component={HomePageContainer} className="fullWidth fullHeight"/>
          <Route path="/game" component={HomePageContainer} className="fullWidth fullHeight"/>
        </Switch>
      </Router>
    )
  }
}

export default App

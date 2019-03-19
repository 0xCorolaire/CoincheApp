import React from "react"
import ReactDOM from "react-dom"
import { InterfaceContainer } from "./interface"
import { RankingContainer } from "./ranking"

import "css/appStyles.scss"

class HomePageContainer extends React.Component {
  render(){

    return(
      <div className="coinche fullWidth fullHeight">
        <InterfaceContainer />
        <RankingContainer />
      </div>
    )
  }
}

export default HomePageContainer

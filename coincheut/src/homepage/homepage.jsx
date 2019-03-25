import React from "react"
import ReactDOM from "react-dom"
import { InterfaceContainer } from "./interface"
import { RankingContainer } from "./ranking"
import routing from "../utils/routing"
import {connect} from "react-redux"
import ApiStatus from "../utils/apiStatus"


import "css/appStyles.scss"

class HomePageComponent extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      loaded: false
    }
  }
  componentDidMount(){
    setTimeout(() => {
      this.setState({loaded: true})
    }, 2000)
  }
  render(){
    if(this.state.loaded===false){
      return (<ApiStatus />)
    }
    return(
      <div className="coinche fullWidth fullHeight" >
        <InterfaceContainer />
        <RankingContainer />
      </div>
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

const HomePageContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePageComponent)

export default HomePageContainer

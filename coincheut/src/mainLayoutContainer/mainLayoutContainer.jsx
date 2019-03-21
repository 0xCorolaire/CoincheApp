import React from "react"
import ReactDOM from "react-dom"
import {connect} from "react-redux"
import routing from "../utils/routing"

class mainLayoutComponent extends React.Component {
  constructor(props){
    super(props)

  }

  render(){
    let isRenderedPath = this.props.routing.pathname
    console.log(this.props)
    return(
      <div className="fullWidth fullHeight">
        {this.props.children}
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

const mainLayoutContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(mainLayoutComponent)

export default mainLayoutContainer

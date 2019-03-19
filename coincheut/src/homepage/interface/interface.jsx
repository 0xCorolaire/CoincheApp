import React from "react"
import ReactDOM from "react-dom"
import { InterfacePlayingContainer } from "./components"

class InterfaceContainer extends React.Component {
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

export default InterfaceContainer

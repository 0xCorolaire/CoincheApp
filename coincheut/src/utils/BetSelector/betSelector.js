import React from 'react';
import ReactDOM from "react-dom"
import {connect} from "react-redux"
import * as f from "./utils/functionsUtils"
import * as a from "../modal/modalActions"
import * as c from "../modal/modalConstants"

import "./betSelector.scss"

/**
* @class BetSelector
* @property {number} minBet => minimum bet to possible show
* @property {boolean} isActive => minimum bet to possible show
*/
class BetSelectorComp extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      possibleBets: [],
      selectedBet: null
    }
  }

  componentDidMount(){
    let sliced = f.getPossibleBets(this.props.minBet)
    sliced.push("CAPOT")
    this.props.storeValue(sliced[0].toString())
    this.setState({
      possibleBets: sliced,
      selectedBet: sliced[0]
    })
  }

  _changeValue(type){
    switch ( type ) {
      case "left":
        if ( this.state.possibleBets[this.state.possibleBets.indexOf(this.state.selectedBet) - 1] ){
          this.props.storeValue(this.state.possibleBets[this.state.possibleBets.indexOf(this.state.selectedBet) - 1].toString())
          this.setState({
            selectedBet: this.state.possibleBets[this.state.possibleBets.indexOf(this.state.selectedBet) - 1]
          })
        }
        break
      case "right":
        if ( this.state.possibleBets[this.state.possibleBets.indexOf(this.state.selectedBet) + 1] ){
          this.props.storeValue(this.state.possibleBets[this.state.possibleBets.indexOf(this.state.selectedBet) + 1].toString())
          this.setState({
            selectedBet: this.state.possibleBets[this.state.possibleBets.indexOf(this.state.selectedBet) + 1]
          })
        }
        break
    }
  }

  render(){
    return (
        <div className="bet-selector fullHeight fullWidth">
          <div className="bet-selector-left" onClick={() => this._changeValue("left")}>
          </div>
            <span className="selected-bet-value-left">
              {this.state.possibleBets[this.state.possibleBets.indexOf(this.state.selectedBet) - 1] &&
                this.state.possibleBets[this.state.possibleBets.indexOf(this.state.selectedBet) - 1]
              }
            </span>
          <span className="selected-bet-value">
            {this.state.selectedBet}
          </span>
            <span className="selected-bet-value-right">
              {this.state.possibleBets[this.state.possibleBets.indexOf(this.state.selectedBet) + 1] &&
                this.state.possibleBets[this.state.possibleBets.indexOf(this.state.selectedBet) + 1]
              }
            </span>
          <div className="bet-selector-right" onClick={() => this._changeValue("right")}>
          </div>
        </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    storeValue: (v) => dispatch(a.storeValue(v)),
    storeType: (t) => dispatch(a.storeType(t))
  }
}

const BetSelector = connect(
  mapStateToProps,
  mapDispatchToProps
)(BetSelectorComp)

export default BetSelector;

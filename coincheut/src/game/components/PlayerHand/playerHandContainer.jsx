import React from "react"
import {connect} from "react-redux"
import routing from "../../../utils/routing"
import * as c from "../../gameConstants"
import * as a from "../../gameActions"

/**
* @class PlayerHandComponent
* @property {string} handNum - affiliate to playerNum to match hand
* @property {boolean} userHand - if true, card are revealed and set to bottom
* @property {number} team - if 1: horizontal, 2 : vertical
* @property {string} className - if 1: horizontal, 2 : vertical
*/
class PlayerHandComponent extends React.Component {
  constructor(props) {
    super(props)

  }

  componentDidUpdate(){

  }

  render(){
    let hand = this.props.handsdeal.data["P"+this.props.handNum]
    let disposition = "list-cards-" + this.props.team
    let userHand = this.props.userHand
    let className = this.props.className


    return (
      <div className={className}>
        {userHand &&
          <div className={disposition}>
            {
              hand.map((card, id) => {
                if(this.props.gamePhase!=="BETTING"){


                  return(
                    <span className="card" onClick={() => {this.props.removeCardFromGand(hand[id].card_name, this.props.handNum, this.props.handsdeal.data)}}>{card.card_name}</span>
                  )
                }else{

                  return(
                    <span className="card">{card.card_name}</span>
                  )
                }
              })
            }
          </div>
        }
        {!userHand &&
          <div className={disposition}>
            {
              hand.map((card, id) => {
                if(this.props.gamePhase!=="BETTING"){


                  return(
                    <span className="card" onClick={() => {this.props.removeCardFromGand(hand[id].card_name, this.props.handNum, this.props.handsdeal.data)}}>{card.card_name}</span>
                  )
                }else{

                  return(
                    <span className="card">{card.card_name}</span>
                  )
                }
              })
            }
          </div>
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
    return {
      routing: state[routing.constants.NAME],
      game: state[c.NAME],
      handsdeal: state[c.NAME][c.API_KEY_GAME_HANDS],
      playersStatus: state[c.NAME][c.GAMEPLAY][c.playersStatus],
      gamePhase: state[c.NAME][c.GAMEPLAY]["status"]
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
      removeCardFromGand: (card,playerNum,s) => dispatch(a.removeCardFromGand(card,playerNum,s)),
    }
}

const PlayerHandContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(PlayerHandComponent)

export default PlayerHandContainer

import React from "react"
import {connect} from "react-redux"
import routing from "../../../utils/routing"
import * as c from "../../gameConstants"
import * as a from "../../gameActions"
import * as f from "../../utils/functionsUtils"
import BetStatus from '../progress/progressContainer';

/**
* @class PlayerHandComponent
* @property {string} handNum - affiliate to playerNum to match hand
* @property {boolean} userHand - if true, card are revealed and set to bottom
* @property {number} team - if 1: horizontal, 2 : vertical
* @property {string} className - if 1: horizontal, 2 : vertical
* @property {booelan} isBetting - if true, set spinner and bet actions
* @property {function} getBet - getBet function passed threw props
* @property {array} playersBet - array of bets
*/
class PlayerHandComponent extends React.Component {
  constructor(props) {
    super(props)

  }

  componentDidMount(){
    let doCheck = true
    for ( let k in this.props.playersBet ) {
      if( this.props.playersBet[k].status === "LOADING" ) {
          doCheck = false
      }
    }
    if ( this.props.gamePhase === "BETTING" && doCheck ){
      if ( this.props.isBetting && this.props.playersBet["bP" + f.getPrevPlayer(this.props.handNum,this.props.playersStatus)[1]].status !== "LOADING"){
        if ( this.props.userHand ) {
          this.props.activeModal(true)
        }
        this.props.checkBets(this.props.playersBet, this.props.handNum)
      }
    }

  }

  componentDidUpdate(){
    let doCheck = true
    for ( let k in this.props.playersBet ) {
      if( this.props.playersBet[k].status === "LOADING" ) {
          doCheck = false
      }
    }

    if ( this.props.gamePhase === "BETTING" && doCheck ){
      if ( this.props.isBetting && this.props.playersBet["bP" + f.getPrevPlayer(this.props.handNum,this.props.playersStatus)[1]].status !== "LOADING"){
        if ( this.props.userHand ) {
          this.props.activeModal(true)
        }
        this.props.checkBets(this.props.playersBet, this.props.handNum)
      }
    }
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
                    <span key={card.card_name} className="card" onClick={() => {this.props.removeCardFromGand(hand[id].card_name, this.props.handNum, this.props.handsdeal.data)}}>{card.card_name}</span>
                  )
                }else{

                  return(
                    <span key={card.card_name} className="card">{card.card_name}</span>
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
                    <span key={card.card_name} className="card" onClick={() => {this.props.removeCardFromGand(hand[id].card_name, this.props.handNum, this.props.handsdeal.data)}}>{card.card_name}</span>
                  )
                }else{

                  return(
                    <span key={card.card_name} className="card">{card.card_name}</span>
                  )
                }
              })
            }
          </div>
        }
        {this.props.playersBet["bP" + this.props.handNum].data.type_bet !== "" && this.props.playersBet["bP" + this.props.handNum].data.type_bet !== "Pass" &&
          <div>
            ANNONCE : {this.props.playersBet["bP" + this.props.handNum].data.value_bet} - {this.props.playersBet["bP" + this.props.handNum].data.type_bet}
          </div>
        }
        {this.props.playersBet["bP" + this.props.handNum].data.type_bet === "Pass" &&
          <div>
            ANNONCE : PASSE
          </div>
        }
        {this.props.isBetting && this.props.gamePhase === "BETTING" &&
          <div id="nprogressH">
            <BetStatus
              stopDelayMs="4000"
              getBet={this.props.getBet}
              playerNum={this.props.handNum}
              playerHand={hand}
              playerTeam={this.props.team}
              playersBet={this.props.playersBet}
              isHuman={userHand}
              options={{target: '#nprogressH'}}
            />
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
      gamePhase: state[c.NAME][c.GAMEPLAY]["status"],
      playersBet: state[c.NAME][c.API_KEY_GAME_BETS]
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
      removeCardFromGand: (card, playerNum, s) => dispatch(a.removeCardFromGand(card,playerNum,s)),
      checkBets: (playersBet, currentBettor) => dispatch(a.checkBets(playersBet,currentBettor)),
    }
}

const PlayerHandContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(PlayerHandComponent)

export default PlayerHandContainer

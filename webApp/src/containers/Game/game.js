import React, { Component } from 'react';
import '../../App.css';
import {connect} from 'react-redux'
import 'bootstrap/dist/css/bootstrap.min.css';
import { withStyles } from '@material-ui/core/styles';


class Game extends Component {
  componentWillMount(){
    const {ListCards, nbPlayer, nbCards} = this.props;
  }
  render(){
    const {South_cards,East_cards,West_cards,North_cards} = this.props
    let i;
    let player_cards=[]
    let part_cards=[]
    let opp_cards=[]

    for(i=0; i<South_cards.length; i++){
      let pcard = South_cards[i]['card_name'].toUpperCase().toString()
      console.log(pcard);
      player_cards.push(<img class="cards" style={{flex:1}} src={require("../../images/deck/"+pcard+".jpg")} height="130" width="80"/>)
      part_cards.push(<img class="cards" src={require("../../images/deck/Red_back_p.jpg")} height="90px" width="60px"/>)
      opp_cards.push(<img src={require("../../images/deck/Red_back_opp.jpg")}  height="60px" width="90px"/>)
    }

    return(
      <div class="container">
        <div class="row-3">
          <div class="icons">{part_cards}</div>
        </div>
        <div class="row-6">
          <div class="col-6 col-left box">{opp_cards}</div>
          <div class="col-6 box-r">{opp_cards}</div>
        </div>
        <div class="row-3">
          <div class="icons">{player_cards}</div>
        </div>
      </div>
    )
  }
}


let mapStateToProps = (state)=>{
  return{
    //mettre ce qu'on veut faire passer en props du composant
    nbPlayer: state.Coinche.nbPlayer || null,
    nbCards: state.Coinche.nbCards || null,
    ListCards: state.Coinche.ListCards || [],
    Rules: state.Coinche.Rules || [],
    South_cards: state.Coinche.South_cards || [],
  };
}

let mapDispatchToProps = (dispatch)=>{
  return{
    //Fonctions ici
  }
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Game);

import React, { Component } from 'react';
import '../../App.css';
import {connect} from 'react-redux'
import 'bootstrap/dist/css/bootstrap.min.css';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from "prop-types";
import posed, { PoseGroup } from 'react-pose';
import Modal from 'react-responsive-modal';
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import Button from "@material-ui/core/Button";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import ValueBetSelect from './valuebet'
import Snackbar from '@material-ui/core/Snackbar';
import Slide from '@material-ui/core/Slide';
import { spacing } from '@material-ui/system';

import { getRulesCoinche, setGameStatus, getGameHandsCoinche, storeEnnemyBet, storeEnnemyBBet, storePlayerBet, storePartnerBet, getAiBetCoinche } from '../../actions/actions'
import { playCard, canPlayCoinche, getAiMoveCoinche, getCurrentFoldResult, setWinner, sendGameResult } from '../../actions/actions'

function TransitionDown(props) {
  return <Slide {...props} direction="down" />;
}


class Game extends Component {
  state = { open: false,show: false,type_bet: "Pass", value_bet: "0",labelWidth: 70, infoopen: false, Transition: null};
  componentWillMount(){
    const {ListCards, nbPlayer, nbCards} = this.props;
    setTimeout(this.onOpenModal, 500);
  }
  onOpenModal = () => {
    this.setState({ open: true });
  };

  onCloseModal = (d,e) => {
    this.setState({ open: false });
    const {storePlayerBet} = this.props;
    //const bet={"type_bet":d['type_bet'],"value_bet": this.ValueBetSelect1.state['value_bet']}
    storePlayerBet(d);
  };

  handleChange = event => {
    this.setState({ type_bet: event.target.value });
    this.setState({ [event.target.name]: event.target.value });
  };

  onUpdate = (val) => {
    this.setState({
      value_bet: val
    })
  };

  handleClick = Transition => () => {
    this.setState({ infoopen: true, Transition });
    this.getBets()
  };
  handleClose = () => {
    this.setState({ infoopen: false });
  };


  getBets = () => {
    const { getAiBetCoinche } = this.props;
    const {partner_bet,player_bet, ennemy_bet, ennemy_bet2, last_bettor} = this.props;
    const {South_cards,East_cards,West_cards,North_cards} = this.props
    if(last_bettor=="player"){
      if(partner_bet['value_bet']>player_bet['value_bet']){
        getAiBetCoinche(West_cards,ennemy_bet,partner_bet)
      }else{
        getAiBetCoinche(West_cards,ennemy_bet,player_bet)
      }
    }else if(last_bettor=="ennemy1"){
      getAiBetCoinche(North_cards,player_bet,ennemy_bet)
    }else if(last_bettor==="partner"){
      if(partner_bet['value_bet']>player_bet['value_bet']){
        getAiBetCoinche(East_cards,ennemy_bet2,partner_bet)
      }else{
        getAiBetCoinche(East_cards,ennemy_bet2,player_bet)
      }
    }else{
      this.setState({ open: true });
    }
  }

  render(){
    const { open, show, value_bet, type_bet } = this.state;
    const {South_cards,East_cards,West_cards,North_cards,last_bettor, partner_bet,ennemy_bet, ennemy_bet2,player_bet, next_bettor, last_bet, gameStatus, setGameStatus} = this.props
    const {playCard, first_tour, dealer, opening_color, getGameHandsCoinche, game_points} = this.props
    let best_bettor
    let showCurrentFold = [];
    let best_bet
    if(Math.max(partner_bet['value_bet'],ennemy_bet['value_bet'], ennemy_bet2['value_bet'],player_bet['value_bet'])==partner_bet['value_bet'] && partner_bet['value_bet']!="0"){
      best_bettor="partner"
      best_bet= partner_bet
    }else if(Math.max(partner_bet['value_bet'],ennemy_bet['value_bet'], ennemy_bet2['value_bet'], player_bet['value_bet'])==player_bet['value_bet'] && player_bet['value_bet']){
      best_bettor="player"
      best_bet=player_bet
    }else if(Math.max(partner_bet['value_bet'],ennemy_bet['value_bet'], ennemy_bet2['value_bet'], player_bet['value_bet'])==ennemy_bet['value_bet'] && ennemy_bet['value_bet']){
      best_bettor="ennemy1"
      best_bet=ennemy_bet
    }else if(Math.max(partner_bet['value_bet'],ennemy_bet['value_bet'], ennemy_bet2['value_bet'], player_bet['value_bet'])==ennemy_bet2['value_bet'] && ennemy_bet2['value_bet']){
      best_bettor="ennemy2"
      best_bet=ennemy_bet2
    }

    let i;
    let player_cards=[]
    let part_cards=[]
    let opp_cards=[]
    let opp2_cards=[]
    let adv_game;
    const Box = posed.div({
      pressable: true,
      press: { scale: 1.5 },
      hoverable: true,
      init: {
        scale: 1,
        boxShadow: '0px 0px 0px rgba(0,0,0,0)'
      },
      hover: {
        scale: 1.2,
        boxShadow: '0px 5px 10px rgba(0,0,0,0.2)'
      }
    });
    if(gameStatus==="redonne"){
      window.location.reload()
    }
    if(gameStatus=="started"){
      for(i=0; i<South_cards.length; i++){
        let pcard = South_cards[i]['card_name'].toUpperCase().toString()
        let cardp = South_cards[i]
        player_cards.push(<Box className="test"><img class="cards" style={{flex:1}} src={require("../../images/deck/"+pcard+".jpg")} height="130" width="80"/></Box>)
      }
      for(i=0; i<North_cards.length; i++){
        part_cards.push(<img class="cards" src={require("../../images/deck/Red_back_p.jpg")} height="85px" width="57px"/>)
        opp_cards.push(<img class ="cards" src={require("../../images/deck/Red_back_opp.jpg")}  height="57px" width="85px"/>)
        opp2_cards.push(<img class ="cards" src={require("../../images/deck/Red_back_opp.jpg")}  height="57px" width="85px"/>)
      }
    }
    let next_bet
    if(gameStatus=="started"){
      if(next_bettor!=best_bettor){
        next_bet = (<Button variant="contained" color="primary" onClick={this.handleClick(TransitionDown)}>
                        Next Bet
                      </Button>)
      }else{
        next_bet = (<div>Atout : {best_bet['type_bet']} | Contrat : {best_bet['value_bet']}</div>)
        setGameStatus("playingInfo")
      }
    }else if(gameStatus=="playingInfo"){
      if(best_bet['type_bet']==="Pass"){
        setTimeout(function(){setGameStatus("redonne")}, 100)
      }
      for(i=0; i<North_cards.length; i++){
        part_cards.push(<img class="cards" src={require("../../images/deck/Red_back_p.jpg")} height="85px" width="57px"/>)
      }
      for(i=0; i<West_cards.length; i++){
        opp_cards.push(<img class ="cards" src={require("../../images/deck/Red_back_opp.jpg")}  height="57px" width="85px"/>)
      }
      for(i=0; i<East_cards.length; i++){
        opp2_cards.push(<img class ="cards" src={require("../../images/deck/Red_back_opp.jpg")}  height="57px" width="85px"/>)
      }
      if(next_player=="player"){
        for(i=0; i<South_cards.length; i++){
          let pcard = South_cards[i]['card_name'].toUpperCase().toString()
          let cardp = South_cards[i]
          player_cards.push(<Box className="test"><img class="cards" style={{flex:1}} src={require("../../images/deck/"+pcard+".jpg")} height="130" width="80"/></Box>)
        }
      }
      //Le jeu a commencé
      const {game_points, last_player, next_player,canPlayCoinche,getAiMoveCoinche, current_fold, cards_played, getCurrentFoldResult, pileCard} = this.props;
      next_bet = (<div>Atout : {best_bet['type_bet']} | Contrat : {best_bet['value_bet']}</div>)

      // atout : best_bet['type_bet'], last_player, next_player
      if(pileCard.length<32  || current_fold.length!==0){
        //dealer : ennemy2 et next_player = player
        if(current_fold.length<4){
          if(next_player=="player"){
            for(i=0; i<South_cards.length; i++){
              let pcard = South_cards[i]['card_name'].toUpperCase().toString()
              let cardp = South_cards[i]
              player_cards.push(<Box onPressStart={() => playCard(cardp,"player","ennemy1",opening_color,best_bet['type_bet'])} className="test"><img class="cards" style={{flex:1}} src={require("../../images/deck/"+pcard+".jpg")} height="130" width="80"/></Box>)
            }
          }else{
            for(i=0; i<South_cards.length; i++){
              let pcard = South_cards[i]['card_name'].toUpperCase().toString()
              let cardp = South_cards[i]
              player_cards.push(<Box className="test"><img class="cards" style={{flex:1}} src={require("../../images/deck/"+pcard+".jpg")} height="130" width="80"/></Box>)
            }
            if(next_player=="ennemy1"){
              adv_game = (<Button variant="contained" color="secondary" ml={4} onClick={() => getAiMoveCoinche(cards_played,best_bet['type_bet'].toLowerCase(),opening_color,West_cards,"ennemy1","partner")
  }>
                              {'Valider'}
                          </Button>)
            }else if(next_player=="partner"){
              adv_game = (<Button variant="contained" color="secondary" ml={4} onClick={() => getAiMoveCoinche(cards_played,best_bet['type_bet'].toLowerCase(),opening_color,North_cards,"partner","ennemy2")
  }>
                              {'Valider'}
                          </Button>)
            }else{
              console.log(next_player)
              adv_game = (<Button variant="contained" color="secondary" ml={4} onClick={() => getAiMoveCoinche(cards_played,best_bet['type_bet'].toLowerCase(),opening_color,East_cards,"ennemy2","player")
  }>
                              {'Valider'}
                          </Button>)
            }
          }
        }else{
          adv_game=(<Button variant="contained" color="secondary" ml={4} onClick={() => getCurrentFoldResult(best_bet['type_bet'].toLowerCase(),current_fold)}>
                          {'Prochain pli'}
                      </Button>)
          for(i=0; i<South_cards.length; i++){
            let pcard = South_cards[i]['card_name'].toUpperCase().toString()
            let cardp = South_cards[i]
            player_cards.push(<Box className="test"><img class="cards" style={{flex:1}} src={require("../../images/deck/"+pcard+".jpg")} height="130" width="80"/></Box>)
          }
        }

        //Afficher la liste du pli en cours

        for(i=0; i<cards_played.length; i++){
          let pcard = cards_played[i]['card_name'].toUpperCase().toString()
          showCurrentFold.push(<img class="cards fold" style={{flex:1}} src={require("../../images/deck/"+pcard+".jpg")} height="150" width="95"/>)
        }

      }else{
        const { setWinner, store_e_cards,store_n_cards,store_s_cards, store_w_cards, list_bet, sended, sendGameResult } = this.props
        const points_done = game_points['player']
        const final_bettor = best_bettor
        let has_won = "0";
        if(best_bettor=="player" || best_bettor=="partner"){
          if(best_bet['value_bet']<game_points['player']){
            setWinner("player");
            has_won = "1"
          }else{
            setWinner("ennemy");
          }
        }else{
          if(best_bet['value_bet']<game_points['ennemy']){
            setWinner("ennemy");
          }else{
            setWinner("player");
            has_won="1"
          }
        }
        //parsing cards
        let parsed_s_cards = "";
        for(i=0; i<store_s_cards.length-1, i++){
          parsed_s_cards += store_s_cards[i]['card_name']+"-"

        }

        const team_personnal = {
          "player_south": "player",
          "south_hand": store_s_cards,
          "player_north": "partner",
          "north_hand": store_n_cards,
          "south_is_announcing_first": "1",
          "north_is_announcing_first": "0"
        }
        const team_opponent = {
          "player_west": "ennemy1",
          "west_hand": store_w_cards,
          "player_east": "ennemy2",
          "east_hand": store_e_cards,
          "west_is_announcing_first": "0",
          "east_is_announcing_first": "0"
        }
        if(sended=="null"){
          sendGameResult(has_won,points_done,final_bettor,team_personnal,team_opponent,list_bet)

        }else{
          console.log("YEAHH")
        }


      }









    }else {
      next_bet=(<div>Atout : {best_bet['type_bet']} | Contrat : {best_bet['value_bet']}</div>)
    }


    let playerbet = {"type_bet": type_bet, "value_bet": value_bet.toString()}

    let annonce = (<Modal animationDuration={1000} showCloseIcon={show} open={open} center>
                    <h1 class="text">Choix de l'annonce</h1>
                    <FormControl component="fieldset">
                      <RadioGroup
                        aria-label="position"
                        name="position"
                        value={this.state.type_bet}
                        onChange={this.handleChange}
                        row
                      >
                        <FormControlLabel
                          value="Pass"
                          control={<Radio color="primary" />}
                          label="Passe"
                          labelPlacement="top"
                        />
                        <FormControlLabel
                          value="H"
                          control={<Radio color="primary" />}
                          label="Coeur"
                          labelPlacement="top"
                        />
                        <FormControlLabel
                          value="S"
                          control={<Radio color="primary" />}
                          label="Pique"
                          labelPlacement="top"
                        />
                        <FormControlLabel
                          value="C"
                          control={<Radio color="primary" />}
                          label="Trèfle"
                          labelPlacement="top"
                        />
                        <FormControlLabel
                          value="D"
                          control={<Radio color="primary" />}
                          label="Carreau"
                          labelPlacement="top"
                        />
                        <FormControlLabel
                          value="TA"
                          control={<Radio color="primary" />}
                          label="TA"
                          labelPlacement="top"
                        />
                        <FormControlLabel
                          value="SA"
                          control={<Radio color="primary" />}
                          label="SA"
                          labelPlacement="top"
                        />
                      </RadioGroup>
                    </FormControl>
                    <ValueBetSelect onUpdate={this.onUpdate} ref="valueb"></ValueBetSelect>
                    <Button variant="contained" color="secondary" ml={4} onClick={() => this.onCloseModal(playerbet,this.refs.valueb)}>
                      {'Valider'}
                    </Button>
                   </Modal>)
    let info = (<Snackbar
          open={this.state.infoopen}
          onClose={this.handleClose}
          TransitionComponent={this.state.Transition}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">{last_bettor} : {last_bet['value_bet']} à {last_bet['type_bet']}</span>}
        />)

    return(
      <div>
        <div class="row-9 canvasView">
          {annonce}
          <div class="row-3">
            <div class="icons">{part_cards}</div>
          </div>
          <div class="row-6">
            <div class="backg">
              <div class="col-6 col-left box">{opp_cards}</div>
              <div class="col-6 box-r">{opp2_cards}</div>
              <div class="icons">{showCurrentFold}</div>

            </div>
          </div>
          {info}
        </div>
        <div class="row-3" id="playerView">
          <div class="icons">{player_cards}</div>
          {next_bet}
          {adv_game}
        </div>
      </div>
    )
  }
}


let mapStateToProps = (state)=>{
  return{
    //mettre ce qu'on veut faire passer en props du composant
    gameStatus: state.Coinche.gameStatus || "null",
    first_tour: state.Coinche.first_tour,
    nbPlayer: state.Coinche.nbPlayer || null,
    nbCards: state.Coinche.nbCards || null,
    ListCards: state.Coinche.ListCards || [],
    Rules: state.Coinche.Rules || [],
    dealer: state.Coinche.dealer,
    South_cards: state.Coinche.South_cards || [],
    West_cards: state.Coinche.West_cards || [],
    North_cards: state.Coinche.North_cards || [],
    East_cards: state.Coinche.East_cards || [],
    last_bettor: state.Coinche.last_bettor || null,
    ennemy_bet: state.Coinche.ennemy_bet,
    ennemy_bet2: state.Coinche.ennemy_bet2,
    partner_bet: state.Coinche.partner_bet,
    player_bet: state.Coinche.player_bet,
    next_bettor: state.Coinche.next_bettor || null,
    last_bet: state.Coinche.last_bet,
    next_player: state.Coinche.next_player,
    last_player: state.Coinche.last_player,
    opening_color: state.Coinche.opening_color,
    current_fold: state.Coinche.current_fold,
    cards_played: state.Coinche.cards_played,
    pileCard: state.Coinche.pileCard,
    game_points: state.Coinche.game_points,
    winner: state.Coinche.winner,
    store_e_cards: state.Coinche.East_cards,
    store_n_cards: state.Coinche.North_cards,
    store_w_cards: state.Coinche.West_cards,
    store_s_cards: state.Coinche.South_cards,
    list_bet: state.Coinche.list_bet,
    sended: state.Coinche.sended,
  };
}

let mapDispatchToProps = (dispatch)=>{
  return{
    //Fonctions ici
    storePlayerBet: (d) => dispatch(storePlayerBet(d)),
    setGameStatus: (st) => dispatch(setGameStatus(st)),
    getAiBetCoinche: (player_hand,partner_bet,ennemy_bet) => dispatch(getAiBetCoinche(player_hand,partner_bet,ennemy_bet)),
    playCard: (c,p,np,o,at) => dispatch(playCard(c,p,np,o,at)),
    canPlayCoinche: (cards_played,atout,opening_color,remaining_cards) => dispatch(canPlayCoinche(cards_played,atout,opening_color,remaining_cards)),
    getAiMoveCoinche: (cards_played,atout,opening_color,remaining_cards,p1,p2) => dispatch(getAiMoveCoinche(cards_played,atout,opening_color,remaining_cards,p1,p2)),
    getCurrentFoldResult: (at,fold) => dispatch(getCurrentFoldResult(at,fold)),
    getGameHandsCoinche: (bool,list) => dispatch(getGameHandsCoinche(bool,list)),
    setWinner: (w) => dispatch(setWinner(w)),
    sendGameResult: (h,p,f,t1,t2,l) => dispatch(sendGameResult(h,p,f,t1,t2,l)),
  }
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Game);

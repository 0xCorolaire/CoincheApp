import React, { Component } from 'react';
import '../../App.css';
import {connect} from 'react-redux'
import 'bootstrap/dist/css/bootstrap.min.css';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Fab from '@material-ui/core/Fab';
import NavigationIcon from '@material-ui/icons/Navigation';
import LinearProgress from '@material-ui/core/LinearProgress';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';

//Images
import versus from'../../images/vs_homemade.png';

//api
import { getRulesCoinche, setGameStatus, getListCardsCoinche, getGameHandsCoinche } from '../../actions/actions'

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class Menu extends Component {
  componentWillMount(){
    const {getRulesCoinche,getListCardsCoinche} = this.props;
    const {nbPlayer, nbCards} = this.props;
    getRulesCoinche();
    getListCardsCoinche();
  }

  state = {
    open: false,
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const styles = {
      card: {
        maxWidth: 345,
      },
      media: {
        objectFit: 'cover',
      },
      root: {
        flexGrow: 1,
      },
    };
    const {ListCards,Rules, gameStatus} = this.props;
    const {setGameStatus,getGameHandsCoinche} = this.props;
    let load
    if(gameStatus=="starting"){
      load=(<div className="loaddd" class="col">
                    <LinearProgress variant="query" />
                    <br />
                    <LinearProgress color="secondary" variant="query" />
                  </div>)
      setTimeout(function(){getGameHandsCoinche('True',[])}, 1000)
    }
    return(
      <div>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
        <div class="container">
          <div class="row mt-5 pt-5">
            <div class="col-md-4">
              <Card className="versusAi to-center">
                <CardActionArea onClick={() => setGameStatus("starting")}>
                  <CardMedia
                    component="img"
                    alt="Contemplative Reptile"
                    className="versusAi"
                    height="140"
                    image={versus}
                    title="Contemplative Reptile"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      Partie rapide
                    </Typography>
                    <Typography component="p">
                      Partie rapide de coinche en 1500 points contre une intelligence artificielle
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <Button size="small" color="primary" onClick={this.handleClickOpen}>
                    Règles
                  </Button>
                </CardActions>
              </Card>
            </div>
            <div class="col-md-4">
              <Card className="versusP to-center">
                <CardActionArea>
                  <CardMedia
                    component="img"
                    alt="Contemplative Reptile"
                    className="versusP"
                    height="140"
                    image={versus}
                    title="Contemplative Reptile"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      Partie rapide en ligne
                    </Typography>
                    <Typography component="p">
                      Partie rapide de coinche en 1500 points contre de vrais joueurs
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <Button size="small" color="primary">
                    Règles
                  </Button>
                </CardActions>
              </Card>
            </div>
            <div class="col-md-4">
              <Card className="versus to-center">
                <CardActionArea>
                  <CardMedia
                    component="img"
                    alt="Contemplative Reptile"
                    className="versus"
                    height="140"
                    image={versus}
                    title="Contemplative Reptile"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      Match classé
                    </Typography>
                    <Typography component="p">
                      Match à enjeux réels.<br/>
                      Ton ELO actuel :
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <Button size="small" color="primary">
                    Règles
                  </Button>
                </CardActions>
              </Card>
            </div>
          </div>
          <div class="row mt-4 pt-4">
            <div class="col-md-5">
            </div>
            <Fab variant="extended" color="primary" aria-label="Add" className="leaderbord">
              <NavigationIcon className="leaderbord" />
              Classement
            </Fab>
          </div>
          <div class="row mt-3 pt-3">
            {load}
          </div>
        </div>
        <Dialog
          open={this.state.open}
          TransitionComponent={Transition}
          keepMounted
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="alert-dialog-slide-title">
            {"La Coinche / La Belote Coinchée"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              La Coinche est un jeu de carte avec annonces
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }
}


let mapStateToProps = (state)=>{
  return{
    //mettre ce qu'on veut faire passer en props du composant
    gameStatus: state.Coinche.gameStatus || "null",
    nbPlayer: state.Coinche.nbPlayer || null,
    nbCards: state.Coinche.nbCards || null,
    ListCards: state.Coinche.ListCards || [],
    Rules: state.Coinche.Rules || [],
  };
}

let mapDispatchToProps = (dispatch)=>{
  return{
    //Fonctions ici
    getRulesCoinche: () => dispatch(getRulesCoinche()),
    setGameStatus: (st) => dispatch(setGameStatus(st)),
    getListCardsCoinche: () => dispatch(getListCardsCoinche()),
    getGameHandsCoinche: (bool,list) => dispatch(getGameHandsCoinche(bool,list)),
  }
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Menu);

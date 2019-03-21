import React from "react"
import ReactDOM from "react-dom"


class ReglesContainer extends React.Component {
  render(){

    return (
        <div className="ruleContainer">
          <h3>But du jeu :</h3>
          <span className="ruleList">L’équipe preneuse doit réaliser le contrat annoncé pour gagner une manche, tout en réalisant au minimum 82 points de plis hors annonces et/ou belote-rebelote</span>
          <span className="ruleList">La première équipe àatteindre au minimum 1501 points gagne le jeu. Si les deux équipes dépassent 1501 points, celle qui a le plus haut score gagne le jeu.</span>
          <h3>La distribution des cartes</h3>
          <span className="ruleList">Elle diffère de la Belote classique : à la Coinche, toutes les cartes sont distribuées au début de la manche, chaque joueur reçoit donc 8 cartes chacun (distribuées d'abord par 3 à chacun, puis par 2, puis par 3). La phase d'enchère peut ensuite commencer.
          </span>

          <h3>Les enchères</h3>
          <span className="ruleList">
            Le joueur placé à la gauche du donneur commence à parler.

            Il peut annoncer la valeur et la couleur du contrat qu'il pense pouvoir réaliser avec son partenaire en fonction de son jeu. Il peut aussi décider de passer.

            Une fois que le joueur a annoncé un contrat ou a passé, le joueur situé à sa gauche a le choix entre annoncer un contrat supérieur ou passer.

            La phase d'enchère prend fin si personne n'a annoncé de contrat lors du premier tour de parole, ou aussitôt que 3 joueurs passent après l'annonce de l'un des joueurs (un joueur n'est pas autorisé à surenchérir sur son propre contrat). Auquel cas le dernier contrat annoncé l'emporte et la phase de jeu peut commencer.
          </span>
          <span className="ruleList">
            La couleur d'atout peut être choisie entre :
          </span>
          <span className="ruleList">
            - L'une des quatre couleurs
          </span>
          <span className="ruleList">
            - Tout Atout (TA)
          </span>
          <span className="ruleList">
            - Sans Atout (SA)
          </span>
        </div>
    )
  }
}

export default ReglesContainer;

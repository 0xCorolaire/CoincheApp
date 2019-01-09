import apirequest from './apiRequest'

export const getPointsFromCards = (success, failure) => {
    console.log("appel API")
    apirequest("apiGetRequest", 'GET', '/posts/1', null)
    .then(res => res.json())
    .then((result) => {
        success(result)
    },
    (error) => {
        failure(error)
    }).catch((err) => {failure(err)})
}


//Récupérations des règles et de la liste des cartes
export const getListCards = (success,failure)=>{
  apirequest("apiGetRequest", 'GET', 'getListCards', null)
  .then(res => res.json())
  .then((result) => {
      success(result)
  },
  (error) => {
      failure(error)
  }).catch((err) => {failure(err)})
}

export const getRules = (success,failure)=>{
  apirequest("apiGetRequest", 'GET', 'getRules', null)
  .then(res => res.json())
  .then((result) => {
      success(result)
  },
  (error) => {
      failure(error)
  }).catch((err) => {failure(err)})
}

export const getGameHands = (firstGame,listLastGameCards,success,failure)=>{
  apirequest("apiPostRequest", 'POST', 'getGameHands', {"firstGame":firstGame,"listLastGameCards":listLastGameCards})
  .then(res => res.json())
  .then((result) => {
      console.log(result)
      success(result)
  },
  (error) => {
      console.log(error)
      failure(error)
  }).catch((err) => {failure(err)})
}

export const getAiBet = (player_hand,partner_bet,ennemy_bet,success,failure)=>{
  apirequest("apiPostRequest", 'POST', 'getAiBet', {"player_hand":player_hand,"partner_bet":partner_bet,"ennemy_bet":ennemy_bet})
  .then(res => res.json())
  .then((result) => {
      success(result)
  },
  (error) => {
      failure(error)
  }).catch((err) => {failure(err)})
}

export const canPlay = (cards_played,atout,opening_color,remaining_cards,success,failure)=>{
  apirequest("apiPostRequest", 'POST', 'canPlay', {"cards_played":cards_played,"atout":atout,"opening_color":opening_color,"remaining_cards":remaining_cards})
  .then(res => res.json())
  .then((result) => {
      success(result)
  },
  (error) => {
      failure(error)
  }).catch((err) => {failure(err)})
}


//obtenir la move d'un AI
export const getAiNormalMove = (cards_played,atout,opening_color,remaining_cards,success,failure)=>{
  apirequest("apiPostRequest", 'POST', 'getAiNormalMove', {"cards_played":cards_played,"atout":atout,"opening_color":opening_color,"remaining_cards":remaining_cards})
  .then(res => res.json())
  .then((result) => {
      success(result)
  },
  (error) => {
      failure(error)
  }).catch((err) => {failure(err)})
}


//Evaluer le gagnant d'un fold
export const evaluateFold = (atout,cards_in_fold,success,failure)=>{
  apirequest("apiPostRequest", 'POST', 'evaluateFold', {"atout":atout,"cards_in_fold":cards_in_fold})
  .then(res => res.json())
  .then((result) => {
      console.log(result)
      success(result)
  },
  (error) => {
      console.log(error)
      failure(error)
  }).catch((err) => {failure(err)})
}

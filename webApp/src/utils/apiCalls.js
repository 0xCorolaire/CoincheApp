import apirequest from './apiRequest'

export const getPointsFromCards = (success, failure) => {
    console.log("appel API")
    apirequest("apiGetRequest", 'GET', '/posts/1', null)
    .then(res => res.json())
    .then((result) => {
        success(result)
    },
    (error) => {
        console.log(error)
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
      console.log(error)
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
      console.log(error)
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

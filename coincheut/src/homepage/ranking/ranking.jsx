import React from "react"
import ReactDOM from "react-dom"

class RankingContainer extends React.Component {
  render(){
    return (
      <div className="ranking fullHeight fullWidth">
        <div className="container">
          <div className="globalRanking">
            <div className="infoRanking">
              <div className="star">
              </div>
              <p className="label">
                Classement
              </p>
            </div>
            <div className="listRanking">


            </div>
          </div>
        </div>
      </div>
    )
  }
};

export default RankingContainer

import React, { Component } from 'react';
import Loader from 'react-loader-spinner'

class ApiStatus extends Component {
  componentDidMount() {
  }
  render() {

    return (
      <div className="loader fullHeight fullWidth">
        <div className = "loader-container">
          <Loader type="Triangle" color="#343434" height={120} width={120}  />
        </div>
      </div>
    );
  }
}

export default ApiStatus;

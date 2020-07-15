import React, { Component } from 'react';
import './Card.css'; 
import Dealer from './Components/Dealer'

class Card extends Component {  

  
    render() {
      // const { isLoaded, cards } = this.state;
      // if (error) {
      //   return <div>Error: {error.message}</div>;
      // } else if (!isLoaded) {
      //   return <div>Loading...</div>;
      // } else {
        return (
              <div className="board">
                <img src={this.props.img}></img>
              </div>
        );
      }
    }
  // }

  export default Card; 
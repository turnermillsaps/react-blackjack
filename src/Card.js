import React, { Component } from 'react';
import axios from 'axios';


class Card extends Component {
    constructor(props) {
      super(props);
      this.state = {
        error: null,
        isLoaded: false,
        cards: []
      };
    }
  
    componentDidMount() {
      axios.get("https://deckofcardsapi.com/api/deck/new/draw/?count=2")
        .then(
          (result) => {
            this.setState({
              isLoaded: true,
              cards: result.data.cards
            });
            console.log(result)
          },
          // Note: it's important to handle errors here
          // instead of a catch() block so that we don't swallow
          // exceptions from actual bugs in components.
          (error) => {
            this.setState({
              isLoaded: true,
              error
            });
          }
        )
    }
  
    render() {
      const { error, isLoaded, cards } = this.state;
      if (error) {
        return <div>Error: {error.message}</div>;
      } else if (!isLoaded) {
        return <div>Loading...</div>;
      } else {
        return (
          <ul>
            <div>
                <p>Hello</p>
                
            </div>
        
                 {cards.map(card => (
                     <li key={card.code}>
                        {card.value} {card.suit} <img src={card.image}></img>
                    </li>
                 ))} 
           </ul> 
        );
      }
    }
  }

  export default Card; 
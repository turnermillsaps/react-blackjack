import React, { Component } from 'react'
import axios from 'axios';
import Player from './Player';
import Dealer from './Dealer';

export class Board extends Component {

    constructor(props) {
        super(props);
        this.state = {
          error: null,
          isLoaded: false,
          cards: []
        };
      }

    componentDidMount() {
        axios.get("https://deckofcardsapi.com/api/deck/new/draw/?count=4")
          .then(
            (result) => {
              this.setState({
                isLoaded: true,
                playercards: result.data.cards,
                dealercards: result.data.cards
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
        return (
            <div>
                {console.log('hello')}
                <Player cards={this.state.playercards}/>
                <Dealer cards={this.state.dealercards}/>
            </div>
        )
    }
}

export default Board

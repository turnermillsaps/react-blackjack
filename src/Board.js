import React, { Component } from 'react'
import axios from 'axios';
import Player from './Components/Player';
import Dealer from './Components/Dealer';
import Bet from './Components/Bet';
import './Board.css'; 





export class Board extends Component {

    constructor(props) {
        super(props);
        this.state = {
          error: null,
          isLoaded: false,
          playercards: [],
          dealercards: [],
          playerscore: 0,
          dealerscore: 0
      }
    }
      // Sum of cards
      getCardValue = (card) => {
        // Values of cards
        const cardValues = {
          KING: 10,
          JACK: 10,
          QUEEN: 10,
          ACE: 11,
          '10': 10,
          '9': 9,
          '8': 8,
          '7': 7,
          '6': 6,
          '5': 5,
          '4': 4,
          '3': 3,
          '2': 2
        }
        return cardValues[card];
      }

      // Drawing a new card
      hit = () => {
          if (this.state.playerscore < 21) {
            fetch(`https://deckofcardsapi.com/api/deck/${this.state.deckID}/draw/?count=1`)
            .then(res => res.json())
            .then(
            (result) => {
            console.log(result); 
            const newCards = this.state.cards.push(result.cards[0])
            this.setState({
            playercards: newCards,
            playerscore: (this.state.playerscore + this.getCardValue(result.cards[0].value))
            })
          }) 
            
          }
        
      }

    
            
            componentDidMount = () => {
              
              // Getting a new deck
              axios.get("https://deckofcardsapi.com/api/deck/new/")
                .then(
                  (result) => {
                    this.setState({
                      isLoaded: true,
                      deckID: result.data.deck_id
                    })
                    console.log(result);
                    // Shuffling the deck
                    fetch(
                      `https://deckofcardsapi.com/api/deck/${this.state.deckID}/shuffle/`
                    )
                    .then(res => res.json())
                    .then(json => {
                      console.log(json);
                      console.log('Shuffled!');
                    });       
                    // Drawing two cards for the player
                    fetch(
                      `https://deckofcardsapi.com/api/deck/${this.state.deckID}/draw/?count=2`
                    )
                    .then(res => res.json())
                    .then(
                      (result) => {
                        console.log(result); 

                        this.setState({
                          playercards: result.cards,
                          playerscore: this.getCardValue(result.cards[0].value) + this.getCardValue(result.cards[1].value)
                        }) 
                        // Drawing two cards for the dealer                      
                        fetch(
                          `https://deckofcardsapi.com/api/deck/${this.state.deckID}/draw/?count=2`
                        )
                        .then(res => res.json())
                        .then(
                          (result) => {
                            console.log(result);
                            this.setState({
                              dealercards: result.cards,
                              dealerscore: this.getCardValue(result.cards[0].value) + this.getCardValue(result.cards[1].value)
                          })
                      }
                    )}
                  )
                }
              )
            }

    render = () => {
        return (
            <div>
                <div>
                    <h2 className='card-text'>Player: coding test13</h2>
                    <button onClick={this.hit}>HIT</button>
                    <h2 className='card-text'>Stand</h2>
                </div>
                <Bet />
                <div className="hands">
                  <p>Player Score {this.state.playerscore}</p>
                  <Player cards={this.state.playercards}/>
                  <p>Dealer Score {this.state.dealerscore}</p>
                  <Dealer cards={this.state.dealercards}/>
                </div>
            </div>
        )
    }



}




export default Board


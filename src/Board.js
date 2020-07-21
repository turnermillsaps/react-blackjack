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
    // componentDidMount = () => {
    //     axios.get("https://deckofcardsapi.com/api/deck/new/draw/?count=2")
    //       .then(
    //         (result) => {
    //           this.setState({
    //             isLoaded: true,
    //             playercards: result.data.cards,
    //             dealercards: result.data.cards
    //           });
    //           console.log(result)
    //         }



    
            
            componentDidMount = () => {
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
                          })
                      }
                    )}

 
                  )
                }
              )
            }
            // Note: it's important to handle errors here
            // instead of a catch() block so that we don't swallow
            // exceptions from actual bugs in components.
            /* (error) => {
              this.setState({
                isLoaded: true,
                error
              }); */


      


    render = () => {
        return (
            <div>
              <div className='title'>
                <h1>Blackjack</h1>
              </div>  
              <div className='record-box'>
                <div class="gradient-border" id="box">
                  <p>Player name</p>
                  <p>Player wins</p>
                  <p>Player win percentage</p>
                  <p>Player blackjacks</p>
                </div>
                <div className='new-game'>
                  <button>New Game</button>
                </div>
              </div>
                <div className="hands">
                  <h2 className='score-value'>Dealer Score {this.state.dealerscore}</h2>
                  <Dealer cards={this.state.dealercards}/> 
                  <div className='player-box'>
                    <Bet />
                  </div>
                  <div className='player-box'>
                    <h2 className='score-value'>*Username* Score {this.state.playerscore}</h2>
                  </div > 
                  <div className='player-box'>
                    <button className='card-text'>Hit</button>
                    <button className='card-text'>Stand</button>   
                  </div>
                  <div>
                    <Player cards={this.state.playercards}/>
                  </div>
                </div>
              </div>
        )
    }



}




export default Board
// Value of cards

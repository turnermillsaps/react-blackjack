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
          // Automatically handle the case for Aces
          let cardValue = this.getCardValue(result.cards[0].value);
          if (result.cards[0].value === 'ACE' && (this.state.playerscore + this.getCardValue(result.cards[0].value)) > 21) {
            cardValue = 1
          }
          const newState = this.state;
          newState.playercards.push(result.cards[0])
          newState.playerscore = (this.state.playerscore + cardValue)
          this.setState({
            newState
          })
          this.blackjack();
        }) 
          
        }
      
    }

    // Check who has blackjack
    blackjack = () => {
      if (this.state.playerscore === 21) {
        alert("You've Won!!");
      } else if (this.state.playerscore > 21) {
        alert("Bust!"); 
      } 
      if (this.state.dealerscore === 21) {
        alert("Dealer Wins!");
      } else if (this.state.dealerscore === 21 && this.state.playerscore === 21) {
        alert("Draw!");
      }
    }

    // Recursively draw cards for the dealer until he reaches 17 or over
    dealerDraw = (dealerScore) => {
      if (dealerScore < 17) {
        axios.get(`https://deckofcardsapi.com/api/deck/${this.state.deckID}/draw/?count=1`)
          .then(result => {
            console.log(result);
            dealerScore = dealerScore + this.getCardValue(result.data.cards[0].value)
            console.log(`Dealer Score: ${dealerScore}`)
            return this.dealerDraw(dealerScore)
          })
      } else {
        return this.displayResults(dealerScore)
      }
    }

    // Set up Promise to call dealerDraw() when player stands
    stand = () => {
      return Promise.resolve(this.dealerDraw(this.state.dealerscore))
    }

    // Display the results after play stands
    displayResults = (updatedDealerScore) => {
      if (this.state.playerscore > updatedDealerScore && this.state.playerscore <= 21 ) {
        alert("You've Won!!");
      } else if (updatedDealerScore > 21) {
        alert("You've Won!!");
      } else if (this.state.playerscore === updatedDealerScore) {
        alert("Draw"); 
      }
    }

    refreshPage = () => {
      window.location.reload();
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
                  console.log(`current state: ${JSON.stringify(this.state)}`);
                  // this.blackjack();
              }
            )}
          )
        }
      )
    }

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
                  <button className='big-button' onClick={this.refreshPage}>New Game</button>
                </div>
              </div>
              <div className='record-box2'>
              <div class="gradient-border2" id="box2">
                  <p>Pot</p>
                  <p>$50</p>
              </div>
              </div>
                <div className="hands">
                  <h2 className='score-value'>Dealer Score {this.state.dealerscore}</h2>
                  <Dealer cards={this.state.dealercards}/> 
                  <div className='player-box'>
                    <Bet />
                  </div>
                  <div className='player-box'>
                    <h2 className='score-value'>Score {this.state.playerscore}</h2>
                  </div > 
                  <div className='player-box'>
                    <button className='card-text' onClick={this.hit}>Hit</button>
                    <button className='card-text' onClick={this.stand}>Stand</button>   
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

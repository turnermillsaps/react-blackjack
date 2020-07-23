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
          dealerscore: 0,
          playerFunds: this.props.location.state.userGames.sum,
          playerName: this.props.location.state.userData.name,
          gamesPlayed: this.props.location.state.userGames.count,
          pot: 0,
          betPlaced: false
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
                let newState = { ...this.state };
                newState.playercards.push(result.cards[0])
                newState.playerscore = (this.state.playerscore + cardValue)
                this.setState({
                  ...this.state, 
                  playercards: newState.playercards,
                  playerscore: newState.playerscore 
                })
                console.log(`state after hit: ${JSON.stringify(this.state)}`)
                this.hitBlackjack();
              })           
        }      
    }

    
    // Recursively draw cards for the dealer until he reaches 17 or over
    dealerDraw = (dealerScore) => {
      if (dealerScore < 17) {
        axios.get(`https://deckofcardsapi.com/api/deck/${this.state.deckID}/draw/?count=1`)
          .then(result => {
            console.log(result.data.cards[0].value);
            // Automatically handle the case for Aces
            let cardValue = this.getCardValue(result.data.cards[0].value);
            if (cardValue === 'ACE' && (dealerScore + cardValue) > 21) {
              cardValue = 1
            }
            dealerScore = dealerScore + cardValue
            console.log(`Dealer Score: ${dealerScore}`)
            return this.dealerDraw(dealerScore)
          })
      } else {
        this.standBlackjack(dealerScore, this.state.playerscore)
      }
    }

    // Set up Promise to call dealerDraw() when player stands
    stand = () => {
      return Promise.resolve(this.dealerDraw(this.state.dealerscore))
    }

    // Display the results after play stands and update player funds accordingly
    standBlackjack = (updatedDealerScore, playerscore) => {
      if (playerscore > updatedDealerScore && playerscore <= 21 ) {
        this.handleResult('Player');
      } else if (updatedDealerScore > 21) {
        console.log("You've Won!!");
        this.handleResult('Player');
      } else if (playerscore === updatedDealerScore) {
        console.log("Draw");
        this.handleResult('Draw'); 
      } else if (updatedDealerScore === 21) {
        console.log("Dealer wins!");
        this.handleResult('Dealer');
      }
    }

    // Display the results after player hits and update player funds accordingly
    hitBlackjack = () => {
      if (this.state.playerscore === 21) {
        console.log("You've Won!!");
        this.handleResult('Player');
      } else if (this.state.playerscore > 21) {
        console.log("Bust!"); 
        this.handleResult('Dealer');
      } else if (this.state.dealerscore === 21) {
        console.log("Dealer Wins!");
        this.handleResult('Dealer');
      } else if (this.state.dealerscore === 21 && this.state.playerscore === 21) {
        console.log("Draw!");
        this.handleResult('Draw');
      }
    }

    // Start a new game
    refreshPage = () => {
      window.location.reload();
    } 

    // Post game data
    endGame = () => {

    }

    // Place a bet and add dealer's contribution as double original bet placed
    placeBet = (value) => {
      this.setState({
        ...this.state,
        playerFunds: this.state.playerFunds - parseInt(value),
        pot: this.state.pot + (parseInt(value) * 2),
        betPlaced: true
      }, () => {
        this.hitBlackjack()
      })
    }

    handleResult = (winner) => {
      if (winner === 'Player') {
        const newFunds = this.state.playerFunds + this.state.pot;
        this.setState({
          ...this.state,
          playercards: [],
          dealercards: [],
          playerscore: 0,
          dealerscore: 0,
          playerFunds: newFunds,
          betPlaced: false,
          pot: 0
        }, () => {
          this.dealCards() 
          alert("You've Won!!")
        })
      } else if (winner === 'Dealer') {
        this.setState({
          ...this.state,
          playercards: [],
          dealercards: [],
          playerscore: 0,
          dealerscore: 0,
          betPlaced: false,
          pot: 0
        }, () => { 
          this.dealCards()
          alert("Dealer Wins, womp womp")
        })       
      } else if (winner === 'Draw') {
        this.setState({
          ...this.state,
          playercards: [],
          dealercards: [],
          playerscore: 0,
          dealerscore: 0,
          betPlaced: false
        }, () => { 
          this.dealCards()
          alert("Draw!!") 
        })
      }
    }

    // Deal new set of cards from the same deck when a single hand is finished
    dealCards = () => {
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
      const hands = (
        <div className="hands">
          <Dealer cards={this.state.dealercards}/> 
          <div className='player-box'>
            <h2 className='score-value'>Score {this.state.playerscore}</h2>
          </div > 
          <div className='player-box'>
            <button className='big-button2' onClick={this.hit}>Hit</button>
            <button className='big-button2' onClick={this.stand}>Stand</button>  
          </div>
          <div>
            <Player cards={this.state.playercards}/>
          </div>
        </div>
      )

      const bet = (
        <div className='player-box'>
          <Bet placeBet={this.placeBet}/>
        </div>
      )

      return (
          <div>
            <div className='title'>
              <h1 className='logo-1'>Blackjack</h1>
            </div>  
            <div className='record-box'>
              <div className="gradient-border" id="box">
                <h3 className='stats'>Player: {this.state.playerName}</h3>
                <h3 className='stats'>Games Played: {this.state.gamesPlayed}</h3>
                <h3 className='stats'>Player funds: {this.state.playerFunds}</h3>
              </div>
              <div className='new-game'>
                <button className='big-button' onClick={this.refreshPage}>New Game</button>
              </div>
              <div className='end-game'>
                <button className='big-button' onClick={this.endGame}>End Game</button>
              </div>
            </div>
            <div className='record-box2'>
              <div className="gradient-border2" id="box2">
                  <p>Pot</p>
                  <p>${this.state.pot}</p>
              </div>
            </div>
            {!this.state.betPlaced ? bet : hands}
          </div>
      )
    }



}




export default Board

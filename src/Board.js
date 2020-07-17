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
          dealerscore:
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
              axios.get("https://deckofcardsapi.com/api/deck/new/")
                .then(
                  (result) => {
                    this.setState({
                      isLoaded: true,
                      deckID: result.data.deck_id
                    })
                    console.log(result);
                    fetch(
                      `https://deckofcardsapi.com/api/deck/${this.state.deckID}/draw/?count=2`
                    )
                    .then(res => res.json())
                    .then(
                      (result) => {
                        console.log(result); 
                        this.setState({
                          playercards: result.cards
                        })                       
                        fetch(
                          `https://deckofcardsapi.com/api/deck/${this.state.deckID}/draw/?count=2`
                        )
                        .then(res => res.json())
                        .then(
                          (result) => {
                            this.setState({
                              dealercards: result.cards
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
                <div>
                    <h2 className='card-text'>Player: coding test13</h2>
                    <h2 className='card-text'>Hit</h2>
                    <h2 className='card-text'>Stand</h2>
                </div>
                <Bet />
                <div className="hands">
                  <Player cards={this.state.playercards}/>
                  <Dealer cards={this.state.dealercards}/>
                </div>
            </div>
        )
    }



}




export default Board
import React, { Component } from 'react'
import Card from '../Card'

export class Player extends Component {
    render() {
        return (
            <div>
                <div>
                    <div>
                        <h2>Player: coding test13</h2>
                        <h2>Hit</h2>
                        <h2>Stand</h2>
                    </div>
                    <ul>
                        {this.props.cards.map(card => (
                            <li key={card.code}>
                            <Card img={card.image}/> 
                            </li>
                        ))} 
                    </ul>
                </div>
            </div>
        )
    }
}

export default Player

import React, { Component } from 'react'
import Card from '../DealerCard'
import './Player.css'; 


export class Player extends Component {
    render = () => {
        return (
            <div>
                <div>
                    <ul className='hand-list'>
                        {this.props.cards.map(card => (
                            <li key={card.code} className='hand'>
                                <div className='card-pics'>
                                    <Card img={card.image}/> 
                                </div>
                            </li>
                        ))} 
                    </ul>
                    
                </div>
            </div>
        )
    }
}

export default Player

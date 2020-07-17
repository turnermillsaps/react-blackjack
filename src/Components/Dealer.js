import React, { Component } from 'react'
import Card from '../DealerCard'
import './Dealer.css'; 

export class Dealer extends Component {


    render() {
        return (
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
        )
    }
}

export default Dealer

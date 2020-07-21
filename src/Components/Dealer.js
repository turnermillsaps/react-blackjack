import React, { Component } from 'react'
import Card from '../DealerCard'
import './Dealer.css'; 

export class Dealer extends Component {


    render() {
        return (
            <div>
                <ul className='hand-list'>
                    {this.props.cards.map((card,i) => {
                        if (i===0) {
                            return (
                                <li key={card.code} className='hand'>
                                    <div className='card-pics'>
                                        <img src="/images/blankCard.jpg" alt='blank card' class="blankCard" /> 
                                    </div>
                                </li>
                            )
                        }
                        return (
                        <li key={card.code} className='hand'>
                            <div className='card-pics'>
                                <Card img={card.image}/> 
                            </div>
                        </li>
                        )
                    })} 
                </ul>
            </div>
        )
    }
}

export default Dealer

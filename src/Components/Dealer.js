import React, { Component } from 'react'
import DealerCard from '../DealerCard'
import './Dealer.css'; 
import blankcard from './images/blankCard.jpg';

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
                                        <img src={blankcard} alt='blankcard' class="blankCard" /> 
                                    </div>
                                </li>
                            )
                        }
                        return (
                        <li key={card.code} className='hand'>
                            <div className='card-pics'>
                                <DealerCard img={card.image}/> 
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

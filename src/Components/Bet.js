import React, { Component } from 'react'
import './Bet.css'; 

export class Bet extends Component {
    
    render() {
        return (
            <div>
              <form action='/*BET SUBMISSION ACTION*'>
                <label for='bet' id='chbet'>Choose your bet!  </label>
                <select id='bet' name='bet'>
                  <option value='5'>5</option>
                  <option value='10'>10</option>
                  <option value='20'>20</option>
                  <option value='30'>30</option>
                  <option value='40'>40</option>
                  <option value='50'>50</option>
                </select>                  
                <input type="submit" />
              </form>
            </div>
        )
    }
}

export default Bet

import React, { Component } from 'react'
import './Bet.css'; 

export class Bet extends Component {
    constructor(props) {
      super(props);
      this.state = {
        value: '5'
      }
    }

    handleChange = (event) => {
      this.setState({ value: event.target.value })
    }

    placeBet = (event) => {
      event.preventDefault()
      this.props.placeBet(this.state.value);
    }
    
    render() {
        return (
            <div>
              <form onSubmit={this.placeBet}>
                <label for='bet' id='chbet'>Choose your bet!  </label>
                <select id='bet' name='bet' value={this.state.value} onChange={this.handleChange}>
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

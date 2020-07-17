import React, { Component } from 'react'

export class PlayerCard extends Component {
    render() {
        return (
            <div className="board">
                <img src={this.props.img}></img>
            </div>
        )
    }
}

export default PlayerCard

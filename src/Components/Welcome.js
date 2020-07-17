import React, { Component } from 'react';
import Google from './Google';
import { Link } from 'react-router-dom';
import './Welcome.css';
import axios from 'axios';

class Welcome extends Component {
    constructor(props) {
        super(props)
        this.state = {
            userSignedIn: false,
            userLoginError: false
        }
    }

    // Callback function to get user data from Google component
    getUserData = (user) => {
        if (!user.googleId) {
            return false
        }
        console.log(user)
        this.pushUserData(user) 
    }

    // Call express API to update the database with user information if it exists
    pushUserData = (user) => {
        axios.get('http://localhost:3001/api/findOrCreateUser', {
            name: user.name,
            email: user.email,
            imageUrl: user.url,
            googleId: user.googleId
        }).then(res => {
            return this.setState({
                ...user, userSignedIn: true
            })
        }).catch(err => {
            console.error(err);
            return this.setState({
                ...this.state, userLoginError: true
            })
        })
    }

    render = () => {
        const loginError = (
            <div>
                <h2>Uh oh! Something seems to have gone wrong when attempting a login. Try refreshing the page and using the Google login again.</h2>
            </div>
        )
        const welcomeData = (
            <div>
                <div className="Play-button">
                    <Link to={{
                        pathname: "/Board",
                        state: { ...this.state }
                    }}>Play Blackjack</Link>
                </div>
                <div>
                    <h2>Welcome: {this.state.name}</h2>
                    <h2>Email: {this.state.email}</h2>
                    <img src={this.state.url} alt=""/>
                </div>
            </div>
        )

        return (
            <div className="App">
              <header className="App-header">
                <div className="Body">
                  <div id="bungee">
                    <Google getUserData={this.getUserData}/>
                  </div>
                  <div class="box-1">                           
                      <div>
                          <nav>
                            {this.state.userSignedIn ? welcomeData 
                                : this.state.userLoginError ? loginError : ''}
                          </nav>
                      </div>                           
                  </div>
                </div>
              </header>
            </div>
        )
    }
}

export default Welcome
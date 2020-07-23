import React, { Component } from 'react';
import Google from './Google';
import { Link } from 'react-router-dom';
import './Welcome.css';
import axios from 'axios';

class Welcome extends Component {
    constructor(props) {
        super(props)
        this.state = {
            userData: {
                name: null,
                email: null,
                imageUrl: null
            },
            userGames: {
                sum: null,
                count: null
            },
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
        // Quick solution for using test vs prod database, set to false before pushing to master
        let apiUrl = 'https://react-blackjack-backend.herokuapp.com/api/'
        if (!process.env.VERCEL_URL) {
            apiUrl = 'http://localhost:3001/api/'
        }
        axios.post(`${apiUrl}findOrCreateUser`, {           
                name: user.name,
                email: user.email,
                imageUrl: user.imageUrl,
                googleId: user.googleId
        }).then(res => {
            console.log(`User Data: ${JSON.stringify(res)}`)
            let newRes = res.data
            axios.get(`${apiUrl}getUserGameData/${res.data[0].id}`)
                .then(res => {
                    newRes.push(res.data)
                    console.log(`End result: ${JSON.stringify(newRes)}`)
                    if (newRes[2].sum === null) {
                        newRes[2].sum = 50
                    }
                    return this.setState({
                        ...this.state,
                        userData: newRes[0],
                        userGames: newRes[2],
                        userSignedIn: true
                    }) 
            }).catch(err => { console.error(err) })
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
                <h3>Uh oh! Something seems to have gone wrong when attempting a login. Try refreshing the page and using the Google login again.</h3>
            </div>
        )
        const welcomeData = (
            <div className='stat-box'>
                <div className='google-stat'>
                    <h2>Welcome: {this.state.userData.name}</h2>
                    <h2>Email: {this.state.userData.email}</h2>
                    <img className='google-img' src={this.state.userData.imageUrl} alt=""/>
                </div>
                <div className='google-stat'>
                    <h2>Games Played: {this.state.userGames.count}</h2>
                    <h2>Total Earnings: {this.state.userGames.sum}</h2>
                </div>
            </div>
        )
        const playButton = (
            <div className="Play-button">
                <Link to={{
                    pathname: "/Board",
                    state: { ...this.state }
                }}>Play Blackjack</Link>
            </div>
        )

        return (
            <div className="App">
              <header className="App-header">
                <div>
                    <p className="logo-1">Blackjack</p>
                </div>

                <div className="button_cont" align="center">
                    <a className="example_e" href="add-website-here" target="_blank" rel="nofollow noopener">{!this.state.userSignedIn ? <Google getUserData={this.getUserData}/> : playButton}</a>
                    <h3 className='welcome-inst'>Click here to login</h3>             
                </div>

                <div className="Body">

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
import React, { Component } from "react";
import GoogleLogin from 'react-google-login';
import './Google.css';
import ReactDOM from "react-dom";



class Google extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: null,
      email: null,
      url: null,
      googleId: null
    }
  }

  responseGoogle = (response) =>{
    this.setState({
      state: {
        name: response.profileObj.name,
        email: response.profileObj.email,
        url: response.profileObj.url,
        googleId: response.profileObj.googleId
      }
    })
    
    this.props.getUserData(response.profileObj);
    console.log(response)
  }

  render = () => {
    const welcomeData = (
      <div>
        <h2>Welcome: {this.state.name}</h2>
        <h2>Email: {this.state.email}</h2>
        <img src={this.state.url} alt=""/>
      </div>
    )
    return (
      <div className="App">
                {this.state.googleId ? welcomeData : ''}
                <div className="Gbutton">
                    <GoogleLogin
                        clientId="1003724051845-2423jcovde0hknvcknemde4d30o1rq8n.apps.googleusercontent.com"
                        buttonText="Login"
                        onSuccess={this.responseGoogle}
                        onFailure={this.responseGoogle}
                        cookiePolicy={'single_host_origin'}
                    />
                </div>
      </div>
    )  
  }
}


export default Google
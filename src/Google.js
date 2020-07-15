import React, {useState} from "react";
import GoogleLogin from 'react-google-login';
import './Google.css';
import ReactDOM from "react-dom";



export default function Google() {

    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [url,setUrl] = useState("");
    const [googleId,setGoogleId] = useState("");

    const responseGoogle = (response) =>{
        setName(response.profileObj.name);
        setEmail(response.profileObj.email);
        setUrl(response.profileObj.imageUrl);
        setGoogleId(response.profileObj.googleId); 
        console.log(response)
    }

  return (
    <div className="App">
            <h2>Welcome: {name}</h2>
            <h2>Email: {email}</h2>
            <img src={url} alt={name}/>
                <div className="Gbutton">
                    <GoogleLogin
                        clientId="1003724051845-2423jcovde0hknvcknemde4d30o1rq8n.apps.googleusercontent.com"
                        buttonText="Login"
                        onSuccess={responseGoogle}
                        onFailure={responseGoogle}
                        cookiePolicy={'single_host_origin'}
                    />
                </div>
    </div>
  );
}



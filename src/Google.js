import React, {useState} from "react";
import GoogleLogin from 'react-google-login';
import ReactDOM from "react-dom";


export default function Google() {

    const [name,setName] = useState("");

    const [email,setEmail] = useState("");

    const [url,setUrl] = useState("");

    const responseGoogle = (response) =>{
        setName(response.profileObj.name);
        setEmail(response.profileObj.email);
        setUrl(response.profileObj.imageUrl);
        console.log(response)
    }

  return (
    <div className="App">
        <h1>Google</h1>
        <h2>Welcome: {name}</h2>
        <h2>Email: {email}</h2>
        <img src={url} alt={name}/>
            <GoogleLogin
                clientId="1003724051845-er6a1flvvkhq19uveaub2hoq9q9hedie.apps.googleusercontent.com"
                buttonText="Login"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={'single_host_origin'}
            />
    </div>
  );
}



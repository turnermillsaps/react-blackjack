import React, {useState} from 'react';
import './App.css';
// import Card from './Card'; 
import Google from './Google';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className="Body">
          <div id="bungee">
            <Google />
          </div>
          <div class="box-1">                           
              <div>
                  <nav>
                    <div className="Play-button">
                      <Link to="/Board">
                        Play Blackjack
                      </Link>
                    </div>
                  </nav>
              </div>                           
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;

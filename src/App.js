import React, {useState} from 'react';
import './App.css';
import Card from './Card'; 
import Google from './Google';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <div id="bungee">
          <Card />
          <Google />
        </div>
      </header>
    </div>
  );
}

export default App;

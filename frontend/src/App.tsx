import React from 'react';
import './App.css';
import CreateAccount from './components/authentication/createAccount';

function App() {
  return (
    <div className="App">
      {/* <header className="App-header">
        <p>This is the beginning of The Land Conservancy project.</p>
      </header> */}
      <CreateAccount />
    </div>
  );
}

export default App;

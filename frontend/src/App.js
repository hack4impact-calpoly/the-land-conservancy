import logo from './logo.svg';
import './App.css';

console.log('one');
var ww = process.env.NODE_ENV.trim.toLowerCase();
if (ww === 'production') {
  console.log('Another one');
} else {      
  console.log('test')
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
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
      </header>
    </div>
  );
}

export default App;

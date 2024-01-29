import React from 'react';
import logo from './logo.svg';
import './App.css';
import CreateTodo from './pages/Homepage/Createtodo';
import GetAllTodos from './pages/Homepage/Getalldata';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
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
      <CreateTodo/>
      <GetAllTodos/>
    </div>
  );
}

export default App;

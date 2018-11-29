import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import { sp } from '@pnp/sp';

class App extends Component<{}, AppState> {
  constructor(props: {}, context?: any) {
    super(props, context);

    this.state = {
      title: ''
    };
  }

  async componentDidMount() {
    const fields = await sp.web.select('Title').get();

    this.setState({
      title: fields.Title
    });
  }

  render() {
    const { title } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
          </p>
          <p>Connected to {title}</p>
          <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default App;

interface AppState {
  title: string;
}

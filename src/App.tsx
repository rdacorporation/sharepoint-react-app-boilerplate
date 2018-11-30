import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import { SPContext } from './services/SPContext';

class App extends Component<AppProps, AppState> {
  private _isMounted: boolean = false;

  constructor(props: AppProps, context?: any) {
    super(props, context);

    this.state = {
      title: ''
    };
  }

  public async componentDidMount() {
    const { context } = this.props;
    this._isMounted = true;

    const title = await context.getRootWebTitle();

    this._isMounted &&
      this.setState({
        title
      });
  }

  public componentWillUnmount() {
    this._isMounted = false;
  }

  public render() {
    const { title } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
          </p>
          <p>
            Connected to <span id="rootWebTitle">{title}</span>
          </p>
          <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default App;

interface AppProps {
  context: SPContext;
}

interface AppState {
  title: string;
}

import React from 'react';
import logo from './logo.svg';
import './App.css';

import { AppContext, AppStore } from './AppContext';
import { AppTitle } from './AppTitle';

class App extends React.Component<AppProps, AppState> {
  private _isMounted: boolean = false;

  constructor(props: AppProps, context?: any) {
    super(props, context);

    this.state = {
      theAnswer: 0,
      appStore: props.appStore
    };
  }

  public async componentDidMount() {
    const { appStore } = this.props;
    this._isMounted = true;

    // Example of calling a custom SharePoint service application.
    const theAnswer = await appStore.appService.getTheAnswerToLifeTheUniverseAndEverything();

    this._isMounted &&
      this.setState({
        theAnswer
      });
  }

  public componentWillUnmount() {
    this._isMounted = false;
  }

  public render() {
    const { appStore } = this.state;
    return (
      <AppContext.Provider value={appStore}>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <p>
              Edit <code>src/App.tsx</code> and save to reload.
            </p>
            <p>
              Connected to <AppTitle />
            </p>
            <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
              Learn React
            </a>
          </header>
        </div>
      </AppContext.Provider>
    );
  }
}

export default App;

interface AppProps {
  appStore: AppStore;
}

interface AppState {
  theAnswer: number;
  appStore: AppStore;
}

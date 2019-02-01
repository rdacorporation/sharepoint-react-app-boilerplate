import React from 'react';
import { WithStyles, withStyles, Theme, createStyles } from '@material-ui/core/styles';
import logo from './logo.svg';

import { AppContext, AppStore } from '../../AppContext';
import { AppTitle } from './AppTitle';

const styles = (theme: Theme) =>
  createStyles({
    app: {
      textAlign: 'center'
    },
    appLogo: {
      animation: 'App-logo-spin infinite 20s linear',
      height: '40vmin'
    },
    appHeader: {
      backgroundColor: '#282c34',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 'calc(10px + 2vmin)',
      color: 'white'
    },
    appLink: {
      color: '#61dafb'
    },
    '@keyframes App-logo-spin': {
      from: {
        transform: 'rotate(0deg)'
      },
      to: {
        transform: 'rotate(360deg)'
      }
    }
  });

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
    const { classes } = this.props;
    const { appStore } = this.state;
    return (
      <AppContext.Provider value={appStore}>
        <div className={classes.app}>
          <header className={classes.appHeader}>
            <img src={logo} className={classes.appLogo} alt="logo" />
            <p>
              Edit <code>src/App.tsx</code> and save to reload.
            </p>
            <p>
              Connected to <AppTitle />
            </p>
            <a className={classes.appLink} href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
              Learn React
            </a>
          </header>
        </div>
      </AppContext.Provider>
    );
  }
}

export default withStyles(styles)(App);

interface AppProps extends WithStyles<typeof styles> {
  appStore: AppStore;
}

interface AppState {
  theAnswer: number;
  appStore: AppStore;
}

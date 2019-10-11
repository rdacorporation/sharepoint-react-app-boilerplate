import React, { useState } from 'react';
import { useAsyncEffect } from '../../util/hooks';
import { Theme } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/styles';
import logo from './logo.svg';

import { AppContext, useAppValue } from '../../AppContext';
import { AppTitle } from './AppTitle';

const useStyles = makeStyles<Theme>({
  root: {
    textAlign: 'center'
  },
  logo: {
    animation: '$App-logo-spin infinite 20s linear',
    height: '40vmin'
  },
  header: {
    backgroundColor: '#282c34',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 'calc(10px + 2vmin)',
    color: 'white'
  },
  link: {
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

const App: React.FunctionComponent = () => {
  const [theAnswer, setTheAnswer] = useState(0);
  const classes = useStyles();
  const appStore = useAppValue();

  useAsyncEffect(async () => {
    // This is just an example.
    const answer = await appStore.appService.getTheAnswerToLifeTheUniverseAndEverything();
    setTheAnswer(answer);
  });

  return (
    <AppContext.Provider value={appStore}>
      <div className={classes.root}>
        <header className={classes.header}>
          <img src={logo} className={classes.logo} alt="logo" />
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
          </p>
          <p>
            Connected to <AppTitle />, {theAnswer}
          </p>
          <a className={classes.link} href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
            Learn React
          </a>
        </header>
      </div>
    </AppContext.Provider>
  );
};

export default App;

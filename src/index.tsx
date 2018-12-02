import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { sp } from '@pnp/sp';
import { SPRestContext } from './services/SPContext';
import { AppRestService } from './services/AppService';

sp.setup({
  sp: {
    headers: {
      Accept: 'application/json;odata=verbose'
    }
  }
});

const spRestContext = new SPRestContext();
const appRestService = new AppRestService();
ReactDOM.render(<App context={spRestContext} appService={appRestService} />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();

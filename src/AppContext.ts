import React from 'react';
import { sp } from '@pnp/sp';
import { SPRestContext, SPContext } from './services/SPContext';
import { AppRestService, AppService } from './services/AppService';

sp.setup({
  sp: {
    baseUrl: '../',
    headers: {
      Accept: 'application/json;odata=verbose'
    }
  }
});

export interface AppStore {
  appService: AppService;
  spContext: SPContext;
}

export const defaultAppStore: AppStore = {
  appService: new AppRestService(),
  spContext: new SPRestContext()
};

export const AppContext = React.createContext(defaultAppStore);

import React from 'react';
import { sp } from '@pnp/sp';
import { SPRestService, SPService } from './services/SPService';
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
  spService: SPService;
}

export const defaultAppStore: AppStore = {
  appService: new AppRestService(),
  spService: new SPRestService()
};

export const AppContext = React.createContext(defaultAppStore);

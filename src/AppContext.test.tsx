import React from 'react';
import { mount } from 'enzyme';
import { setupFixture, waitForAsync } from './util/testUtils';
import { AppContext, AppStore } from './AppContext';
import { SPService } from './services/SPService';

const MockSPService = jest.fn<SPService, any>(() => ({
  getRootWebTitle: jest.fn(() => {
    return Promise.resolve('foo');
  }),
  getCurrentUser: jest.fn(),
  getContextInfo: jest.fn()
}));

const MockAppStore = jest.fn<AppStore, []>(() => {
  return {
    appService: {
      getTheAnswerToLifeTheUniverseAndEverything: jest.fn()
    },
    spService: new MockSPService()
  };
});

it('can provide and consume context', async () => {
  setupFixture();
  const appStore = new MockAppStore();
  mount(
    <AppContext.Provider value={appStore}>
      <AppContext.Consumer>{foo => foo.appService.getTheAnswerToLifeTheUniverseAndEverything()}</AppContext.Consumer>
    </AppContext.Provider>
  );

  await waitForAsync();

  expect(appStore.appService.getTheAnswerToLifeTheUniverseAndEverything).toBeCalledTimes(1);
});

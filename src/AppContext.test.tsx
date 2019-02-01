import React from 'react';
import { mount } from 'enzyme';
import { setupFixture, waitForAsync } from './util/testUtils';
import { AppContext, AppStore } from './AppContext';

const MockAppStore = jest.fn<AppStore>(() => {
  return {
    appService: {
      getTheAnswerToLifeTheUniverseAndEverything: jest.fn()
    }
  };
});

it('can provide and consume context', async () => {
  await setupFixture();
  const appStore = new MockAppStore();
  mount(
    <AppContext.Provider value={appStore}>
      <AppContext.Consumer>{foo => foo.appService.getTheAnswerToLifeTheUniverseAndEverything()}</AppContext.Consumer>
    </AppContext.Provider>
  );

  await waitForAsync();

  expect(appStore.appService.getTheAnswerToLifeTheUniverseAndEverything).toBeCalledTimes(1);
});

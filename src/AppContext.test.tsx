import React from 'react';
import { mount } from 'enzyme';
import { setupFixture, waitForAsync } from './util/testUtils';
import { AppContext, AppStore } from './AppContext';

const MockAppStore = jest.fn<AppStore>();

it('can get the title', async () => {
  await setupFixture();

  mount(<AppContext.Provider value={new MockAppStore()} />);

  await waitForAsync();
});

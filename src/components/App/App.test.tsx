import React from 'react';
import { mount } from 'enzyme';
import { setupFixture, waitForAsync } from '../../util/testUtils';
import App from './';

import { SPService } from '../../services/SPService';
import { AppRestService } from '../../services/AppService';
import { AppStore } from '../../AppContext';

it('renders without crashing', async () => {
  await setupFixture();

  // Create the mock of SPService.getRootWebTitle
  const MockSPService = jest.fn<SPService>(() => ({
    getRootWebTitle: jest.fn(async () => {
      return Promise.resolve('foo');
    })
  }));

  const MockAppService = jest.fn<AppRestService>(() => ({
    getTheAnswerToLifeTheUniverseAndEverything: jest.fn(async () => {
      return Promise.resolve('foo');
    })
  }));

  const MockAppStore = jest.fn<AppStore>(() => ({
    appService: new MockAppService(),
    spService: new MockSPService()
  }));

  var mockAppStore = new MockAppStore();
  const wrapper = mount(<App appStore={mockAppStore} />);

  await waitForAsync();

  const titleText = wrapper.find('#rootWebTitle').text();
  expect(titleText).toEqual('foo');

  expect(mockAppStore.spService.getRootWebTitle).toHaveBeenCalledTimes(1);
  wrapper.unmount();
});

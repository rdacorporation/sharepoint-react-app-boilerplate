import React from 'react';
import { mount } from 'enzyme';
import { setupFixture } from './util/testUtils';
import App from './App';

import { SPContext } from './services/SPContext';
import { AppRestService } from './services/AppService';
import { AppStore } from './AppContext';

it('renders without crashing', async () => {
  await setupFixture();

  // Create the mock of SPContext.getRootWebTitle
  const MockContext = jest.fn<SPContext>(() => ({
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
    spContext: new MockContext()
  }));

  var mockAppStore = new MockAppStore();
  const wrapper = mount(<App appStore={mockAppStore} />);
  const instance = wrapper.instance() as App;

  await instance.componentDidMount();
  const titleText = wrapper.find('#rootWebTitle').text();
  expect(titleText).toEqual('foo');

  expect(mockAppStore.spContext.getRootWebTitle).toHaveBeenCalled();
  wrapper.unmount();
});

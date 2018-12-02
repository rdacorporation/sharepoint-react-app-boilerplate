import React from 'react';
import { mount } from 'enzyme';
import { setupFixture, waitForAsync } from './util/testUtils';
import App from './App';

import { SPContext } from './services/SPContext';
import { AppRestService } from './services/AppService';

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

  const mockContext = new MockContext();
  const mockAppService = new MockAppService();
  const wrapper = mount(<App context={mockContext} appService={mockAppService} />);

  await waitForAsync();
  const titleText = wrapper.find('#rootWebTitle').text();
  expect(titleText).toEqual('foo');

  expect(mockContext.getRootWebTitle).toHaveBeenCalled();
  wrapper.unmount();
});

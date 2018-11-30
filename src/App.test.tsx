import React from 'react';
import { mount } from 'enzyme';
import { setupFixture } from './util/testUtils';
import App from './App';

import { SPContext } from './services/SPContext';

it('renders without crashing', async () => {
  await setupFixture();

  // Create the mock of SPContext.getRootWebTitle
  const MockContext = jest.fn<SPContext>(() => ({
    getRootWebTitle: jest.fn(async () => {
      return 'foo';
    })
  }));

  const mockContext = new MockContext();
  const wrapper = mount(<App context={mockContext} />);
  await Promise.resolve();

  const titleText = wrapper.find('#rootWebTitle').text();
  expect(titleText).toEqual('foo');

  expect(mockContext.getRootWebTitle).toHaveBeenCalled();
  wrapper.unmount();
});

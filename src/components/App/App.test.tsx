import React from 'react';
import { shallow } from 'enzyme';
import { setupFixture } from '../../util/testUtils';
import App from './';

import { SPService } from '../../services/SPService';
import { AppRestService } from '../../services/AppService';
import * as AppContext from '../../AppContext';

// Create the mock of SPService.getRootWebTitle
const MockSPService = jest.fn<SPService, any>(() => ({
  getRootWebTitle: jest.fn(() => {
    return Promise.resolve('foo');
  }),
  getCurrentUser: jest.fn(),
  getContextInfo: jest.fn()
}));

const MockAppService = jest.fn<AppRestService, any>(() => {
  var ars = new AppRestService();
  return ars;
});

const MockAppStore = jest.fn<AppContext.AppStore, any>(() => ({
  appService: new MockAppService(),
  spService: new MockSPService()
}));

describe('<App/>', () => {
  beforeEach(() => {
    setupFixture();
  });

  it('renders without crashing', () => {
    const mockAppStore = new MockAppStore();

    jest.spyOn(AppContext, 'useAppValue').mockImplementation(() => {
      return mockAppStore;
    });

    // Sigh. https://github.com/testing-library/react-testing-library/issues/281

    const wrapper = shallow(<App />);

    // const titleText = wrapper.find('#rootWebTitle').text();
    // expect(titleText).toEqual('foo');
    // expect(mockAppStore.spService.getRootWebTitle).toHaveBeenCalledTimes(1);

    wrapper.unmount();
  });
});

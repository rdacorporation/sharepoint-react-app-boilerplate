import React from 'react';
import { ReactWrapper, mount } from 'enzyme';
import { setupFixture } from '../../util/testUtils';
import App from './App';

import { SPService } from '../../services/SPService';
import { AppRestService } from '../../services/AppService';
import * as AppContext from '../../AppContext';
import { act } from 'react-dom/test-utils';

// Create the mock of SPService.getRootWebTitle
const MockSPService = jest.fn<SPService, any>(() => ({
  getRootWebTitle: jest.fn(() => {
    return Promise.resolve('foo');
  }),
  getCurrentUser: jest.fn(),
  getContextInfo: jest.fn()
}));

const MockAppService = jest.fn<AppRestService, any>(() => {
  const ars = new AppRestService();
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

  it('renders without crashing', async () => {
    const mockAppStore = new MockAppStore();

    jest.spyOn(AppContext, 'useAppValue').mockImplementation(() => {
      return mockAppStore;
    });

    let wrapper: ReactWrapper<any, Readonly<{}>, React.Component<{}, {}, any>> | undefined;
    await act(async () => {
      wrapper = mount(<App />);
    });

    if (!wrapper) {
      throw Error('Wrapper was undefined.');
    }

    const titleText = wrapper.find('#rootWebTitle').text();
    expect(titleText).toEqual('foo');
    expect(mockAppStore.spService.getRootWebTitle).toHaveBeenCalled();

    wrapper.unmount();
  });
});

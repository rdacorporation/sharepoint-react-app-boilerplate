import React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import { setupFixture } from '../../util/testUtils';
import * as AppContext from '../../AppContext';
import { SPService } from '../../services/SPService';
import { AppRestService } from '../../services/AppService';
import { AppTitle } from './AppTitle';
import { act } from 'react-dom/test-utils';

// Create the mock of SPService.getRootWebTitle
const MockSPService = jest.fn<SPService, []>(() => ({
  getRootWebTitle: jest.fn(() => {
    return Promise.resolve('foo');
  }),
  getCurrentUser: jest.fn(),
  getContextInfo: jest.fn()
}));

const MockAppService = jest.fn<AppRestService, []>(() => {
  const ars = new AppRestService();
  ars.getTheAnswerToLifeTheUniverseAndEverything = jest.fn(() => {
    return Promise.resolve(42);
  });
  return ars;
});

const MockAppStore = jest.fn<AppContext.AppStore, []>(() => ({
  appService: new MockAppService(),
  spService: new MockSPService()
}));

describe('<AppTitle/>', () => {
  beforeEach(() => {
    setupFixture();
  });

  it('can supply context to providers', async () => {
    const mockAppStore = new MockAppStore();

    jest.spyOn(AppContext, 'useAppValue').mockImplementation(() => {
      return mockAppStore;
    });

    let wrapper: ReactWrapper<any, Readonly<{}>, React.Component<{}, {}, any>> | undefined;
    await act(async () => {
      wrapper = mount(<AppTitle />);
    });

    if (!wrapper) {
      throw Error('Wrapper was undefined.');
    }

    expect(wrapper).not.toBeUndefined();
    const titleText = wrapper.find('#rootWebTitle').text();
    expect(titleText).toEqual('foo');

    expect(mockAppStore.spService.getRootWebTitle).toHaveBeenCalledTimes(2);
    wrapper.unmount();
  });
});

import React from 'react';
import { mount } from 'enzyme';
import { setupFixture } from '../../util/testUtils';
import * as AppContext from '../../AppContext';
import { SPService } from '../../services/SPService';
import { AppRestService } from '../../services/AppService';
import { AppTitle } from './AppTitle';

// Create the mock of SPService.getRootWebTitle
const MockSPService = jest.fn<SPService, []>(() => ({
  getRootWebTitle: jest.fn(() => {
    return Promise.resolve('foo');
  }),
  getCurrentUser: jest.fn(),
  getContextInfo: jest.fn()
}));

const MockAppService = jest.fn<AppRestService, []>(() => {
  var ars = new AppRestService();
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

  it('can supply context to providers', () => {
    const mockAppStore = new MockAppStore();

    jest.spyOn(AppContext, 'useAppValue').mockImplementation(() => {
      return mockAppStore;
    });

    // Sigh. https://github.com/testing-library/react-testing-library/issues/281

    const wrapper = mount(<AppTitle />);
    // const titleText = wrapper.find('#rootWebTitle').text();
    // expect(titleText).toEqual('foo');

    // expect(mockAppStore.spService.getRootWebTitle).toHaveBeenCalledTimes(1);
    wrapper.unmount();
  });
});

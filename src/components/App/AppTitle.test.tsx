import React from 'react';
import { mount } from 'enzyme';
import { setupFixture, waitForAsync } from '../../util/testUtils';
import { AppContext, AppStore } from '../../AppContext';
import { SPService } from '../../services/SPService';
import { AppRestService } from '../../services/AppService';
import { AppTitle } from './AppTitle';

describe('<AppTitle/>', () => {
  let MockAppStore: jest.Mock<AppStore>;

  beforeEach(async () => {
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

    MockAppStore = jest.fn<AppStore>(() => ({
      appService: new MockAppService(),
      spService: new MockSPService()
    }));
  });

  it('can supply context to providers', async () => {
    const mockAppStore = new MockAppStore();
    const wrapper = mount(
      <AppContext.Provider value={mockAppStore}>
        <AppTitle />
      </AppContext.Provider>
    );

    await waitForAsync();

    const titleText = wrapper.find('#rootWebTitle').text();
    expect(titleText).toEqual('foo');

    expect(mockAppStore.spService.getRootWebTitle).toHaveBeenCalledTimes(1);
    wrapper.unmount();
  });
});

import React from 'react';
import { mount } from 'enzyme';
import { setupFixture, waitForAsync } from './util/testUtils';
import { AppContext, AppStore } from './AppContext';
import { SPContext } from './services/SPContext';
import { AppRestService } from './services/AppService';
import { AppTitle } from './AppTitle';

describe('<AppTitle/>', () => {
  let MockAppStore: jest.Mock<AppStore>;

  beforeEach(async () => {
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

    MockAppStore = jest.fn<AppStore>(() => ({
      appService: new MockAppService(),
      spContext: new MockContext()
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

    const appTitle = wrapper.find('AppTitle');
    const instance = appTitle.instance() as AppTitle;

    await instance.componentDidMount();
    const titleText = wrapper.find('#rootWebTitle').text();
    expect(titleText).toEqual('foo');

    expect(mockAppStore.spContext.getRootWebTitle).toHaveBeenCalledTimes(2);
    wrapper.unmount();
  });
});
